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

test("focus, LCP image, and localized Open Graph contracts remain explicit", () => {
  const globals = read("app/globals.css");
  const hero = read("components/hero.tsx");
  const layout = read("app/layout.tsx");
  const seo = read("lib/seo.ts");

  assert.match(globals, /:focus-visible/);
  assert.match(globals, /outline: 2px solid var\(--primary\)/);
  assert.match(hero, /priority/);
  assert.match(hero, /fetchPriority="high"/);
  assert.match(hero, /38vw/);
  assert.match(layout, /alternateLocale/);
  assert.match(seo, /alternateLocale/);
});

test("the branded PNG uses a stable crawlable favicon URL", () => {
  const layout = read("app/layout.tsx");

  assert.equal(existsSync(join(root, "public/favicon.png")), true);
  assert.equal(existsSync(join(root, "app/icon.png")), false);
  assert.equal(existsSync(join(root, "app/icon.svg")), false);
  assert.match(layout, /icon: \[\{ url: "\/favicon\.png"/);
  assert.match(layout, /shortcut: "\/favicon\.png"/);
});

test("search crawlers can discover the public profile routes", () => {
  const layout = read("app/layout.tsx");
  const robots = read("app/robots.ts");
  const sitemap = read("app/sitemap.ts");
  const seo = read("lib/seo.ts");
  const contact = read("components/contact.tsx");

  assert.match(layout, /rel="sitemap"/);
  assert.match(robots, /userAgent: "\*"/);
  assert.match(robots, /allow: "\/"/);
  assert.match(robots, /host: SITE_URL/);
  assert.match(sitemap, /INDEXABLE_ROUTES/);
  assert.match(seo, /Alex Vicente Lopez/);
  for (const route of ["sobre-mi", "proyectos", "fotografia", "contacto"]) {
    assert.match(contact, new RegExp(`href: "\\/${route}"`));
  }
});

test("the portfolio keeps the hero controls aligned and overlap-safe", () => {
  const hero = read("components/hero.tsx");
  const navigation = read("components/navigation.tsx");
  const languageToggle = read("components/language-toggle.tsx");

  assert.doesNotMatch(hero, /data-portfolio|Portfolio \/ [A-Z]\d+/);
  assert.doesNotMatch(navigation, />\s*V\d+\s*</);
  assert.match(hero, /lg:\[writing-mode:vertical-rl\]/);
  assert.doesNotMatch(hero, /md:bottom-7 md:left-8/);
  assert.match(languageToggle, /absolute left-1 top-1 size-9/);
  assert.match(languageToggle, /translate-x-9/);
});

test("secondary work stays visible with responsive hover and focus previews", () => {
  const projects = read("components/projects.tsx");
  const es = read("lib/locales/es.json");
  const en = read("lib/locales/en.json");

  assert.doesNotMatch(projects, /<details|<summary|archiveOpen/);
  assert.match(projects, /className="archive-preview/);
  assert.match(projects, /onMouseEnter=\{\(\) => setActiveArchiveIndex\(index\)\}/);
  assert.match(projects, /onFocusCapture=\{\(\) => setActiveArchiveIndex\(index\)\}/);
  assert.match(projects, /motion-reduce:transition-none/);
  assert.match(projects, /sizes="\(max-width: 1024px\) 1px, 38vw"/);
  assert.match(projects, /Pasa el cursor o usa Tab para explorar/);
  assert.match(projects, /Hover or use Tab to explore/);
  assert.match(projects, /aria-label=\{`\$\{archivePreviewLabel\}: \$\{activeArchiveProject\.title\}`\}/);
  assert.match(projects, /Ver código/);
  assert.match(projects, /View code/);
  assert.match(projects, /Proyecto privado/);
  assert.match(projects, /Private project/);
  assert.doesNotMatch(es, /github\.com\/AVL05\/PRWEB02/);
  assert.doesNotMatch(en, /github\.com\/AVL05\/PRWEB02/);
  assert.doesNotMatch(projects, /aria-hidden="true"\s+className="archive-preview/);
});
