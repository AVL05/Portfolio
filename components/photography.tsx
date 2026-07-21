"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";

const frames = [
  { src: "/photography/hero.webp", series: "Atlantic / 01", position: "object-center" },
  { src: "/projects/raw-vives/raw-vives-series.webp", series: "Series / 02", position: "object-cover" },
  { src: "/projects/raw-vives/raw-vives-detail.webp", series: "Detail / 03", position: "object-cover" },
  { src: "/projects/raw-vives/raw-vives-fullscreen.webp", series: "Immersion / 04", position: "object-cover" },
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
      <div className="photo-stage flex min-h-[100dvh] flex-col justify-center overflow-hidden py-20 md:py-24">
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
                ? "Composición, ritmo, luz y silencio visual aplicados también a la interfaz. Una selección breve del archivo raw.vives."
                : "Composition, rhythm, light, and visual silence applied to interface work too. A short selection from the raw.vives archive."}
            </p>
          </div>
        </header>

        <div className="photo-rail mt-14 overflow-x-auto overscroll-x-contain [scrollbar-width:none] md:overflow-visible">
          <div className="photo-track flex w-max snap-x snap-mandatory gap-4 px-4 will-change-transform sm:gap-6 sm:px-6 md:snap-none lg:px-8">
          {frames.map((frame, index) => (
            <figure key={frame.src} className="w-[82vw] shrink-0 snap-center sm:w-[64vw] md:[scroll-snap-align:none] lg:w-[52vw]">
              <div className="relative aspect-[4/3] overflow-hidden bg-black" data-cursor="gallery">
                <Image
                  src={frame.src}
                  alt={`${frame.series} — raw.vives`}
                  fill
                  loading="lazy"
                  className={`${frame.position} transition-transform duration-700 ease-out hover:scale-[1.015]`}
                  sizes="(max-width: 640px) 82vw, (max-width: 1024px) 64vw, 52vw"
                />
              </div>
              <figcaption className="mt-3 flex items-center justify-between border-t border-black/25 pt-3 font-mono text-[9px] font-semibold uppercase tracking-[.16em] text-black/58">
                <span>{String(index + 1).padStart(2, "0")} / {frame.series}</span>
                <span>Valencia · raw.vives</span>
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
