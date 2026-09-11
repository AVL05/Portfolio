import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo-page-shell";
import { CONTACT_PAGE } from "@/lib/page-content";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "en",
    path: "/en/contact",
    title: CONTACT_PAGE.meta.en.title,
    description: CONTACT_PAGE.meta.en.description,
  });
}

export default function EnglishContactPage() {
  return (
    <SeoPageShell
      eyebrow={CONTACT_PAGE.eyebrow}
      title={CONTACT_PAGE.title}
      description={CONTACT_PAGE.description}
      sections={CONTACT_PAGE.sections}
    />
  );
}
