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
        "Proyectos de Alex Vicente López en desarrollo Full-Stack, frontend, backend, APIs y construcción de productos digitales.",
    },
    en: {
      title: "Projects by Alex Vicente López",
      description:
        "Selected full-stack development, frontend, backend, API and digital product projects by Alex Vicente López.",
    },
  },
  eyebrow: { es: "Proyectos", en: "Projects" },
  title: {
    es: "Proyectos web de Alex Vicente López",
    en: "Alex Vicente López’s web projects",
  },
  description: {
    es: "Selección de proyectos personales y académicos donde he trabajado desarrollo Full-Stack, frontend, backend, APIs y construcción de productos digitales.",
    en: "A selection of personal and academic projects covering full-stack development, frontend, backend, APIs and digital product building.",
  },
  sections: [
    {
      title: { es: "AI Creative Assistant", en: "AI Creative Assistant" },
      body: {
        es: "Aplicación de escritorio con IA para analizar contenido multimedia y automatizar parte del proceso creativo con modelos ejecutados localmente. Mi entorno práctico para IA aplicada, agentes y automatización.",
        en: "An AI desktop application for analysing multimedia content and automating parts of the creative workflow with locally executed models. My hands-on environment for applied AI, agents and automation.",
      },
    },
    {
      title: { es: "Distrito Gourmet", en: "Distrito Gourmet" },
      body: {
        es: "Aplicación web Full-Stack para un restaurante con carta digital, reservas, pedidos y paneles operativos, desarrollada con React, Laravel, MySQL y Docker.",
        en: "A full-stack restaurant web application with a digital menu, reservations, orders and operations dashboards, built with React, Laravel, MySQL and Docker.",
      },
    },
    {
      title: { es: "LumaFlow Studio", en: "LumaFlow Studio" },
      body: {
        es: "Plataforma full-stack para estudios fotográficos: planificación, CRM, finanzas, entregas e IA local sobre React, Laravel y MySQL, respaldada por 89 tests.",
        en: "A full-stack platform for photography studios covering planning, CRM, finance, delivery, and local AI with React, Laravel, and MySQL, backed by 89 tests.",
      },
    },
    {
      title: { es: "raw.vives", en: "raw.vives" },
      body: {
        es: "Proyecto web y fotográfico: archivo editorial bilingüe que demuestra Next.js, UX, accesibilidad, SEO y composición visual aplicada al frontend.",
        en: "A web and photography project: a bilingual editorial archive demonstrating Next.js, UX, accessibility, SEO and visual composition applied to the frontend.",
      },
    },
    {
      title: { es: "Archivo", en: "Archive" },
      body: {
        es: "Proyectos secundarios como El Fogón, la API hotelera, el e-commerce estacional y el Llibret Falla el Molí, que completan la base en backend, frontend y diseño editorial.",
        en: "Secondary projects such as El Fogón, the hotel API, the seasonal e-commerce and the Llibret Falla el Molí, rounding out backend, frontend and editorial design foundations.",
      },
    },
  ],
};

export const ABOUT_PAGE: IndexPageContent = {
  meta: {
    es: {
      title: "Sobre Alex Vicente López",
      description:
        "Perfil profesional de Alex Vicente López, Desarrollador Full-Stack Junior en Valencia con formación en Desarrollo de Aplicaciones Web y Sistemas Microinformáticos y Redes.",
    },
    en: {
      title: "About Alex Vicente López",
      description:
        "Professional profile of Alex Vicente López, Junior Full-Stack Developer in Valencia with training in Web Application Development and IT Systems and Networks.",
    },
  },
  eyebrow: { es: "Sobre mí", en: "About" },
  title: { es: "Sobre Alex Vicente López", en: "About Alex Vicente López" },
  description: {
    es: "Soy Desarrollador Full-Stack Junior, titulado en Desarrollo de Aplicaciones Web y con formación previa en Sistemas Microinformáticos y Redes. Tengo experiencia práctica desarrollando y manteniendo aplicaciones en entornos profesionales, además de conocimientos de soporte, sistemas y resolución de incidencias.",
    en: "I am a Junior Full-Stack Developer with a degree in Web Application Development and previous training in IT Systems and Networks. I have hands-on experience building and maintaining applications in professional environments, plus knowledge of support, systems and incident resolution.",
  },
  sections: [
    {
      title: { es: "Proyectos propios", en: "Personal projects" },
      body: {
        es: "Fuera del entorno profesional continúo desarrollando proyectos propios para ampliar conocimientos y enfrentarme a problemas reales de arquitectura, frontend, backend y producto.",
        en: "Outside professional work I keep building personal projects to expand my knowledge and tackle real problems in architecture, frontend, backend and product.",
      },
    },
    {
      title: { es: "IA aplicada", en: "Applied AI" },
      body: {
        es: "Actualmente estoy profundizando especialmente en inteligencia artificial, agentes y desarrollo asistido por IA como parte de mi evolución como desarrollador.",
        en: "I am currently going deeper into artificial intelligence, agents and AI-assisted development as part of my growth as a developer.",
      },
    },
    {
      title: { es: "Visión de sistemas", en: "Systems perspective" },
      body: {
        es: "Mi formación en sistemas me aporta una visión más amplia del software: no solo cómo construir una aplicación, sino también el entorno técnico sobre el que funciona.",
        en: "My systems background gives me a broader view of software: not only how to build an application, but also the technical environment it runs on.",
      },
    },
    {
      title: { es: "Perfil profesional", en: "Professional profile" },
      body: {
        es: "Trabajo en aplicaciones web desde la interfaz hasta la API y los datos, intentando entender el producto como un sistema completo y no como capas aisladas.",
        en: "I work on web applications from the interface to the API and the data, trying to understand the product as a complete system rather than isolated layers.",
      },
    },
    {
      title: { es: "Formación técnica", en: "Technical education" },
      body: {
        es: "Grado Superior en Desarrollo de Aplicaciones Web (IES Serra Perenxisa, 2024–2026) y Grado Medio en Sistemas Microinformáticos y Redes (Enseñanzas Profesionales Sorolla, 2022–2024).",
        en: "Higher Technician in Web Application Development (IES Serra Perenxisa, 2024–2026) and Technician in IT Systems and Networks (Enseñanzas Profesionales Sorolla, 2022–2024).",
      },
    },
    {
      title: { es: "Tecnologías principales", en: "Core stack" },
      body: {
        es: "React, Next.js, JavaScript, PHP, Laravel, MySQL, APIs, Git y Docker para construir, probar y entregar aplicaciones web completas.",
        en: "React, Next.js, JavaScript, PHP, Laravel, MySQL, APIs, Git and Docker for building, testing and delivering complete web applications.",
      },
    },
    {
      title: { es: "Identidad digital", en: "Digital identity" },
      body: {
        es: "También aparece como Alex Vicente, Alex Vicente Lopez, aleviclop y AVL05 en perfiles técnicos, proyectos de GitHub y contenido relacionado con fotografía y diseño digital.",
        en: "He also appears as Alex Vicente, Alex Vicente Lopez, aleviclop, and AVL05 across technical profiles, GitHub projects, and photography and digital design content.",
      },
    },
    {
      title: { es: "Disponibilidad", en: "Availability" },
      body: {
        es: "Disponible en Valencia y en remoto para puestos de desarrollo Full-Stack junior, tanto presenciales como híbridos o remotos. Respuesta habitual en 24-48 horas a través del formulario o alexviclop@gmail.com.",
        en: "Available in Valencia and remotely for junior full-stack development roles, on-site, hybrid or remote. Usual reply within 24-48 hours via the contact form or alexviclop@gmail.com.",
      },
    },
    {
      title: { es: "Preguntas frecuentes", en: "Frequently asked questions" },
      body: {
        es: "¿Full-stack? Sí: trabajo desde la interfaz hasta la API y los datos con React, Laravel, PHP y MySQL. ¿Inglés? Nivel de trabajo para documentación y comunicación técnica. ¿Freelance? Valoro proyectos seleccionados además de oportunidades de empleo.",
        en: "Full-stack? Yes: I work from the interface to the API and the data with React, Laravel, PHP and MySQL. English? Working level for documentation and technical communication. Freelance? I consider selected projects alongside employment opportunities.",
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
    es: "La fotografía es una de mis principales disciplinas creativas fuera del desarrollo y complementa mi forma de entender composición, detalle y experiencia visual.",
    en: "Photography is one of my main creative disciplines outside development and complements how I understand composition, detail and visual experience.",
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
        es: "raw.vives es mi proyecto fotográfico personal: una disciplina creativa que complementa mi trabajo como desarrollador y afina mi criterio visual.",
        en: "raw.vives is my personal photography project: a creative discipline that complements my work as a developer and sharpens my visual judgment.",
      },
    },
  ],
};

export const CONTACT_PAGE: IndexPageContent = {
  meta: {
    es: {
      title: "Contacto de Alex Vicente López",
      description:
        "Contacto profesional de Alex Vicente López para oportunidades de desarrollo Full-Stack, puestos junior y proyectos digitales.",
    },
    en: {
      title: "Contact Alex Vicente López",
      description:
        "Professional contact details for Alex Vicente López regarding full-stack development roles, junior positions, and digital projects.",
    },
  },
  eyebrow: { es: "Contacto", en: "Contact" },
  title: {
    es: "Contacto profesional de Alex Vicente López",
    en: "Contact Alex Vicente López",
  },
  description: {
    es: "Contacta con Alex Vicente López para oportunidades de desarrollo Full-Stack, puestos junior y proyectos digitales.",
    en: "Contact Alex Vicente López about full-stack development roles, junior positions, and digital projects.",
  },
  sections: [
    {
      title: { es: "Correo electrónico", en: "Email" },
      body: {
        es: "Puedes contactar con Alex Vicente López por email en alexviclop@gmail.com para oportunidades profesionales, puestos junior o proyectos digitales seleccionados.",
        en: "Contact Alex Vicente López at alexviclop@gmail.com about professional opportunities, junior roles, or selected digital projects.",
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
