import { expect, test } from "@playwright/test";

test("visitors can explore the work, switch languages and download the CV", { tag: "@responsive" }, async ({ page, request }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText("Alex Vicente López");

  const verifyCv = async (file: string, command: string) => {
    const href = `/cv/${file}?v=2026-11-2`;
    const links = page.locator('a[data-track="cv-download"]');
    await expect(links).toHaveCount(3);
    for (const link of await links.all()) await expect(link).toHaveAttribute("href", href);
    const response = await request.get(href);
    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("application/pdf");

    await page.keyboard.press("Control+k");
    const search = page.getByRole("combobox");
    await search.fill(command);
    const download = page.waitForEvent("download");
    await search.press("Enter");
    expect((await download).suggestedFilename()).toBe(file);
  };
  await verifyCv("CV_Alex_Vicente_Lopez.pdf", "Descargar CV");

  await page.getByRole("link", { name: "Ver proyectos" }).click();
  const projects = page.locator("#projects");
  await expect(projects.getByRole("heading", { name: "Proyectos", exact: true })).toBeVisible();
  const featured = projects.locator("ul").first().locator(":scope > li");
  const featuredTitles = ["LumaFlow Studio", "RaceFinder", "Sinergia"];
  await expect(featured.getByRole("heading", { level: 3 })).toHaveText(featuredTitles);
  await expect(featured.getByRole("link", { name: "Demo · Sinergia" })).toHaveAttribute("href", "https://sinergia.aleviclop.dev/");
  const raceFinder = featured.nth(1);
  await expect(raceFinder.getByRole("link")).toHaveCount(1);
  await expect(raceFinder.getByRole("link", { name: "Código · RaceFinder" })).toHaveAttribute("href", "https://github.com/AVL05/RaceFinder");
  const cover = raceFinder.getByRole("img", { name: /dorsal 184/ });
  await cover.scrollIntoViewIfNeeded();
  const coverRatio = await cover.evaluate(async (image: HTMLImageElement) => {
    await image.decode();
    const { width, height } = image.getBoundingClientRect();
    return width / height;
  });
  expect(coverRatio).toBeCloseTo(1152 / 780, 2);

  const more = projects.locator("summary");
  const other = projects.locator("#other");
  await expect(other).toBeHidden();
  await more.click();
  await expect(other.locator(":scope > li")).toHaveCount(5);
  await expect(other.locator(":scope > li").first().getByRole("heading")).toHaveText("Premium Frontend Director");
  await expect(other.getByRole("link", { name: "Demo · ECHO: The Awakening" })).toHaveAttribute("href", "https://echo-the-awakening.pages.dev/");
  await expect(other.locator(":scope > li").last().getByRole("heading")).toHaveText("raw.vives");
  await expect(other.getByRole("link", { name: "Demo · raw.vives" })).toHaveAttribute("href", "https://rawvives.aleviclop.dev");

  await expect(other.getByRole("heading", { name: "Distrito Gourmet", exact: true })).toBeVisible();
  await expect(other.getByRole("link", { name: "Código · Distrito Gourmet" })).toHaveAttribute("href", "https://github.com/AVL05/distrito-gourmet");
  await expect(projects.getByRole("link", { name: "Código · LumaFlow Studio" })).toHaveAttribute("href", "https://github.com/AVL05/lumaflow-studio");
  await expect(projects.getByRole("link", { name: "Demo · LumaFlow Studio" })).toHaveAttribute("href", "https://lumaflow.aleviclop.dev/demo");
  await page.locator('a[hreflang="en"]').first().click();
  await expect(page).toHaveURL(/\/en\/?(?:#projects)?$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.getByRole("heading", { name: "Projects", exact: true })).toBeVisible();
  await expect(featured.getByRole("heading", { level: 3 })).toHaveText(featuredTitles);
  await expect(raceFinder.getByRole("img", { name: /bib number 184/ })).toBeVisible();
  await expect(projects.getByRole("link", { name: "Live · LumaFlow Studio" })).toHaveAttribute("href", "https://lumaflow.aleviclop.dev/demo");
  await verifyCv("CV_Alex_Vicente_Lopez_EN.pdf", "Download CV");
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
