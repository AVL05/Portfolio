"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { useLanguage, type ProjectItem as Project } from "@/lib/language-context";

const featuredIndexes = [0, 1, 2, 6];

const viewTransitionName = (project: Project) =>
  `project-${project.caseStudyHref?.split("/").pop() ?? "editorial"}`;

function ProjectScene({
  project,
  index,
  total,
  language,
}: {
  project: Project;
  index: number;
  total: number;
  language: "es" | "en";
}) {
  const media = (
    <div
      className="scene-media relative h-full min-h-[44dvh] overflow-hidden bg-[#171714] md:min-h-[30rem]"
      style={{ viewTransitionName: viewTransitionName(project) }}
    >
      <Image
        src={project.image}
        alt={`${project.title} — ${project.summary}`}
        fill
        priority={index === 0}
        className={`scene-image ${
          project.image.includes("raw-manager") || project.image.includes("Falla")
            ? "object-contain p-[8%]"
            : "object-cover"
        }`}
        sizes="(max-width: 767px) 100vw, 60vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(8,8,7,.62))]" />
      <span className="absolute left-4 top-4 border border-white/20 bg-black/55 px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[.14em] text-white sm:left-6 sm:top-6">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );

  return (
    <article className="project-scene relative border-t border-border/55 py-10 sm:py-14 md:py-16">
      <div className="mx-auto grid max-w-[100rem] gap-6 px-4 sm:px-6 md:grid-cols-[minmax(280px,.55fr)_minmax(0,1.45fr)] md:items-center md:gap-10 lg:gap-16 lg:px-8">
        <div className="scene-copy z-10 flex min-w-0 flex-col">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[.15em] text-primary">
            {project.type}
          </p>
          <h3 className="mt-5 max-w-full text-balance text-[clamp(2.75rem,4.6vw,5.25rem)] font-black leading-[.98] tracking-[-.06em] text-foreground">
            {project.title}
          </h3>
          <p className="mt-6 max-w-[50ch] text-base font-medium leading-relaxed text-foreground/68 sm:text-lg">
            {project.summary}
          </p>

          <ul aria-label={language === "es" ? "Resultados" : "Outcomes"} className="mt-6 flex flex-wrap gap-2">
            {project.evidence.map((item) => <li key={item} className="border-l-2 border-primary/60 bg-secondary/45 px-3 py-2 font-mono text-xs leading-relaxed text-foreground">{item}</li>)}
          </ul>

          <div className="mt-7 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[11px] font-semibold uppercase tracking-[.11em] text-muted-foreground">
            {project.technologies.slice(0, 6).map((technology) => (
              <span key={technology}>{technology}</span>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            {project.caseStudyHref && (
              <Link
                data-cursor="project"
                href={project.caseStudyHref}
                className="group inline-flex min-h-12 items-center gap-6 border-b border-foreground pb-1 text-xs font-bold uppercase tracking-[.12em] text-foreground transition-colors hover:border-primary hover:text-primary"
              >
                {language === "es" ? "Ver caso de estudio" : "View case study"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            {project.link && (
              <a data-cursor="external" href={project.link} target="_blank" rel="noopener noreferrer" className="cinema-link text-[11px]">
                {language === "es" ? "Ver sitio" : "Live site"} <ArrowUpRight />
              </a>
            )}
            {project.github && (
              <a data-cursor="external" href={project.github} target="_blank" rel="noopener noreferrer" className="cinema-link text-[11px]">
                <FaGithub /> GitHub
              </a>
            )}
          </div>
        </div>

        {project.caseStudyHref ? (
          <Link data-cursor="project" href={project.caseStudyHref} aria-label={`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")} — ${language === "es" ? "Abrir caso" : "Open case"}: ${project.title}`} className="scene-link block">
            {media}
          </Link>
        ) : (
          <a data-cursor="external" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")} — ${project.title}`} className="scene-link block">
            {media}
          </a>
        )}
      </div>
    </article>
  );
}

export function Projects() {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const projects: Project[] = t.projects.items;
  const featured = featuredIndexes.map((index) => projects[index]).filter(Boolean);
  const archive = projects.filter((_, index) => !featuredIndexes.includes(index));

  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.utils.selector(containerRef)(".scene-copy").forEach((copy) => {
        gsap.from(copy, { y: 18, opacity: 0, duration: 0.55,
          scrollTrigger: { trigger: copy, start: "top 90%", once: true } });
      });
    });
    return () => media.revert();
  }, { scope: containerRef });

  return <section id="projects" ref={containerRef} aria-labelledby="projects-title" className="relative bg-background">
    <header className="mx-auto grid max-w-[100rem] gap-6 px-4 pb-16 pt-24 sm:px-6 sm:pt-32 md:grid-cols-[.9fr_1.1fr] md:items-end lg:px-8">
      <div>
        <p className="section-kicker">{language === "es" ? "01 / Proyectos seleccionados" : "01 / Selected work"}</p>
        <h2 id="projects-title" className="mt-5 text-[clamp(3.5rem,8vw,8rem)] font-black leading-[.95] tracking-[-.065em]">{language === "es" ? "Proyectos" : "Work"}</h2>
      </div>
      <p className="max-w-[42ch] text-lg leading-relaxed text-muted-foreground md:justify-self-end">{t.projects.desc}</p>
    </header>
    {featured.map((project, index) => <ProjectScene key={project.title} project={project} index={index} total={featured.length} language={language} />)}
    <div className="mx-auto max-w-[100rem] px-4 pb-16 pt-8 sm:px-6 lg:px-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-border/55 pt-8">
        <h3 className="text-2xl font-semibold tracking-tight">{language === "es" ? "Otros proyectos" : "More experiments"}</h3>
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
            {project.github && <a href={project.github} target="_blank" rel="noopener noreferrer" className="cinema-link min-h-11" aria-label={project.title + ": GitHub"}>{language === "es" ? "Ver código" : "View code"}<ArrowUpRight aria-hidden="true" /></a>}
            {!project.link && !project.github && <span className="inline-flex min-h-11 items-center text-muted-foreground">{language === "es" ? "Proyecto privado" : "Private project"}</span>}
          </div>
        </article>)}
      </div>
    </div>
  </section>;
}
