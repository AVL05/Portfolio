import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { cookies, headers } from "next/headers";
import type React from "react";
import { Suspense } from "react";
import "@/lib/raf-polyfill";
import "./globals.css";
import { CustomCursor } from "@/components/custom-cursor";
import { LanguageProvider, type Language } from "@/lib/language-context";
import {
  personJsonLd,
  profilePageJsonLd,
  SAME_AS,
  SEO_KEYWORDS,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_TITLE,
  SITE_URL,
  websiteJsonLd,
} from "@/lib/seo";

export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9e5dc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b09" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: SITE_TITLE,
    template: "%s | Alex Vicente López",
  },
  description: SITE_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: "Alex Vicente López", url: SITE_URL }],
  creator: "Alex Vicente López",
  publisher: "Alex Vicente López",
  category: "portfolio",
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    images: [
      {
        url: `${SITE_URL}/api/og?lang=es`,
        width: 1200,
        height: 630,
        alt: "Alex Vicente López - Portfolio",
      },
    ],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
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
  alternates: {
    canonical: SITE_URL,
    languages: {
      es: SITE_URL,
      en: SITE_URL,
      "x-default": SITE_URL,
    },
  },
  other: {
    "profile:first_name": "Alex",
    "profile:last_name": "Vicente López",
    "article:author": SAME_AS[1],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isVercel = process.env.VERCEL === "1";
  const cookieStore = await cookies();
  const cookieLanguage = cookieStore.get("language")?.value;
  const requestHeaders = await headers();
  const browserLanguage = requestHeaders.get("accept-language") ?? "";
  const initialLanguage: Language =
    cookieLanguage === "es" || cookieLanguage === "en"
      ? cookieLanguage
      : /(^|,)\s*es(?:-|;|,|$)/i.test(browserLanguage)
        ? "es"
        : "en";

  return (
    <html
      lang={initialLanguage}
      className="dark scroll-smooth overflow-x-hidden"
      suppressHydrationWarning
    >
      <head>
        {isVercel ? <link rel="preconnect" href="https://va.vercel-scripts.com" /> : null}
        {isVercel ? <link rel="preconnect" href="https://vitals.vercel-insights.com" /> : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([
              personJsonLd,
              websiteJsonLd,
              profilePageJsonLd,
            ]),
          }}
        />
      </head>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}
        style={{ fontFeatureSettings: '"cv11", "ss01", "ss03"' }}
        suppressHydrationWarning
      >
        <LanguageProvider initialLanguage={initialLanguage}>
          <a href="#main-content" className="skip-link">
            {initialLanguage === "es" ? "Saltar al contenido" : "Skip to content"}
          </a>
          <CustomCursor />
          <div className="relative min-h-screen overflow-x-hidden">
            <Suspense fallback={null}>{children}</Suspense>
          </div>
        </LanguageProvider>
        {isVercel ? <Analytics /> : null}
        {isVercel ? <SpeedInsights /> : null}
      </body>
    </html>
  );
}
