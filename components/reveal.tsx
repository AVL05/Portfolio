"use client";

import { useEffect } from "react";

/**
 * Soft section entrances without a motion library. Content is always in the
 * markup and visible by default; only elements that start below the fold are
 * marked "pending" and fade in once. Skipped for reduced motion and when the
 * visit starts on an anchor, so the target is never hidden.
 */
export function Reveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.location.hash) return;
    // A container that holds revealable children leaves the fade to them.
    const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]")).filter((element) => !element.querySelector("[data-reveal]"));
    const pending = targets.filter((element) => element.getBoundingClientRect().top > window.innerHeight * 0.92);
    if (!pending.length) return;

    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        (entry.target as HTMLElement).dataset.reveal = "shown";
        observer.unobserve(entry.target);
      }
    }, { rootMargin: "0px 0px -8% 0px" });

    for (const element of pending) {
      element.dataset.reveal = "pending";
      observer.observe(element);
    }
    return () => {
      observer.disconnect();
      for (const element of pending) element.dataset.reveal = "";
    };
  }, []);

  return null;
}
