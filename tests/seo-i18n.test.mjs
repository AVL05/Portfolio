import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { ModuleKind, transpileModule } from "typescript";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

function loadLib(relativePath, extraModules = {}, env = process.env) {
  const module = { exports: {} };
  const sandbox = {
    module,
    exports: module.exports,
    URL,
    process: { env },
    require: (id) => {
      if (id in extraModules) return extraModules[id];
      if (id === "next") return {};
      throw new Error(`Unexpected import: ${id}`);
    },
  };
  runInNewContext(
    transpileModule(read(relativePath), {
      compilerOptions: { module: ModuleKind.CommonJS },
    }).outputText,
    sandbox,
  );
  return module.exports;
}

const i18n = loadLib("lib/i18n-paths.ts");
const seo = loadLib("lib/seo.ts", { "@/lib/i18n-paths": i18n });

test("Vercel production always uses the public canonical origin", () => {
  for (const origin of [undefined, "https://aleviclop.dev", "https://example.vercel.app", "http://localhost:3100"]) {
    const production = loadLib("lib/seo.ts", { "@/lib/i18n-paths": i18n }, {
      VERCEL_ENV: "production", NEXT_PUBLIC_SITE_URL: origin,
    });
    assert.equal(production.SITE_URL, "https://www.aleviclop.dev");
    assert.equal(production.absoluteUrl("/en"), "https://www.aleviclop.dev/en");
  }
  const preview = loadLib("lib/seo.ts", { "@/lib/i18n-paths": i18n }, {
    VERCEL_ENV: "preview", NEXT_PUBLIC_SITE_URL: "https://example.vercel.app/",
  });
  assert.equal(preview.SITE_URL, "https://example.vercel.app");
  const development = loadLib("lib/seo.ts", { "@/lib/i18n-paths": i18n }, {
    NEXT_PUBLIC_SITE_URL: "http://localhost:3100/",
  });
  assert.equal(development.SITE_URL, "http://localhost:3100");
});

test("home social titles follow the serving language", () => {
  for (const locale of ["es", "en"]) {
    const metadata = seo.buildPageMetadata({ locale, path: locale === "es" ? "/" : "/en", description: "Profile" });
    const title = locale === "es" ? seo.SITE_TITLE : seo.EN_SITE_TITLE;
    assert.equal(metadata.openGraph.title, title);
    assert.equal(metadata.twitter.title, title);
  }
});

test("ProfilePage belongs to the two home pages, never a shared layout", () => {
  for (const layout of ["app/(es)/layout.tsx", "app/(en)/layout.tsx"]) {
    assert.doesNotMatch(read(layout), /profilePageJsonLd|ProfilePage/);
  }
  for (const home of ["app/(es)/page.tsx", "app/(en)/en/page.tsx"]) {
    assert.match(read(home), /profilePageJsonLd/);
  }
});

test("retired sections redirect to real replacements without catching unknown routes", async () => {
  const { default: config } = await import("../next.config.mjs");
  const redirects = await config.redirects();
  for (const [source, destination] of [
    ["/contacto", "/#contact"], ["/en/contact", "/en#contact"],
    ["/proyectos", "/#projects"], ["/en/projects", "/en#projects"],
    ["/sobre-mi", "/#experience"], ["/en/about", "/en#experience"],
    ["/fotografia", "/#photography"], ["/en/photography", "/en#photography"],
  ]) {
    const redirect = redirects.find(rule => rule.source === source && !rule.has);
    assert.ok(redirect, source);
    assert.equal(redirect.destination, destination);
    assert.equal(redirect.permanent, true);
    const hostRedirect = redirects.find(rule => rule.source === source && rule.has);
    assert.equal(hostRedirect?.destination, `https://www.aleviclop.dev${destination}`);
  }
  const alias = redirects.find(rule => rule.source === "/:path*");
  assert.deepEqual(alias?.has, [{ type: "host", value: "aleviclop.vercel.app" }]);
  assert.equal(alias?.destination, "https://www.aleviclop.dev/:path*");
  assert.equal(alias?.permanent, true);
  assert.ok(!redirects.some(rule => rule.source === "/:path*" && !rule.has));
});

test("legal navigation preserves locale without adding indexable URLs", () => {
  assert.equal(i18n.localizeHref("/legal", "en"), "/en/legal");
  assert.equal(i18n.getAlternatePath("/en/legal", "es"), "/legal");
  assert.equal(i18n.getAlternatePath("/legal", "en"), "/en/legal");
  assert.equal(seo.languageAlternates("/legal", "es"), undefined);
  assert.equal(seo.languageAlternates("/en/legal", "en"), undefined);
  assert.equal(seo.INDEXABLE_ROUTES.length, 8);
});

const EXPECTED_PAGES = [
  ["/", "app/(es)/page.tsx", "es"],
  ["/en", "app/(en)/en/page.tsx", "en"],
  ["/proyectos/raw-vives", "app/(es)/proyectos/raw-vives/page.tsx", "es"],
  ["/en/projects/raw-vives", "app/(en)/en/projects/raw-vives/page.tsx", "en"],
  [
    "/proyectos/lumaflow-studio",
    "app/(es)/proyectos/lumaflow-studio/page.tsx",
    "es",
  ],
  [
    "/en/projects/lumaflow-studio",
    "app/(en)/en/projects/lumaflow-studio/page.tsx",
    "en",
  ],
  [
    "/proyectos/distrito-gourmet",
    "app/(es)/proyectos/distrito-gourmet/page.tsx",
    "es",
  ],
  [
    "/en/projects/distrito-gourmet",
    "app/(en)/en/projects/distrito-gourmet/page.tsx",
    "en",
  ],
];

test("sitemap contains exactly the 8 indexable URLs, 4 ES + 4 EN", () => {
  const { INDEXABLE_ROUTES } = seo;
  assert.equal(INDEXABLE_ROUTES.length, 8);
  assert.equal(
    INDEXABLE_ROUTES.filter((route) => route.locale === "es").length,
    4,
  );
  assert.equal(
    INDEXABLE_ROUTES.filter((route) => route.locale === "en").length,
    4,
  );
  const paths = INDEXABLE_ROUTES.map((route) => route.path).sort();
  assert.equal(
    paths.join("\n"),
    EXPECTED_PAGES.map(([path]) => path)
      .sort()
      .join("\n"),
  );
  for (const route of INDEXABLE_ROUTES) {
    assert.doesNotMatch(route.path, /legal|avatar-preview|api\//);
  }
  const sitemap = read("app/sitemap.ts");
  assert.match(sitemap, /INDEXABLE_ROUTES/);
  assert.match(sitemap, /alternates/);
  assert.match(sitemap, /languages/);
});

test("canonical is self-referential and hreflang is reciprocal with ES x-default", () => {
  const { absoluteUrl, languageAlternates } = seo;
  for (const [path, , locale] of EXPECTED_PAGES) {
    const alternates = languageAlternates(path, locale);
    assert.ok(alternates, `${path} has alternates`);
    assert.equal(alternates.canonical, absoluteUrl(path));
    const { es, en } = i18n.ROUTE_PAIRS.find(
      (pair) => pair.es === path || pair.en === path,
    );
    assert.equal(alternates.languages.es, absoluteUrl(es));
    assert.equal(alternates.languages.en, absoluteUrl(en));
    assert.equal(alternates.languages["x-default"], absoluteUrl(es));
  }
  // Reciprocity across the pair.
  const esAlt = languageAlternates("/proyectos/raw-vives", "es");
  const enAlt = languageAlternates("/en/projects/raw-vives", "en");
  assert.deepEqual(esAlt.languages, enAlt.languages);
  // Non-indexable paths get canonical only, never hreflang.
  assert.equal(languageAlternates("/legal", "es"), undefined);
  assert.equal(languageAlternates("/en/legal", "en"), undefined);
});

test("every indexable page declares its own locale and canonical path", () => {
  for (const [path, file, locale] of EXPECTED_PAGES) {
    assert.equal(existsSync(new URL(file, root)), true, file);
    const source = read(file);
    assert.match(source, new RegExp(`locale: "${locale}"`), file);
    assert.match(
      source,
      new RegExp(`path: "${path.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"`),
      file,
    );
    assert.match(source, /buildPageMetadata/, file);
  }
});

test("JSON-LD declares a single inLanguage per localized page", () => {
  for (const file of [
    "app/(es)/layout.tsx",
    "app/(en)/layout.tsx",
    "app/(es)/proyectos/raw-vives/page.tsx",
    "app/(en)/en/projects/raw-vives/page.tsx",
    "app/(es)/proyectos/lumaflow-studio/page.tsx",
    "app/(en)/en/projects/lumaflow-studio/page.tsx",
    "app/(es)/proyectos/distrito-gourmet/page.tsx",
    "app/(en)/en/projects/distrito-gourmet/page.tsx",
  ]) {
    const source = read(file);
    assert.doesNotMatch(source, /inLanguage: \["es", "en"\]/, file);
  }
  assert.match(read("app/(es)/layout.tsx"), /inLanguage: "es"/);
  assert.match(read("app/(en)/layout.tsx"), /inLanguage: "en"/);
  assert.match(
    read("app/(es)/proyectos/lumaflow-studio/page.tsx"),
    /inLanguage: "es"/,
  );
  assert.match(
    read("app/(en)/en/projects/lumaflow-studio/page.tsx"),
    /inLanguage: "en"/,
  );
});

test("no URL renders a locale from cookies, storage, headers or user agent", () => {
  for (const file of [
    "lib/request-language.ts",
    "lib/locale-preference.ts",
    "app/api/language/route.ts",
  ]) {
    assert.equal(existsSync(new URL(file, root)), false, file);
  }
  const appSource = [
    ...EXPECTED_PAGES.map(([, file]) => read(file)),
    read("app/(es)/layout.tsx"),
    read("app/(en)/layout.tsx"),
  ].join("\n");
  assert.doesNotMatch(appSource, /cookies\(\)/);
  assert.doesNotMatch(appSource, /headers\(\)/);
  assert.doesNotMatch(appSource, /localStorage/);
  assert.doesNotMatch(appSource, /Accept-Language/);
  assert.doesNotMatch(appSource, /getRequestLanguage/);
  assert.match(read("app/(es)/layout.tsx"), /lang="es"/);
  assert.match(read("app/(en)/layout.tsx"), /lang="en"/);
  assert.doesNotMatch(
    read("app/(es)/layout.tsx") + read("app/(en)/layout.tsx"),
    /document\.documentElement\.lang/,
  );
});

test("locale-dependent internal links stay inside their language", () => {
  for (const file of [
    "components/project-case-study.tsx",
    "components/raw-vives-case-study.tsx",
    "components/not-found-content.tsx",
    "components/legal-page-content.tsx",
    "components/contact.tsx",
  ]) {
    assert.match(read(file), /localizeHref/, file);
  }
  const enShell = [
    read("app/(en)/en/projects/raw-vives/page.tsx"),
    read("app/(en)/en/projects/lumaflow-studio/page.tsx"),
    read("app/(en)/en/projects/distrito-gourmet/page.tsx"),
  ].join("\n");
  assert.doesNotMatch(enShell, /"\/proyectos\//);
});

test("unmatched URLs use the global 404 localized purely from the path", () => {
  assert.equal(existsSync(new URL("app/global-not-found.tsx", root)), true);
  assert.doesNotMatch(read("app/global-not-found.tsx"), /useLanguage/);
  assert.match(read("app/global-not-found.tsx"), /robots: \{ index: false/);
  assert.match(read("app/global-not-found.tsx"), /lang="es"/);
  const content = read("components/not-found-content.tsx");
  assert.match(content, /usePathname/);
  assert.match(content, /Página no encontrada/);
  assert.match(content, /Page not found/);
  assert.doesNotMatch(content, /localStorage|cookies\(\)|Accept-Language/);
  assert.match(read("next.config.mjs"), /globalNotFound: true/);
});

test("uncaught errors use a localized global recovery boundary", () => {
  assert.equal(existsSync(new URL("app/global-error.tsx", root)), true);
  const source = read("app/global-error.tsx");
  assert.match(source, /"use client"/);
  assert.match(source, /getLocaleFromPathname/);
  assert.match(source, /onClick=\{retry\}/);
  assert.match(source, /Algo ha salido mal/);
  assert.match(source, /Something went wrong/);
  assert.doesNotMatch(source, /error\.message|error\.stack|error\.digest/);
});

test("redirects are explicit, single-hop and chain-free", () => {
  const config = read("next.config.mjs");
  assert.doesNotMatch(config, /source: "\/es\/\*"/);
  for (const [source, destination] of [
    ["/es", "/"],
    ["/es/proyectos/raw-vives", "/proyectos/raw-vives"],
    ["/es/proyectos/lumaflow-studio", "/proyectos/lumaflow-studio"],
    ["/es/proyectos/distrito-gourmet", "/proyectos/distrito-gourmet"],
    ["/es/legal", "/legal"],
    ["/proyectos/raw-manager", "/proyectos/lumaflow-studio"],
  ]) {
    assert.match(config, new RegExp(`source: "${source}"`), source);
    assert.match(
      config,
      new RegExp(`destination: "${destination}"`),
      destination,
    );
  }
  // Every destination is a final 200 (indexable or legal), never another redirect.
  const redirectSources = [
    "/es",
    "/es/proyectos/raw-vives",
    "/es/proyectos/lumaflow-studio",
    "/es/proyectos/distrito-gourmet",
    "/es/legal",
    "/proyectos/raw-manager",
  ];
  for (const destination of [
    "/",
    "/proyectos/raw-vives",
    "/proyectos/lumaflow-studio",
    "/proyectos/distrito-gourmet",
    "/legal",
  ]) {
    assert.ok(!redirectSources.includes(destination), destination);
  }
});
