import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";
import { runInNewContext } from "node:vm";
import { ModuleKind, transpileModule } from "typescript";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");
const module = { exports: {} };
runInNewContext(transpileModule(read("lib/locale-preference.ts"), {
  compilerOptions: { module: ModuleKind.CommonJS },
}).outputText, module);

test("initial locale respects browser priority and excludes rejected languages", () => {
  const { preferredLanguage } = module.exports;
  for (const [header, expected] of [
    ["es-ES,es;q=0.9,en;q=0.8", "es"],
    ["en-US,en;q=0.9,es;q=0.3", "en"],
    ["en;q=0.3,es;q=0.9", "es"],
    ["es;q=0,en;q=1", "en"],
    ["fr-FR,es;q=0.5", "en"],
    ["ES-mx", "es"],
    ["es;q=invalid,en", "en"],
    ["", "en"],
  ]) assert.equal(preferredLanguage(header), expected, header);
  assert.ok(read("lib/request-language.ts").indexOf("return cookieLanguage") < read("lib/request-language.ts").indexOf("return preferredLanguage"));
});

test("localized home retains evidence, three capabilities and a factual currently section", () => {
  for (const language of ["es", "en"]) {
    const locale = JSON.parse(read(`lib/locales/${language}.json`));
    const projects = locale.projects.items;
    assert.equal(projects.length, 7);
    assert.equal(locale.skills.groups.length, 3);
    assert.deepEqual(projects[1].evidence.map((text) => text.match(/\d+/)?.[0]).filter(Boolean), ["56", "33"]);
    assert.match(projects[1].outcome, /56/);
    assert.match(projects[1].outcome, /33/);
    assert.match(projects[6].description, /100/);
    for (const project of projects) {
      assert.ok(project.summary.length <= 90);
      assert.ok(project.description.length >= project.summary.length);
    }
    assert.equal(locale.currently.items[0].value, "Alex Creative Space");
    assert.equal(locale.currently.items[2].value, "Valencia");
    assert.equal(locale.experience.experience_list.length, 2);
    assert.equal(locale.experience.education_list.length, 2);
    assert.deepEqual(locale.experience.experience_list.map((item) => item.highlights.length), [3, 2]);
  }
});

test("home has one hero heading, both primary journeys and natural photography flow", () => {
  const hero = read("components/hero.tsx");
  assert.equal((hero.match(/<h1\b/g) ?? []).length, 1);
  assert.match(hero, /href="#projects"/);
  assert.match(hero, /href="#contact"/);
  assert.doesNotMatch(hero, /studio-photography|studio-perspective/);
  const home = read("components/home-client.tsx");
  assert.ok(home.indexOf("<Photography />") < home.indexOf("<Currently />"));
  assert.ok(home.indexOf("<Currently />") < home.indexOf("<Contact />"));
  assert.doesNotMatch(read("components/photography.tsx"), /pin:|preventDefault|window.location/);
  assert.match(read("components/hero-3d/CreativeRoomHero.tsx"), /prefers-reduced-motion: no-preference/);
});
