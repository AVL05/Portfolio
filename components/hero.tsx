"use client";

import { CreativeRoomHero } from "./hero-3d/CreativeRoomHero";
import { ArrowDown, ArrowUpRight, FileText } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import { localizeHref } from "@/lib/i18n-paths";
import styles from "./hero.module.css";
import { roomHotspots, type RoomHotspotId } from "./hero-3d/roomSceneConfig";

export function Hero() {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const [activeHotspot, setActiveHotspot] = useState<RoomHotspotId>("monitor");
  const copy = t.hero.studio;

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.timeline({ defaults: { ease: "expo.out" } })
        .fromTo(q(".hero-mask-line"), { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.07 })
        .fromTo(q(".hero-reveal"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.04 }, "-=0.55");
    });
    return () => media.revert();
  }, { scope: containerRef });

  return <section id="hero" ref={containerRef} aria-labelledby="hero-title" className={`hero-cinema ${styles.journey}`}>
    <div className={styles.grid}>
      <div className={styles.intro}>
        <p className={`hero-reveal ${styles.status}`}><span aria-hidden="true" />{t.hero.status}</p>
        <h1 id="hero-title" aria-label="Alex Vicente" className={styles.title}>
          <span className={styles.mask}><span className="hero-mask-line">Alex</span></span>
          <span className={styles.mask}><span className="hero-mask-line">Vicente</span></span>
        </h1>
        <p className={`hero-reveal ${styles.role}`}>{language === "es" ? "Desarrollador Full-Stack Junior" : "Junior Full-Stack Developer"}</p>
        <p className={`hero-reveal ${styles.description}`}>{t.hero.description}</p>
        <div className={`hero-reveal ${styles.actions}`}>
          <a data-cursor="project" href="#projects" className={styles.primary}>
            {language === "es" ? "Ver proyectos" : "View work"}<ArrowUpRight aria-hidden="true" size={17} />
          </a>
          <a href="#contact" className={styles.cv}>{language === "es" ? "Contactar" : "Get in touch"}<ArrowUpRight aria-hidden="true" size={16} /></a>
        </div>
        <div className={`hero-reveal ${styles.socials}`}>
          <a href="https://github.com/AVL05" target="_blank" rel="noopener noreferrer" className="cinema-link"><FaGithub aria-hidden="true" />GitHub</a>
          <a href="https://www.linkedin.com/in/aleviclop/" target="_blank" rel="noopener noreferrer" className="cinema-link"><FaLinkedin aria-hidden="true" />LinkedIn</a>
          <a href="/cv/CV_Alex_Vicente_Lopez.pdf?v=2026-09" download data-track="cv-download" className="cinema-link"><FileText aria-hidden="true" size={15} />CV</a>
        </div>
      </div>

      <div className={styles.sceneColumn}>
        <CreativeRoomHero activeHotspot={activeHotspot} />
        <nav className={styles.chapterNav} aria-label={copy.navigation}>
          {(Object.keys(roomHotspots) as RoomHotspotId[]).map((id) => <a key={id} href={localizeHref(roomHotspots[id].href, language)}
            onMouseEnter={() => setActiveHotspot(id)} onFocus={() => setActiveHotspot(id)}>
            {copy.destinations[id]}
          </a>)}
        </nav>
      </div>

    </div>
    <a href="#projects" className={styles.continue}><span>{copy.continue}</span><ArrowDown aria-hidden="true" size={18} /></a>
  </section>;
}
