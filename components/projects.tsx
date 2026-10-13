"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";
import styles from "./projects.module.css";
import { deferToViewport, gsap, motion, revealTrigger, useGSAP } from "@/lib/gsap";
import { useLanguage, type ProjectItem as Project } from "@/lib/language-context";
import { localizeHref } from "@/lib/i18n-paths";

const featuredIndexes = [0, 1, 2];

const viewTransitionName = (project: Project) =>
  `project-${project.caseStudyHref?.split("/").pop() ?? "editorial"}`;

const layouts = ["restaurant", "product", "photography"] as const;

function ProjectScene({ project, index, total, language }: {
  project: Project; index: number; total: number; language: "es" | "en";
}) {
  const [preview, setPreview] = useState(false);
  const [previewRequested, setPreviewRequested] = useState(false);
  const [previewReady, setPreviewReady] = useState(false);
  const previewQuery = "(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)";
  const showPreview = () => {
    if ((index !== 1 && index !== 2) || !window.matchMedia(previewQuery).matches) return;
    setPreviewRequested(true);
    setPreview(true);
  };
  useEffect(() => {
    if (!previewRequested) return;
    const query = window.matchMedia(previewQuery);
    const reset = () => { if (!query.matches) setPreview(false); };
    query.addEventListener("change", reset);
    reset();
    return () => query.removeEventListener("change", reset);
  }, [previewRequested]);
  const contactHref = localizeHref("/#contact", language);
  const destination = project.caseStudyHref ?? project.link ?? (project.repositoryPrivate ? contactHref : project.github);
  const previewImage = index === 1 ? "/projects/lumaflow-studio-delivery.webp"
    : index === 2 ? "/projects/raw-vives/raw-vives-series.webp" : undefined;
  const media = <div className={`scene-media ${styles.imagePlane}`}>
    <Image src={project.image} alt={project.imageAlt ?? `${project.title} — ${project.summary}`} fill
      loading="lazy" sizes="(max-width: 1023px) 92vw, 60vw"
      className={`scene-image ${styles.image}`} />
    {previewRequested && previewImage ? <Image src={previewImage} alt="" aria-hidden="true" fill loading="lazy"
      onLoad={() => setPreviewReady(true)} data-visible={preview && previewReady}
      sizes="(max-width: 1023px) 92vw, 60vw" className={styles.preview} /> : null}
  </div>;
  const number = `${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`;
  const action = project.caseStudyHref ? (language === "es" ? "Ver caso de estudio" : "View case study")
    : project.repositoryPrivate ? (language === "es" ? "Consultar proyecto" : "Ask about this project")
    : language === "es" ? "Ver código" : "View code";

  return <article className={`project-scene ${styles.scene}`} data-layout={layouts[index]} aria-labelledby={`project-title-${index}`}>
    <div className={styles.inner}>
      <header className={`scene-copy ${styles.heading}`}>
        <h3 id={`project-title-${index}`}>{project.title}</h3>
        <p className={styles.label}><span>{number}</span><span>{project.type}</span></p>
        <p className={styles.summary}>{project.summary}</p>
      </header>
      <figure className={styles.visual}>
        {project.caseStudyHref ? <a href={project.caseStudyHref} data-cursor="project"
          className={styles.frame} style={{ viewTransitionName: viewTransitionName(project) }}
          aria-label={`${action}: ${project.title}`}
          onPointerEnter={event => { if (event.pointerType === "mouse") showPreview(); }}
          onFocus={showPreview}
          onPointerLeave={() => setPreview(false)} onBlur={() => setPreview(false)}>{media}</a>
          : destination ? <a href={destination} target={destination.startsWith("https://") ? "_blank" : undefined} rel="noopener noreferrer" data-cursor="external"
            aria-label={`${action}: ${project.title}`} className={styles.frame}>{media}</a> : <div className={styles.frame}>{media}</div>}
        <figcaption className={styles.caption}>
          {project.imageCaption ? <span>{preview && previewReady && index === 1 ? (language === "es" ? "Entrega · captura con datos de ejemplo" : "Delivery · screenshot with sample data")
            : preview && previewReady && index === 2 ? (language === "es" ? "Series · captura del sitio publicado" : "Series · published website screenshot") : project.imageCaption}</span> : null}
          <span className="inline-flex items-center gap-2">{action}<ArrowUpRight aria-hidden="true" /></span>
        </figcaption>
      </figure>
      <div className={styles.details}>
        <p className={styles.role}>{project.role}</p>
        <ul aria-label={language === "es" ? "Resultados" : "Outcomes"} className={styles.evidence}>
          {project.evidence.map(item => <li key={item}>{item}</li>)}
        </ul>
        <ul className={styles.stack} aria-label={language === "es" ? "Tecnologías" : "Technologies"}>
          {project.technologies.map(technology => <li key={technology}>{technology}</li>)}
        </ul>
        <div className={styles.actions}>
          {project.caseStudyHref ? <a href={project.caseStudyHref} data-cursor="project">
            {language === "es" ? "Ver caso de estudio" : "View case study"}<ArrowRight aria-hidden="true" /></a> : null}
          {project.link ? <a href={project.link} target="_blank" rel="noopener noreferrer">
            {language === "es" ? "Ver sitio" : "Live site"}<ArrowUpRight aria-hidden="true" /></a> : null}
          {project.repositoryPrivate ? <>
            <a href={contactHref}>{action}<ArrowUpRight aria-hidden="true" /></a>
            <span className="inline-flex items-center gap-2 text-muted-foreground"><FaGithub aria-hidden="true" />{language === "es" ? "Código privado" : "Private code"}</span>
          </> : project.github ? <a href={project.github} target="_blank" rel="noopener noreferrer">
            <FaGithub aria-hidden="true" />{project.caseStudyHref ? "GitHub" : language === "es" ? "Ver código" : "View code"}</a> : null}
        </div>
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
        const frame = scene.querySelector(`.${styles.frame}`);
        const title = scene.querySelector(".scene-copy");
        const details = scene.querySelector(`.${styles.details}`);
        gsap.timeline({ scrollTrigger: revealTrigger(scene) })
          .from(frame, { clipPath: motion.mask, duration: motion.duration.mask, ease: motion.ease.reveal })
          .from(title, { y: window.matchMedia("(min-width: 1024px)").matches ? motion.distance.title : motion.distance.small, duration: motion.duration.title, ease: motion.ease.out }, 0)
          .from(details, { y: motion.distance.content, duration: motion.duration.enter, ease: motion.ease.out }, .08);
      });
    });
    media.add("(min-width: 1024px) and (pointer: fine) and (prefers-reduced-motion: no-preference)", () => {
      gsap.utils.toArray<HTMLElement>(".project-scene", containerRef.current).forEach(scene => {
        gsap.fromTo(scene.querySelector(".scene-media"), { y: -motion.distance.parallax }, { y: motion.distance.parallax, ease: "none",
          scrollTrigger: { trigger: scene, start: "top bottom", end: "bottom top", scrub: .5 } });
      });
    });
    return () => media.revert();
  })), { scope: containerRef });

  return <section id="projects" ref={containerRef} aria-labelledby="projects-title" className={`relative bg-background ${styles.work}`}>
    <header className={styles.intro}>
      <div>
        <h2 id="projects-title">{language === "es" ? "Proyectos" : "Work"}</h2>
        <p className={styles.label}>{language === "es" ? "01 / Proyectos seleccionados" : "01 / Selected work"}</p>
      </div>
      <p>{t.projects.desc}</p>
    </header>
    {featured.map((project, index) => <ProjectScene key={project.title} project={project} index={index} total={featured.length} language={language} />)}
    <div className="mx-auto max-w-[100rem] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-border/55 pt-8">
        <h3 className="text-2xl font-semibold tracking-tight">{language === "es" ? "Otros proyectos" : "Other projects"}</h3>
        <a href="https://github.com/AVL05" target="_blank" rel="noopener noreferrer" className="cinema-link min-h-11 text-sm">
          <FaGithub aria-hidden="true" />{language === "es" ? "Más código en GitHub" : "More code on GitHub"}<ArrowUpRight aria-hidden="true" />
        </a>
      </div>
      <div className="mt-6 grid gap-6 md:grid-cols-3">
        {archive.map(project => <article key={project.title} className="group border-b border-border/50 pb-6">
          <div className="relative mb-4 aspect-[2/1] overflow-hidden bg-secondary">
            <Image src={project.image} alt={`${project.title} — ${project.summary}`} fill sizes="(max-width: 767px) 100vw, 33vw" loading="lazy" className="object-cover transition-transform duration-300 motion-safe:group-hover:scale-[1.015] motion-reduce:transition-none" />
          </div>
          <h4 className="text-lg font-semibold tracking-tight">{project.title}</h4>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.summary}</p>
          <p className="mt-3 text-xs text-muted-foreground">{project.technologies.slice(0, 3).join(" · ")}</p>
          <div className="mt-3 flex flex-wrap gap-5 text-xs">
            {project.link && <a href={project.link} target="_blank" rel="noopener noreferrer" className="cinema-link min-h-11" aria-label={project.title + (language === "es" ? ": ver demo" : ": view demo")}>Demo <ArrowUpRight aria-hidden="true" /></a>}
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="cinema-link min-h-11" aria-label={`${language === "es" ? "Ver código" : "View code"} — ${project.title}: GitHub`}>{language === "es" ? "Ver código" : "View code"}<ArrowUpRight aria-hidden="true" /></a>}
            {!project.link && !project.github && <span className="inline-flex min-h-11 items-center text-muted-foreground">{language === "es" ? "Proyecto privado" : "Private project"}</span>}
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
