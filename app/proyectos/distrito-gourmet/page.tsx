import type { Metadata } from "next";
import { ProjectCaseStudy, type ProjectCaseStudyData } from "@/components/project-case-study";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

const projectUrl = "/proyectos/distrito-gourmet";
const demoUrl = "https://distrito.aleviclop.dev/";
const githubUrl = "https://github.com/AVL05/distrito-gourmet";

export const metadata: Metadata = {
  title: "Distrito Gourmet - Caso de estudio",
  description: "Caso de estudio de una aplicación full-stack para restaurante creada con React, Laravel y MySQL.",
  alternates: { canonical: absoluteUrl(projectUrl) },
  openGraph: {
    title: "Distrito Gourmet - Caso de estudio",
    description: "Producto full-stack con carta, pedidos, reservas, administración y API REST.",
    url: absoluteUrl(projectUrl), siteName: SITE_NAME, type: "article",
    images: [`${SITE_URL}/projects/distrito_gourmet.png`],
  },
};

const data: ProjectCaseStudyData = {
  title: "Distrito Gourmet",
  eyebrow: { es: "Caso de estudio / Producto full-stack", en: "Case study / Full-stack product" },
  summary: { es: "Aplicación para restaurante que conecta carta, pedidos y reservas con un panel operativo propio.", en: "A restaurant application connecting menu, orders, and reservations with its own operations dashboard." },
  role: { es: "Diseñé el producto y desarrollé frontend React, API Laravel, modelo MySQL, flujos de cliente y administración, despliegue y documentación.", en: "I designed the product and built the React frontend, Laravel API, MySQL model, customer and admin flows, deployment, and documentation." },
  image: "/projects/distrito_gourmet.png",
  imageAlt: { es: "Interfaz pública de Distrito Gourmet", en: "Distrito Gourmet public interface" },
  viewTransitionName: "project-distrito-gourmet",
  stack: ["React 19", "Vite", "Tailwind CSS", "Laravel 12", "PHP 8.2", "MySQL", "Zustand", "React Router", "GSAP", "Docker"],
  github: githubUrl, demo: demoUrl,
  problem: {
    title: { es: "Carta, reservas y operativa viven demasiado a menudo en servicios aislados.", en: "Menu, reservations, and operations too often live in isolated services." },
    body: { es: "El proyecto explora cómo reunir experiencia pública y gestión interna sin perder control sobre datos, estados de pedido y disponibilidad.", en: "The project explores how to bring the public experience and internal management together while retaining control over data, order states, and availability." },
  },
  goals: [
    { es: "Unificar carta, carrito, pedidos y reservas.", en: "Unify menu, cart, orders, and reservations." },
    { es: "Separar experiencia pública y operaciones internas.", en: "Separate the public experience from internal operations." },
    { es: "Modelar el dominio gastronómico en una base de datos mantenible.", en: "Model the restaurant domain in a maintainable database." },
  ],
  process: [
    { title: { es: "Análisis", en: "Analysis" }, body: { es: "Definí requisitos, casos de uso y límites para cliente y administración.", en: "I defined requirements, use cases, and boundaries for customers and administrators." } },
    { title: { es: "Datos", en: "Data" }, body: { es: "Diseñé relaciones para usuarios, platos, pedidos, reservas y sus estados.", en: "I designed relationships for users, dishes, orders, reservations, and their states." } },
    { title: { es: "Implementación", en: "Implementation" }, body: { es: "Construí una SPA React conectada por API REST a Laravel y MySQL.", en: "I built a React SPA connected through a REST API to Laravel and MySQL." } },
    { title: { es: "Entrega", en: "Delivery" }, body: { es: "Preparé demo, contenedores y documentación para revisión reproducible.", en: "I prepared the demo, containers, and documentation for reproducible review." } },
  ],
  technicalDecisions: [
    { es: "Frontend y backend desacoplados mediante contratos JSON.", en: "Frontend and backend decoupled through JSON contracts." },
    { es: "Estado compartido del cliente concentrado en Zustand.", en: "Shared client state concentrated in Zustand." },
    { es: "Modelo relacional para evitar duplicar datos operativos.", en: "Relational model to avoid duplicating operational data." },
  ],
  uxDecisions: [
    { es: "Flujo de carta a carrito sin sacar al usuario del contexto.", en: "Menu-to-cart flow without removing users from context." },
    { es: "Estados diferenciados para sala, cocina y administración.", en: "Distinct states for front-of-house, kitchen, and administration." },
    { es: "Jerarquía responsive que mantiene visibles las acciones principales.", en: "Responsive hierarchy keeping primary actions visible." },
  ],
  architecture: { es: "SPA React y API Laravel desacopladas sobre MySQL.", en: "Decoupled React SPA and Laravel API backed by MySQL." },
  challenge: { es: "Mantener coherencia entre carrito, pedido, reserva y panel cuando cada flujo cambia datos compartidos.", en: "Keeping cart, order, reservation, and admin flows coherent as each changes shared data." },
  solution: { es: "Separé responsabilidades por dominio, centralicé estado transversal y definí transiciones explícitas para los flujos operativos.", en: "I separated responsibilities by domain, centralized cross-cutting state, and defined explicit transitions for operational flows." },
  result: { es: "Demo pública con carta, carrito, reservas y panel de administración funcionales.", en: "Public demo with working menu, cart, reservations, and administration dashboard." },
  learnings: [
    { es: "Los estados operativos necesitan nombres y transiciones inequívocos.", en: "Operational states need unambiguous names and transitions." },
    { es: "Separar API e interfaz mejora la revisión, pero exige contratos claros.", en: "Separating API and interface improves reviewability but requires clear contracts." },
    { es: "Una demo creíble debe mostrar tanto el recorrido público como la gestión interna.", en: "A credible demo should show both the public journey and internal management." },
  ],
};

export default function DistritoGourmetCaseStudyPage() {
  return <ProjectCaseStudy data={data} />;
}
