import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("localized home retains evidence, seven ordered capability groups and a factual currently section", () => {
  for (const language of ["es", "en"]) {
    const locale = JSON.parse(read(`lib/locales/${language}.json`));
    const projects = locale.projects.items;
    assert.equal(projects.length, 8);
    assert.equal(locale.skills.groups.length, 7);
    assert.match(locale.skills.groups[0].area, /Desarrollo web|Web development/);
    assert.deepEqual(locale.skills.groups[0].stack.slice(0, 3), ["HTML", "CSS", "JavaScript"]);
    assert.ok(!locale.skills.groups[0].stack.includes("TypeScript"));
    assert.ok(locale.skills.groups[3].stack.includes("Figma"));
    assert.match(locale.skills.groups[6].area, /Sistemas|Systems/);
    assert.deepEqual(projects[2].evidence.map((text) => text.match(/\d+/)?.[0]).filter(Boolean), ["56", "33"]);
    assert.match(projects[2].outcome, /56/);
    assert.match(projects[2].outcome, /33/);
    assert.match(projects[7].description, /100/);
    assert.equal(projects[0].title, "AI Creative Assistant");
    assert.equal(projects[1].title, "Distrito Gourmet");
    assert.equal(projects[2].title, "LumaFlow Studio");
    assert.equal(projects[3].title, "raw.vives");
    for (const project of projects) {
      assert.ok(project.summary.length <= 90);
      assert.ok(project.description.length >= project.summary.length);
    }
    assert.equal(locale.currently.items[0].value, "AI Creative Assistant");
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
