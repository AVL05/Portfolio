import type { Metadata } from "next";
import type React from "react";
import "../globals.css";
import { GeistMono, GeistSans } from "@/lib/fonts";
import { RootShell } from "@/components/root-shell";
import {
  EN_SITE_DESCRIPTION,
  EN_SITE_TITLE,
  personJsonLd,
  profilePageJsonLd,
  SAME_AS,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  websiteJsonLd,
} from "@/lib/seo";

export const viewport = {
  colorScheme: "dark",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#e9e5dc" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b09" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: EN_SITE_TITLE,
    template: "%s | Alex Vicente López",
  },
  description: EN_SITE_DESCRIPTION,
  keywords: SEO_KEYWORDS,
  authors: [{ name: "Alex Vicente López", url: SITE_URL }],
  creator: "Alex Vicente López",
  publisher: "Alex Vicente López",
  category: "portfolio",
  formatDetection: {
    telephone: false,
  },
  icons: {
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "1254x1254" }],
    shortcut: "/favicon.png",
    apple: "/favicon.png",
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
  other: {
    "profile:first_name": "Alex",
    "profile:last_name": "Vicente López",
    "article:author": SAME_AS[1],
  },
};

const enJsonLd = [
  {
    ...personJsonLd,
    description:
      "Alex Vicente López is a Frontend / Full-Stack Developer focused on React and Next.js, with full-stack experience in Laravel, PHP, and MySQL and freelance availability.",
  },
  {
    ...websiteJsonLd,
    inLanguage: "en",
  },
  {
    ...profilePageJsonLd,
    "@id": `${SITE_URL}/en/#profile-page`,
    name: "Alex Vicente López - Frontend / Full-Stack Developer profile",
    url: `${SITE_URL}/en`,
    description:
      "Professional Frontend / Full-Stack Developer profile of Alex Vicente López, focused on React and Next.js with supporting full-stack experience.",
    inLanguage: "en",
  },
];

export default function EnLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isVercel = process.env.VERCEL === "1";

  return (
    <html
      lang="en"
      className="dark scroll-smooth overflow-x-clip"
      suppressHydrationWarning
    >
      <head>
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        {isVercel ? <link rel="preconnect" href="https://va.vercel-scripts.com" /> : null}
        {isVercel ? <link rel="preconnect" href="https://vitals.vercel-insights.com" /> : null}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(enJsonLd),
          }}
        />
      </head>
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased bg-background text-foreground overflow-x-clip`}
        style={{ fontFeatureSettings: '"cv11", "ss01", "ss03"' }}
        suppressHydrationWarning
      >
        <RootShell language="en" skipLabel="Skip to content">
          {children}
        </RootShell>
      </body>
    </html>
  );
}
