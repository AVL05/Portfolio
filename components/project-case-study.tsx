"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useLanguage, type Language } from "@/lib/language-context";

type LocalizedText = Record<Language, string>;

export interface ProjectCaseStudyData {
  title: string;
  eyebrow: LocalizedText;
  summary: LocalizedText;
  role: LocalizedText;
  image: string;
  imageAlt: LocalizedText;
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

const labels = {
  es: {
    back: "Volver a proyectos",
    contact: "Contacto",
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
    result: "Resultado",
    learnings: "Aprendizajes",
    code: "Ver código",
    demo: "Abrir producto",
  },
  en: {
    back: "Back to projects",
    contact: "Contact",
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
    result: "Result",
    learnings: "Learnings",
    code: "View code",
    demo: "Open product",
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

export function ProjectCaseStudy({ data }: { data: ProjectCaseStudyData }) {
  const { language } = useLanguage();
  const copy = labels[language];

  return (
    <main id="main-content" className="case-study min-h-screen overflow-hidden bg-background text-foreground">
      <section className="px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <nav aria-label={language === "es" ? "Navegación del caso" : "Case study navigation"} className="mb-14 flex items-center justify-between border-b border-border/65 py-3">
            <Link href="/#projects" className="cinema-link font-mono text-[11px] font-bold uppercase tracking-[.13em]"><ArrowLeft />{copy.back}</Link>
            <Link href="/#contact" className="cinema-link font-mono text-[11px] font-bold uppercase tracking-[.13em]">{copy.contact}<ArrowUpRight /></Link>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,.82fr)_minmax(380px,.68fr)] lg:items-center">
            <div>
              <p className="section-kicker">{data.eyebrow[language]}</p>
              <h1 className="mt-5 text-[clamp(3.6rem,8vw,7.5rem)] font-black leading-[.82] tracking-[-.065em]">{data.title}</h1>
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
            <div className="relative aspect-[8/5] overflow-hidden border border-border/65 bg-card" style={{ viewTransitionName: data.viewTransitionName }}>
              <Image src={data.image} alt={data.imageAlt[language]} fill priority className="object-cover" sizes="(max-width: 1024px) 100vw, 560px" />
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/55 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className="section-kicker">01 / {copy.problem}</p><h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">{data.problem.title[language]}</h2></div>
          <p className="max-w-[65ch] text-base font-medium leading-relaxed text-foreground/68 sm:text-lg">{data.problem.body[language]}</p>
        </div>
      </section>

      <section className="border-t border-border/55 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2">
          <div><p className="section-kicker">02 / {copy.goals}</p><TextList items={data.goals} language={language} /></div>
          <div><p className="section-kicker">03 / {copy.process}</p><div className="space-y-5">{data.process.map((step, index) => <article key={step.title.en} className="border-t border-border/55 pt-4"><p className="font-mono text-[11px] text-primary">0{index + 1}</p><h3 className="mt-2 text-xl font-black">{step.title[language]}</h3><p className="mt-2 text-sm font-medium leading-relaxed text-foreground/72">{step.body[language]}</p></article>)}</div></div>
        </div>
      </section>

      <section className="border-t border-border/55 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <p className="section-kicker">04 / {copy.decisions}</p>
          <div className="mt-8 grid gap-8 lg:grid-cols-2">
            <div><h2 className="mb-5 text-2xl font-black">{copy.technical}</h2><TextList items={data.technicalDecisions} language={language} /></div>
            <div><h2 className="mb-5 text-2xl font-black">{copy.ux}</h2><TextList items={data.uxDecisions} language={language} /></div>
          </div>
        </div>
      </section>

      <section className="border-t border-border/55 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.75fr_1.25fr]">
          <div><p className="section-kicker">05 / {copy.architecture}</p><h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">{data.architecture[language]}</h2></div>
          <div className="grid content-start gap-2 sm:grid-cols-3">{data.stack.map((item) => <span key={item} className="border border-border/55 px-3 py-3 font-mono text-[11px] font-bold uppercase tracking-[.1em] text-muted-foreground">{item}</span>)}</div>
        </div>
      </section>

      <section className="border-y border-border/55 bg-card/35 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
          <article><p className="section-kicker">06 / {copy.challenge}</p><p className="mt-5 text-lg font-medium leading-relaxed text-foreground/72">{data.challenge[language]}</p></article>
          <article><p className="section-kicker">07 / {copy.solution}</p><p className="mt-5 text-lg font-medium leading-relaxed text-foreground/72">{data.solution[language]}</p></article>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="section-kicker">08 / {copy.result}</p><h2 className="mt-4 text-3xl font-black leading-tight sm:text-5xl">{data.result[language]}</h2></div>
          <div><p className="mb-5 font-mono text-[11px] font-bold uppercase tracking-[.13em] text-muted-foreground">{copy.learnings}</p><TextList items={data.learnings} language={language} /><div className="mt-8 flex flex-wrap gap-4"><a href={data.github} target="_blank" rel="noopener noreferrer" className="cinema-link font-mono text-[11px] font-bold uppercase tracking-[.12em]"><FaGithub />{copy.code}</a>{data.demo ? <a href={data.demo} target="_blank" rel="noopener noreferrer" className="cinema-link font-mono text-[11px] font-bold uppercase tracking-[.12em]">{copy.demo}<ArrowUpRight /></a> : null}</div></div>
        </div>
      </section>
    </main>
  );
}
