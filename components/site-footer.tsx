"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
import { localizeHref } from "@/lib/i18n-paths";

export function SiteFooter() {
  const { language, t } = useLanguage();
  const es = language === "es";

  return (
    <footer className="border-t border-border px-[var(--column-pad)] py-8">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-[.8125rem] text-muted-foreground">
        <p>
          <span className="font-mono text-foreground">aleviclop</span>
          <span className="font-mono text-primary">.dev</span>
          {" "}· &copy; 2026 Alex Vicente López
        </p>
        <Link href={localizeHref("/legal", language)} className="cinema-link">
          {es ? "Aviso legal y privacidad" : "Legal notice & privacy"}
        </Link>
      </div>
      <p className="mt-1 text-[.8125rem] text-muted-foreground">{t.contact.footer_built}</p>
    </footer>
  );
}
