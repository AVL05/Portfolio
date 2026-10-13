"use client";

import Image from "next/image";
import { ArrowUpRight, Download } from "lucide-react";
import { useRef } from "react";
import { gsap, motion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import styles from "./hero.module.css";

export function Hero() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const copy = t.hero;

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      // Keep professional copy painted; entrance transforms only the artwork.
      if (performance.now() > 1300) return;
      gsap.timeline({ defaults: { ease: motion.ease.out } })
        .from(q("[data-art-lines]"), { scale: .96, duration: .9 })
        .from(q("[data-art-primary]"), { y: 28, rotation: -2, duration: .85 }, .05)
        .from(q("[data-art-secondary]"), { y: 20, rotation: 0, duration: .75 }, .15)
        .from(q("[data-hero-title]"), { y: 18, duration: .8 }, .08);
    });
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      gsap.to(q("[data-art-stage]"), {
        y: -18, ease: "none",
        scrollTrigger: { trigger: containerRef.current, start: "top top", end: "bottom top", scrub: .4 },
      });
    });
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const cleanups = Array.from(containerRef.current?.querySelectorAll<HTMLAnchorElement>("[data-magnetic]") ?? []).map((button) => {
        const label = button.firstElementChild;
        const xTo = gsap.quickTo(label, "x", { duration: motion.duration.state, ease: motion.ease.out });
        const yTo = gsap.quickTo(label, "y", { duration: motion.duration.state, ease: motion.ease.out });
        const move = (event: PointerEvent) => {
          if (event.pointerType !== "mouse" || button.matches(":focus-visible")) return;
          const rect = button.getBoundingClientRect();
          xTo(gsap.utils.clamp(-4, 4, (event.clientX - rect.left - rect.width / 2) * .08));
          yTo(gsap.utils.clamp(-3, 3, (event.clientY - rect.top - rect.height / 2) * .08));
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
      return () => cleanups.forEach((cleanup) => cleanup());
    });
    return () => media.revert();
  }, { scope: containerRef });

  return (
    <section id="hero" ref={containerRef} aria-labelledby="hero-title" className={styles.hero}>
      <div data-hero-indicator className={styles.eyebrow}>
        <div><div className={styles.name}>Alex Vicente López</div><strong>{copy.role}</strong></div>
        <span className={styles.location}>{copy.location}<br />{copy.profile}</span>
      </div>
      <h1 id="hero-title" data-hero-title className={styles.title}>
        {copy.lines.map((line, index) => (
          <span key={line} className={styles.mask}><span data-hero-line className={styles.line}>{line}{index < copy.lines.length - 1 ? " " : ""}</span></span>
        ))}
      </h1>
      <div data-art-stage className={styles.art} aria-hidden="true">
        <div className={styles.grid} />
        <svg data-art-lines className={styles.diagram} viewBox="0 0 900 650">
          <path d="M50 560 270 60 490 560M135 370H405M470 60 650 560 830 60" />
          <path className={styles.connection} d="M80 480H250V270H710V510H520V590" />
          <circle cx="250" cy="270" r="7" /><circle cx="710" cy="510" r="7" /><circle cx="520" cy="590" r="7" />
        </svg>
        <figure data-art-primary className={`${styles.artifact} ${styles.product}`}>
          <Image src="/projects/lumaflow-studio-ai.webp" alt="" loading="eager" width={1600} height={1000} sizes="(max-width: 767px) 65vw, 40vw" />
          <figcaption>LumaFlow / {t.projects.items[1].imageCaption}</figcaption>
        </figure>
        <figure data-art-secondary className={`${styles.artifact} ${styles.restaurant}`}>
          <Image src="/projects/distrito_gourmet/distrito-gourmet.png" alt="" loading="eager" width={1600} height={1000} sizes="(max-width: 767px) 42vw, 25vw" />
          <figcaption>Distrito / {t.projects.items[0].type}</figcaption>
        </figure>
        {copy.artLabels.map((label, index) => <span key={label} className={`${styles.tag} ${styles[`tag${index}`]}`}>0{index + 1} / {label}</span>)}
      </div>
      <div data-hero-summary data-hero-footer className={styles.summary}>
        <div className={styles.pitch}>
          <p data-hero-copy className={styles.description}>{copy.intro}</p>
          <div className={styles.socials}>
            <a href="/cv/CV_Alex_Vicente_Lopez.pdf?v=2026-09" download data-track="cv-download" className={styles.cv}>{copy.cv}<Download aria-hidden="true" size={16} /></a>
            <a href="https://github.com/AVL05" target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight aria-hidden="true" size={13} /></a>
            <a href="https://www.linkedin.com/in/aleviclop/" target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight aria-hidden="true" size={13} /></a>
          </div>
          <a className={styles.experience} href="#experience">{copy.experience}<ArrowUpRight aria-hidden="true" size={14} /></a>
        </div>
        <a data-magnetic href="#projects" className={styles.primary}><span>{copy.work}<ArrowUpRight aria-hidden="true" size={18} /></span></a>
      </div>
    </section>
  );
}
