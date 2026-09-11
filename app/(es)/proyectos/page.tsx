import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo-page-shell";
import { PROJECTS_PAGE } from "@/lib/page-content";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "es",
    path: "/proyectos",
    title: PROJECTS_PAGE.meta.es.title,
    description: PROJECTS_PAGE.meta.es.description,
  });
}

export default function ProjectsPage() {
  return (
    <SeoPageShell
      eyebrow={PROJECTS_PAGE.eyebrow}
      title={PROJECTS_PAGE.title}
      description={PROJECTS_PAGE.description}
      sections={PROJECTS_PAGE.sections}
    />
  );
}
