import type { Metadata } from "next";
import {
  getAlternatePath,
  INDEXABLE_EN_PATHS,
  INDEXABLE_ES_PATHS,
  type Locale,
} from "@/lib/i18n-paths";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://www.aleviclop.dev";

export const SITE_NAME = "Alex Vicente López";
export const SITE_TITLE =
  "Alex Vicente López | Desarrollador Full-Stack Junior";
export const EN_SITE_TITLE =
  "Alex Vicente López | Junior Full-Stack Developer";
export const SITE_DESCRIPTION =
  "Portfolio de Alex Vicente López, Desarrollador Full-Stack Junior en Valencia con formación en Desarrollo de Aplicaciones Web y Sistemas Microinformáticos y Redes, experiencia profesional y proyectos propios.";
export const EN_SITE_DESCRIPTION =
  "Portfolio of Alex Vicente López, Junior Full-Stack Developer in Valencia with training in Web Application Development and IT Systems and Networks, professional experience and personal projects.";

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
  "desarrollo backend",
  "bases de datos",
  "Laravel",
  "PHP",
  "desarrollador full-stack junior Valencia",
  "junior full-stack developer Valencia",
  "desarrollador full-stack Valencia",
  "full-stack developer Valencia",
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

export interface IndexableRoute {
  path: string;
  locale: Locale;
  priority: number;
  changeFrequency: "weekly" | "monthly";
}

const ROUTE_PRIORITY: Record<string, { priority: number; changeFrequency: "weekly" | "monthly" }> = {
  "/": { priority: 1, changeFrequency: "weekly" },
  "/proyectos/raw-vives": { priority: 0.92, changeFrequency: "monthly" },
  "/sobre-mi": { priority: 0.9, changeFrequency: "monthly" },
  "/proyectos": { priority: 0.85, changeFrequency: "monthly" },
  "/proyectos/lumaflow-studio": { priority: 0.84, changeFrequency: "monthly" },
  "/proyectos/distrito-gourmet": { priority: 0.82, changeFrequency: "monthly" },
  "/fotografia": { priority: 0.75, changeFrequency: "monthly" },
  "/contacto": { priority: 0.7, changeFrequency: "monthly" },
};

/**
 * Exactly the 16 indexable URLs: 8 ES + 8 EN.
 * /legal and /en/legal stay noindex and are intentionally excluded.
 */
export const INDEXABLE_ROUTES: IndexableRoute[] = [
  ...INDEXABLE_ES_PATHS.map((path) => ({
    path,
    locale: "es" as Locale,
    priority: ROUTE_PRIORITY[path]?.priority ?? 0.5,
    changeFrequency: ROUTE_PRIORITY[path]?.changeFrequency ?? ("monthly" as const),
  })),
  ...INDEXABLE_EN_PATHS.map((path) => {
    const esPath = getAlternatePath(path, "es") ?? "/";
    return {
      path,
      locale: "en" as Locale,
      priority: ROUTE_PRIORITY[esPath]?.priority ?? 0.5,
      changeFrequency: ROUTE_PRIORITY[esPath]?.changeFrequency ?? ("monthly" as const),
    };
  }),
];

export function absoluteUrl(path = "/") {
  // Next renders the home canonical without a trailing slash
  // (trailingSlash: false); normalize here so sitemap, canonical,
  // hreflang and Open Graph always agree on one URL per page.
  return new URL(path, SITE_URL).toString().replace(/\/$/, "");
}

/** hreflang set for an indexable URL: self + alternate + x-default (ES). */
export function languageAlternates(path: string, locale: Locale) {
  const es = locale === "es" ? path : getAlternatePath(path, "es");
  const en = locale === "en" ? path : getAlternatePath(path, "en");
  if (!es || !en) return undefined;
  return {
    canonical: absoluteUrl(path),
    languages: {
      es: absoluteUrl(es),
      en: absoluteUrl(en),
      "x-default": absoluteUrl(es),
    },
  };
}

export function buildPageMetadata({
  locale,
  path,
  title,
  description,
  type = "website",
  image,
}: {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
  type?: "website" | "article" | "profile";
  image?: string;
}): Metadata {
  const imageUrl =
    image ??
    `${SITE_URL}/api/og?lang=${locale}&title=${encodeURIComponent(title ?? SITE_NAME)}`;
  // Pages without an explicit title (home) inherit the layout default for
  // <title> but still need an explicit Open Graph / Twitter title.
  const socialTitle = title ?? SITE_TITLE;

  return {
    ...(title ? { title } : {}),
    description,
    alternates: languageAlternates(path, locale) ?? {
      canonical: absoluteUrl(path),
    },
    openGraph: {
      title: socialTitle,
      description,
      url: absoluteUrl(path),
      siteName: SITE_NAME,
      type,
      locale: locale === "es" ? "es_ES" : "en_GB",
      alternateLocale: locale === "es" ? ["en_GB"] : ["es_ES"],
      images: [imageUrl],
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
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
  jobTitle: "Desarrollador Full-Stack Junior",
  description:
    "Alex Vicente López es Desarrollador Full-Stack Junior con formación en Desarrollo de Aplicaciones Web y Sistemas Microinformáticos y Redes, experiencia en desarrollo de software y proyectos propios.",
  image: `${SITE_URL}/api/og?lang=es`,
  sameAs: SAME_AS,
  knowsAbout: [
    "Desarrollo web",
    "Aplicaciones full-stack",
    "React",
    "Next.js",
    "JavaScript",
    "Laravel",
    "PHP",
    "MySQL",
    "APIs REST",
    "Tailwind CSS",
    "GSAP",
    "Docker",
    "Figma",
    "Diseño de interfaces",
    "Sistemas y redes",
    "Git y GitHub",
    "IA aplicada",
    "Fotografía",
    "Diseño editorial",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Desarrollador Full-Stack Junior",
    skills:
      "React, Next.js, JavaScript, Tailwind CSS, Laravel, PHP, MySQL, APIs REST, Git, Docker, accesibilidad, IA aplicada",
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
  // inLanguage is set per localized layout: each page declares one language.
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
  // inLanguage is set per localized layout: each page declares one language.
  mainEntity: {
    "@id": `${SITE_URL}/#alex-vicente-lopez`,
  },
};

export function breadcrumbJsonLd(
  items: Array<{ name: string; path: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function faqJsonLd(items: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}
