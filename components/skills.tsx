"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";

const groups = [
  { area: "Frontend", stack: "React · Next.js · TypeScript · JavaScript · HTML · CSS", proof: "raw.vives · RAW Manager · Distrito Gourmet" },
  { area: "Interaction", stack: "GSAP · ScrollTrigger · View Transitions · responsive UI", proof: "raw.vives · aleviclop.dev" },
  { area: "Backend", stack: "Laravel · PHP · MySQL · REST APIs · Sanctum", proof: "RAW Manager · Distrito Gourmet · API Hotel" },
  { area: "Tools", stack: "Git · GitHub · Vite · Docker · Electron · PWA", proof: "Product delivery · version control" },
  { area: "Design & Visual", stack: "Photoshop · Illustrator · InDesign · photography", proof: "raw.vives · Llibret Falla el Molí" },
];

export function Skills() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

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
            <p className="section-kicker">03 / Capabilities</p>
            <h2 id="capabilities-title" className="mt-5 text-[clamp(3.8rem,9vw,9rem)] font-black leading-[.78] tracking-[-.075em]">Built<br />with intent.</h2>
          </div>
          <p className="max-w-[58ch] text-lg font-medium leading-relaxed text-foreground/66 md:justify-self-end md:text-xl">
            {language === "es"
              ? "Frontend como especialidad. Producto, backend y dirección visual como contexto para tomar mejores decisiones y entregar experiencias completas."
              : "Frontend as my specialty. Product, backend, and visual direction as context for better decisions and complete delivery."}
          </p>
        </header>

        <div>
          {groups.map((group, index) => (
            <article key={group.area} className="capability-row grid gap-4 border-b border-border/55 py-7 sm:grid-cols-[3rem_minmax(150px,.55fr)_minmax(0,1.2fr)_minmax(180px,.7fr)] sm:items-baseline sm:py-9">
              <span className="font-mono text-[10px] text-primary">0{index + 1}</span>
              <h3 className="text-2xl font-black tracking-[-.04em] sm:text-3xl">{group.area}</h3>
              <p className="text-base font-semibold leading-relaxed text-foreground/82 sm:text-lg">{group.stack}</p>
              <p className="font-mono text-[9px] uppercase leading-relaxed tracking-[.12em] text-muted-foreground">{group.proof}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
