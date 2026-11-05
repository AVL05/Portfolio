/**
 * Presentation data for the three featured case studies. Professional copy
 * stays in the locale files; this module only maps real, published media
 * and the stable view-transition names shared with each case study hero.
 */
export const FEATURED_INDEXES = [0, 1, 2] as const;

export interface FeaturedMedia {
  slug: "distrito-gourmet" | "lumaflow-studio" | "raw-vives";
  plate: string;
  secondary: string;
  tone: "paper" | "ink" | "night";
}

export const FEATURED_MEDIA: readonly FeaturedMedia[] = [
  {
    slug: "distrito-gourmet",
    plate: "/projects/distrito_gourmet/distrito-gourmet.png",
    secondary: "/projects/distrito_gourmet/admin-poster.webp",
    tone: "paper",
  },
  {
    slug: "lumaflow-studio",
    plate: "/projects/lumaflow-studio-ai.webp",
    secondary: "/projects/lumaflow-studio-delivery.webp",
    tone: "ink",
  },
  {
    slug: "raw-vives",
    plate: "/projects/raw-vives/raw-vives-hero.webp",
    secondary: "/projects/raw-vives/raw-vives-series.webp",
    tone: "night",
  },
];

export const viewTransitionNameFor = (slug: FeaturedMedia["slug"]) => `project-${slug}`;

/**
 * Cross-document view transitions require unique names on the outgoing page.
 * Names are assigned only to the element the visitor activates.
 */
export function claimViewTransition(element: HTMLElement | null, slug: FeaturedMedia["slug"]) {
  if (!element) return;
  document.querySelectorAll<HTMLElement>("[data-vt-claimed]").forEach((node) => {
    node.style.removeProperty("view-transition-name");
    node.removeAttribute("data-vt-claimed");
  });
  element.style.setProperty("view-transition-name", viewTransitionNameFor(slug));
  element.setAttribute("data-vt-claimed", "");
}
