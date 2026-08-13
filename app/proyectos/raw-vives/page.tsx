import { RawVivesCaseStudy } from "@/components/raw-vives-case-study";
import { absoluteUrl, createLocalizedMetadata } from "@/lib/seo";
import { getRequestLanguage } from "@/lib/request-language";

const image = absoluteUrl("/projects/raw-vives/raw-vives-og.webp");

const metadataCopy = {
  es: {
    title: "raw.vives - Caso de estudio",
    description:
      "Caso de estudio de raw.vives, archivo fotográfico editorial bilingüe con series curadas, obras individuales, interacción accesible y despliegue estático.",
  },
  en: {
    title: "raw.vives - Case study",
    description:
      "Case study of raw.vives, a bilingual editorial photography archive with curated series, individual works, accessible interaction, and static deployment.",
  },
};

export async function generateMetadata() {
  return createLocalizedMetadata({
    language: await getRequestLanguage(),
    path: "/proyectos/raw-vives",
    type: "article",
    image,
    copy: metadataCopy,
  });
}

export default async function RawVivesCaseStudyPage() {
  const language = await getRequestLanguage();
  const projectJsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: "raw.vives",
    description: metadataCopy[language].description,
    url: "https://rawvives.aleviclop.dev/",
    image,
    inLanguage: ["es", "en"],
    author: { "@type": "Person", name: "Alex Vicente", url: absoluteUrl("/") },
    sameAs: "https://github.com/AVL05/alexgallery",
  };

  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} /><RawVivesCaseStudy /></>;
}
