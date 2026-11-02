import type { Metadata } from "next";
import { HomeClient } from "@/components/home-client";
import { buildPageMetadata, profilePageJsonLd, SITE_URL, EN_SITE_DESCRIPTION, EN_SITE_TITLE } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "en",
    path: "/en",
    description: EN_SITE_DESCRIPTION,
  });
}

export default function EnglishHome() {
  const profile = {
    ...profilePageJsonLd,
    "@id": `${SITE_URL}/en#profile-page`,
    name: EN_SITE_TITLE,
    url: `${SITE_URL}/en`,
    description: EN_SITE_DESCRIPTION,
    inLanguage: "en",
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profile) }} />
    <HomeClient />
  </>;
}
