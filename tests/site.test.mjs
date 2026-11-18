import assert from "node:assert/strict";
import { test } from "node:test";
import { ModuleKind, ScriptTarget, transpileModule } from "typescript";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

function loadLib(relativePath) {
  const module = { exports: {} };
  runInNewContext(
    transpileModule(read(relativePath), {
      compilerOptions: { module: ModuleKind.CommonJS, target: ScriptTarget.ESNext },
    }).outputText,
    { module, exports: module.exports },
  );
  return module.exports;
}

const paths = loadLib("lib/i18n-paths.ts");

test("locale is derived from the pathname", () => {
  assert.equal(paths.getLocaleFromPathname("/"), "es");
  assert.equal(paths.getLocaleFromPathname("/legal"), "es");
  assert.equal(paths.getLocaleFromPathname("/en"), "en");
  assert.equal(paths.getLocaleFromPathname("/en/legal/"), "en");
  assert.equal(paths.getLocaleFromPathname("/english"), "es");
});

test("alternate paths map both ways and keep the hash", () => {
  assert.equal(paths.getAlternatePath("/", "en"), "/en");
  assert.equal(paths.getAlternatePath("/#proyectos", "en"), "/en/#proyectos");
  assert.equal(paths.getAlternatePath("/en", "es"), "/");
  assert.equal(paths.getAlternatePath("/legal", "en"), "/en/legal");
  assert.equal(paths.getAlternatePath("/en/legal", "es"), "/legal");
  assert.equal(paths.getAlternatePath("/desconocida", "en"), null);
});

test("hrefs never leak across locales", () => {
  assert.equal(paths.localizeHref("/legal", "en"), "/en/legal");
  assert.equal(paths.localizeHref("/desconocida", "en"), "/en");
  assert.equal(paths.localizeHref("#contacto", "en"), "#contacto");
  assert.equal(paths.localizeHref("https://example.com", "en"), "https://example.com");
  assert.equal(paths.localizeHref("mailto:a@b.dev", "en"), "mailto:a@b.dev");
  assert.equal(paths.localizeHref("/legal", "es"), "/legal");
});

test("only the two home pages are indexable", () => {
  assert.deepEqual([...paths.INDEXABLE_ES_PATHS], ["/"]);
  assert.deepEqual([...paths.INDEXABLE_EN_PATHS], ["/en"]);
});

function keysOf(value, prefix = "") {
  return Object.entries(value).flatMap(([key, child]) =>
    child && typeof child === "object"
      ? keysOf(child, `${prefix}${key}.`)
      : [`${prefix}${key}`],
  );
}

test("Spanish and English locale files have the same keys", () => {
  const es = new Set(keysOf(JSON.parse(read("lib/locales/es.json"))));
  const en = new Set(keysOf(JSON.parse(read("lib/locales/en.json"))));
  assert.deepEqual([...es].filter((key) => !en.has(key)), []);
  assert.deepEqual([...en].filter((key) => !es.has(key)), []);
});

test("locale files contain no empty strings", () => {
  for (const file of ["es", "en"]) {
    const data = JSON.parse(read(`lib/locales/${file}.json`));
    const empty = [];
    (function walk(node, trail) {
      if (typeof node === "string" && node.trim() === "") empty.push(trail);
      else if (node && typeof node === "object")
        for (const [key, child] of Object.entries(node)) walk(child, `${trail}.${key}`);
    })(data, file);
    assert.deepEqual(empty, []);
  }
});
