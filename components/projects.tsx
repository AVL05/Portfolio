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
  featured = false,
  viewLive,
  viewCode,
  roleLabel,
  outcomeLabel,
  caseStudyLabel,
  index,
}: {
  project: Project;
  featured?: boolean;
  viewLive: string;
  viewCode: string;
  roleLabel: string;
  outcomeLabel: string;
  caseStudyLabel: string;
  index: number;
}) {
  const imageClass = containedImages.has(project.title)
    ? "object-contain p-8 sm:p-10"
    : "object-cover";
  const caseStudyHref =
    project.github === "https://github.com/AVL05/raw-manager"
      ? "/proyectos/raw-manager"
      : project.github === "https://github.com/AVL05/distrito-gourmet"
        ? "/proyectos/distrito-gourmet"
        : undefined;

  return (
    <article
      className={`project-card group relative h-fit self-start overflow-hidden rounded-xl border border-border/65 bg-card/82 transition-all duration-500 hover:-translate-y-1 hover:border-primary/45 ${
        featured ? "lg:col-span-7" : "lg:col-span-5"
      }`}
    >
      <div className="relative aspect-[16/9] overflow-hidden bg-secondary">
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className={`${imageClass} transition-transform duration-700 ease-out group-hover:scale-[1.04]`}
          sizes={
            featured
              ? "(max-width: 1024px) 100vw, 58vw"
              : "(max-width: 1024px) 100vw, 42vw"
          }
        />
        <div className="absolute inset-0 bg-linear-to-t from-background/55 via-transparent to-transparent" />
        <div className="absolute left-4 top-4 rounded-md border border-border/60 bg-background/70 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-muted-foreground backdrop-blur-md">
          {String(index + 1).padStart(2, "0")} / {project.type}
        </div>
      </div>

      <div className="flex flex-col justify-between gap-5 p-5 sm:p-6">
        <div className="space-y-3.5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-secondary px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-primary">
              {project.category}
            </span>
            {featured && (
              <span className="rounded-md border border-border/70 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
                Featured
              </span>
            )}
          </div>

          <h3
            className={`${featured ? "text-2xl sm:text-3xl" : "text-2xl"} text-balance font-black leading-tight text-foreground`}
          >
            {project.title}
          </h3>
          <p className="max-w-2xl overflow-hidden text-sm font-medium leading-relaxed text-muted-foreground [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] sm:text-base">
            {project.description}
          </p>
          {featured && (project.role || project.outcome) && (
            <dl className="grid gap-2 border-t border-border/45 pt-3 sm:grid-cols-2">
              {project.role && (
                <div className="rounded-lg bg-background/25 p-3">
                  <dt className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-primary/80">
                    {roleLabel}
                  </dt>
                  <dd className="overflow-hidden text-xs font-medium leading-relaxed text-foreground/82 [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2]">
                    {project.role}
                  </dd>
                </div>
              )}
              {project.outcome && (
                <div className="rounded-lg bg-background/25 p-3">
                  <dt className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.14em] text-primary/80">
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
            {project.technologies.slice(0, featured ? 6 : 4).map((tech) => (
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
                className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              >
                <Link href={caseStudyHref}>
                  {caseStudyLabel}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
            )}
            {project.link && (
              <Button
                asChild
                size="sm"
                className={`rounded-lg ${
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
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </Button>
            )}
            {project.github && (
              <Button
                asChild
                variant="outline"
                size="sm"
                className="rounded-lg border-border/70 bg-background/25"
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
      const cards = q(".project-card");

      if (prefersReducedMotion()) {
        gsap.set(cards, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        cards,
        { autoAlpha: 0, y: 42 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.75,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 72%",
            once: true,
          },
        },
      );
    },
    { scope: containerRef, dependencies: [activeCategory] },
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
                className={`rounded-lg px-4 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.14em] transition-all duration-300 focus-visible:ring-2 focus-visible:ring-primary/50 ${
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

        <div className="grid items-start gap-5 lg:grid-cols-12">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.title}
              project={project}
              featured={index === 0}
              viewLive={t.projects.view_live}
              viewCode={t.projects.view_code}
              roleLabel={t.projects.role_label}
              outcomeLabel={t.projects.outcome_label}
              caseStudyLabel={language === "es" ? "Ver caso" : "View case"}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
