import type { Metadata } from "next";
import { ProjectCaseStudy } from "@/components/project-case-study";
import { DistritoGourmetStory } from "@/components/distrito-gourmet-story";
import { DISTRITO_DATA, DISTRITO_METADATA_COPY, DISTRITO_URLS } from "@/lib/case-study-content";
import {
  absoluteUrl,
  breadcrumbJsonLd,
  buildPageMetadata,
  SITE_URL,
} from "@/lib/seo";

const projectUrl = "/en/projects/distrito-gourmet";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "en",
    path: "/en/projects/distrito-gourmet",
    type: "article",
    image: `${SITE_URL}/projects/distrito_gourmet/distrito-gourmet.png`,
    title: DISTRITO_METADATA_COPY.en.title,
    description: DISTRITO_METADATA_COPY.en.description,
  });
}

export default function EnglishDistritoGourmetCaseStudyPage() {
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Distrito Gourmet",
    description: DISTRITO_METADATA_COPY.en.description,
    url: DISTRITO_URLS.demo,
    image: `${SITE_URL}/projects/distrito_gourmet/distrito-gourmet.png`,
    inLanguage: "en",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    author: { "@type": "Person", name: "Alex Vicente López", url: absoluteUrl("/en") },
  };
  const breadcrumbs = breadcrumbJsonLd([
    { name: "Home", path: "/en" },
    { name: "Distrito Gourmet", path: projectUrl },
  ]);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }} />
      <ProjectCaseStudy
        data={DISTRITO_DATA}
        editorial={<DistritoGourmetStory key="distrito-editorial" />}
        previous={{ href: "/en/projects/lumaflow-studio", title: "LumaFlow Studio" }}
      />
    </>
  );
}
