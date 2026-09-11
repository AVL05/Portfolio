import type { Metadata } from "next";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { LUMA_DATA, LUMA_METADATA_COPY, LUMA_URLS } from "@/lib/case-study-content";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildPageMetadata,
  SITE_URL,
} from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "es",
    path: "/proyectos/lumaflow-studio",
    type: "article",
    image: `${SITE_URL}/projects/lumaflow-studio-og.webp`,
    title: LUMA_METADATA_COPY.es.title,
    description: LUMA_METADATA_COPY.es.description,
  });
}

export default function LumaFlowStudioCaseStudyPage() {
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "LumaFlow Studio",
    description: LUMA_METADATA_COPY.es.description,
    url: absoluteUrl(LUMA_URLS.path),
    image: `${SITE_URL}/projects/lumaflow-studio-og.webp`,
    inLanguage: "es",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    author: { "@type": "Person", name: "Alex Vicente López", url: absoluteUrl("/") },
  };
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Inicio", path: "/" },
    { name: "Proyectos", path: "/proyectos" },
    { name: "LumaFlow Studio", path: LUMA_URLS.path },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <ProjectCaseStudy
        data={LUMA_DATA}
        previous={{ href: "/proyectos/raw-vives", title: "raw.vives" }}
        next={{ href: "/proyectos/distrito-gourmet", title: "Distrito Gourmet" }}
      />
    </>
  );
}
