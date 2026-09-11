import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo-page-shell";
import { PHOTOGRAPHY_PAGE } from "@/lib/page-content";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "es",
    path: "/fotografia",
    title: PHOTOGRAPHY_PAGE.meta.es.title,
    description: PHOTOGRAPHY_PAGE.meta.es.description,
  });
}

export default function PhotographyPage() {
  return (
    <SeoPageShell
      eyebrow={PHOTOGRAPHY_PAGE.eyebrow}
      title={PHOTOGRAPHY_PAGE.title}
      description={PHOTOGRAPHY_PAGE.description}
      sections={PHOTOGRAPHY_PAGE.sections}
    />
  );
}
