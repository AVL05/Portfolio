"use client";

import { useCallback, useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";

export function CustomCursor() {
  const { language } = useLanguage();
  const cleanupRef = useRef<(() => void) | null>(null);

  const setCursorRef = useCallback((cursor: HTMLDivElement | null) => {
      cleanupRef.current?.();
      cleanupRef.current = null;
      if (!cursor) return;
      const query = window.matchMedia("(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)");
      if (!query.matches) return;

      document.documentElement.classList.add("custom-cursor-enabled");
      const xTo = gsap.quickTo(cursor, "x", { duration: 0.24, ease: "power3.out" });
      const yTo = gsap.quickTo(cursor, "y", { duration: 0.24, ease: "power3.out" });
      const scaleTo = gsap.quickTo(cursor, "scale", { duration: 0.2, ease: "power2.out" });
      let activeState = "";

      const onMove = (event: PointerEvent) => {
        xTo(event.clientX);
        yTo(event.clientY);
        const nativeControl = (event.target as HTMLElement).closest("input, textarea, select, [contenteditable='true']");
        if (nativeControl) {
          cursor.dataset.visible = "false";
          return;
        }
        cursor.dataset.visible = "true";
        const target = (event.target as HTMLElement).closest<HTMLElement>("[data-cursor]");
        const state = target?.dataset.cursor ?? "";
        if (state === activeState) return;
        activeState = state;
        cursor.dataset.state = state;
        const labels: Record<string, string> = {
          project: language === "es" ? "ABRIR" : "OPEN",
          external: "↗",
          gallery: language === "es" ? "EXPLORAR" : "EXPLORE",
          drag: language === "es" ? "ARRASTRAR" : "DRAG",
          contact: language === "es" ? "HOLA" : "HELLO",
        };
        cursor.textContent = labels[state] ?? "";
        scaleTo(state ? 1 : 0.42);
      };
      const onLeave = () => {
        cursor.dataset.visible = "false";
      };

      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("mouseleave", onLeave);
      cleanupRef.current = () => {
        document.documentElement.classList.remove("custom-cursor-enabled");
        gsap.killTweensOf(cursor);
        window.removeEventListener("pointermove", onMove);
        document.documentElement.removeEventListener("mouseleave", onLeave);
      };
    }, [language]);

  useEffect(() => () => cleanupRef.current?.(), []);

  return <div ref={setCursorRef} className="custom-cursor" aria-hidden="true" />;
}
