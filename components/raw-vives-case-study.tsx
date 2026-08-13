"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, Check, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useLanguage } from "@/lib/language-context";

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
    summary: "Resumen",
    summaryText: "raw.vives convierte una colección fotográfica en un producto editorial estático. La home ordena el relato, el archivo facilita encontrar imágenes y las series mantienen continuidad entre páginas sin sacrificar URLs reales ni navegación directa.",
    challenge: "Problema inicial",
    challengeText: "Las fotografías se percibían como piezas aisladas, con repeticiones y una entrada visual demasiado uniforme. El reto fue dar función a cada imagen y construir continuidad sin convertir el sitio en una demostración de efectos.",
    goals: "Objetivos",
    goalItems: ["Jerarquizar y curar el recorrido", "Conectar archivo, fichas y series", "Mantener rendimiento, teclado y reduced motion"],
    role: "Mi papel",
    roleText: "Diseño de interfaz, dirección de arte, arquitectura frontend, modelado de contenido, curación, interacción, accesibilidad, SEO localizado, tests y CI/CD.",
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
    deliveryText: "GitHub Actions valida tipos, lint, 67 tests, build y exportación antes de desplegar el sitio estático en Cloudflare Workers con un token limitado al Worker y su ruta.",
    decisions: "Retos, decisiones y compromisos",
    decisionsText: "Se priorizaron relaciones fotográficas verificables, una única configuración por sistema y progressive enhancement. Se descartaron carruseles, scroll horizontal, nuevos shaders y efectos por tarjeta para proteger claridad, memoria y restauración de navegación.",
    results: "Resultados medidos",
    resultsText: "El archivo bilingüe publica obras individuales y series curadas mediante rutas estáticas. La validación automatizada cubre 67 tests, y no se atribuyen tráfico, conversiones ni feedback no medidos.",
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
    summary: "Summary",
    summaryText: "raw.vives turns a photography collection into a static editorial product. The home shapes the narrative, the archive makes images discoverable, and series preserve continuity across real, directly accessible URLs.",
    challenge: "Initial problem",
    challengeText: "Photographs felt isolated, repeated, and entered with an overly uniform visual treatment. The challenge was to give each image a purpose and create continuity without turning the site into an effects demo.",
    goals: "Goals",
    goalItems: ["Curate and prioritize the journey", "Connect archive, details, and series", "Preserve performance, keyboard access, and reduced motion"],
    role: "My role",
    roleText: "Interface design, art direction, frontend architecture, content modelling, curation, interaction, accessibility, localized SEO, tests, and CI/CD.",
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
    deliveryText: "GitHub Actions validates types, lint, 67 tests, build, and export before deploying the static site to Cloudflare Workers with a token limited to the Worker and its route.",
    decisions: "Challenges, decisions, and trade-offs",
    decisionsText: "The work prioritised verifiable photographic relationships, one central configuration per system, and progressive enhancement. Carousels, horizontal scrolling, new shaders, and per-card effects were rejected to protect clarity, memory, and navigation restoration.",
    results: "Measured results",
    resultsText: "The bilingual archive publishes individual works and curated series through static routes. Automated validation covers 67 tests, with no claims about unmeasured traffic, conversion, or feedback.",
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

  return (
    <main id="main-content" className="case-study min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.05]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <nav aria-label={t.back} className="mb-12 flex items-center justify-between rounded-lg border border-border/65 bg-card/60 px-4 py-3 sm:mb-16">
            <Link href="/#projects" className="inline-flex min-h-11 items-center gap-2 font-mono text-xs font-black uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"><ArrowLeft className="h-4 w-4" />{t.back}</Link>
            <a href={productionUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border/70 px-4 py-2 font-mono text-[11px] font-black uppercase tracking-[0.12em] transition-colors hover:border-primary/45 hover:text-primary">raw.vives <ExternalLink className="h-3.5 w-3.5" /></a>
          </nav>

          <div className="grid gap-10 lg:grid-cols-[minmax(0,.78fr)_minmax(420px,.82fr)] lg:items-center">
            <div>
              <p className="section-kicker mb-5">{t.kicker}</p>
              <h1 className="text-6xl font-black leading-[0.86] tracking-[-0.055em] sm:text-8xl lg:text-[7.5rem]">raw.<span className="text-primary">vives</span></h1>
              <p className="mt-7 max-w-3xl text-lg font-medium leading-relaxed text-muted-foreground sm:text-xl">{t.lead}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={productionUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90">{t.live}<ArrowUpRight className="h-4 w-4" /></a>
                <a href={repositoryUrl} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-border/70 px-5 py-3 text-sm font-bold hover:border-primary/45 hover:text-primary"><FaGithub className="h-4 w-4" />{t.code}</a>
              </div>
            </div>
            <figure className="relative aspect-[16/10] overflow-hidden rounded-lg border border-border/65 bg-card">
              <Image src="/projects/raw-vives/raw-vives-hero.webp" alt={language === "es" ? "Hero de raw.vives con los acantilados de Moher" : "raw.vives hero featuring the Cliffs of Moher"} fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 640px" style={{ viewTransitionName: "project-raw-vives" }} />
            </figure>
          </div>

          <dl className="mt-12 grid grid-cols-2 border-y border-border/55 sm:grid-cols-4">
            {[["30", language === "es" ? "Fotografías" : "Photographs"], ["3", language === "es" ? "Series" : "Series"], ["73", language === "es" ? "Rutas estáticas" : "Static routes"], ["67", language === "es" ? "Pruebas" : "Tests"]].map(([value, label]) => <div key={label} className="border-border/55 px-3 py-5 first:pl-0 sm:border-r sm:last:border-r-0"><dt className="font-mono text-2xl font-black text-primary sm:text-3xl">{value}</dt><dd className="mt-1 text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">{label}</dd></div>)}
          </dl>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.72fr_1.28fr]">
        <div><p className="section-kicker mb-4">{t.summary}</p><h2 className="text-3xl font-black leading-tight sm:text-5xl">{t.challenge}</h2></div>
        <div className="space-y-6 text-base font-medium leading-relaxed text-muted-foreground sm:text-lg"><p>{t.summaryText}</p><p>{t.challengeText}</p><div className="grid gap-4 border-t border-border/55 pt-6 sm:grid-cols-2"><div><h3 className="mb-3 text-lg font-black text-foreground">{t.goals}</h3><ul className="space-y-2">{t.goalItems.map(item => <li key={item} className="flex gap-2"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{item}</li>)}</ul></div><div><h3 className="mb-3 text-lg font-black text-foreground">{t.role}</h3><p>{t.roleText}</p></div></div></div>
      </div></section>

      <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl rounded-lg border border-border/65 bg-card/62 p-6 sm:p-9"><p className="section-kicker mb-5">{t.stack}</p><div className="flex flex-wrap gap-2">{stack.map(item => <span key={item} className="rounded-md border border-border/55 bg-background/40 px-3 py-2 font-mono text-[11px] font-bold uppercase tracking-[.1em] text-muted-foreground">{item}</span>)}</div></div></section>

      <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-2 lg:items-center"><div><p className="section-kicker mb-4">01 / Editorial</p><h2 className="text-3xl font-black leading-tight sm:text-5xl">{t.direction}</h2><p className="mt-5 text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">{t.directionText}</p></div><Image src="/projects/raw-vives/raw-vives-home-editorial.webp" alt={language === "es" ? "Sección de series en la home editorial de raw.vives" : "Series section on the raw.vives editorial home"} width={1280} height={720} className="h-auto w-full rounded-lg border border-border/65" sizes="(max-width:1024px) 100vw, 50vw" /></div></section>

      <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-5 lg:grid-cols-3">{[[t.architecture,t.architectureText],[t.series,t.seriesText],[t.delivery,t.deliveryText]].map(([title, text], index) => <article key={title} className="rounded-lg border border-border/65 bg-card/62 p-6"><span className="font-mono text-xs font-black text-primary">0{index + 2}</span><h2 className="mt-5 text-2xl font-black">{title}</h2><p className="mt-4 font-medium leading-relaxed text-muted-foreground">{text}</p></article>)}</div></section>

      <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="section-kicker mb-4">{t.gallery}</p><h2 className="mb-9 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">{language === "es" ? "Un sistema, distintos modos de explorar." : "One system, different ways to explore."}</h2><div className="grid gap-6 md:grid-cols-2">{media.map(([file, esAlt, enAlt], index) => <figure key={file} className={index === 0 ? "md:col-span-2" : ""}><div className="relative aspect-video overflow-hidden rounded-lg border border-border/65 bg-card"><Image src={`/projects/raw-vives/${file}`} alt={language === "es" ? esAlt : enAlt} fill className="object-cover" loading="lazy" sizes={index === 0 ? "(max-width:768px) 100vw, 1200px" : "(max-width:768px) 100vw, 50vw"} /></div><figcaption className="mt-3 font-mono text-[11px] font-bold uppercase tracking-[0.12em] text-muted-foreground">{String(index + 1).padStart(2, "0")} / {language === "es" ? esAlt : enAlt}</figcaption></figure>)}</div></div></section>

      <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-2"><article className="rounded-lg border border-border/65 bg-card/62 p-7"><p className="section-kicker mb-4">{t.quality}</p><ul className="space-y-3">{t.qualityItems.map(item => <li key={item} className="flex gap-3 font-medium text-muted-foreground"><Check className="mt-1 h-4 w-4 shrink-0 text-primary" />{item}</li>)}</ul></article><article className="rounded-lg border border-border/65 bg-card/62 p-7"><p className="section-kicker mb-4">{t.decisions}</p><p className="font-medium leading-relaxed text-muted-foreground">{t.decisionsText}</p></article></div></section>

      <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.9fr_1.1fr]"><div><p className="section-kicker mb-4">{t.results}</p><h2 className="text-3xl font-black leading-tight sm:text-5xl">{language === "es" ? "Resultados verificables, sin métricas decorativas." : "Verifiable results, without decorative metrics."}</h2><p className="mt-5 font-medium leading-relaxed text-muted-foreground">{t.resultsText}</p></div><div className="rounded-lg border border-border/65 bg-card/62 p-7"><h3 className="text-2xl font-black">{t.learnings}</h3><ol className="mt-5 space-y-4">{t.learningItems.map((item,index) => <li key={item} className="flex gap-4 font-medium text-muted-foreground"><span className="font-mono text-xs font-black text-primary">0{index + 1}</span>{item}</li>)}</ol></div></div></section>

      <section className="px-4 py-20 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-8 rounded-lg border border-primary/30 bg-primary/8 p-7 sm:p-10 lg:grid-cols-[1fr_auto] lg:items-end"><div><p className="section-kicker mb-4">{t.next}</p><h2 className="text-4xl font-black sm:text-6xl">{t.nextTitle}</h2><p className="mt-4 max-w-2xl font-medium text-muted-foreground">{t.nextText}</p></div><Link href="/proyectos/lumaflow-studio" className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90">{language === "es" ? "Ver siguiente caso" : "View next case"}<ArrowUpRight className="h-4 w-4" /></Link></div></section>
    </main>
  );
}
