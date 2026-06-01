import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo-page-shell";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Sobre Alex Vicente López",
  description:
    "Perfil profesional de Alex Vicente López, desarrollador web en Valencia con formación full-stack, React, Next.js, Laravel, PHP y criterio visual.",
  alternates: {
    canonical: absoluteUrl("/sobre-mi"),
  },
  openGraph: {
    title: "Sobre Alex Vicente López",
    description:
      "Conoce el perfil profesional de Alex Vicente López, desarrollador web con base full-stack y sensibilidad visual.",
    url: absoluteUrl("/sobre-mi"),
    siteName: SITE_NAME,
    type: "profile",
    images: [`${SITE_URL}/api/og?title=Sobre%20Alex%20Vicente%20L%C3%B3pez`],
  },
};

export default function AboutPage() {
  return (
    <SeoPageShell
      eyebrow="Sobre mi"
      title="Sobre Alex Vicente López"
      description="Alex Vicente López es un desarrollador web en formación con base full-stack, experiencia práctica en React, Electron, PHP, Laravel y proyectos digitales con atención al detalle visual."
      sections={[
        {
          title: "Perfil profesional",
          body: "El portfolio de Alex Vicente López centraliza su trabajo como desarrollador web junior, combinando programación frontend, backend, diseño de interfaces y criterio visual aplicado a productos digitales.",
        },
        {
          title: "Formación técnica",
          body: "Su formación en Desarrollo de Aplicaciones Web y Sistemas Microinformáticos y Redes le permite entender tanto la construcción de aplicaciones como la base técnica que las sostiene.",
        },
        {
          title: "Stack principal",
          body: "Alex Vicente trabaja con React, Next.js, TypeScript, Tailwind CSS, GSAP, PHP, Laravel, MySQL y herramientas de diseño para construir experiencias web claras y mantenibles.",
        },
        {
          title: "Identidad digital",
          body: "También aparece como Alex Vicente, Alex Vicente Lopez, aleviclop y AVL05 en perfiles técnicos, proyectos de GitHub y contenido relacionado con fotografía y diseño digital.",
        },
      ]}
    />
  );
}
