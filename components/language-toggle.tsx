"use client";

import * as React from "react";
import { useLanguage } from "@/lib/language-context";

export function LanguageToggle() {
  const { language } = useLanguage();
  const nextLanguage = language === "es" ? "en" : "es";
  const href = React.useMemo(() => {
    if (typeof window === "undefined") {
      return `/api/language?lang=${nextLanguage}&next=/`;
    }

    const url = new URL(window.location.href);
    url.searchParams.delete("lang");
    const next = `${url.pathname}${url.search}${url.hash}`;
    const params = new URLSearchParams({
      lang: nextLanguage,
      next,
    });

    return `/api/language?${params.toString()}`;
  }, [nextLanguage]);

  return (
    <a
      href={href}
      aria-label={language === "es" ? "Switch to English" : "Cambiar a español"}
      className="inline-flex h-8 items-center justify-center gap-1.5 whitespace-nowrap rounded-full border border-border bg-card/70 px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest transition-all hover:border-primary/50 hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
    >
      <span
        className={language === "es" ? "text-primary" : "text-foreground/40"}
      >
        ES
      </span>
      <span className="mx-1 text-foreground/20">/</span>
      <span
        className={language === "en" ? "text-primary" : "text-foreground/40"}
      >
        EN
      </span>
    </a>
  );
}
