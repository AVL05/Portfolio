import { expect, test } from "@playwright/test";

test.use({ contextOptions: { reducedMotion: "reduce" }, launchOptions: { args: ["--enable-unsafe-swiftshader"] } });

test("studio reveals once ready, follows desktop scroll and closes focus with Escape", async ({ page }, testInfo) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.goto("/");
  const studio = page.getByRole("region", { name: "Alex Creative Space" });
  await studio.scrollIntoViewIfNeeded();
  await expect(studio.locator('[data-ready="true"] canvas')).toBeVisible({ timeout: 60000 });
  await expect(page.locator("canvas")).toHaveCount(1);
  const before = await studio.boundingBox();
  await page.locator("#studio-photography").scrollIntoViewIfNeeded();
  if (!testInfo.project.name.includes("mobile")) {
    const after = await studio.boundingBox();
    expect(before && after && Math.abs(before.y - after.y)).toBeLessThan(25);
  }
  await studio.scrollIntoViewIfNeeded();
  await studio.getByRole("button", { name: /Expandir escena|Expand scene/ }).click();
  await expect(page.getByRole("dialog", { name: "Alex Creative Space" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(studio).toBeVisible();
  await expect(studio.getByRole("button", { name: /Expandir escena|Expand scene/ })).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(true);
  await page.screenshot({ path: testInfo.outputPath("studio.png") });
  expect(errors).toEqual([]);
});

test("a failed model keeps the static preview and disables reset", async ({ page }) => {
  await page.route("**/hero-3d/optimized/desk.glb", route => route.abort());
  await page.goto("/");
  const studio = page.getByRole("region", { name: "Alex Creative Space" });
  await studio.scrollIntoViewIfNeeded();
  await expect(studio.getByRole("status")).toContainText(/no está disponible|unavailable/, { timeout: 60000 });
  await expect(studio.locator('img[src*="studio-preview.webp"]')).toBeVisible();
  await expect(studio.getByRole("button", { name: /Restablecer vista|Reset view/ })).toBeDisabled();
});

test("the preview remains visible while a model is pending", async ({ page }) => {
  let release: () => void = () => {};
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/hero-3d/optimized/desk.glb", async route => {
    await pending;
    await route.continue();
  });
  try {
    await page.goto("/", { waitUntil: "domcontentloaded" });
    const studio = page.getByRole("region", { name: "Alex Creative Space" });
    await studio.scrollIntoViewIfNeeded();
    await expect(studio.locator('img[src*="studio-preview.webp"]')).toBeVisible();
    await expect(studio.getByRole("button", { name: /Restablecer vista|Reset view/ })).toBeDisabled();
    release();
    await expect(studio.locator('[data-ready="true"] canvas')).toBeVisible({ timeout: 60000 });
    await expect(studio.getByRole("status")).toHaveCount(0);
  } finally {
    release();
  }
});
