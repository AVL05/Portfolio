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
        gsap.set([q(".photo-img"), q(".photo-in")], {
          opacity: 1,
          y: 0,
          autoAlpha: 1,
        });
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

      <div className="relative mx-auto grid max-w-[92rem] gap-10 px-4 py-20 sm:px-6 sm:py-28 lg:grid-cols-[minmax(320px,0.82fr)_minmax(0,1.18fr)] lg:items-center lg:px-10 xl:px-12">
        <div className="photo-in max-w-xl space-y-6 lg:justify-self-end">
          <p className="section-kicker">{t.photography.subtitle}</p>
          <h2 className="text-5xl font-black leading-[0.9] tracking-normal text-foreground sm:text-6xl lg:text-7xl">
            {t.photography.title}
          </h2>
          <p className="max-w-md text-base font-medium leading-relaxed text-muted-foreground">
            {t.photography.description}
          </p>
          <div className="flex flex-wrap gap-3 pt-1">
            <a
              href={photographyLinks.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 rounded-lg bg-primary px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90"
            >
              <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />
              {t.photography.view_full}
            </a>
            <a
              href={photographyLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-lg border border-border/60 bg-card/50 px-5 py-3 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground backdrop-blur-sm transition-all duration-300 hover:border-primary/45 hover:text-foreground"
            >
              <FaInstagram className="h-3.5 w-3.5" />
              @aleviclop
            </a>
          </div>
        </div>

        <div className="photo-in relative w-full max-w-[58rem] lg:justify-self-start">
          <div className="photo-img relative aspect-[16/10] overflow-hidden rounded-xl border border-border/70 bg-secondary shadow-[0_40px_90px_-55px_rgba(0,0,0,0.95)]">
            <Image
              src="/projects/raw-vives/raw-vives-hero.webp"
              alt={
                language === "es"
                  ? "Hero del archivo fotográfico editorial raw.vives"
                  : "Hero of the raw.vives editorial photography archive"
              }
              fill
              className="object-cover object-center"
              sizes="(max-width: 1024px) 100vw, 62vw"
            />
            <div className="absolute inset-0 bg-linear-to-t from-background/50 via-transparent to-transparent" />
          </div>
          <div className="absolute -bottom-5 left-5 rounded-lg border border-border/65 bg-background/82 px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-xl">
            RAW.VIVES / ES—EN
          </div>
        </div>
      </div>

      <div
        className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-20"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: "180px",
        }}
      />

      <div className="relative z-10 border-t border-border/30 bg-background/60 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[92rem] flex-col items-start justify-between gap-6 px-6 py-8 sm:flex-row sm:items-center sm:px-10 lg:px-12">
          <div className="photo-in flex items-center gap-8 sm:gap-12">
            {[
              { val: "30", label: language === "es" ? "Fotos" : "Photos" },
              { val: "3", label: language === "es" ? "Series" : "Series" },
              { val: "ES/EN", label: language === "es" ? "Idiomas" : "Languages" },
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
            className="photo-in group inline-flex items-center gap-2 rounded-lg border border-primary/35 bg-primary/10 px-4 py-3 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-primary transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
          >
            <span>
              {language === "es" ? "Ver galería completa" : "View full gallery"}
            </span>
            <ExternalLink className="h-3.5 w-3.5 transition-transform duration-300 group-hover:rotate-12" />
          </a>
        </div>
      </div>
    </section>
  );
}
