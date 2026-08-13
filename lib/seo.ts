export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.aleviclop.dev";

export const SITE_NAME = "Alex Vicente López";
export const SITE_TITLE =
  "Alex Vicente López | Frontend Developer · React / Next.js";
export const SITE_DESCRIPTION =
  "Portfolio de Alex Vicente López, Frontend Developer en Valencia especializado en React y Next.js, con experiencia en Laravel, PHP y MySQL.";

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
  "frontend developer Valencia",
  "React developer Valencia",
  "Next.js developer Valencia",
  "full-stack developer Valencia",
  "desarrollador full-stack Valencia",
  "desarrollador full-stack freelance Valencia",
  "freelance web developer Valencia",
  "desarrollador de aplicaciones web",
  "fotografía",
  "diseño digital",
  "raw.vives",
  "archivo fotográfico editorial",
];

export const SAME_AS = [
  "https://github.com/AVL05",
  "https://www.linkedin.com/in/aleviclop/",
  "https://www.instagram.com/aleviclop/",
  "https://rawvives.aleviclop.dev/",
];

export const INDEXABLE_ROUTES = [
  {
    path: "/proyectos/raw-vives",
    priority: 0.92,
    changeFrequency: "monthly" as const,
  },
  {
    path: "/proyectos/lumaflow-studio",
    priority: 0.84,
    changeFrequency: "monthly" as const,
  },
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

export function createLocalizedMetadata({
  language,
  path,
  copy,
  type = "website",
  image,
}: {
  language: Language;
  path: string;
  copy: Record<Language, { title: string; description: string }>;
  type?: "website" | "article" | "profile";
  image?: string;
}): Metadata {
  const localized = copy[language];
  const imageUrl =
    image ??
    `${SITE_URL}/api/og?lang=${language}&title=${encodeURIComponent(localized.title)}`;

  return {
    title: localized.title,
    description: localized.description,
    alternates: { canonical: absoluteUrl(path) },
    openGraph: {
      title: localized.title,
      description: localized.description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      type,
      locale: language === "es" ? "es_ES" : "en_GB",
      alternateLocale: language === "es" ? ["en_GB"] : ["es_ES"],
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: localized.title,
      description: localized.description,
      images: [imageUrl],
    },
  };
}

export const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#alex-vicente-lopez`,
  name: "Alex Vicente López",
  alternateName: ["Alex Vicente", "Alex Vicente Lopez", "aleviclop", "AVL05"],
  url: SITE_URL,
  email: "mailto:alexviclop@gmail.com",
  jobTitle: "Frontend Developer",
  description:
    "Alex Vicente López es Frontend Developer especializado en React y Next.js, con capacidad full-stack en Laravel, PHP y MySQL y disponibilidad freelance.",
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
    name: "Frontend Developer",
    skills:
      "React, Next.js, TypeScript, JavaScript, Tailwind CSS, accesibilidad, diseño de interfaces, Laravel, PHP, MySQL",
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
  alternateName: [
    "Alex Vicente Lopez",
    "Portfolio de Alex Vicente López",
    "aleviclop.dev",
  ],
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
import type { Metadata } from "next";
import type { Language } from "@/lib/language-context";
