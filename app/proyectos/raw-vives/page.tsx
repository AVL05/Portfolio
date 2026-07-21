import type { Metadata } from "next";
import { RawVivesCaseStudy } from "@/components/raw-vives-case-study";
import { absoluteUrl, SITE_NAME } from "@/lib/seo";

const title = "raw.vives - Caso de estudio";
const description = "Caso de estudio de raw.vives, archivo fotográfico editorial bilingüe con 30 fotografías, 3 series, movimiento accesible y despliegue estático en Cloudflare Workers.";
const image = absoluteUrl("/projects/raw-vives/raw-vives-og.webp");

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: absoluteUrl("/proyectos/raw-vives") },
  openGraph: { title, description, url: absoluteUrl("/proyectos/raw-vives"), siteName: SITE_NAME, type: "article", images: [{ url: image, width: 1200, height: 630, alt: "raw.vives, archivo fotográfico editorial de Alex Vicente" }] },
  twitter: { card: "summary_large_image", title, description, images: [image] },
};

const projectJsonLd = {
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  name: "raw.vives",
  description,
  url: "https://gallery.aleviclop.dev/",
  image,
  inLanguage: ["es", "en"],
  author: { "@type": "Person", name: "Alex Vicente", url: absoluteUrl("/") },
  sameAs: "https://github.com/AVL05/alexgallery",
};

export default function RawVivesCaseStudyPage() {
  return <><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }} /><RawVivesCaseStudy /></>;
}
