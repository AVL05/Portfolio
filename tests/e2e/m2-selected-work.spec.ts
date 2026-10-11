import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const caseOutput = process.env.M2_CASE_OUTPUT;
const cases = ["distrito-gourmet", "lumaflow-studio", "raw-vives"];

test("case study capture matrix", async ({ browser }, testInfo) => {
  test.skip(!caseOutput || testInfo.project.name.includes("mobile"), "Explicit case capture matrix");
  test.setTimeout(180_000);
  await mkdir(caseOutput!, { recursive: true });
  const results = [];
  for (const [device, width, height] of [["desktop", 1440, 900], ["tablet", 768, 1024], ["mobile", 390, 844]] as const) {
    for (const locale of ["es", "en"]) {
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "reduce" });
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      for (const slug of cases) {
        const response = await page.goto(`${locale === "es" ? "/proyectos" : "/en/projects"}/${slug}`);
        expect(response?.status()).toBe(200);
        await page.evaluate(() => document.fonts.ready);
        for (const image of await page.locator("main img").all()) await image.scrollIntoViewIfNeeded();
        await page.waitForLoadState("networkidle");
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
        await expect(page.locator("h1")).toBeVisible();
        await expect(page.locator("[data-project-showcase] img")).toBeVisible();
        await expect(page.locator("[data-project-showcase] figcaption")).toContainText(locale === "es" ? "Captura" : "screenshot");
        await expect(page.locator("[data-project-showcase] video")).toHaveCount(0);
        await page.screenshot({ path: path.join(caseOutput!, `${device}-${locale}-${slug}-hero.png`) });
        for (const image of await page.locator("main img").all()) {
          expect(await image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        }
        await page.screenshot({ path: path.join(caseOutput!, `${device}-${locale}-${slug}-full.png`), fullPage: true });
        results.push({ device, locale, slug, status: response?.status(), errors: [...errors] });
      }
      expect(errors).toEqual([]);
      await context.close();
    }
  }
  await writeFile(path.join(caseOutput!, "case-matrix.json"), JSON.stringify(results, null, 2));
});

for (const locale of ["es", "en"] as const) {
  test(`selected work preserves destinations, lazy media and reduced motion: ${locale}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(locale === "es" ? "/" : "/en");
    const scenes = page.locator(".project-scene");
    await expect(scenes).toHaveCount(3);
    await expect(scenes.locator("h3")).toHaveText(["Distrito Gourmet", "LumaFlow Studio", "raw.vives"]);
    expect(await scenes.evaluateAll(elements => elements.map(element => element.getAttribute("data-layout"))))
      .toEqual(["restaurant", "product", "photography"]);
    for (const scene of await scenes.all()) {
      await scene.scrollIntoViewIfNeeded();
      await expect(scene.locator(".scene-copy")).toHaveCSS("transform", "none");
      await expect(scene.locator(".scene-media")).toHaveCSS("transform", "none");
      await expect(scene.locator("img").first()).toHaveAttribute("loading", "lazy");
      for (const link of await scene.locator("a").all()) {
        expect(await link.getAttribute("href")).toMatch(/^(https:\/\/|\/)/);
        await link.focus();
        await expect(link).toBeFocused();
        expect(await link.evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe("none");
      }
    }
    await expect(page.getByText("AI Creative Assistant", { exact: true })).toHaveCount(0);
    for (const [index, slug] of cases.entries()) {
      const link = scenes.nth(index).locator("a").first();
      await link.click();
      await expect(page).toHaveURL(new RegExp(`${locale === "es" ? "/proyectos" : "/en/projects"}/${slug}$`));
      await expect(page.locator("h1")).toBeVisible();
      await page.goBack({ waitUntil: "domcontentloaded" });
      await expect(page).toHaveURL(locale === "es" ? /\/$/ : /\/en$/);
      await expect(scenes.first().locator("h3")).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  });
}

test("project reveals restore their static state when motion preference changes", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  for (const scene of await page.locator(".project-scene").all()) {
    await scene.scrollIntoViewIfNeeded();
    await expect.poll(() => scene.locator(".scene-copy").evaluate(element => Math.abs(new DOMMatrix(getComputedStyle(element).transform).m42))).toBeLessThan(.1);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const frame of await page.locator(".project-scene figure > a").all()) await expect(frame).toHaveCSS("clip-path", "none");
  for (const plane of await page.locator(".scene-media").all()) await expect(plane).toHaveCSS("transform", "none");
  expect(errors).toEqual([]);
});

test("secondary previews enhance fine-pointer and keyboard interaction only", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const finePointer = await page.evaluate(() => matchMedia("(hover: hover) and (pointer: fine)").matches);
  const scene = page.locator(".project-scene").nth(1);
  const link = scene.locator("figure > a");
  await expect(scene.locator("img")).toHaveCount(1);
  await link.hover();
  await expect(scene.locator("img")).toHaveCount(finePointer ? 2 : 1);
  await page.mouse.move(0, 0);
  await link.blur();
  await expect(scene.locator("img")).toHaveCount(finePointer ? 2 : 1);
  if (finePointer) await expect(scene.locator('img[aria-hidden="true"]')).toHaveCSS("opacity", "0");
  await link.focus();
  await expect(scene.locator("img")).toHaveCount(finePointer ? 2 : 1);
  await link.blur();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await link.hover();
  await expect(scene.locator("img")).toHaveCount(finePointer ? 2 : 1);
  if (finePointer) await expect(scene.locator('img[aria-hidden="true"]')).toHaveCSS("opacity", "0");
});

test("selected work remains usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/en");
  for (const scene of await page.locator(".project-scene").all()) {
    await scene.scrollIntoViewIfNeeded();
    await expect(scene.locator("h3")).toBeVisible();
    await expect(scene.locator("figure > a")).toHaveCSS("clip-path", "none");
    expect(await scene.locator("a").first().getAttribute("href")).toMatch(/^(https:\/\/|\/)/);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await context.close();
});

test("public project indexes expose the same three projects in both locales", async ({ page }) => {
  for (const route of ["/proyectos", "/en/projects"]) {
    expect((await page.goto(route))?.status()).toBe(200);
    await expect(page.locator("h1")).toBeVisible();
    await expect(page.locator(".project-scene")).toHaveCount(3);
    expect(await page.locator("main").count()).toBe(1);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  }
});
