"use client";

import { useLanguage, type TimelineItem } from "@/lib/language-context";
import { Download } from "lucide-react";
import styles from "./profile.module.css";

function Timeline({ items, labelledBy }: { items: TimelineItem[]; labelledBy: string }) {
  return <ol className={styles.timeline} aria-labelledby={labelledBy}>
    {items.map((item) => <li key={`${item.title}-${item.period}`}>
      <p className={styles.period}>{item.period}</p>
      <article>
        <p className={styles.org}>{item.company ?? item.institution}</p>
        <h4>{item.title}</h4>
        <p className={styles.place}>{[item.contract, item.location].filter(Boolean).join(" · ")}</p>
        <p className={styles.body}>{item.description}</p>
        {item.highlights?.length ? <ul className={styles.highlights}>
          {item.highlights.map(highlight => <li key={highlight}>{highlight}</li>)}
        </ul> : null}
      </article>
    </li>)}
  </ol>;
}

export function Experience() {
  const { language, t } = useLanguage();
  return <section id="experience" aria-labelledby="experience-title" className={`surface-paper ${styles.chapter} ${styles.experience}`}>
    <div className={styles.frame}>
      <header className={styles.aside}>
        <h2 id="experience-title">{t.experience.subtitle}</h2>
        <p>{t.experience.desc}</p>
        <a href="/cv/CV_Alex_Vicente_Lopez.pdf?v=2026-09" download data-track="cv-download" className={`action-primary ${styles.cv}`}>
          {language === "es" ? "Descargar CV (PDF)" : "Download CV (PDF)"}<Download aria-hidden="true" />
        </a>
      </header>
      <div className={`experience-timelines ${styles.timelines}`}>
        {/* Experience comes first for recruiter scanning */}
        <h3 id="experience-work">{t.experience.job_title}</h3>
        <Timeline items={t.experience.experience_list} labelledBy="experience-work" />
        {/* Education */}
        <h3 id="experience-education">{t.experience.edu_title}</h3>
        <Timeline items={t.experience.education_list} labelledBy="experience-education" />
      </div>
    </div>
  </section>;
}
