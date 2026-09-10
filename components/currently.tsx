"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function Currently() {
  const { t } = useLanguage();

  return (
    <section id="currently" aria-labelledby="currently-title" className="px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-[100rem] gap-8 border-y border-border/55 py-10 lg:grid-cols-[.7fr_1.3fr]">
        <h2 id="currently-title" className="text-3xl font-semibold tracking-tight">{t.currently.title}</h2>
        <dl className="grid gap-7 sm:grid-cols-3">
          {t.currently.items.map((item) => (
            <div key={item.label}>
              <dt className="font-mono text-xs text-muted-foreground">{item.label}</dt>
              <dd className="mt-3 text-base font-medium">
                {item.href ? <a href={item.href} className="cinema-link min-h-11">{item.value}<ArrowUpRight aria-hidden="true" /></a> : item.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
