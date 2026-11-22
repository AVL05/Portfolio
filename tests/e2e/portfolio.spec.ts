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
  const firstProject = projects.locator("ul").first().locator(":scope > li").first();
  await expect(firstProject.getByRole("heading", { name: "Sinergia", exact: true })).toBeVisible();
  await expect(firstProject.getByRole("link")).toHaveCount(1);
  await expect(firstProject.getByRole("link", { name: "Live · Sinergia" })).toHaveAttribute("href", "https://sinergia.aleviclop.dev/");

  const more = projects.locator("summary");
  const other = projects.locator("#other");
  await expect(other).toBeHidden();
  await more.click();
  await expect(other.locator(":scope > li")).toHaveCount(6);
  const raceFinder = other.locator(":scope > li").filter({
    has: page.getByRole("heading", { name: "RaceFinder", exact: true }),
  });
  await expect(raceFinder.getByRole("link")).toHaveCount(1);
  await expect(raceFinder.getByRole("link", { name: "Code · RaceFinder" })).toHaveAttribute("href", "https://github.com/AVL05/RaceFinder");

  await expect(other.getByRole("heading", { name: "Distrito Gourmet", exact: true })).toBeVisible();
  await expect(other.getByRole("link", { name: "Live · Distrito Gourmet" })).toHaveAttribute("href", "https://distrito-gourmet.aleviclop.dev");
  await expect(other.getByRole("link", { name: "Code · Distrito Gourmet" })).toHaveAttribute("href", "https://github.com/AVL05/distrito-gourmet");
  await expect(projects.getByRole("link", { name: "Code · LumaFlow Studio" })).toHaveAttribute("href", "https://github.com/AVL05/lumaflow-studio");
  await page.locator('a[hreflang="en"]').first().click();
  await expect(page).toHaveURL(/\/en\/?(?:#projects)?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
  await expect(firstProject.getByRole("heading", { name: "Sinergia", exact: true })).toBeVisible();
  await expect(firstProject.getByRole("link")).toHaveCount(1);
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
