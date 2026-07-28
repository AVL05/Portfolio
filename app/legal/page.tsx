import type { Metadata } from "next";
import { LegalPageContent } from "@/components/legal-page-content";
import { createLocalizedMetadata } from "@/lib/seo";
import { getRequestLanguage } from "@/lib/request-language";

export async function generateMetadata(): Promise<Metadata> {
  const metadata = createLocalizedMetadata({
    language: await getRequestLanguage(),
    path: "/legal",
    copy: {
      es: {
        title: "Aviso legal y privacidad",
        description:
          "Aviso legal, política de privacidad y política de cookies de aleviclop.dev.",
      },
      en: {
        title: "Legal notice and privacy",
        description:
          "Legal notice, privacy policy, and cookie policy for aleviclop.dev.",
      },
    },
  });

  return { ...metadata, robots: { index: false, follow: false } };
}

export default function LegalPage() {
  return <LegalPageContent />;
}
