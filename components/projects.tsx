"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import { RevealHeader } from "@/components/reveal-header";

interface Project {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  category: string;
  link?: string;
  github?: string;
  type: string;
  role?: string;
  outcome?: string;
}

const containedImages = new Set([
  "Llibret Falla el Molí 24/25",
  "Arquitectura XML Educativa",
  "Educational XML project",
]);

function ProjectCard({
  project,
  viewLive,
  viewCode,
  roleLabel,
  outcomeLabel,
  caseStudyLabel,
  caseStudyBadge,
  index,
}: {
  project: Project;
  viewLive: string;
  viewCode: string;
  roleLabel: string;
  outcomeLabel: string;
  caseStudyLabel: string;
  caseStudyBadge: string;
  index: number;
}) {
  const imageClass = containedImages.has(project.title)
    ? "object-contain p-8 sm:p-10"
    : project.image?.includes("raw-manager-cover") ||
        project.image?.includes("api-hotel-cover")
      ? "object-contain"
      : "object-cover";
  const caseStudyHref =
    project.github === "https://github.com/AVL05/raw-manager"
      ? "/proyectos/raw-manager"
      : project.github === "https://github.com/AVL05/distrito-gourmet"
        ? "/proyectos/distrito-gourmet"
        : undefined;
  const reverseLayout = index % 2 === 1;

  return (
    <article
      className="project-row group grid overflow-hidden rounded-xl border border-border/65 bg-card/82 transition-colors duration-300 hover:border-primary/45 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]"
    >
      <div
        className={`project-visual relative aspect-[16/10] overflow-hidden bg-secondary lg:aspect-auto lg:min-h-[360px] ${
          reverseLayout ? "lg:order-2" : ""
        }`}
      >
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className={`${imageClass} transition-transform duration-500 ease-out group-hover:scale-[1.025]`}
          sizes="(max-width: 1024px) 100vw, 45vw"
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/55 via-transparent to-transparent transition-opacity duration-300 group-hover:opacity-75" />
        <div className="absolute left-4 top-4 rounded-md border border-border/60 bg-background/70 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-md">
          {String(index + 1).padStart(2, "0")} / {project.type}
        </div>
      </div>

      <div className="flex min-w-0 flex-col justify-between gap-6 p-5 sm:p-7 lg:min-h-[360px] lg:p-9">
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-secondary px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              {project.category}
            </span>
            {caseStudyHref && (
              <span className="rounded-md border border-border/70 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {caseStudyBadge}
              </span>
            )}
          </div>

          <h3 className="text-balance text-2xl font-black leading-tight text-foreground sm:text-3xl lg:min-h-[4.5rem]">
            {project.title}
          </h3>
          <p className="max-w-2xl overflow-hidden text-sm font-medium leading-relaxed text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] sm:text-base lg:[-webkit-line-clamp:2]">
            {project.description}
          </p>
          {(project.role || project.outcome) && (
            <dl className="grid border-y border-border/45 sm:grid-cols-2">
              {project.role && (
                <div className="py-3 sm:pr-4">
                  <dt className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-primary/80">
                    {roleLabel}
                  </dt>
                  <dd className="overflow-hidden text-xs font-medium leading-relaxed text-foreground/82 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                    {project.role}
                  </dd>
                </div>
              )}
              {project.outcome && (
                <div className="border-t border-border/45 py-3 sm:border-l sm:border-t-0 sm:pl-4">
                  <dt className="mb-1.5 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-primary/80">
                    {outcomeLabel}
                  </dt>
                  <dd className="overflow-hidden text-xs font-medium leading-relaxed text-foreground/82 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                    {project.outcome}
                  </dd>
                </div>
              )}
            </dl>
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 5).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-border/55 bg-background/35 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {caseStudyHref && (
              <Button
                asChild
                size="sm"
                className="group/cta min-h-11 rounded-lg bg-primary px-4 text-primary-foreground hover:bg-primary/90"
              >
                <Link href={caseStudyHref}>
                  {caseStudyLabel}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </Link>
              </Button>
            )}
            {project.link && (
              <Button
                asChild
                size="sm"
                className={`group/cta min-h-11 rounded-lg px-4 ${
                  caseStudyHref
                    ? "border border-border/70 bg-background/25 text-foreground hover:border-primary/45 hover:bg-primary/10 hover:text-primary"
                    : "bg-primary text-primary-foreground hover:bg-primary/90"
                }`}
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${viewLive}: ${project.title}`}
                >
                  {viewLive}
                  <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                </a>
              </Button>
            )}
            {project.github && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="min-h-11 rounded-lg border-border/70 bg-background/25 px-4"
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${viewCode}: ${project.title}`}
                >
                  <FaGithub className="h-3.5 w-3.5" />
                  {viewCode}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLElement>(null);
  const { t, language } = useLanguage();
  const projects = t.projects.items as Project[];
  const categories = useMemo(
    () =>
      language === "es"
        ? ["Todos", "Desarrollo Web", "Diseño Gráfico"]
        : ["All", "Web Development", "Graphic Design"],
    [language],
  );
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  useEffect(() => {
    setActiveCategory(categories[0]);
  }, [language, categories]);

  const filteredProjects = projects.filter((project) =>
    activeCategory === categories[0]
      ? true
      : project.category === activeCategory,
  );

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const rows = q(".project-row");
      const visuals = q(".project-visual");

      if (prefersReducedMotion()) {
        gsap.set(rows, { y: 0 });
        gsap.set(visuals, { scale: 1 });
        return;
      }

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 74%",
          once: true,
        },
      });

      timeline
        .fromTo(
          rows,
          { y: 24 },
          {
            y: 0,
            duration: 0.65,
            ease: "expo.out",
            stagger: 0.06,
          },
        )
        .fromTo(
          visuals,
          { scale: 0.985 },
          {
            scale: 1,
            duration: 0.7,
            ease: "expo.out",
            stagger: 0.06,
          },
          0,
        );
    },
    {
      scope: containerRef,
      dependencies: [activeCategory],
      revertOnUpdate: true,
    },
  );

  return (
    <section
      id="projects"
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 glow-divider" />
      <div className="pointer-events-none absolute right-[-12rem] top-24 h-[34rem] w-[34rem] rounded-full bg-primary/7 blur-[120px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <RevealHeader
            title={t.projects.title}
            subtitle={t.projects.subtitle}
            description={t.projects.desc}
            className="mb-0"
          />
          <div className="flex flex-wrap gap-2 md:justify-end">
            {categories.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`min-h-11 rounded-lg px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary/50 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground"
                    : "border border-border/70 bg-card/55 text-muted-foreground hover:border-primary/45 hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-5 sm:space-y-6">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              viewLive={t.projects.view_live}
              viewCode={t.projects.view_code}
              roleLabel={t.projects.role_label}
              outcomeLabel={t.projects.outcome_label}
              caseStudyLabel={language === "es" ? "Ver caso" : "View case"}
              caseStudyBadge={
                language === "es" ? "Caso completo" : "Full case study"
              }
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
