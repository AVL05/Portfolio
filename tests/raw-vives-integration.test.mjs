import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const es = JSON.parse(read("lib/locales/es.json"));
const en = JSON.parse(read("lib/locales/en.json"));
const route = read("app/(es)/proyectos/raw-vives/page.tsx");
const routeEn = read("app/(en)/en/projects/raw-vives/page.tsx");
const content = read("components/raw-vives-case-study.tsx");
const seo = read("lib/seo.ts");

test("raw.vives is a featured web and photography project", () => {
  const projects = read("lib/projects.ts");
  const block = projects.slice(projects.indexOf('slug: "raw-vives"'));
  assert.match(block, /live: "https:\/\/rawvives\.aleviclop\.dev"/);
  assert.match(block, /code: "https:\/\/github\.com\/AVL05\/alexgallery"/);
  assert.equal(es.projects.featured[2].slug, "raw-vives");
  assert.equal(en.projects.featured[2].slug, "raw-vives");
  for (const locale of [es, en]) {
    assert.doesNotMatch(locale.projects.featured[2].description, /\b30\b/);
  }
  assert.match(content, /67/);
  assert.doesNotMatch(content, /81 páginas|81 static|105 tests/i);
});

test("raw.vives public copy avoids an exact photograph count", () => {
  const localizedCopy = JSON.stringify([es.photography, en.photography]);

  assert.doesNotMatch(route, /30 (?:fotografías|photographs)/i);
  assert.doesNotMatch(content, /30 (?:fotografías|photographs)/i);
  assert.doesNotMatch(localizedCopy, /\b30\b/);
});

test("case study metadata and sitemap entry are indexable", () => {
  assert.match(route, /buildPageMetadata/);
  assert.match(route, /path: "\/proyectos\/raw-vives"/);
  assert.match(route, /locale: "es"/);
  assert.match(route, /application\/ld\+json/);
  assert.match(routeEn, /path: "\/en\/projects\/raw-vives"/);
  assert.match(routeEn, /locale: "en"/);
  assert.match(seo, /languageAlternates/);
  assert.match(seo, /languages:/);
  assert.match(seo, /twitter:/);
  assert.match(seo, /"\/proyectos\/raw-vives"/);
  assert.match(seo, /https:\/\/www\.aleviclop\.dev/);
});

test("case study CTAs and bilingual accessibility copy exist", () => {
  assert.match(content, /Ver proyecto en producción/);
  assert.match(content, /View live project/);
  assert.match(content, /prefers-reduced-motion|reduced motion/);
  assert.match(content, /alt=/);
  assert.doesNotMatch(content, /conversi[oó]n(es)?\s*[:=]\s*\d+/i);
});

test("all published raw.vives media exists", () => {
  for (const name of ["hero", "home-editorial", "archive", "series", "detail", "fullscreen", "og"]) {
    assert.equal(existsSync(new URL(`public/projects/raw-vives/raw-vives-${name}.webp`, root)), true, name);
  }
});
