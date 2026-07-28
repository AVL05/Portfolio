"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, ChevronDown } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useRef, useState } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";

interface Project {
  title: string;
  description: string;
  image: string;
  technologies: string[];
  category: string;
  link?: string;
  github?: string;
  type: string;
  role?: string;
  outcome?: string;
  caseStudyHref?: string;
}

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
      className="scene-media relative h-full min-h-[44dvh] overflow-hidden bg-[#171714] will-change-transform md:min-h-[68dvh]"
      style={{ viewTransitionName: viewTransitionName(project) }}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className={`scene-image will-change-transform ${
          project.image.includes("raw-manager") || project.image.includes("Falla")
            ? "object-contain p-[8%]"
            : "object-cover"
        }`}
        sizes="(max-width: 900px) 100vw, 64vw"
        priority={index === 0}
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,rgba(8,8,7,.62))]" />
      <span className="absolute left-4 top-4 border border-white/20 bg-black/55 px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[.14em] text-white sm:left-6 sm:top-6">
        {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </span>
    </div>
  );

  return (
    <article className="project-scene relative border-t border-border/55 py-10 sm:py-14 md:min-h-[96dvh] md:py-20">
      <div className="mx-auto grid max-w-[100rem] gap-6 px-4 sm:px-6 md:grid-cols-[minmax(280px,.55fr)_minmax(0,1.45fr)] md:items-center lg:px-8">
        <div className="scene-copy z-10 flex flex-col md:pr-6">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[.15em] text-primary">
            {project.type} / {project.category}
          </p>
          <h3 className="mt-5 text-[clamp(2.8rem,7vw,7.5rem)] font-black leading-[.82] tracking-[-.065em] text-foreground">
            {project.title}
          </h3>
          <p className="mt-6 max-w-[50ch] text-base font-medium leading-relaxed text-foreground/68 sm:text-lg">
            {project.description}
          </p>

          {project.role && (
            <div className="mt-7 border-l border-primary pl-4">
              <p className="font-mono text-[11px] uppercase tracking-[.14em] text-muted-foreground">
                {language === "es" ? "Responsabilidad" : "Responsibility"}
              </p>
              <p className="mt-2 max-w-[52ch] text-sm font-medium leading-relaxed text-foreground/82">
                {project.role}
              </p>
            </div>
          )}

          {project.outcome && (
            <div className="mt-5 border-l border-foreground/28 pl-4">
              <p className="font-mono text-[11px] uppercase tracking-[.14em] text-muted-foreground">
                {language === "es" ? "Resultado verificable" : "Verified outcome"}
              </p>
              <p className="mt-2 max-w-[52ch] text-sm font-medium leading-relaxed text-foreground/72">
                {project.outcome}
              </p>
            </div>
          )}

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
                {language === "es" ? "Abrir caso" : "Open case"}
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            )}
            {project.link && (
              <a data-cursor="external" href={project.link} target="_blank" rel="noopener noreferrer" className="cinema-link text-[11px]">
                {language === "es" ? "Producto" : "Live"} <ArrowUpRight />
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
          <Link data-cursor="project" href={project.caseStudyHref} aria-label={`${language === "es" ? "Abrir caso" : "Open case"}: ${project.title}`} className="scene-link block">
            {media}
          </Link>
        ) : (
          <a data-cursor="external" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={project.title} className="scene-link block">
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
  const [archiveOpen, setArchiveOpen] = useState(false);
  const projects = t.projects.items as Project[];
  const featured = featuredIndexes.map((index) => projects[index]).filter(Boolean);
  const archive = projects.filter((_, index) => !featuredIndexes.includes(index));

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      if (prefersReducedMotion()) {
        gsap.set([q(".scene-media"), q(".scene-image"), q(".scene-copy")], {
          clearProps: "opacity,visibility,transform,clipPath",
          autoAlpha: 1,
        });
        return;
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        q(".project-scene").forEach((scene) => {
          const media = scene.querySelector(".scene-media");
          const image = scene.querySelector(".scene-image");
          const copy = scene.querySelector(".scene-copy");
          gsap
            .timeline({
              scrollTrigger: {
                trigger: scene,
                start: "top 88%",
                end: "bottom 12%",
                scrub: 1,
              },
            })
            .fromTo(media, { clipPath: "inset(8% 7% 8% 7%)" }, { clipPath: "inset(0% 0% 0% 0%)", ease: "none" }, 0)
            .fromTo(image, { scale: 1.12 }, { scale: 1.01, ease: "none" }, 0)
            .fromTo(copy, { y: 70 }, { y: -25, ease: "none" }, 0);
        });
      });
      mm.add("(max-width: 767px)", () => {
        gsap.fromTo(
          q(".project-scene"),
          { autoAlpha: 0, y: 28 },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.06,
            scrollTrigger: { trigger: containerRef.current, start: "top 75%", once: true },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: containerRef, dependencies: [language], revertOnUpdate: true },
  );

  return (
    <section id="projects" ref={containerRef} aria-labelledby="projects-title" className="relative bg-background">
      <header className="mx-auto grid max-w-[100rem] gap-6 px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-32 md:grid-cols-[.7fr_1.3fr] md:items-end lg:px-8">
        <div>
          <p className="section-kicker">01 / Selected work</p>
          <h2 id="projects-title" className="mt-5 text-[clamp(4rem,12vw,11rem)] font-black leading-[.75] tracking-[-.075em]">
            Work
          </h2>
        </div>
        <p className="max-w-[52ch] text-lg font-medium leading-relaxed text-foreground/68 md:justify-self-end md:text-xl">
          {t.projects.desc}
        </p>
      </header>

      {featured.map((project, index) => (
        <ProjectScene key={project.title} project={project} index={index} total={featured.length} language={language} />
      ))}

      <div className="border-y border-border/55 bg-[#0d0d0b] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <details
          className="group/archive mx-auto max-w-[100rem]"
          onToggle={(event) => setArchiveOpen(event.currentTarget.open)}
        >
          <summary
            aria-controls="archive-projects"
            aria-expanded={archiveOpen}
            className="flex min-h-16 cursor-pointer list-none items-end justify-between gap-6 focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-primary [&::-webkit-details-marker]:hidden"
          >
            <div>
              <p className="section-kicker">{language === "es" ? "Trabajo secundario" : "Secondary work"}</p>
              <h3 className="mt-3 text-4xl font-black tracking-[-.05em] sm:text-6xl">
                {language === "es" ? "Archivo" : "Archive"}
              </h3>
            </div>
            <span className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[.14em] text-muted-foreground">
              {archive.length} {language === "es" ? "proyectos" : "projects"}
              <ChevronDown className="h-4 w-4 transition-transform group-open/archive:rotate-180" />
            </span>
          </summary>
          <div
            id="archive-projects"
            aria-hidden={!archiveOpen}
            className={`mt-10 border-t border-border/55 ${archiveOpen ? "block" : "hidden"}`}
          >
              {archive.map((project, index) => (
                <article key={project.title} className="group grid gap-3 border-b border-border/55 py-5 transition-colors hover:border-primary/65 sm:grid-cols-[3rem_minmax(0,1.4fr)_minmax(0,.8fr)_auto] sm:items-center">
                  <span className="font-mono text-[11px] text-muted-foreground">{String(index + 5).padStart(2, "0")}</span>
                  <h4 className="text-xl font-bold tracking-[-.025em] sm:text-2xl">{project.title}</h4>
                  <span className="font-mono text-[11px] uppercase tracking-[.11em] text-muted-foreground">{project.technologies.slice(0, 3).join(" · ")}</span>
                  <div className="flex gap-2">
                    {project.link && <a className="inline-flex min-h-11 min-w-11 items-center justify-center" data-cursor="external" href={project.link} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}: ${language === "es" ? "abrir proyecto" : "open project"}`}><ArrowUpRight className="h-5 w-5" /></a>}
                    {project.github && <a className="inline-flex min-h-11 min-w-11 items-center justify-center" data-cursor="external" href={project.github} target="_blank" rel="noopener noreferrer" aria-label={`${project.title}: GitHub`}><FaGithub className="h-5 w-5" /></a>}
                  </div>
                </article>
              ))}
          </div>
        </details>
      </div>
    </section>
  );
}
