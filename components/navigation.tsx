"use client";

import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { LanguageToggle } from "@/components/language-toggle";
import { gsap, motion, useGSAP } from "@/lib/gsap";
import styles from "./navigation.module.css";

export function Navigation() {
  const { language, t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navItems = [
    { name: t.nav.projects, href: "#projects" },
    { name: t.nav.about, href: "#experience" },
    { name: t.nav.contact, href: "#contact" },
  ];
  const closeMenu = () => menuRef.current?.close();

  useGSAP(() => {
    if (!isMenuOpen) return;
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(menuRef.current?.querySelectorAll("[data-menu-link]") ?? [], {
        y: motion.distance.small, duration: motion.duration.state, stagger: motion.stagger.content, ease: motion.ease.out,
      });
    });
    return () => media.revert();
  }, { dependencies: [isMenuOpen], scope: menuRef, revertOnUpdate: true });

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!window.location.hash) return;
    const frame = window.requestAnimationFrame(() => {
      document.getElementById(window.location.hash.slice(1))?.scrollIntoView({ block: "start" });
    });
    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(["about", "experience", "photography", "currently"].includes(entry.target.id) ? "experience" : entry.target.id);
      }),
      { rootMargin: "-25% 0px -68% 0px" },
    );
    ["hero", "projects", "about", "experience", "photography", "currently", "contact"].forEach((id) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isMenuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onResize = () => { if (desktop.matches) menuRef.current?.close(); };
    desktop.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", onResize);
    };
  }, [isMenuOpen]);

  return (
    <>
      <header className={`${styles.header} ${isScrolled ? styles.scrolled : ""}`}>
        <nav aria-label={language === "es" ? "Navegación principal" : "Main navigation"} className={styles.bar}>
          <a href="#hero" className={styles.logo} aria-label={language === "es" ? "AV — Alex Vicente — inicio" : "AV — Alex Vicente — home"}>
            AV<span aria-hidden="true">.</span>
          </a>
          <div className={styles.desktopLinks}>
            {navItems.map((item) => (
              <a key={item.href} href={item.href} aria-current={activeSection === item.href.slice(1) ? "location" : undefined}>{item.name}</a>
            ))}
          </div>
          <div className={styles.controls}>
            <LanguageToggle />
            <button data-menu-trigger ref={triggerRef} type="button" aria-expanded={isMenuOpen} aria-controls="mobile-navigation" aria-haspopup="dialog" aria-label={language === "es" ? "Abrir menú" : "Open menu"}
              onClick={() => { menuRef.current?.showModal(); setIsMenuOpen(true); }} className={styles.menuButton}>
              <Menu aria-hidden="true" size={20} />
            </button>
          </div>
        </nav>
        <div aria-hidden="true" className={styles.progress} />
      </header>
      <dialog ref={menuRef} id="mobile-navigation" aria-label={language === "es" ? "Menú" : "Menu"} className={styles.menu}
        onClose={() => { setIsMenuOpen(false); triggerRef.current?.focus(); }}>
        <div className={styles.menuHeader}>
          <span className={styles.logo}>AV<span aria-hidden="true">.</span></span>
          <button type="button" onClick={closeMenu} aria-label={language === "es" ? "Cerrar menú" : "Close menu"} className={styles.closeButton}><X aria-hidden="true" size={22} /></button>
        </div>
        <nav className={styles.menuLinks} aria-label={language === "es" ? "Navegación móvil" : "Mobile navigation"}>
          {navItems.map((item, index) => (
            <a data-menu-link key={item.href} href={item.href} aria-current={activeSection === item.href.slice(1) ? "location" : undefined} onClick={closeMenu}><span aria-hidden="true">0{index + 1}</span>{item.name}</a>
          ))}
        </nav>
        <div className={styles.menuFooter}>
          <a href="#about" onClick={closeMenu}>{t.nav.skills}</a>
          <a href="/cv/CV_Alex_Vicente_Lopez.pdf?v=2026-09" download data-track="cv-download">{t.hero.cv}</a>
          <span>{t.hero.location}</span>
        </div>
      </dialog>
      <noscript><style>{"[data-menu-trigger] { display: none; }"}</style><nav className={styles.fallback} aria-label={language === "es" ? "Navegación móvil" : "Mobile navigation"}>
        {navItems.map((item) => <a key={item.href} href={item.href}>{item.name}</a>)}
      </nav></noscript>
    </>
  );
}
