import type { ProjectCaseStudyData } from "@/components/project-case-study";
import type { Language } from "@/lib/language-context";

export interface CaseMetadataCopy {
  es: { title: string; description: string };
  en: { title: string; description: string };
}

export const RAW_VIVES_URLS = {
  image: "/projects/raw-vives/raw-vives-og.webp",
  production: "https://rawvives.aleviclop.dev/",
  repository: "https://github.com/AVL05/alexgallery",
} as const;

export const RAW_VIVES_METADATA_COPY: Record<
  Language,
  { title: string; description: string }
> = {
  es: {
    title: "raw.vives - Caso de estudio",
    description:
      "Caso de estudio de raw.vives, archivo fotográfico editorial bilingüe con series curadas, obras individuales, interacción accesible y despliegue estático.",
  },
  en: {
    title: "raw.vives - Case study",
    description:
      "Case study of raw.vives, a bilingual editorial photography archive with curated series, individual works, accessible interaction, and static deployment.",
  },
};

export const LUMA_URLS = {
  path: "/proyectos/lumaflow-studio",
  github: "https://github.com/AVL05/lumaflow-studio",
  image: "/projects/lumaflow-studio-og.webp",
} as const;

export const LUMA_METADATA_COPY: CaseMetadataCopy = {
  es: {
    title: "LumaFlow Studio - Caso de estudio",
    description:
      "Caso de estudio de una plataforma full-stack para estudios fotográficos creada con React, Laravel, MySQL, PWA e IA local.",
  },
  en: {
    title: "LumaFlow Studio - Case study",
    description:
      "Case study of a full-stack photography studio platform built with React, Laravel, MySQL, PWA, and local AI.",
  },
};

export const LUMA_DATA: ProjectCaseStudyData = {
  title: "LumaFlow Studio",
  eyebrow: { es: "Caso de estudio / Producto full-stack", en: "Case study / Full-stack product" },
  summary: {
    es: "Plataforma de flujo de trabajo para fotógrafos que conecta planificación, CRM, finanzas, entregas y asistencia local con IA sin convertir el proyecto en un SaaS ficticio.",
    en: "A workflow platform for photographers connecting planning, CRM, finance, delivery, and local AI assistance without presenting the project as a fictional SaaS.",
  },
  role: {
    es: "Diseñé y desarrollé el producto completo: interfaz React, API Laravel, autenticación, modelo de datos multiusuario, módulos de negocio, IA local, pruebas y documentación.",
    en: "I designed and built the complete product: React interface, Laravel API, authentication, multi-user data model, business modules, local AI, testing, and documentation.",
  },
  image: "/projects/lumaflow-studio-cover.svg",
  imageAlt: { es: "Representación conceptual de los módulos de LumaFlow Studio", en: "Conceptual overview of LumaFlow Studio modules" },
  viewTransitionName: "project-lumaflow-studio",
  stack: ["React 19", "Vite", "Tailwind CSS 4", "Laravel 13", "PHP 8.3", "Sanctum", "MySQL 8", "WebGPU", "WebLLM", "Docker", "PWA", "Vitest / PHPUnit"],
  github: LUMA_URLS.github,
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
    { es: "El panel y el calendario priorizan tareas, sesiones y entregas que requieren acción.", en: "Dashboard and calendar prioritize tasks, sessions, and deliveries requiring action." },
    { es: "Búsqueda global y atajos reducen navegación repetitiva.", en: "Global search and shortcuts reduce repetitive navigation." },
    { es: "Estados de sistema hacen visibles API, datos, almacenamiento e IA opcional.", en: "System status makes API, data, storage, and optional AI visible." },
    { es: "La PWA conserva una estructura base sin conexión; los modelos pesados siguen bajo demanda.", en: "The PWA keeps an offline shell while heavy models remain on demand." },
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

export const DISTRITO_URLS = {
  path: "/proyectos/distrito-gourmet",
  demo: "https://distrito.aleviclop.dev/",
  github: "https://github.com/AVL05/distrito-gourmet",
  image: "/projects/distrito-gourmet-og.webp",
} as const;

export const DISTRITO_METADATA_COPY: CaseMetadataCopy = {
  es: {
    title: "Distrito Gourmet - Caso de estudio",
    description:
      "Caso de estudio de Distrito Gourmet, aplicación full-stack para restaurante con carta, pedidos y reservas, creada con React, Laravel y MySQL.",
  },
  en: {
    title: "Distrito Gourmet - Case study",
    description:
      "Case study of Distrito Gourmet, a full-stack restaurant application with menu, orders, and reservations, built with React, Laravel, and MySQL.",
  },
};

export const DISTRITO_DATA: ProjectCaseStudyData = {
  title: "Distrito Gourmet",
  eyebrow: { es: "Caso de estudio / Producto full-stack", en: "Case study / Full-stack product" },
  summary: { es: "Aplicación para restaurante que conecta carta, pedidos y reservas con un panel operativo propio.", en: "A restaurant application connecting menu, orders, and reservations with its own operations dashboard." },
  role: { es: "Diseñé el producto y desarrollé frontend React, API Laravel, modelo MySQL, flujos de cliente y administración, despliegue y documentación.", en: "I designed the product and built the React frontend, Laravel API, MySQL model, customer and admin flows, deployment, and documentation." },
  image: "/projects/distrito-gourmet-ui.webp",
  imageAlt: { es: "Hero de la web de Distrito Gourmet con acceso a carta y reservas", en: "Distrito Gourmet website hero with menu and reservation actions" },
  viewTransitionName: "project-distrito-gourmet",
  stack: ["React 19", "Vite", "Tailwind CSS", "Laravel 12", "PHP 8.2", "MySQL", "Zustand", "React Router", "GSAP", "Docker"],
  github: DISTRITO_URLS.github, demo: DISTRITO_URLS.demo,
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
