import type { Metadata } from "next";
import { GITHUB_URL, LINKEDIN_URL } from "@/lib/site";
import {
  getAlternatePath,
  INDEXABLE_EN_PATHS,
  INDEXABLE_ES_PATHS,
  type Locale,
} from "@/lib/i18n-paths";

export const SITE_URL = new URL(
  process.env.VERCEL_ENV === "production"
    ? "https://www.aleviclop.dev"
    : process.env.NEXT_PUBLIC_SITE_URL || "https://www.aleviclop.dev",
).origin;

export const SITE_NAME = "Alex Vicente López";
export const SITE_TITLE =
  "Alex Vicente López | Desarrollador Web Full-Stack Junior en Valencia";
export const EN_SITE_TITLE =
  "Alex Vicente López | Junior Full-Stack Web Developer in Valencia";
export const SITE_DESCRIPTION =
  "Alex Vicente López, desarrollador web full-stack junior en Valencia. React, Next.js, PHP y Laravel. Proyectos con código público y prácticas en equipo.";
export const EN_SITE_DESCRIPTION =
  "Alex Vicente López, junior full-stack web developer in Valencia, Spain. React, Next.js, PHP and Laravel. Projects with public code and team internship experience.";

// One role, one stack: no topic lists (photography, design, AI) that would
// compete with the Junior Full-Stack Web Developer positioning.
export const SEO_KEYWORDS = [
  "Alex Vicente López",
  "Alex Vicente Lopez",
  "aleviclop",
  "desarrollador web full-stack junior",
  "junior full-stack web developer",
  "desarrollador web Valencia",
  "React",
  "Next.js",
  "PHP",
  "Laravel",
];

export const SAME_AS = [
  GITHUB_URL,
  LINKEDIN_URL,
  "https://rawvives.aleviclop.dev/",
];

interface IndexableRoute {
  path: string;
  locale: Locale;
  priority: number;
  changeFrequency: "weekly";
}

/** Only the Spanish and English home pages are indexable. */
export const INDEXABLE_ROUTES: IndexableRoute[] = [
  ...INDEXABLE_ES_PATHS.map((path) => ({ path, locale: "es" as const, priority: 1, changeFrequency: "weekly" as const })),
  ...INDEXABLE_EN_PATHS.map((path) => ({ path, locale: "en" as const, priority: 1, changeFrequency: "weekly" as const })),
];

export function absoluteUrl(path = "/") {
  // Next renders the home canonical without a trailing slash
  // (trailingSlash: false); normalize here so sitemap, canonical,
  // hreflang and Open Graph always agree on one URL per page.
  return new URL(path, SITE_URL).toString().replace(/\/$/, "");
}

/** hreflang set for an indexable URL: self + alternate + x-default (ES). */
function languageAlternates(path: string, locale: Locale) {
  const es = locale === "es" ? path : getAlternatePath(path, "es");
  const en = locale === "en" ? path : getAlternatePath(path, "en");
  if (!es || !en || !INDEXABLE_ES_PATHS.includes(es)) return undefined;
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
}: {
  locale: Locale;
  path: string;
  title?: string;
  description: string;
}): Metadata {
  const imageUrl =
    `${SITE_URL}/api/og?lang=${locale}&title=${encodeURIComponent(title ?? SITE_NAME)}`;
  // Pages without an explicit title (home) inherit the layout default for
  // <title> but still need an explicit Open Graph / Twitter title.
  const socialTitle = title ?? (locale === "en" ? EN_SITE_TITLE : SITE_TITLE);

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
      type: "website",
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

const PERSON_COPY = {
  es: {
    jobTitle: "Desarrollador Web Full-Stack Junior",
    description: SITE_DESCRIPTION,
    knowsAbout: [
      "Desarrollo web",
      "Aplicaciones full-stack",
      "React",
      "Next.js",
      "JavaScript",
      "PHP",
      "Laravel",
      "MySQL",
      "APIs REST",
      "Tailwind CSS",
      "GSAP",
      "Docker",
      "Electron",
      "Git y GitHub",
    ],
  },
  en: {
    jobTitle: "Junior Full-Stack Web Developer",
    description: EN_SITE_DESCRIPTION,
    knowsAbout: [
      "Web development",
      "Full-stack applications",
      "React",
      "Next.js",
      "JavaScript",
      "PHP",
      "Laravel",
      "MySQL",
      "REST APIs",
      "Tailwind CSS",
      "GSAP",
      "Docker",
      "Electron",
      "Git and GitHub",
    ],
  },
} as const;

export function buildPersonJsonLd(locale: Locale) {
  const copy = PERSON_COPY[locale];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${SITE_URL}/#alex-vicente-lopez`,
    name: "Alex Vicente López",
    alternateName: ["Alex Vicente", "Alex Vicente Lopez", "aleviclop"],
    url: SITE_URL,
    email: "mailto:alexviclop@gmail.com",
    jobTitle: copy.jobTitle,
    description: copy.description,
    address: { "@type": "PostalAddress", addressLocality: "Valencia", addressCountry: "ES" },
    sameAs: SAME_AS,
    knowsAbout: copy.knowsAbout,
    hasOccupation: {
      "@type": "Occupation",
      name: copy.jobTitle,
      skills: "React, Next.js, JavaScript, Tailwind CSS, PHP, Laravel, MySQL, REST APIs, Git, Docker",
    },
    alumniOf: [
      { "@type": "EducationalOrganization", name: "IES Serra Perenxisa" },
      { "@type": "EducationalOrganization", name: "Enseñanzas Profesionales Sorolla" },
    ],
  };
}

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
