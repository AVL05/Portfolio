"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

interface RevealHeaderProps {
  title: string;
  subtitle: string;
  description?: string;
  className?: string;
}

export function RevealHeader({
  title,
  subtitle,
  description,
  className = "",
}: RevealHeaderProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(ref);
      const words = q(".rh-word");

      if (prefersReducedMotion()) {
        gsap.set([words, q(".rh-kicker-line"), q(".rh-kicker-text"), q(".rh-desc")], {
          autoAlpha: 1, y: 0, scaleX: 1,
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: { trigger: ref.current, start: "top 82%", once: true },
      });

      tl.fromTo(
        q(".rh-kicker-line"),
        { scaleX: 0 },
        { scaleX: 1, duration: 0.7, ease: "power3.out", transformOrigin: "left" },
      )
        .fromTo(
          q(".rh-kicker-text"),
          { autoAlpha: 0, x: -10 },
          { autoAlpha: 1, x: 0, duration: 0.5 },
          "-=0.45",
        )
        .fromTo(
          words,
          { yPercent: 115, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.95, ease: "expo.out", stagger: 0.08 },
          "-=0.35",
        )
        .fromTo(
          q(".rh-desc"),
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.7, ease: "power3.out" },
          "-=0.6",
        );
    },
    { scope: ref },
  );

  return (
    <header ref={ref} className={`mb-14 space-y-5 sm:mb-18 ${className}`}>
      <div className="flex items-center gap-4 font-mono text-xs font-black uppercase tracking-[0.2em] text-primary sm:text-sm sm:tracking-[0.24em]">
        <span className="rh-kicker-line h-px w-10 bg-primary/60" />
        <span className="rh-kicker-text">{title}</span>
      </div>
      <h2
        className="max-w-5xl pb-2 text-4xl font-black leading-[0.98] tracking-normal text-foreground sm:text-6xl lg:text-7xl"
        aria-label={subtitle}
      >
        {subtitle.split(" ").map((word, i) => (
          <span
            key={i}
            className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom"
          >
            <span className="rh-word inline-block">{word}</span>
          </span>
        ))}
      </h2>
      {description && (
        <p className="rh-desc max-w-2xl text-balance text-base font-medium leading-relaxed text-muted-foreground sm:text-xl">
          {description}
        </p>
      )}
    </header>
  );
}
