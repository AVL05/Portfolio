import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";

// Editorial Index: one sans family for display and reading, a mono for
// metadata and a single serif italic reserved for short accent phrases.
export const GeistSans = Geist({
  subsets: ["latin"], variable: "--font-geist-sans", display: "swap",
});
export const GeistMono = Geist_Mono({
  subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: false,
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Roboto Mono", "Menlo", "Monaco", "Liberation Mono", "DejaVu Sans Mono", "Courier New", "monospace"],
});
export const AccentSerif = Instrument_Serif({
  subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-accent", display: "swap",
});
