import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Alex Vicente López — Portfolio",
    short_name: "aleviclop.dev",
    description:
      "Portfolio profesional de Alex Vicente López, Desarrollador Full-Stack Junior.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    background_color: "#0b0b09",
    theme_color: "#0b0b09",
    lang: "es",
    icons: [
      {
        src: "/favicon.png",
        sizes: "1254x1254",
        type: "image/png",
        purpose: "any",
      },
    ],
  };
}
