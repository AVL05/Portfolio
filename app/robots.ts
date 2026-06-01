import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://aleviclop.dev";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
