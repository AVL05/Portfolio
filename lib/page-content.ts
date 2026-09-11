import type { Language } from "@/lib/language-context";

export type LocalizedText = Record<Language, string>;

export interface IndexPageContent {
  meta: Record<Language, { title: string; description: string }>;
  eyebrow: LocalizedText;
  title: LocalizedText;
  description: LocalizedText;
  sections: Array<{ title: LocalizedText; body: LocalizedText }>;
}

export const PROJECTS_PAGE: IndexPageContent = {
  meta: {
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
  eyebrow: { es: "Proyectos", en: "Projects" },
  title: {
    es: "Proyectos web de Alex Vicente López",
    en: "Alex Vicente López’s web projects",
  },
  description: {
    es: "Selección de proyectos de Alex Vicente López en desarrollo web, aplicaciones full-stack, APIs, ecommerce, landings, diseño editorial e interfaces digitales.",
    en: "A selection of Alex Vicente López’s work in web development, full-stack applications, APIs, e-commerce, landing pages, editorial design, and digital interfaces.",
  },
  sections: [
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
  ],
};

export const ABOUT_PAGE: IndexPageContent = {
  meta: {
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
  eyebrow: { es: "Sobre mí", en: "About" },
  title: { es: "Sobre Alex Vicente López", en: "About Alex Vicente López" },
  description: {
    es: "Alex Vicente López es Frontend / Full-Stack Developer centrado en React y Next.js. Su formación DAW y experiencia con Laravel, PHP y MySQL le permiten integrar interfaces con APIs y datos reales.",
    en: "Alex Vicente López is a Frontend / Full-Stack Developer focused on React and Next.js. His web development training and Laravel, PHP, and MySQL experience support real API and data integration.",
  },
  sections: [
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
  ],
};

export const PHOTOGRAPHY_PAGE: IndexPageContent = {
  meta: {
    es: {
      title: "Fotografía de Alex Vicente López",
      description:
        "Portfolio fotográfico de Alex Vicente López: composición, fotografía urbana, paisaje y dirección de arte aplicada a interfaces digitales.",
    },
    en: {
      title: "Photography by Alex Vicente López",
      description:
        "Alex Vicente López’s photography portfolio: composition, urban photography, landscapes, and art direction applied to digital interfaces.",
    },
  },
  eyebrow: { es: "Fotografía", en: "Photography" },
  title: {
    es: "Fotografía y mirada visual de Alex Vicente López",
    en: "Alex Vicente López’s photography and visual perspective",
  },
  description: {
    es: "La fotografía forma parte de la identidad digital de Alex Vicente López y refuerza su forma de trabajar interfaces, composición, detalle y narrativa visual.",
    en: "Photography is part of Alex Vicente López’s digital identity and informs how he approaches interfaces, composition, detail, and visual narrative.",
  },
  sections: [
    {
      title: { es: "Galería fotográfica", en: "Photography gallery" },
      body: {
        es: "La galería pública está disponible en rawvives.aleviclop.dev y reúne una selección visual vinculada a composición, paisaje, entorno urbano y edición fotográfica.",
        en: "The public gallery at rawvives.aleviclop.dev presents a visual selection focused on composition, landscapes, urban environments, and photographic editing.",
      },
    },
    {
      title: { es: "Composición", en: "Composition" },
      body: {
        es: "El trabajo fotográfico complementa su portfolio técnico con atención a encuadre, jerarquía, ritmo y calidad UI.",
        en: "His photography complements the technical portfolio through attention to framing, hierarchy, rhythm, and UI quality.",
      },
    },
    {
      title: { es: "Diseño digital", en: "Digital design" },
      body: {
        es: "La fotografía y el diseño editorial se trasladan a interfaces con decisiones más precisas de tipografía, jerarquía y composición.",
        en: "Photography and editorial design translate into more precise choices in interface typography, hierarchy, and composition.",
      },
    },
    {
      title: { es: "Identidad creativa", en: "Creative identity" },
      body: {
        es: "Alex Vicente combina desarrollo web y fotografía para construir una presencia digital reconocible bajo el dominio aleviclop.dev y la galería rawvives.aleviclop.dev.",
        en: "Alex Vicente combines web development and photography to build a recognizable digital presence across aleviclop.dev and rawvives.aleviclop.dev.",
      },
    },
  ],
};

export const CONTACT_PAGE: IndexPageContent = {
  meta: {
    es: {
      title: "Contacto de Alex Vicente López",
      description:
        "Contacto profesional de Alex Vicente López para oportunidades frontend, proyectos web freelance y colaboraciones digitales.",
    },
    en: {
      title: "Contact Alex Vicente López",
      description:
        "Professional contact details for Alex Vicente López regarding frontend roles, freelance web projects, and digital collaborations.",
    },
  },
  eyebrow: { es: "Contacto", en: "Contact" },
  title: {
    es: "Contacto profesional de Alex Vicente López",
    en: "Contact Alex Vicente López",
  },
  description: {
    es: "Contacta con Alex Vicente López para oportunidades frontend, pequeños proyectos web freelance y colaboraciones.",
    en: "Contact Alex Vicente López about frontend roles, small freelance web projects, and collaborations.",
  },
  sections: [
    {
      title: { es: "Correo electrónico", en: "Email" },
      body: {
        es: "Puedes contactar con Alex Vicente López por email en alexviclop@gmail.com para proyectos freelance, oportunidades profesionales o colaboraciones digitales.",
        en: "Contact Alex Vicente López at alexviclop@gmail.com about freelance projects, professional roles, or digital collaborations.",
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
  ],
};
