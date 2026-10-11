"use client";

import { useRef } from "react";
import { deferToViewport, gsap, motion, revealTrigger, useGSAP } from "@/lib/gsap";

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
    (_, contextSafe) => deferToViewport(ref.current, contextSafe!(() => {
      const q = gsap.utils.selector(ref);
      const words = q(".rh-word");

      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.timeline({ scrollTrigger: revealTrigger(ref.current) })
          .from(q(".rh-kicker-line"), { scaleX: .45, duration: motion.duration.enter, ease: motion.ease.reveal, transformOrigin: "left" })
          .from(q(".rh-kicker-text"), { x: -motion.distance.small, duration: motion.duration.enter, ease: motion.ease.out }, 0)
          .from(words, { yPercent: 14, duration: motion.duration.title, ease: motion.ease.reveal, stagger: motion.stagger.content }, .08)
          .from(q(".rh-desc"), { y: motion.distance.small, duration: motion.duration.enter, ease: motion.ease.out }, .16);
      });
      return () => media.revert();
    })),
    { scope: ref },
  );

  return (
    <header ref={ref} className={`mb-14 space-y-5 sm:mb-18 ${className}`}>
      <div className="flex items-center gap-4 font-mono text-xs font-black uppercase tracking-[0.16em] text-primary sm:text-sm sm:tracking-[0.2em]">
        <span className="rh-kicker-line h-px w-10 bg-primary/60" />
        <span className="rh-kicker-text">{title}</span>
      </div>
      <h2
        className="max-w-5xl pb-2 text-4xl font-black leading-[0.96] tracking-normal text-foreground sm:text-6xl lg:text-7xl"
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
        <p className="rh-desc max-w-2xl text-pretty text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
          {description}
        </p>
      )}
    </header>
  );
}
