"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";

export function Skills() {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const groups = t.skills.groups;

  useGSAP(
    () => {
      const rows = gsap.utils.selector(containerRef)(".capability-row");
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(rows, { autoAlpha: 0, y: 24 }, {
          autoAlpha: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.07,
          ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 72%", once: true },
        });
      });
      return () => media.revert();
    },
    { scope: containerRef },
  );

  return (
    <section id="about" ref={containerRef} aria-labelledby="capabilities-title" className="relative bg-background px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
      <div className="mx-auto max-w-[100rem]">
        <header className="grid gap-8 border-b border-border/60 pb-12 md:grid-cols-[.75fr_1.25fr] md:items-end">
          <div>
            <p className="section-kicker">{language === "es" ? "02 / Perfil y capacidades" : "02 / Profile & capabilities"}</p>
            <h2 id="capabilities-title" className="mt-5 text-[clamp(3rem,7vw,7rem)] font-black leading-[.98] tracking-[-.075em]">
              {language === "es" ? <>Interfaces<br />con criterio.</> : <>Built<br />with intent.</>}
            </h2>
          </div>
          <p className="max-w-[38ch] text-lg leading-relaxed text-muted-foreground md:justify-self-end">{t.skills.desc}</p>
        </header>

        <div>
          {groups.map((group, index) => (
            <article key={group.area} className="capability-row grid gap-4 border-b border-border/55 py-7 md:grid-cols-[3rem_minmax(0,.8fr)_minmax(0,1.2fr)] sm:items-baseline sm:py-9">
              <span className="font-mono text-[11px] text-primary">0{index + 1}</span>
              <h3 className="text-2xl font-black tracking-[-.04em] sm:text-3xl">{group.area}</h3>
              <p className="text-base font-semibold leading-relaxed text-foreground/82 sm:text-lg">{group.stack.join(" · ")}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
