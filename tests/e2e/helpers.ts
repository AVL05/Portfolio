import type { Locator, Page } from "@playwright/test";

export const CASES = ["distrito-gourmet", "lumaflow-studio", "raw-vives"] as const;

export const HOMES = [
  { locale: "es", path: "/", cases: "/proyectos/", title: "Alex Vicente López, Desarrollador Full-Stack Junior", work: "Ver proyectos", cv: "Descargar CV" },
  { locale: "en", path: "/en", cases: "/en/projects/", title: "Alex Vicente López, Junior Full-Stack Developer", work: "View work", cv: "Download CV" },
] as const;

/** Collects uncaught exceptions and console errors for the lifetime of the page. */
export function trackErrors(page: Page) {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
  return errors;
}

export const hasHorizontalOverflow = (page: Page) =>
  page.evaluate(() => document.documentElement.scrollWidth > innerWidth);

/** True when every masked hero headline line fits inside its mask. */
export const heroLinesFit = (page: Page) =>
  page.locator("#hero").evaluate(hero =>
    [...hero.querySelectorAll<HTMLElement>("[data-hero-line]")].every(line => line.scrollWidth <= line.parentElement!.clientWidth + 1));

/**
 * WCAG contrast ratio of each element's text (or placeholder) against its
 * composited ancestor backgrounds. Runs in the page so computed colours apply.
 */
export function contrastRatios(locator: Locator, options: { placeholder?: boolean; ownTextOnly?: boolean } = {}) {
  return locator.evaluateAll((all, { placeholder, ownTextOnly }) => {
    const elements = ownTextOnly
      ? all.filter(element => [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()))
      : all;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 1;
    const context = canvas.getContext("2d", { willReadFrequently: true })!;
    const luminance = (values: Uint8ClampedArray) => Array.from(values).slice(0, 3)
      .map(value => value / 255).map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4)
      .reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
    const paint = (color: string) => {
      context.fillStyle = color;
      context.fillRect(0, 0, 1, 1);
    };
    return elements.map(element => {
      const ancestors: Element[] = [];
      for (let node: Element | null = element; node; node = node.parentElement) ancestors.unshift(node);
      paint("#fff");
      for (const node of ancestors) paint(getComputedStyle(node).backgroundColor);
      const background = luminance(context.getImageData(0, 0, 1, 1).data);
      paint(getComputedStyle(element, placeholder ? "::placeholder" : null).color);
      const foreground = luminance(context.getImageData(0, 0, 1, 1).data);
      return {
        text: (element.textContent || element.getAttribute("name") || element.id).trim(),
        ratio: (Math.max(background, foreground) + .05) / (Math.min(background, foreground) + .05),
      };
    });
  }, { placeholder: Boolean(options.placeholder), ownTextOnly: Boolean(options.ownTextOnly) });
}
