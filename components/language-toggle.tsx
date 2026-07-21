"use client";

import { useLanguage } from "@/lib/language-context";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const nextLanguage = language === "es" ? "en" : "es";

  return (
    <button
      type="button"
      onClick={() => setLanguage(nextLanguage)}
      className="inline-flex min-h-11 items-center justify-center gap-1.5 whitespace-nowrap rounded-xl border border-border bg-card/70 px-3 py-1 font-mono text-[11px] font-black uppercase tracking-widest transition-all hover:border-primary/50 hover:bg-muted focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
    >
      <span
        className={language === "es" ? "text-primary" : "text-foreground/65"}
      >
        ES
      </span>
      <span className="mx-1 text-foreground/50">/</span>
      <span
        className={language === "en" ? "text-primary" : "text-foreground/65"}
      >
        EN
      </span>
      <span className="sr-only">
        {language === "es" ? "Switch to English" : "Cambiar a español"}
      </span>
    </button>
  );
}
