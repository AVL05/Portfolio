import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo-page-shell";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Proyectos de Alex Vicente López",
  description:
    "Proyectos web de Alex Vicente López: React, Next.js, Laravel, PHP, MySQL, ecommerce, APIs, landing pages, diseño editorial y experiencias digitales.",
  alternates: {
    canonical: absoluteUrl("/proyectos"),
  },
  openGraph: {
    title: "Proyectos de Alex Vicente López",
    description:
      "Trabajo seleccionado de Alex Vicente López en desarrollo web frontend, backend y diseño digital.",
    url: absoluteUrl("/proyectos"),
    siteName: SITE_NAME,
    type: "website",
    images: [
      `${SITE_URL}/api/og?title=Proyectos%20Alex%20Vicente%20L%C3%B3pez`,
    ],
  },
};

export default function ProjectsPage() {
  return (
    <SeoPageShell
      eyebrow="Proyectos"
      title="Proyectos web de Alex Vicente López"
      description="Selección de proyectos de Alex Vicente López en desarrollo web, aplicaciones full-stack, APIs, ecommerce, landings, diseño editorial e interfaces digitales."
      sections={[
        {
          title: "Distrito Gourmet",
          body: "Aplicación web de restaurante con menú digital, panel de administración, gestión de platos, pedidos y reservas, desarrollada con React, Tailwind CSS, Laravel, MySQL y Docker.",
        },
        {
          title: "El Fogón",
          body: "Landing gastronómica centrada en jerarquía visual, estructura responsive, contenido claro y navegación sencilla para presentar una experiencia de restaurante mediterráneo.",
        },
        {
          title: "API hotelera",
          body: "API para gestión hotelera construida con PHP, MySQL y JavaScript, con trabajo en estructura de datos, endpoints, validación y flujo principal de reservas.",
        },
        {
          title: "Diseño y fotografía",
          body: "Además del código, Alex Vicente López desarrolla proyectos visuales como diseño editorial, composición fotográfica y piezas digitales con atención a la identidad visual.",
        },
      ]}
    />
  );
}
