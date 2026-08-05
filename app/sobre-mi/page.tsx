import { SeoPageShell } from "@/components/seo-page-shell";
import { createLocalizedMetadata } from "@/lib/seo";
import { getRequestLanguage } from "@/lib/request-language";

export async function generateMetadata() {
  return createLocalizedMetadata({
    language: await getRequestLanguage(),
    path: "/sobre-mi",
    type: "profile",
    copy: {
      es: {
        title: "Sobre Alex Vicente López",
        description:
          "Perfil profesional de Alex Vicente López, desarrollador Full-Stack freelance en Valencia con experiencia construyendo aplicaciones web completas.",
      },
      en: {
        title: "About Alex Vicente López",
        description:
          "Professional profile of Alex Vicente López, a Valencia-based freelance Full-Stack Developer building complete web applications.",
      },
    },
  });
}

export default function AboutPage() {
  return (
    <SeoPageShell
      eyebrow={{ es: "Sobre mí", en: "About" }}
      title={{ es: "Sobre Alex Vicente López", en: "About Alex Vicente López" }}
      description={{
        es: "Alex Vicente López es desarrollador Full-Stack freelance con formación en DAW y experiencia práctica construyendo aplicaciones web de principio a fin.",
        en: "Alex Vicente López is a freelance Full-Stack Developer with a Web Application Development qualification and practical experience building complete web applications.",
      }}
      sections={[
        {
          title: { es: "Perfil profesional", en: "Professional profile" },
          body: {
            es: "Alex trabaja como freelance diseñando y desarrollando productos web completos, desde la interfaz hasta la API, los datos y la entrega. Su trabajo combina implementación accesible, criterio de producto y dirección visual.",
            en: "Alex works freelance, designing and developing complete web products from interface to API, data, and delivery. His work combines accessible implementation, product judgment, and visual direction.",
          },
        },
        {
          title: { es: "Formación técnica", en: "Technical education" },
          body: {
            es: "Su formación en Desarrollo de Aplicaciones Web y Sistemas Microinformáticos y Redes le permite entender tanto la construcción de aplicaciones como la base técnica que las sostiene.",
            en: "His education in Web Application Development and IT Systems and Networks provides an understanding of both application development and the technical foundations supporting it.",
          },
        },
        {
          title: { es: "Tecnologías principales", en: "Core stack" },
          body: {
            es: "Alex Vicente trabaja con React, Next.js, TypeScript, Tailwind CSS, GSAP, PHP, Laravel, MySQL y herramientas de diseño para construir experiencias web claras y mantenibles.",
            en: "Alex Vicente works with React, Next.js, TypeScript, Tailwind CSS, GSAP, PHP, Laravel, MySQL, and design tools to build clear, maintainable web experiences.",
          },
        },
        {
          title: { es: "Identidad digital", en: "Digital identity" },
          body: {
            es: "También aparece como Alex Vicente, Alex Vicente Lopez, aleviclop y AVL05 en perfiles técnicos, proyectos de GitHub y contenido relacionado con fotografía y diseño digital.",
            en: "He also appears as Alex Vicente, Alex Vicente Lopez, aleviclop, and AVL05 across technical profiles, GitHub projects, and photography and digital design content.",
          },
        },
      ]}
    />
  );
}
