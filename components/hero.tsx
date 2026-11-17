"use client";

import { ArrowDown, Download, Mail } from "lucide-react";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { CV_HREF, SITE_EMAIL } from "@/lib/site";
import styles from "./hero.module.css";

export function Hero() {
  const { t } = useLanguage();
  const copy = t.hero;

  return (
    <section id="hero" aria-labelledby="hero-title">
      <div className="dot-band" aria-hidden="true" />
      <div className={styles.intro}>
        <Image
          src="/alex-vicente-lopez.webp"
          alt={copy.portraitAlt}
          width={88}
          height={88}
          loading="eager"
          className={styles.avatar}
        />
        <h1 id="hero-title" className={styles.title}>Alex Vicente López</h1>
        <p className={styles.role}>{copy.role}</p>
        <p className={styles.tagline}>{copy.tagline}</p>
        <p className={styles.availability}>
          <span className={styles.dot} aria-hidden="true" />
          {copy.availability}
        </p>
        <div className={styles.actions}>
          <a href="#projects" className="pill pill-primary">{copy.work}<ArrowDown aria-hidden="true" /></a>
          <a href={`mailto:${SITE_EMAIL}`} className="pill pill-secondary"><Mail aria-hidden="true" />{copy.contact}</a>
          <a href={CV_HREF} download data-track="cv-download" className="cinema-link"><Download aria-hidden="true" />{copy.cv}</a>
        </div>
      </div>
    </section>
  );
}
