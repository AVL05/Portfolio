"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, FileText, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);

      if (prefersReducedMotion()) {
        gsap.set(q(".hero-reveal"), { autoAlpha: 1, yPercent: 0 });
        gsap.set(q(".hero-frame"), { scale: 1 });
        return;
      }

      const intro = gsap.timeline({ defaults: { ease: "expo.out" } });
      intro
        .fromTo(
          q(".hero-mask-line"),
          { yPercent: 115 },
          { yPercent: 0, duration: 0.8, stagger: 0.07 },
        )
        .fromTo(
          q(".hero-reveal"),
          { autoAlpha: 0, y: 18 },
          { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.05 },
          "-=0.55",
        )
        .fromTo(
          q(".hero-frame"),
          { scale: 1.08 },
          { scale: 1, duration: 0.95, ease: "power3.out" },
          0,
        );

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: containerRef.current,
              start: "top top",
              end: "bottom top",
              scrub: 1.1,
            },
          })
          .to(q(".hero-frame"), { scale: 1.14, yPercent: 7, ease: "none" }, 0)
          .to(q(".hero-title-a"), { xPercent: -8, ease: "none" }, 0)
          .to(q(".hero-title-b"), { xPercent: 7, ease: "none" }, 0)
          .to(q(".hero-copy"), { yPercent: -28, autoAlpha: 0.35, ease: "none" }, 0);

        const visual = q(".hero-visual")[0] as HTMLElement | undefined;
        if (!visual) return;
        const xTo = gsap.quickTo(visual, "x", { duration: 0.8, ease: "power3.out" });
        const yTo = gsap.quickTo(visual, "y", { duration: 0.8, ease: "power3.out" });
        const onPointerMove = (event: PointerEvent) => {
          xTo((event.clientX / window.innerWidth - 0.5) * 18);
          yTo((event.clientY / window.innerHeight - 0.5) * 14);
        };
        window.addEventListener("pointermove", onPointerMove, { passive: true });
        return () => window.removeEventListener("pointermove", onPointerMove);
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section
      id="hero"
      ref={containerRef}
      aria-labelledby="hero-title"
      className="hero-cinema relative min-h-[max(100dvh,48rem)] overflow-hidden bg-background"
    >
      <div className="hero-visual absolute inset-x-3 top-20 h-[52dvh] overflow-hidden sm:inset-x-6 sm:h-[58dvh] lg:inset-x-[31vw] lg:bottom-12 lg:top-24 lg:h-auto">
        <div className="hero-frame absolute inset-0 will-change-transform">
          <Image
            src="/photography/hero.webp"
            alt={
              language === "es"
                ? "Acantilados fotografiados por Alex Vicente"
                : "Cliffs photographed by Alex Vicente"
            }
            fill
            priority
            fetchPriority="high"
            className="object-cover object-center"
            sizes="(max-width: 1024px) calc(100vw - 1.5rem), 38vw"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,8,7,.08),rgba(8,8,7,.5))]" />
        </div>
        <div className="absolute inset-0 border border-white/14" />
        <span className="absolute right-4 top-14 hidden bg-black/55 px-2 py-1 font-mono text-[11px] font-semibold uppercase tracking-[.16em] text-white sm:block">
          {language === "es" ? "Fotografía de Alex Vicente" : "Photograph by Alex Vicente"}
        </span>
      </div>

      <div className="relative z-10 mx-auto flex min-h-[max(100dvh,48rem)] max-w-[100rem] flex-col px-4 pb-6 pt-24 sm:px-6 sm:pb-8 lg:pl-8 lg:pr-20 lg:pt-28">
        <div className="hero-reveal flex items-center justify-between gap-4 font-mono text-[11px] font-semibold uppercase tracking-[.14em] text-foreground/76">
          <span>{t.hero.status}</span>
          <span className="hidden items-center gap-4 md:flex">
            <span className="text-primary">Portfolio</span>
            <span aria-hidden="true" className="h-px w-8 bg-border" />
            React · Next.js · TypeScript · GSAP
          </span>
        </div>

        <h1 id="hero-title" className="mt-[33dvh] lg:mt-auto">
          <span className="block overflow-hidden">
            <span className="hero-mask-line hero-title-a block whitespace-nowrap text-[18vw] font-black uppercase leading-[.72] tracking-[-.085em] text-foreground will-change-transform lg:text-[12vw]">
              Alex
            </span>
          </span>
          <span className="block overflow-hidden text-right">
            <span className="hero-mask-line hero-title-b block whitespace-nowrap text-[18vw] font-black uppercase leading-[.76] tracking-[-.085em] text-foreground will-change-transform lg:text-[12vw]">
              Vicente
            </span>
          </span>
        </h1>

        <div className="hero-copy mt-7 grid gap-7 border-t border-border/70 pt-5 will-change-transform md:grid-cols-[minmax(0,.72fr)_minmax(280px,.5fr)_auto] md:items-end">
          <div className="hero-reveal">
            <p className="font-mono text-[11px] font-bold uppercase tracking-[.15em] text-primary">
              {language === "es"
                ? "Desarrollador Full-Stack"
                : "Full-Stack Developer"}
            </p>
            <p className="mt-3 max-w-[58ch] text-base font-medium leading-relaxed text-foreground/76 sm:text-lg">
              {t.hero.description}
            </p>
          </div>

          <div className="hero-reveal flex flex-wrap gap-x-5 gap-y-3 text-xs font-semibold uppercase tracking-[.08em]">
            <a data-cursor="external" href="https://github.com/AVL05" target="_blank" rel="noopener noreferrer" className="cinema-link">
              <FaGithub /> GitHub
            </a>
            <a data-cursor="external" href="https://www.linkedin.com/in/aleviclop/" target="_blank" rel="noopener noreferrer" className="cinema-link">
              <FaLinkedin /> LinkedIn
            </a>
            <a data-cursor="contact" href="mailto:alexviclop@gmail.com" className="cinema-link">
              <Mail /> {language === "es" ? "Contacto" : "Contact"}
            </a>
            <a href="/cv/CV_Alex_Vicente_Lopez_Frontend_React_A4.pdf" download className="cinema-link">
              <FileText /> CV
            </a>
          </div>

          <a
            data-cursor="project"
            href="#projects"
            className="hero-reveal group inline-flex min-h-12 items-center justify-between gap-8 border border-foreground bg-foreground px-5 text-xs font-bold uppercase tracking-[.12em] text-background transition-colors hover:bg-primary hover:text-primary-foreground md:min-w-52"
          >
            {language === "es" ? "Ver proyectos" : "View work"}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </a>
        </div>

        <div className="hero-scroll hero-reveal mt-6 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[.14em] text-muted-foreground lg:absolute lg:right-7 lg:top-1/2 lg:mt-0 lg:-translate-y-1/2 lg:flex-col lg:gap-3">
          <ArrowDown className="h-3.5 w-3.5 lg:h-4 lg:w-4" />
          <span className="lg:rotate-180 lg:[writing-mode:vertical-rl]">
            {t.hero.scroll} / 01—05
          </span>
          <span aria-hidden="true" className="hidden h-12 w-px bg-border lg:block" />
        </div>
      </div>
    </section>
  );
}
