"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import type { CSSProperties } from "react";
import { localizeHref } from "@/lib/i18n-paths";
import { useLanguage } from "@/lib/language-context";
import styles from "./photography.module.css";

const frames = [
  {
    src: "/photography/selected/coastal-solitude.webp",
    ratio: 1,
    series: { es: "Archivo fotográfico / 01", en: "Photography archive / 01" },
    alt: { es: "Gaviota frente a un acantilado oscuro", en: "Seagull facing a dark coastal cliff" },
  },
  {
    src: "/photography/selected/night-transit.webp",
    ratio: 1024 / 683,
    series: { es: "Estudio nocturno / 02", en: "Night study / 02" },
    alt: { es: "Tranvía y peatones cruzando un puente de noche", en: "Tram and pedestrians crossing a bridge at night" },
  },
  {
    src: "/photography/selected/shoreline-study.webp",
    ratio: 1,
    series: { es: "Estudio de orilla / 03", en: "Shoreline study / 03" },
    alt: { es: "Pies descalzos junto al agua en blanco y negro", en: "Bare feet by the water in black and white" },
  },
  {
    src: "/photography/selected/urban-geometry.webp",
    ratio: 1350 / 844,
    series: { es: "Geometría urbana / 04", en: "Urban geometry / 04" },
    alt: { es: "Ventana y marcas geométricas sobre un muro de ladrillo", en: "Window and geometric marks on a brick wall" },
  },
  {
    src: "/photography/selected/street-colour.webp",
    ratio: 1400 / 883,
    series: { es: "Estudio de color / 05", en: "Colour study / 05" },
    alt: { es: "Coche clásico granate avanzando por una calle soleada", en: "Burgundy classic car moving through a sunlit street" },
  },
];

const ARCHIVE_URL = "https://rawvives.aleviclop.dev/";
export function Photography() {
  const { language } = useLanguage();
  return <section id="photography" aria-labelledby="photography-title" className={styles.section}>
    <div className={styles.frame}>
      <header className={styles.header}>
        <h2 id="photography-title">{language === "es" ? <>Otra <span className="accent-serif">mirada.</span></> : <>See <span className="accent-serif">differently.</span></>}</h2>
        <div className={styles.statement}>
          <p>{language === "es"
            ? "El código da forma a la estructura. La fotografía da forma a mi manera de verla."
            : "Code shapes the structure. Photography shapes the way I see it."}</p>
          <div className={styles.links}>
            <a href={localizeHref("/proyectos/raw-vives", language)} className="cinema-link">
              {language === "es" ? "Ver caso de estudio" : "View case study"}<ArrowUpRight aria-hidden="true" />
            </a>
            <a href={ARCHIVE_URL} target="_blank" rel="noopener noreferrer" className="cinema-link">
              {language === "es" ? "Explorar raw.vives" : "Explore raw.vives"}<ArrowUpRight aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>
      <div className={styles.rows}>
        {[frames.slice(0, 3), frames.slice(3)].map((row, rowIndex) => <div key={rowIndex} className={styles.row}>
          {row.map((frame) => <figure key={frame.src} style={{ "--ratio": frame.ratio } as CSSProperties}>
            <div className={styles.image}>
              <Image src={frame.src} alt={frame.alt[language]} fill loading="lazy"
                sizes="(max-width: 767px) 50vw, 33vw" className="photo-image" />
            </div>
            <figcaption>{frame.series[language]}</figcaption>
          </figure>)}
        </div>)}
      </div>
    </div>
  </section>;
}
