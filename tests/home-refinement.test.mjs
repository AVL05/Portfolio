import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { test } from "node:test";

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), "utf8");

test("home content contract: featured projects, other projects and skills are factual and complete", () => {
  const source = read("lib/projects.ts");
  const featured = [...source.matchAll(/slug: "([a-z-]+)",\n\s+title: "([^"]+)"/g)].map((match) => [match[1], match[2]]);
  assert.deepEqual(featured, [
    ["distrito-gourmet", "Distrito Gourmet"],
    ["lumaflow-studio", "LumaFlow Studio"],
    ["raw-vives", "raw.vives"],
  ]);
  // Live links only where a demo is published: Distrito Gourmet and raw.vives.
  assert.equal((source.match(/live: "https:/g) ?? []).length, 2);
  assert.match(source, /live: "https:\/\/distrito-gourmet\.aleviclop\.dev"/);
  assert.match(source, /live: "https:\/\/rawvives\.aleviclop\.dev"/);
  // No TypeScript as a skill or project chip.
  assert.doesNotMatch(source, /TypeScript/);
  const skills = source.slice(source.indexOf("export const SKILLS"));
  assert.equal((skills.match(/^\s+"[^"]+",$/gm) ?? []).length, 18);

  for (const language of ["es", "en"]) {
    const locale = JSON.parse(read("lib/locales/" + language + ".json"));
    assert.deepEqual(locale.projects.featured.map((project) => project.slug), featured.map(([slug]) => slug));
    assert.deepEqual(locale.projects.featured[1].evidence.map((text) => text.match(/\d+/)?.[0]), ["56", "33"]);
    assert.deepEqual(locale.projects.other.map((project) => project.slug), ["premium-frontend-director", "echo-the-awakening", "api-hotel", "dulces"]);
    for (const project of locale.projects.featured) assert.ok(project.alt.length > 20);
    const text = JSON.stringify(locale);
    for (const retired of ["AI Creative Assistant", "TypeScript", "foco frontend", "frontend focus", "Llibret", "llibret"]) {
      assert.ok(!text.includes(retired), retired);
    }
    assert.equal(locale.experience.experience_list.length, 2);
    assert.equal(locale.experience.education_list.length, 2);
    assert.deepEqual(locale.experience.experience_list.map((item) => item.highlights.length), [3, 2]);
  }
});

test("home is one framed column with ordered sections and a single hero heading", () => {
  const home = read("components/home-client.tsx");
  assert.equal((read("components/hero.tsx").match(/<h1\b/g) ?? []).length, 1);
  assert.match(home, /<Hero \/>/);
  assert.match(home, /<SiteHeader \/>/);
  assert.match(home, /className="site-column"/);
  assert.match(home, /<main id="main-content">/);
  const ids = [...home.matchAll(/<Section id="([a-z-]+)"/g)].map((match) => match[1]);
  assert.deepEqual(ids, ["about", "experience", "projects", "other", "skills", "education", "contact"]);
  assert.ok(home.indexOf("<Hero />") < home.indexOf('id="about"'));
  assert.doesNotMatch(home, /Photography|Currently/);
});
