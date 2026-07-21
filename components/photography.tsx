"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
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
            <p className="font-mono text-[10px] font-bold uppercase tracking-[.2em] text-[#9b4e32]">02 / Visual practice</p>
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

          <div className="flex w-[70vw] shrink-0 items-center justify-center sm:w-[42vw] lg:w-[28vw]">
            <a
              data-cursor="external"
              href="https://gallery.aleviclop.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex aspect-square w-full max-w-80 flex-col justify-between border border-black/35 p-6 transition-colors hover:bg-[#11110f] hover:text-[#e9e5dc] sm:p-8"
            >
              <span className="font-mono text-[10px] uppercase tracking-[.18em]">raw.vives / 30 photographs</span>
              <span className="text-4xl font-black leading-none tracking-[-.05em] sm:text-5xl">Explore<br />archive</span>
              <ArrowUpRight className="h-6 w-6 self-end transition-transform group-hover:-translate-y-1 group-hover:translate-x-1" />
            </a>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
}
