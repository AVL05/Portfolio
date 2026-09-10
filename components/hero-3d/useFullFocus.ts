"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type RefObject } from "react";
import { roomInteractionConfig } from "./roomSceneConfig";

export function useFullFocus(viewer: RefObject<HTMLDivElement | null>, frame: RefObject<HTMLDivElement | null>, reducedMotion: boolean) {
  const [expanded, setExpanded] = useState(false);
  const [busy, setBusy] = useState(false);
  const phase = useRef<"hero" | "opening" | "focus" | "closing">("hero");
  const animation = useRef<Animation | null>(null);

  const finishClose = useCallback(() => {
    animation.current?.cancel();
    phase.current = "hero";
    setExpanded(false);
    setBusy(false);
  }, []);

  const animate = useCallback((from: DOMRect, to: DOMRect) => {
    const element = viewer.current;
    if (!element) return null;
    const transform = (rect: DOMRect) => `translate(${rect.left}px, ${rect.top}px) scale(${rect.width / window.innerWidth}, ${rect.height / window.innerHeight})`;
    const result = element.animate([
      { transform: transform(from), transformOrigin: "top left" },
      { transform: transform(to), transformOrigin: "top left" },
    ], { duration: roomInteractionConfig.focusDuration, easing: roomInteractionConfig.focusEasing, fill: "both" });
    animation.current = result;
    return result;
  }, [viewer]);

  const minimize = useCallback(() => {
    if (phase.current === "hero" || phase.current === "closing") return;
    const from = viewer.current?.getBoundingClientRect();
    const to = frame.current?.getBoundingClientRect();
    phase.current = "closing";
    animation.current?.cancel();
    if (reducedMotion || !from || !to) { finishClose(); return; }
    setBusy(true);
    const result = animate(from, to);
    if (result) void result.finished.then(finishClose).catch(() => {});
    else finishClose();
  }, [animate, finishClose, frame, reducedMotion, viewer]);

  useLayoutEffect(() => {
    if (!expanded) return;
    if (phase.current === "closing") {
      if (reducedMotion) finishClose();
      return;
    }
    if (phase.current === "focus") return;
    animation.current?.cancel();
    const from = frame.current?.getBoundingClientRect();
    const to = viewer.current?.getBoundingClientRect();
    if (reducedMotion || !from || !to) {
      phase.current = "focus";
      setBusy(false);
      return;
    }
    const result = animate(from, to);
    if (result) void result.finished.then(() => {
      if (phase.current !== "opening") return;
      result.cancel();
      phase.current = "focus";
      setBusy(false);
    }).catch(() => {});
    return () => animation.current?.cancel();
  }, [animate, expanded, finishClose, frame, reducedMotion, viewer]);

  useEffect(() => () => animation.current?.cancel(), []);

  const expand = useCallback(() => {
    if (phase.current !== "hero") return;
    phase.current = "opening";
    setBusy(true);
    setExpanded(true);
  }, []);

  return { expanded, busy, expand, minimize };
}
