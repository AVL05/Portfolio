"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
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
      className="scene-media relative h-full min-h-[44dvh] overflow-hidden bg-[#171714] md:min-h-[68dvh]"
      style={{ viewTransitionName: viewTransitionName(project) }}
    >
      <Image
        src={project.image}
        alt={project.title}
        fill
        className={`scene-image ${
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
      <div className="mx-auto grid max-w-[100rem] gap-6 px-4 sm:px-6 md:grid-cols-[minmax(280px,.55fr)_minmax(0,1.45fr)] md:items-center md:gap-10 lg:gap-16 lg:px-8">
        <div className="scene-copy z-10 flex min-w-0 flex-col">
          <p className="font-mono text-[11px] font-bold uppercase tracking-[.15em] text-primary">
            {project.type} / {project.category}
          </p>
          <h3 className="mt-5 max-w-full text-balance text-[clamp(2.75rem,4.6vw,5.25rem)] font-black leading-[.84] tracking-[-.06em] text-foreground">
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

function ArchivePreviewContent({
  activeIndex,
  archive,
  isLinked,
  label,
  language,
  project,
}: {
  activeIndex: number;
  archive: Project[];
  isLinked: boolean;
  label: string;
  language: "es" | "en";
  project: Project;
}) {
  return (
    <div className="relative aspect-[4/3] overflow-hidden border border-primary/70 bg-[#171714] shadow-[0_24px_70px_rgba(0,0,0,.42)]">
      {archive.map((archiveProject, index) => (
        <div
          key={archiveProject.title}
          className={`absolute inset-0 transition-[opacity,transform] duration-500 ease-[cubic-bezier(.2,.8,.2,1)] motion-reduce:transform-none motion-reduce:transition-none ${
            activeIndex === index
              ? "scale-100 opacity-100"
              : "scale-[1.025] opacity-0"
          }`}
        >
          <Image
            src={archiveProject.image}
            alt=""
            fill
            className="object-cover"
            sizes="26rem"
          />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(8,8,7,.76))]" />
        </div>
      ))}
      <span className="absolute left-4 top-4 border border-white/20 bg-black/60 px-3 py-2 font-mono text-[11px] font-semibold uppercase tracking-[.14em] text-white">
        {language === "es" ? "Vista previa" : "Preview"} /{" "}
        {String(activeIndex + 5).padStart(2, "0")}
      </span>
      <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5">
        <div>
          <p className="font-mono text-[11px] uppercase tracking-[.12em] text-white/68">
            {project.type}
          </p>
          <p className="mt-1 text-xl font-bold tracking-[-.025em] text-white">
            {project.title}
          </p>
        </div>
        <span
          className={
            isLinked
              ? "inline-flex min-h-11 shrink-0 items-center gap-2 border-b border-primary pb-1 font-mono text-[11px] font-bold uppercase tracking-[.12em] text-primary"
              : "inline-flex min-h-11 shrink-0 items-center font-mono text-[11px] font-bold uppercase tracking-[.12em] text-white/68"
          }
        >
          {label}
          {isLinked ? (
            <ArrowUpRight className="h-4 w-4" />
          ) : null}
        </span>
      </div>
    </div>
  );
}

export function Projects() {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const archivePreviewRef = useRef<HTMLDivElement>(null);
  const previewXToRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const previewYToRef = useRef<ReturnType<typeof gsap.quickTo> | null>(null);
  const [hoveredArchiveIndex, setHoveredArchiveIndex] = useState<number | null>(
    null,
  );
  const projects = t.projects.items as Project[];
  const featured = featuredIndexes.map((index) => projects[index]).filter(Boolean);
  const archive = projects.filter((_, index) => !featuredIndexes.includes(index));
  const activeArchiveIndex = hoveredArchiveIndex ?? 0;
  const activeArchiveProject = archive[activeArchiveIndex];
  const archivePreviewHref =
    activeArchiveProject?.link ?? activeArchiveProject?.github;
  const archivePreviewLabel = activeArchiveProject?.link
    ? language === "es"
      ? "Ver demo"
      : "View demo"
    : activeArchiveProject?.github
      ? language === "es"
        ? "Ver código"
        : "View code"
      : language === "es"
        ? "Proyecto privado"
        : "Private project";

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      if (prefersReducedMotion()) {
        gsap.set(q(".scene-copy"), {
          clearProps: "opacity,visibility,transform,clipPath",
          autoAlpha: 1,
        });
        return;
      }

      const mm = gsap.matchMedia();
      mm.add("(min-width: 768px)", () => {
        q(".project-scene").forEach((scene) => {
          const copy = scene.querySelector(".scene-copy");
          gsap.fromTo(
            copy,
            { y: 48 },
            {
              y: -12,
              ease: "none",
              scrollTrigger: {
                trigger: scene,
                start: "top 88%",
                end: "bottom 12%",
                scrub: 1,
              },
            },
          );
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

  useGSAP(
    () => {
      const preview = archivePreviewRef.current;
      if (!preview) return;

      previewXToRef.current = gsap.quickTo(preview, "x", {
        duration: 0.18,
        ease: "power3.out",
      });
      previewYToRef.current = gsap.quickTo(preview, "y", {
        duration: 0.18,
        ease: "power3.out",
      });

      return () => {
        previewXToRef.current = null;
        previewYToRef.current = null;
      };
    },
    { scope: containerRef },
  );

  const positionArchivePreview = (clientX: number, clientY: number) => {
    const preview = archivePreviewRef.current;
    if (!preview) return;

    const { width, height } = preview.getBoundingClientRect();
    const gap = 24;
    const edge = 16;
    const opensRight = clientX + gap + width + edge <= window.innerWidth;
    const opensBelow = clientY + gap + height + edge <= window.innerHeight;
    const x = Math.max(
      edge,
      Math.min(
        opensRight ? clientX + gap : clientX - width - gap,
        window.innerWidth - width - edge,
      ),
    );
    const y = Math.max(
      edge,
      Math.min(
        opensBelow ? clientY + gap : clientY - height - gap,
        window.innerHeight - height - edge,
      ),
    );

    previewXToRef.current?.(x);
    previewYToRef.current?.(y);
  };

  const archivePreviewContent = activeArchiveProject ? (
    <ArchivePreviewContent
      activeIndex={activeArchiveIndex}
      archive={archive}
      isLinked={Boolean(archivePreviewHref)}
      label={archivePreviewLabel}
      language={language}
      project={activeArchiveProject}
    />
  ) : null;

  return (
    <section id="projects" ref={containerRef} aria-labelledby="projects-title" className="relative bg-background">
      <header className="mx-auto grid max-w-[100rem] gap-6 px-4 pb-16 pt-24 sm:px-6 sm:pb-24 sm:pt-32 md:grid-cols-[.7fr_1.3fr] md:items-end lg:px-8">
        <div>
          <p className="section-kicker">
            {language === "es" ? "01 / Proyectos seleccionados" : "01 / Selected work"}
          </p>
          <h2 id="projects-title" className="mt-5 text-[clamp(4rem,12vw,11rem)] font-black leading-[.75] tracking-[-.075em]">
            {language === "es" ? "Proyectos" : "Work"}
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
        <div className="mx-auto max-w-[100rem]">
          <header className="flex items-end justify-between gap-6">
            <div>
              <p className="section-kicker">
                {language === "es" ? "Trabajo secundario" : "Secondary work"}
              </p>
              <h3 className="mt-3 text-4xl font-black tracking-[-.05em] sm:text-6xl">
                {language === "es" ? "Archivo" : "Archive"}
              </h3>
            </div>
            <div className="text-right">
              <span className="block font-mono text-[11px] uppercase tracking-[.14em] text-muted-foreground">
                {archive.length} {language === "es" ? "proyectos" : "projects"}
              </span>
              <span className="mt-2 hidden font-mono text-[11px] uppercase tracking-[.12em] text-foreground/45 lg:block">
                {language === "es"
                  ? "Pasa el cursor por un proyecto para previsualizarlo"
                  : "Hover a project to preview it"}
              </span>
            </div>
          </header>

          <div className="mt-10 border-t border-border/55 pt-8 lg:pt-10">
            <div>
              {archive.map((project, index) => {
                return (
                  <article
                    key={project.title}
                    onMouseEnter={(event) => {
                      setHoveredArchiveIndex(index);
                      positionArchivePreview(event.clientX, event.clientY);
                    }}
                    onMouseMove={(event) =>
                      positionArchivePreview(event.clientX, event.clientY)
                    }
                    onMouseLeave={() => setHoveredArchiveIndex(null)}
                    className="group/archive-row border-b border-border/55 py-6 transition-colors hover:border-primary/70 focus-within:border-primary/70"
                  >
                    <div className="archive-inline-media relative mb-5 aspect-[16/10] overflow-hidden bg-[#171714]">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 1023px) calc(100vw - 2rem), 42vw"
                      />
                    </div>

                    <div className="grid gap-4 sm:grid-cols-[3rem_minmax(0,1fr)_auto] sm:items-start">
                      <span className="pt-1 font-mono text-[11px] text-muted-foreground">
                        {String(index + 5).padStart(2, "0")}
                      </span>

                      <div>
                        <p className="font-mono text-[11px] uppercase tracking-[.12em] text-primary">
                          {project.type}
                        </p>
                        <h4 className="mt-2 text-xl font-bold tracking-[-.025em] transition-colors group-hover/archive-row:text-primary group-focus-within/archive-row:text-primary sm:text-2xl">
                          {project.title}
                        </h4>
                        <p className="mt-3 max-w-[60ch] text-sm font-medium leading-relaxed text-foreground/62">
                          {project.description}
                        </p>
                        <p className="mt-4 font-mono text-[11px] uppercase tracking-[.11em] text-muted-foreground">
                          {project.technologies.slice(0, 3).join(" · ")}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-2 sm:justify-end">
                        {project.link && (
                          <a
                            className="inline-flex min-h-11 items-center justify-center gap-2 border border-border/55 px-3 font-mono text-[11px] font-bold uppercase tracking-[.1em] transition-[border-color,color,transform] hover:-translate-y-0.5 hover:border-primary hover:text-primary active:translate-y-0 motion-reduce:transform-none"
                            data-cursor="external"
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title}: ${
                              language === "es"
                                ? "abrir proyecto"
                                : "open project"
                            }`}
                          >
                            <ArrowUpRight className="h-5 w-5" />
                            Demo
                          </a>
                        )}
                        {project.github && (
                          <a
                            className="inline-flex min-h-11 items-center justify-center gap-2 border border-border/55 px-3 font-mono text-[11px] font-bold uppercase tracking-[.1em] transition-[border-color,color,transform] hover:-translate-y-0.5 hover:border-primary hover:text-primary active:translate-y-0 motion-reduce:transform-none"
                            data-cursor="external"
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`${project.title}: GitHub`}
                          >
                            <FaGithub className="h-5 w-5" />
                            GitHub
                          </a>
                        )}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>

          </div>
        </div>
      </div>

      <aside
        ref={archivePreviewRef}
        aria-hidden="true"
        className={`archive-preview archive-floating-preview pointer-events-none fixed left-0 top-0 z-40 w-[min(26rem,calc(100vw-2rem))] transition-opacity duration-150 motion-reduce:transition-none ${
          hoveredArchiveIndex === null ? "opacity-0" : "opacity-100"
        }`}
      >
        {archivePreviewContent}
      </aside>
    </section>
  );
}
