import { SeoPageShell } from "@/components/seo-page-shell";
import { createLocalizedMetadata } from "@/lib/seo";
import { getRequestLanguage } from "@/lib/request-language";

export async function generateMetadata() {
  return createLocalizedMetadata({
    language: await getRequestLanguage(),
    path: "/fotografia",
    copy: {
      es: {
        title: "Fotografía de Alex Vicente López",
        description:
          "Portfolio fotográfico de Alex Vicente López: composición, fotografía urbana, paisaje y criterio visual aplicado a proyectos digitales.",
      },
      en: {
        title: "Photography by Alex Vicente López",
        description:
          "Alex Vicente López’s photography portfolio: composition, urban photography, landscapes, and visual judgment applied to digital work.",
      },
    },
  });
}

export default function PhotographyPage() {
  return (
    <SeoPageShell
      eyebrow={{ es: "Fotografía", en: "Photography" }}
      title={{
        es: "Fotografía y mirada visual de Alex Vicente López",
        en: "Alex Vicente López’s photography and visual perspective",
      }}
      description={{
        es: "La fotografía forma parte de la identidad digital de Alex Vicente López y refuerza su forma de trabajar interfaces, composición, detalle y narrativa visual.",
        en: "Photography is part of Alex Vicente López’s digital identity and informs how he approaches interfaces, composition, detail, and visual narrative.",
      }}
      sections={[
        {
          title: { es: "Galería fotográfica", en: "Photography gallery" },
          body: {
            es: "La galería pública está disponible en rawvives.aleviclop.dev y reúne una selección visual vinculada a composición, paisaje, entorno urbano y edición fotográfica.",
            en: "The public gallery at rawvives.aleviclop.dev presents a visual selection focused on composition, landscapes, urban environments, and photographic editing.",
          },
        },
        {
          title: { es: "Criterio visual", en: "Visual judgment" },
          body: {
            es: "El trabajo fotográfico de Alex Vicente López complementa su portfolio técnico con atención a encuadre, jerarquía, ritmo visual y calidad del resultado final.",
            en: "Alex Vicente López’s photography complements his technical portfolio through attention to framing, hierarchy, visual rhythm, and final quality.",
          },
        },
        {
          title: { es: "Diseño digital", en: "Digital design" },
          body: {
            es: "La experiencia en fotografía y diseño editorial se traslada a interfaces web más cuidadas, con mejor dirección visual y decisiones de composición más precisas.",
            en: "Experience in photography and editorial design translates into more considered web interfaces, stronger visual direction, and more precise composition.",
          },
        },
        {
          title: { es: "Identidad creativa", en: "Creative identity" },
          body: {
            es: "Alex Vicente combina desarrollo web y fotografía para construir una presencia digital reconocible bajo el dominio aleviclop.dev y la galería rawvives.aleviclop.dev.",
            en: "Alex Vicente combines web development and photography to build a recognizable digital presence across aleviclop.dev and rawvives.aleviclop.dev.",
          },
        },
      ]}
    />
  );
}
