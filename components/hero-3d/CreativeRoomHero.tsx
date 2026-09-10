"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Maximize2, Minimize2, RotateCcw } from "lucide-react";
import { useFullFocus } from "./useFullFocus";
import { roomPreviewConfig, roomInteractionConfig, type RoomHotspotId } from "./roomSceneConfig";
import { Component, useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { useLanguage } from "@/lib/language-context";
import styles from "./creative-room.module.css";
import { gsap, useGSAP } from "@/lib/gsap";

const Scene = dynamic(() => import("./CreativeRoomScene"), { ssr: false });
class SceneBoundary extends Component<{ children: ReactNode; onError: () => void }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch() { this.props.onError(); }
  render() { return this.state.failed ? null : this.props.children; }
}

export function CreativeRoomHero({ activeHotspot = "monitor" }: { activeHotspot?: RoomHotspotId }) {
  const { language } = useLanguage();
  const router = useRouter();
  const frame = useRef<HTMLDivElement>(null);
  const pendingHref = useRef<string | null>(null);
  const es = language === "es";
  const root = useRef<HTMLDivElement>(null);
  const expandButton = useRef<HTMLButtonElement>(null);
  const closeButton = useRef<HTMLButtonElement>(null);
  const [active, setActive] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const onReady = useCallback(() => setReady(true), []);
  const onUnavailable = useCallback(() => { setFailed(true); setReady(false); }, []);

  const [reset, setReset] = useState(0);
  const [compact, setCompact] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(true);
  const { expanded, busy, expand, minimize } = useFullFocus(root, frame, reducedMotion);
  useGSAP(() => {
    if (expanded) return;
    const media = gsap.matchMedia();
    media.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
      // Animate only the visual layers: transforming a dialog ancestor breaks fixed positioning.
      gsap.to(root.current?.querySelectorAll("[data-room-visual]") ?? [], {
        scale: roomInteractionConfig.scrollScale,
        yPercent: roomInteractionConfig.scrollYPercent,
        opacity: roomInteractionConfig.scrollOpacity,
        ease: "none",
        scrollTrigger: { trigger: frame.current, start: "top top", end: "bottom top", scrub: 0.5 },
      });
    });
    return () => media.revert();
  }, { scope: root, dependencies: [expanded], revertOnUpdate: true });
  useEffect(() => {
    if (!expanded && pendingHref.current) {
      const href = pendingHref.current;
      pendingHref.current = null;
      router.push(href);
    }
  }, [expanded, router]);
  const navigate = (href: string) => {
    if (expanded) { pendingHref.current = href; minimize(); }
    else router.push(href);
  };
  useEffect(() => {
    const mobile = matchMedia("(max-width: 767px)");
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => { setCompact(mobile.matches); setReducedMotion(motion.matches); };
    update();
    mobile.addEventListener("change", update);
    motion.addEventListener("change", update);
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setActive(true); observer.disconnect(); } }, { rootMargin: "100px" });
    if (root.current) observer.observe(root.current);
    return () => { observer.disconnect(); mobile.removeEventListener("change", update); motion.removeEventListener("change", update); };
  }, []);
  useEffect(() => {
    if (!expanded) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButton.current?.focus();
    const siblings: { element: HTMLElement; inert: boolean }[] = [];
    let branch: HTMLElement | null = root.current;
    while (branch && branch !== document.body) {
      for (const sibling of branch.parentElement?.children ?? []) {
        if (sibling !== branch && sibling instanceof HTMLElement) { siblings.push({ element: sibling, inert: sibling.inert }); sibling.inert = true; }
      }
      branch = branch.parentElement;
    }
    const keyboard = (event: KeyboardEvent) => {
      if (event.key === "Escape") { event.preventDefault(); minimize(); }
      if (event.key === "Tab") {
        const elements = Array.from(root.current?.querySelectorAll<HTMLElement>('a[href], button:not(:disabled), [tabindex="0"]') ?? [])
          .filter(element => element.getClientRects().length > 0);
        if (!elements.length) return;
        const first = elements[0], last = elements[elements.length - 1];
        if (event.shiftKey && (document.activeElement === first || !root.current?.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
        else if (!event.shiftKey && (document.activeElement === last || !root.current?.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
      }
    };
    document.addEventListener("keydown", keyboard);
    return () => { document.body.style.overflow = previous; siblings.forEach(({ element, inert }) => { element.inert = inert; }); document.removeEventListener("keydown", keyboard); expandButton.current?.focus(); };
  }, [expanded, minimize]);
  return <div ref={frame} className={styles.placeholder}>
    <div ref={root} className={`${styles.viewer} ${expanded ? styles.expanded : ""}`} role={expanded ? "dialog" : "region"}
      aria-modal={expanded || undefined} aria-label="Alex Creative Space">
      <div className={styles.caption}><span>Alex Creative Space</span><span>{es ? "Desarrollo · Fotografía · Montaña" : "Development · Photography · Mountains"}</span></div>
      <div data-room-visual className={styles.visual}><div className={styles.poster} data-ready={ready} aria-hidden="true">
        <Image src={roomPreviewConfig.src} alt="" fill sizes="(min-width: 1024px) 60vw, 100vw" preload unoptimized />
      </div>
      <div className={styles.scene} data-ready={ready} inert={!ready} aria-hidden={!ready}>
      <SceneBoundary onError={onUnavailable}>
        {active && <Scene expanded={expanded} reset={reset} compact={compact} reducedMotion={reducedMotion} language={language} onNavigate={navigate} activeHotspot={activeHotspot} onReady={onReady} onUnavailable={onUnavailable} />}
      </SceneBoundary>
      </div>
      </div>
      {!ready && <p className={styles.loading} role="status">{failed
        ? (es ? "Vista previa · El estudio 3D no está disponible" : "Preview · The 3D studio is unavailable")
        : (es ? "Preparando el estudio interactivo…" : "Preparing the interactive studio…")}</p>}
      <div className={styles.controls}>
        {expanded ? <button ref={closeButton} onClick={minimize} aria-label={es ? "Minimizar escena" : "Minimize scene"} title={es ? "Minimizar escena · Esc" : "Minimize scene · Esc"}><Minimize2 aria-hidden="true" size={17} /></button>
          : <button ref={expandButton} onClick={expand} aria-label={es ? "Expandir escena" : "Expand scene"} title={es ? "Expandir escena" : "Expand scene"}><Maximize2 aria-hidden="true" size={17} /></button>}
        <button disabled={busy || !ready} onClick={() => setReset(value => value + 1)} aria-label={es ? "Restablecer vista" : "Reset view"} title={es ? "Restablecer vista" : "Reset view"}><RotateCcw aria-hidden="true" size={17} /></button>
      </div>
      <p className={styles.hint} hidden={!ready}>{es ? "Arrastra para explorar" : "Drag to explore"}{expanded ? (es ? " · Desplaza para acercar · Esc para cerrar" : " · Scroll to zoom · Esc to close") : ""}</p>
    </div>
  </div>;
}
