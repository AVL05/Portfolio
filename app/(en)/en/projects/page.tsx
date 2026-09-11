import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo-page-shell";
import { PROJECTS_PAGE } from "@/lib/page-content";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "en",
    path: "/en/projects",
    title: PROJECTS_PAGE.meta.en.title,
    description: PROJECTS_PAGE.meta.en.description,
  });
}

export default function EnglishProjectsPage() {
  return (
    <SeoPageShell
      eyebrow={PROJECTS_PAGE.eyebrow}
      title={PROJECTS_PAGE.title}
      description={PROJECTS_PAGE.description}
      sections={PROJECTS_PAGE.sections}
    />
  );
}
