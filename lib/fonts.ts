import { Geist, Geist_Mono, IBM_Plex_Mono, Inter, Space_Grotesk } from "next/font/google";

export const DisplayFont = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });
export const BodyFont = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });
export const LabelFont = IBM_Plex_Mono({ subsets: ["latin"], weight: "400", variable: "--font-label", display: "swap" });

// Legacy sections keep Geist with compact Latin subsets.
export const GeistSans = Geist({
  subsets: ["latin"], variable: "--font-geist-sans", display: "swap", preload: false,
});
export const GeistMono = Geist_Mono({
  subsets: ["latin"], variable: "--font-geist-mono", display: "swap", preload: false,
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Roboto Mono", "Menlo", "Monaco", "Liberation Mono", "DejaVu Sans Mono", "Courier New", "monospace"],
});
