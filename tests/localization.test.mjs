import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");
const es = JSON.parse(read("lib/locales/es.json"));
const en = JSON.parse(read("lib/locales/en.json"));

function assertSameShape(left, right, path = "translations") {
  assert.equal(Array.isArray(left), Array.isArray(right), `${path}: array mismatch`);
  assert.equal(typeof left, typeof right, `${path}: type mismatch`);

  if (Array.isArray(left)) {
    assert.equal(left.length, right.length, `${path}: item count mismatch`);
    left.forEach((value, index) => {
      assertSameShape(value, right[index], `${path}[${index}]`);
    });
    return;
  }

  if (left && typeof left === "object") {
    assert.deepEqual(
      Object.keys(left).sort(),
      Object.keys(right).sort(),
      `${path}: key mismatch`,
    );
    Object.keys(left).forEach((key) => {
      assertSameShape(left[key], right[key], `${path}.${key}`);
    });
  }
}

test("Spanish and English locale catalogs have matching structure", () => {
  assertSameShape(es, en);
});

test("known mixed-language surfaces select copy from the active language", () => {
  const hero = read("components/hero.tsx");
  const photography = read("components/photography.tsx");
  const notFound = read("app/not-found.tsx");
  const seoShell = read("components/seo-page-shell.tsx");
  const legal = read("components/legal-page-content.tsx");
  const og = read("app/api/og/route.tsx");

  assert.match(hero, /Desarrollador frontend/);
  assert.match(hero, /Frontend Developer/);
  assert.match(photography, /Otra/);
  assert.match(photography, /See/);
  assert.doesNotMatch(notFound, /Inicio \/ Home|Proyectos \/ Work/);
  assert.match(seoShell, /useLanguage/);
  assert.match(legal, /Aviso legal/);
  assert.match(legal, /Legal notice/);
  assert.match(og, /Desarrollador frontend/);
});

test("language changes update document language and use an accessible transition", () => {
  const context = read("lib/language-context.tsx");

  assert.match(context, /document\.documentElement\.lang = lang/);
  assert.match(context, /startViewTransition/);
  assert.match(context, /prefers-reduced-motion/);
});
