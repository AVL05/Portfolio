import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo-page-shell";
import { ABOUT_PAGE } from "@/lib/page-content";
import { buildPageMetadata, faqJsonLd } from "@/lib/seo";

export function generateMetadata(): Metadata {
  return buildPageMetadata({
    locale: "en",
    path: "/en/about",
    type: "profile",
    title: ABOUT_PAGE.meta.en.title,
    description: ABOUT_PAGE.meta.en.description,
  });
}

const faq = faqJsonLd([
  {
    question: "Junior full-stack?",
    answer:
      "Yes: Alex works on web applications from the interface to the API and the data, with React, Laravel, PHP and MySQL, and keeps growing in software development and applied AI.",
  },
  {
    question: "Is he available for new opportunities?",
    answer:
      "Yes, for on-site, hybrid or remote junior full-stack development roles, plus selected freelance projects. Contact at alexviclop@gmail.com with a reply within 24-48 hours.",
  },
  {
    question: "Which technologies does he use?",
    answer:
      "React, Next.js, JavaScript, PHP, Laravel, MySQL, APIs, Git and Docker, with attention to accessibility, responsive design, and performance.",
  },
]);

export default function EnglishAboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faq) }}
      />
      <SeoPageShell
        eyebrow={ABOUT_PAGE.eyebrow}
        title={ABOUT_PAGE.title}
        description={ABOUT_PAGE.description}
        sections={ABOUT_PAGE.sections}
      />
    </>
  );
}
