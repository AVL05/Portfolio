"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { getAlternatePath, type Locale } from "@/lib/i18n-paths";

/**
 * Language switcher as a real navigation to the equivalent URL.
 * The hash (home section anchor) is preserved when present.
 */
export function LanguageToggle() {
  const { language } = useLanguage();
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, [pathname]);

  const target: Locale = language === "es" ? "en" : "es";
  const href = `${getAlternatePath(pathname, target) ?? (target === "en" ? "/en" : "/")}${hash}`;

  return (
    <Link
      href={href}
      hrefLang={target}
      aria-describedby="language-toggle-description"
      className="group relative inline-grid h-11 grid-cols-[2.25rem_2.25rem] items-center overflow-hidden whitespace-nowrap rounded-lg border border-border bg-card/70 p-1 font-mono text-xs font-black uppercase leading-none tracking-[0.12em] transition-colors hover:border-primary/50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
    >
      <span
        aria-hidden="true"
        className={`absolute left-1 top-1 size-9 rounded-md bg-primary/14 ring-1 ring-inset ring-primary/28 transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${
          language === "en" ? "translate-x-9" : "translate-x-0"
        }`}
      />
      <span
        className={`relative z-10 inline-flex size-9 items-center justify-center transition-colors ${
          language === "es" ? "text-primary" : "text-foreground/55"
        }`}
      >
        ES
      </span>
      <span
        className={`relative z-10 inline-flex size-9 items-center justify-center transition-colors ${
          language === "en" ? "text-primary" : "text-foreground/55"
        }`}
      >
        EN
      </span>
      <span id="language-toggle-description" className="sr-only">
        {language === "es" ? "Cambiar a inglés" : "Switch to Spanish"}
      </span>
    </Link>
  );
}
