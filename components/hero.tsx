"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
import { useRef, useState } from "react";
import { gsap, motion, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage, type ProjectItem } from "@/lib/language-context";
import { FEATURED_INDEXES, FEATURED_MEDIA, claimViewTransition } from "@/lib/featured-work";
import styles from "./hero.module.css";

const CV_HREF = "/cv/CV_Alex_Vicente_Lopez.pdf?v=2026-09";
const pad = (value: number) => String(value).padStart(2, "0");

export function Hero() {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const plateRef = useRef<HTMLDivElement>(null);
  const activeRef = useRef(0);
  const [active, setActive] = useState(0);
  const copy = t.hero;
  const featured = FEATURED_INDEXES
    .map((index) => t.projects.items[index])
    .filter((project): project is ProjectItem => Boolean(project));

  // Signature interaction: the plate wipes to the project under the pointer
  // or keyboard focus. The row link stays the only interactive element.
  const { contextSafe } = useGSAP(() => {
    const q = gsap.utils.selector(containerRef);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // Hydration after the first paint keeps the server-rendered state.
      if (performance.now() > 1300) return;
      const timeline = gsap.timeline({ defaults: { ease: motion.ease.reveal } });
      timeline
        .from(q("[data-hero-line]"), { yPercent: 108, duration: motion.duration.hero, stagger: .08, clearProps: "transform" })
        .from(q("[data-hero-plate]"), { clipPath: "inset(0 0 0 100%)", duration: .9, clearProps: "clipPath" }, .15)
        .from(q("[data-hero-row]"), { y: motion.distance.content, autoAlpha: 0, duration: motion.duration.enter, stagger: .06, ease: motion.ease.out, clearProps: "transform,opacity,visibility" }, .3);
    });
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const button = containerRef.current?.querySelector<HTMLAnchorElement>("[data-magnetic]");
      const label = button?.firstElementChild;
      if (!button || !label) return;
      const xTo = gsap.quickTo(label, "x", { duration: motion.duration.state, ease: motion.ease.out });
      const yTo = gsap.quickTo(label, "y", { duration: motion.duration.state, ease: motion.ease.out });
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || button.matches(":focus-visible")) return;
        const bounds = button.getBoundingClientRect();
        xTo(gsap.utils.clamp(-4, 4, (event.clientX - bounds.left - bounds.width / 2) * .06));
        yTo(gsap.utils.clamp(-3, 3, (event.clientY - bounds.top - bounds.height / 2) * .08));
      };
      const reset = () => { xTo(0); yTo(0); };
      button.addEventListener("pointermove", move);
      button.addEventListener("pointerleave", reset);
      button.addEventListener("focus", reset);
      return () => {
        button.removeEventListener("pointermove", move);
        button.removeEventListener("pointerleave", reset);
        button.removeEventListener("focus", reset);
        xTo.tween.kill(); yTo.tween.kill();
        gsap.set(label, { clearProps: "transform" });
      };
    });
    return () => media.revert();
  }, { scope: containerRef });

  const activate = contextSafe((index: number) => {
    if (index === activeRef.current) return;
    activeRef.current = index;
    setActive(index);
    const layer = plateRef.current?.querySelector<HTMLElement>(`[data-plate-layer="${index}"]`);
    if (!layer) return;
    gsap.killTweensOf(layer);
    if (prefersReducedMotion()) {
      gsap.set(layer, { clipPath: "inset(0 0 0 0%)" });
      return;
    }
    const image = layer.querySelector("img");
    gsap.timeline()
      .fromTo(layer, { clipPath: "inset(0 0 0 100%)" }, { clipPath: "inset(0 0 0 0%)", duration: motion.duration.mask, ease: motion.ease.reveal })
      .fromTo(image, { scale: 1.06 }, { scale: 1, duration: .9, ease: motion.ease.reveal, clearProps: "transform" }, 0);
  });

  const activeProject = featured[active];
  const activeMedia = FEATURED_MEDIA[active];

  return (
    <section id="hero" ref={containerRef} aria-labelledby="hero-title" className={styles.hero}>
      <div className={styles.frame}>
        <h1 id="hero-title" data-hero-title className={styles.title}>
          <span className={styles.mask}><span data-hero-line className={styles.line}>Alex Vicente</span>{" "}</span>
          <span className={styles.mask}><span data-hero-line className={styles.line}>López<span className={styles.comma}>,</span></span>{" "}</span>
          <span className={styles.mask}><span data-hero-line className={`${styles.line} ${styles.role}`}>{copy.role}</span></span>
        </h1>

        <div data-hero-summary data-hero-footer className={styles.summary}>
          <p data-hero-indicator className={styles.meta}>
            <span>{copy.location}</span>
            <span className={styles.metaRule} aria-hidden="true" />
            <span>{copy.artLabels.join(" · ")}</span>
          </p>
          <p data-hero-copy className={styles.description}>{copy.intro}</p>
          <div className={styles.actions}>
            <a data-magnetic href="#projects" className={`action-primary ${styles.primary}`}>
              <span>{copy.work}<ArrowDown aria-hidden="true" /></span>
            </a>
            <a href={CV_HREF} download data-track="cv-download" className="action-secondary">
              {copy.cv}<Download aria-hidden="true" />
            </a>
          </div>
          <ul className={styles.links} aria-label={language === "es" ? "Perfil y contacto" : "Profile and contact"}>
            <li><a className="cinema-link" href="#contact">{copy.contact}<ArrowUpRight aria-hidden="true" /></a></li>
            <li><a className="cinema-link" href="#experience">{copy.experience}<ArrowUpRight aria-hidden="true" /></a></li>
            <li><a className="cinema-link" href="https://github.com/AVL05" target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight aria-hidden="true" /></a></li>
            <li><a className="cinema-link" href="https://www.linkedin.com/in/aleviclop/" target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight aria-hidden="true" /></a></li>
          </ul>
        </div>

        <nav className={styles.index} aria-labelledby="hero-index-title">
          <div className={styles.indexHead}>
            <h2 id="hero-index-title" className="label-mono">{copy.index} <span aria-hidden="true">({pad(featured.length)})</span></h2>
            <p>{copy.indexHint}</p>
          </div>
          <ol>
            {featured.map((project, index) => {
              const media = FEATURED_MEDIA[index];
              return <li key={project.title} data-hero-row>
                <a href={project.caseStudyHref} data-active={active === index}
                  onPointerEnter={(event) => { if (event.pointerType === "mouse") activate(index); }}
                  onFocus={() => activate(index)}
                  onClick={() => claimViewTransition(plateRef.current?.querySelector<HTMLElement>(`[data-plate-layer="${index}"]`) ?? null, media.slug)}>
                  <span className={styles.rowNumber} aria-hidden="true">{pad(index + 1)}</span>
                  <span className={styles.rowTitle}>{project.title}</span>
                  <span className={styles.rowMeta}>
                    <span>{project.type}</span>
                    <span>{project.technologies.slice(0, 3).join(" · ")}</span>
                  </span>
                  <span className={styles.rowThumb} aria-hidden="true">
                    <Image src={media.plate} alt="" fill sizes="7rem" loading="lazy" />
                  </span>
                  <ArrowUpRight aria-hidden="true" className={styles.rowArrow} />
                </a>
              </li>;
            })}
          </ol>
        </nav>

        <figure className={styles.plateFigure} aria-hidden="true">
          <div ref={plateRef} data-hero-plate data-art-stage className={styles.plate} data-tone={activeMedia.tone}>
            {FEATURED_MEDIA.map((media, index) => (
              <div key={media.slug} data-plate-layer={index} className={styles.plateLayer}
                data-tone={media.tone} style={{ zIndex: index === active ? 2 : 1, clipPath: index === 0 ? undefined : "inset(0 0 0 100%)" }}>
                <Image src={media.plate} alt="" fill priority={index === 0} loading={index === 0 ? undefined : "lazy"}
                  sizes="(max-width: 1023px) 1px, 56vw" />
              </div>
            ))}
          </div>
          <figcaption className={styles.plateCaption}>
            <span>{pad(active + 1)} / {pad(featured.length)}</span>
            <span>{activeProject?.title} — {activeProject?.summary}</span>
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
