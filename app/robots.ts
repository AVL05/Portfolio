import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Technical / non-indexable routes. /legal stays crawlable so its
        // page-level noindex is honoured instead of being masked by robots.
        disallow: ["/api/", "/avatar-preview/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
