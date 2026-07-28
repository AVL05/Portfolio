import assert from "node:assert/strict";
import { readdirSync, readFileSync } from "node:fs";
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
