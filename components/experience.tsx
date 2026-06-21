"use client";

import { Button } from "@/components/ui/button";
import {
  Briefcase,
  FileText,
  GraduationCap,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { useLanguage } from "@/lib/language-context";

export function Experience() {
  const { t } = useLanguage();
  const education = t.experience.education_list;
  const experience = t.experience.experience_list;

  return (
    <section
      id="experience"
      className="section-padding relative overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 glow-divider" />
      <div className="pointer-events-none absolute left-[10%] top-[30%] h-[32rem] w-[32rem] rounded-full bg-primary/5 blur-[110px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="experience-heading mb-14 sm:mb-16 space-y-5">
          <h2 className="text-4xl font-black leading-[0.94] tracking-normal text-foreground sm:text-6xl lg:text-7xl xl:text-8xl">
            {t.experience.subtitle}
          </h2>
          <p className="max-w-2xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
            {t.experience.desc}
          </p>
        </div>

        <div className="timeline-grid grid grid-cols-1 gap-14 lg:grid-cols-2 lg:gap-18">
          {/* Education */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/70 bg-secondary text-primary">
                <GraduationCap className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold tracking-normal text-foreground">
                {t.experience.edu_title}
              </h3>
            </div>

            <div className="relative space-y-10">
              <div className="timeline-line absolute bottom-4 left-[19px] top-0 w-px" style={{ background: "linear-gradient(to bottom, oklch(from var(--primary) l c h / 0.55), oklch(from var(--border) l c h / 0.35) 45%, oklch(from var(--border) l c h / 0.08))" }} />

              {education.map((edu: any, i: number) => (
                <div key={i} className="timeline-item group relative pl-16">
                  <div className="absolute left-0 top-1.5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-[0_0_16px_-4px_oklch(from_var(--primary)_l_c_h_/_0.4)]">
                    <div className="h-2.5 w-2.5 rounded-full bg-border/60 ring-1 ring-border/30 transition-all duration-300 group-hover:bg-primary group-hover:ring-primary/40 group-hover:shadow-[0_0_8px_oklch(from_var(--primary)_l_c_h_/_0.6)]" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                      <h4 className="text-lg font-bold leading-tight tracking-normal text-foreground transition-colors group-hover:text-primary sm:text-xl">
                        {edu.title}
                      </h4>
                      <span className="w-fit shrink-0 rounded-lg border border-primary/15 bg-primary/6 px-2.5 py-0.5 font-mono text-[10px] text-primary/75">
                        {edu.period}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs font-mono uppercase tracking-widest">
                      <span className="text-foreground/70 font-bold">{edu.institution}</span>
                      <span className="opacity-30">|</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {edu.location}
                      </span>
                    </div>
                    <p className="text-muted-foreground/80 text-sm leading-relaxed">
                      {edu.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience */}
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border/70 bg-secondary text-primary">
                <Briefcase className="h-6 w-6" />
              </div>
              <h3 className="text-2xl font-bold tracking-normal text-foreground">
                {t.experience.job_title}
              </h3>
            </div>

            <div className="relative space-y-10">
              <div className="timeline-line absolute bottom-4 left-[19px] top-0 w-px" style={{ background: "linear-gradient(to bottom, oklch(from var(--primary) l c h / 0.55), oklch(from var(--border) l c h / 0.35) 45%, oklch(from var(--border) l c h / 0.08))" }} />

              {experience.map((exp: any, i: number) => (
                <div key={i} className="timeline-item group relative pl-16">
                  <div className="absolute left-0 top-1.5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border/60 bg-background transition-all duration-300 group-hover:border-primary/60 group-hover:shadow-[0_0_16px_-4px_oklch(from_var(--primary)_l_c_h_/_0.4)]">
                    <div className="h-2.5 w-2.5 rounded-full bg-border/60 ring-1 ring-border/30 transition-all duration-300 group-hover:bg-primary group-hover:ring-primary/40 group-hover:shadow-[0_0_8px_oklch(from_var(--primary)_l_c_h_/_0.6)]" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-4">
                      <h4 className="text-lg font-bold leading-tight tracking-normal text-foreground transition-colors group-hover:text-primary sm:text-xl">
                        {exp.title}
                      </h4>
                      <span className="w-fit shrink-0 rounded-lg border border-primary/15 bg-primary/6 px-2.5 py-0.5 font-mono text-[10px] text-primary/75">
                        {exp.period}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs font-mono uppercase tracking-widest">
                      <span className="text-foreground/70 font-bold">{exp.company}</span>
                      <span className="opacity-30">|</span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" /> {exp.location}
                      </span>
                    </div>
                    <p className="text-muted-foreground/80 text-sm leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="dev-panel mt-20 flex flex-col items-center justify-between gap-8 p-6 transition-all hover:border-primary/30 sm:p-10 md:flex-row lg:gap-12 lg:p-12">
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl font-bold tracking-normal text-foreground sm:text-3xl">
              {t.experience.cv_title}
            </h3>
            <p className="text-muted-foreground font-medium max-w-lg">
              {t.experience.cv_desc}
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-13 shrink-0 rounded-xl bg-primary px-7 font-bold text-primary-foreground shadow-xl transition-all hover:-translate-y-0.5 hover:bg-primary/90 sm:h-14 sm:px-8"
          >
            <a
              href="/CV_Alex_Vicente_Lopez_Desarrollador_Web_Junior.pdf"
              download
              className="flex items-center gap-3"
            >
              <FileText className="h-5 w-5" />
              {t.experience.cv_btn}
              <ChevronRight className="h-4 w-4 opacity-50" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
