import { expect, test } from "@playwright/test";

test("critical font preloads stay selective and the hero uses its branded families", async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator('link[rel="preload"][as="font"]')).toHaveCount(3);
  await expect(page.locator("[data-hero-title]")).toHaveCSS("font-family", /Space Grotesk/);
  await expect(page.locator("p[data-hero-copy]")).toHaveCSS("font-family", /Inter/);
});

for (const [path, title, role, work, cv] of [
  ["/", "Código. Criterio.", "Desarrollador Full-Stack", "Ver proyectos", "Descargar CV"],
  ["/en", "Code. Craft.", "Full-Stack Developer", "View work", "Download CV"],
]) {
  test(`hero preserves professional identity, links and responsive layout: ${path}`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    const models: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("request", request => { if (request.url().endsWith(".glb")) models.push(request.url()); });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    const hero = page.locator("#hero");
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(title);
    await expect(hero.getByText(role, { exact: true })).toBeVisible();
    await expect(hero.getByText("Alex Vicente López", { exact: true })).toBeVisible();
    await expect(hero.getByRole("link", { name: work, exact: true })).toHaveAttribute("href", "#projects");
    await expect(hero.getByRole("link", { name: cv, exact: true })).toHaveAttribute("download", "");
    expect((await page.request.get("/cv/CV_Alex_Vicente_Lopez.pdf")).ok()).toBe(true);
    await page.evaluate(() => document.fonts.ready);
    const layout = await hero.evaluate(element => ({
      overflow: document.documentElement.scrollWidth > innerWidth,
      clippedLines: [...element.querySelectorAll<HTMLElement>("[data-hero-line]")].some(line => line.scrollWidth > line.parentElement!.clientWidth + 1),
      titleFont: getComputedStyle(element.querySelector("h1")!).fontFamily,
    }));
    expect(layout.overflow).toBe(false);
    expect(layout.clippedLines).toBe(false);
    expect(layout.titleFont).toContain("Space Grotesk");
    const contrast = await hero.evaluate(element => {
      const luminance = (color: string) => {
        const rgb = color.match(/[\d.]+/g)!.slice(0, 3).map(value => {
          const channel = Number(value) / 255;
          return channel <= .04045 ? channel / 12.92 : ((channel + .055) / 1.055) ** 2.4;
        });
        return rgb[0] * .2126 + rgb[1] * .7152 + rgb[2] * .0722;
      };
      const background = getComputedStyle(element.closest(".premium-home")!).backgroundColor;
      const heroRatios = ["p[data-hero-copy]", "h1 > span:last-child [data-hero-line]", "[data-magnetic]"].map(selector => {
        const target = element.querySelector(selector)!;
        const style = getComputedStyle(target);
        const values = [luminance(style.color), luminance(selector === "[data-magnetic]" ? style.backgroundColor : background)].sort((a, b) => a - b);
        return (values[1] + .05) / (values[0] + .05);
      });
      const formRatios = ["name", "email", "message"].map(id => {
        const label = document.querySelector(`#contact label[for="${id}"]`)!;
        const card = label.closest('[data-slot="card"]')!;
        const values = [luminance(getComputedStyle(label).color), luminance(getComputedStyle(card).backgroundColor)].sort((a, b) => a - b);
        return (values[1] + .05) / (values[0] + .05);
      });
      return [...heroRatios, ...formRatios];
    });
    contrast.forEach(ratio => expect(ratio).toBeGreaterThanOrEqual(4.5));
    for (const link of await page.locator("#projects a[aria-label]").all()) {
      expect((await link.getAttribute("aria-label"))!.toLowerCase()).toContain((await link.innerText()).trim().toLowerCase());
    }
    expect(models).toEqual([]);
    expect(errors).toEqual([]);
    await page.screenshot({ path: testInfo.outputPath("hero.png") });
  });

  test(`hero and navigation work without JavaScript: ${path}`, async ({ browser }, testInfo) => {
    const context = await browser.newContext({ javaScriptEnabled: false, viewport: testInfo.project.use.viewport });
    const page = await context.newPage();
    try {
      await page.goto(path);
      await expect(page.locator("h1")).toHaveText(title);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("#hero").getByRole("link", { name: cv, exact: true })).toBeVisible();
      const navigation = page.getByRole("navigation", { name: /Navegación móvil|Mobile navigation/ });
      if (testInfo.project.name.includes("mobile")) await expect(navigation).toBeVisible();
      await expect(page.locator('a[hrefLang]')).toHaveAttribute("href", path === "/" ? "/en" : "/");
    } finally { await context.close(); }
  });
}

test("headlines remain inside their masks at small and tablet widths", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes("mobile"), "Additional viewport sweep on desktop context");
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/", "/en"]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    for (const width of [320, 768, 1024]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await page.locator("#hero").evaluate(element =>
        document.documentElement.scrollWidth <= innerWidth &&
        [...element.querySelectorAll<HTMLElement>("[data-hero-line]")].every(line => line.scrollWidth <= line.parentElement!.clientWidth + 1),
      )).toBe(true);
    }
  }
});

test("mobile dialog traps focus, closes with Escape and restores focus", async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.includes("mobile"), "Mobile navigation only");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const trigger = page.getByRole("button", { name: "Abrir menú" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Menú", exact: true });
  await expect(dialog).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    // Native dialogs can move focus to browser chrome between tab cycles.
    expect(await dialog.evaluate(element => element.matches(":modal") && (element.contains(document.activeElement) || document.activeElement === document.body))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: "Sobre mí", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.locator("#experience-title")).toBeInViewport();
});

test("hero entrance finishes and reduced motion resets live transforms", async ({ page }) => {
  await page.addInitScript(() => {
    const sample = () => {
      const description = document.querySelector("p[data-hero-copy]");
      if (description && Number(getComputedStyle(description).opacity) < 1) {
        document.documentElement.dataset.heroCopyHidden = "true";
      }
      if (description && getComputedStyle(description).transform !== "none") {
        document.documentElement.dataset.heroCopyMoved = "true";
      }
      if (performance.now() < 5000) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  const line = page.locator("[data-hero-line]").last();
  await expect.poll(async () => line.evaluate(element => {
    const transform = getComputedStyle(element).transform;
    return transform === "none" || Math.abs(new DOMMatrix(transform).m42) < .1;
  })).toBe(true);
  await expect(page.locator("[data-hero-footer]")).toHaveCSS("opacity", "1");
  await expect(page.locator("html")).not.toHaveAttribute("data-hero-copy-hidden", "true");
  await expect(page.locator("html")).not.toHaveAttribute("data-hero-copy-moved", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(line).toHaveCSS("transform", "none");
  await expect(page.locator("[data-hero-title]")).toHaveCSS("transform", "none");
});

test("magnetic content stays bounded and the clickable area stays fixed", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes("mobile"), "Mouse interaction only");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  await page.waitForLoadState("networkidle");
  const button = page.locator("[data-magnetic]").first();
  await page.evaluate(() => document.fonts.ready);
  await expect(page.locator("[data-hero-footer]")).toHaveCSS("opacity", "1");
  const before = await button.boundingBox();
  if (!before) throw new Error("Missing primary button");
  // Test inside the circular hit area, rather than its transparent corners.
  await button.hover({ position: { x: before.width * .75, y: before.height * .25 } });
  await expect.poll(() => button.locator("span").evaluate(element => {
    const matrix = new DOMMatrix(getComputedStyle(element).transform);
    return matrix.m41 > 0 && matrix.m41 <= 4 && Math.abs(matrix.m42) <= 3;
  })).toBe(true);
  expect(await button.boundingBox()).toEqual(before);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(button.locator("span")).toHaveCSS("transform", "none");
});

test("late hydration leaves the server-rendered hero visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route("**/_next/static/chunks/*.js", async route => {
    await new Promise(resolve => setTimeout(resolve, 1800));
    await route.continue();
  });
  await page.goto("/en");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("[data-hero-indicator]")).toHaveCSS("opacity", "1");
  await expect(page.locator("[data-hero-footer]")).toHaveCSS("opacity", "1");
  for (const line of await page.locator("[data-hero-line]").all()) {
    await expect(line).toHaveCSS("transform", "none");
  }
});

test("font loading does not wrap the masked headline or move the summary", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 412, height: 823 });
  await page.route("**/*.woff2", async route => {
    await new Promise(resolve => setTimeout(resolve, 2500));
    await route.continue();
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const summary = page.locator("[data-hero-summary]");
  const before = await summary.boundingBox();
  await page.evaluate(() => document.fonts.ready);
  const after = await summary.boundingBox();
  expect(before).not.toBeNull();
  expect(after).not.toBeNull();
  expect(Math.abs(after!.y - before!.y)).toBeLessThan(1);
});

test("offscreen content stays rendered and deferred reveals finish on approach", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const copy = page.locator(".scene-copy").first();
  await expect(copy).toHaveCSS("opacity", "1");
  await expect(page.locator(".capability-row").first()).toHaveCSS("opacity", "1");
  await copy.scrollIntoViewIfNeeded();
  await expect(copy).toHaveCSS("opacity", "1");
  await expect.poll(() => copy.evaluate(element => Math.abs(new DOMMatrix(getComputedStyle(element).transform).m42))).toBeLessThan(.1);
  const row = page.locator(".capability-row").first();
  await row.scrollIntoViewIfNeeded();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(row).toHaveCSS("opacity", "1");
  await expect(row).toHaveCSS("transform", "none");
});
