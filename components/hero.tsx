"use client";

import { ArrowDown, ArrowUpRight, Download, Mail } from "lucide-react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useLanguage } from "@/lib/language-context";
import { CV_HREF, GITHUB_URL, LINKEDIN_URL, RAW_VIVES_URL, SITE_EMAIL } from "@/lib/site";
import styles from "./hero.module.css";

export function Hero() {
  const { language, t } = useLanguage();
  const copy = t.hero;

  return (
    <section id="hero" aria-labelledby="hero-title">
      <div className={styles.cover}>
        <Image
          src="/portfolio-cover.webp"
          alt=""
          fill
          sizes="(min-width: 56rem) 56rem, 100vw"
          fetchPriority="high"
          loading="eager"
        />
        <a href={RAW_VIVES_URL} className={styles.credit}>
          raw.vives <ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className={styles.intro}>
        <div className={styles.profile}>
          <Image
            src="/alex-vicente-lopez.webp"
            alt={copy.portraitAlt}
            width={112}
            height={112}
            loading="eager"
            className={styles.avatar}
          />
          <div>
            <h1 id="hero-title" className={styles.title}>Alex Vicente López</h1>
            <p className={styles.role}>{copy.role}</p>
          </div>
        </div>
        <p className={styles.tagline}>{copy.tagline}</p>
        <p className={styles.stack}>{copy.stack}</p>
        <p className={styles.availability}>
          <span className={styles.dot} aria-hidden="true" />
          {copy.availability}
        </p>
        <div className={styles.actions}>
          <a href="#projects" className="pill pill-primary">{copy.work}<ArrowDown aria-hidden="true" /></a>
          <a href={`mailto:${SITE_EMAIL}`} className="pill pill-secondary"><Mail aria-hidden="true" />{copy.contact}</a>
          <a href={CV_HREF[language]} download data-track="cv-download" className="cinema-link"><Download aria-hidden="true" />{copy.cv}</a>
        </div>
        <div className={styles.socials}>
          <a href={LINKEDIN_URL} className="cinema-link"><FaLinkedin aria-hidden="true" />LinkedIn</a>
          <a href={GITHUB_URL} className="cinema-link"><FaGithub aria-hidden="true" />GitHub</a>
        </div>
      </div>
    </section>
  );
}
