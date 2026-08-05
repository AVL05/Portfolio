"use client";

import { FileText, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { LanguageToggle } from "@/components/language-toggle";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

export function Navigation() {
  const { language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);

  const navItems = [
    { name: language === "es" ? "Proyectos" : "Work", href: "#projects" },
    { name: language === "es" ? "Sobre mí" : "About", href: "#about" },
    { name: language === "es" ? "Experiencia" : "Experience", href: "#experience" },
    { name: language === "es" ? "Contacto" : "Contact", href: "#contact" },
  ];
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

  useGSAP(() => {
    const progress = progressRef.current;
    if (!progress || prefersReducedMotion()) return;

    gsap.fromTo(
      progress,
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          start: 0,
          end: "max",
          scrub: 0.2,
        },
      },
    );
  });

  useGSAP(
    () => {
      const menu = menuRef.current;
      if (!menu) return;
      const q = gsap.utils.selector(menu);
      const items = q(".mobile-nav-item");
      const footer = q(".mobile-nav-footer");

      if (prefersReducedMotion()) {
        gsap.set(menu, {
          autoAlpha: isMenuOpen ? 1 : 0,
          xPercent: 0,
          visibility: isMenuOpen ? "visible" : "hidden",
        });
        gsap.set([items, footer], { autoAlpha: 1, yPercent: 0 });
        return;
      }

      if (!isMenuOpen) {
        gsap
          .timeline()
          .to([items, footer], {
            autoAlpha: 0,
            y: -8,
            duration: 0.14,
            stagger: 0.015,
            ease: "power2.in",
          })
          .to(
            menu,
            {
              autoAlpha: 0,
              xPercent: 2,
              duration: 0.2,
              ease: "power2.in",
            },
            "-=0.08",
          )
          .set(menu, { visibility: "hidden" });
        return;
      }

      gsap
        .timeline()
        .set(menu, { visibility: "visible" })
        .fromTo(
          menu,
          { autoAlpha: 0, xPercent: 3 },
          {
            autoAlpha: 1,
            xPercent: 0,
            duration: 0.32,
            ease: "expo.out",
          },
        )
        .fromTo(
          items,
          { autoAlpha: 0, yPercent: 32 },
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: 0.5,
            stagger: 0.045,
            ease: "expo.out",
          },
          "-=0.18",
        )
        .fromTo(
          footer,
          { autoAlpha: 0, y: 8 },
          { autoAlpha: 1, y: 0, duration: 0.28, ease: "power2.out" },
          "-=0.24",
        );
    },
    {
      dependencies: [isMenuOpen],
      scope: menuRef,
      revertOnUpdate: true,
    },
  );

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;

    const frame = window.requestAnimationFrame(() => {
      const target = document.getElementById(window.location.hash.slice(1));
      target?.scrollIntoView({ block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.isIntersecting && setActiveSection(entry.target.id)),
      { rootMargin: "-25% 0px -68% 0px" },
    );
    ["hero", "projects", "about", "experience", "contact"].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const menu = menuRef.current;
    const focusable = menu?.querySelectorAll<HTMLElement>("a, button");
    const focusTimer = window.setTimeout(() => focusable?.[0]?.focus(), 50);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();
        return;
      }
      if (event.key !== "Tab" || !focusable?.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.clearTimeout(focusTimer);
      document.removeEventListener("keydown", onKeyDown);
      triggerRef.current?.focus();
    };
  }, [closeMenu, isMenuOpen]);

  return (
    <>
      <nav aria-label={language === "es" ? "Navegación principal" : "Main navigation"} className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${isScrolled ? "border-b border-border/50 bg-background/88 backdrop-blur-xl" : "bg-transparent"}`}>
        <span
          ref={progressRef}
          aria-hidden="true"
          className="absolute inset-x-0 top-0 h-px origin-left bg-primary will-change-transform"
        />
        <div className="mx-auto flex h-[4.5rem] max-w-[100rem] items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#hero" className="inline-flex min-h-11 min-w-11 items-center font-mono text-sm font-black uppercase tracking-[-.05em]" aria-label={language === "es" ? "AV. — Alex Vicente — inicio" : "AV. — Alex Vicente — home"}>
            AV<span className="text-primary">.</span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} aria-current={activeSection === item.href.slice(1) ? "location" : undefined} className={`relative inline-flex min-h-11 items-center font-mono text-xs font-semibold uppercase tracking-[.14em] transition-colors ${activeSection === item.href.slice(1) ? "text-primary" : "text-foreground/72 hover:text-foreground"}`}>
                {item.name}
                <span
                  aria-hidden="true"
                  className={`absolute inset-x-0 bottom-0 h-px origin-left bg-primary transition-transform duration-300 ${
                    activeSection === item.href.slice(1)
                      ? "scale-x-100"
                      : "scale-x-0"
                  }`}
                />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle />
          <a href="/cv/CV_Alex_Vicente_Lopez.pdf" download className="hidden min-h-11 items-center gap-2 border border-border/70 px-3 font-mono text-[11px] font-bold uppercase tracking-[.12em] transition-colors hover:border-primary hover:text-primary sm:inline-flex">
              <FileText className="h-3.5 w-3.5" /> CV
            </a>
            <button ref={triggerRef} type="button" aria-expanded={isMenuOpen} aria-controls="mobile-navigation" aria-label={language === "es" ? "Abrir menú" : "Open menu"} onClick={() => setIsMenuOpen(true)} className="inline-flex size-11 items-center justify-center border border-border/70 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      <div ref={menuRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label={language === "es" ? "Menú" : "Menu"} aria-hidden={!isMenuOpen} className="invisible fixed inset-0 z-[60] flex min-h-[100dvh] flex-col bg-[#0b0b09] px-5 pb-7 pt-5 opacity-0 lg:hidden">
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center font-mono text-sm font-black">
            AV<span className="text-primary">.</span>
          </span>
          <button type="button" onClick={closeMenu} aria-label={language === "es" ? "Cerrar menú" : "Close menu"} className="inline-flex size-11 items-center justify-center border border-white/20">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="my-auto flex flex-col">
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} onClick={closeMenu} className="mobile-nav-item grid grid-cols-[2rem_1fr] items-baseline border-b border-white/15 py-5 text-[clamp(2.6rem,12vw,5rem)] font-black leading-none tracking-[-.06em]">
              <span className="font-mono text-[11px] font-normal tracking-normal text-primary">0{index + 1}</span>
              {item.name}
            </a>
          ))}
        </div>
        <div className="mobile-nav-footer flex items-center justify-between font-mono text-[11px] uppercase tracking-[.12em] text-white/75">
          <span>{language === "es" ? "Valencia / Remoto" : "Valencia / Remote"}</span><span>2026</span>
        </div>
      </div>
    </>
  );
}
