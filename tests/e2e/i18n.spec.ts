import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("spanish URLs always serve spanish, ignoring cookies", async ({
  page,
  context,
}) => {
  await context.addCookies([
    { name: "language", value: "en", domain: "127.0.0.1", path: "/" },
  ]);
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(
    page.getByRole("heading", { name: "Alex Vicente" }),
  ).toBeVisible();
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.aleviclop.dev",
  );
  await expect(
    page.locator('link[rel="alternate"][hreflang="en"]'),
  ).toHaveAttribute("href", "https://www.aleviclop.dev/en");
  await expect(
    page.locator('link[rel="alternate"][hreflang="x-default"]'),
  ).toHaveAttribute("href", "https://www.aleviclop.dev");
});

test("english URLs serve english with a self-referencing canonical", async ({
  page,
}) => {
  await page.goto("/en");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.aleviclop.dev/en",
  );
  await expect(
    page.locator('link[rel="alternate"][hreflang="es"]'),
  ).toHaveAttribute("href", "https://www.aleviclop.dev");
  await expect(
    page.getByRole("heading", { name: "Alex Vicente" }),
  ).toBeVisible();
});

test("the switcher navigates to the equivalent page in the other locale", async ({
  page,
}) => {
  await page.goto("/proyectos/lumaflow-studio");
  await page.locator('a[hrefLang="en"]').first().click();
  await expect(page).toHaveURL("/en/projects/lumaflow-studio");
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
    "href",
    "https://www.aleviclop.dev/en/projects/lumaflow-studio",
  );

  await page.locator('a[hrefLang="es"]').first().click();
  await expect(page).toHaveURL("/proyectos/lumaflow-studio");
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
});

test("guessed spanish prefixes redirect explicitly without chains", async ({
  request,
}) => {
  for (const [source, destination] of [
    ["/es", "/"],
    ["/es/proyectos", "/proyectos"],
    ["/es/sobre-mi", "/sobre-mi"],
  ]) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status(), source).toBe(308);
    expect(response.headers().location, source).toBe(destination);
  }
  const unknown = await request.get("/es/projects", { maxRedirects: 0 });
  expect(unknown.status()).toBe(404);
});

test("not-found pages stay localized and non-indexable", async ({ page }) => {
  const esResponse = await page.goto("/ruta-que-no-existe");
  expect(esResponse?.status()).toBe(404);
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(
    page.getByRole("heading", { name: "Página no encontrada." }),
  ).toBeVisible();
  // Next injects its own noindex on not-found pages; ours adds nofollow.
  await expect(
    page.locator('meta[name="robots"][content="noindex, nofollow"]'),
  ).toHaveCount(1);

  const enResponse = await page.goto("/en/missing-route");
  expect(enResponse?.status()).toBe(404);
  // global-not-found ships one static document (lang="es"); the visible
  // content localizes from the URL path after hydration.
  await expect(page.getByRole("heading", { name: "Page not found." })).toBeVisible();
  await expect(
    page.locator('meta[name="robots"][content="noindex, nofollow"]'),
  ).toHaveCount(1);
});
