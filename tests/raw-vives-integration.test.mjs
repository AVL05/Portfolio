import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const es = JSON.parse(read("lib/locales/es.json"));
const en = JSON.parse(read("lib/locales/en.json"));
const route = read("app/proyectos/raw-vives/page.tsx");
const content = read("components/raw-vives-case-study.tsx");
const seo = read("lib/seo.ts");

test("raw.vives is the primary localized project", () => {
  for (const locale of [es, en]) {
    const project = locale.projects.items[0];
    assert.equal(project.title, "raw.vives");
    assert.equal(project.link, "https://gallery.aleviclop.dev/");
    assert.equal(project.caseStudyHref, "/proyectos/raw-vives");
    assert.equal(project.github, "https://github.com/AVL05/alexgallery");
    assert.match(project.outcome, /30/);
    assert.match(project.outcome, /3/);
    assert.match(project.outcome, /static|estático/i);
  }
  assert.match(content, /73/);
  assert.match(content, /67/);
  assert.doesNotMatch(content, /81 páginas|81 static|105 tests/i);
});

test("case study metadata and sitemap entry are indexable", () => {
  assert.match(route, /createLocalizedMetadata/);
  assert.match(route, /path: "\/proyectos\/raw-vives"/);
  assert.match(route, /application\/ld\+json/);
  assert.match(seo, /alternates: \{ canonical:/);
  assert.match(seo, /twitter:/);
  assert.match(seo, /path: "\/proyectos\/raw-vives"/);
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
