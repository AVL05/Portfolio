/** Respect the browser's first accepted language, including quality weights. */
export function preferredLanguage(header: string): "es" | "en" {
  const preferences = header.split(",").map((entry, index) => {
    const [tag, ...parameters] = entry.trim().toLowerCase().split(";");
    const qualityParameter = parameters.find((parameter) => parameter.trim().startsWith("q="));
    const quality = qualityParameter ? Number(qualityParameter.trim().slice(2)) : 1;
    return { tag, quality, index };
  }).filter(({ tag, quality }) => tag && Number.isFinite(quality) && quality > 0 && quality <= 1)
    .sort((a, b) => b.quality - a.quality || a.index - b.index);

  return /^es(?:-|$)/.test(preferences[0]?.tag ?? "") ? "es" : "en";
}
