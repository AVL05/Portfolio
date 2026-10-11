import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

export const motion = {
  duration: { fast: .14, state: .24, enter: .45, title: .6, mask: .65, hero: .8 },
  ease: { out: 'power3.out', reveal: 'expo.out' },
  distance: { small: 8, content: 12, title: 18, parallax: 10 },
  stagger: { content: .04, hero: .08 },
  opacity: { hidden: 0, visible: 1 },
  mask: 'inset(12% 0 12% 0)',
} as const;

// Complete skipped entrances rather than replaying behind fast scroll or focus.
function revealTrigger(trigger: Element | null) {
  return { trigger, start: 'top 88%', once: true, fastScrollEnd: true,
    onLeave: (self: ScrollTrigger) => {
      if (!prefersReducedMotion()) self.animation?.progress(1);
    } };
}

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  gsap.defaults({
    ease: motion.ease.out,
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

// Defer enhancement, never SSR content; callers keep setup inside contextSafe.
function deferToViewport(target: Element | null, setup: () => void) {
  if (!target) return () => {};
  const observer = new IntersectionObserver((entries) => {
    if (!entries.some((entry) => entry.isIntersecting)) return;
    observer.disconnect();
    setup();
  }, { rootMargin: "100px" });
  observer.observe(target);
  return () => observer.disconnect();
}

export { gsap, ScrollTrigger, useGSAP, prefersReducedMotion, deferToViewport, revealTrigger };
