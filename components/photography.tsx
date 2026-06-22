"use client";

import { useRef } from "react";
import { ExternalLink } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

const photographyLinks = {
  website: "https://gallery.aleviclop.dev/",
  instagram: "https://www.instagram.com/aleviclop/",
};

export function Photography() {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);

      if (prefersReducedMotion()) {
        gsap.set([q(".photo-img"), q(".photo-in")], { opacity: 1, y: 0, autoAlpha: 1 });
        return;
      }

      gsap.to(q(".photo-img"), {
        y: -60,
        ease: "none",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1.8,
        },
      });

      gsap.fromTo(
        q(".photo-in"),
        { autoAlpha: 0, y: 28 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.1,
          duration: 0.85,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 78%",
            once: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      id="photography"
      ref={containerRef}
      className="relative overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 glow-divider" />

      {/* Full-width cinematic image */}
      <div className="relative h-[70vh] min-h-[480px] max-h-[700px] w-full overflow-hidden">
        <div className="photo-img absolute inset-[-10%] top-[-5%]">
          <Image
            src="/photography/hero.webp"
            alt="Fotografía - Alex Vicente"
            fill
            className="object-cover object-center"
            sizes="100vw"
            priority
          />
        </div>

        {/* Overlays */}
        <div className="absolute inset-0 bg-linear-to-r from-background/95 via-background/50 to-background/10" />
        <div className="absolute inset-0 bg-linear-to-t from-background via-transparent to-transparent" />

        {/* Text overlay — left side */}
        <div className="absolute inset-0 flex items-end pb-14 px-6 sm:px-10 lg:px-16">
          <div className="max-w-2xl space-y-6">
            {/* Eyebrow */}
            <div className="photo-in flex items-center gap-3">
              <span className="h-px w-8 bg-primary/60" />
              <span className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary/70">
                {t.photography.subtitle}
              </span>
            </div>

            {/* Big heading */}
            <h2 className="photo-in text-5xl font-black leading-[0.9] tracking-normal text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
              {t.photography.title
                .split(" ")
                .map((word: string, i: number) => (
                  <span
                    key={i}
                    className={`block ${i === 1 ? "text-primary" : ""}`}
                  >
                    {word}
                  </span>
                ))}
            </h2>

            {/* Description */}
            <p className="photo-in max-w-md text-sm font-medium leading-relaxed text-muted-foreground sm:text-base">
              {t.photography.description}
            </p>

            {/* CTAs */}
            <div className="photo-in flex flex-wrap gap-3">
              <a
                href={photographyLinks.website}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-2.5 rounded-xl border border-primary/35 bg-primary/10 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-primary backdrop-blur-sm transition-all duration-300 hover:bg-primary hover:text-primary-foreground hover:border-primary"
              >
                <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />
                {t.photography.view_full}
              </a>
              <a
                href={photographyLinks.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 rounded-xl border border-border/50 bg-background/40 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-border hover:text-foreground"
              >
                <FaInstagram className="h-3.5 w-3.5" />
                @aleviclop
              </a>
            </div>
          </div>
        </div>

        {/* Right-side film-grain texture */}
        <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-20"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
            backgroundSize: "180px",
          }}
        />
      </div>

      {/* Bottom strip — stats + gallery hint */}
      <div className="relative z-10 border-t border-border/30 bg-background/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-8 sm:flex-row sm:items-center sm:px-10 lg:px-16">
          <div className="photo-in flex items-center gap-8 sm:gap-12">
            {[
              { val: "2022", label: language === "es" ? "Desde" : "Since" },
              { val: "35mm", label: language === "es" ? "Formato" : "Format" },
              { val: "Film", label: language === "es" ? "Estilo" : "Style" },
            ].map((item) => (
              <div key={item.label} className="flex flex-col gap-0.5">
                <span className="font-mono text-xl font-black text-foreground sm:text-2xl">
                  {item.val}
                </span>
                <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-muted-foreground/50">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <a
            href={photographyLinks.website}
            target="_blank"
            rel="noopener noreferrer"
            className="photo-in group flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.24em] text-muted-foreground/50 transition-colors hover:text-primary"
          >
            <span>{language === "es" ? "Ver galería completa" : "View full gallery"}</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
