import type { Metadata } from "next";
import type React from "react";
import "../globals.css";
import { fontVariables } from "@/lib/fonts";
import { THEME_COLORS, themeInitScript } from "@/lib/theme";
import { RootShell } from "@/components/root-shell";
import {
  EN_SITE_DESCRIPTION,
  EN_SITE_TITLE,
  buildPersonJsonLd,
  SAME_AS,
  SEO_KEYWORDS,
  SITE_NAME,
  SITE_URL,
  websiteJsonLd,
} from "@/lib/seo";

export const viewport = {
  colorScheme: "dark light",
  // Dark by default; the head script and the theme toggle update this tag.
  themeColor: THEME_COLORS.dark,
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
    icon: [{ url: "/favicon.png", type: "image/png", sizes: "192x192" }],
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
  buildPersonJsonLd("en"),
  {
    ...websiteJsonLd,
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
      data-theme="dark"
      className="scroll-smooth overflow-x-clip"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
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
        className={`font-sans ${fontVariables} antialiased bg-background text-foreground overflow-x-clip`}
        suppressHydrationWarning
      >
        <RootShell language="en" skipLabel="Skip to content">
          {children}
        </RootShell>
      </body>
    </html>
  );
}
