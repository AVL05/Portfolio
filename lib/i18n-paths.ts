/**
 * Single source of truth for the ES <-> EN route map.
 *
 * Spanish is the default locale and lives at the root (no prefix).
 * English lives under `/en` with translated section slugs; brand slugs
 * (raw-vives, lumaflow-studio, distrito-gourmet) stay identical.
 *
 * This module is intentionally dependency-free so it can run anywhere
 * (server components, client components, metadata, tests).
 */

export type Locale = "es" | "en";

export const LOCALES: readonly Locale[] = ["es", "en"];
export const DEFAULT_LOCALE: Locale = "es";

export interface RoutePair {
  es: string;
  en: string;
}

export const ROUTE_PAIRS: readonly RoutePair[] = [
  { es: "/", en: "/en" },
  { es: "/proyectos", en: "/en/projects" },
  { es: "/proyectos/raw-vives", en: "/en/projects/raw-vives" },
  { es: "/proyectos/lumaflow-studio", en: "/en/projects/lumaflow-studio" },
  { es: "/proyectos/distrito-gourmet", en: "/en/projects/distrito-gourmet" },
  { es: "/sobre-mi", en: "/en/about" },
  { es: "/fotografia", en: "/en/photography" },
  { es: "/contacto", en: "/en/contact" },
];

export const INDEXABLE_ES_PATHS: readonly string[] = ROUTE_PAIRS.map(
  (pair) => pair.es,
);

export const INDEXABLE_EN_PATHS: readonly string[] = ROUTE_PAIRS.map(
  (pair) => pair.en,
);

const ES_TO_EN = new Map(ROUTE_PAIRS.map((pair) => [pair.es, pair.en]));
const EN_TO_ES = new Map(ROUTE_PAIRS.map((pair) => [pair.en, pair.es]));

/** Remove a trailing slash (except for the root) so lookups are stable. */
export function normalizePathname(pathname: string): string {
  if (!pathname) return "/";
  const clean = pathname.split("?")[0]?.split("#")[0] ?? "/";
  if (clean.length > 1 && clean.endsWith("/")) return clean.slice(0, -1);
  return clean || "/";
}

/** Derive the serving locale purely from the URL path. */
export function getLocaleFromPathname(pathname: string): Locale {
  const clean = normalizePathname(pathname);
  return clean === "/en" || clean.startsWith("/en/") ? "en" : "es";
}

function splitHash(href: string): { path: string; hash: string } {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return { path: href, hash: "" };
  return { path: href.slice(0, hashIndex), hash: href.slice(hashIndex) };
}

/**
 * Return the equivalent path in the target locale, preserving any hash.
 * Query strings are dropped: indexable URLs never carry parameters.
 * Returns `null` for unknown paths so callers fail safely to a home page.
 */
export function getAlternatePath(
  pathname: string,
  targetLocale: Locale,
): string | null {
  if (!pathname) return null;
  const { path, hash } = splitHash(pathname);
  const clean = normalizePathname(path);

  if (targetLocale === "es") {
    if (EN_TO_ES.has(clean)) return `${EN_TO_ES.get(clean)}${hash}`;
    if (ES_TO_EN.has(clean)) return `${clean}${hash}`;
    return null;
  }

  if (ES_TO_EN.has(clean)) {
    const mapped = ES_TO_EN.get(clean) as string;
    // Keep the repository convention of "/#hash" on home pages.
    const separator = clean === "/" && hash ? "/" : "";
    return `${mapped}${separator}${hash}`;
  }
  if (EN_TO_ES.has(clean)) return `${clean}${hash}`;
  return null;
}

/** Home page of a locale. */
export function homePath(locale: Locale): string {
  return locale === "en" ? "/en" : "/";
}

function isExternalHref(href: string): boolean {
  return /^(?:[a-z][a-z0-9+.-]*:|\/\/|mailto:|tel:)/i.test(href);
}

/**
 * Rewrite an authored (Spanish) internal href for the given locale.
 * External URLs, same-page hashes and unknown paths never leak across
 * locales: unknown paths fall back to the locale home.
 */
export function localizeHref(href: string, locale: Locale): string {
  if (locale === "es") return href;
  if (!href || isExternalHref(href) || href.startsWith("#")) return href;
  const alternate = getAlternatePath(href, "en");
  return alternate ?? "/en";
}
