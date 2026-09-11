import type { Metadata } from "next";
import { HomeClient } from "@/components/home-client";
import { buildPageMetadata, SITE_DESCRIPTION } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "es",
    path: "/",
    description: SITE_DESCRIPTION,
  });
}

export default function Home() {
  return <HomeClient />;
}
