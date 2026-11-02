import { expect, test } from "@playwright/test";
import { ROUTE_PAIRS } from "../../lib/i18n-paths";

const origin = "https://www.aleviclop.dev";
const absolute = (path: string) => `${origin}${path === "/" ? "" : path}`;
const retired = [
  ["/contacto", "/#contact"], ["/en/contact", "/en#contact"],
  ["/proyectos", "/#projects"], ["/en/projects", "/en#projects"],
  ["/sobre-mi", "/#experience"], ["/en/about", "/en#experience"],
  ["/fotografia", "/#photography"], ["/en/photography", "/en#photography"],
  ["/proyectos/raw-manager", "/proyectos/lumaflow-studio"],
  ["/es", "/"], ["/es/legal", "/legal"],
  ...ROUTE_PAIRS.slice(1).map(pair => [`/es${pair.es}`, pair.es]),
];

// Validate the document delivered to crawlers, including content without hydration.
test.use({ javaScriptEnabled: false });

for (const pair of ROUTE_PAIRS) {
  for (const locale of ["es", "en"] as const) {
    const path = pair[locale];
    test(`indexable SEO contract: ${path}`, async ({ page, request }) => {
      const response = await page.goto(path);
      expect(response?.status()).toBe(200);
      expect(response?.headers()["x-robots-tag"] ?? "").not.toMatch(/noindex|none/i);
      await expect(page.locator("html")).toHaveAttribute("lang", locale);
      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toBeVisible();
      await expect(page.locator("main")).toBeVisible();
      await expect(page.locator("title")).toHaveCount(1);
      expect(await page.title()).not.toBe("");
      await expect(page.locator('meta[name="description"]')).toHaveCount(1);
      expect(await page.locator('meta[name="description"]').getAttribute("content")).toBeTruthy();
      const robots = await page.locator('meta[name="robots"], meta[name="googlebot"]').all();
      expect(robots.length).toBeGreaterThan(0);
      for (const directive of robots) {
        expect(await directive.getAttribute("content")).not.toMatch(/noindex|none/i);
      }
      await expect(page.locator('link[rel="canonical"]')).toHaveCount(1);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", absolute(path));
      await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(3);
      for (const [language, href] of [["es", absolute(pair.es)], ["en", absolute(pair.en)], ["x-default", absolute(pair.es)]]) {
        await expect(page.locator(`link[rel="alternate"][hreflang="${language}"]`)).toHaveCount(1);
        await expect(page.locator(`link[rel="alternate"][hreflang="${language}"]`)).toHaveAttribute("href", href);
      }
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute("content", absolute(path));
      await expect(page.locator('meta[property="og:locale"]')).toHaveAttribute("content", locale === "es" ? "es_ES" : "en_GB");
      for (const attribute of ["og:title", "og:description"]) {
        expect(await page.locator(`meta[property="${attribute}"]`).getAttribute("content")).toBeTruthy();
      }
      if (pair.es === "/") {
        await expect(page.locator('meta[property="og:title"]')).toHaveAttribute("content", new RegExp(locale === "es" ? "Desarrollador Full-Stack Junior" : "Junior Full-Stack Developer"));
      }
      const image = new URL((await page.locator('meta[property="og:image"]').getAttribute("content"))!);
      expect(image.origin).toBe(origin);
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute("content", image.toString());
      const media = await request.get(`${image.pathname}${image.search}`, { maxRedirects: 0 });
      expect(media.status()).toBe(200);
      expect(media.headers()["content-type"]).toMatch(/^image\//);
      expect((await media.body()).length).toBeGreaterThan(0);

      const entities = (await page.locator('script[type="application/ld+json"]').allTextContents())
        .flatMap(text => { const value = JSON.parse(text); return Array.isArray(value) ? value : [value]; });
      expect(entities.length).toBeGreaterThan(0);
      for (const entity of entities) {
        expect(entity["@context"]).toBe("https://schema.org");
        expect(entity["@type"]).toBeTruthy();
        expect(JSON.stringify(entity)).not.toMatch(/\.vercel\.app|localhost|127\.0\.0\.1/);
      }
      const person = entities.find(entity => entity["@type"] === "Person");
      expect(person.name).toBe("Alex Vicente López");
      expect(person["@id"]).toBe(`${origin}/#alex-vicente-lopez`);
      expect(person.description).toMatch(/frontend/i);
      expect(person.hasOccupation.name).toBe(person.jobTitle);
      expect(entities.filter(entity => entity["@type"] === "WebSite")).toHaveLength(1);
      const profiles = entities.filter(entity => entity["@type"] === "ProfilePage");
      expect(profiles).toHaveLength(pair.es === "/" ? 1 : 0);
      if (pair.es === "/") {
        expect(profiles[0].url).toBe(absolute(path));
        expect(profiles[0].inLanguage).toBe(locale);
        expect(profiles[0].mainEntity["@id"]).toBe(person["@id"]);
        expect(profiles[0].name).toBe(await page.title());
        expect(profiles[0].description).toBe(await page.locator('meta[name="description"]').getAttribute("content"));
      } else {
        const project = entities.find(entity => ["CreativeWork", "WebApplication"].includes(entity["@type"]));
        expect(project.inLanguage).toBe(locale);
        expect(project.author["@id"]).toBe(person["@id"]);
        expect(project.description).toBe(await page.locator('meta[name="description"]').getAttribute("content"));
        const breadcrumb = entities.find(entity => entity["@type"] === "BreadcrumbList");
        expect(breadcrumb.itemListElement.map((item: { position: number }) => item.position)).toEqual([1, 2]);
        expect(breadcrumb.itemListElement[0].item).toBe(absolute(locale === "es" ? "/" : "/en"));
        expect(breadcrumb.itemListElement[1].item).toBe(absolute(path));
      }
    });
  }
}

test("internal links, downloads and fragment targets resolve without redirects", async ({ page, request }) => {
  const targets = new Map<string, Set<string>>();
  const documentIds = new Map<string, Set<string>>();
  for (const path of ROUTE_PAIRS.flatMap(pair => [pair.es, pair.en])) {
    await page.goto(path);
    documentIds.set(path, new Set(await page.locator("[id]").evaluateAll(elements => elements.map(element => element.id))));
    for (const href of await page.locator("a[href]").evaluateAll(elements => elements.map(element => element.getAttribute("href")!))) {
      const url = new URL(href, page.url());
      if (![new URL(page.url()).origin, origin].includes(url.origin)) continue;
      const key = `${url.pathname}${url.search}`;
      const fragments = targets.get(key) ?? new Set<string>();
      if (url.hash) fragments.add(decodeURIComponent(url.hash.slice(1)));
      targets.set(key, fragments);
    }
  }
  for (const [target, fragments] of targets) {
    const response = await request.head(target, { maxRedirects: 0 });
    expect(response.status(), target).toBe(200);
    for (const fragment of fragments) {
      expect(documentIds.get(new URL(target, origin).pathname)?.has(fragment), `${target}#${fragment}`).toBe(true);
    }
  }
});

test("robots and sitemap expose exactly the eight canonical documents", async ({ request, page }) => {
  const robots = await request.get("/robots.txt", { maxRedirects: 0 });
  expect(robots.status()).toBe(200);
  const directives = await robots.text();
  expect(directives).toContain("Allow: /");
  expect(directives).toContain(`Sitemap: ${origin}/sitemap.xml`);
  expect(directives).toContain(`Host: ${origin}`);
  expect(directives).not.toMatch(/Disallow: \/(?:\s|api\/\s)/);
  expect(directives).not.toMatch(/Disallow: \/api\/og/);
  const response = await request.get("/sitemap.xml", { maxRedirects: 0 });
  expect(response.status()).toBe(200);
  expect(response.headers()["content-type"]).toContain("xml");
  const xml = await response.text();
  expect(xml).not.toMatch(/\.vercel\.app|localhost|127\.0\.0\.1/);
  const sitemap = await page.evaluate(source => {
    const doc = new DOMParser().parseFromString(source, "application/xml");
    if (doc.querySelector("parsererror")) throw new Error("Invalid sitemap XML");
    return [...doc.getElementsByTagName("url")].map(url => ({
      loc: url.getElementsByTagName("loc")[0].textContent,
      languages: Object.fromEntries([...url.getElementsByTagNameNS("http://www.w3.org/1999/xhtml", "link")]
        .map(link => [link.getAttribute("hreflang"), link.getAttribute("href")])),
    }));
  }, xml);
  expect(sitemap.map(item => item.loc).sort()).toEqual(ROUTE_PAIRS.flatMap(pair => [absolute(pair.es), absolute(pair.en)]).sort());
  for (const item of sitemap) {
    const pair = ROUTE_PAIRS.find(pair => [absolute(pair.es), absolute(pair.en)].includes(item.loc!))!;
    expect(item.languages).toEqual({ es: absolute(pair.es), en: absolute(pair.en), "x-default": absolute(pair.es) });
  }
});

test("legacy redirects reach a real document and section in one hop", async ({ request, page }) => {
  for (const [source, destination] of retired) {
    const response = await request.get(source, { maxRedirects: 0 });
    expect(response.status(), source).toBe(308);
    expect(response.headers().location, source).toBe(destination);
    const target = new URL(destination, origin);
    const final = await request.get(target.pathname, { maxRedirects: 0 });
    expect(final.status(), destination).toBe(200);
    expect(final.headers().location).toBeUndefined();
    if (target.hash) {
      await page.goto(target.pathname);
      await expect(page.locator(target.hash)).toHaveCount(1);
    }
  }
});

test("only the public Vercel alias redirects, including retired paths", async ({ request, baseURL }) => {
  test.skip(!["127.0.0.1", "localhost"].includes(new URL(baseURL!).hostname), "Host simulation runs only against the local server");
  for (const [source, destination] of [["/en", "/en"], ...retired]) {
    const response = await request.get(source, { maxRedirects: 0, headers: { host: "aleviclop.vercel.app" } });
    expect(response.status(), source).toBe(308);
    expect(response.headers().location).toBe(`${origin}${destination}`);
  }
  for (const host of ["localhost", "portfolio-preview.vercel.app"]) {
    expect((await request.get("/", { maxRedirects: 0, headers: { host } })).status()).toBe(200);
  }
});

test("legal pages and genuine missing routes remain non-indexable", async ({ page }) => {
  for (const path of ["/legal", "/en/legal", "/unknown-seo-route", "/en/unknown-seo-route", "/proyectos/unknown", "/es/projects"]) {
    const legal = path.endsWith("/legal");
    expect((await page.goto(path))?.status(), path).toBe(legal ? 200 : 404);
    expect(await page.locator('meta[name="robots"]').count()).toBeGreaterThan(0);
    for (const meta of await page.locator('meta[name="robots"]').all()) {
      expect(await meta.getAttribute("content")).toContain("noindex");
    }
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(0);
    expect((await page.locator('script[type="application/ld+json"]').allTextContents()).join("\n")).not.toContain('"@type":"ProfilePage"');
  }
});
