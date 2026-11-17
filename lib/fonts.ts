import { Hanken_Grotesk, JetBrains_Mono } from "next/font/google";

// Self-hosted by next/font at build time (no runtime request to Google).
// One sans family for headings and reading; one mono for the wordmark and
// metadata labels.
export const HankenSans = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
  display: "swap",
});

export const JetBrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
  preload: false,
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Roboto Mono", "Menlo", "Monaco", "Liberation Mono", "DejaVu Sans Mono", "Courier New", "monospace"],
});

export const fontVariables = `${HankenSans.variable} ${JetBrainsMono.variable}`;
