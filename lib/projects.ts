import { RAW_VIVES_URL } from "@/lib/site";

/**
 * Structural project data (links, media, stack). Copy lives in the locale
 * files under `projects`, joined by `slug`. Only claims that can be checked:
 * a `live` URL exists only when the demo is published and answering.
 */
export interface Project {
  slug: string;
  image: string;
  width: number;
  height: number;
  tech: string[];
  code?: string;
  live?: string;
}

interface FeaturedProject extends Project {
  slug: "sinergia" | "lumaflow-studio" | "raw-vives";
  title: string;
}

export const FEATURED_PROJECTS: readonly FeaturedProject[] = [
  {
    slug: "sinergia",
    title: "Sinergia",
    image: "/projects/sinergia.webp",
    width: 400,
    height: 291,
    tech: ["React 19", "Laravel", "PostgreSQL"],
    live: "https://sinergia.aleviclop.dev/",
  },
  {
    slug: "lumaflow-studio",
    title: "LumaFlow Studio",
    image: "/projects/lumaflow-studio.webp",
    width: 1440,
    height: 850,
    tech: ["React 19", "Laravel", "MySQL", "Sanctum"],
    code: "https://github.com/AVL05/lumaflow-studio",
    live: "https://lumaflow.aleviclop.dev/demo",
  },
  {
    slug: "raw-vives",
    title: "raw.vives",
    image: "/projects/raw-vives.png",
    width: 1254,
    height: 1254,
    tech: ["Next.js", "Tailwind CSS", "GSAP"],
    code: "https://github.com/AVL05/alexgallery",
    live: RAW_VIVES_URL,
  },
];

export const OTHER_PROJECTS: readonly Project[] = [
  {
    slug: "premium-frontend-director",
    image: "/projects/premium-frontend-director.webp",
    width: 512,
    height: 512,
    code: "https://github.com/AVL05/premium-frontend-director",
    live: "https://the-art-of-direction.netlify.app/",
    tech: [],
  },
  {
    slug: "echo-the-awakening",
    image: "/projects/echo-the-awakening.webp",
    width: 512,
    height: 512,
    code: "https://github.com/AVL05/echo-the-awakening",
    tech: ["React 19", "Three.js", "Vite"],
  },
  {
    slug: "api-hotel",
    image: "/projects/api-hotel.webp",
    width: 613,
    height: 625,
    code: "https://github.com/avl05/API_Hotel",
    tech: ["PHP"],
  },
  {
    slug: "distrito-gourmet",
    image: "/projects/distrito-gourmet.webp",
    width: 1440,
    height: 778,
    tech: ["React", "Laravel", "MySQL", "Tailwind CSS", "GSAP", "Docker"],
    code: "https://github.com/AVL05/distrito-gourmet",
  },
  {
    slug: "racefinder",
    image: "/projects/racefinder.webp",
    width: 512,
    height: 512,
    tech: ["React 19", "Python", "SQLite"],
    code: "https://github.com/AVL05/RaceFinder",
  },
];

export const SKILLS = {
  frontend: ["React", "Next.js", "JavaScript", "HTML", "CSS", "Tailwind CSS", "GSAP", "Electron"],
  backend: ["PHP", "Laravel", "MySQL", "APIs REST"],
  tools: ["Git", "GitHub", "Bitbucket", "Docker", "Vercel", "Cloudflare"],
} as const;
