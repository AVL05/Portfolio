"use client";

import Image from "next/image";
import { ProjectShowcase } from "./project-showcase";
import styles from "./project-case-study.module.css";
import { useRef } from "react";
import { gsap, motion, useGSAP } from "@/lib/gsap";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useLanguage, type Language } from "@/lib/language-context";
import { localizeHref } from "@/lib/i18n-paths";
import { LanguageToggle } from "@/components/language-toggle";

type LocalizedText = Record<Language, string>;

export interface ProjectCaseStudyData {
  title: string;
  eyebrow: LocalizedText;
  summary: LocalizedText;
  role: LocalizedText;
  image: string;
  demoVideo?: string;
  imageAlt: LocalizedText;
  gallery?: Array<{ image: string; caption: LocalizedText }>;
  viewTransitionName: string;
  stack: string[];
  github: string;
  demo?: string;
  problem: { title: LocalizedText; body: LocalizedText };
  goals: LocalizedText[];
  process: Array<{ title: LocalizedText; body: LocalizedText }>;
  technicalDecisions: LocalizedText[];
  uxDecisions: LocalizedText[];
  architecture: LocalizedText;
  challenge: LocalizedText;
  solution: LocalizedText;
  result: LocalizedText;
  learnings: LocalizedText[];
}

export interface AdjacentProject {
  href: string;
  title: string;
}

const labels = {
  es: {
    back: "Volver a proyectos",
    contact: "Contacto",
    home: "Inicio",
    projects: "Proyectos",
    previous: "Proyecto anterior",
    next: "Siguiente proyecto",
    role: "Mi rol",
    problem: "Problema y contexto",
    goals: "Objetivos",
    process: "Proceso",
    decisions: "Decisiones",
    technical: "Técnicas",
    ux: "UX y producto",
    architecture: "Arquitectura",
    challenge: "Desafío",
    solution: "Solución",
    result: "Resultado verificable",
    learnings: "Aprendizajes",
    code: "Ver código",
    demo: "Ver sitio",
  },
  en: {
    back: "Back to projects",
    contact: "Contact",
    home: "Home",
    projects: "Projects",
    previous: "Previous project",
    next: "Next project",
    role: "My role",
    problem: "Problem and context",
    goals: "Goals",
    process: "Process",
    decisions: "Decisions",
    technical: "Technical",
    ux: "UX and product",
    architecture: "Architecture",
    challenge: "Challenge",
    solution: "Solution",
    result: "Verified outcome",
    learnings: "Learnings",
    code: "View code",
    demo: "Live site",
  },
};

function TextList({ items, language }: { items: LocalizedText[]; language: Language }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item.en} className="flex gap-3 text-sm font-medium leading-relaxed text-foreground/72 sm:text-base">
          <span aria-hidden="true" className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          {item[language]}
        </li>
      ))}
    </ul>
  );
}

export function ProjectCaseStudy({
  data,
  previous,
  next,
}: {
  data: ProjectCaseStudyData;
  previous?: AdjacentProject;
  next?: AdjacentProject;
}) {
  const { language } = useLanguage();
  const copy = labels[language];
  const containerRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      gsap.from(containerRef.current?.querySelector("h1") ?? null, { y: motion.distance.content, duration: motion.duration.title, ease: motion.ease.out });
    });
    return () => media.revert();
  }, { scope: containerRef });

  return (
    <main id="main-content" ref={containerRef} className={`premium-home case-study min-h-screen bg-background text-foreground ${styles.story}`}>
      <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav aria-label={language === "es" ? "Navegación del caso" : "Case study navigation"} className="mb-6 flex items-center justify-between border-b border-border/65 py-3">
            <Link href={localizeHref("/#projects", language)} className="cinema-link font-mono text-[11px] font-bold uppercase tracking-[.13em]"><ArrowLeft />{copy.back}</Link>
            <div className="flex items-center gap-3">
              <Link href={localizeHref("/#contact", language)} className="cinema-link font-mono text-[11px] font-bold uppercase tracking-[.13em]">{copy.contact}<ArrowUpRight /></Link>
              <LanguageToggle />
            </div>
          </nav>
          <nav aria-label="Breadcrumb" className="mb-14 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] uppercase tracking-[.12em] text-muted-foreground">
            <Link href={localizeHref("/", language)} className="transition-colors hover:text-primary">{copy.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href={localizeHref("/proyectos", language)} className="transition-colors hover:text-primary">{copy.projects}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page" className="text-foreground">{data.title}</span>
          </nav>

          <div className={styles.heroGrid}>
            <div>
              <h1 className="text-[clamp(3.6rem,8vw,7.5rem)] font-black leading-[.82] tracking-[-.065em]">{data.title}</h1>
              <p className="section-kicker mt-5">{data.eyebrow[language]}</p>
              <p className="mt-7 max-w-[62ch] text-lg font-medium leading-relaxed text-foreground/70 sm:text-xl">{data.summary[language]}</p>
              <div className="mt-7 border-l border-primary pl-4">
                <p className="font-mono text-[11px] uppercase tracking-[.13em] text-muted-foreground">{copy.role}</p>
                <p className="mt-2 max-w-[62ch] text-sm font-medium leading-relaxed text-foreground/82 sm:text-base">{data.role[language]}</p>
              </div>
              <div className="mt-8 flex flex-wrap gap-3">
                {data.demo ? <a href={data.demo} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 bg-primary px-5 text-sm font-bold text-primary-foreground">{copy.demo}<ArrowUpRight className="h-4 w-4" /></a> : null}
                <a href={data.github} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-12 items-center gap-2 border border-border/70 px-5 text-sm font-bold transition-colors hover:border-primary hover:text-primary"><FaGithub className="h-4 w-4" />{copy.code}</a>
              </div>
            </div>
            <ProjectShowcase image={data.image} alt={data.imageAlt[language]} videoSrc={data.demoVideo} viewTransitionName={data.viewTransitionName} caption={language === "es" ? (data.demoVideo ? "Demostración del proyecto" : "Vista del proyecto · Captura de la interfaz") : (data.demoVideo ? "Project demonstration" : "Project preview · Interface screenshot")} />
          </div>
          <nav aria-label={language === "es" ? "Contenido del caso" : "Case contents"} className={styles.contents}>
            {[["context", copy.problem], ["decisions", copy.decisions], ["architecture", copy.architecture], ["result", copy.result]].map(([id, label]) => <a key={id} href={`#${id}`}>{label}</a>)}
          </nav>
        </div>
      </section>

      <section id="context" className="border-t border-border/55 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div><h2 className="text-3xl font-black leading-tight sm:text-5xl">{data.problem.title[language]}</h2><p className="section-kicker mt-5">01 / {copy.problem}</p></div>
          <p className="max-w-[65ch] text-base font-medium leading-relaxed text-foreground/68 sm:text-lg">{data.problem.body[language]}</p>
        </div>
      </section>

      {data.gallery ? <section aria-label={language === "es" ? "Capturas del producto" : "Product screenshots"}>
        <div className={styles.gallery}>
          {data.gallery.map(item => <figure key={item.image}>
            <Image src={item.image} alt={item.caption[language]} width={1270} height={714} loading="lazy"
              sizes="(max-width: 767px) 92vw, 80vw" />
            <figcaption>{item.caption[language]}</figcaption>
          </figure>)}
        </div>
      </section> : null}

      <section className="border-t border-border/55 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div><p className="section-kicker">02 / {copy.goals}</p><TextList items={data.goals} language={language} /></div>
          <div><p className="section-kicker">03 / {copy.process}</p><div className="space-y-5">{data.process.map((step, index) => <article key={step.title.en} className="border-t border-border/55 pt-4"><p className="font-mono text-[11px] text-primary">0{index + 1}</p><h3 className="mt-2 text-xl font-black">{step.title[language]}</h3><p className="mt-2 text-sm font-medium leading-relaxed text-foreground/72">{step.body[language]}</p></article>)}</div></div>
        </div>
      </section>

      <section id="decisions" className="border-t border-border/55 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <h2 className="section-kicker">04 / {copy.decisions}</h2>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div><h3 className="mb-5 text-2xl font-black">{copy.technical}</h3><TextList items={data.technicalDecisions} language={language} /></div>
            <div><h3 className="mb-5 text-2xl font-black">{copy.ux}</h3><TextList items={data.uxDecisions} language={language} /></div>
          </div>
        </div>
      </section>

      <section id="architecture" className="border-t border-border/55 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div><h2 className="text-3xl font-black leading-tight sm:text-5xl">{data.architecture[language]}</h2><p className="section-kicker mt-5">05 / {copy.architecture}</p></div>
          <div className="grid content-start gap-2 sm:grid-cols-3">{data.stack.map((item) => <span key={item} className="border border-border/55 px-3 py-3 font-mono text-[11px] font-bold uppercase tracking-[.1em] text-muted-foreground">{item}</span>)}</div>
        </div>
      </section>

      <section className="border-y border-border/55 bg-card/35 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <article><p className="section-kicker">06 / {copy.challenge}</p><p className="mt-5 text-lg font-medium leading-relaxed text-foreground/72">{data.challenge[language]}</p></article>
          <article><p className="section-kicker">07 / {copy.solution}</p><p className="mt-5 text-lg font-medium leading-relaxed text-foreground/72">{data.solution[language]}</p></article>
        </div>
      </section>

      <section id="result" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><h2 className="text-3xl font-black leading-tight sm:text-5xl">{data.result[language]}</h2><p className="section-kicker mt-5">08 / {copy.result}</p></div>
          <div><p className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[.13em] text-muted-foreground">{copy.learnings}</p><TextList items={data.learnings} language={language} /><div className="mt-8 flex flex-wrap gap-4"><a href={data.github} target="_blank" rel="noopener noreferrer" className="cinema-link font-mono text-[11px] font-bold uppercase tracking-[.12em]"><FaGithub />{copy.code}</a>{data.demo ? <a href={data.demo} target="_blank" rel="noopener noreferrer" className="cinema-link font-mono text-[11px] font-bold uppercase tracking-[.12em]">{copy.demo}<ArrowUpRight /></a> : null}</div></div>
        </div>
      </section>

      {previous || next ? (
        <nav aria-label={language === "es" ? "Otros casos de estudio" : "More case studies"} className="border-t border-border/55 px-4 py-10 sm:px-6 lg:px-8">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4">
            {previous ? (
              <Link href={previous.href} className="cinema-link font-mono text-[11px] font-bold uppercase tracking-[.12em]">
                <ArrowLeft />{copy.previous}: {previous.title}
              </Link>
            ) : <span />}
            {next ? (
              <Link href={next.href} className="cinema-link font-mono text-[11px] font-bold uppercase tracking-[.12em]">
                {copy.next}: {next.title}<ArrowUpRight />
              </Link>
            ) : null}
          </div>
        </nav>
      ) : null}
    </main>
  );
}
