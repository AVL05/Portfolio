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
  const projects = read("components/projects.tsx");
  const notFound = read("app/global-not-found.tsx");
  const notFoundContent = read("components/not-found-content.tsx");
  const seoShell = read("components/seo-page-shell.tsx");
  const legal = read("components/legal-page-content.tsx");
  const og = read("app/api/og/route.tsx");

  assert.match(hero, /Frontend \/ Full-Stack Developer/);
  assert.match(es.hero.description, /React \/ Next\.js/);
  assert.match(en.hero.description, /React \/ Next\.js/);
  assert.match(photography, /Otra/);
  assert.match(photography, /See/);
  assert.match(projects, /Proyectos seleccionados/);
  assert.match(projects, /Selected work/);
  assert.doesNotMatch(notFound, /Inicio \/ Home|Proyectos \/ Work/);
  assert.match(notFound, /robots: \{ index: false/);
  assert.match(notFoundContent, /usePathname/);
  assert.match(notFoundContent, /Page not found/);
  assert.doesNotMatch(notFoundContent, /useLanguage/);
  assert.match(seoShell, /useLanguage/);
  assert.match(legal, /Aviso legal/);
  assert.match(legal, /Legal notice/);
  assert.match(og, /Frontend \/ Full-Stack Developer/);
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

test("public positioning includes full-stack and preserves React and Next.js specialization", () => {
  const layoutEs = read("app/(es)/layout.tsx");
  const layoutEn = read("app/(en)/layout.tsx");
  const seo = read("lib/seo.ts");
  const about = read("app/(es)/sobre-mi/page.tsx");
  const publicPositioning = [layoutEs, layoutEn, seo, about, JSON.stringify(es), JSON.stringify(en)].join("\n");

  assert.match(publicPositioning, /Frontend \/ Full-Stack Developer/);
  assert.match(publicPositioning, /React/);
  assert.match(publicPositioning, /Next\.js/);
  assert.match(publicPositioning, /Laravel/);
  assert.match(publicPositioning, /freelance/i);
  assert.doesNotMatch(publicPositioning, /production-ready/i);
});

test("professional experience precedes education and uses recruiter-friendly dates", () => {
  const experience = read("components/experience.tsx");
  const jobPosition = experience.indexOf("{/* Experience comes first");
  const educationPosition = experience.indexOf("{/* Education */}");

  assert.ok(jobPosition >= 0 && jobPosition < educationPosition);
  assert.equal(es.experience.experience_list[0].title, "Desarrollador de Aplicaciones Web");
  assert.equal(es.experience.experience_list[0].contract, "Prácticas");
  assert.equal(es.experience.experience_list[0].period, "Abr 2026 — May 2026");
  assert.equal(en.experience.experience_list[0].title, "Web Application Developer");
  assert.equal(en.experience.experience_list[0].contract, "Internship");
  assert.equal(en.experience.experience_list[0].period, "Apr 2026 — May 2026");
});
