import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { test } from "node:test";

const root = fileURLToPath(new URL("../", import.meta.url));
const MEDIA = /\.(?:png|jpe?g|webp|avif|svg|mp4|webm|pdf)(?:\?.*)?$/i;

function* strings(value) {
  if (typeof value === "string") yield value;
  else if (Array.isArray(value)) for (const item of value) yield* strings(item);
  else if (value && typeof value === "object") for (const item of Object.values(value)) yield* strings(item);
}

test("every media and document path referenced by the locale catalogs is published", () => {
  const referenced = new Set();
  for (const file of readdirSync(join(root, "lib/locales")).filter((name) => name.endsWith(".json"))) {
    const catalog = JSON.parse(readFileSync(join(root, "lib/locales", file), "utf8"));
    for (const value of strings(catalog)) if (value.startsWith("/") && MEDIA.test(value)) referenced.add(value);
  }
  assert.ok(referenced.size > 0, "expected the catalogs to reference published media");
  for (const path of referenced) {
    const publicPath = decodeURIComponent(path.split("?")[0]);
    assert.ok(existsSync(join(root, "public", publicPath)), `${path} is referenced but missing from public/`);
  }
});

test("the CV linked from the hero is published", () => {
  const hero = readFileSync(join(root, "components/hero.tsx"), "utf8");
  const href = hero.match(/CV_HREF = "([^"?]+)/)?.[1];
  assert.ok(href, "hero must define CV_HREF");
  assert.ok(existsSync(join(root, "public", href)), `${href} is missing from public/`);
});
