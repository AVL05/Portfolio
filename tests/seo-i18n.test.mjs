import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { ModuleKind, transpileModule } from "typescript";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

function loadLib(relativePath, extraModules = {}) {
  const module = { exports: {} };
  const sandbox = {
    module,
    exports: module.exports,
    URL,
    process,
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

const EXPECTED_PAGES = [
  ["/", "app/(es)/page.tsx", "es"],
  ["/en", "app/(en)/en/page.tsx", "en"],
  ["/proyectos", "app/(es)/proyectos/page.tsx", "es"],
  ["/en/projects", "app/(en)/en/projects/page.tsx", "en"],
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
  ["/sobre-mi", "app/(es)/sobre-mi/page.tsx", "es"],
  ["/en/about", "app/(en)/en/about/page.tsx", "en"],
  ["/fotografia", "app/(es)/fotografia/page.tsx", "es"],
  ["/en/photography", "app/(en)/en/photography/page.tsx", "en"],
  ["/contacto", "app/(es)/contacto/page.tsx", "es"],
  ["/en/contact", "app/(en)/en/contact/page.tsx", "en"],
];

test("sitemap contains exactly the 16 indexable URLs, 8 ES + 8 EN", () => {
  const { INDEXABLE_ROUTES } = seo;
  assert.equal(INDEXABLE_ROUTES.length, 16);
  assert.equal(
    INDEXABLE_ROUTES.filter((route) => route.locale === "es").length,
    8,
  );
  assert.equal(
    INDEXABLE_ROUTES.filter((route) => route.locale === "en").length,
    8,
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
  const esAlt = languageAlternates("/proyectos", "es");
  const enAlt = languageAlternates("/en/projects", "en");
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
    "components/seo-page-shell.tsx",
    "components/project-case-study.tsx",
    "components/raw-vives-case-study.tsx",
    "components/not-found-content.tsx",
    "components/legal-page-content.tsx",
    "components/contact.tsx",
    "components/hero.tsx",
    "components/hero-3d/RoomHotspots.tsx",
  ]) {
    assert.match(read(file), /localizeHref/, file);
  }
  const enShell = [
    read("app/(en)/en/projects/raw-vives/page.tsx"),
    read("app/(en)/en/projects/lumaflow-studio/page.tsx"),
    read("app/(en)/en/projects/distrito-gourmet/page.tsx"),
  ].join("\n");
  assert.doesNotMatch(enShell, /"\/proyectos/);
  assert.doesNotMatch(enShell, /"\/sobre-mi"/);
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

test("redirects are explicit, single-hop and chain-free", () => {
  const config = read("next.config.mjs");
  assert.doesNotMatch(config, /source: "\/es\/\*"/);
  for (const [source, destination] of [
    ["/es", "/"],
    ["/es/proyectos", "/proyectos"],
    ["/es/proyectos/raw-vives", "/proyectos/raw-vives"],
    ["/es/proyectos/lumaflow-studio", "/proyectos/lumaflow-studio"],
    ["/es/proyectos/distrito-gourmet", "/proyectos/distrito-gourmet"],
    ["/es/sobre-mi", "/sobre-mi"],
    ["/es/fotografia", "/fotografia"],
    ["/es/contacto", "/contacto"],
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
    "/es/proyectos",
    "/es/proyectos/raw-vives",
    "/es/proyectos/lumaflow-studio",
    "/es/proyectos/distrito-gourmet",
    "/es/sobre-mi",
    "/es/fotografia",
    "/es/contacto",
    "/es/legal",
    "/proyectos/raw-manager",
  ];
  for (const destination of [
    "/",
    "/proyectos",
    "/proyectos/raw-vives",
    "/proyectos/lumaflow-studio",
    "/proyectos/distrito-gourmet",
    "/sobre-mi",
    "/fotografia",
    "/contacto",
    "/legal",
  ]) {
    assert.ok(!redirectSources.includes(destination), destination);
  }
});
