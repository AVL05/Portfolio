import type { Metadata } from "next";
import { HomeClient } from "@/components/home-client";
import { buildPageMetadata, profilePageJsonLd, SITE_URL, EN_SITE_DESCRIPTION } from "@/lib/seo";

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
    "@id": `${SITE_URL}/en/#profile-page`,
    name: "Alex Vicente López - Full-Stack Developer profile",
    url: `${SITE_URL}/en`,
    description:
      "Professional Full-Stack Developer profile of Alex Vicente López, with training in web applications and IT systems plus professional experience.",
    inLanguage: "en",
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profile) }} />
    <HomeClient />
  </>;
}
