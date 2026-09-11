import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo-page-shell";
import { PHOTOGRAPHY_PAGE } from "@/lib/page-content";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "en",
    path: "/en/photography",
    title: PHOTOGRAPHY_PAGE.meta.en.title,
    description: PHOTOGRAPHY_PAGE.meta.en.description,
  });
}

export default function EnglishPhotographyPage() {
  return (
    <SeoPageShell
      eyebrow={PHOTOGRAPHY_PAGE.eyebrow}
      title={PHOTOGRAPHY_PAGE.title}
      description={PHOTOGRAPHY_PAGE.description}
      sections={PHOTOGRAPHY_PAGE.sections}
    />
  );
}
