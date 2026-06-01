"use client";

import React, { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

interface LiquidRevealProps {
  children: React.ReactNode;
  trigger?: string;
}

export function LiquidReveal({ children, trigger }: LiquidRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      if (prefersReducedMotion()) {
        gsap.set(el, { clearProps: "all", opacity: 1 });
        return;
      }

      gsap.fromTo(
        el,
        {
          autoAlpha: 0,
          scale: 0.96,
          y: 44,
        },
        {
          autoAlpha: 1,
          scale: 1,
          y: 0,
          immediateRender: false,
          duration: 0.72,
          ease: "power3.out",
          scrollTrigger: {
            trigger: trigger || el,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="will-change-transform">
      {children}
    </div>
  );
}
