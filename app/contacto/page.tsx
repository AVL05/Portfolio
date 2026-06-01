import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo-page-shell";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Contacto de Alex Vicente López",
  description:
    "Contacto profesional de Alex Vicente López, desarrollador web junior en Valencia con experiencia en React, Next.js, Laravel, PHP y diseño digital.",
  alternates: {
    canonical: absoluteUrl("/contacto"),
  },
  openGraph: {
    title: "Contacto de Alex Vicente López",
    description:
      "Formas de contacto profesional con Alex Vicente López para oportunidades de desarrollo web y proyectos digitales.",
    url: absoluteUrl("/contacto"),
    siteName: SITE_NAME,
    type: "website",
    images: [`${SITE_URL}/api/og?title=Contacto%20Alex%20Vicente%20L%C3%B3pez`],
  },
};

export default function ContactPage() {
  return (
    <SeoPageShell
      eyebrow="Contacto"
      title="Contacto profesional de Alex Vicente López"
      description="Página de contacto de Alex Vicente López para oportunidades como desarrollador web junior, colaboraciones digitales y proyectos relacionados con interfaces, frontend, backend o diseño visual."
      sections={[
        {
          title: "Email",
          body: "Puedes contactar con Alex Vicente López por email en alexviclop@gmail.com para oportunidades profesionales, prácticas, proyectos web o colaboraciones digitales.",
        },
        {
          title: "LinkedIn",
          body: "El perfil profesional de LinkedIn de Alex Vicente López recoge su formación, experiencia y trayectoria vinculada al desarrollo web y la creación digital.",
        },
        {
          title: "GitHub",
          body: "En GitHub, Alex Vicente aparece como AVL05 y comparte repositorios relacionados con desarrollo web, proyectos formativos, APIs y aplicaciones frontend.",
        },
        {
          title: "Portfolio",
          body: "aleviclop.dev es la referencia principal para encontrar el portfolio, proyectos, fotografía y enlaces oficiales de Alex Vicente López.",
        },
      ]}
    />
  );
}
