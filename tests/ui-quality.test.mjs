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
  const route = read("app/api/contact/route.ts");
  const es = read("lib/locales/es.json");
  const en = read("lib/locales/en.json");

  assert.match(contact, /noValidate/);
  assert.match(contact, /aria-invalid/);
  assert.match(contact, /aria-describedby/);
  assert.match(contact, /requestAnimationFrame/);
  // El cliente envía a la API propia (sin claves expuestas) con timeout;
  // el timeout de 12s vive en el servidor para el proveedor upstream.
  assert.match(contact, /fetch\("\/api\/contact"/);
  assert.match(contact, /AbortSignal\.timeout\(CONTACT_LIMITS\.submitTimeoutMs\)/);
  assert.match(route, /UPSTREAM_TIMEOUT_MS = 12_000/);
  assert.match(route, /web3forms/i);
  assert.doesNotMatch(route, /resend/i);
  assert.doesNotMatch(contact, /web3forms\.com\/submit/);
  assert.doesNotMatch(contact, /access_key/);
  assert.match(contact, /aria-live="polite"/);
  assert.match(es, /"form_error_email"/);
  assert.match(en, /"form_error_email"/);
  assert.match(es, /"form_error_network"/);
  assert.match(en, /"form_error_network"/);
});

test("focus, lightweight home, and localized Open Graph contracts remain explicit", () => {
  const globals = read("app/globals.css");
  const home = read("components/home-client.tsx");
  const seo = read("lib/seo.ts");

  assert.match(globals, /:focus-visible/);
  assert.match(globals, /outline: 2px solid var\(--primary\)/);
  assert.doesNotMatch(home, /CreativeRoomHero|Canvas/);
  assert.doesNotMatch(read("next.config.mjs"), /wasm-unsafe-eval/);
  assert.match(seo, /alternateLocale/);
  assert.match(seo, /buildPageMetadata/);
  assert.match(read("app/(es)/proyectos/raw-vives/page.tsx"), /type: "article"/);
  assert.match(read("app/(en)/en/projects/raw-vives/page.tsx"), /type: "article"/);
});

test("the branded PNG uses a stable crawlable favicon URL", () => {
  const favicon = readFileSync(join(root, "public/favicon.png"));
  assert.equal(favicon.readUInt32BE(16), 192);
  assert.equal(favicon.readUInt32BE(20), 192);
  assert.ok(favicon.length < 10_000, "favicon should not compete with critical resources");
  assert.match(read("app/manifest.ts"), /sizes: "192x192"/);
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
  const footer = read("components/site-footer.tsx");

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
    assert.doesNotMatch(footer, new RegExp(`href: "\\/${route}"`));
  }
  assert.match(footer, /\/legal/);
});

test("featured case studies expose project-specific social images", () => {
  const caseContent = read("lib/case-study-content.ts");
  const rawVives = read("app/(es)/proyectos/raw-vives/page.tsx");
  const lumaFlow = read("app/(es)/proyectos/lumaflow-studio/page.tsx");
  const distrito = read("app/(es)/proyectos/distrito-gourmet/page.tsx");

  assert.match(caseContent, /raw-vives-og\.webp/);
  assert.match(caseContent, /lumaflow-studio-og\.webp/);
  assert.match(caseContent, /distrito_gourmet\/distrito-gourmet\.png/);
  assert.match(rawVives, /RAW_VIVES_URLS\.image/);
  assert.match(lumaFlow, /lumaflow-studio-og\.webp/);
  assert.match(distrito, /distrito_gourmet\/distrito-gourmet\.png/);
  for (const asset of [
    "public/projects/raw-vives/raw-vives-og.webp",
    "public/projects/lumaflow-studio-og.webp",
    "public/projects/distrito_gourmet/distrito-gourmet.png",
  ]) {
    assert.equal(existsSync(join(root, asset)), true, asset);
  }
});

test("the header keeps wordmark, links, theme and language controls in one bar", () => {
  const header = read("components/site-header.tsx");
  const headerStyles = read("components/site-header.module.css");
  const languageToggle = read("components/language-toggle.tsx");
  const hero = read("components/hero.tsx");

  assert.equal((hero.match(/<h1\b/g) ?? []).length, 1);
  assert.match(header, /<ThemeToggle/);
  assert.match(header, /<LanguageToggle/);
  assert.match(header, /aria-haspopup="dialog"/);
  assert.match(headerStyles, /@media \(min-width: 48rem\)/);
  assert.match(languageToggle, /absolute left-1 top-1 size-9/);
  assert.match(languageToggle, /translate-x-9/);
});

test("theme is dark by default, applied before paint and switchable", () => {
  const globals = read("app/globals.css");
  const theme = read("lib/theme.ts");
  const toggle = read("components/theme-toggle.tsx");

  assert.match(globals, /:root,\s*\[data-theme="dark"\]/);
  assert.match(globals, /\[data-theme="light"\]/);
  assert.match(theme, /themeInitScript/);
  assert.match(toggle, /localStorage\.setItem/);
  for (const layout of ["app/(es)/layout.tsx", "app/(en)/layout.tsx"]) {
    const source = read(layout);
    assert.match(source, /data-theme="dark"/);
    assert.match(source, /themeInitScript/);
  }
});

test("command palette keeps its keyboard and ARIA contract", () => {
  const palette = read("components/command-palette.tsx");
  const header = read("components/site-header.tsx");

  assert.match(palette, /role="combobox"/);
  assert.match(palette, /role="listbox"/);
  assert.match(palette, /role="option"/);
  assert.match(palette, /aria-activedescendant/);
  assert.match(palette, /aria-controls=\{listId\}/);
  assert.match(palette, /aria-keyshortcuts="Control\+K Meta\+K"/);
  assert.match(palette, /event\.metaKey \|\| event\.ctrlKey/);
  assert.match(palette, /showModal\(\)/);
  for (const key of ["ArrowDown", "ArrowUp", "Home", "End", "Enter"]) assert.match(palette, new RegExp(key));
  // External destinations never leak window.opener.
  assert.match(palette, /noopener,noreferrer/);
  assert.match(header, /<CommandPalette/);
  assert.match(header, /OPEN_PALETTE_EVENT/);
});

test("motion stays inside the budget and respects reduced motion", () => {
  const globals = read("app/globals.css");
  const reveal = read("components/reveal.tsx");
  const home = read("components/home-client.tsx");

  assert.match(globals, /@media \(prefers-reduced-motion: no-preference\)\s*\{\s*\[data-reveal="pending"\]/);
  assert.match(reveal, /prefers-reduced-motion: reduce/);
  assert.match(reveal, /IntersectionObserver/);
  assert.match(reveal, /observer\.disconnect\(\)/);
  // The home no longer ships GSAP: reveals are CSS plus one observer.
  for (const file of ["components/home-client.tsx", "components/hero.tsx", "components/projects.tsx", "components/timeline.tsx", "components/site-header.tsx", "components/command-palette.tsx", "components/reveal.tsx"]) {
    assert.doesNotMatch(read(file), /gsap/i, file);
  }
  assert.match(home, /<Reveal \/>/);
});
