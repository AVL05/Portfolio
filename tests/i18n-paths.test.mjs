import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { ModuleKind, transpileModule } from "typescript";

const read = (path) =>
  readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const module = { exports: {} };
runInNewContext(
  transpileModule(read("lib/i18n-paths.ts"), {
    compilerOptions: { module: ModuleKind.CommonJS },
  }).outputText,
  module,
);

const {
  DEFAULT_LOCALE,
  INDEXABLE_EN_PATHS,
  INDEXABLE_ES_PATHS,
  LOCALES,
  ROUTE_PAIRS,
  getAlternatePath,
  getLocaleFromPathname,
  homePath,
  localizeHref,
  normalizePathname,
} = module.exports;

test("route map covers exactly 8 ES and 8 EN indexable URLs", () => {
  assert.deepEqual([...LOCALES], ["es", "en"]);
  assert.equal(DEFAULT_LOCALE, "es");
  assert.equal(ROUTE_PAIRS.length, 8);
  assert.equal(INDEXABLE_ES_PATHS.length, 8);
  assert.equal(INDEXABLE_EN_PATHS.length, 8);
  assert.deepEqual([...INDEXABLE_ES_PATHS].sort(), [
    "/",
    "/contacto",
    "/fotografia",
    "/proyectos",
    "/proyectos/distrito-gourmet",
    "/proyectos/lumaflow-studio",
    "/proyectos/raw-vives",
    "/sobre-mi",
  ]);
  assert.deepEqual([...INDEXABLE_EN_PATHS].sort(), [
    "/en",
    "/en/about",
    "/en/contact",
    "/en/photography",
    "/en/projects",
    "/en/projects/distrito-gourmet",
    "/en/projects/lumaflow-studio",
    "/en/projects/raw-vives",
  ]);
});

test("brand slugs stay identical across locales", () => {
  for (const slug of ["raw-vives", "lumaflow-studio", "distrito-gourmet"]) {
    assert.equal(
      getAlternatePath(`/proyectos/${slug}`, "en"),
      `/en/projects/${slug}`,
    );
    assert.equal(
      getAlternatePath(`/en/projects/${slug}`, "es"),
      `/proyectos/${slug}`,
    );
  }
});

test("alternate paths are reciprocal and preserve hashes", () => {
  for (const pair of ROUTE_PAIRS) {
    assert.equal(getAlternatePath(pair.es, "en"), pair.en);
    assert.equal(getAlternatePath(pair.en, "es"), pair.es);
    assert.equal(getAlternatePath(pair.es, "es"), pair.es);
    assert.equal(getAlternatePath(pair.en, "en"), pair.en);
  }
  assert.equal(getAlternatePath("/#projects", "en"), "/en/#projects");
  assert.equal(getAlternatePath("/proyectos#top", "en"), "/en/projects#top");
  assert.equal(getAlternatePath("/en/#contact", "es"), "/#contact");
});

test("unknown paths fail safely instead of leaking across locales", () => {
  assert.equal(getAlternatePath("/projects", "es"), null);
  assert.equal(getAlternatePath("/es/proyectos", "en"), null);
  assert.equal(getAlternatePath("/nope", "en"), null);
  assert.equal(getAlternatePath("", "es"), null);
  assert.equal(localizeHref("/nope", "en"), "/en");
  assert.equal(localizeHref("/#projects", "en"), "/en/#projects");
  assert.equal(localizeHref("#top", "en"), "#top");
  assert.equal(localizeHref("https://example.com/x", "en"), "https://example.com/x");
  assert.equal(localizeHref("mailto:a@b.com", "en"), "mailto:a@b.com");
  assert.equal(localizeHref("/sobre-mi", "es"), "/sobre-mi");
  assert.equal(localizeHref("/sobre-mi", "en"), "/en/about");
  assert.equal(homePath("es"), "/");
  assert.equal(homePath("en"), "/en");
});

test("locale derives purely from the pathname", () => {
  assert.equal(getLocaleFromPathname("/"), "es");
  assert.equal(getLocaleFromPathname("/proyectos"), "es");
  assert.equal(getLocaleFromPathname("/en"), "en");
  assert.equal(getLocaleFromPathname("/en/"), "en");
  assert.equal(getLocaleFromPathname("/en/projects"), "en");
  assert.equal(getLocaleFromPathname("/english"), "es");
  assert.equal(normalizePathname("/proyectos/"), "/proyectos");
  assert.equal(normalizePathname("/en/"), "/en");
});
