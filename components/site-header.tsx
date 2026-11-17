"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { CommandPalette, OPEN_PALETTE_EVENT } from "@/components/command-palette";
import { LanguageToggle } from "@/components/language-toggle";
import { ThemeToggle } from "@/components/theme-toggle";
import { useLanguage } from "@/lib/language-context";
import { CV_HREF } from "@/lib/site";
import styles from "./site-header.module.css";

// Sections that do not have their own nav link highlight the closest one.
const NAV_TARGET: Record<string, string> = {
  hero: "hero",
  about: "about",
  experience: "experience",
  education: "experience",
  projects: "projects",
  skills: "projects",
  contact: "contact",
};

export function SiteHeader() {
  const { language, t } = useLanguage();
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const es = language === "es";
  const navItems = [
    { name: t.nav.about, href: "#about" },
    { name: t.nav.experience, href: "#experience" },
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.contact, href: "#contact" },
  ];
  const closeMenu = () => menuRef.current?.close();

  // Scroll spy by position: the current section is the last one whose top has
  // reached the line under the sticky header. Robust for short sections, unlike an observer band.
  useEffect(() => {
    const sections = Object.keys(NAV_TARGET)
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = 96; // just below the sticky header, where an anchor jump lands
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      let current = sections[0];
      for (const section of sections) if (section.getBoundingClientRect().top <= line) current = section;
      if (atBottom) current = sections[sections.length - 1];
      if (current) setActiveSection(NAV_TARGET[current.id] ?? current.id);
    };
    const onScroll = () => { if (!frame) frame = window.requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const wide = window.matchMedia("(min-width: 48rem)");
    const onChange = () => { if (wide.matches) menuRef.current?.close(); };
    wide.addEventListener("change", onChange);
    return () => {
      document.body.style.overflow = previousOverflow;
      wide.removeEventListener("change", onChange);
    };
  }, [isMenuOpen]);

  const wordmark = <>aleviclop<span aria-hidden="true">.dev</span></>;

  return (
    <>
      <header className={styles.header}>
        <nav aria-label={es ? "Navegación principal" : "Main navigation"} className={styles.bar}>
          <a href="#hero" className={styles.wordmark} aria-label={es ? "aleviclop.dev, inicio" : "aleviclop.dev, home"}>{wordmark}</a>
          <div className={styles.links}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} aria-current={activeSection === item.href.slice(1) ? "location" : undefined}>{item.name}</a>
            ))}
          </div>
          <div className={styles.controls}>
            <CommandPalette triggerClassName={`${styles.iconButton} ${styles.paletteButton}`} />
            <ThemeToggle className={styles.iconButton} />
            <LanguageToggle />
            <button data-menu-trigger ref={triggerRef} type="button" aria-expanded={isMenuOpen} aria-controls="mobile-navigation" aria-haspopup="dialog"
              aria-label={es ? "Abrir menú" : "Open menu"} className={`${styles.iconButton} ${styles.menuButton}`}
              onClick={() => { menuRef.current?.showModal(); setIsMenuOpen(true); }}>
              <Menu aria-hidden="true" size={18} />
            </button>
          </div>
        </nav>
      </header>
      <dialog ref={menuRef} id="mobile-navigation" aria-label={es ? "Menú" : "Menu"} className={styles.menu}
        onClose={() => { setIsMenuOpen(false); triggerRef.current?.focus(); }}>
        <div className={styles.menuHeader}>
          <span className={styles.wordmark}>{wordmark}</span>
          <button type="button" onClick={closeMenu} aria-label={es ? "Cerrar menú" : "Close menu"} className={styles.iconButton}><X aria-hidden="true" size={18} /></button>
        </div>
        <nav className={styles.menuLinks} aria-label={es ? "Navegación móvil" : "Mobile navigation"}>
          {navItems.map((item, index) => (
            <a key={item.href} href={item.href} aria-current={activeSection === item.href.slice(1) ? "location" : undefined} onClick={closeMenu}>
              <span aria-hidden="true">0{index + 1}</span>{item.name}
            </a>
          ))}
        </nav>
        <div className={styles.menuFooter}>
          <button type="button" className={styles.menuAction}
            onClick={() => { closeMenu(); window.setTimeout(() => window.dispatchEvent(new Event(OPEN_PALETTE_EVENT)), 50); }}>
            {es ? "Buscar y comandos" : "Search & commands"}
          </button>
          <a href={CV_HREF} download data-track="cv-download">{t.hero.cv}</a>
          <span>{t.hero.location}</span>
        </div>
      </dialog>
      <noscript>
        <style>{"[data-menu-trigger] { display: none; }"}</style>
        <nav className={styles.fallback} aria-label={es ? "Navegación móvil" : "Mobile navigation"}>
          {navItems.map((item) => <a key={item.href} href={item.href}>{item.name}</a>)}
        </nav>
      </noscript>
    </>
  );
}
