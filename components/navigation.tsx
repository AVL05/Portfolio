"use client";

import { FileText, Menu, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { LanguageToggle } from "@/components/language-toggle";

export function Navigation() {
  const { language } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  const navItems = [
    { name: language === "es" ? "Proyectos" : "Work", href: "#projects" },
    { name: language === "es" ? "Sobre mí" : "About", href: "#about" },
    { name: language === "es" ? "Experiencia" : "Experience", href: "#experience" },
    { name: language === "es" ? "Contacto" : "Contact", href: "#contact" },
  ];
  const closeMenu = useCallback(() => setIsMenuOpen(false), []);

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
        <div className="mx-auto flex h-[4.5rem] max-w-[100rem] items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#hero" className="inline-flex min-h-11 min-w-11 items-center font-mono text-sm font-black uppercase tracking-[-.05em]" aria-label={language === "es" ? "AV. — Alex Vicente — inicio" : "AV. — Alex Vicente — home"}>
            AV<span className="text-primary">.</span>
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} aria-current={activeSection === item.href.slice(1) ? "location" : undefined} className={`relative py-2 font-mono text-[11px] font-semibold uppercase tracking-[.16em] transition-colors ${activeSection === item.href.slice(1) ? "text-primary" : "text-foreground/62 hover:text-foreground"}`}>
                {item.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <LanguageToggle />
            <a href="/cv/CV_Alex_Vicente_Lopez_Frontend_React_A4.pdf" download className="hidden min-h-9 items-center gap-2 border border-border/70 px-3 font-mono text-[10px] font-bold uppercase tracking-[.14em] transition-colors hover:border-primary hover:text-primary sm:inline-flex">
              <FileText className="h-3.5 w-3.5" /> CV
            </a>
            <button ref={triggerRef} type="button" aria-expanded={isMenuOpen} aria-controls="mobile-navigation" aria-label={language === "es" ? "Abrir menú" : "Open menu"} onClick={() => setIsMenuOpen(true)} className="inline-flex size-11 items-center justify-center border border-border/70 lg:hidden">
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </nav>

      <div ref={menuRef} id="mobile-navigation" role="dialog" aria-modal="true" aria-label={language === "es" ? "Menú" : "Menu"} aria-hidden={!isMenuOpen} className={`fixed inset-0 z-[60] flex min-h-[100dvh] flex-col bg-[#0b0b09] px-5 pb-7 pt-5 transition-[opacity,visibility] duration-300 lg:hidden ${isMenuOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
        <div className="flex items-center justify-between">
          <span className="font-mono text-sm font-black">AV<span className="text-primary">.</span></span>
          <button type="button" onClick={closeMenu} aria-label={language === "es" ? "Cerrar menú" : "Close menu"} className="inline-flex size-11 items-center justify-center border border-white/20">
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="my-auto flex flex-col">
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} onClick={closeMenu} className="grid grid-cols-[2rem_1fr] items-baseline border-b border-white/15 py-5 text-[clamp(2.6rem,12vw,5rem)] font-black leading-none tracking-[-.06em]">
              <span className="font-mono text-[9px] font-normal tracking-normal text-primary">0{index + 1}</span>
              {item.name}
            </a>
          ))}
        </div>
        <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[.16em] text-white/55">
          <span>{language === "es" ? "Valencia / Remoto" : "Valencia / Remote"}</span><span>2026</span>
        </div>
      </div>
    </>
  );
}
