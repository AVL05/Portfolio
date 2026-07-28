"use client";

import { useLanguage } from "@/lib/language-context";

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  const nextLanguage = language === "es" ? "en" : "es";

  return (
    <button
      type="button"
      onClick={() => setLanguage(nextLanguage)}
      aria-label={
        language === "es" ? "Cambiar a inglés" : "Switch to Spanish"
      }
      className="group relative inline-grid min-h-11 grid-cols-2 items-center overflow-hidden whitespace-nowrap rounded-lg border border-border bg-card/70 p-1 font-mono text-xs font-black uppercase tracking-[0.12em] transition-colors hover:border-primary/50 focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]"
    >
      <span
        aria-hidden="true"
        className={`absolute bottom-1 top-1 w-[calc(50%-0.25rem)] rounded-md bg-primary/14 ring-1 ring-inset ring-primary/28 transition-transform duration-300 ease-[cubic-bezier(.2,.8,.2,1)] ${
          language === "en" ? "translate-x-[calc(100%+0.25rem)]" : "translate-x-0"
        }`}
      />
      <span
        className={`relative z-10 px-2 transition-colors ${
          language === "es" ? "text-primary" : "text-foreground/55"
        }`}
      >
        ES
      </span>
      <span
        className={`relative z-10 px-2 transition-colors ${
          language === "en" ? "text-primary" : "text-foreground/55"
        }`}
      >
        EN
      </span>
    </button>
  );
}
