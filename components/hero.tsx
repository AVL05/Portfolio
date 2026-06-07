"use client";

import { useRef } from "react";
import { ArrowDown, Mail, BriefcaseBusiness } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";

export function Hero() {
  const { t, language } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);

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
            q(".hero-3d-layer"),
          ],
          {
            opacity: 1,
            x: 0,
            y: 0,
            scale: 1,
            rotateY: 0,
            rotationX: 0,
            rotationY: 0,
          },
        );
        return;
      }

      const scrambleIntervals: ReturnType<typeof setInterval>[] = [];
      const tl = gsap.timeline({ defaults: { ease: "expo.out" } });

      // 1. Entrance Animation
      tl.fromTo(
        chars,
        { autoAlpha: 0, y: 18 },
        {
          autoAlpha: 1,
          y: 0,
          stagger: 0.03,
          duration: 0.82,
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
          { autoAlpha: 0, y: 18 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.72,
            ease: "power3.out",
          },
          "-=0.8",
        )
        .fromTo(
          q(".social-magnetic"),
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.54, stagger: 0.08, ease: "power3.out" },
          "-=0.6",
        )
        .fromTo(
          q(".scroll-indicator"),
          { autoAlpha: 0, y: 24 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power4.out" },
          "-=0.4",
        )
        .fromTo(
          q(".hero-3d-layer"),
          { autoAlpha: 0, y: 34, z: -120, rotationX: 12 },
          {
            autoAlpha: 1,
            y: 0,
            z: 0,
            rotationX: 0,
            stagger: 0.08,
            duration: 1,
            ease: "power4.out",
          },
          "-=0.75",
        );

      const glowXTo = gsap.quickTo(q(".hero-glow"), "x", {
        duration: 2.5,
        ease: "power3.out",
      });
      const glowYTo = gsap.quickTo(q(".hero-glow"), "y", {
        duration: 2.5,
        ease: "power3.out",
      });
      const gridRotateXTo = gsap.quickTo(gridRef.current, "rotationX", {
        duration: 2,
        ease: "power2.out",
      });
      const gridRotateYTo = gsap.quickTo(gridRef.current, "rotationY", {
        duration: 2,
        ease: "power2.out",
      });
      const gridZTo = gsap.quickTo(gridRef.current, "z", {
        duration: 2,
        ease: "power2.out",
      });
      const sceneRotateXTo = gsap.quickTo(sceneRef.current, "rotationX", {
        duration: 1.8,
        ease: "power3.out",
      });
      const sceneRotateYTo = gsap.quickTo(sceneRef.current, "rotationY", {
        duration: 1.8,
        ease: "power3.out",
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
        sceneRotateXTo(yPos * -5);
        sceneRotateYTo(xPos * 7);
      };

      window.addEventListener("mousemove", handleMouseMove);
      return () => {
        scrambleIntervals.forEach(clearInterval);
        window.removeEventListener("mousemove", handleMouseMove);
      };
    },
    { scope: containerRef },
  );

  const name = "Alex Vicente López";

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-background px-4 pb-16 pt-32 sm:px-6 sm:pb-24 sm:pt-36 lg:px-8"
    >
      {/* Background elements */}
      <div
        ref={gridRef}
        className="pointer-events-none absolute inset-[-120px] bg-grid opacity-[0.2] dark:opacity-[0.16]"
      />

      <div className="hero-glow pointer-events-none absolute left-[14%] top-[18%] h-72 w-72 rounded-full bg-primary/18 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] top-28 h-[34rem] w-[34rem] rounded-full border border-primary/20" />
      <div className="pointer-events-none absolute bottom-20 left-[-8rem] h-72 w-72 rounded-full border-[3rem] border-accent/10" />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-b from-background/10 via-background/72 to-background" />
      <div className="pointer-events-none absolute inset-x-0 top-32 h-px bg-linear-to-r from-transparent via-primary/45 to-transparent" />

      <div className="z-10 mx-auto grid w-full max-w-7xl items-center gap-12 lg:grid-cols-[minmax(0,1.12fr)_minmax(18rem,0.58fr)] lg:gap-16">
        <div className="flex flex-col items-start space-y-6 text-left sm:space-y-7">
          {/* Status Badge */}
          <div className="hero-badge group relative flex max-w-full cursor-default items-center gap-3 overflow-hidden rounded-2xl border border-border/80 bg-card/76 px-4 py-2.5 shadow-lg backdrop-blur-xl">
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
              className="preserve-3d flex flex-wrap justify-start py-3"
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
                      className="reveal-char hero-title-char inline-block cursor-default text-5xl text-display text-foreground sm:text-7xl md:text-8xl lg:text-[6.9rem]"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <h2 className="hero-description max-w-3xl text-balance text-lg font-medium leading-relaxed tracking-normal text-muted-foreground sm:text-xl sm:leading-snug md:text-2xl">
              {t.hero.description}
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-start gap-4 pt-1 w-full sm:w-auto">
            <a
              href="#projects"
              className="social-magnetic w-full sm:w-auto block"
            >
              <div className="group flex items-center justify-center gap-3 rounded-2xl bg-foreground px-8 py-4 font-bold text-background shadow-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground">
                <BriefcaseBusiness className="h-5 w-5" />
                <span className="text-sm tracking-normal">
                  {language === "es" ? "Ver proyectos" : "View projects"}
                </span>
              </div>
            </a>

            <a href="#contact" className="social-magnetic w-full sm:w-auto block">
              <div className="group flex items-center justify-center gap-3 rounded-2xl border border-border bg-card/75 px-8 py-4 font-bold text-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50">
                <Mail className="h-5 w-5 text-accent" />
                <span className="text-sm tracking-normal text-muted-foreground group-hover:text-foreground">
                  {language === "es" ? "Contactar" : "Contact"}
                </span>
              </div>
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-start gap-3 pt-1">
            <a
              href="https://github.com/AVL05"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-border/70 bg-card/62 px-3 py-2 text-xs font-mono font-black uppercase tracking-widest text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <FaGithub className="h-4 w-4" />
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/alex-vicente-lopez/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-xl border border-border/70 bg-card/62 px-3 py-2 text-xs font-mono font-black uppercase tracking-widest text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-primary"
            >
              <FaLinkedin className="h-4 w-4" />
              LinkedIn
            </a>
          </div>
        </div>

        <div className="hero-description hero-3d-stage relative hidden min-h-[34rem] lg:block">
          <div
            ref={sceneRef}
            className="hero-3d-scene absolute inset-0 origin-center"
            aria-hidden="true"
          >
            <div className="hero-3d-layer dev-panel absolute left-6 top-14 h-72 w-[26rem] overflow-hidden p-5 [transform:translateZ(64px)]">
              <div className="mb-5 flex items-center gap-2 border-b border-border/70 pb-4">
                <span className="size-2.5 rounded-full bg-primary" />
                <span className="size-2.5 rounded-full bg-accent/80" />
                <span className="size-2.5 rounded-full bg-foreground/20" />
              </div>
              <div className="grid grid-cols-[0.58fr_1fr] gap-5">
                <div className="space-y-3 border-r border-border/60 pr-5">
                  <div className="dev-code-line w-9/12" />
                  <div className="dev-code-line w-7/12" />
                  <div className="dev-code-line w-10/12" />
                  <div className="dev-code-line mt-7 w-6/12 bg-primary/35" />
                </div>
                <div className="space-y-3">
                  <div className="dev-code-line w-11/12 bg-primary/25" />
                  <div className="dev-code-line w-8/12" />
                  <div className="dev-code-line w-10/12 bg-accent/25" />
                  <div className="dev-code-line w-6/12" />
                  <div className="mt-7 grid grid-cols-3 gap-3">
                    <div className="h-14 rounded-xl border border-primary/20 bg-primary/8" />
                    <div className="h-14 rounded-xl border border-accent/20 bg-accent/8" />
                    <div className="h-14 rounded-xl border border-border/70 bg-secondary/45" />
                  </div>
                </div>
              </div>
            </div>

            <div className="hero-3d-layer dev-panel absolute right-2 top-0 h-40 w-52 p-4 [transform:translate3d(34px,-6px,150px)_rotateZ(6deg)]">
              <div className="mb-4 h-2 w-16 rounded-full bg-primary/50" />
              <div className="space-y-3">
                <div className="dev-code-line w-full" />
                <div className="dev-code-line w-8/12 bg-accent/25" />
                <div className="dev-code-line w-10/12" />
              </div>
            </div>

            <div className="hero-3d-layer dev-panel absolute bottom-8 right-10 h-48 w-64 overflow-hidden p-5 [transform:translate3d(0,0,110px)_rotateZ(-5deg)]">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="relative z-10 grid grid-cols-4 gap-3">
                {Array.from({ length: 12 }).map((_, index) => (
                  <span
                    key={index}
                    className="h-10 rounded-lg border border-border/60 bg-secondary/45 shadow-inner"
                  />
                ))}
              </div>
            </div>

            <div className="hero-3d-layer dev-cube absolute bottom-24 left-1 h-[76px] w-[76px] [transform:translateZ(180px)]">
              <span />
              <span />
              <span />
              <span />
              <span />
              <span />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#projects"
        className="scroll-indicator group absolute bottom-8 hidden flex-col items-center gap-3 text-muted-foreground transition-all duration-500 hover:text-primary sm:flex"
      >
        <span className="text-[10px] font-black uppercase tracking-[0.34em] font-mono opacity-80 transition-all group-hover:opacity-100">
          {t.hero.scroll}
        </span>
        <div className="flex items-center justify-center rounded-2xl border border-border/80 bg-card/80 p-3 shadow-lg backdrop-blur transition-all group-hover:scale-105 group-hover:border-primary/45">
          <ArrowDown className="scroll-arrow h-4 w-4" />
        </div>
      </a>

      {/* Depth Mask Transition */}
      <div className="pointer-events-none absolute bottom-0 left-0 z-0 h-20 w-full bg-linear-to-t from-background to-transparent" />
    </section>
  );
}
