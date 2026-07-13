"use client";

import { FileText, Menu, X } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import { LanguageToggle } from "./language-toggle";
import { OPEN_PALETTE_EVENT } from "./command-palette";

const SCRAMBLE_POOL = "ABCDEFGHIJKLMNOPQRSTUVWXYZ</>{}#";

/* Efecto de descodificación sobre el texto de un enlace al hacer hover. */
function scrambleText(el: HTMLElement) {
  if (prefersReducedMotion() || el.dataset.scrambling === "1") return;
  const original = el.dataset.label ?? el.textContent ?? "";
  el.dataset.label = original;
  el.dataset.scrambling = "1";
  let frame = 0;
  const iv = setInterval(() => {
    frame++;
    const fixed = Math.ceil(frame / 2);
    el.textContent = original
      .split("")
      .map((ch, i) =>
        i < fixed || ch === " "
          ? ch
          : SCRAMBLE_POOL[Math.floor(Math.random() * SCRAMBLE_POOL.length)],
      )
      .join("");
    if (fixed >= original.length) {
      el.textContent = original;
      delete el.dataset.scrambling;
      clearInterval(iv);
    }
  }, 32);
}

const SECTION_IDS = ["hero", "projects", "skills", "experience", "contact"];

export function Navigation() {
  const { t } = useLanguage();
  const navItems = [
    { name: t.nav.home, href: "#hero" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.skills, href: "#skills" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.contact, href: "#contact" },
  ];
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMac, setIsMac] = useState(false);

  useEffect(() => {
    setIsMac(/mac/i.test(navigator.platform));
  }, []);
  const containerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) {
        gsap.set([".nav-logo", ".nav-item", ".nav-extra"], {
          opacity: 1,
          x: 0,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".nav-logo",
        { opacity: 0, x: -8 },
        { opacity: 1, x: 0, duration: 0.7, delay: 0.15 },
      )
        .fromTo(
          ".nav-item",
          { opacity: 0, y: -4 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.5 },
          "-=0.5",
        )
        .fromTo(
          ".nav-extra",
          { opacity: 0, x: 8 },
          { opacity: 1, x: 0, duration: 0.7 },
          "-=0.5",
        );
    },
    { scope: containerRef },
  );

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
      const bar = progressRef.current;
      if (bar) {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    if (isMenuOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMenuOpen, closeMenu]);

  return (
    <div ref={containerRef}>
      <div className="fixed left-0 right-0 top-0 z-[95] h-0.5 bg-transparent">
        <div
          ref={progressRef}
          className="h-full origin-left bg-linear-to-r from-primary via-primary to-accent"
          style={{ transform: "scaleX(0)" }}
        />
      </div>
      <nav
        className={`fixed left-0 right-0 top-0 z-[90] transition-all duration-500 ${
          isScrolled ? "py-3" : "py-4"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between border px-3.5 py-2.5 backdrop-blur-2xl transition-all duration-500 sm:px-4 ${
              isScrolled
                ? "rounded-xl border-border/70 bg-background/90 shadow-[0_18px_60px_-38px_rgba(0,0,0,0.95)]"
                : "rounded-xl border-border/30 bg-background/30"
            }`}
          >
            <a
              href="#hero"
              className="nav-logo group shrink-0 font-mono text-sm font-black tracking-[0.04em] text-foreground transition-colors hover:text-primary"
            >
              <span className="text-primary">Alex</span>
              <span className="text-muted-foreground"> Vicente</span>
            </a>

            <div className="relative hidden items-center justify-center gap-1 xl:flex">
              {navItems.map((item) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`nav-item group relative z-10 inline-flex items-center justify-center whitespace-nowrap rounded-lg px-3.5 py-2 text-center text-[11px] font-bold uppercase tracking-[0.1em] transition-all duration-300 ${
                      isActive
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/65 hover:text-foreground"
                    }`}
                    onMouseEnter={(e) => {
                      const label =
                        e.currentTarget.querySelector<HTMLElement>(
                          ".nav-label",
                        );
                      if (label) scrambleText(label);
                    }}
                  >
                    <span className="nav-label" data-label={item.name}>
                      {item.name}
                    </span>
                  </a>
                );
              })}
            </div>

            <div className="nav-extra hidden items-center gap-3 xl:flex">
              <a
                href="/CV_Alex_Vicente_Lopez.pdf"
                download
                className="inline-flex items-center gap-1.5 rounded-lg border border-primary/35 bg-primary/10 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                <FileText className="h-3.5 w-3.5" />
                CV
              </a>
              <button
                type="button"
                aria-label="Abrir paleta de comandos"
                onClick={() =>
                  window.dispatchEvent(new CustomEvent(OPEN_PALETTE_EVENT))
                }
                className="inline-flex items-center gap-1.5 rounded-lg border border-border/60 bg-secondary/45 px-2.5 py-2 font-mono text-[10px] font-bold text-muted-foreground transition-all hover:border-primary/45 hover:text-primary"
              >
                <kbd className="tracking-tight">{isMac ? "⌘" : "Ctrl"}</kbd>
                <kbd>K</kbd>
              </button>
              <LanguageToggle />
            </div>

            <div className="flex items-center gap-3 xl:hidden">
              <LanguageToggle />
              <button
                type="button"
                aria-label="Abrir menú"
                aria-expanded={isMenuOpen}
                aria-controls="mobile-menu"
                onClick={() => setIsMenuOpen(true)}
                className="inline-flex size-9 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-all hover:border-primary/45 hover:text-primary"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menú de navegación"
        className={`fixed inset-0 z-[100] flex min-h-[100dvh] w-full flex-col items-start justify-center space-y-7 bg-background/97 px-8 backdrop-blur-2xl transition-all duration-300 xl:hidden ${
          isMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {navItems.map((item) => (
          <a
            key={item.name}
            href={item.href}
            onClick={closeMenu}
            className="text-left text-4xl font-black tracking-normal text-foreground transition-all hover:text-primary sm:text-6xl"
          >
            {item.name}
          </a>
        ))}
        <button
          type="button"
          aria-label="Cerrar menú"
          onClick={closeMenu}
          className="absolute right-6 top-6 inline-flex size-11 items-center justify-center rounded-lg border border-border/60 text-foreground transition-all hover:border-primary/45 hover:text-primary"
        >
          <X className="h-6 w-6" />
        </button>
      </div>
    </div>
  );
}
