import { chromium, expect, firefox, test, webkit, type Page } from "@playwright/test";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { ROUTE_PAIRS } from "../../lib/i18n-paths";

const output = process.env.M4_AUDIT_OUTPUT;
const axeSource = process.env.M4_AXE_SOURCE;

test("final cross-browser accessibility and responsive matrix", async ({ baseURL }, testInfo) => {
  test.skip(!output || !axeSource || testInfo.project.name.includes("mobile"), "Explicit final audit matrix");
  test.setTimeout(600_000);
  await mkdir(output!, { recursive: true });
  const source = await readFile(axeSource!, "utf8");
  const results: Array<Record<string, unknown>> = [];
  const failures: unknown[] = [];
  async function scan(page: Page, label: string) {
    await page.addScriptTag({ content: source });
    const audit = await page.evaluate(async () => {
      const axe = (window as unknown as { axe: { run: (options: unknown) => Promise<{ violations: unknown[]; incomplete: unknown[]; passes: unknown[] }> } }).axe;
      const result = await axe.run({ runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa", "best-practice"] } });
      return { violations: result.violations, incomplete: result.incomplete, passedRules: result.passes.length };
    });
    await writeFile(path.join(output!, `${label}-axe.json`), JSON.stringify(audit, null, 2));
    if (audit.violations.length) failures.push({ label, violations: audit.violations });
    return audit.violations.length;
  }
  for (const [engine, launcher] of [["chromium", chromium], ["firefox", firefox], ["webkit", webkit]] as const) {
    const browser = await launcher.launch();
    for (const [device, width, height] of [["desktop", 1440, 900], ["tablet", 768, 1024], ["mobile", 390, 844]] as const) {
      const context = await browser.newContext({ baseURL, viewport: { width, height }, hasTouch: device !== "desktop" });
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      for (const locale of ["es", "en"]) {
        const label = `${engine}-${device}-${locale}`;
        const response = await page.goto(locale === "es" ? "/" : "/en");
        expect(response?.status()).toBe(200);
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(1400);
        await expect(page.locator("p[data-hero-copy]")).toHaveCSS("opacity", "1");
        await expect(page.locator("p[data-hero-copy]")).toHaveCSS("transform", "none");
        // Windows WebKit defaults to tabbing form controls; test link focus/Enter separately.
        if (engine === "webkit") await page.locator(".skip-link").focus();
        else await page.keyboard.press("Tab");
        await expect(page.locator(".skip-link")).toBeFocused();
        await page.keyboard.press("Enter");
        if (device !== "desktop") {
          const trigger = page.locator("[data-menu-trigger]");
          await trigger.click();
          await expect(page.locator("dialog")).toBeVisible();
          await scan(page, `${label}-menu`);
          await page.keyboard.press("Escape");
          await expect(trigger).toBeFocused();
        }
        await page.locator("#contact").scrollIntoViewIfNeeded();
        await page.emulateMedia({ reducedMotion: "reduce" });
        for (const image of await page.locator("main img").all()) await image.scrollIntoViewIfNeeded();
        await page.waitForLoadState("networkidle");
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
        expect(overflow).toBe(false);
        await expect(page.locator("main")).toHaveCount(1);
        await expect(page.locator("h1")).toHaveCount(1);
        await expect(page.locator("#contact footer a").last()).toHaveAttribute("href", locale === "es" ? "/legal" : "/en/legal");
        const violations = await scan(page, label);
        await page.screenshot({ path: path.join(output!, `${label}-full.png`), fullPage: true });
        results.push({ engine, device, locale, status: response?.status(), overflow, violations, keyboard: engine === "webkit" ? "link focus + Enter; form Tab cycle" : "Tab + Enter", errors: [...errors] });
      }
      expect(errors).toEqual([]);
      await context.close();
    }
    const context = await browser.newContext({ baseURL, viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
    const page = await context.newPage();
    for (const pair of ROUTE_PAIRS.slice(1)) {
      for (const locale of ["es", "en"] as const) {
        const url = pair[locale];
        const response = await page.goto(url);
        expect(response?.status()).toBe(200);
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator("html")).toHaveAttribute("lang", locale);
        await expect(page.locator("h1")).toHaveCount(1);
        const label = `${engine}-${locale}-${url.split("/").filter(Boolean).join("-")}`;
        const violations = await scan(page, label);
        results.push({ engine, url, locale, status: response?.status(), violations });
      }
    }
    await context.close();
    const noJs = await browser.newContext({ baseURL, javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
    const fallback = await noJs.newPage();
    for (const locale of ["es", "en"]) {
      await fallback.goto(locale === "es" ? "/" : "/en");
      await expect(fallback.locator("h1")).toBeVisible();
      await expect(fallback.locator("[data-contact-form]")).toBeHidden();
      await expect(fallback.locator('noscript a[href="mailto:alexviclop@gmail.com"]')).toBeVisible();
      await fallback.locator(".project-scene").last().scrollIntoViewIfNeeded();
      await expect(fallback.locator(".project-scene h3")).toHaveCount(3);
      results.push({ engine, locale, javascript: false, fallback: "direct-email", readableProjects: 4 });
    }
    await noJs.close();
    await browser.close();
  }
  await writeFile(path.join(output!, "matrix.json"), JSON.stringify(results, null, 2));
  expect(failures, "Axe violations; incomplete checks require manual review").toEqual([]);
});

test("legal navigation retains locale and stays outside indexable alternates", async ({ page }) => {
  await page.goto("/en/legal");
  await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await expect(page.locator('a[hreflang="es"]')).toHaveAttribute("href", "/legal");
});

test("contact placeholders meet text contrast and technologies expose named lists", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("list", { name: "Tecnologías", exact: true })).toHaveCount(3);
  for (const selector of ["#name", "#email", "#message"]) {
    const ratio = await page.locator(selector).evaluate(element => {
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = 1;
      const context = canvas.getContext("2d")!;
      const ancestors: Element[] = [];
      for (let node: Element | null = element; node; node = node.parentElement) ancestors.unshift(node);
      context.fillStyle = "#fff";
      context.fillRect(0, 0, 1, 1);
      for (const node of ancestors) {
        context.fillStyle = getComputedStyle(node).backgroundColor;
        context.fillRect(0, 0, 1, 1);
      }
      const background = context.getImageData(0, 0, 1, 1).data;
      context.fillStyle = getComputedStyle(element, "::placeholder").color;
      context.fillRect(0, 0, 1, 1);
      const foreground = context.getImageData(0, 0, 1, 1).data;
      const luminance = (color: Uint8ClampedArray) => Array.from(color).slice(0, 3)
        .map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4)
        .reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
      const values = [luminance(background), luminance(foreground)].sort((a, b) => b - a);
      return (values[0] + .05) / (values[1] + .05);
    });
    expect(ratio, selector).toBeGreaterThanOrEqual(4.5);
  }
});

test("installed Chrome checks keyboard and touch navigation", async ({ baseURL }, testInfo) => {
  test.skip(!output || testInfo.project.name.includes("mobile"), "Explicit installed Chrome audit");
  test.setTimeout(120_000);
  const browser = await chromium.launch({ channel: "chrome" });
  const records = [];
  for (const [device, width, height] of [["desktop", 1440, 900], ["tablet", 768, 1024], ["mobile", 390, 844]] as const) {
    const context = await browser.newContext({ baseURL, viewport: { width, height }, hasTouch: device !== "desktop", reducedMotion: "reduce" });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    for (const locale of ["es", "en"]) {
      await page.goto(locale === "es" ? "/" : "/en");
      await page.keyboard.press("Tab");
      await expect(page.locator(".skip-link")).toBeFocused();
      await page.keyboard.press("Enter");
      if (device !== "desktop") {
        await page.locator("[data-menu-trigger]").tap();
        await expect(page.locator("dialog")).toBeVisible();
        await page.keyboard.press("Escape");
        await expect(page.locator("[data-menu-trigger]")).toBeFocused();
      }
      for (const image of await page.locator("main img").all()) await image.scrollIntoViewIfNeeded();
      await page.waitForLoadState("networkidle");
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
      await page.screenshot({ path: path.join(output!, `chrome-${device}-${locale}-full.png`), fullPage: true });
      records.push({ device, locale, version: browser.version(), errors: [...errors] });
    }
    expect(errors).toEqual([]);
    await context.close();
  }
  await browser.close();
  await writeFile(path.join(output!, "chrome-matrix.json"), JSON.stringify(records, null, 2));
});
