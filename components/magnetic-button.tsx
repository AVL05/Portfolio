"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, isFinePointer, useGSAP } from "@/lib/gsap";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
}

export function MagneticButton({ children, className = "", strength = 0.38 }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !isFinePointer()) return;

      const onMove = (e: MouseEvent) => {
        const bounds = el.getBoundingClientRect();
        const cx = bounds.left + bounds.width / 2;
        const cy = bounds.top + bounds.height / 2;
        gsap.to(el, {
          x: (e.clientX - cx) * strength,
          y: (e.clientY - cy) * strength,
          duration: 0.35,
          ease: "power2.out",
        });
      };

      const onLeave = () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.75, ease: "elastic.out(1, 0.45)" });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={`inline-block will-change-transform ${className}`}>
      {children}
    </div>
  );
}
