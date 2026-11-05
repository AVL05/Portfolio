"use client";

import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function Currently() {
  const { t } = useLanguage();

  return (
    <section id="currently" aria-labelledby="currently-title" className="pb-16 sm:pb-20">
      <div className="page-frame">
        <div className="grid gap-6 border-y border-border py-7 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-baseline">
          <h2 id="currently-title" className="label-mono text-primary">{t.currently.title}</h2>
          <dl className="flex flex-wrap gap-x-12 gap-y-5">
            {t.currently.items.map((item) => (
              <div key={item.label} className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                <dt className="label-mono text-muted-foreground">{item.label}</dt>
                <dd className="text-lg font-medium tracking-tight">
                  {item.href ? <a href={item.href} className="cinema-link">{item.value}<ArrowUpRight aria-hidden="true" /></a> : item.value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
