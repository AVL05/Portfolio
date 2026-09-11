import type { Metadata } from "next";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { DISTRITO_DATA, DISTRITO_METADATA_COPY, DISTRITO_URLS } from "@/lib/case-study-content";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildPageMetadata,
  SITE_URL,
} from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "es",
    path: "/proyectos/distrito-gourmet",
    type: "article",
    image: `${SITE_URL}/projects/distrito-gourmet-og.webp`,
    title: DISTRITO_METADATA_COPY.es.title,
    description: DISTRITO_METADATA_COPY.es.description,
  });
}

export default function DistritoGourmetCaseStudyPage() {
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Distrito Gourmet",
    description: DISTRITO_METADATA_COPY.es.description,
    url: DISTRITO_URLS.demo,
    image: `${SITE_URL}/projects/distrito-gourmet-og.webp`,
    inLanguage: "es",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    author: { "@type": "Person", name: "Alex Vicente López", url: absoluteUrl("/") },
  };
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Proyectos", path: "/proyectos" },
    { name: "Distrito Gourmet", path: DISTRITO_URLS.path },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <ProjectCaseStudy
        data={DISTRITO_DATA}
        previous={{ href: "/proyectos/lumaflow-studio", title: "LumaFlow Studio" }}
      />
    </>
  );
}
