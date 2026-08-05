import { SeoPageShell } from "@/components/seo-page-shell";
import { createLocalizedMetadata } from "@/lib/seo";
import { getRequestLanguage } from "@/lib/request-language";

export async function generateMetadata() {
  return createLocalizedMetadata({
    language: await getRequestLanguage(),
    path: "/contacto",
    copy: {
      es: {
        title: "Contacto de Alex Vicente López",
        description:
          "Contacto profesional de Alex Vicente López para oportunidades full-stack, proyectos web y colaboraciones digitales.",
      },
      en: {
        title: "Contact Alex Vicente López",
        description:
          "Professional contact details for Alex Vicente López regarding full-stack roles, web projects, and digital collaborations.",
      },
    },
  });
}

export default function ContactPage() {
  return (
    <SeoPageShell
      eyebrow={{ es: "Contacto", en: "Contact" }}
      title={{
        es: "Contacto profesional de Alex Vicente López",
        en: "Contact Alex Vicente López",
      }}
      description={{
        es: "Página de contacto de Alex Vicente López para oportunidades como desarrollador full-stack junior, colaboraciones digitales y proyectos web completos.",
        en: "Contact Alex Vicente López about junior full-stack development roles, digital collaborations, and complete web projects.",
      }}
      sections={[
        {
          title: { es: "Correo electrónico", en: "Email" },
          body: {
            es: "Puedes contactar con Alex Vicente López por email en alexviclop@gmail.com para oportunidades profesionales, prácticas, proyectos web o colaboraciones digitales.",
            en: "Contact Alex Vicente López at alexviclop@gmail.com about professional roles, internships, web projects, or digital collaborations.",
          },
        },
        {
          title: { es: "LinkedIn", en: "LinkedIn" },
          body: {
            es: "El perfil profesional de LinkedIn de Alex Vicente López recoge su formación, experiencia y trayectoria vinculada al desarrollo web y la creación digital.",
            en: "Alex Vicente López’s LinkedIn profile covers his education, experience, and work in web development and digital creation.",
          },
        },
        {
          title: { es: "GitHub", en: "GitHub" },
          body: {
            es: "En GitHub, Alex Vicente aparece como AVL05 y comparte repositorios relacionados con desarrollo web, proyectos formativos, APIs y aplicaciones full-stack.",
            en: "On GitHub, Alex Vicente appears as AVL05 and shares repositories covering web development, educational projects, APIs, and full-stack applications.",
          },
        },
        {
          title: { es: "Portfolio", en: "Portfolio" },
          body: {
            es: "aleviclop.dev es la referencia principal para encontrar el portfolio, proyectos, fotografía y enlaces oficiales de Alex Vicente López.",
            en: "aleviclop.dev is the main destination for Alex Vicente López’s portfolio, projects, photography, and official links.",
          },
        },
      ]}
    />
  );
}
