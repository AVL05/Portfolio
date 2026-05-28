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
          filter: "blur(30px) contrast(200%)",
          opacity: 0,
          scale: 0.8,
          y: 100,
        },
        {
          filter: "blur(0px) contrast(100%)",
          opacity: 1,
          scale: 1,
          y: 0,
          duration: 1.5,
          ease: "power4.out",
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
