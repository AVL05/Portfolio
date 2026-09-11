import type { Metadata } from "next";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { LUMA_DATA, LUMA_METADATA_COPY } from "@/lib/case-study-content";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildPageMetadata,
  SITE_URL,
} from "@/lib/seo";

const projectUrl = "/en/projects/lumaflow-studio";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "en",
    path: "/en/projects/lumaflow-studio",
    type: "article",
    image: `${SITE_URL}/projects/lumaflow-studio-og.webp`,
    title: LUMA_METADATA_COPY.en.title,
    description: LUMA_METADATA_COPY.en.description,
  });
}

export default function EnglishLumaFlowStudioCaseStudyPage() {
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "LumaFlow Studio",
    description: LUMA_METADATA_COPY.en.description,
    url: absoluteUrl(projectUrl),
    image: `${SITE_URL}/projects/lumaflow-studio-og.webp`,
    inLanguage: "en",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    author: { "@type": "Person", name: "Alex Vicente López", url: absoluteUrl("/en") },
  };
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/en" },
    { name: "Projects", path: "/en/projects" },
    { name: "LumaFlow Studio", path: projectUrl },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <ProjectCaseStudy
        data={LUMA_DATA}
        previous={{ href: "/en/projects/raw-vives", title: "raw.vives" }}
        next={{ href: "/en/projects/distrito-gourmet", title: "Distrito Gourmet" }}
      />
    </>
  );
}
