import assert from "node:assert/strict";
import { existsSync, readdirSync, readFileSync } from "node:fs";
import { extname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const read = (path) => readFileSync(join(root, path), "utf8");

function collectSourceFiles(directory) {
  return readdirSync(join(root, directory), { withFileTypes: true }).flatMap(
    (entry) => {
      const relativePath = join(directory, entry.name);
      if (entry.isDirectory()) return collectSourceFiles(relativePath);
      return [relativePath];
    },
  );
}

const uiFiles = [...collectSourceFiles("app"), ...collectSourceFiles("components")]
  .filter((path) => [".css", ".tsx"].includes(extname(path)))
  .map((path) => ({ path, source: read(path) }));

test("UI source keeps the readable type and radius contracts", () => {
  for (const { path, source } of uiFiles) {
    assert.doesNotMatch(
      source,
      /text-\[(?:[1-9]|10)px\]/,
      `${path}: text smaller than 11px`,
    );
    assert.doesNotMatch(
      source,
      /rounded-(?:xl|2xl)/,
      `${path}: surface radius exceeds the design system`,
    );
  }
});

test("legacy glass and glow surface styles do not return", () => {
  const source = uiFiles.map(({ source: content }) => content).join("\n");

  assert.doesNotMatch(
    source,
    /\b(?:glass|dev-border|premium-card|text-glow|section-alt-bg|glow-divider)\b/,
  );
});

test("contact form exposes localized inline validation", () => {
  const contact = read("components/contact.tsx");
  const es = read("lib/locales/es.json");
  const en = read("lib/locales/en.json");

  assert.match(contact, /noValidate/);
  assert.match(contact, /aria-invalid/);
  assert.match(contact, /aria-describedby/);
  assert.match(contact, /requestAnimationFrame/);
  assert.match(contact, /AbortSignal\.timeout\(12_000\)/);
  assert.match(es, /"form_error_email"/);
  assert.match(en, /"form_error_email"/);
});

test("focus, lazy 3D hero, and localized Open Graph contracts remain explicit", () => {
  const globals = read("app/globals.css");
  const hero = read("components/hero.tsx");
  const seo = read("lib/seo.ts");

  assert.match(globals, /:focus-visible/);
  assert.match(globals, /outline: 2px solid var\(--primary\)/);
  assert.match(hero, /<CreativeRoomHero/);
  assert.match(read("components/hero-3d/CreativeRoomHero.tsx"), /ssr: false/);
  assert.match(read("components/hero-3d/CreativeRoomScene.tsx"), /frameloop="demand"/);
  assert.match(seo, /alternateLocale/);
  assert.match(seo, /buildPageMetadata/);
  assert.match(read("app/(es)/proyectos/raw-vives/page.tsx"), /type: "article"/);
  assert.match(read("app/(en)/en/projects/raw-vives/page.tsx"), /type: "article"/);
});

test("the branded PNG uses a stable crawlable favicon URL", () => {
  for (const layout of [read("app/(es)/layout.tsx"), read("app/(en)/layout.tsx")]) {
    assert.equal(existsSync(join(root, "public/favicon.png")), true);
    assert.equal(existsSync(join(root, "app/icon.png")), false);
    assert.equal(existsSync(join(root, "app/icon.svg")), false);
    assert.match(layout, /icon: \[\{ url: "\/favicon\.png"/);
    assert.match(layout, /shortcut: "\/favicon\.png"/);
  }
});

test("search crawlers can discover the public profile routes", () => {
  const layoutEs = read("app/(es)/layout.tsx");
  const layoutEn = read("app/(en)/layout.tsx");
  const robots = read("app/robots.ts");
  const sitemap = read("app/sitemap.ts");
  const seo = read("lib/seo.ts");
  const contact = read("components/contact.tsx");

  assert.match(layoutEs, /rel="sitemap"/);
  assert.match(layoutEn, /rel="sitemap"/);
  assert.match(layoutEs, /lang="es"/);
  assert.match(layoutEn, /lang="en"/);
  assert.match(robots, /userAgent: "\*"/);
  assert.match(robots, /allow: "\/"/);
  assert.match(robots, /host: SITE_URL/);
  assert.match(sitemap, /INDEXABLE_ROUTES/);
  assert.match(seo, /Alex Vicente Lopez/);
  for (const route of ["sobre-mi", "proyectos", "fotografia", "contacto"]) {
    assert.match(contact, new RegExp(`href: "\\/${route}"`));
  }
});

test("featured case studies expose project-specific social images", () => {
  const caseContent = read("lib/case-study-content.ts");
  const rawVives = read("app/(es)/proyectos/raw-vives/page.tsx");
  const lumaFlow = read("app/(es)/proyectos/lumaflow-studio/page.tsx");
  const distrito = read("app/(es)/proyectos/distrito-gourmet/page.tsx");

  assert.match(caseContent, /raw-vives-og\.webp/);
  assert.match(caseContent, /lumaflow-studio-og\.webp/);
  assert.match(caseContent, /distrito-gourmet-og\.webp/);
  assert.match(rawVives, /RAW_VIVES_URLS\.image/);
  assert.match(lumaFlow, /lumaflow-studio-og\.webp/);
  assert.match(distrito, /distrito-gourmet-og\.webp/);
  for (const asset of [
    "public/projects/raw-vives/raw-vives-og.webp",
    "public/projects/lumaflow-studio-og.webp",
    "public/projects/distrito-gourmet-og.webp",
  ]) {
    assert.equal(existsSync(join(root, asset)), true, asset);
  }
});

test("the portfolio keeps the hero controls aligned and overlap-safe", () => {
  const hero = read("components/hero.tsx");
  const navigation = read("components/navigation.tsx");
  const languageToggle = read("components/language-toggle.tsx");

  assert.doesNotMatch(hero, /data-portfolio|Portfolio \/ [A-Z]\d+/);
  assert.doesNotMatch(navigation, />\s*V\d+\s*</);
  assert.match(hero, /styles\.sceneColumn/);
  assert.equal((hero.match(/<CreativeRoomHero\b/g) ?? []).length, 1);
  const heroStyles = read("components/hero.module.css");
  assert.match(heroStyles, /\.journey\s*\{[^}]*overflow: visible/);
  assert.match(heroStyles, /\.sceneColumn\s*\{[^}]*position: relative/);
  assert.doesNotMatch(hero, /md:bottom-7 md:left-8/);
  assert.match(languageToggle, /absolute left-1 top-1 size-9/);
  assert.match(languageToggle, /translate-x-9/);
});

test("secondary work stays compact with visible media and real destinations", () => {
  const projects = read("components/projects.tsx");
  assert.match(projects, /Otros proyectos/);
  assert.match(projects, /More experiments/);
  assert.match(projects, /md:grid-cols-3/);
  assert.match(projects, /project.summary/);
  assert.match(projects, /Ver código/);
  assert.match(projects, /View code/);
  assert.match(projects, /Proyecto privado/);
  assert.doesNotMatch(projects, /archive-floating-preview|onMouseMove|quickTo/);
  for (const locale of ["es", "en"]) {
    assert.doesNotMatch(read("lib/locales/" + locale + ".json"), /github\.com\/AVL05\/PRWEB02/);
  }
});

test("the recruiter view keeps exactly four featured projects plus an archive", () => {
  const projects = read("components/projects.tsx");

  assert.match(projects, /const featuredIndexes = \[0, 1, 2, 6\]/);
  assert.match(projects, /archive = projects\.filter/);
  assert.match(projects, /Ver caso de estudio/);
  assert.match(projects, /View case study/);
});
