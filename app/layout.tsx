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
    default: "Alex Vicente López - Desarrollador Web",
    template: "%s | Alex Vicente López",
  },
  description:
    "Portfolio de Alex Vicente López, desarrollador web en formación especializado en React, PHP/Laravel, interfaces cuidadas y productos digitales claros.",
  keywords: [
    "Desarrollador Web",
    "Portfolio",
    "React",
    "Laravel",
    "PHP",
    "Next.js",
    "Frontend",
    "Full-stack junior",
  ],
  authors: [{ name: "Alex Vicente López", url: SITE_URL }],
  openGraph: {
    title: "Alex Vicente López - Desarrollador Web",
    description:
      "Portfolio de desarrollador web con proyectos frontend, backend, diseño editorial y una mirada visual apoyada en fotografía.",
    url: SITE_URL,
    siteName: "Alex Vicente López",
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
    title: "Alex Vicente López - Desarrollador Web",
    description:
      "Portfolio de desarrollador web con proyectos frontend, backend y diseño visual.",
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
    <html lang="es" className="dark scroll-smooth overflow-x-hidden" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://va.vercel-scripts.com" />
        <link rel="preconnect" href="https://vitals.vercel-insights.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Alex Vicente López",
              url: SITE_URL,
              jobTitle: "Desarrollador Web",
              sameAs: [
                "https://github.com/AVL05",
                "https://www.linkedin.com/in/alex-vicente-lopez/",
              ],
              description:
                "Desarrollador web en formación especializado en React, PHP/Laravel, interfaces cuidadas y productos digitales claros.",
            }),
          }}
        />
      </head>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased bg-background text-foreground overflow-x-hidden`}
        style={{ fontFeatureSettings: '"cv11", "ss01", "ss03"' }}
        suppressHydrationWarning
      >
        <LanguageProvider>
          <SmoothScroll>
            <div className="relative min-h-screen overflow-x-hidden">
              <Suspense fallback={null}>{children}</Suspense>
            </div>
          </SmoothScroll>
        </LanguageProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
