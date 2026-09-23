"use client";

import { usePathname } from "next/navigation";
import "./globals.css";
import { getLocaleFromPathname } from "@/lib/i18n-paths";

export default function GlobalError({ retry }: { retry: () => void }) {
  const language = getLocaleFromPathname(usePathname() ?? "/");
  const isEnglish = language === "en";

  return (
    <html lang={language} className="dark">
      <body className="bg-background text-foreground antialiased">
        <title>{isEnglish ? "Unexpected error" : "Error inesperado"}</title>
        <main className="grid min-h-screen place-items-center px-6">
          <div className="max-w-2xl">
            <p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-primary">
              {isEnglish ? "Error / Recovery" : "Error / Recuperación"}
            </p>
            <h1 className="mt-5 text-4xl font-black leading-tight sm:text-6xl">
              {isEnglish ? "Something went wrong." : "Algo ha salido mal."}
            </h1>
            <p className="mt-5 max-w-xl font-medium leading-relaxed text-muted-foreground">
              {isEnglish
                ? "The page could not be displayed. Try loading it again."
                : "No se ha podido mostrar la página. Intenta cargarla de nuevo."}
            </p>
            <button
              type="button"
              onClick={retry}
              className="mt-8 inline-flex min-h-11 items-center bg-primary px-5 text-sm font-bold text-primary-foreground"
            >
              {isEnglish ? "Try again" : "Reintentar"}
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
