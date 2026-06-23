"use client";

import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

/**
 * Fondo de montañas con parallax al hacer scroll. Varias capas SVG que se
 * desplazan a distinta velocidad para dar sensación de profundidad. Pensado
 * para colocarse en la parte inferior del hero (z bajo, detrás del contenido).
 * Respeta prefers-reduced-motion (queda estático).
 */
export function MountainParallax() {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(ref);

      // Cada capa sube a un ritmo distinto: las cercanas se mueven más.
      const layers: [string, number][] = [
        [".mp-far", -8],
        [".mp-mid", -26],
        [".mp-near", -52],
        [".mp-fog", -14],
      ];

      layers.forEach(([sel, y]) => {
        gsap.to(q(sel), {
          yPercent: y,
          ease: "none",
          scrollTrigger: {
            trigger: ref.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 bottom-0 z-0 h-[42%] overflow-hidden sm:h-[52%] lg:h-[62%]"
    >
      {/* Resplandor tras las cimas */}
      <div className="absolute inset-x-0 bottom-[18%] h-[40%] bg-[radial-gradient(ellipse_60%_100%_at_50%_100%,oklch(from_var(--primary)_l_c_h_/_0.16),transparent_70%)]" />

      {/* Cordillera lejana */}
      <svg
        className="mp-far absolute inset-x-0 bottom-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "70%" }}
      >
        <path
          fill="oklch(from var(--primary) l c h / 0.10)"
          d="M0 240 L160 180 L320 220 L480 130 L640 210 L800 150 L960 220 L1120 160 L1280 230 L1440 190 L1440 320 L0 320 Z"
        />
      </svg>

      {/* Cordillera media */}
      <svg
        className="mp-mid absolute inset-x-0 bottom-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "84%" }}
      >
        <path
          fill="oklch(from var(--primary) calc(l * 0.5) c h / 0.30)"
          d="M0 300 L220 200 L380 260 L560 160 L740 250 L900 190 L1100 270 L1280 200 L1440 260 L1440 320 L0 320 Z"
        />
        <path
          fill="none"
          stroke="oklch(from var(--primary) l c h / 0.18)"
          strokeWidth="1.5"
          d="M0 300 L220 200 L380 260 L560 160 L740 250 L900 190 L1100 270 L1280 200 L1440 260"
        />
      </svg>

      {/* Niebla entre capas */}
      <div className="mp-fog absolute inset-x-0 bottom-[24%] h-[26%] bg-[linear-gradient(to_top,oklch(from_var(--background)_l_c_h_/_0.9),transparent)]" />

      {/* Cordillera cercana */}
      <svg
        className="mp-near absolute inset-x-0 bottom-0 w-full"
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        style={{ height: "100%" }}
      >
        <path
          fill="oklch(from var(--background) calc(l * 1.25) c h)"
          d="M0 320 L180 220 L340 300 L520 200 L700 290 L880 210 L1080 300 L1260 230 L1440 290 L1440 320 Z"
        />
        <path
          fill="none"
          stroke="oklch(from var(--primary) l c h / 0.28)"
          strokeWidth="1.5"
          d="M0 320 L180 220 L340 300 L520 200 L700 290 L880 210 L1080 300 L1260 230 L1440 290"
        />
      </svg>

      {/* Fundido inferior hacia el fondo de la sección */}
      <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-background to-transparent" />
    </div>
  );
}
