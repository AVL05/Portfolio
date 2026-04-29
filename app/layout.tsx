import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type React from "react";
import { Suspense } from "react";
import "@/lib/raf-polyfill";
import "./globals.css";
import { SmoothScroll } from "@/components/smooth-scroll";
import { NoiseOverlay } from "@/components/noise-overlay";
import { ScrollProgress } from "@/components/scroll-progress";
import { ThemeProvider } from "@/components/theme-provider";
import { LanguageProvider } from "@/lib/language-context";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://aleviclop.vercel.app";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#000000" },
  ],
};

export const metadata: Metadata = {
  title: {
    default: "Alex Vicente López - Portfolio",
    template: "%s | Alex Vicente López",
  },
  description:
    "Desarrollador Web | Fotógrafo Creativo | Diseñador Digital. Transformo ideas en experiencias digitales únicas.",
  keywords: [
    "Desarrollador Web",
    "Portfolio",
    "Fotógrafo",
    "Diseño Digital",
    "React",
    "Next.js",
    "GSAP",
    "Animations",
  ],
  authors: [{ name: "Alex Vicente López", url: SITE_URL }],
  openGraph: {
    title: "Alex Vicente López - Portfolio",
    description:
      "Desarrollador Web | Fotógrafo Creativo | Diseñador Digital. Transformo ideas en experiencias digitales únicas.",
    url: SITE_URL,
    siteName: "Alex Vicente López",
    images: [
      {
        url: `${SITE_URL}/api/og?lang=es`,
        width: 1200,
        height: 630,
        alt: "Alex Vicente López — Portfolio",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alex Vicente López - Portfolio",
    description:
      "Desarrollador Web | Fotógrafo Creativo | Diseñador Digital. Transformo ideas en experiencias digitales únicas.",
    images: [`${SITE_URL}/api/og?lang=es`],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: { canonical: SITE_URL },
  icons: {
    icon: "/favicon.svg",
    apple: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="scroll-smooth overflow-x-hidden" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Alex Vicente López",
              url: SITE_URL,
              jobTitle: "Desarrollador Web y Fotógrafo",
              sameAs: [
                "https://github.com/AVL05",
                "https://www.linkedin.com/in/alex-vicente-lopez/",
              ],
              description: "Desarrollador Web, Fotógrafo Creativo y Diseñador Digital especializado en experiencias digitales únicas.",
            }),
          }}
        />
      </head>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased selection:bg-primary/30 selection:text-primary bg-background text-foreground selection:text-primary-foreground overflow-x-hidden`}
        style={{ fontFeatureSettings: '"cv11", "ss01", "ss03"' }}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <SmoothScroll>
              <div className="relative min-h-screen overflow-x-hidden">
                <ScrollProgress />
                <Suspense fallback={null}>{children}</Suspense>
              </div>
            </SmoothScroll>
          </ThemeProvider>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
