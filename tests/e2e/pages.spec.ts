import { expect, test } from "@playwright/test";
import { ROUTE_PAIRS } from "../../lib/i18n-paths";
import { CASES, contrastRatios, hasHorizontalOverflow, heroLinesFit } from "./helpers";

const routes = [...ROUTE_PAIRS.flatMap(pair => [pair.es, pair.en]), "/legal", "/en/legal"];

test("every public page has one heading, no clipped content and loaded images", { tag: ["@responsive"] }, async ({ page }) => {
  const failedImages: string[] = [];
  page.on("response", response => {
    if (response.request().resourceType() === "image" && response.status() >= 400) failedImages.push(`${response.status()} ${response.url()}`);
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of routes) {
    expect((await page.goto(route))?.status(), route).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("main"), route).toHaveCount(1);
    await expect(page.locator("h1"), route).toHaveCount(1);
    await expect(page.locator("h1"), route).toBeVisible();
    expect(await hasHorizontalOverflow(page), `${route} overflows horizontally`).toBe(false);
    // Catch clipping inside overflow containers as well as document overflow.
    const clipped = await page.locator("main :is(h1, h2, h3, h4), main > section:first-child > nav:first-child a").evaluateAll(elements =>
      elements.filter(element => {
        const box = element.getBoundingClientRect();
        return box.left < -1 || box.right > innerWidth + 1;
      }).map(element => element.textContent));
    expect(clipped, route).toEqual([]);
    // Responsive duplicates (hero thumbnails on touch, plate on desktop) are not rendered at every width.
    for (const image of await page.locator("main img").all()) {
      if (!(await image.isVisible())) continue;
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth), route).toBeGreaterThan(0);
    }
  }
  expect(failedImages).toEqual([]);
});

test("the home keeps its headline and layout intact from 320px to desktop", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of ["/", "/en"]) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    for (const width of [320, 768, 1024, 1440]) {
      await page.setViewportSize({ width, height: 900 });
      expect(await hasHorizontalOverflow(page), `${path} at ${width}px overflows`).toBe(false);
      expect(await heroLinesFit(page), `${path} at ${width}px clips the headline`).toBe(true);
    }
  }
});

test("case navigation and contact placeholders meet AA text contrast", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const paths = [...CASES.map(slug => `/proyectos/${slug}`), "/en/projects/raw-vives"];
  for (const path of paths) {
    await page.goto(path);
    await page.evaluate(() => document.fonts.ready);
    const items = await contrastRatios(page.locator(
      "main > section:first-child > nav:first-child :is(a, a span):not(.sr-only):not([aria-hidden=true])",
    ), { ownTextOnly: true });
    expect(items.length, path).toBeGreaterThan(2);
    for (const item of items) expect(item.ratio, `${path} ${item.text}`).toBeGreaterThanOrEqual(4.5);
  }
  await page.goto("/");
  for (const item of await contrastRatios(page.locator("#name, #email, #message"), { placeholder: true })) {
    expect(item.ratio, `placeholder ${item.text}`).toBeGreaterThanOrEqual(4.5);
  }
});
