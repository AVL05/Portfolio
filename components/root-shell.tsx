import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type React from "react";
import { Suspense } from "react";
import "@/lib/raf-polyfill";
import { CustomCursor } from "@/components/custom-cursor";
import { LanguageProvider } from "@/lib/language-context";
import type { Locale } from "@/lib/i18n-paths";

/**
 * Shared body infrastructure for both locale root layouts.
 * The locale itself always comes from the URL (route group), never from
 * cookies, storage, headers or the user agent.
 */
export function RootShell({
  language,
  skipLabel,
  children,
}: Readonly<{
  language: Locale;
  skipLabel: string;
  children: React.ReactNode;
}>) {
  const isVercel = process.env.VERCEL === "1";

  return (
    <LanguageProvider initialLanguage={language}>
      <a href="#main-content" className="skip-link">
        {skipLabel}
      </a>
      <CustomCursor />
      <div className="relative min-h-screen overflow-x-clip">
        <Suspense fallback={null}>{children}</Suspense>
      </div>
      {isVercel ? <Analytics /> : null}
      {isVercel ? <SpeedInsights /> : null}
    </LanguageProvider>
  );
}
