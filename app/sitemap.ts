import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const SITE_URL =
    process.env.NEXT_PUBLIC_SITE_URL || "https://aleviclop.dev";

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
