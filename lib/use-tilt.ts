"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, isFinePointer, useGSAP } from "@/lib/gsap";

interface TiltOptions {
  /** Inclinación máxima en grados. */
  max?: number;
  /** Distancia de perspectiva en px. */
  perspective?: number;
  /** Escala al hacer hover (1 = sin escala). */
  scale?: number;
  /** Activa el spotlight que sigue al cursor (--mouse-x / --mouse-y). */
  spotlight?: boolean;
}

/**
 * Hook de tilt 3D + spotlight para tarjetas. Devuelve un ref a aplicar sobre el
 * elemento que debe inclinarse. Actualiza las variables CSS `--mouse-x` y
 * `--mouse-y` (en %) para alimentar el foco de luz de `.premium-card`.
 * Respeta siempre prefers-reduced-motion (no hace nada).
 */
export function useTilt<T extends HTMLElement = HTMLDivElement>({
  max = 6,
  perspective = 900,
  scale = 1.0,
  spotlight = true,
}: TiltOptions = {}) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion() || !isFinePointer()) return;

      gsap.set(el, { transformPerspective: perspective, transformStyle: "preserve-3d" });
      const xTo = gsap.quickTo(el, "rotationY", { duration: 0.5, ease: "power3.out" });
      const yTo = gsap.quickTo(el, "rotationX", { duration: 0.5, ease: "power3.out" });

      const onMove = (e: MouseEvent) => {
        const b = el.getBoundingClientRect();
        const px = (e.clientX - b.left) / b.width;
        const py = (e.clientY - b.top) / b.height;
        xTo((px - 0.5) * max * 2);
        yTo((0.5 - py) * max * 2);
        if (spotlight) {
          el.style.setProperty("--mouse-x", `${px * 100}%`);
          el.style.setProperty("--mouse-y", `${py * 100}%`);
        }
      };

      const onEnter = () => {
        if (scale !== 1) gsap.to(el, { scale, duration: 0.5, ease: "power3.out" });
      };

      const onLeave = () => {
        xTo(0);
        yTo(0);
        gsap.to(el, { scale: 1, duration: 0.7, ease: "elastic.out(1, 0.5)" });
      };

      el.addEventListener("mousemove", onMove);
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);

      return () => {
        el.removeEventListener("mousemove", onMove);
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
      };
    },
    { scope: ref },
  );

  return ref;
}
