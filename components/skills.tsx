"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";

const getGroups = (language: "es" | "en") => [
  { area: language === "es" ? "Desarrollo frontend" : "Frontend development", stack: "React · Next.js · TypeScript · JavaScript · HTML · CSS · Tailwind", proof: "raw.vives · LumaFlow Studio · Distrito Gourmet" },
  { area: language === "es" ? "Interacción" : "Interaction", stack: language === "es" ? "GSAP · ScrollTrigger · transiciones de vista · interfaz adaptable · accesibilidad" : "GSAP · ScrollTrigger · view transitions · responsive UI · accessibility", proof: "raw.vives · aleviclop.dev" },
  { area: language === "es" ? "Desarrollo backend" : "Backend development", stack: "Laravel · PHP · MySQL · APIs REST · Sanctum", proof: "LumaFlow Studio · Distrito Gourmet · API Hotel" },
  { area: language === "es" ? "Flujo de trabajo" : "Workflow", stack: language === "es" ? "Git · GitHub · Bitbucket · pruebas · CI/CD · Vercel · Docker" : "Git · GitHub · Bitbucket · testing · CI/CD · Vercel · Docker", proof: language === "es" ? "Entrega · equipo · control de versiones" : "Delivery · teamwork · version control" },
  { area: language === "es" ? "Diseño y fotografía" : "Design & photography", stack: language === "es" ? "Composición · tipografía · dirección de arte · Lightroom · Adobe" : "Composition · typography · art direction · Lightroom · Adobe", proof: "raw.vives · Llibret Falla el Molí" },
];

export function Skills() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const groups = getGroups(language);

  useGSAP(
    () => {
      const rows = gsap.utils.selector(containerRef)(".capability-row");
      if (prefersReducedMotion()) {
        gsap.set(rows, { autoAlpha: 1, y: 0 });
        return;
      }
      gsap.fromTo(rows, { autoAlpha: 0, y: 24 }, {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        stagger: 0.07,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 72%", once: true },
      });
    },
    { scope: containerRef },
  );

  return (
    <section id="about" ref={containerRef} aria-labelledby="capabilities-title" className="relative bg-background px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-[100rem]">
        <header className="grid gap-8 border-b border-border/60 pb-12 md:grid-cols-[.75fr_1.25fr] md:items-end">
          <div>
            <p className="section-kicker">{language === "es" ? "02 / Perfil y capacidades" : "02 / Profile & capabilities"}</p>
            <h2 id="capabilities-title" className="mt-5 text-[clamp(3.8rem,9vw,9rem)] font-black leading-[.78] tracking-[-.075em]">
              {language === "es" ? <>Interfaces<br />con criterio.</> : <>Built<br />with intent.</>}
            </h2>
          </div>
          <div className="max-w-[58ch] space-y-4 text-lg font-medium leading-relaxed text-foreground/66 md:justify-self-end md:text-xl">
            <p>{language === "es"
              ? "Me centro en interfaces React y Next.js accesibles, responsive y mantenibles. Mi base en Laravel, PHP y MySQL me permite trabajar con soltura entre APIs, flujos de datos e integración frontend."
              : "I focus on accessible, responsive, maintainable React and Next.js interfaces. My Laravel, PHP, and MySQL background lets me work comfortably across APIs, data flows, and frontend integration."}</p>
            <p className="text-sm text-muted-foreground sm:text-base">{language === "es"
              ? "Trabajo como freelance desde Valencia y en remoto. La fotografía aporta composición y criterio visual; el código sigue siendo el centro de mi perfil profesional."
              : "I work freelance from Valencia and remotely. Photography informs composition and visual judgment; software development remains the core of my professional profile."}</p>
          </div>
        </header>

        <div>
          {groups.map((group, index) => (
            <article key={group.area} className="capability-row grid gap-4 border-b border-border/55 py-7 sm:grid-cols-[3rem_minmax(150px,.55fr)_minmax(0,1.2fr)_minmax(180px,.7fr)] sm:items-baseline sm:py-9">
              <span className="font-mono text-[11px] text-primary">0{index + 1}</span>
              <h3 className="text-2xl font-black tracking-[-.04em] sm:text-3xl">{group.area}</h3>
              <p className="text-base font-semibold leading-relaxed text-foreground/82 sm:text-lg">{group.stack}</p>
              <p className="font-mono text-[11px] uppercase leading-relaxed tracking-[.1em] text-muted-foreground">{group.proof}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
