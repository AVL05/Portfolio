import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo-page-shell";
import { ABOUT_PAGE } from "@/lib/page-content";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "en",
    path: "/en/about",
    type: "profile",
    title: ABOUT_PAGE.meta.en.title,
    description: ABOUT_PAGE.meta.en.description,
  });
}

export default function EnglishAboutPage() {
  return (
    <SeoPageShell
      eyebrow={ABOUT_PAGE.eyebrow}
      title={ABOUT_PAGE.title}
      description={ABOUT_PAGE.description}
      sections={ABOUT_PAGE.sections}
    />
  );
}
