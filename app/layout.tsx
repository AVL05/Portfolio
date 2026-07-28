import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import type React from "react";
import { Suspense } from "react";
import "@/lib/raf-polyfill";
import "./globals.css";
import { CustomCursor } from "@/components/custom-cursor";
import { LanguageProvider, type Language } from "@/lib/language-context";
import { getRequestLanguage } from "@/lib/request-language";
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

export async function generateMetadata(): Promise<Metadata> {
  const language = await getRequestLanguage();
  const title =
    language === "es"
      ? SITE_TITLE
      : "Alex Vicente | Frontend Developer · React & Next.js";
  const description =
    language === "es"
      ? SITE_DESCRIPTION
      : "Portfolio of Alex Vicente, a frontend developer in Valencia specializing in React, Next.js, and TypeScript, with full-stack experience and strong visual judgment.";

  return {
    metadataBase: new URL(SITE_URL),
    applicationName: SITE_NAME,
    title: {
      default: title,
      template: "%s | Alex Vicente López",
    },
    description,
    keywords: SEO_KEYWORDS,
    authors: [{ name: "Alex Vicente López", url: SITE_URL }],
    creator: "Alex Vicente López",
    publisher: "Alex Vicente López",
    category: "portfolio",
    openGraph: {
      title,
      description,
      url: SITE_URL,
      siteName: SITE_NAME,
      images: [
        {
          url: `${SITE_URL}/api/og?lang=${language}`,
          width: 1200,
          height: 630,
          alt: "Alex Vicente López - Portfolio",
        },
      ],
      locale: language === "es" ? "es_ES" : "en_GB",
      alternateLocale: language === "es" ? ["en_GB"] : ["es_ES"],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [`${SITE_URL}/api/og?lang=${language}`],
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
    },
    other: {
      "profile:first_name": "Alex",
      "profile:last_name": "Vicente López",
      "article:author": SAME_AS[1],
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isVercel = process.env.VERCEL === "1";
  const initialLanguage: Language = await getRequestLanguage();

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
              {
                ...personJsonLd,
                jobTitle:
                  initialLanguage === "es"
                    ? "Desarrollador frontend"
                    : "Frontend Developer",
                description:
                  initialLanguage === "es"
                    ? personJsonLd.description
                    : "Alex Vicente López is a frontend developer specializing in React, Next.js, TypeScript, and accessible production-ready interfaces.",
                hasOccupation: {
                  ...personJsonLd.hasOccupation,
                  name:
                    initialLanguage === "es"
                      ? "Desarrollador frontend"
                      : "Frontend Developer",
                },
              },
              websiteJsonLd,
              {
                ...profilePageJsonLd,
                name:
                  initialLanguage === "es"
                    ? profilePageJsonLd.name
                    : "Alex Vicente López - Frontend developer profile",
                description:
                  initialLanguage === "es"
                    ? profilePageJsonLd.description
                    : "Professional frontend development profile of Alex Vicente López.",
                inLanguage: initialLanguage,
              },
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
