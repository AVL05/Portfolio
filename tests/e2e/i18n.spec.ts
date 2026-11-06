import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("the language switcher reaches the equivalent page in the other locale", { tag: ["@smoke"] }, async ({ page }) => {
  await page.goto("/proyectos/lumaflow-studio");
  await page.locator('a[hrefLang="en"]').first().click();
  await expect(page).toHaveURL("/en/projects/lumaflow-studio");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", "https://www.aleviclop.dev/en/projects/lumaflow-studio");
  await page.locator('a[hrefLang="es"]').first().click();
  await expect(page).toHaveURL("/proyectos/lumaflow-studio");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});

test("the URL alone decides the language, ignoring cookies", async ({ page, context }) => {
  await context.addCookies([{ name: "language", value: "en", domain: "127.0.0.1", path: "/" }]);
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.locator("#hero-title")).toBeVisible();
});

test("missing routes and legal pages stay localized, honest and non-indexable", async ({ page }) => {
  const cases = [
    { path: "/ruta-que-no-existe", status: 404, heading: "Página no encontrada." },
    { path: "/en/missing-route", status: 404, heading: "Page not found." },
    { path: "/proyectos/inexistente", status: 404 },
    { path: "/en/projects/missing", status: 404 },
    { path: "/es/projects", status: 404 },
    { path: "/legal", status: 200 },
    { path: "/en/legal", status: 200 },
  ];
  for (const { path, status, heading } of cases) {
    expect((await page.goto(path))?.status(), path).toBe(status);
    if (heading) await expect(page.getByRole("heading", { name: heading }), path).toBeVisible();
    await expect(page.locator('meta[name="robots"]').first(), path).toHaveAttribute("content", /noindex/);
    await expect(page.locator('link[rel="alternate"][hreflang]'), path).toHaveCount(0);
    expect((await page.locator('script[type="application/ld+json"]').allTextContents()).join("\n"), path).not.toContain('"@type":"ProfilePage"');
  }
  await page.goto("/en/legal");
  await expect(page.locator('a[hreflang="es"]')).toHaveAttribute("href", "/legal");
});
