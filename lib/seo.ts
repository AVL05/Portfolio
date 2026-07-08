export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aleviclop.dev";

export const SITE_NAME = "Alex Vicente López";
export const SITE_TITLE = "Alex Vicente López | Desarrollador Web y Portfolio";
export const SITE_DESCRIPTION =
  "Portfolio oficial de Alex Vicente López, también conocido como Alex Vicente, desarrollador web especializado en React, Next.js, Laravel, interfaces cuidadas y productos digitales.";

export const SEO_KEYWORDS = [
  "Alex Vicente López",
  "Alex Vicente Lopez",
  "Alex Vicente",
  "aleviclop",
  "AVL05",
  "portfolio Alex Vicente López",
  "desarrollador web Alex Vicente",
  "desarrollador web Valencia",
  "React",
  "Next.js",
  "Laravel",
  "PHP",
  "frontend",
  "full-stack junior",
  "fotografía",
  "diseño digital",
];

export const SAME_AS = [
  "https://github.com/AVL05",
  "https://www.linkedin.com/in/alex-vicente-lopez/",
  "https://www.instagram.com/aleviclop/",
  "https://gallery.aleviclop.dev/",
];

export const INDEXABLE_ROUTES = [
  {
    path: "/",
    priority: 1,
    changeFrequency: "weekly" as const,
  },
  {
    path: "/sobre-mi",
    priority: 0.9,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/proyectos",
    priority: 0.85,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/proyectos/distrito-gourmet",
    priority: 0.82,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/fotografia",
    priority: 0.75,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/contacto",
    priority: 0.7,
    changeFrequency: "monthly" as const,
  },
];

export function absoluteUrl(path = "/") {
  return new URL(path, SITE_URL).toString();
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#alex-vicente-lopez`,
  name: "Alex Vicente López",
  alternateName: ["Alex Vicente", "Alex Vicente Lopez", "aleviclop", "AVL05"],
  url: SITE_URL,
  email: "mailto:alexviclop@gmail.com",
  jobTitle: "Desarrollador Web",
  description:
    "Alex Vicente López es un desarrollador web en formación con base full-stack, experiencia en React, Next.js, Laravel, PHP, interfaces cuidadas y proyectos visuales.",
  image: `${SITE_URL}/api/og?lang=es`,
  sameAs: SAME_AS,
  knowsAbout: [
    "Desarrollo web",
    "React",
    "Next.js",
    "TypeScript",
    "Laravel",
    "PHP",
    "MySQL",
    "Tailwind CSS",
    "GSAP",
    "Fotografía",
    "Diseño editorial",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Desarrollador web",
    skills:
      "React, Next.js, TypeScript, Laravel, PHP, MySQL, Tailwind CSS, GSAP, diseño de interfaces",
  },
  alumniOf: [
    {
      "@type": "EducationalOrganization",
      name: "IES Serra Perenxisa",
    },
    {
      "@type": "EducationalOrganization",
      name: "Enseñanzas Profesionales Sorolla",
    },
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  alternateName: ["Portfolio de Alex Vicente López", "aleviclop.dev"],
  url: SITE_URL,
  inLanguage: ["es", "en"],
  publisher: {
    "@id": `${SITE_URL}/#alex-vicente-lopez`,
  },
};

export const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profile-page`,
  name: SITE_TITLE,
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  inLanguage: "es",
  mainEntity: {
    "@id": `${SITE_URL}/#alex-vicente-lopez`,
  },
};
