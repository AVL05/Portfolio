"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { TechList } from "@/components/tech-chip";
import { localizeHref } from "@/lib/i18n-paths";
import { useLanguage } from "@/lib/language-context";
import { FEATURED_PROJECTS, OTHER_PROJECTS, SKILLS } from "@/lib/projects";
import styles from "./projects.module.css";

/** The three featured projects: thumbnail, links, one sentence and the stack. */
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
                sizes="(min-width: 49rem) 44rem, 100vw"
              />
            </div>
            <div className={styles.body}>
              <div className={styles.head}>
                <h3>
                  <Link href={localizeHref(`/proyectos/${project.slug}`, language)} className={styles.titleLink}>
                    {project.title}
                    <span className="sr-only"> · {copy.case}</span>
                  </Link>
                </h3>
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
              <p className={styles.description}>{text.description}</p>
              {text.evidence.length ? <p className={styles.evidence}>{text.evidence.join(" · ")}</p> : null}
              <TechList items={project.tech} locale={language} label={language === "es" ? "Tecnologías" : "Technologies"} />
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
    <ul className={styles.other}>
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
  );
}

export function Skills() {
  const { language } = useLanguage();
  return <TechList items={SKILLS} locale={language} label={language === "es" ? "Habilidades" : "Skills"} />;
}
