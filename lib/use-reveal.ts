"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

interface RevealOptions {
  /** Selector de los elementos a revelar en cascada. */
  selector: string;
  /** Desplazamiento vertical inicial en px. */
  y?: number;
  /** Escala inicial (1 = sin escala). */
  scale?: number;
  /** Separación del stagger en segundos. */
  stagger?: number;
  /** Duración de cada elemento. */
  duration?: number;
  /** Punto de disparo del ScrollTrigger. */
  start?: string;
}

/**
 * Hook genérico de revelado al hacer scroll. Devuelve un ref para el contenedor
 * y aplica una entrada en cascada a los elementos que coincidan con `selector`.
 * Respeta siempre prefers-reduced-motion.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>({
  selector,
  y = 40,
  scale = 1,
  stagger = 0.1,
  duration = 0.9,
  start = "top 80%",
}: RevealOptions) {
  const ref = useRef<T>(null);

  useGSAP(
    () => {
      const targets = gsap.utils.toArray<HTMLElement>(
        ref.current?.querySelectorAll(selector) ?? [],
      );
      if (!targets.length) return;

      if (prefersReducedMotion()) {
        gsap.set(targets, { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      gsap.fromTo(
        targets,
        { autoAlpha: 0, y, scale },
        {
          autoAlpha: 1,
          y: 0,
          scale: 1,
          duration,
          ease: "power3.out",
          stagger,
          scrollTrigger: { trigger: ref.current, start, once: true },
        },
      );
    },
    { scope: ref },
  );

  return ref;
}
