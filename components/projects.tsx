"use client";

import Image from "next/image";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { TechList } from "@/components/tech-chip";
import { useLanguage } from "@/lib/language-context";
import { FEATURED_PROJECTS, OTHER_PROJECTS, SKILLS, type Project } from "@/lib/projects";
import styles from "./projects.module.css";

function ProjectCard({ project, title, text }: {
  project: Project;
  title: string;
  text: { category: string; description: string; evidence?: readonly string[] };
}) {
  const { language, t } = useLanguage();

  return (
    <li className={styles.card} data-reveal>
      <div className={styles.thumb} data-project={project.slug}>
        <Image
          src={project.image}
          alt=""
          width={project.width}
          height={project.height}
          sizes="(min-width: 56rem) 21rem, (min-width: 40rem) 40vw, calc(100vw - 5rem)"
        />
      </div>
      <div className={styles.body}>
        <p className={styles.category}>{text.category}</p>
        <h3>{title}</h3>
        <p className={styles.description}>{text.description}</p>
        {text.evidence?.length ? <p className={styles.evidence}>{text.evidence.join(" · ")}</p> : null}
        {project.tech.length ? (
          <TechList items={project.tech} locale={language} label={language === "es" ? "Tecnologías" : "Technologies"} />
        ) : null}
        <div className={styles.links}>
          {project.live ? (
            <a href={project.live} target="_blank" rel="noopener noreferrer">
              {t.projects.live}<ArrowUpRight aria-hidden="true" />
              <span className="sr-only"> · {title}</span>
            </a>
          ) : null}
          {project.code ? (
            <a href={project.code} target="_blank" rel="noopener noreferrer">
              <FaGithub aria-hidden="true" />{t.projects.code}
              <span className="sr-only"> · {title}</span>
            </a>
          ) : null}
        </div>
      </div>
    </li>
  );
}

export function FeaturedProjects() {
  const { t } = useLanguage();

  return (
    <ul className={styles.list}>
      {FEATURED_PROJECTS.map((project) => {
        const text = t.projects.featured.find((item) => item.slug === project.slug);
        if (!text) return null;
        return <ProjectCard key={project.slug} project={project} title={project.title} text={text} />;
      })}
    </ul>
  );
}

export function OtherProjects() {
  const { t } = useLanguage();

  return (
    <details className={styles.more}>
      <summary className={`pill pill-secondary ${styles.moreToggle}`}>
        <span className={styles.showMore}>{t.projects.showMore}</span>
        <span className={styles.hideMore}>{t.projects.hideMore}</span>
        <ChevronDown aria-hidden="true" />
      </summary>
      <ul id="other" className={`${styles.list} ${styles.other}`} aria-label={t.projects.otherLabel}>
        {OTHER_PROJECTS.map((project) => {
          const text = t.projects.other.find((item) => item.slug === project.slug);
          if (!text) return null;
          return <ProjectCard key={project.slug} project={project} title={text.title} text={text} />;
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
