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
          "Perfil profesional de Alex Vicente López, Frontend / Full-Stack Developer en Valencia centrado en React y Next.js, con experiencia full-stack y disponibilidad freelance.",
      },
      en: {
        title: "About Alex Vicente López",
        description:
          "Professional profile of Alex Vicente López, a Valencia-based Frontend / Full-Stack Developer focused on React and Next.js with full-stack experience and freelance availability.",
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
        es: "Alex Vicente López es Frontend / Full-Stack Developer centrado en React y Next.js. Su formación DAW y experiencia con Laravel, PHP y MySQL le permiten integrar interfaces con APIs y datos reales.",
        en: "Alex Vicente López is a Frontend / Full-Stack Developer focused on React and Next.js. His web development training and Laravel, PHP, and MySQL experience support real API and data integration.",
      }}
      sections={[
        {
          title: { es: "Fuera de la pantalla", en: "Beyond the screen" },
          body: {
            es: "La montaña y la fotografía forman parte de mi mirada. Alex Creative Space conecta ese lado personal con el trabajo que hago como desarrollador.",
            en: "Mountains and photography shape the way I see. Alex Creative Space connects that personal side with my work as a developer.",
          },
        },
        {
          title: { es: "Perfil profesional", en: "Professional profile" },
          body: {
            es: "Alex trabaja principalmente en interfaces React y Next.js: estructura responsive, interacción, accesibilidad y calidad UI. Puede continuar el trabajo en APIs, PHP, Laravel y MySQL cuando el proyecto lo requiere.",
            en: "Alex works mainly on React and Next.js interfaces: responsive structure, interaction, accessibility, and UI quality. He can continue into APIs, PHP, Laravel, and MySQL when a project requires it.",
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
