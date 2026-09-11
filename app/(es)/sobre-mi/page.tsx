import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo-page-shell";
import { ABOUT_PAGE } from "@/lib/page-content";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "es",
    path: "/sobre-mi",
    type: "profile",
    title: ABOUT_PAGE.meta.es.title,
    description: ABOUT_PAGE.meta.es.description,
  });
}

export default function AboutPage() {
  return (
    <SeoPageShell
      eyebrow={ABOUT_PAGE.eyebrow}
      title={ABOUT_PAGE.title}
      description={ABOUT_PAGE.description}
      sections={ABOUT_PAGE.sections}
    />
  );
}
