/**
 * Structural project data (links, media, stack). Copy lives in the locale
 * files under `projects`, joined by `slug`. Only claims that can be checked:
 * a `live` URL exists only when the demo is published and answering.
 */
export interface FeaturedProject {
  slug: "distrito-gourmet" | "lumaflow-studio" | "raw-vives";
  title: string;
  image: string;
  width: number;
  height: number;
  tech: string[];
  code: string;
  live?: string;
}

export const FEATURED_PROJECTS: readonly FeaturedProject[] = [
  {
    slug: "distrito-gourmet",
    title: "Distrito Gourmet",
    image: "/projects/distrito_gourmet/distrito-gourmet.png",
    width: 1919,
    height: 916,
    tech: ["React", "Laravel", "MySQL", "Tailwind CSS", "GSAP", "Docker"],
    code: "https://github.com/AVL05/distrito-gourmet",
    live: "https://distrito-gourmet.aleviclop.dev",
  },
  {
    slug: "lumaflow-studio",
    title: "LumaFlow Studio",
    image: "/projects/lumaflow-studio-ai.webp",
    width: 1270,
    height: 714,
    tech: ["React 19", "Laravel", "MySQL", "Sanctum"],
    code: "https://github.com/AVL05/lumaflow-studio",
    // No live demo is published for LumaFlow, so no Live link is shown.
  },
  {
    slug: "raw-vives",
    title: "raw.vives",
    image: "/projects/raw-vives/raw-vives-hero.webp",
    width: 1280,
    height: 720,
    tech: ["Next.js", "Tailwind CSS", "GSAP"],
    code: "https://github.com/AVL05/alexgallery",
    live: "https://rawvives.aleviclop.dev",
  },
];

export interface OtherProject {
  slug: string;
  code: string;
  tech: string[];
}

export const OTHER_PROJECTS: readonly OtherProject[] = [
  { slug: "premium-frontend-director", code: "https://github.com/AVL05/premium-frontend-director", tech: [] },
  { slug: "echo-the-awakening", code: "https://github.com/AVL05/echo-the-awakening", tech: [] },
  { slug: "api-hotel", code: "https://github.com/avl05/API_Hotel", tech: ["PHP"] },
  { slug: "dulces", code: "https://github.com/AVL05/Dulces", tech: ["Vue", "Vite"] },
];

/** Skills shown on the home, in display order. */
export const SKILLS: readonly string[] = [
  "React",
  "Next.js",
  "JavaScript",
  "HTML",
  "CSS",
  "Tailwind CSS",
  "GSAP",
  "PHP",
  "Laravel",
  "MySQL",
  "APIs REST",
  "Git",
  "GitHub",
  "Bitbucket",
  "Docker",
  "Electron",
  "Vercel",
  "Cloudflare",
];
