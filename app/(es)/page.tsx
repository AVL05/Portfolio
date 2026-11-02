import type { Metadata } from "next";
import { HomeClient } from "@/components/home-client";
import { buildPageMetadata, profilePageJsonLd, SITE_DESCRIPTION } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "es",
    path: "/",
    description: SITE_DESCRIPTION,
  });
}

export default function Home() {
  const profile = {
    ...profilePageJsonLd,
    inLanguage: "es",
  };
  return <>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(profile) }} />
    <HomeClient />
  </>;
}
