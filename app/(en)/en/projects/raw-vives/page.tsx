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
    locale: "en",
    path: "/en/projects/raw-vives",
    type: "article",
    image,
    title: RAW_VIVES_METADATA_COPY.en.title,
    description: RAW_VIVES_METADATA_COPY.en.description,
  });
}

export default function EnglishRawVivesCaseStudyPage() {
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "raw.vives",
    description: RAW_VIVES_METADATA_COPY.en.description,
    url: RAW_VIVES_URLS.production,
    image,
    inLanguage: "en",
    author: { "@type": "Person", name: "Alex Vicente", url: absoluteUrl("/en") },
    sameAs: RAW_VIVES_URLS.repository,
  };
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/en" },
    { name: "Projects", path: "/en/projects" },
    { name: "raw.vives", path: "/en/projects/raw-vives" },
  ]);

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} /><RawVivesCaseStudy /></>;
}
