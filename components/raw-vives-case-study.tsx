"use client";

import Image from "next/image";
import styles from "./project-case-study.module.css";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useLanguage } from "@/lib/language-context";
import { localizeHref } from "@/lib/i18n-paths";
import { CaseShell, Chapter } from "@/components/project-case-study";

const productionUrl = "https://rawvives.aleviclop.dev/";
const repositoryUrl = "https://github.com/AVL05/alexgallery";

const media = [
  ["raw-vives-home-editorial.webp", "Home editorial", "Editorial home"],
  ["raw-vives-series.webp", "Página de serie", "Series page"],
  ["raw-vives-archive.webp", "Archivo y filtros", "Archive and filters"],
  ["raw-vives-detail.webp", "Ficha con contexto de serie", "Detail with series context"],
  ["raw-vives-fullscreen.webp", "Vista a pantalla completa", "Fullscreen view"],
] as const;

const copy = {
  es: {
    back: "Volver a proyectos",
    kicker: "Caso de estudio / Archivo fotográfico editorial",
    lead: "Un archivo fotográfico bilingüe donde obras individuales y series curadas forman un recorrido con interacción accesible.",
    live: "Ver proyecto en producción",
    code: "Ver repositorio",
    summary: "Qué es raw.vives",
    summaryText: "raw.vives convierte una colección fotográfica en un producto editorial estático. La home ordena el relato, el archivo facilita encontrar imágenes y las series mantienen continuidad entre páginas sin sacrificar URLs reales ni navegación directa.",
    challenge: "Problema inicial",
    challengeText: "Las fotografías se percibían como piezas aisladas, con repeticiones y una entrada visual demasiado uniforme. El reto fue dar función a cada imagen y construir continuidad sin convertir el sitio en una demostración de efectos.",
    goals: "Objetivos",
    goalItems: ["Jerarquizar y curar el recorrido", "Conectar archivo, fichas y series", "Mantener rendimiento, teclado y reduced motion"],
    role: "Mi papel",
    roleText: "Diseñé y desarrollé la interfaz con Next.js, React y TypeScript, el modelo de contenido y la navegación. También trabajé la curación fotográfica, la accesibilidad, el SEO ES/EN y la integración continua.",
    stack: "Stack verificado",
    direction: "Dirección de arte, curación e interacción",
    directionText: "Una dirección editorial en negro y marfil deja que la fotografía sea la interfaz. La curación asigna una función exclusiva a hero, historia, capítulos y trabajo seleccionado; una gramática limitada de máscaras, escala suave y transiciones contextuales aporta ritmo sin ocultar contenido.",
    architecture: "Arquitectura y exploración",
    architectureText: "Next.js App Router genera rutas localizadas y estáticas. Los datos centrales resuelven fotografías, series y navegación; el archivo combina búsqueda, categorías y orden editorial; las fichas mantienen fullscreen, anterior/siguiente y contexto ?series= con fallback global.",
    series: "Series fotográficas",
    seriesText: "Tres secuencias manuales agrupan relaciones auténticas o afinidades editoriales documentadas. Cada fotografía conserva su ficha y, cuando se abre desde una serie, anterior, siguiente y retorno siguen ese orden.",
    quality: "Accesibilidad, rendimiento y SEO",
    qualityItems: ["Contenido visible sin depender de animaciones", "Teclado, foco, alt localizado y reduced motion", "Imágenes responsivas, lazy loading y dimensiones reservadas", "Canonical, hreflang, Open Graph y sitemap localizado"],
    delivery: "CI/CD y Cloudflare",
    deliveryText: "GitHub Actions valida tipos, lint, tests, build y exportación antes de desplegar el sitio estático en Cloudflare Workers. La versión documentada incluyó 67 tests y un token limitado al Worker y su ruta.",
    decisions: "Retos, decisiones y compromisos",
    decisionsText: "Se priorizaron relaciones fotográficas verificables, una única configuración por sistema y progressive enhancement. Se descartaron carruseles, scroll horizontal, nuevos shaders y efectos por tarjeta para proteger claridad, memoria y restauración de navegación.",
    results: "Resultado publicado",
    resultsText: "El resultado es un archivo ES/EN publicado en rawvives.aleviclop.dev, con fichas de obras, series y navegación por teclado. El repositorio permite revisar el código, los tests y la configuración del despliegue estático.",
    learnings: "Aprendizajes",
    learningItems: ["La curación aporta más continuidad que añadir contenido", "El motion funciona mejor como gramática que como colección de efectos", "La navegación contextual necesita un fallback directo y estable"],
    gallery: "Producto publicado",
    next: "Siguiente caso",
    nextTitle: "LumaFlow Studio",
    nextText: "Un producto full-stack para organizar el trabajo profesional de fotografía.",
  },
  en: {
    back: "Back to projects",
    kicker: "Case study / Editorial photography archive",
    lead: "A bilingual photography archive where individual works and curated series form an accessible, interactive journey.",
    live: "View live project",
    code: "View repository",
    summary: "What is raw.vives?",
    summaryText: "raw.vives turns a photography collection into a static editorial product. The home shapes the narrative, the archive makes images discoverable, and series preserve continuity across real, directly accessible URLs.",
    challenge: "Initial problem",
    challengeText: "Photographs felt isolated, repeated, and entered with an overly uniform visual treatment. The challenge was to give each image a purpose and create continuity without turning the site into an effects demo.",
    goals: "Goals",
    goalItems: ["Curate and prioritize the journey", "Connect archive, details, and series", "Preserve performance, keyboard access, and reduced motion"],
    role: "My role",
    roleText: "I designed and built the Next.js, React and TypeScript interface, content model and navigation. I also worked on photographic curation, accessibility, ES/EN SEO and continuous integration.",
    stack: "Verified stack",
    direction: "Art direction, curation, and interaction",
    directionText: "A black-and-ivory editorial direction lets photography become the interface. Curation gives hero, story, chapters, and selected work distinct roles; a limited grammar of masks, soft scale, and contextual transitions adds rhythm without hiding content.",
    architecture: "Architecture and exploration",
    architectureText: "Next.js App Router generates localized static routes. Central data resolves photographs, series, and navigation; the archive combines search, categories, and editorial order; details preserve fullscreen, previous/next, and ?series= context with a global fallback.",
    series: "Photography series",
    seriesText: "Three manual sequences group authentic relationships or documented editorial affinities. Every photograph keeps its own detail page and, when opened from a series, previous, next, and return follow that order.",
    quality: "Accessibility, performance, and SEO",
    qualityItems: ["Content remains visible without animation", "Keyboard, focus, localized alt text, and reduced motion", "Responsive images, lazy loading, and reserved dimensions", "Canonical, hreflang, Open Graph, and localized sitemap"],
    delivery: "CI/CD and Cloudflare",
    deliveryText: "GitHub Actions validates types, lint, tests, build and export before deploying the static site to Cloudflare Workers. The documented version included 67 tests and a token limited to the Worker and its route.",
    decisions: "Challenges, decisions, and trade-offs",
    decisionsText: "The work prioritised verifiable photographic relationships, one central configuration per system, and progressive enhancement. Carousels, horizontal scrolling, new shaders, and per-card effects were rejected to protect clarity, memory, and navigation restoration.",
    results: "Published result",
    resultsText: "The result is an ES/EN archive published at rawvives.aleviclop.dev, with individual image pages, series and keyboard navigation. The repository provides the code, tests and static deployment configuration for review.",
    learnings: "Learnings",
    learningItems: ["Curation creates more continuity than adding content", "Motion works better as a grammar than a collection of effects", "Contextual navigation needs a stable direct-access fallback"],
    gallery: "Published product",
    next: "Next case",
    nextTitle: "LumaFlow Studio",
    nextText: "A full-stack product for organising professional photography work.",
  },
} as const;

const stack = ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "GSAP", "Three.js", "Lenis", "Cloudflare Workers", "GitHub Actions"];

export function RawVivesCaseStudy() {
  const { language } = useLanguage();
  const t = copy[language];
  const figures = [["30", language === "es" ? "Fotografías" : "Photographs"], ["3", "Series"], ["73", language === "es" ? "Rutas estáticas" : "Static routes"], ["67", language === "es" ? "Pruebas" : "Tests"]];

  return (
    <CaseShell
      identity="raw"
      title={<>raw.<span className="accent-serif">vives</span></>}
      plainTitle="raw.vives"
      eyebrow={t.kicker}
      lead={<p>{t.lead}</p>}
      facts={[
        [t.role, t.roleText],
        [t.stack, stack.slice(0, 5).join(" · ")],
        [language === "es" ? "Alcance publicado" : "Published scope", <span key="figures" className={styles.figures}>{figures.map(([value, label]) => <span key={label}><strong>{value}</strong> {label}</span>)}</span>],
      ]}
      actions={<>
        <a href={productionUrl} target="_blank" rel="noopener noreferrer" className="action-primary">{t.live}<ArrowUpRight aria-hidden="true" /></a>
        <a href={repositoryUrl} target="_blank" rel="noopener noreferrer" className="action-secondary"><FaGithub aria-hidden="true" />{t.code}</a>
      </>}
      showcase={{
        image: "/projects/raw-vives/raw-vives-hero.webp",
        alt: language === "es" ? "Hero de raw.vives con los acantilados de Moher" : "raw.vives hero featuring the Cliffs of Moher",
        viewTransitionName: "project-raw-vives",
        caption: language === "es" ? "Vista del proyecto · Captura de la web" : "Project preview · Website screenshot",
      }}
      contents={[["context", t.summary], ["architecture", t.stack], ["decisions", t.decisions], ["result", t.results]]}
      next={{ href: localizeHref("/proyectos/lumaflow-studio", language), title: t.nextTitle }}
    >
      <Chapter id="context" number="01" label={t.summary} title={t.challenge}>
        <p className={styles.prose}>{t.summaryText}</p>
        <p className={styles.prose}>{t.challengeText}</p>
        <div className={`${styles.split} ${styles.pair}`}>
          <div><h3 className={styles.subhead}>{t.goals}</h3><ul className={styles.list}>{t.goalItems.map(item => <li key={item}>{item}</li>)}</ul></div>
          <div><h3 className={styles.subhead}>{t.role}</h3><p className={styles.prose}>{t.roleText}</p></div>
        </div>
      </Chapter>

      <Chapter id="architecture" number="02" label={t.stack} title={t.direction}>
        <p className={styles.prose}>{t.directionText}</p>
        <figure className={styles.inlineFigure}>
          <Image src="/projects/raw-vives/raw-vives-home-editorial.webp" alt={language === "es" ? "Sección de series en la home editorial de raw.vives" : "Series section on the raw.vives editorial home"} width={1272} height={716} sizes="(max-width: 1023px) 92vw, 66vw" loading="lazy" />
          <figcaption>{language === "es" ? "Home editorial · captura del sitio publicado" : "Editorial home · published website screenshot"}</figcaption>
        </figure>
        <ul className={styles.stackGrid} aria-label={t.stack}>
          {stack.map(item => <li key={item}>{item}</li>)}
        </ul>
        <ol className={styles.steps}>
          {[[t.architecture, t.architectureText], [t.series, t.seriesText], [t.delivery, t.deliveryText]].map(([title, text], index) => <li key={title}>
            <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
            <h3>{title}</h3>
            <p>{text}</p>
          </li>)}
        </ol>
      </Chapter>

      <section aria-label={t.gallery} className={styles.gallerySection}>
        <div className={styles.gallery}>
          {media.slice(1).map(([file, esAlt, enAlt], index) => <figure key={file}>
            <Image src={`/projects/raw-vives/${file}`} alt={language === "es" ? esAlt : enAlt} width={1272} height={716} loading="lazy"
              sizes={index === 0 ? "(max-width: 767px) 92vw, 84rem" : "(max-width: 767px) 92vw, 42rem"} />
            <figcaption>{String(index + 1).padStart(2, "0")} / {language === "es" ? esAlt : enAlt}</figcaption>
          </figure>)}
        </div>
      </section>

      <Chapter id="decisions" number="03" label={t.decisions} title={language === "es" ? "Un sistema, distintos modos de explorar." : "One system, different ways to explore."} tone="raised">
        <p className={styles.prose}>{t.decisionsText}</p>
        <h3 className={styles.subhead}>{t.quality}</h3>
        <ul className={styles.list}>{t.qualityItems.map(item => <li key={item}>{item}</li>)}</ul>
      </Chapter>

      <Chapter id="result" number="04" label={t.results} title={language === "es" ? "Un archivo publicado y código para revisar." : "A published archive with code to review."}>
        <p className={styles.prose}>{t.resultsText}</p>
        <h3 className={styles.subhead}>{t.learnings}</h3>
        <ol className={styles.list}>{t.learningItems.map(item => <li key={item}>{item}</li>)}</ol>
        <div className={styles.inlineActions}>
          <a href={productionUrl} target="_blank" rel="noopener noreferrer" className="cinema-link">{t.live}<ArrowUpRight aria-hidden="true" /></a>
          <a href={repositoryUrl} target="_blank" rel="noopener noreferrer" className="cinema-link"><FaGithub aria-hidden="true" />{t.code}<ArrowUpRight aria-hidden="true" /></a>
        </div>
      </Chapter>
    </CaseShell>
  );
}
