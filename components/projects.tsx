"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { TechList } from "@/components/tech-chip";
import { useLanguage } from "@/lib/language-context";
import { FEATURED_PROJECTS, OTHER_PROJECTS, SKILLS } from "@/lib/projects";
import styles from "./projects.module.css";

/** Featured work with a short summary and direct links. */
export function FeaturedProjects() {
  const { language, t } = useLanguage();
  const copy = t.projects;

  return (
    <ul className={styles.featured}>
      {FEATURED_PROJECTS.map((project) => {
        const text = copy.featured.find((item) => item.slug === project.slug);
        if (!text) return null;
        return (
          <li key={project.slug} className={styles.card} data-reveal>
            <div className={styles.thumb}>
              <Image
                src={project.image}
                alt={text.alt}
                width={project.width}
                height={project.height}
                sizes="(min-width: 56rem) 22rem, (min-width: 40rem) 40vw, 100vw"
              />
            </div>
            <div className={styles.body}>
              <p className={styles.category}>{text.category}</p>
              <h3>{project.title}</h3>
              <p className={styles.description}>{text.description}</p>
              {text.evidence.length ? <p className={styles.evidence}>{text.evidence.join(" · ")}</p> : null}
              <TechList items={project.tech} locale={language} label={language === "es" ? "Tecnologías" : "Technologies"} />
              <div className={styles.links}>
                {project.live ? (
                  <a href={project.live} target="_blank" rel="noopener noreferrer">
                    {copy.live}<ArrowUpRight aria-hidden="true" />
                    <span className="sr-only"> · {project.title}</span>
                  </a>
                ) : null}
                <a href={project.code} target="_blank" rel="noopener noreferrer">
                  <FaGithub aria-hidden="true" />{copy.code}
                  <span className="sr-only"> · {project.title}</span>
                </a>
              </div>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/** Secondary work: one compact row per project, code link only. */
export function OtherProjects() {
  const { language, t } = useLanguage();

  return (
    <details className={styles.more}>
      <summary className={`pill pill-secondary ${styles.moreToggle}`}>
        <span className={styles.showMore}>{t.projects.showMore}</span>
        <span className={styles.hideMore}>{t.projects.hideMore}</span>
        <ChevronDown aria-hidden="true" />
      </summary>
      <ul id="other" className={styles.other} aria-label={t.projects.otherLabel}>
        {OTHER_PROJECTS.map((project) => {
          const text = t.projects.other.find((item) => item.slug === project.slug);
          if (!text) return null;
          return (
            <li key={project.slug}>
              <div className={styles.otherMain}>
                <h3>
                  <a href={project.code} target="_blank" rel="noopener noreferrer">
                    {text.title}<ArrowUpRight aria-hidden="true" />
                    <span className="sr-only"> · {t.projects.code}</span>
                  </a>
                </h3>
                <p>{text.description}</p>
              </div>
              {project.tech.length ? <TechList items={project.tech} locale={language} /> : null}
            </li>
          );
        })}
      </ul>
    </details>
  );
}

export function Skills() {
  const { language, t } = useLanguage();
  return (
    <div className={styles.skills}>
      <p className={styles.description}>{t.skillsSummary}</p>
      <TechList items={SKILLS} locale={language} label={t.sections.skills} />
    </div>
  );
}
