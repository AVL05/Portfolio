"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import { LiquidReveal } from "@/components/liquid-reveal";
import { RevealHeader } from "@/components/reveal-header";

const smallImageProjects = [
  "Llibret Falla el Molí 24/25",
  "Arquitectura XML Educativa",
];

function FeaturedProjectCard({ project, t }: { project: any; t: any }) {
  return (
    <LiquidReveal>
      <article className="project-card group col-span-full">
        <div className="premium-card overflow-hidden transform-gpu [transform-style:preserve-3d] group-hover:[transform:perspective(1400px)_rotateX(0.8deg)_translateY(-4px)]">
          <div className="grid lg:grid-cols-[1.1fr_1fr]">
            {/* Image */}
            <div className="relative aspect-video overflow-hidden bg-secondary lg:aspect-auto lg:min-h-[22rem]">
              <Image
                src={project.image || "/placeholder.svg"}
                alt={project.title}
                fill
                className={`transition-all duration-700 ease-out group-hover:scale-[1.03] ${smallImageProjects.includes(project.title) ? "p-8 object-contain" : "object-cover"}`}
                sizes="(max-width: 1024px) 100vw, 55vw"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-r from-transparent via-transparent to-background/80 hidden lg:block" />
              <div className="absolute inset-0 bg-linear-to-t from-background/90 via-background/10 to-transparent lg:hidden" />

              {/* Featured label */}
              <div className="absolute left-5 top-5 z-30">
                <div className="rounded-xl border border-primary/40 bg-primary/15 px-3 py-1 backdrop-blur-md">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary">
                    Featured
                  </span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative flex flex-col justify-between space-y-6 p-7 sm:p-10 lg:p-12">
              <div className="absolute left-5 top-5 z-30 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
                Project <span className="text-primary font-bold">01</span>
              </div>

              <div className="space-y-6 pt-6">
                <p className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-accent/80">
                  <ArrowUpRight className="h-3.5 w-3.5" />
                  {project.type}
                </p>

                <div className="space-y-4">
                  <h3 className="text-3xl font-black leading-tight tracking-normal text-foreground transition-colors group-hover:text-primary sm:text-4xl lg:text-5xl">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <span
                      key={tech}
                      className="rounded-xl border border-border bg-secondary px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3">
                {project.link && (
                  <Button
                    asChild
                    className="h-11 rounded-xl border border-primary/45 bg-primary font-bold text-primary-foreground shadow-[0_16px_34px_-22px_var(--primary)] hover:bg-primary/90"
                  >
                    <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${t.projects.view_live}: ${project.title}`}>
                      <ExternalLink className="mr-2 h-4 w-4" />
                      {t.projects.view_live}
                    </a>
                  </Button>
                )}
                {project.github && (
                  <Button variant="outline" asChild className="h-11 rounded-xl border-border bg-secondary/40">
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub className="mr-2 h-4 w-4" />
                      {t.projects.view_code}
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    </LiquidReveal>
  );
}

function ProjectCard({ project, index, t }: { project: any; index: number; t: any }) {
  const projectNumber = (index + 1).toString().padStart(2, "0");

  return (
    <article className="project-card group h-full">
      <div className="premium-card h-full flex flex-col transform-gpu [transform-style:preserve-3d] group-hover:[transform:perspective(1200px)_rotateX(1.4deg)_rotateY(-1.2deg)_translateY(-6px)]">
        <div className="absolute left-5 top-5 z-30 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/50">
          Project <span className="text-primary font-bold">{projectNumber}</span>
        </div>

        <div className="relative aspect-16/10 overflow-hidden bg-secondary">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className={`transition-all duration-700 ease-out group-hover:scale-[1.025] ${smallImageProjects.includes(project.title) ? "p-8 object-contain" : "object-cover"}`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/92 via-background/4 to-transparent opacity-52 group-hover:opacity-66 transition-opacity duration-300" />

          <div className="absolute right-5 top-5 z-30">
            <div className="max-w-[12rem] rounded-xl border border-border/80 bg-background/75 px-3 py-1 backdrop-blur-md">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                {project.category}
              </span>
            </div>
          </div>
        </div>

        <div className="relative flex grow flex-col space-y-6 border-t border-border/60 p-6 sm:p-8">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-accent/80">
                <ArrowUpRight className="h-3.5 w-3.5" />
                {project.type}
              </p>
              <h3 className="text-2xl font-black leading-tight tracking-normal text-foreground transition-colors group-hover:text-primary">
                {project.title}
              </h3>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech: string) => (
              <span
                key={tech}
                className="rounded-xl border border-border bg-secondary px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-2">
            {project.link && (
              <Button
                asChild
                className="h-11 w-full rounded-xl border border-primary/45 bg-primary font-bold text-primary-foreground shadow-[0_16px_34px_-22px_var(--primary)] hover:bg-primary/90 sm:w-auto"
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${t.projects.view_live}: ${project.title}`}>
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t.projects.view_live}
                </a>
              </Button>
            )}
            {project.github && (
              <Button variant="outline" asChild className="h-11 rounded-xl border-border bg-secondary/40">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="mr-2 h-4 w-4" />
                  {t.projects.view_code}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectCardWrapper({ project, index, t }: { project: any; index: number; t: any }) {
  return (
    <LiquidReveal>
      <ProjectCard project={project} index={index} t={t} />
    </LiquidReveal>
  );
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { t, language } = useLanguage();

  const projects = t.projects.items;
  const categories =
    language === "es"
      ? ["Todos", "Desarrollo Web", "Diseño Gráfico"]
      : ["All", "Web Development", "Graphic Design"];

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const cards = q(".project-card");
      const grid = q(".projects-grid")[0];

      if (prefersReducedMotion()) {
        gsap.set(cards, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          immediateRender: false,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  const filteredProjects = projects.filter((project: any) => {
    if (activeCategory === categories[0]) return true;
    return project.category === activeCategory;
  });

  const [featured, ...rest] = filteredProjects;

  return (
    <section
      id="projects"
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute right-0 top-0 h-full w-1/2 bg-primary/3 mask-[linear-gradient(to_left,black,transparent)]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 flex flex-col justify-between gap-10 md:flex-row md:items-end sm:mb-18">
          <RevealHeader
            title={t.projects.title}
            subtitle={t.projects.subtitle}
            className="mb-0 sm:mb-0"
          />

          <div className="flex w-full flex-wrap gap-2 sm:gap-3 md:w-auto md:justify-end">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`min-h-10 rounded-xl px-4 text-[10px] font-black uppercase tracking-[0.16em] transition-all duration-300 sm:px-5 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-[0_12px_30px_-20px_var(--primary)]"
                    : "border border-border/70 bg-secondary/70 text-muted-foreground hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {/* Featured first project — full width */}
          {featured && <FeaturedProjectCard project={featured} t={t} />}

          {/* Rest in 2-column grid */}
          {rest.map((project: any, index: number) => (
            <ProjectCardWrapper
              key={project.title}
              project={project}
              index={index + 1}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
