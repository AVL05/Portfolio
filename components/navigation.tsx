"use client";

import { Button } from "@/components/ui/button";
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const containerRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuItemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const navLinksContainerRef = useRef<HTMLDivElement>(null);
  const navLinksRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  const { contextSafe } = useGSAP(
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

  useGSAP(
    () => {
      if (!mobileMenuRef.current) return;

      gsap.killTweensOf([mobileMenuRef.current, mobileMenuItemsRef.current]);

      if (prefersReducedMotion()) {
        gsap.set(mobileMenuRef.current, { opacity: 1, rotateY: 0 });
        gsap.set(mobileMenuItemsRef.current.filter(Boolean), {
          opacity: 1,
          rotateX: 0,
          z: 0,
        });
        return;
      }

      if (isMobileMenuOpen) {
        gsap.set(mobileMenuRef.current, {
          rotateY: -90,
          opacity: 0,
          transformPerspective: 1200,
          transformOrigin: "right center",
        });
        gsap.to(mobileMenuRef.current, {
          rotateY: 0,
          opacity: 1,
          duration: 0.6,
          ease: "power3.out",
        });
        gsap.fromTo(
          mobileMenuItemsRef.current.filter(Boolean),
          { opacity: 0, rotateX: 30, z: -30, transformPerspective: 800 },
          {
            opacity: 1,
            rotateX: 0,
            z: 0,
            stagger: 0.08,
            duration: 0.5,
            ease: "power2.out",
            delay: 0.2,
          },
        );
      }
    },
    {
      dependencies: [isMobileMenuOpen],
      scope: containerRef,
      revertOnUpdate: true,
    },
  );

  const indicatorRef = useRef<HTMLDivElement>(null);

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

  // 3. Efficient Indicator Movement (GSAP instead of React State)
  useGSAP(() => {
    const activeIndex = navItems.findIndex(
      (item) => item.href.substring(1) === activeSection,
    );
    const activeLink = navLinksRefs.current[activeIndex];
    const indicator = indicatorRef.current;

    if (activeLink && indicator && navLinksContainerRef.current) {
      const containerRect =
        navLinksContainerRef.current.getBoundingClientRect();
      const linkRect = activeLink.getBoundingClientRect();

      gsap.to(indicator, {
        x: linkRect.left - containerRect.left,
        width: linkRect.width,
        duration: prefersReducedMotion() ? 0 : 0.5,
        ease: "power3.out",
        overwrite: "auto",
      });
    }
  }, [activeSection]);

  const handleMobileNavClick = contextSafe((href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element, offsetY: 80 },
        duration: prefersReducedMotion() ? 0 : 1.2,
        ease: "power3.inOut",
      });
    }
  });

  return (
    <div ref={containerRef}>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-90 transition-all duration-500 ${
          isScrolled
            ? "py-4 bg-background/90 backdrop-blur-md border-b border-border"
            : "py-8 bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            <a
              href="#hero"
              className="nav-logo group text-xl sm:text-2xl font-black text-foreground tracking-tighter transition-all lg:whitespace-nowrap shrink-0"
            >
              ALEX <span className="text-primary">VICENTE</span>
            </a>

            <div
              ref={navLinksContainerRef}
              className="hidden xl:flex items-center gap-6 relative"
            >
              <div
                ref={indicatorRef}
                className="absolute bottom-[-4px] h-[2px] bg-primary"
              />
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1);
                return (
                  <a
                    key={item.name}
                    ref={(el) => {
                      navLinksRefs.current[index] = el;
                    }}
                    href={item.href}
                    className={`nav-item group relative text-[10px] font-black uppercase tracking-[0.15em] transition-colors duration-300 whitespace-nowrap ${
                      isActive
                        ? "text-primary"
                        : "text-foreground/40 hover:text-foreground"
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
              <Button
                variant="ghost"
                size="icon"
                aria-label={isMobileMenuOpen ? "Cerrar menú" : "Abrir menú"}
                className="text-foreground hover:bg-foreground/5 p-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-background z-80 xl:hidden flex flex-col items-center justify-center space-y-8"
          >
            {navItems.map((item, index) => (
              <a
                key={item.name}
                ref={(el) => {
                  mobileMenuItemsRef.current[index] = el;
                }}
                href={item.href}
                className="text-4xl sm:text-5xl font-black text-foreground hover:text-primary transition-all tracking-tighter"
                onClick={(e) => {
                  e.preventDefault();
                  handleMobileNavClick(item.href);
                }}
              >
                {item.name}
              </a>
            ))}
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-8 right-8 text-foreground scale-150"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="h-8 w-8" />
            </Button>
          </div>
        )}
      </nav>
    </div>
  );
}
