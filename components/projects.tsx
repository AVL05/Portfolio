"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import { LiquidReveal } from "@/components/liquid-reveal";

const smallImageProjects = [
  "Llibret Falla el Molí 24/25",
  "Arquitectura XML Educativa",
];

function ProjectCard({
  project,
  index,
  t,
}: {
  project: any;
  index: number;
  t: any;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const projectNumber = (index + 1).toString().padStart(2, "0");

  return (
    <article ref={cardRef} className="project-card group h-full">
      <div className="premium-card h-full flex flex-col">
        <div className="absolute top-6 left-6 z-30 font-mono text-[10px] text-muted-foreground/60 tracking-widest uppercase">
          Project{" "}
          <span className="text-primary font-bold">{projectNumber}</span>
        </div>

        <div className="relative aspect-16/10 overflow-hidden">
          <Image
            src={project.image || "/placeholder.svg"}
            alt={project.title}
            fill
            className={`transition-all duration-700 ease-out group-hover:scale-[1.025] ${smallImageProjects.includes(project.title) ? "p-8 object-contain" : "object-cover"}`}
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-linear-to-t from-background/85 via-background/10 to-transparent opacity-45 group-hover:opacity-65 transition-opacity duration-300" />

          <div className="absolute top-6 right-6 z-30">
            <div className="px-3 py-1 bg-secondary/80 border border-border rounded-full">
              <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                {project.category}
              </span>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6 relative flex flex-col grow">
          <div className="space-y-4">
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-[10px] font-mono font-bold uppercase tracking-[0.22em] text-primary/70">
                <ArrowUpRight className="h-3.5 w-3.5" />
                {project.type}
              </p>
              <h3 className="text-2xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
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
                className="px-3 py-1 bg-secondary border border-border rounded-lg text-[10px] font-mono text-muted-foreground uppercase tracking-widest"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="mt-auto flex flex-col sm:flex-row gap-3 pt-2">
            {project.link && (
              <Button
                asChild
                className="h-11 rounded-xl bg-primary text-primary-foreground font-bold"
              >
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t.projects.view_live}
                </a>
              </Button>
            )}
            {project.github && (
              <Button
                variant="outline"
                asChild
                className="h-11 rounded-xl border-border bg-secondary/40"
              >
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
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

function ProjectCardWrapper({
  project,
  index,
  t,
}: {
  project: any;
  index: number;
  t: any;
}) {
  return (
    <LiquidReveal>
      <ProjectCard project={project} index={index} t={t} />
    </LiquidReveal>
  );
}

import { RevealHeader } from "@/components/reveal-header";

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

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === categories[0]) return true;
    return project.category === activeCategory;
  });

  return (
    <section
      id="projects"
      ref={containerRef}
      className="section-padding bg-background relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/3 mask-[linear-gradient(to_left,black,transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16 sm:mb-0">
          <RevealHeader
            title={t.projects.title}
            subtitle={t.projects.subtitle}
            className="mb-0 sm:mb-0"
          />

          <div className="flex gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${activeCategory === category ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground/50 hover:text-foreground"}`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        <div className="projects-grid grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10">
          {filteredProjects.map((project, index) => (
            <ProjectCardWrapper
              key={project.title}
              project={project}
              index={index}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
