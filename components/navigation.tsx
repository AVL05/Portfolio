"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import { LanguageToggle } from "./language-toggle";

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
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const navLinksContainerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (progressRef.current) {
        gsap.set(progressRef.current, {
          scaleX: 0,
          transformOrigin: "left center",
        });
      }

      if (prefersReducedMotion()) {
        gsap.set([".nav-logo", ".nav-item", ".nav-extra"], {
          opacity: 1,
          x: 0,
          y: 0,
        });
        return;
      }

      // Navbar Entrance
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.fromTo(
        ".nav-logo",
        { opacity: 0, x: -10 },
        { opacity: 1, x: 0, duration: 0.8, delay: 0.2 },
      )
        .fromTo(
          ".nav-item",
          { opacity: 0, y: -5 },
          { opacity: 1, y: 0, stagger: 0.05, duration: 0.6 },
          "-=0.6",
        )
        .fromTo(
          ".nav-extra",
          { opacity: 0, x: 10 },
          { opacity: 1, x: 0, duration: 0.8 },
          "-=0.6",
        );
    },
    { scope: containerRef },
  );

  // 1. Efficient Active Section Detection (Intersection Observer)
  useEffect(() => {
    const sections = navItems.map((item) => item.href.substring(1));
    const observers: IntersectionObserver[] = [];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -70% 0px", // Adjust to trigger when section is in "active" zone
      threshold: 0,
    };

    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // 2. Efficient Scroll Header State
  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 20;
      setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div ref={containerRef}>
      <nav
        ref={navRef}
        className={`fixed left-0 right-0 top-0 z-[90] transition-all duration-500 ${
          isScrolled
            ? "py-3"
            : "py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between border px-3.5 py-3 backdrop-blur-2xl transition-all duration-500 sm:px-4 ${
              isScrolled
                ? "rounded-2xl border-border/80 bg-background/86 shadow-[0_24px_70px_-46px_rgba(0,0,0,0.92)]"
                : "rounded-2xl border-border/45 bg-background/34"
            }`}
          >
            <a
              href="#hero"
              className="nav-logo group shrink-0 text-base font-black tracking-normal text-foreground transition-all sm:text-lg lg:whitespace-nowrap"
            >
              ALEX <span className="text-primary">VICENTE</span>
            </a>

            <div
              ref={navLinksContainerRef}
              className="relative hidden items-center justify-center gap-1.5 rounded-2xl border border-border/70 bg-card/62 p-2 backdrop-blur-xl xl:flex"
            >
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`nav-item group relative z-10 inline-flex min-w-[6.75rem] items-center justify-center whitespace-nowrap rounded-xl px-4 py-2.5 text-center text-[11px] font-black uppercase tracking-[0.12em] transition-all duration-300 ${
                      isActive
                        ? "bg-primary text-primary-foreground shadow-[0_10px_26px_-18px_var(--primary)]"
                        : "text-foreground/72 hover:bg-secondary/70 hover:text-foreground"
                    }`}
                  >
                    {item.name}
                  </a>
                );
              })}
            </div>

            <div className="nav-extra hidden xl:flex items-center gap-4 ml-4">
              <LanguageToggle />
            </div>

            <div className="xl:hidden flex items-center gap-4">
              <LanguageToggle />
              <a
                href="#mobile-menu"
                aria-label="Abrir menú"
                className="inline-flex size-9 items-center justify-center rounded-xl text-foreground transition-all hover:bg-foreground/5 hover:text-primary focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
              >
                <Menu className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div
          id="mobile-menu"
          className="fixed inset-0 z-[100] hidden h-screen w-full flex-col items-center justify-center space-y-7 bg-background px-6 target:flex xl:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-center text-4xl font-black tracking-normal text-foreground transition-all hover:text-primary sm:text-5xl"
            >
              {item.name}
            </a>
          ))}
          <a
            href="#hero"
            aria-label="Cerrar menú"
            className="absolute right-8 top-8 inline-flex size-12 items-center justify-center rounded-2xl text-foreground transition-all hover:bg-foreground/5 hover:text-primary focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
          >
              <X className="h-8 w-8" />
          </a>
        </div>
      </nav>
    </div>
  );
}
