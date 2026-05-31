"use client";

import { useRef } from "react";
import { ArrowDown, Mail, BriefcaseBusiness } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import Image from "next/image";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const chars = q(".reveal-char");
      const reducedMotion = prefersReducedMotion();

      if (reducedMotion) {
        gsap.set(
          [
            chars,
            q(".hero-badge"),
            q(".hero-description"),
            q(".social-magnetic"),
            q(".scroll-indicator"),
          ],
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotateY: 0,
            filter: "none",
          },
        );
        return;
      }

      const scrambleIntervals: ReturnType<typeof setInterval>[] = [];
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // 1. Entrance Animation
      tl.fromTo(
        chars,
        { opacity: 0, filter: "blur(10px)" },
        {
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.03,
          duration: 1.2,
          ease: "expo.out",
          onStart: () => {
            // Custom Scramble Effect
            chars.forEach((el, i) => {
              const originalChar = el.textContent;
              const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
              let iterations = 0;

              const interval = setInterval(() => {
                el.textContent =
                  chars[Math.floor(Math.random() * chars.length)];
                iterations++;
                if (iterations > 10 + i * 2) {
                  el.textContent = originalChar;
                  clearInterval(interval);
                }
              }, 50);
              scrambleIntervals.push(interval);
            });
          },
        },
      )
        .fromTo(
          q(".hero-badge"),
          { opacity: 0, scale: 0.5, rotateY: 180 },
          {
            opacity: 1,
            scale: 1,
            rotateY: 0,
            duration: 1.2,
            ease: "elastic.out(1, 0.3)",
          },
          "-=1",
        )
        .fromTo(
          q(".hero-description"),
          { opacity: 0, x: -30, filter: "blur(5px)" },
          {
            opacity: 1,
            x: 0,
            filter: "blur(0px)",
            duration: 1,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .fromTo(
          q(".social-magnetic"),
          { opacity: 0, scale: 0, stagger: 0.1 },
          { opacity: 1, scale: 1, duration: 0.8, ease: "back.out(2)" },
          "-=0.6",
        )
        .fromTo(
          q(".scroll-indicator"),
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, ease: "power4.out" },
          "-=0.4",
        );

      const glowXTo = gsap.quickTo(q(".hero-glow"), "x", {
        duration: 2.5,
        ease: "power3.out",
      });
      const glowYTo = gsap.quickTo(q(".hero-glow"), "y", {
        duration: 2.5,
        ease: "power3.out",
      });
      const gridRotateXTo = gsap.quickTo(gridRef.current, "rotateX", {
        duration: 2,
        ease: "power2.out",
      });
      const gridRotateYTo = gsap.quickTo(gridRef.current, "rotateY", {
        duration: 2,
        ease: "power2.out",
      });
      const gridZTo = gsap.quickTo(gridRef.current, "z", {
        duration: 2,
        ease: "power2.out",
      });

      // 3. Mouse Interaction (Subtle Parallax)
      const handleMouseMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const xPos = clientX / window.innerWidth - 0.5;
        const yPos = clientY / window.innerHeight - 0.5;

        glowXTo(xPos * 100);
        glowYTo(yPos * 100);
        gridRotateXTo(45 + yPos * 10);
        gridRotateYTo(xPos * 10);
        gridZTo(xPos * 50);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        scrambleIntervals.forEach(clearInterval);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef },
  );

  const name = "Alex Vicente";
  const featuredProject = t.projects.items[0];

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-24"
    >
      {/* Background elements */}
      <div
        ref={gridRef}
        className="absolute inset-[-100px] bg-grid opacity-[0.18] dark:opacity-[0.16] pointer-events-none"
      />

      <div className="absolute inset-0 bg-linear-to-b from-background/30 via-background/70 to-background pointer-events-none" />

      <div className="w-full max-w-7xl mx-auto z-10 grid grid-cols-1 lg:grid-cols-[minmax(0,1.02fr)_minmax(360px,0.78fr)] items-center gap-12 lg:gap-16">
        <div className="flex flex-col items-start text-left space-y-8 sm:space-y-10">
          {/* Status Badge */}
          <div className="hero-badge group flex items-center gap-3 px-4 py-2.5 dev-border rounded-full shadow-lg dark:shadow-[0_0_20px_rgba(0,0,0,0.2)] cursor-default overflow-hidden relative max-w-full">
            <div className="absolute inset-y-0 left-0 w-1 bg-primary" />
            <span className="relative flex h-2 w-2 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.16em] sm:tracking-[0.2em] uppercase text-primary/80 relative z-10 leading-relaxed">
              {t.hero.status}
            </span>
          </div>

          {/* Main Title */}
          <div className="relative space-y-5 perspective-2000">
            <h1
              className="flex flex-wrap justify-start py-3 preserve-3d"
              aria-label={name}
            >
              {name.split(" ").map((word, i) => (
                <span
                  key={i}
                  className="mr-[0.32em] inline-block whitespace-nowrap preserve-3d last:mr-0 sm:mr-[0.2em]"
                  aria-hidden="true"
                >
                  {word.split("").map((char, j) => (
                    <span
                      key={j}
                      className="reveal-char hero-title-char inline-block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground text-display cursor-default"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <h2 className="hero-description text-lg sm:text-2xl md:text-3xl text-muted-foreground font-medium tracking-tight max-w-3xl text-balance leading-relaxed sm:leading-snug">
              {t.hero.description}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 pt-1 w-full sm:w-auto">
            <a
              href="#projects"
              className="social-magnetic w-full sm:w-auto block"
            >
              <div className="group flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-bold rounded-lg hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-xl">
                <BriefcaseBusiness className="h-5 w-5" />
                <span className="text-sm tracking-tight">
                  {language === "es" ? "Ver proyectos" : "View projects"}
                </span>
              </div>
            </a>

            <a href="#contact" className="social-magnetic w-full sm:w-auto block">
              <div className="group flex items-center justify-center gap-3 px-8 py-4 bg-card/75 border border-border text-foreground font-bold rounded-lg hover:border-primary/50 transition-all duration-300">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-sm tracking-tight text-muted-foreground group-hover:text-foreground">
                  {language === "es" ? "Contactar" : "Contact"}
                </span>
              </div>
            </a>
          </div>

          <div className="hero-description flex flex-wrap items-center justify-start gap-5 pt-1 text-muted-foreground/70">
            <a
              href="https://github.com/AVL05"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:text-primary transition-colors"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/alex-vicente-lopez/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:text-primary transition-colors"
            >
              <FaLinkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="hero-description relative hidden lg:block">
          <a
            href="#projects"
            className="group block rounded-2xl border border-border/70 bg-card/70 p-3 shadow-2xl backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-primary/35"
            aria-label={featuredProject.title}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-secondary">
              <Image
                src={featuredProject.image}
                alt={featuredProject.title}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.035]"
                sizes="440px"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-background/95 via-background/20 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 p-6">
                <p className="mb-3 text-[10px] font-mono font-black uppercase tracking-[0.22em] text-primary/90">
                  {featuredProject.type}
                </p>
                <p className="max-w-sm text-2xl font-black leading-tight tracking-tight text-foreground">
                  {featuredProject.title}
                </p>
              </div>
            </div>
          </a>
          <div className="absolute -bottom-5 -left-5 h-28 w-28 border-l border-b border-primary/40" />
          <div className="absolute -right-5 -top-5 h-28 w-28 border-r border-t border-accent/35" />
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#projects"
        className="scroll-indicator hidden sm:flex absolute bottom-10 flex-col items-center gap-4 text-muted-foreground/50 hover:text-primary transition-all duration-500 group"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.4em] font-mono group-hover:tracking-[0.6em] transition-all">
          {t.hero.scroll}
        </span>
        <div className="p-3 border border-border/50 rounded-full group-hover:border-primary/30 group-hover:scale-110 transition-all flex items-center justify-center bg-secondary">
          <ArrowDown className="scroll-arrow h-4 w-4" />
        </div>
      </a>

      {/* Depth Mask Transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background to-transparent backdrop-blur-[2px] pointer-events-none z-20" />
    </section>
  );
}
