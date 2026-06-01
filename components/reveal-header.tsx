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
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const chars = q(".header-subtitle .char");

      if (prefersReducedMotion()) {
        gsap.set([q(".header-line"), chars, q(".header-description")], {
          autoAlpha: 1,
          x: 0,
          y: 0,
        });
        return;
      }

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 85%",
        },
      });

      tl.fromTo(
        q(".header-line"),
        { autoAlpha: 0, x: -10 },
        {
          autoAlpha: 1,
          x: 0,
          immediateRender: false,
          duration: 0.5,
          ease: "power2.out",
        },
      ).fromTo(
        chars,
        {
          autoAlpha: 0,
          y: 12,
        },
        {
          autoAlpha: 1,
          y: 0,
          immediateRender: false,
          stagger: 0.02,
          duration: 0.56,
          ease: "expo.out",
        },
        "-=0.3",
      );

      if (description) {
        tl.fromTo(
          q(".header-description"),
          { autoAlpha: 0, y: 14 },
          {
            autoAlpha: 1,
            y: 0,
            immediateRender: false,
            duration: 0.6,
            ease: "power2.out",
          },
          "-=0.8",
        );
      }
    },
    { scope: containerRef },
  );

  return (
    <header
      ref={containerRef}
      className={`mb-14 space-y-5 sm:mb-18 ${className}`}
    >
      <div className="header-line flex items-center gap-4 font-mono text-xs font-black uppercase tracking-[0.2em] text-primary sm:text-sm sm:tracking-[0.24em]">
        <span className="h-px w-10 bg-primary/60" />
        {title}
      </div>
      <h2
        className="header-subtitle max-w-5xl pb-2 text-4xl font-black leading-[0.98] tracking-normal text-foreground sm:text-6xl lg:text-7xl"
        aria-label={subtitle}
      >
        {subtitle.split(" ").map((word, i) => (
          <span
            key={i}
            className="inline-block whitespace-nowrap mr-[0.2em]"
            aria-hidden="true"
          >
            {word.split("").map((char, j) => (
              <span key={j} className="char inline-block">
                {char}
              </span>
            ))}
          </span>
        ))}
      </h2>
      {description && (
        <p className="header-description max-w-2xl text-balance text-base font-medium leading-relaxed text-muted-foreground sm:text-xl">
          {description}
        </p>
      )}
    </header>
  );
}
