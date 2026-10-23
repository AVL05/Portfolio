"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, Download } from "lucide-react";
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
      if (performance.now() > 1300) return;
      gsap.from(q("[data-art-primary]"), { scale: .94, rotation: -8, duration: motion.duration.hero, ease: motion.ease.reveal });
    });
    media.add("(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const hero = containerRef.current!;
      const art = hero.querySelector("[data-art-pointer]");
      const xTo = gsap.quickTo(art, "x", { duration: .6, ease: motion.ease.out });
      const yTo = gsap.quickTo(art, "y", { duration: .6, ease: motion.ease.out });
      const rotateTo = gsap.quickTo(art, "rotation", { duration: .6, ease: motion.ease.out });
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse") return;
        const bounds = hero.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - .5;
        const y = (event.clientY - bounds.top) / bounds.height - .5;
        xTo(x * 28); yTo(y * 20); rotateTo(x * 8);
      };
      const reset = () => { xTo(0); yTo(0); rotateTo(0); };
      hero.addEventListener("pointermove", move);
      hero.addEventListener("pointerleave", reset);
      gsap.to(q("[data-art-stage]"), { y: 65, scale: .92, ease: "none", scrollTrigger: { trigger: hero, start: "top top", end: "bottom top", scrub: .5 } });
      return () => {
        hero.removeEventListener("pointermove", move);
        hero.removeEventListener("pointerleave", reset);
        xTo.tween.kill(); yTo.tween.kill(); rotateTo.tween.kill();
        gsap.set(art, { clearProps: "transform" });
      };
    });
    media.add("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      const button = containerRef.current!.querySelector<HTMLAnchorElement>("[data-magnetic]")!;
      const label = button.firstElementChild;
      const xTo = gsap.quickTo(label, "x", { duration: motion.duration.state, ease: motion.ease.out });
      const yTo = gsap.quickTo(label, "y", { duration: motion.duration.state, ease: motion.ease.out });
      const move = (event: PointerEvent) => {
        if (event.pointerType !== "mouse" || button.matches(":focus-visible")) return;
        const bounds = button.getBoundingClientRect();
        xTo(gsap.utils.clamp(-4, 4, (event.clientX - bounds.left - bounds.width / 2) * .08));
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

  return (
    <section id="hero" ref={containerRef} aria-labelledby="hero-title" className={styles.hero}>
      <div data-hero-indicator className={styles.eyebrow}>
        <div><div className={styles.name}>Alex Vicente López</div><strong>{copy.role}</strong></div>
        <span className={styles.location}>{copy.location}<br />{copy.profile}</span>
      </div>
      <div className={styles.stage}>
        <div data-art-stage className={styles.art} aria-hidden="true">
          <div className={styles.orbit} />
          <div data-art-pointer className={styles.pointer}>
            <Image data-art-primary src="/experience/chrome-form.webp" alt="" width={1000} height={1000} priority sizes="(max-width: 767px) 90vw, 50vw" />
          </div>
          <span className={styles.coordinate}>AV — 01</span>
          <div className={styles.artLabels}>{copy.artLabels.map((label, index) => <span key={label}>0{index + 1} / {label}</span>)}</div>
        </div>
        <h1 id="hero-title" data-hero-title className={styles.title}>
          {copy.lines.map((line, index) => <span key={line} className={styles.mask}><span data-hero-line className={styles.line}>{line}{index < copy.lines.length - 1 ? " " : ""}</span></span>)}
        </h1>
      </div>
      <div data-hero-summary data-hero-footer className={styles.summary}>
        <div className={styles.pitch}>
          <p data-hero-copy className={styles.description}>{copy.intro}</p>
          <a href="/cv/CV_Alex_Vicente_Lopez.pdf?v=2026-09" download data-track="cv-download" className={styles.cv}>{copy.cv}<Download aria-hidden="true" size={15} /></a>
        </div>
        <div className={styles.socials}>
          <a href="https://github.com/AVL05" target="_blank" rel="noopener noreferrer">GitHub<ArrowUpRight aria-hidden="true" size={14} /></a>
          <a href="https://www.linkedin.com/in/aleviclop/" target="_blank" rel="noopener noreferrer">LinkedIn<ArrowUpRight aria-hidden="true" size={14} /></a>
          <a className={styles.experience} href="#experience">{copy.experience}<ArrowUpRight aria-hidden="true" size={14} /></a>
        </div>
        <a data-magnetic href="#projects" className={styles.primary}><span>{copy.work}<ArrowDown aria-hidden="true" size={24} /></span></a>
      </div>
    </section>
  );
}
