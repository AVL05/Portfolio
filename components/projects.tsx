"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink, ArrowLeft, ArrowRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import { RevealHeader } from "@/components/reveal-header";

const smallImageProjects = [
  "Llibret Falla el Molí 24/25",
  "Arquitectura XML Educativa",
];

interface Project {
  title: string;
  description: string;
  image?: string;
  technologies: string[];
  category: string;
  link?: string;
  github?: string;
  type: string;
}

interface SlideTranslations {
  view_live: string;
  view_code: string;
}

/* ── Single slide card ─────────────────────────────────────── */
function SlideCard({ project, t, featured = false }: { project: Project; t: SlideTranslations; featured?: boolean }) {
  return (
    <div
      className={`group relative flex-shrink-0 snap-start overflow-hidden rounded-2xl border border-border/60 bg-card transition-all duration-500 hover:border-primary/40
        ${featured ? "w-[min(520px,85vw)]" : "w-[min(400px,80vw)]"}`}
      style={{ height: "clamp(480px,60vh,620px)" }}
    >
      {/* Image top half */}
      <div className="relative w-full overflow-hidden" style={{ height: "55%" }}>
        <Image
          src={project.image || "/placeholder.svg"}
          alt={project.title}
          fill
          className={`transition-transform duration-700 ease-out group-hover:scale-[1.06] ${
            smallImageProjects.includes(project.title) ? "p-10 object-contain" : "object-cover"
          }`}
          sizes="520px"
        />
        <div className="absolute inset-0 bg-linear-to-t from-card via-card/10 to-transparent" />
        {/* Badges */}
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="rounded-md border border-border/60 bg-background/70 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground backdrop-blur-md">
            {project.category}
          </span>
          {featured && (
            <span className="rounded-md border border-primary/30 bg-primary/10 px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-primary backdrop-blur-md">
              Featured
            </span>
          )}
        </div>
      </div>

      {/* Content bottom half */}
      <div className="flex h-[45%] flex-col justify-between p-6">
        <div className="space-y-2.5">
          <div className="flex items-center gap-2">
            <span className="h-px w-4 bg-accent/60" />
            <p className="font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-accent/80">
              {project.type}
            </p>
          </div>
          <h3 className="text-xl font-black leading-tight text-foreground transition-colors group-hover:text-primary">
            {project.title}
          </h3>
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {project.description}
          </p>
        </div>

        <div className="space-y-3">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, featured ? 7 : 5).map((tech: string) => (
              <span
                key={tech}
                className="rounded-md border border-border bg-secondary px-2 py-0.5 font-mono text-[9px] uppercase tracking-widest text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            {project.link && (
              <Button
                asChild
                size="sm"
                className="h-8 rounded-xl bg-primary px-3 text-xs font-bold text-primary-foreground hover:bg-primary/90"
              >
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-1.5 h-3 w-3" />
                  {t.view_live}
                </a>
              </Button>
            )}
            {project.github && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-8 rounded-xl border-border text-xs"
              >
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <FaGithub className="mr-1.5 h-3 w-3" />
                  {t.view_code}
                </a>
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Inner glow on hover */}
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: "inset 0 0 0 1px oklch(from var(--primary) l c h / 0.20)" }}
      />
    </div>
  );
}

/* ── Main Projects component ────────────────────────────────── */
export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);
  const { t, language } = useLanguage();

  const projects = t.projects.items;
  const categories =
    language === "es"
      ? ["Todos", "Desarrollo Web", "Diseño Gráfico"]
      : ["All", "Web Development", "Graphic Design"];

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [progress, setProgress] = useState(0);

  const filteredProjects = projects.filter((project: any) => {
    if (activeCategory === categories[0]) return true;
    return project.category === activeCategory;
  });

  /* ── Scroll state sync ─────────────────────────────────────── */
  const updateScrollState = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const { scrollLeft: sl, scrollWidth, clientWidth } = el;
    const max = scrollWidth - clientWidth;
    setCanScrollLeft(sl > 8);
    setCanScrollRight(sl < max - 8);
    setProgress(max > 0 ? sl / max : 0);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    updateScrollState();
  }, [activeCategory, updateScrollState]);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    el.addEventListener("scroll", updateScrollState, { passive: true });
    updateScrollState();
    return () => el.removeEventListener("scroll", updateScrollState);
  }, [updateScrollState]);

  /* ── Arrow navigation ──────────────────────────────────────── */
  const scrollBy = useCallback((dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.querySelector("div")?.offsetWidth ?? 420;
    gsap.to(el, {
      scrollLeft: el.scrollLeft + dir * (cardWidth + 28),
      duration: 0.6,
      ease: "power3.inOut",
    });
  }, []);

  /* ── Mouse drag ────────────────────────────────────────────── */
  const onMouseDown = (e: React.MouseEvent) => {
    const el = trackRef.current;
    if (!el) return;
    isDragging.current = true;
    startX.current = e.pageX - el.offsetLeft;
    scrollLeft.current = el.scrollLeft;
    el.style.cursor = "grabbing";
    el.style.userSelect = "none";
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !trackRef.current) return;
    const el = trackRef.current;
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startX.current) * 1.4;
    el.scrollLeft = scrollLeft.current - walk;
  };

  const stopDrag = () => {
    if (!trackRef.current) return;
    isDragging.current = false;
    trackRef.current.style.cursor = "grab";
    trackRef.current.style.userSelect = "";
  };


  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 glow-divider" />
      <div className="pointer-events-none absolute right-[5%] bottom-[10%] h-[35rem] w-[35rem] rounded-full bg-accent/4 blur-[110px]" />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 pt-20 pb-10 sm:px-6 sm:pt-28 lg:px-8">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <RevealHeader
            title={t.projects.title}
            subtitle={t.projects.subtitle}
            className="mb-0 sm:mb-0"
          />
          <div className="flex w-full flex-wrap items-center gap-2 md:w-auto md:justify-end">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`min-h-9 rounded-xl px-4 text-[10px] font-bold uppercase tracking-[0.14em] transition-all duration-300 sm:px-5 ${
                  activeCategory === category
                    ? "bg-primary text-primary-foreground shadow-[0_10px_24px_-16px_var(--primary)]"
                    : "border border-border/70 bg-secondary/70 text-muted-foreground hover:border-border hover:text-foreground"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Carousel track */}
      <div className="relative pb-10">
        {/* Left fade */}
        <div
          className="pointer-events-none absolute left-0 top-0 bottom-10 z-10 w-16 bg-linear-to-r from-background to-transparent transition-opacity duration-300"
          style={{ opacity: canScrollLeft ? 1 : 0 }}
        />
        {/* Right fade */}
        <div className="pointer-events-none absolute right-0 top-0 bottom-10 z-10 w-20 bg-linear-to-l from-background to-transparent" />

        <div
          ref={trackRef}
          className="flex gap-7 overflow-x-auto px-6 pb-4 sm:px-8 lg:px-10"
          style={{
            scrollSnapType: "x mandatory",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            cursor: "grab",
          }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={stopDrag}
          onMouseLeave={stopDrag}
        >
          {filteredProjects.map((project: Project, i: number) => (
            <div key={project.title} className="proj-slide flex-shrink-0">
              <SlideCard project={project} t={t.projects} featured={i === 0} />
            </div>
          ))}
          {/* Trailing gap */}
          <div className="w-4 flex-shrink-0" />
        </div>
      </div>

      {/* Controls */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-20 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between">
          {/* Progress bar */}
          <div className="h-px flex-1 max-w-xs rounded-full bg-border/30 overflow-hidden">
            <div
              className="h-full bg-primary/60 rounded-full transition-all duration-300 origin-left"
              style={{ transform: `scaleX(${progress})`, transformOrigin: "left" }}
            />
          </div>

          {/* Arrow buttons */}
          <div className="flex items-center gap-2 ml-6">
            <button
              onClick={() => scrollBy(-1)}
              disabled={!canScrollLeft}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-secondary/60 text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/8 hover:text-foreground disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label="Anterior"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <button
              onClick={() => scrollBy(1)}
              disabled={!canScrollRight}
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-secondary/60 text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/8 hover:text-foreground disabled:opacity-25 disabled:cursor-not-allowed"
              aria-label="Siguiente"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Drag hint */}
        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.22em] text-muted-foreground/30">
          {language === "es" ? "Arrastra o usa las flechas para explorar" : "Drag or use arrows to explore"}
        </p>
      </div>
    </section>
  );
}
