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
          "Portfolio fotográfico de Alex Vicente López: composición, fotografía urbana, paisaje y dirección de arte aplicada a interfaces digitales.",
      },
      en: {
        title: "Photography by Alex Vicente López",
        description:
          "Alex Vicente López’s photography portfolio: composition, urban photography, landscapes, and art direction applied to digital interfaces.",
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
          title: { es: "Composición", en: "Composition" },
          body: {
            es: "El trabajo fotográfico complementa su portfolio técnico con atención a encuadre, jerarquía, ritmo y calidad UI.",
            en: "His photography complements the technical portfolio through attention to framing, hierarchy, rhythm, and UI quality.",
          },
        },
        {
          title: { es: "Diseño digital", en: "Digital design" },
          body: {
            es: "La fotografía y el diseño editorial se trasladan a interfaces con decisiones más precisas de tipografía, jerarquía y composición.",
            en: "Photography and editorial design translate into more precise choices in interface typography, hierarchy, and composition.",
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
