import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

  gsap.defaults({
    ease: 'power3.out',
  });

  gsap.config({
    nullTargetWarn: false,
    autoSleep: 60,
  });

  if (typeof ScrollTrigger !== 'undefined') {
    ScrollTrigger.defaults({
      anticipatePin: 1,
    });

    // Refresh after fonts load to avoid layout shifts breaking triggers
    document.fonts?.ready?.then(() => {
      // Use requestIdleCallback if available, otherwise a longer delay
      if ('requestIdleCallback' in window) {
        window.requestIdleCallback(() => ScrollTrigger.refresh());
      } else {
        setTimeout(() => ScrollTrigger.refresh(), 500);
      }
    });

    const globalKey = '__portfolioGsapVisibilityRefresh';
    const globalWindow = window as typeof window & Record<string, boolean>;

    if (!globalWindow[globalKey]) {
      globalWindow[globalKey] = true;

      // Refresh on visibility change (tab switch) — helps Brave
      document.addEventListener('visibilitychange', () => {
        if (!document.hidden) {
          setTimeout(() => ScrollTrigger.refresh(), 200);
        }
      });
    }
  }
}

function prefersReducedMotion() {
  return typeof window !== 'undefined'
    && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * True solo en dispositivos con puntero fino y hover real (ratón / trackpad).
 * Se usa para desactivar efectos caros (tilt, magnético) en táctiles, donde
 * además no aportan nada.
 */
function isFinePointer() {
  return typeof window !== 'undefined'
    && window.matchMedia('(hover: hover) and (pointer: fine)').matches;
}

export { gsap, ScrollTrigger, ScrollToPlugin, useGSAP, prefersReducedMotion, isFinePointer };
