import { expect, test } from "@playwright/test";

test("visitors can explore the work, switch languages and download the CV", { tag: "@responsive" }, async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Alex Vicente López");

  const cv = await page.getByRole("link", { name: "Descargar CV" }).first().getAttribute("href");
  expect(cv).toBeTruthy();
  const download = await request.get(cv!);
  expect(download.ok()).toBe(true);
  expect(download.headers()["content-type"]).toContain("application/pdf");

  await page.getByRole("link", { name: "Ver proyectos" }).click();
  const projects = page.locator("#projects");
  await expect(projects.getByRole("heading", { name: "Proyectos", exact: true })).toBeVisible();
  const more = projects.locator("summary");
  await expect(projects.locator("#other")).toBeHidden();
  await more.click();
  await expect(projects.locator("#other > li")).toHaveCount(4);
  await expect(projects.locator("#other").getByRole("link").first()).toBeVisible();

  await expect(projects.getByRole("heading", { name: "Distrito Gourmet", exact: true })).toBeVisible();
  await expect(projects.getByRole("link", { name: "Live · Distrito Gourmet" })).toHaveAttribute("href", "https://distrito-gourmet.aleviclop.dev");
  await expect(projects.getByRole("link", { name: "Code · LumaFlow Studio" })).toHaveAttribute("href", "https://github.com/AVL05/lumaflow-studio");
  await page.locator('a[hreflang="en"]').first().click();
  await expect(page).toHaveURL(/\/en\/?(?:#projects)?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth)).toBe(true);
});

test("the sitemap lists both home pages and old projects redirect to their section", async ({ request }) => {
  const robots = await request.get("/robots.txt");
  expect(robots.ok()).toBe(true);
  expect(await robots.text()).toMatch(/^Sitemap: .*\/sitemap\.xml$/m);

  const response = await request.get("/sitemap.xml");
  expect(response.ok()).toBe(true);
  const xml = await response.text();
  expect(xml.match(/<loc>/g)).toHaveLength(2);
  expect(xml).toMatch(/\/en<\/loc>/);
  expect(xml).toContain('hreflang="es"');
  expect(xml).toContain('hreflang="en"');
  expect(xml).not.toMatch(/\/(proyectos|projects)\//);

  for (const slug of ["distrito-gourmet", "lumaflow-studio", "raw-vives"]) {
    for (const [path, target] of [["/proyectos", "/#projects"], ["/en/projects", "/en#projects"], ["/es/proyectos", "/#projects"]]) {
      const oldPage = await request.get(`${path}/${slug}`, { maxRedirects: 0 });
      expect(oldPage.status()).toBe(308);
      expect(oldPage.headers()["location"]).toBe(target);
    }
  }
});
