import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, BriefcaseBusiness, Camera, Database, FileCheck2, Images, Server } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

const githubUrl = "https://github.com/AVL05/raw-manager";
const stack = ["React 19", "Vite 8", "Tailwind CSS 4", "Zustand", "TanStack Query", "Laravel 13", "Sanctum", "MySQL / MariaDB", "PWA"];
const groups = [
  { title: "Negocio", icon: BriefcaseBusiness, items: ["Clientes y contactos", "Sesiones y calendario", "Presupuestos y facturas"] },
  { title: "Producción", icon: Camera, items: ["Galerías privadas", "Biblioteca y equipo", "Presets y localizaciones"] },
  { title: "Planificación", icon: Images, items: ["Moodboards visuales", "Clima y hora dorada", "Búsqueda y acciones rápidas"] },
];

export const metadata: Metadata = {
  title: "RAW Manager - Caso de estudio",
  description: "Caso de estudio de RAW Manager, plataforma full-stack para fotógrafos creada con React, Laravel, Sanctum, MySQL y tecnología PWA.",
  alternates: { canonical: absoluteUrl("/proyectos/raw-manager") },
  openGraph: { title: "RAW Manager - Caso de estudio", description: "Un espacio de trabajo full-stack para gestionar el ciclo completo de un encargo fotográfico.", url: absoluteUrl("/proyectos/raw-manager"), siteName: SITE_NAME, type: "article", images: [`${SITE_URL}/projects/raw-manager-cover.svg`] },
};

export default function RawManagerCaseStudyPage() {
  return <main id="main-content" className="case-study min-h-screen overflow-hidden bg-background text-foreground">
    <section className="relative px-4 pb-16 pt-6 sm:px-6 lg:px-8">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.05]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <nav className="mb-16 flex items-center justify-between rounded-xl border border-border/65 bg-card/60 px-4 py-3 backdrop-blur-xl">
          <Link href="/#projects" className="inline-flex items-center gap-2 font-mono text-xs font-black uppercase tracking-[0.16em] text-muted-foreground hover:text-primary"><ArrowLeft className="h-4 w-4" />Volver</Link>
          <Link href="/#contact" className="rounded-lg border border-border/70 px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.16em] hover:border-primary/45 hover:text-primary">Hablemos</Link>
        </nav>
        <div className="grid gap-12 lg:grid-cols-[minmax(0,.82fr)_minmax(380px,.68fr)] lg:items-center">
          <div><p className="section-kicker mb-5">Caso de estudio / Producto full-stack</p><h1 className="text-5xl font-black leading-[.9] sm:text-7xl lg:text-8xl">RAW Manager</h1><p className="mt-7 max-w-3xl text-lg font-medium leading-relaxed text-muted-foreground sm:text-xl">Un sistema operativo para fotógrafos que reúne negocio, producción y planificación en una aplicación coherente, evitando hojas de cálculo y herramientas aisladas.</p>
            <div className="mt-8 flex flex-wrap gap-3"><a href={githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground hover:bg-primary/90"><FaGithub className="h-4 w-4" />Ver código</a></div>
          </div>
          <div className="relative aspect-[8/5] overflow-hidden rounded-xl border border-border/65 bg-card" style={{ viewTransitionName: "project-raw-manager" }}><Image src="/projects/raw-manager-cover.svg" alt="Vista conceptual de RAW Manager" fill className="object-cover" priority sizes="(max-width:1024px) 100vw, 560px" /></div>
        </div>
      </div>
    </section>
    <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="section-kicker mb-4">El reto</p><div className="grid gap-8 lg:grid-cols-2"><h2 className="text-3xl font-black leading-tight sm:text-5xl">Convertir un flujo profesional fragmentado en un solo producto.</h2><p className="text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">Un fotógrafo gestiona contactos, fechas, entregas, documentación y material. RAW Manager modela esas relaciones y permite pasar de un cliente a una sesión, presupuesto, factura y galería sin perder el contexto.</p></div></div></section>
    <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto max-w-7xl"><p className="section-kicker mb-4">Solución</p><h2 className="mb-9 max-w-4xl text-3xl font-black leading-tight sm:text-5xl">Módulos conectados alrededor del trabajo fotográfico.</h2><div className="grid gap-5 lg:grid-cols-3">{groups.map(group => <article key={group.title} className="rounded-xl border border-border/65 bg-card/62 p-6"><group.icon className="mb-5 h-6 w-6 text-primary"/><h3 className="mb-4 text-xl font-black">{group.title}</h3><ul className="space-y-3">{group.items.map(item => <li key={item} className="flex gap-3 text-sm font-medium text-muted-foreground"><span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary"/>{item}</li>)}</ul></article>)}</div></div></section>
    <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.8fr_1.2fr]"><div><p className="section-kicker mb-4">Arquitectura</p><h2 className="text-3xl font-black leading-tight sm:text-5xl">Cliente React, API Laravel y datos relacionales.</h2></div><div className="space-y-5"><div className="rounded-xl border border-border/65 bg-card/62 p-6"><Server className="mb-4 h-5 w-5 text-primary"/><p className="font-medium leading-relaxed text-muted-foreground">React gestiona la experiencia y el estado del cliente; Laravel concentra autenticación, validación y reglas de negocio mediante una API protegida con Sanctum.</p></div><div className="rounded-xl border border-border/65 bg-card/62 p-6"><Database className="mb-4 h-5 w-5 text-primary"/><p className="font-medium leading-relaxed text-muted-foreground">El modelo MySQL conecta clientes, sesiones y documentos financieros, manteniendo trazabilidad entre las operaciones.</p></div><div className="grid gap-2 sm:grid-cols-3">{stack.map(item => <span key={item} className="rounded-lg border border-border/55 bg-card/62 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[.1em] text-muted-foreground">{item}</span>)}</div></div></div></section>
    <section className="px-4 py-16 sm:px-6 lg:px-8"><div className="mx-auto grid max-w-7xl gap-7 rounded-xl border border-border/70 bg-card/70 p-7 sm:p-10 lg:grid-cols-[.8fr_1.2fr]"><div><p className="section-kicker mb-4">Resultado</p><h2 className="text-3xl font-black leading-tight sm:text-5xl">Un producto de portfolio con profundidad real.</h2></div><div><p className="text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">RAW Manager demuestra diseño de producto, arquitectura full-stack, autenticación, modelado de datos y una interfaz responsive instalable como PWA. El repositorio incluye datos de demostración reproducibles para evaluar los flujos.</p><a href={githubUrl} target="_blank" rel="noopener noreferrer" className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground"><FileCheck2 className="h-4 w-4"/>Revisar implementación</a></div></div></section>
  </main>;
}
