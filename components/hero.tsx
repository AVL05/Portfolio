"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { FileText, Mail, BriefcaseBusiness } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { gsap, ScrollTrigger, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import { MagneticButton } from "@/components/magnetic-button";
import Image from "next/image";

// Fondo WebGL (Three.js): se carga solo en cliente y solo cuando el viewport lo merece.
const HeroWebGL = dynamic(
  () => import("@/components/hero-webgl").then((m) => m.HeroWebGL),
  { ssr: false },
);

const heroProjects = [
  { src: "/projects/distrito_gourmet.png", alt: "Distrito Gourmet" },
  { src: "/projects/el-fogon.png", alt: "El Fogon" },
  { src: "/projects/aitanamora.png", alt: "E-commerce" },
  { src: "/projects/api-hotel-cover.png", alt: "API Hotel" },
];

export function Hero() {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [showHeavyVisuals, setShowHeavyVisuals] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const update = () => setShowHeavyVisuals(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  const stats = [
    {
      value: 6,
      suffix: "+",
      label: language === "es" ? "Proyectos" : "Projects",
    },
    {
      value: 14,
      suffix: "+",
      label: language === "es" ? "Tecnologías" : "Technologies",
    },
    {
      value: 2,
      suffix: "",
      label: language === "es" ? "Años DAW" : "Years DAW",
    },
  ];

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const chars = q(".reveal-char");
      const reduce = prefersReducedMotion();

      if (reduce) {
        gsap.set([chars, q(".hero-fade"), q(".hero-visual"), q(".hero-stat")], {
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          autoAlpha: 1,
        });
        q(".hero-stat-val").forEach((el: Element, i) => {
          (el as HTMLElement).textContent = stats[i].value + stats[i].suffix;
        });
        return;
      }

      /* ── Load-in animation ──────────────────────────────────── */
      const scrambleIntervals: ReturnType<typeof setInterval>[] = [];
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      tl.fromTo(
        chars,
        { autoAlpha: 0, y: 22 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.025,
          duration: 0.82,
          onStart: () => {
            chars.forEach((el, i) => {
              const orig = el.textContent;
              const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
              let iter = 0;
              const iv = setInterval(() => {
                (el as HTMLElement).textContent =
                  pool[Math.floor(Math.random() * pool.length)];
                iter++;
                if (iter > 8 + i * 2) {
                  (el as HTMLElement).textContent = orig;
                  clearInterval(iv);
                }
              }, 46);
              scrambleIntervals.push(iv);
            });
          },
        },
      )
        .fromTo(
          q(".hero-fade"),
          { autoAlpha: 0, y: 16 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.1,
            duration: 0.7,
            ease: "power3.out",
          },
          "-=0.55",
        )
        .fromTo(
          q(".hero-visual"),
          { autoAlpha: 0, x: 28 },
          { autoAlpha: 1, x: 0, duration: 1.1, ease: "power3.out" },
          "-=0.95",
        )
        .fromTo(
          q(".hero-stat"),
          { autoAlpha: 0, y: 10 },
          {
            autoAlpha: 1,
            y: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power3.out",
          },
          "-=0.6",
        );

      /* ── Counter animation ───────────────────────────────────── */
      const statEls = q(".hero-stat-val");
      stats.forEach((stat, i) => {
        const el = statEls[i] as HTMLElement;
        if (!el) return;
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: stat.value,
          duration: 1.8,
          delay: 0.9 + i * 0.14,
          ease: "power2.out",
          onUpdate() {
            el.textContent = Math.round(proxy.val) + stat.suffix;
          },
        });
      });

      /* ── Subtle title float on scroll ─────────────────────── */
      const titleWords = q(".hero-word");
      if (titleWords.length) {
        gsap.to(titleWords, {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 2,
          },
        });
      }

      return () => {
        scrambleIntervals.forEach(clearInterval);
        ScrollTrigger.getAll().forEach((st) => {
          if (st.vars.trigger === containerRef.current) st.kill();
        });
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
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.08]" />

      {showHeavyVisuals && <HeroWebGL />}

      <div className="animate-aurora pointer-events-none absolute left-[-12rem] top-[-8rem] h-[38rem] w-[38rem] rounded-full bg-primary/10 blur-[130px]" />
      <div className="animate-aurora-slow pointer-events-none absolute bottom-[-12rem] right-[-10rem] h-[34rem] w-[34rem] rounded-full bg-accent/8 blur-[120px]" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/10 via-background/55 to-background" />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(320px,0.56fr)] lg:gap-16">
        <div className="flex flex-col items-start">
          <div className="hero-fade mb-5 inline-flex items-center gap-3 rounded-full border border-border/60 bg-card/55 px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_16px_rgba(125,180,120,0.35)]" />
            {t.hero.status}
          </div>

          <h1 aria-label={name} className="w-full max-w-none">
            {name.split(" ").map((word, i) => (
              <span
                key={i}
                className="hero-word flex flex-nowrap"
                aria-hidden="true"
              >
                {word.split("").map((char, j) => (
                  <span
                    key={j}
                    className="reveal-char hero-title-char inline-block cursor-default text-[3.2rem] text-display text-foreground sm:text-[4.6rem] md:text-[5.8rem] lg:text-[6.4rem] xl:text-[7.4rem]"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <div className="hero-fade mt-5 flex w-full flex-col gap-4 border-l border-border/70 pl-5 sm:max-w-2xl">
            <span className="font-mono text-[11px] font-bold uppercase tracking-[0.24em] text-primary">
              {language === "es"
                ? "Desarrollador Web & Diseñador"
                : "Web Developer & Designer"}
            </span>
            <p className="max-w-xl text-balance text-lg font-medium leading-relaxed text-muted-foreground sm:text-xl">
              {t.hero.description}
            </p>
          </div>

          <div className="hero-fade mt-5 flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center">
            <MagneticButton>
              <a href="#projects">
                <div className="group relative flex items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-primary px-7 py-4 text-sm font-bold text-primary-foreground shadow-[0_22px_45px_-24px_rgba(0,0,0,0.85)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 active:scale-[0.98]">
                  <BriefcaseBusiness className="h-4 w-4 shrink-0" />
                  {language === "es" ? "Ver proyectos" : "View projects"}
                </div>
              </a>
            </MagneticButton>
            <MagneticButton>
              <a href="mailto:alexviclop@gmail.com">
                <div className="group flex items-center justify-center gap-2.5 rounded-xl border border-border/70 bg-card/65 px-7 py-4 text-sm font-bold text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:bg-secondary active:scale-[0.98]">
                  <Mail className="h-4 w-4 shrink-0 text-accent" />
                  {language === "es" ? "Hablemos" : "Let's talk"}
                </div>
              </a>
            </MagneticButton>
          </div>

          <div className="hero-fade mt-4 flex flex-wrap items-center gap-3">
            <a
              href="/CV_Alex_Vicente_Lopez.pdf"
              download
              className="flex items-center gap-2 rounded-lg border border-primary/35 bg-primary/10 px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-widest text-primary transition-all hover:bg-primary hover:text-primary-foreground"
            >
              <FileText className="h-3.5 w-3.5" />
              CV PDF
            </a>
            <a
              href="https://github.com/AVL05"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/45 px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground transition-all hover:border-primary/45 hover:text-primary"
            >
              <FaGithub className="h-3.5 w-3.5" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/alex-vicente-lopez/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/45 px-3 py-2 text-[11px] font-mono font-bold uppercase tracking-widest text-muted-foreground transition-all hover:border-primary/45 hover:text-primary"
            >
              <FaLinkedin className="h-3.5 w-3.5" />
              LinkedIn
            </a>
          </div>

          <div className="hero-fade mt-7 grid w-full max-w-xl grid-cols-3 border-y border-border/45">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="hero-stat flex flex-col gap-1 border-r border-border/45 px-4 py-5 last:border-r-0 sm:px-6"
              >
                <span className="hero-stat-val font-mono text-2xl font-black text-foreground sm:text-3xl">
                  0{stat.suffix}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground/60">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="hero-visual hidden lg:block">
          <div className="relative">
            <div className="absolute -inset-6 rounded-[2rem] border border-border/35 bg-card/25 backdrop-blur-sm" />
            <div className="relative grid grid-cols-2 gap-3.5">
              {heroProjects.map((project, i) => (
                <a
                  key={project.src}
                  href="#projects"
                  className={`group relative overflow-hidden rounded-xl border border-border/60 bg-card transition-all duration-700 hover:border-primary/55 hover:-translate-y-1 ${
                    i % 2 === 1 ? "translate-y-7" : ""
                  }`}
                  style={{ aspectRatio: "3/2" }}
                >
                  <Image
                    src={project.src}
                    alt={project.alt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.06]"
                    sizes="(max-width: 1280px) 22vw, 290px"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-background/60 via-background/10 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-30" />
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      boxShadow:
                        "inset 0 0 0 1px oklch(from var(--primary) l c h / 0.25)",
                    }}
                  />
                </a>
              ))}
            </div>
            <div className="hero-fade absolute -bottom-9 left-8 rounded-xl border border-border/60 bg-background/80 px-4 py-3 font-mono text-[10px] font-bold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-xl">
              {language === "es" ? "Trabajo seleccionado" : "Selected work"}
            </div>
          </div>
        </div>
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-20 w-full bg-linear-to-t from-background to-transparent" />
    </section>
  );
}
