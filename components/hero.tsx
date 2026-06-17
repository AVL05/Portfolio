"use client";

import { useRef } from "react";
import { Mail, BriefcaseBusiness } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import Image from "next/image";

const heroProjects = [
  { src: "/projects/distrito_gourmet.png", alt: "Distrito Gourmet" },
  { src: "/projects/el-fogon.png", alt: "El Fogon" },
  { src: "/projects/aitanamora.png", alt: "E-commerce" },
  { src: "/projects/api-hotel-cover.png", alt: "API Hotel" },
];

export function Hero() {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const chars = q(".reveal-char");

      if (prefersReducedMotion()) {
        gsap.set(
          [chars, q(".hero-fade"), q(".hero-visual")],
          { opacity: 1, x: 0, y: 0, scale: 1, autoAlpha: 1 },
        );
        return;
      }

      const scrambleIntervals: ReturnType<typeof setInterval>[] = [];
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        chars,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.028,
          duration: 0.78,
          ease: "expo.out",
          onStart: () => {
            chars.forEach((el, i) => {
              const originalChar = el.textContent;
              const scrambleChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
              let iterations = 0;
              const interval = setInterval(() => {
                el.textContent =
                  scrambleChars[Math.floor(Math.random() * scrambleChars.length)];
                iterations++;
                if (iterations > 8 + i * 2) {
                  el.textContent = originalChar;
                  clearInterval(interval);
                }
              }, 48);
              scrambleIntervals.push(interval);
            });
          },
        },
      )
        .fromTo(
          q(".hero-fade"),
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, stagger: 0.10, duration: 0.68, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          q(".hero-visual"),
          { autoAlpha: 0, x: 24 },
          { autoAlpha: 1, x: 0, duration: 1.0, ease: "power3.out" },
          "-=0.9",
        );

      return () => {
        scrambleIntervals.forEach(clearInterval);
      };
    },
    { scope: containerRef },
  );

  const name = "Alex Vicente López";

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-[100dvh] flex-col justify-center overflow-hidden bg-background px-4 pb-16 pt-24 sm:px-6 sm:pt-28 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.14] dark:opacity-[0.09]" />

      <div className="pointer-events-none absolute left-[10%] top-[14%] h-80 w-80 rounded-full bg-primary/8 blur-3xl" />
      <div className="pointer-events-none absolute right-[6%] bottom-[16%] h-60 w-60 rounded-full bg-accent/6 blur-3xl" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/5 via-transparent to-background/55" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1fr_0.78fr] lg:gap-16">
        <div className="flex flex-col items-start space-y-7">
          <div className="hero-fade inline-flex items-center gap-2.5">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" />
            <span className="text-[11px] font-mono uppercase tracking-[0.2em] text-primary/80">
              {t.hero.status}
            </span>
          </div>

          <h1 aria-label={name}>
            {name.split(" ").map((word, i) => (
              <span
                key={i}
                className="block whitespace-nowrap"
                aria-hidden="true"
              >
                {word.split("").map((char, j) => (
                  <span
                    key={j}
                    className="reveal-char hero-title-char inline-block cursor-default text-[3.2rem] text-display text-foreground sm:text-7xl md:text-8xl lg:text-[6rem] xl:text-[6.5rem]"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="hero-fade max-w-xl text-balance text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
            {t.hero.description}
          </p>

          <div className="hero-fade flex flex-col items-stretch gap-3 sm:flex-row sm:items-center w-full sm:w-auto">
            <a href="#projects">
              <div className="group flex items-center justify-center gap-2.5 rounded-xl bg-foreground px-6 py-3.5 text-sm font-bold text-background transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground active:scale-[0.98]">
                <BriefcaseBusiness className="h-4 w-4 shrink-0" />
                {language === "es" ? "Ver proyectos" : "View projects"}
              </div>
            </a>
            <a href="#contact">
              <div className="group flex items-center justify-center gap-2.5 rounded-xl border border-border/80 bg-card/60 px-6 py-3.5 text-sm font-bold text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:text-foreground active:scale-[0.98]">
                <Mail className="h-4 w-4 shrink-0 text-accent" />
                {language === "es" ? "Contactar" : "Contact"}
              </div>
            </a>
          </div>

          <div className="hero-fade flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/AVL05"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/50 px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground transition-all hover:border-primary/35 hover:text-primary"
            >
              <FaGithub className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/alex-vicente-lopez/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/50 px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground transition-all hover:border-primary/35 hover:text-primary"
            >
              <FaLinkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
          </div>
        </div>

        {/* Project image grid - only desktop */}
        <div className="hero-visual hidden lg:block">
          <div
            className="relative grid grid-cols-2 gap-3"
            style={{ transform: "rotate(-1.5deg)" }}
          >
            {heroProjects.map((project, i) => (
              <a
                key={project.src}
                href="#projects"
                className={`group relative overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-500 hover:border-primary/45 hover:shadow-xl ${
                  i % 2 === 1 ? "translate-y-5" : ""
                }`}
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={project.src}
                  alt={project.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  sizes="(max-width: 1280px) 20vw, 270px"
                />
                <div className="absolute inset-0 bg-linear-to-t from-background/50 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-25" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-20 w-full bg-linear-to-t from-background to-transparent" />
    </section>
  );
}
