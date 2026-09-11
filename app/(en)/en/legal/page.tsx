import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal-page-content";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const metadata = buildPageMetadata({
    locale: "en",
    path: "/en/legal",
    title: "Legal notice and privacy",
    description:
      "Legal notice, privacy policy, and cookie policy for aleviclop.dev.",
  });

  return { ...metadata, robots: { index: false, follow: false } };
}

export default function EnglishLegalPage() {
  return <LegalPageContent />;
}
