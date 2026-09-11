import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo-page-shell";
import { CONTACT_PAGE } from "@/lib/page-content";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "es",
    path: "/contacto",
    title: CONTACT_PAGE.meta.es.title,
    description: CONTACT_PAGE.meta.es.description,
  });
}

export default function ContactPage() {
  return (
    <SeoPageShell
      eyebrow={CONTACT_PAGE.eyebrow}
      title={CONTACT_PAGE.title}
      description={CONTACT_PAGE.description}
      sections={CONTACT_PAGE.sections}
    />
  );
}
