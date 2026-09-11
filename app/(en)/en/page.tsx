import type { Metadata } from "next";
import { HomeClient } from "@/components/home-client";
import { buildPageMetadata, EN_SITE_DESCRIPTION } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "en",
    path: "/en",
    description: EN_SITE_DESCRIPTION,
  });
}

export default function EnglishHome() {
  return <HomeClient />;
}
