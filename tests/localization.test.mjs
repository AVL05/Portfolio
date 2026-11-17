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

test("Distrito Gourmet editorial chapters preserve Spanish and English parity", () => {
  const story = JSON.parse(read("lib/locales/distrito-gourmet.json"));
  assertSameShape(story.es, story.en, "distrito");
  assert.equal(story.es.sections.length, 8);
  assert.deepEqual(story.es.sections.map(section => section.id), story.en.sections.map(section => section.id));
  assert.equal(story.es.sections.filter(section => section.video).length, 3);
});

test("known mixed-language surfaces select copy from the active language", () => {
  const notFound = read("app/global-not-found.tsx");
  const notFoundContent = read("components/not-found-content.tsx");
  const legal = read("components/legal-page-content.tsx");
  const og = read("app/api/og/route.tsx");

  assert.equal(es.hero.role, "Desarrollador Web Full-Stack Junior");
  assert.equal(en.hero.role, "Junior Full-Stack Web Developer");
  assert.equal(es.hero.tagline, "React, Next.js, PHP y Laravel. Valencia.");
  assert.equal(en.hero.tagline, "React, Next.js, PHP and Laravel. Valencia.");
  assert.equal(es.hero.work, "Ver proyectos");
  assert.equal(es.hero.contact, "Escríbeme");
  assert.equal(es.sections.other, "Otros proyectos");
  assert.equal(en.sections.other, "Other projects");
  assert.doesNotMatch(notFound, /Inicio \/ Home|Proyectos \/ Work/);
  assert.match(notFound, /robots: \{ index: false/);
  assert.match(notFoundContent, /usePathname/);
  assert.match(notFoundContent, /Page not found/);
  assert.doesNotMatch(notFoundContent, /useLanguage/);
  assert.match(legal, /Aviso legal/);
  assert.match(legal, /Legal notice/);
  assert.match(og, /Desarrollador Web Full-Stack Junior/);
  assert.match(og, /Junior Full-Stack Web Developer/);
});

test("language switching is a real navigation, never client state", () => {
  const context = read("lib/language-context.tsx");
  const toggle = read("components/language-toggle.tsx");

  assert.doesNotMatch(context, /localStorage/);
  assert.doesNotMatch(context, /api\/language/);
  assert.doesNotMatch(context, /router\.refresh/);
  assert.doesNotMatch(context, /setLanguage/);
  assert.match(toggle, /getAlternatePath/);
  assert.match(toggle, /hrefLang/);
  assert.doesNotMatch(toggle, /router\.refresh/);
  assert.doesNotMatch(toggle, /fetch\(/);
});

test("public positioning uses one label and no competing professions", () => {
  const files = ["app/(es)/layout.tsx", "app/(en)/layout.tsx", "lib/seo.ts", "app/api/og/route.tsx", "app/manifest.ts", "lib/case-study-content.ts", "components/raw-vives-case-study.tsx"];
  const publicPositioning = [...files.map(read), JSON.stringify(es), JSON.stringify(en)].join("\n");
  const seo = read("lib/seo.ts");

  assert.match(seo, /Desarrollador Web Full-Stack Junior/);
  assert.match(seo, /Junior Full-Stack Web Developer/);
  for (const stack of ["React", "Next.js", "PHP", "Laravel"]) assert.match(publicPositioning, new RegExp(stack.replace(".", "\\.")));
  for (const retired of [
    /Frontend \/ Full-Stack Developer/, /React \/ Next\.js/, /production-ready/i, /AI builder/i, /digital creator/i,
    /foco frontend/i, /frontend focus/i, /freelance/i, /aprendiendo IA/i, /Desarrollador Full-Stack Junior/, /Junior Full-Stack Developer/,
  ]) assert.doesNotMatch(publicPositioning, retired);
  // Keyword lists carry the role and the stack only: no photography, design or AI topics.
  const keywords = seo.slice(seo.indexOf("export const SEO_KEYWORDS"), seo.indexOf("export const SAME_AS"));
  for (const topic of [/fotograf/i, /diseño/i, /design/i, /\bIA\b/, /\bAI\b/, /Figma/, /AVL05/]) assert.doesNotMatch(keywords, topic);
  // JSON-LD does not advertise Figma, AI, photography or editorial design either.
  const person = seo.slice(seo.indexOf("const PERSON_COPY"), seo.indexOf("export const personJsonLd"));
  for (const topic of [/Figma/, /IA aplicada/, /Fotograf/, /Diseño editorial/, /applied AI/i]) assert.doesNotMatch(person, topic);
  // TypeScript is not advertised in the public metadata or the case-study copy.
  assert.doesNotMatch(publicPositioning, /TypeScript/);
  assert.doesNotMatch(seo, /instagram/i);
});

test("professional experience precedes education and uses recruiter-friendly dates", () => {
  const home = read("components/home-client.tsx");

  assert.ok(home.indexOf('id="experience"') < home.indexOf('id="education"'));
  assert.equal(es.experience.experience_list[0].company, "Burguet Sistemas SL");
  assert.equal(es.experience.experience_list[0].title, "Desarrollador Web (prácticas)");
  assert.equal(es.experience.experience_list[0].period, "feb 2026 – may 2026");
  assert.equal(es.experience.experience_list[1].company, "Ajuntament de Carlet");
  assert.equal(es.experience.experience_list[1].title, "Técnico informático (prácticas)");
  assert.equal(es.experience.experience_list[1].period, "mar 2024 – jun 2024");
  assert.equal(en.experience.experience_list[0].title, "Web Developer (internship)");
  assert.equal(en.experience.experience_list[0].period, "Feb 2026 – May 2026");
  assert.equal(en.experience.experience_list[1].title, "IT Technician (internship)");
  assert.equal(en.experience.experience_list[1].period, "Mar 2024 – Jun 2024");
});
