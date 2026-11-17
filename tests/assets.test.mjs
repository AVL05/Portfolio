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

test("every media and document path referenced by the catalogs and the project data is published", () => {
  const referenced = new Set();
  for (const file of readdirSync(join(root, "lib/locales")).filter((name) => name.endsWith(".json"))) {
    const catalog = JSON.parse(readFileSync(join(root, "lib/locales", file), "utf8"));
    for (const value of strings(catalog)) if (value.startsWith("/") && MEDIA.test(value)) referenced.add(value);
  }
  const projects = readFileSync(join(root, "lib/projects.ts"), "utf8");
  for (const match of projects.matchAll(/image: "([^"]+)"/g)) referenced.add(match[1]);
  assert.ok(referenced.size >= 3, "expected the featured project images to be referenced");
  for (const path of referenced) {
    const publicPath = decodeURIComponent(path.split("?")[0]);
    assert.ok(existsSync(join(root, "public", publicPath)), path + " is referenced but missing from public/");
  }
});

test("the CV linked from the site is published", () => {
  const header = readFileSync(join(root, "lib/site.ts"), "utf8");
  const href = header.match(/CV_HREF = "([^"?]+)/)?.[1];
  assert.ok(href, "lib/site.ts must define CV_HREF");
  assert.ok(existsSync(join(root, "public", href)), `${href} is missing from public/`);
});
