"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

const frames = [
  {
    src: "/photography/selected/coastal-solitude.webp",
    series: { es: "Archivo fotográfico / 01", en: "Photography archive / 01" },
    alt: { es: "Gaviota frente a un acantilado oscuro", en: "Seagull facing a dark coastal cliff" },
  },
  {
    src: "/photography/selected/night-transit.webp",
    series: { es: "Estudio nocturno / 02", en: "Night study / 02" },
    alt: { es: "Tranvía y peatones cruzando un puente de noche", en: "Tram and pedestrians crossing a bridge at night" },
  },
  {
    src: "/photography/selected/shoreline-study.webp",
    series: { es: "Estudio de orilla / 03", en: "Shoreline study / 03" },
    alt: { es: "Pies descalzos junto al agua en blanco y negro", en: "Bare feet by the water in black and white" },
  },
  {
    src: "/photography/selected/urban-geometry.webp",
    series: { es: "Geometría urbana / 04", en: "Urban geometry / 04" },
    alt: { es: "Ventana y marcas geométricas sobre un muro de ladrillo", en: "Window and geometric marks on a brick wall" },
  },
  {
    src: "/photography/selected/street-colour.webp",
    series: { es: "Estudio de color / 05", en: "Colour study / 05" },
    alt: { es: "Coche clásico granate avanzando por una calle soleada", en: "Burgundy classic car moving through a sunlit street" },
  },
];

const ARCHIVE_URL = "https://rawvives.aleviclop.dev/";
export function Photography() {
  const { language } = useLanguage();
  return <section id="photography" aria-labelledby="photography-title" className="bg-[#e9e5dc] px-4 py-20 text-[#11110f] sm:px-6 sm:py-28 lg:px-8">
    <div className="mx-auto max-w-[100rem]">
      <header className="grid gap-8 md:grid-cols-[.85fr_1.15fr] md:items-end">
        <div>
          <p className="font-mono text-xs text-[#85412d]">{language === "es" ? "04 / Práctica fotográfica" : "04 / Photographic practice"}</p>
          <h2 id="photography-title" className="mt-5 text-[clamp(3.5rem,7vw,7rem)] font-black leading-[.98] tracking-[-.065em]">{language === "es" ? <>Otra<br />mirada.</> : <>See<br />differently.</>}</h2>
        </div>
        <div className="max-w-[42ch] md:justify-self-end">
          <p className="text-balance text-2xl font-medium leading-snug tracking-tight sm:text-3xl">{language === "es"
            ? "El código da forma a la estructura. La fotografía da forma a mi manera de verla."
            : "Code shapes the structure. Photography shapes the way I see it."}</p>
          <a href={ARCHIVE_URL} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex min-h-11 items-center gap-4 border-b border-black/40 text-sm font-semibold transition-colors hover:text-[#85412d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-black">
            {language === "es" ? "Explorar raw.vives" : "Explore raw.vives"}<ArrowUpRight aria-hidden="true" size={18} />
          </a>
        </div>
      </header>
      <div className="mt-12 grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-x-6 lg:grid-cols-4">
        {frames.map((frame, index) => <figure key={frame.src} className={index === 0 ? "group col-span-2 flex flex-col lg:row-span-2" : "group"}>
          <div className={index === 0 ? "relative aspect-[4/3] overflow-hidden bg-black lg:aspect-auto lg:flex-1 lg:min-h-96" : "relative aspect-[4/3] overflow-hidden bg-black"}>
            <Image src={frame.src} alt={frame.alt[language]} fill loading="lazy" sizes={index === 0 ? "(max-width: 1023px) 100vw, 50vw" : "(max-width: 1023px) 50vw, 25vw"} className="object-cover transition-transform duration-500 motion-safe:group-hover:scale-[1.015] motion-reduce:transition-none" />
          </div>
          <figcaption className="mt-3 font-mono text-[11px] leading-relaxed text-black/75">{frame.series[language]}</figcaption>
        </figure>)}
      </div>
    </div>
  </section>;
}
