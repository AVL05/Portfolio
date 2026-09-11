import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal-page-content";
import { buildPageMetadata } from "@/lib/seo";

export function generateMetadata(): Metadata {
  const metadata = buildPageMetadata({
    locale: "es",
    path: "/legal",
    title: "Aviso legal y privacidad",
    description:
      "Aviso legal, política de privacidad y política de cookies de aleviclop.dev.",
  });

  return { ...metadata, robots: { index: false, follow: false } };
}

export default function LegalPage() {
  return <LegalPageContent />;
}
