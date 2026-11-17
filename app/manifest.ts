import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alex Vicente López: Desarrollador Web Full-Stack Junior",
    short_name: "aleviclop.dev",
    description:
      "Portfolio de Alex Vicente López, desarrollador web full-stack junior en Valencia.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0f0e0d",
    theme_color: "#0f0e0d",
    lang: "es",
    icons: [
      {
        src: "/favicon.png",
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
