import type { Metadata } from "next";
import { RawVivesCaseStudy } from "@/components/raw-vives-case-study";
import {
  RAW_VIVES_METADATA_COPY,
  RAW_VIVES_URLS,
} from "@/lib/case-study-content";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildPageMetadata,
} from "@/lib/seo";

const image = absoluteUrl(RAW_VIVES_URLS.image);

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "es",
    path: "/proyectos/raw-vives",
    type: "article",
    image,
    title: RAW_VIVES_METADATA_COPY.es.title,
    description: RAW_VIVES_METADATA_COPY.es.description,
  });
}

export default function RawVivesCaseStudyPage() {
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "raw.vives",
    description: RAW_VIVES_METADATA_COPY.es.description,
    url: RAW_VIVES_URLS.production,
    image,
    inLanguage: "es",
    author: { "@type": "Person", name: "Alex Vicente", url: absoluteUrl("/") },
    sameAs: RAW_VIVES_URLS.repository,
  };
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Proyectos", path: "/proyectos" },
    { name: "raw.vives", path: "/proyectos/raw-vives" },
  ]);

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} /><RawVivesCaseStudy /></>;
}
