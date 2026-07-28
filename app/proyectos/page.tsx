import { SeoPageShell } from "@/components/seo-page-shell";
import { createLocalizedMetadata } from "@/lib/seo";
import { getRequestLanguage } from "@/lib/request-language";

export async function generateMetadata() {
  return createLocalizedMetadata({
    language: await getRequestLanguage(),
    path: "/proyectos",
    copy: {
      es: {
        title: "Proyectos de Alex Vicente López",
        description:
          "Proyectos de Alex Vicente López en frontend, aplicaciones full-stack, APIs, diseño editorial e interfaces digitales.",
      },
      en: {
        title: "Projects by Alex Vicente López",
        description:
          "Selected frontend, full-stack application, API, editorial design, and digital interface projects by Alex Vicente López.",
      },
    },
  });
}

export default function ProjectsPage() {
  return (
    <SeoPageShell
      eyebrow={{ es: "Proyectos", en: "Projects" }}
      title={{
        es: "Proyectos web de Alex Vicente López",
        en: "Alex Vicente López’s web projects",
      }}
      description={{
        es: "Selección de proyectos de Alex Vicente López en desarrollo web, aplicaciones full-stack, APIs, ecommerce, landings, diseño editorial e interfaces digitales.",
        en: "A selection of Alex Vicente López’s work in web development, full-stack applications, APIs, e-commerce, landing pages, editorial design, and digital interfaces.",
      }}
      sections={[
        {
          title: { es: "LumaFlow Studio", en: "LumaFlow Studio" },
          body: {
            es: "Plataforma full-stack para estudios fotográficos: planificación, CRM, finanzas, entregas e IA local sobre React, Laravel y MySQL, respaldada por 89 tests.",
            en: "A full-stack platform for photography studios covering planning, CRM, finance, delivery, and local AI with React, Laravel, and MySQL, backed by 89 tests.",
          },
        },
        {
          title: { es: "Distrito Gourmet", en: "Distrito Gourmet" },
          body: {
            es: "Aplicación web de restaurante con menú digital, panel de administración, gestión de platos, pedidos y reservas, desarrollada con React, Tailwind CSS, Laravel, MySQL y Docker.",
            en: "A restaurant web application with a digital menu, admin dashboard, dish management, orders, and reservations, built with React, Tailwind CSS, Laravel, MySQL, and Docker.",
          },
        },
        {
          title: { es: "El Fogón", en: "El Fogón" },
          body: {
            es: "Landing gastronómica centrada en jerarquía visual, estructura responsive, contenido claro y navegación sencilla para presentar una experiencia de restaurante mediterráneo.",
            en: "A restaurant landing page focused on visual hierarchy, responsive structure, clear content, and simple navigation for a Mediterranean dining experience.",
          },
        },
        {
          title: { es: "API hotelera", en: "Hotel API" },
          body: {
            es: "API para gestión hotelera construida con PHP, MySQL y JavaScript, con trabajo en estructura de datos, endpoints, validación y flujo principal de reservas.",
            en: "A hotel management API built with PHP, MySQL, and JavaScript, covering data structure, endpoints, validation, and the core reservation flow.",
          },
        },
        {
          title: { es: "Diseño y fotografía", en: "Design and photography" },
          body: {
            es: "Además del código, Alex Vicente López desarrolla proyectos visuales como diseño editorial, composición fotográfica y piezas digitales con atención a la identidad visual.",
            en: "Alongside code, Alex Vicente López creates visual work spanning editorial design, photographic composition, and digital pieces with close attention to visual identity.",
          },
        },
      ]}
    />
  );
}
