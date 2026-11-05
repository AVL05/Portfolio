"use client";

import Image from "next/image";
import { ProjectShowcase } from "./project-showcase";
import styles from "./project-case-study.module.css";
import { useRef, type ReactNode } from "react";
import { gsap, motion, useGSAP } from "@/lib/gsap";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useLanguage, type Language } from "@/lib/language-context";
import { localizeHref } from "@/lib/i18n-paths";
import { LanguageToggle } from "@/components/language-toggle";

type LocalizedText = Record<Language, string>;

export interface ProjectCaseStudyData {
  title: string;
  eyebrow: LocalizedText;
  summary: LocalizedText;
  introduction?: { title: LocalizedText; paragraphs: LocalizedText[]; type: LocalizedText };
  role: LocalizedText;
  image: string;
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

interface AdjacentProject {
  href: string;
  title: string;
}

export type CaseIdentity = "distrito" | "luma" | "raw";

const labels = {
  es: {
    back: "Proyectos",
    contact: "Contacto",
    home: "Inicio",
    projects: "Proyectos",
    previous: "Caso anterior",
    next: "Siguiente caso",
    role: "Mi rol",
    stack: "Stack",
    type: "Tipo",
    links: "Revisar",
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
    contents: "En este caso",
    screens: "Producto",
  },
  en: {
    back: "Work",
    contact: "Contact",
    home: "Home",
    projects: "Projects",
    previous: "Previous case",
    next: "Next case",
    role: "My role",
    stack: "Stack",
    type: "Type",
    links: "Review",
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
    contents: "In this case",
    screens: "Product",
  },
};

function TextList({ items, language }: { items: LocalizedText[]; language: Language }) {
  return (
    <ul className={styles.list}>
      {items.map((item) => <li key={item.en}>{item[language]}</li>)}
    </ul>
  );
}

/** Numbered editorial chapter: sticky label column and a reading column. */
export function Chapter({ id, number, label, title, children, tone }: {
  id?: string; number: string; label: string; title?: ReactNode; children?: ReactNode; tone?: "raised";
}) {
  return (
    <section id={id} className={styles.chapter} data-tone={tone}>
      <div className={styles.chapterFrame}>
        <p className={styles.chapterLabel}><span>{number}</span>{label}</p>
        <div className={styles.chapterMain}>
          {title ? <h2 className={styles.chapterTitle}>{title}</h2> : null}
          {children}
        </div>
      </div>
    </section>
  );
}

export interface CaseShellProps {
  identity: CaseIdentity;
  title: ReactNode;
  plainTitle: string;
  eyebrow: string;
  lead: ReactNode;
  facts: Array<[string, ReactNode]>;
  actions: ReactNode;
  showcase: { image: string; alt: string; caption: string; viewTransitionName: string };
  contents: Array<[string, string]>;
  previous?: AdjacentProject;
  next?: AdjacentProject;
  children: ReactNode;
}

/** Shared case-study frame used by every project, so cases differ by identity, not by system. */
export function CaseShell({ identity, title, plainTitle, eyebrow, lead, facts, actions, showcase, contents, previous, next, children }: CaseShellProps) {
  const { language } = useLanguage();
  const copy = labels[language];
  const containerRef = useRef<HTMLElement>(null);
  useGSAP(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      if (performance.now() > 1600) return;
      gsap.from(containerRef.current?.querySelector("h1") ?? null, { yPercent: 18, autoAlpha: 0, duration: motion.duration.hero, ease: motion.ease.reveal, clearProps: "transform,opacity,visibility" });
    });
    return () => media.revert();
  }, { scope: containerRef });

  return (
    <main id="main-content" ref={containerRef} className={`premium-home case-study ${styles.story}`} data-case={identity}>
      <section className={styles.hero}>
        <nav aria-label={language === "es" ? "Navegación del caso" : "Case study navigation"} className={styles.topbar}>
          <Link href={localizeHref("/#projects", language)} className={styles.back}><ArrowLeft aria-hidden="true" />{copy.back}</Link>
          <div className={styles.topbarEnd}>
            <Link href={localizeHref("/#contact", language)} className="cinema-link">{copy.contact}<ArrowUpRight aria-hidden="true" /></Link>
            <LanguageToggle />
          </div>
        </nav>
        <div className={styles.heroFrame}>
          <nav aria-label="Breadcrumb" className={styles.breadcrumb}>
            <Link href={localizeHref("/", language)}>{copy.home}</Link>
            <span aria-hidden="true">/</span>
            <Link href={localizeHref("/#projects", language)}>{copy.projects}</Link>
            <span aria-hidden="true">/</span>
            <span aria-current="page">{plainTitle}</span>
          </nav>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.eyebrow}>{eyebrow}</p>
          <div className={styles.lead}>{lead}</div>
          <dl className={styles.facts}>
            {facts.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
          <div className={styles.heroActions}>{actions}</div>
        </div>
        <div className={styles.showcaseFrame}>
          <ProjectShowcase image={showcase.image} alt={showcase.alt} viewTransitionName={showcase.viewTransitionName} caption={showcase.caption} />
        </div>
        <nav aria-label={language === "es" ? "Contenido del caso" : "Case contents"} className={styles.contents}>
          <p>{copy.contents}</p>
          <ol>
            {contents.map(([id, label], index) => <li key={id}><a href={`#${id}`}><span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>{label}</a></li>)}
          </ol>
        </nav>
      </section>

      {children}

      {previous || next ? (
        <nav aria-label={language === "es" ? "Otros casos de estudio" : "More case studies"} className={styles.adjacent}>
          <div className={styles.adjacentFrame}>
            {previous ? (
              <Link href={localizeHref(previous.href, language)} className={styles.adjacentLink} data-direction="previous">
                <span className={styles.adjacentLabel}><ArrowLeft aria-hidden="true" />{copy.previous}</span>
                <span className={styles.adjacentTitle}>{previous.title}</span>
              </Link>
            ) : <span />}
            {next ? (
              <Link href={localizeHref(next.href, language)} className={styles.adjacentLink} data-direction="next">
                <span className={styles.adjacentLabel}>{copy.next}<ArrowRight aria-hidden="true" /></span>
                <span className={styles.adjacentTitle}>{next.title}</span>
              </Link>
            ) : null}
          </div>
        </nav>
      ) : null}
    </main>
  );
}

export function ProjectCaseStudy({
  data,
  previous,
  next,
  editorial,
}: {
  data: ProjectCaseStudyData;
  previous?: AdjacentProject;
  next?: AdjacentProject;
  editorial?: ReactNode;
}) {
  const { language } = useLanguage();
  const copy = labels[language];
  const identity: CaseIdentity = data.viewTransitionName.includes("distrito") ? "distrito" : "luma";
  const contents: Array<[string, string]> = editorial
    ? [["context", language === "es" ? "Contexto" : "Context"], ["design", language === "es" ? "Diseño" : "Design"], ["customer", language === "es" ? "Experiencia de cliente" : "Customer experience"], ["backoffice", "Backoffice"], ["architecture", copy.architecture], ["decisions", copy.decisions], ["result", copy.learnings]]
    : [["context", copy.problem], ["decisions", copy.decisions], ["architecture", copy.architecture], ["result", copy.result]];

  const lead = data.introduction ? <>
    <h2>{data.introduction.title[language]}</h2>
    {data.introduction.paragraphs.map(paragraph => <p key={paragraph.en}>{paragraph[language]}</p>)}
  </> : <p>{data.summary[language]}</p>;

  const facts: Array<[string, ReactNode]> = [
    [copy.role, data.role[language]],
    [copy.stack, (data.introduction ? ["React", "Laravel", "MySQL", "Tailwind CSS", "Zustand"] : data.stack.slice(0, 6)).join(" · ")],
  ];
  if (data.introduction) facts.push([copy.type, data.introduction.type[language]]);

  const actions = <>
    {data.demo ? <a href={data.demo} target="_blank" rel="noopener noreferrer" className="action-primary">{data.introduction ? (language === "es" ? "Ver aplicación" : "View application") : copy.demo}<ArrowUpRight aria-hidden="true" /></a> : null}
    <a href={data.github} target="_blank" rel="noopener noreferrer" className={data.demo ? "action-secondary" : "action-primary"}><FaGithub aria-hidden="true" />{data.introduction ? (language === "es" ? "Explorar repositorio" : "Explore repository") : copy.code}</a>
  </>;

  return (
    <CaseShell identity={identity} title={data.title} plainTitle={data.title} eyebrow={data.eyebrow[language]}
      lead={lead} facts={facts} actions={actions} contents={contents} previous={previous} next={next}
      showcase={{ image: data.image, alt: data.imageAlt[language], viewTransitionName: data.viewTransitionName, caption: language === "es" ? "Vista del proyecto · Captura de la interfaz" : "Project preview · Interface screenshot" }}>
      {editorial ?? <>
        <Chapter id="context" number="01" label={copy.problem} title={data.problem.title[language]}>
          <p className={styles.prose}>{data.problem.body[language]}</p>
        </Chapter>

        {data.gallery ? <section aria-label={language === "es" ? "Capturas del producto" : "Product screenshots"} className={styles.gallerySection}>
          <div className={styles.gallery}>
            {data.gallery.map(item => <figure key={item.image}>
              <Image src={item.image} alt={item.caption[language]} width={1270} height={714} loading="lazy"
                sizes="(max-width: 767px) 92vw, 80vw" />
              <figcaption>{item.caption[language]}</figcaption>
            </figure>)}
          </div>
        </section> : null}

        <Chapter number="02" label={`${copy.goals} · ${copy.process}`} title={language === "es" ? "Qué debía resolver y cómo lo construí." : "What it had to solve and how I built it."}>
          <div className={styles.split}>
            <div><h3 className={styles.subhead}>{copy.goals}</h3><TextList items={data.goals} language={language} /></div>
            <ol className={styles.steps}>
              {data.process.map((step, index) => <li key={step.title.en}>
                <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <h3>{step.title[language]}</h3>
                <p>{step.body[language]}</p>
              </li>)}
            </ol>
          </div>
        </Chapter>

        <Chapter id="decisions" number="03" label={copy.decisions} title={language === "es" ? "Decisiones que se pueden revisar en el código." : "Decisions you can review in the code."} tone="raised">
          <div className={styles.split}>
            <div><h3 className={styles.subhead}>{copy.technical}</h3><TextList items={data.technicalDecisions} language={language} /></div>
            <div><h3 className={styles.subhead}>{copy.ux}</h3><TextList items={data.uxDecisions} language={language} /></div>
          </div>
        </Chapter>

        <Chapter id="architecture" number="04" label={copy.architecture} title={data.architecture[language]}>
          <ul className={styles.stackGrid} aria-label={copy.stack}>
            {data.stack.map((item) => <li key={item}>{item}</li>)}
          </ul>
          <div className={`${styles.split} ${styles.pair}`}>
            <article><h3 className={styles.subhead}>{copy.challenge}</h3><p className={styles.prose}>{data.challenge[language]}</p></article>
            <article><h3 className={styles.subhead}>{copy.solution}</h3><p className={styles.prose}>{data.solution[language]}</p></article>
          </div>
        </Chapter>

        <Chapter id="result" number="05" label={copy.result} title={data.result[language]}>
          <h3 className={styles.subhead}>{copy.learnings}</h3>
          <TextList items={data.learnings} language={language} />
          <div className={styles.inlineActions}>
            <a href={data.github} target="_blank" rel="noopener noreferrer" className="cinema-link"><FaGithub aria-hidden="true" />{copy.code}<ArrowUpRight aria-hidden="true" /></a>
            {data.demo ? <a href={data.demo} target="_blank" rel="noopener noreferrer" className="cinema-link">{copy.demo}<ArrowUpRight aria-hidden="true" /></a> : null}
          </div>
        </Chapter>
      </>}
    </CaseShell>
  );
}
