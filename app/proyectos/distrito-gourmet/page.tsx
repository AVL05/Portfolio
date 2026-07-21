import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  Database,
  GitBranch,
  LayoutDashboard,
  Server,
  ShoppingCart,
  Utensils,
} from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

const projectUrl = "/proyectos/distrito-gourmet";
const demoUrl = "https://distrito.aleviclop.dev/";
const githubUrl = "https://github.com/AVL05/distrito-gourmet";

const stack = [
  "Laravel 12",
  "PHP 8.2+",
  "React 19",
  "Vite",
  "MySQL",
  "Zustand",
  "React Router 7",
  "GSAP",
  "Docker",
  "Tailwind CSS",
];

const highlights = [
  {
    value: "Full-stack",
    label: "Frontend, backend, datos y despliegue",
  },
  {
    value: "API REST",
    label: "Laravel desacoplado del cliente React",
  },
  {
    value: "Admin",
    label: "Pedidos, sala, cocina, platos y usuarios",
  },
];

const problemPoints = [
  "Dependencia de plataformas externas para reservas y pedidos.",
  "Comisiones que reducen el margen del restaurante.",
  "Falta de soberanía sobre datos de clientes, pedidos y reservas.",
  "Necesidad de centralizar la operativa diaria en una sola herramienta.",
];

const featureGroups = [
  {
    title: "Cliente",
    icon: Utensils,
    items: [
      "Carta interactiva",
      "Vista de platos",
      "Carrito de compra",
      "Pasarela de pedido",
      "Reservas de mesa",
      "Perfil con reservas y pedidos",
    ],
  },
  {
    title: "Administración",
    icon: LayoutDashboard,
    items: [
      "Gestión de platos",
      "Monitor de sala",
      "Monitor de cocina",
      "Gestión de usuarios",
      "Estados de pedidos",
      "Control de reservas",
    ],
  },
  {
    title: "Base técnica",
    icon: Server,
    items: [
      "API REST en Laravel",
      "Base de datos MySQL",
      "Seeder gastronómico",
      "Estado global con Zustand",
      "Rutas SPA con React Router",
      "Microinteracciones con GSAP",
    ],
  },
];

const process = [
  {
    title: "Análisis y viabilidad",
    body: "El proyecto parte de un análisis de mercado, DAFO y viabilidad técnica, económica y temporal para validar que la solución tenía sentido dentro del contexto de restauración.",
  },
  {
    title: "Requisitos y flujos",
    body: "Se definieron casos de uso para cliente y administrador, cubriendo reserva, pedido, carrito, perfil, gestión interna y monitores operativos.",
  },
  {
    title: "Diseño de datos",
    body: "El modelo entidad-relación contempla usuarios, reservas, pedidos, platos, bebidas, vinos, menús de degustación, detalles de pedido y relaciones gastronómicas.",
  },
  {
    title: "Implementación",
    body: "La aplicación se construye con backend Laravel independiente y frontend React/Vite, conectados mediante API REST y una estructura pensada para mantenimiento.",
  },
];

export const metadata: Metadata = {
  title: "Distrito Gourmet - Caso de estudio",
  description:
    "Caso de estudio de Distrito Gourmet, aplicación full-stack de restaurante creada por Alex Vicente López con React, Vite, Laravel, MySQL, Docker, reservas, pedidos y panel de administración.",
  alternates: {
    canonical: absoluteUrl(projectUrl),
  },
  openGraph: {
    title: "Distrito Gourmet - Caso de estudio",
    description:
      "Aplicación web full-stack para restaurante con carta, reservas, pedidos, panel admin, API REST en Laravel y frontend React.",
    url: absoluteUrl(projectUrl),
    siteName: SITE_NAME,
    type: "article",
    images: [`${SITE_URL}/projects/distrito_gourmet.png`],
  },
};

export default function DistritoGourmetCaseStudyPage() {
  return (
    <main id="main-content" className="case-study min-h-screen overflow-hidden bg-background text-foreground">
      <section className="relative px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.05]" />
        <div className="pointer-events-none absolute right-[-14rem] top-[-10rem] h-[34rem] w-[34rem] rounded-full bg-primary/10 blur-[120px]" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <nav className="mb-16 flex items-center justify-between gap-4 rounded-xl border border-border/65 bg-card/60 px-4 py-3 backdrop-blur-xl">
            <Link
              href="/#projects"
              className="inline-flex items-center gap-2 font-mono text-xs font-black uppercase tracking-[0.16em] text-muted-foreground transition-colors hover:text-primary"
            >
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Link>
            <Link
              href="/#contact"
              className="rounded-lg border border-border/70 bg-background/35 px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.16em] text-foreground transition-colors hover:border-primary/45 hover:text-primary"
            >
              Hablemos
            </Link>
          </nav>

          <div className="grid gap-12 lg:grid-cols-[minmax(0,0.92fr)_minmax(340px,0.58fr)] lg:items-end">
            <div>
              <p className="section-kicker mb-5">
                Caso de estudio / DAW 2025-2026
              </p>
              <h1 className="max-w-5xl text-5xl font-black leading-[0.9] tracking-normal text-foreground sm:text-7xl lg:text-8xl">
                Distrito Gourmet
              </h1>
              <p className="mt-7 max-w-3xl text-lg font-medium leading-relaxed text-muted-foreground sm:text-xl">
                Plataforma web integral para un restaurante, pensada para
                gestionar carta, reservas, pedidos y administración sin depender
                de plataformas externas ni perder el control de los datos del
                negocio.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={demoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  Abrir demo
                  <ArrowUpRight className="h-4 w-4" />
                </a>
                <a
                  href={githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-card/55 px-5 py-3 text-sm font-bold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary"
                >
                  <FaGithub className="h-4 w-4" />
                  Ver código
                </a>
              </div>
            </div>

            <aside className="rounded-xl border border-border/65 bg-card/70 p-5 backdrop-blur-xl" style={{ viewTransitionName: "project-distrito-gourmet" }}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg border border-border/60 bg-secondary">
                <Image
                  src="/projects/distrito_gourmet.png"
                  alt="Captura del proyecto Distrito Gourmet"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 420px"
                  priority
                />
              </div>
              <div className="mt-5 grid gap-3">
                {highlights.map((item) => (
                  <div
                    key={item.label}
                    className="border-t border-border/50 pt-3 first:border-t-0 first:pt-0"
                  >
                    <p className="font-mono text-xl font-black text-foreground">
                      {item.value}
                    </p>
                    <p className="mt-1 text-sm font-medium text-muted-foreground">
                      {item.label}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.72fr_1fr]">
          <div>
            <p className="section-kicker mb-4">Problema</p>
            <h2 className="text-3xl font-black leading-tight text-foreground sm:text-5xl">
              Un restaurante necesita operar sin ceder su negocio a terceros.
            </h2>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {problemPoints.map((point) => (
              <div
                key={point}
                className="rounded-xl border border-border/65 bg-card/60 p-5 text-sm font-medium leading-relaxed text-muted-foreground"
              >
                {point}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col justify-between gap-5 border-b border-border/65 pb-8 md:flex-row md:items-end">
            <div>
              <p className="section-kicker mb-4">Solución</p>
              <h2 className="max-w-4xl text-3xl font-black leading-tight text-foreground sm:text-5xl">
                Una aplicación completa para cliente y equipo interno.
              </h2>
            </div>
            <p className="max-w-xl text-base font-medium leading-relaxed text-muted-foreground">
              La navegación se divide entre experiencia pública y panel interno:
              carta, reserva y pedido para el cliente; gestión operativa para el
              restaurante.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-3">
            {featureGroups.map((group) => (
              <article
                key={group.title}
                className="rounded-xl border border-border/65 bg-card/62 p-6"
              >
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                    <group.icon className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-black text-foreground">
                    {group.title}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="flex gap-3 text-sm font-medium text-muted-foreground"
                    >
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                      {item}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="section-kicker mb-4">Arquitectura</p>
            <h2 className="text-3xl font-black leading-tight text-foreground sm:text-5xl">
              Backend Laravel independiente y frontend React conectado por API.
            </h2>
            <p className="mt-6 text-base font-medium leading-relaxed text-muted-foreground">
              El servidor procesa la lógica de negocio en controladores Laravel
              y devuelve JSON. El cliente React consume la API y mantiene la
              experiencia fluida con estado global y rutas SPA.
            </p>
          </div>

          <div className="space-y-5">
            <div className="rounded-xl border border-border/65 bg-card/62 p-6">
              <div className="mb-5 flex items-center gap-3">
                <Database className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-black text-foreground">
                  Modelo de datos
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                El diseño contempla usuarios, reservas, pedidos, platos,
                bebidas, vinos, menús de degustación y detalles de pedido. La
                normalización evita duplicidades y deja margen para ampliar el
                sistema.
              </p>
            </div>

            <div className="rounded-xl border border-border/65 bg-card/62 p-6">
              <div className="mb-5 flex items-center gap-3">
                <GitBranch className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-black text-foreground">
                  Flujo funcional
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                El mapa web separa carta, reservas, carrito, perfil y panel de
                administración. En el panel se gestionan platos, sala, cocina y
                usuarios.
              </p>
            </div>

            <div className="grid gap-2 rounded-xl border border-border/65 bg-card/62 p-5 sm:grid-cols-2">
              {stack.map((item) => (
                <span
                  key={item}
                  className="rounded-lg border border-border/55 bg-background/35 px-3 py-2 font-mono text-[10px] font-bold uppercase tracking-[0.12em] text-muted-foreground"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 max-w-3xl">
            <p className="section-kicker mb-4">Proceso</p>
            <h2 className="text-3xl font-black leading-tight text-foreground sm:text-5xl">
              Del análisis del negocio a una demo desplegada.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {process.map((step, index) => (
              <article
                key={step.title}
                className="rounded-xl border border-border/65 bg-card/62 p-6"
              >
                <p className="mb-5 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-primary">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mb-3 text-xl font-black text-foreground">
                  {step.title}
                </h3>
                <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 rounded-xl border border-border/70 bg-card/70 p-6 backdrop-blur-xl sm:p-8 lg:grid-cols-[0.8fr_1.2fr] lg:p-10">
          <div>
            <p className="section-kicker mb-4">Resultado</p>
            <h2 className="text-3xl font-black leading-tight text-foreground sm:text-5xl">
              Un proyecto final que demuestra producto, datos e interfaz.
            </h2>
          </div>
          <div className="space-y-6">
            <p className="text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
              Distrito Gourmet no se queda en una landing. Es una aplicación con
              flujos completos de cliente y administración, una base de datos
              diseñada para el dominio gastronómico y una arquitectura separada
              que facilita mantenimiento y evolución.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
              >
                Probar demo
                <ShoppingCart className="h-4 w-4" />
              </a>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 rounded-lg border border-border/70 bg-background/35 px-5 py-3 text-sm font-bold text-foreground transition-all hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary"
              >
                Hablar del proyecto
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
