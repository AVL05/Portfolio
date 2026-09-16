import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo-page-shell";
import { ABOUT_PAGE } from "@/lib/page-content";
import { buildPageMetadata, faqJsonLd } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "es",
    path: "/sobre-mi",
    type: "profile",
    title: ABOUT_PAGE.meta.es.title,
    description: ABOUT_PAGE.meta.es.description,
  });
}

const faq = faqJsonLd([
  {
    question: "¿Full-stack junior?",
    answer:
      "Sí: Alex trabaja en aplicaciones web desde la interfaz hasta la API y los datos, con React, Laravel, PHP y MySQL, y continúa creciendo en desarrollo de software e IA aplicada.",
  },
  {
    question: "¿Está disponible para nuevas oportunidades?",
    answer:
      "Sí, para puestos de desarrollo Full-Stack junior presenciales, híbridos o remotos, además de proyectos freelance seleccionados. Contacto en alexviclop@gmail.com con respuesta en 24-48 horas.",
  },
  {
    question: "¿Qué tecnologías utiliza?",
    answer:
      "React, Next.js, JavaScript, PHP, Laravel, MySQL, APIs, Git y Docker, con atención a accesibilidad, responsive y rendimiento.",
  },
]);

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <SeoPageShell
        eyebrow={ABOUT_PAGE.eyebrow}
        title={ABOUT_PAGE.title}
        description={ABOUT_PAGE.description}
        sections={ABOUT_PAGE.sections}
      />
    </>
  );
}
