"use client";

import Image from "next/image";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { useRef, type PointerEvent as ReactPointerEvent } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";

const frames = [
  {
    src: "/photography/selected/coastal-solitude.webp",
    series: { es: "Archivo visual / 01", en: "Visual archive / 01" },
    alt: { es: "Gaviota frente a un acantilado oscuro", en: "Seagull facing a dark coastal cliff" },
    frame: "w-[78vw] sm:w-[52vw] min-[900px]:w-[24vw]",
    ratio: "aspect-square",
    position: "object-center",
    sizes: "(max-width: 640px) 78vw, (max-width: 899px) 52vw, 24vw",
  },
  {
    src: "/photography/selected/night-transit.webp",
    series: { es: "Estudio nocturno / 02", en: "Night study / 02" },
    alt: { es: "Tranvía y peatones cruzando un puente de noche", en: "Tram and pedestrians crossing a bridge at night" },
    frame: "w-[88vw] sm:w-[72vw] min-[900px]:w-[36vw]",
    ratio: "aspect-[3/2]",
    position: "object-center",
    sizes: "(max-width: 640px) 88vw, (max-width: 899px) 72vw, 36vw",
  },
  {
    src: "/photography/selected/shoreline-study.webp",
    series: { es: "Estudio de orilla / 03", en: "Shoreline study / 03" },
    alt: { es: "Pies descalzos junto al agua en blanco y negro", en: "Bare feet by the water in black and white" },
    frame: "w-[78vw] sm:w-[50vw] min-[900px]:w-[24vw]",
    ratio: "aspect-square",
    position: "object-center",
    sizes: "(max-width: 640px) 78vw, (max-width: 899px) 50vw, 24vw",
  },
  {
    src: "/photography/selected/urban-geometry.webp",
    series: { es: "Geometría urbana / 04", en: "Urban geometry / 04" },
    alt: { es: "Ventana y marcas geométricas sobre un muro de ladrillo", en: "Window and geometric marks on a brick wall" },
    frame: "w-[88vw] sm:w-[68vw] min-[900px]:w-[35vw]",
    ratio: "aspect-[8/5]",
    position: "object-center",
    sizes: "(max-width: 640px) 88vw, (max-width: 899px) 68vw, 35vw",
  },
  {
    src: "/photography/selected/street-colour.webp",
    series: { es: "Estudio de color / 05", en: "Colour study / 05" },
    alt: { es: "Coche clásico granate avanzando por una calle soleada", en: "Burgundy classic car moving through a sunlit street" },
    frame: "w-[88vw] sm:w-[70vw] min-[900px]:w-[35vw]",
    ratio: "aspect-[8/5]",
    position: "object-center",
    sizes: "(max-width: 640px) 88vw, (max-width: 899px) 70vw, 35vw",
  },
];

const ARCHIVE_URL = "https://gallery.aleviclop.dev/";
const SWIPE_THRESHOLD = 80;
const DIRECTION_RATIO = 1.2;

type SwipeState = {
  pointerId: number;
  startX: number;
  startY: number;
  locked: boolean;
  moved: boolean;
};

function ArchiveLink({ language }: { language: "es" | "en" }) {
  const linkRef = useRef<HTMLAnchorElement>(null);
  const arrowRef = useRef<SVGSVGElement>(null);
  const gestureLabelRef = useRef<HTMLSpanElement>(null);
  const gestureRef = useRef<SwipeState | null>(null);
  const suppressClickRef = useRef(false);
  const touchInputRef = useRef(false);
  const navigatingRef = useRef(false);
  const reducedMotionRef = useRef(false);

  const renderProgress = (progress: number, distance: number) => {
    const link = linkRef.current;
    const arrow = arrowRef.current;
    if (!link) return;

    const reduced = reducedMotionRef.current;
    const offset = -Math.min(reduced ? 32 : 56, distance * (reduced ? 0.35 : 0.55));
    link.style.transition = "none";
    link.style.transform = `translate3d(0, ${offset}px, 0) scale(${reduced ? 1 : 1 - progress * 0.015})`;
    link.style.opacity = String(1 - progress * (reduced ? 0.06 : 0.14));
    if (arrow) {
      arrow.style.transform = `translate3d(0, ${-progress * (reduced ? 4 : 10)}px, 0)`;
      arrow.style.opacity = String(0.45 + progress * 0.55);
    }
    if (gestureLabelRef.current) {
      gestureLabelRef.current.textContent = progress >= 1
        ? language === "es" ? "Suelta para abrir" : "Release to open"
        : language === "es" ? "Desliza hacia arriba para abrir" : "Swipe up to open";
    }
  };

  const resetCard = () => {
    const link = linkRef.current;
    const arrow = arrowRef.current;
    if (!link) return;

    const duration = reducedMotionRef.current ? "0ms" : "180ms";
    link.style.transition = `transform ${duration} cubic-bezier(.2,.8,.2,1), opacity ${duration} ease-out`;
    link.style.transform = "translate3d(0, 0, 0) scale(1)";
    link.style.opacity = "1";
    if (arrow) {
      arrow.style.transition = `transform ${duration} cubic-bezier(.2,.8,.2,1), opacity ${duration} ease-out`;
      arrow.style.transform = "translate3d(0, 0, 0)";
      arrow.style.opacity = "0.55";
    }
    if (gestureLabelRef.current) {
      gestureLabelRef.current.textContent = language === "es"
        ? "Desliza hacia arriba para abrir"
        : "Swipe up to open";
    }
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    touchInputRef.current = event.pointerType === "touch";
    suppressClickRef.current = false;
    if (event.pointerType !== "touch" || !event.isPrimary || navigatingRef.current) return;

    reducedMotionRef.current = prefersReducedMotion();
    gestureRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      locked: false,
      moved: false,
    };
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId || navigatingRef.current) return;

    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;
    const horizontal = Math.abs(deltaX);
    const upward = Math.max(0, -deltaY);

    if (Math.hypot(deltaX, deltaY) > 8) {
      gesture.moved = true;
      suppressClickRef.current = true;
    }

    if (!gesture.locked) {
      if (horizontal > upward || deltaY >= -10) return;
      if (upward < horizontal * DIRECTION_RATIO) return;
      gesture.locked = true;
    }

    event.preventDefault();
    renderProgress(Math.min(1, upward / SWIPE_THRESHOLD), upward);
  };

  const finishGesture = (event: ReactPointerEvent<HTMLAnchorElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;

    const deltaX = event.clientX - gesture.startX;
    const upward = Math.max(0, gesture.startY - event.clientY);
    const completed = gesture.locked && upward >= SWIPE_THRESHOLD && upward > Math.abs(deltaX) * DIRECTION_RATIO;
    gestureRef.current = null;

    if (!completed) {
      resetCard();
      return;
    }

    navigatingRef.current = true;
    suppressClickRef.current = true;
    const delay = reducedMotionRef.current ? 0 : 120;
    renderProgress(1, SWIPE_THRESHOLD + 28);
    window.setTimeout(() => window.location.assign(ARCHIVE_URL), delay);
  };

  const cancelGesture = () => {
    if (gestureRef.current?.moved) suppressClickRef.current = true;
    gestureRef.current = null;
    resetCard();
  };

  return (
    <a
      ref={linkRef}
      data-cursor="external"
      href={ARCHIVE_URL}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={finishGesture}
      onPointerCancel={cancelGesture}
      onClick={(event) => {
        if (navigatingRef.current || suppressClickRef.current) {
          event.preventDefault();
          return;
        }
        if (touchInputRef.current && event.detail !== 0) {
          event.preventDefault();
          window.location.assign(ARCHIVE_URL);
        }
      }}
      style={{ touchAction: "pan-x pan-up" }}
      className="group flex aspect-square w-full max-w-80 flex-col justify-between border border-black/35 p-6 transition-colors hover:bg-[#11110f] hover:text-[#e9e5dc] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black sm:p-8"
    >
      <span className="font-mono text-[10px] uppercase tracking-[.18em]">
        {language === "es" ? "raw.vives / 30 fotografías" : "raw.vives / 30 photographs"}
      </span>
      <span className="text-4xl font-black leading-none tracking-[-.05em] sm:text-5xl">
        {language === "es" ? <>Explorar<br />archivo</> : <>Explore<br />archive</>}
      </span>
      <span className="flex items-end justify-between gap-4">
        <span ref={gestureLabelRef} className="max-w-36 font-mono text-[9px] font-semibold uppercase leading-relaxed tracking-[.14em] min-[900px]:hidden">
          {language === "es" ? "Desliza hacia arriba para abrir" : "Swipe up to open"}
        </span>
        <ArrowUp ref={arrowRef} aria-hidden="true" className="h-5 w-5 opacity-55 min-[900px]:hidden" />
        <ArrowUpRight aria-hidden="true" className="hidden h-6 w-6 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 min-[900px]:block" />
      </span>
    </a>
  );
}

export function Photography() {
  const { language } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const q = gsap.utils.selector(containerRef);
      const track = q(".photo-track")[0] as HTMLElement | undefined;
      const stage = q(".photo-stage")[0] as HTMLElement | undefined;
      if (!track || !stage) return;

      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth + 64);
        gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "bottom bottom",
            pin: stage,
            pinSpacing: false,
            anticipatePin: 1,
            scrub: 0.8,
            invalidateOnRefresh: true,
          },
        });
      });
      return () => mm.revert();
    },
    { scope: containerRef },
  );

  return (
    <section id="photography" ref={containerRef} aria-labelledby="photography-title" className="photography-cinema relative bg-[#e9e5dc] text-[#11110f]">
      <div className="photo-stage flex flex-col justify-center overflow-hidden">
        <header className="mx-auto grid w-full max-w-[100rem] gap-8 px-4 sm:px-6 md:grid-cols-[.85fr_1.15fr] md:items-end lg:px-8">
          <div>
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#9b4e32]">
              {language === "es" ? "04 / Práctica visual" : "04 / Visual practice"}
            </p>
            <h2 id="photography-title" className="mt-5 text-[clamp(4rem,10vw,9rem)] font-black leading-[.78] tracking-[-.075em]">See<br />differently.</h2>
          </div>
          <div className="max-w-2xl md:justify-self-end">
            <p className="text-balance text-2xl font-semibold leading-tight tracking-[-.03em] sm:text-3xl lg:text-4xl">
              {language === "es"
                ? "El código da forma a la estructura. La fotografía da forma a mi manera de verla."
                : "Code shapes the structure. Photography shapes the way I see it."}
            </p>
            <p className="mt-5 max-w-[58ch] text-sm font-medium leading-relaxed text-black/62 sm:text-base">
              {language === "es"
                ? "La composición, el ritmo y la luz que trabajo detrás de la cámara también definen cómo diseño una interfaz. Esta es una selección de mi archivo visual."
                : "The composition, rhythm and light I explore behind the camera also shape the way I design interfaces. This is a selection from my visual archive."}
            </p>
          </div>
        </header>

        <div className="photo-rail mt-14 snap-x snap-mandatory overflow-x-auto overscroll-x-contain [scrollbar-width:none] min-[900px]:mt-10 min-[900px]:snap-none min-[900px]:overflow-visible">
          <div className="photo-track flex w-max gap-4 px-4 will-change-transform sm:gap-6 sm:px-6 lg:px-8">
          {frames.map((frame) => (
            <figure key={frame.src} className={`${frame.frame} shrink-0 snap-center min-[900px]:[scroll-snap-align:none]`}>
              <div className={`relative ${frame.ratio} overflow-hidden bg-black`} data-cursor="gallery">
                <Image
                  src={frame.src}
                  alt={frame.alt[language]}
                  fill
                  loading="lazy"
                  className={`${frame.position} object-cover transition-transform duration-700 ease-out motion-safe:hover:scale-[1.015]`}
                  sizes={frame.sizes}
                />
              </div>
              <figcaption className="mt-3 border-t border-black/25 pt-3 font-mono text-[9px] font-semibold uppercase tracking-[.16em] text-black/58">
                {frame.series[language]}
              </figcaption>
            </figure>
          ))}

          <div className="flex w-[70vw] shrink-0 snap-center items-center justify-center sm:w-[42vw] min-[900px]:[scroll-snap-align:none] lg:w-[28vw]">
            <ArchiveLink language={language} />
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
