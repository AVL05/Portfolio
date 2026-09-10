"use client";

import { useLanguage, type TimelineItem } from "@/lib/language-context";
import { FileText } from "lucide-react";

function Timeline({ items }: { items: TimelineItem[] }) {
  return <ol className="mt-6">
    {items.map((item) => <li key={`${item.title}-${item.period}`} className="grid gap-4 border-t border-border/50 py-8 sm:grid-cols-[10rem_minmax(0,1fr)] lg:grid-cols-[14rem_minmax(0,1fr)]">
      <p className="font-mono text-xs leading-relaxed text-primary tabular-nums">{item.period}</p>
      <article className="relative border-l border-border/60 pl-6">
        <span aria-hidden="true" className="absolute -left-[3px] top-2 size-[5px] rounded-full bg-primary" />
        <p className="text-sm font-medium text-muted-foreground">{item.company ?? item.institution}</p>
        <h4 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">{item.title}</h4>
        <p className="mt-2 text-xs text-muted-foreground">{[item.contract, item.location].filter(Boolean).join(" · ")}</p>
        <p className="mt-4 max-w-[65ch] text-sm leading-relaxed text-muted-foreground">{item.description}</p>
        {item.highlights?.length ? <ul className="mt-4 max-w-[65ch] space-y-2">
          {item.highlights.map(highlight => <li key={highlight} className="flex gap-3 text-sm leading-relaxed text-foreground/80"><span aria-hidden="true" className="text-primary">—</span>{highlight}</li>)}
        </ul> : null}
      </article>
    </li>)}
  </ol>;
}

export function Experience() {
  const { t } = useLanguage();
  return <section id="experience" aria-labelledby="experience-title" className="bg-background px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
    <div className="mx-auto max-w-[100rem]">
      <header className="grid gap-8 lg:grid-cols-[.85fr_1.15fr] lg:items-end">
        <div>
          <p className="section-kicker">{t.experience.title}</p>
          <h2 id="experience-title" className="mt-5 max-w-[14ch] text-[clamp(3rem,6vw,6rem)] font-black leading-[.98] tracking-[-.055em]">{t.experience.subtitle}</h2>
        </div>
        <p className="max-w-[42ch] text-lg leading-relaxed text-muted-foreground lg:justify-self-end">{t.experience.desc}</p>
      </header>
      <div className="mt-14 grid gap-8 lg:grid-cols-[.35fr_1fr]">
        {/* Experience comes first for recruiter scanning */}
        <h3 className="text-lg font-semibold">{t.experience.job_title}</h3>
        <Timeline items={t.experience.experience_list} />
        {/* Education */}
        <h3 className="text-lg font-semibold">{t.experience.edu_title}</h3>
        <Timeline items={t.experience.education_list} />
      </div>
      <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border/55 pt-6">
        <p className="text-sm text-muted-foreground">{t.experience.cv_title}</p>
        <a href="/cv/CV_Alex_Vicente_Lopez.pdf" download className="cinema-link min-h-11 text-sm"><FileText aria-hidden="true" size={16} />{t.experience.cv_btn}</a>
      </div>
    </div>
  </section>;
}
