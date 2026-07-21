import type { Metadata } from "next";
import { ProjectCaseStudy, type ProjectCaseStudyData } from "@/components/project-case-study";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

const projectUrl = "/proyectos/lumaflow-studio";
const githubUrl = "https://github.com/AVL05/lumaflow-studio";

export const metadata: Metadata = {
  title: "LumaFlow Studio - Caso de estudio",
  description: "Caso de estudio de LumaFlow Studio, plataforma full-stack para estudios fotográficos creada con React, Laravel, MySQL, PWA e IA local mediante WebGPU.",
  alternates: { canonical: absoluteUrl(projectUrl) },
  openGraph: {
    title: "LumaFlow Studio - Caso de estudio",
    description: "Arquitectura, producto y decisiones de una plataforma full-stack para gestionar el flujo completo de un estudio fotográfico.",
    url: absoluteUrl(projectUrl),
    siteName: SITE_NAME,
    type: "article",
    images: [`${SITE_URL}/projects/lumaflow-studio-cover.svg`],
  },
};

const data: ProjectCaseStudyData = {
  title: "LumaFlow Studio",
  eyebrow: { es: "Caso de estudio / Producto full-stack", en: "Case study / Full-stack product" },
  summary: {
    es: "Plataforma de workflow para fotógrafos que conecta planificación, CRM, finanzas, entregas y asistencia local con IA sin convertir el proyecto en un SaaS ficticio.",
    en: "A workflow platform for photographers connecting planning, CRM, finance, delivery, and local AI assistance without presenting the project as a fictional SaaS.",
  },
  role: {
    es: "Diseñé y desarrollé el producto completo: interfaz React, API Laravel, autenticación, modelo de datos multiusuario, módulos de negocio, IA local, testing y documentación.",
    en: "I designed and built the complete product: React interface, Laravel API, authentication, multi-user data model, business modules, local AI, testing, and documentation.",
  },
  image: "/projects/lumaflow-studio-cover.svg",
  imageAlt: { es: "Representación conceptual de los módulos de LumaFlow Studio", en: "Conceptual overview of LumaFlow Studio modules" },
  viewTransitionName: "project-lumaflow-studio",
  stack: ["React 19", "Vite", "Tailwind CSS 4", "Laravel 13", "PHP 8.3", "Sanctum", "MySQL 8", "WebGPU", "WebLLM", "Docker", "PWA", "Vitest / PHPUnit"],
  github: githubUrl,
  problem: {
    title: { es: "Un estudio fotográfico acumula herramientas aisladas y pierde contexto.", en: "Photography studios lose context across disconnected tools." },
    body: { es: "Sesiones, clientes, tareas, presupuestos, facturas, localizaciones y entregas suelen vivir en aplicaciones separadas. El objetivo era modelar esas relaciones en un producto evaluable y reproducible, manteniendo privacidad y límites de alcance claros.", en: "Sessions, clients, tasks, quotes, invoices, locations, and deliveries often live in separate applications. The goal was to model those relationships in an assessable, reproducible product while keeping privacy and scope boundaries explicit." },
  },
  goals: [
    { es: "Centralizar el flujo de una sesión desde la planificación hasta la entrega.", en: "Connect a session from planning through delivery." },
    { es: "Proteger cada recurso mediante propiedad por usuario y autenticación Sanctum.", en: "Protect every resource through user ownership and Sanctum authentication." },
    { es: "Integrar IA local bajo demanda sin claves externas ni coste inicial de JavaScript.", en: "Add on-demand local AI without external keys or initial JavaScript cost." },
    { es: "Dejar arquitectura, instalación y límites documentados para revisión técnica.", en: "Document architecture, setup, and limits for technical review." },
  ],
  process: [
    { title: { es: "Dominio", en: "Domain" }, body: { es: "Definí entidades y relaciones alrededor de clientes, sesiones, tareas, documentos financieros y galerías.", en: "I defined entities and relationships around clients, sessions, tasks, financial documents, and galleries." } },
    { title: { es: "Arquitectura", en: "Architecture" }, body: { es: "Separé frontend y backend por HTTP, con controladores delgados, servicios de dominio, requests y resources.", en: "I separated frontend and backend over HTTP, using thin controllers, domain services, requests, and resources." } },
    { title: { es: "Producto", en: "Product" }, body: { es: "Construí módulos conectados, navegación por teclado, búsqueda global y estados operativos reproducibles.", en: "I built connected modules, keyboard navigation, global search, and reproducible operational states." } },
    { title: { es: "Calidad", en: "Quality" }, body: { es: "Cerré el producto con tests, Docker, documentación técnica y una lista explícita de funciones pendientes.", en: "I closed the release with tests, Docker, technical documentation, and an explicit list of pending features." } },
  ],
  technicalDecisions: [
    { es: "Consultas limitadas por user_id mediante scopes y relaciones de Eloquent.", en: "Queries scoped by user_id through Eloquent scopes and relationships." },
    { es: "404 para recursos ajenos, evitando confirmar que existen.", en: "404 responses for resources owned by someone else, avoiding existence disclosure." },
    { es: "Lógica de dominio en servicios y validación en Form Requests.", en: "Domain logic in services and validation in Form Requests." },
    { es: "WebLLM y modelos WebGPU cargados solo cuando el usuario activa IA.", en: "WebLLM and WebGPU models loaded only when the user enables AI." },
  ],
  uxDecisions: [
    { es: "Dashboard y calendario priorizan tareas, sesiones y entregas que requieren acción.", en: "Dashboard and calendar prioritize tasks, sessions, and deliveries requiring action." },
    { es: "Búsqueda global y atajos reducen navegación repetitiva.", en: "Global search and shortcuts reduce repetitive navigation." },
    { es: "Estados de sistema hacen visibles API, datos, almacenamiento e IA opcional.", en: "System status makes API, data, storage, and optional AI visible." },
    { es: "La PWA conserva un shell offline; los modelos pesados siguen bajo demanda.", en: "The PWA keeps an offline shell while heavy models remain on demand." },
  ],
  architecture: { es: "SPA React y API Laravel independientes, conectadas por HTTP y respaldadas por MySQL.", en: "Independent React SPA and Laravel API connected over HTTP and backed by MySQL." },
  challenge: { es: "Mantener coherencia entre muchos módulos sin convertir controladores, estado o navegación en puntos de acoplamiento difíciles de probar.", en: "Keeping many modules coherent without turning controllers, state, or navigation into tightly coupled, hard-to-test bottlenecks." },
  solution: { es: "Organicé el código por dominio, separé estado remoto y local, encapsulé reglas en servicios y documenté contratos, instalación y límites del producto.", en: "I organized code by domain, separated remote and local state, encapsulated rules in services, and documented contracts, setup, and product limits." },
  result: { es: "Release pública de código con 56 tests backend y 33 frontend.", en: "Public code release with 56 backend tests and 33 frontend tests." },
  learnings: [
    { es: "Un producto de portfolio gana credibilidad cuando documenta también lo que no implementa.", en: "A portfolio product gains credibility when it documents what it does not implement." },
    { es: "La privacidad y la propiedad de datos deben formar parte del modelo, no añadirse al final.", en: "Privacy and data ownership must be part of the model rather than added at the end." },
    { es: "La IA local aporta valor solo cuando no penaliza el flujo principal ni oculta sus límites.", en: "Local AI adds value only when it does not penalize the core workflow or hide its limits." },
  ],
};

export default function LumaFlowStudioCaseStudyPage() {
  return <ProjectCaseStudy data={data} />;
}
