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
      eyebrow="Sobre mí"
      title="Sobre Alex Vicente López"
      description="Alex Vicente López es Frontend Developer con formación en DAW, base full-stack y experiencia práctica construyendo interfaces con React, Next.js y TypeScript."
      sections={[
        {
          title: "Perfil profesional",
          body: "Alex se especializa en frontend con React, Next.js y TypeScript. Su trabajo combina implementación accesible, criterio de producto y dirección visual aplicada a interfaces reales.",
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
