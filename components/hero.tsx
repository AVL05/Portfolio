"use client";

import { CreativeRoomHero } from "./hero-3d/CreativeRoomHero";
import { ArrowDown, ArrowUpRight, FileText, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import styles from "./hero.module.css";

export function Hero() {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const [activeChapter, setActiveChapter] = useState<"monitor" | "camera" | "mountain">("monitor");
  const copy = t.hero.studio;

  useEffect(() => {
    const chapters = containerRef.current?.querySelectorAll<HTMLElement>("[data-studio-chapter]");
    const observer = new IntersectionObserver(entries => {
      const current = entries.filter(entry => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      const chapter = current?.target.getAttribute("data-studio-chapter");
      if (chapter === "monitor" || chapter === "camera" || chapter === "mountain") setActiveChapter(chapter);
    }, { rootMargin: "-20% 0px -45% 0px", threshold: [0, 0.15, 0.3, 0.5, 0.75, 1] });
    chapters?.forEach(chapter => observer.observe(chapter));
    return () => observer.disconnect();
  }, []);

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef);
    if (prefersReducedMotion()) return;
    gsap.timeline({ defaults: { ease: "expo.out" } })
      .fromTo(q(".hero-mask-line"), { yPercent: 110 }, { yPercent: 0, duration: 0.8, stagger: 0.07 })
      .fromTo(q(".hero-reveal"), { autoAlpha: 0, y: 12 }, { autoAlpha: 1, y: 0, duration: 0.5, stagger: 0.04 }, "-=0.55");
  }, { scope: containerRef });

  return <section id="hero" ref={containerRef} aria-labelledby="hero-title" className={`hero-cinema ${styles.journey}`}>
    <div className={styles.grid}>
      <div id="studio-development" data-studio-chapter="monitor" className={styles.intro}>
        <p className={`hero-reveal ${styles.status}`}><span aria-hidden="true" />{t.hero.status}</p>
        <p className={`hero-reveal ${styles.role}`}>Frontend Developer · React / Next.js</p>
        <h1 id="hero-title" aria-label="Alex Vicente" className={styles.title}>
          <span className={styles.mask}><span className="hero-mask-line">Alex</span></span>
          <span className={styles.mask}><span className="hero-mask-line">Vicente</span></span>
        </h1>
        <p className={`hero-reveal ${styles.description}`}>{t.hero.description}</p>
        <div className={`hero-reveal ${styles.actions}`}>
          <a data-cursor="project" href="#projects" className={styles.primary}>
            {language === "es" ? "Ver proyectos" : "View work"}<ArrowUpRight aria-hidden="true" size={17} />
          </a>
          <a href="/cv/CV_Alex_Vicente_Lopez.pdf" download className={styles.cv}><FileText aria-hidden="true" size={16} />CV</a>
        </div>
        <div className={`hero-reveal ${styles.socials}`}>
          <a href="https://github.com/AVL05" target="_blank" rel="noopener noreferrer" className="cinema-link"><FaGithub aria-hidden="true" />GitHub</a>
          <a href="https://www.linkedin.com/in/aleviclop/" target="_blank" rel="noopener noreferrer" className="cinema-link"><FaLinkedin aria-hidden="true" />LinkedIn</a>
          <a href="mailto:alexviclop@gmail.com" className="cinema-link"><Mail aria-hidden="true" size={15} />{language === "es" ? "Contacto" : "Contact"}</a>
        </div>
      </div>

      <div className={styles.sceneColumn}>
        <CreativeRoomHero activeHotspot={activeChapter} />
        <nav className={styles.chapterNav} aria-label={copy.navigation}>
          {[
            { id: "studio-development", hotspot: "monitor", label: copy.development },
            { id: "studio-photography", hotspot: "camera", label: copy.photography },
            { id: "studio-perspective", hotspot: "mountain", label: copy.perspective },
          ].map((chapter, index) => <a key={chapter.id} href={`#${chapter.id}`} aria-current={activeChapter === chapter.hotspot ? "step" : undefined}>
            <span aria-hidden="true">0{index + 1}</span>{chapter.label}
          </a>)}
        </nav>
      </div>

      <article id="studio-photography" data-studio-chapter="camera" className={styles.chapter}>
        <p className={styles.kicker}>02 / {copy.photography}</p>
        <h2>{copy.photoTitle}</h2>
        <p className={styles.description}>{copy.photoDescription}</p>
        <a className={styles.chapterLink} href="/fotografia">{copy.photoLink}<ArrowUpRight aria-hidden="true" size={17} /></a>
      </article>
      <article id="studio-perspective" data-studio-chapter="mountain" className={styles.chapter}>
        <p className={styles.kicker}>03 / {copy.perspective}</p>
        <h2>{copy.perspectiveTitle}</h2>
        <p className={styles.description}>{copy.perspectiveDescription}</p>
        <a className={styles.chapterLink} href="/sobre-mi">{copy.perspectiveLink}<ArrowUpRight aria-hidden="true" size={17} /></a>
      </article>
    </div>
    <a href="#projects" className={styles.continue}><span>{copy.continue}</span><ArrowDown aria-hidden="true" size={18} /></a>
  </section>;
}
