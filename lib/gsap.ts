import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
import { useGSAP } from '@gsap/react';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

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
      setTimeout(() => ScrollTrigger.refresh(), 100);
    });

    // Refresh on visibility change (tab switch) — helps Brave
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        setTimeout(() => ScrollTrigger.refresh(), 200);
      }
    });
  }
}

export { gsap, ScrollTrigger, ScrollToPlugin, useGSAP };
