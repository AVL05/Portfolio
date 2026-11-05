"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useRef } from "react";
import styles from "./projects.module.css";
import { deferToViewport, gsap, motion, revealTrigger, useGSAP } from "@/lib/gsap";
import { useLanguage, type ProjectItem as Project } from "@/lib/language-context";
import { localizeHref } from "@/lib/i18n-paths";
import { FEATURED_MEDIA, claimViewTransition } from "@/lib/featured-work";

const featuredIndexes = [0, 1, 2];

const layouts = ["restaurant", "product", "photography"] as const;

// Second real view per project; captions say exactly what each capture shows.
const secondaryCaptions = {
  es: ["Backoffice · fotograma de la demo grabada", "Entrega · captura con datos de ejemplo", "Series · captura del sitio publicado"],
  en: ["Back office · frame from the recorded demo", "Delivery · screenshot with sample data", "Series · published website screenshot"],
} as const;

const secondaryAlts = {
  es: ["Panel de administración de Distrito Gourmet", "Flujo de entrega de LumaFlow Studio con datos de ejemplo", "Página de serie de raw.vives"],
  en: ["Distrito Gourmet administration panel", "LumaFlow Studio delivery workflow with sample data", "raw.vives series page"],
} as const;

function ProjectScene({ project, index, total, language }: {
  project: Project; index: number; total: number; language: "es" | "en";
}) {
  const media = FEATURED_MEDIA[index];
  const frameRef = useRef<HTMLAnchorElement>(null);
  const contactHref = localizeHref("/#contact", language);
  const action = project.caseStudyHref ? (language === "es" ? "Ver caso de estudio" : "View case study")
    : language === "es" ? "Ver código" : "View code";
  const number = String(index + 1).padStart(2, "0");
  const labels = language === "es"
    ? { role: "Mi parte", evidence: "Evidencia", stack: "Stack" }
    : { role: "My part", evidence: "Evidence", stack: "Stack" };

  return <article id={`work-${index + 1}`} className={`project-scene ${styles.scene}`} data-layout={layouts[index]} data-tone={media?.tone} aria-labelledby={`project-title-${index}`}>
    <header className={`scene-copy ${styles.heading}`}>
      <h3 id={`project-title-${index}`}>{project.title}</h3>
      <p className={styles.type}><span className={styles.number}>{number} / {String(total).padStart(2, "0")}</span>{project.type}</p>
      <p className={styles.summary}>{project.description}</p>
    </header>

    <div className={styles.composition}>
      <figure className={styles.primary}>
        {project.caseStudyHref ? <a ref={frameRef} href={project.caseStudyHref} className={styles.frame}
          aria-label={`${action}: ${project.title}`}
          onClick={() => media && claimViewTransition(frameRef.current?.querySelector<HTMLElement>(".scene-media") ?? null, media.slug)}>
          <span className={`scene-media ${styles.imagePlane}`}>
            <Image src={project.image} alt={project.imageAlt ?? `${project.title} — ${project.summary}`} fill
              loading="lazy" sizes="(max-width: 1023px) 92vw, 70vw" className={`scene-image ${styles.image}`} />
          </span>
        </a> : null}
        <figcaption className={styles.caption}>
          <span>{project.imageCaption}</span>
          <span className={styles.captionAction}>{action}<ArrowUpRight aria-hidden="true" /></span>
        </figcaption>
      </figure>
      {media ? <figure className={styles.secondary}>
        <span className={styles.secondaryPlane}>
          <Image src={media.secondary} alt={secondaryAlts[language][index]} fill loading="lazy"
            sizes="(max-width: 1023px) 70vw, 36vw" className={styles.image} />
        </span>
        <figcaption className={styles.caption}><span>{secondaryCaptions[language][index]}</span></figcaption>
      </figure> : null}
    </div>

    <div className={styles.details}>
      <dl className={styles.ledger}>
        <div><dt>{labels.role}</dt><dd className={styles.role}>{project.role}</dd></div>
        <div><dt>{labels.evidence}</dt><dd>
          <ul aria-label={language === "es" ? "Resultados" : "Outcomes"} className={styles.evidence}>
            {project.evidence.map(item => <li key={item}>{item}</li>)}
          </ul>
        </dd></div>
        <div><dt>{labels.stack}</dt><dd>
          <ul className={styles.stack} aria-label={language === "es" ? "Tecnologías" : "Technologies"}>
            {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
          </ul>
        </dd></div>
      </dl>
      <div className={styles.actions}>
        {project.caseStudyHref ? <a className="action-primary" href={project.caseStudyHref}>
          {language === "es" ? "Ver caso de estudio" : "View case study"}<ArrowRight aria-hidden="true" /></a> : null}
        {project.caseStudyHref ? <a className="cinema-link" href={`${project.caseStudyHref}#decisions`}>
          {language === "es" ? "Decisiones técnicas" : "Technical decisions"}<ArrowUpRight aria-hidden="true" /></a> : null}
        {project.link ? <a className="cinema-link" href={project.link} target="_blank" rel="noopener noreferrer">
          {language === "es" ? "Ver sitio" : "Live site"}<ArrowUpRight aria-hidden="true" /></a> : null}
        {project.repositoryPrivate ? <>
          <a className="cinema-link" href={contactHref}>{language === "es" ? "Consultar proyecto" : "Ask about this project"}<ArrowUpRight aria-hidden="true" /></a>
          <span className="inline-flex items-center gap-2 text-muted-foreground"><FaGithub aria-hidden="true" />{language === "es" ? "Código privado" : "Private code"}</span>
        </> : project.github ? <a className="cinema-link" href={project.github} target="_blank" rel="noopener noreferrer">
          <FaGithub aria-hidden="true" />GitHub</a> : null}
      </div>
    </div>
  </article>;
}

export function Projects() {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const projects: Project[] = t.projects.items;
  const featured = featuredIndexes.map((index) => projects[index]).filter(Boolean);
  const archive = projects.filter((_, index) => !featuredIndexes.includes(index));

  useGSAP((_, contextSafe) => deferToViewport(containerRef.current?.querySelector(".scene-copy") ?? null, contextSafe!(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".project-scene", containerRef.current).forEach(scene => {
        const desktop = window.matchMedia("(min-width: 1024px)").matches;
        gsap.timeline({ scrollTrigger: revealTrigger(scene) })
          .from(scene.querySelector(".scene-copy h3"), { yPercent: 40, autoAlpha: 0, duration: motion.duration.title, ease: motion.ease.out, clearProps: "transform,opacity,visibility" })
          .from(scene.querySelector(`.${styles.frame}`), { clipPath: motion.mask, duration: motion.duration.mask, ease: motion.ease.reveal, clearProps: "clipPath" }, .05)
          .from(scene.querySelector(`.${styles.secondary}`), { y: desktop ? 40 : motion.distance.content, autoAlpha: 0, duration: motion.duration.title, ease: motion.ease.out, clearProps: "transform,opacity,visibility" }, .2);
      });
    });
    return () => media.revert();
  })), { scope: containerRef });

  return <section id="projects" ref={containerRef} aria-labelledby="projects-title" className={`relative bg-background ${styles.work}`}>
    <header className={styles.intro}>
      <h2 id="projects-title">{language === "es" ? <>Proyectos, <span className="accent-serif">de la interfaz a los datos.</span></> : <>Work, <span className="accent-serif">from interface to data.</span></>}</h2>
      <p>{t.projects.desc}</p>
    </header>
    <div className={styles.featured} data-project-deck>
      {featured.map((project, index) => <ProjectScene key={project.title} project={project} index={index} total={featured.length} language={language} />)}
    </div>
    <div className={styles.archive}>
      <div className={styles.archiveHead}>
        <h3>{language === "es" ? "Otros proyectos" : "Other projects"}</h3>
        <a href="https://github.com/AVL05" target="_blank" rel="noopener noreferrer" className="cinema-link text-sm">
          <FaGithub aria-hidden="true" />{language === "es" ? "Más código en GitHub" : "More code on GitHub"}<ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <ul className={styles.archiveList}>
        {archive.map((project, index) => <li key={project.title}>
          <article className={styles.archiveRow}>
            <span className={styles.archiveNumber} aria-hidden="true">{String(index + 4).padStart(2, "0")}</span>
            <span className={styles.archiveThumb}>
              <Image src={project.image} alt={`${project.title} — ${project.summary}`} fill sizes="(max-width: 767px) 30vw, 10rem" loading="lazy" />
            </span>
            <div className={styles.archiveText}>
              <h4>{project.title}</h4>
              <p>{project.summary}</p>
            </div>
            <p className={styles.archiveStack}>{project.technologies.slice(0, 3).join(" · ")}</p>
            <div className={styles.archiveLinks}>
              {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="cinema-link" aria-label={project.title + (language === "es" ? ": ver demo" : ": view demo")}>Demo <ArrowUpRight aria-hidden="true" /></a>}
              {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="cinema-link" aria-label={`${language === "es" ? "Ver código" : "View code"} — ${project.title}: GitHub`}>{language === "es" ? "Ver código" : "View code"}<ArrowUpRight aria-hidden="true" /></a>}
              {!project.link && !project.github && <span className="inline-flex min-h-11 items-center text-muted-foreground">{language === "es" ? "Proyecto privado" : "Private project"}</span>}
            </div>
          </article>
        </li>)}
      </ul>
    </div>
  </section>;
}
