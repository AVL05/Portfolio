import type { Metadata } from "next";
import { SeoPageShell } from "@/components/seo-page-shell";
import { absoluteUrl, SITE_NAME, SITE_URL } from "@/lib/seo";

export const metadata: Metadata = {
  title: "Fotografía de Alex Vicente López",
  description:
    "Portfolio fotográfico de Alex Vicente López: composición, mirada visual, fotografía urbana, paisaje y criterio estético aplicado a proyectos digitales.",
  alternates: {
    canonical: absoluteUrl("/fotografia"),
  },
  openGraph: {
    title: "Fotografía de Alex Vicente López",
    description:
      "Galería y mirada visual de Alex Vicente López, conectada con su trabajo digital y de desarrollo web.",
    url: absoluteUrl("/fotografia"),
    siteName: SITE_NAME,
    type: "website",
    images: [`${SITE_URL}/api/og?title=Fotograf%C3%ADa%20Alex%20Vicente%20L%C3%B3pez`],
  },
};

export default function PhotographyPage() {
  return (
    <SeoPageShell
      eyebrow="Fotografia"
      title="Fotografía y mirada visual de Alex Vicente López"
      description="La fotografía forma parte de la identidad digital de Alex Vicente López y refuerza su forma de trabajar interfaces, composición, detalle y narrativa visual."
      sections={[
        {
          title: "Galería fotográfica",
          body: "La galería pública está disponible en gallery.aleviclop.dev y reúne una selección visual vinculada a composición, paisaje, entorno urbano y edición fotográfica.",
        },
        {
          title: "Criterio visual",
          body: "El trabajo fotográfico de Alex Vicente López complementa su portfolio técnico con atención a encuadre, jerarquía, ritmo visual y calidad del resultado final.",
        },
        {
          title: "Diseño digital",
          body: "La experiencia en fotografía y diseño editorial se traslada a interfaces web más cuidadas, con mejor dirección visual y decisiones de composición más precisas.",
        },
        {
          title: "Identidad creativa",
          body: "Alex Vicente combina desarrollo web y fotografía para construir una presencia digital reconocible bajo el dominio aleviclop.dev y la galería gallery.aleviclop.dev.",
        },
      ]}
    />
  );
}
