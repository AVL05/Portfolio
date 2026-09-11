import type { MetadataRoute } from "next";
import { absoluteUrl, INDEXABLE_ROUTES } from "@/lib/seo";
import { getAlternatePath } from "@/lib/i18n-paths";

export default function sitemap(): MetadataRoute.Sitemap {
  // Exactly the 16 indexable URLs (8 ES + 8 EN), each annotated with its
  // language alternates. /legal and /en/legal are noindex and excluded,
  // as are 404, /api/*, /avatar-preview and technical routes.
  return INDEXABLE_ROUTES.map((route) => {
    const es = route.locale === "es" ? route.path : getAlternatePath(route.path, "es");
    const en = route.locale === "en" ? route.path : getAlternatePath(route.path, "en");
    return {
      url: absoluteUrl(route.path),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: {
        languages: {
          es: absoluteUrl(es ?? "/"),
          en: absoluteUrl(en ?? "/en"),
          "x-default": absoluteUrl(es ?? "/"),
        },
      },
    };
  });
}
