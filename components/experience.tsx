"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  Briefcase,
  FileText,
  GraduationCap,
  ChevronRight,
  MapPin,
} from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";

export function Experience() {
  const { t } = useLanguage();
  const education = t.experience.education_list;
  const experience = t.experience.experience_list;
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const items = q(".timeline-item");
      const heading = q(".experience-heading")[0];
      const grid = q(".timeline-grid")[0];

      if (prefersReducedMotion()) {
        gsap.set([heading, items], { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        heading,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          immediateRender: false,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: heading,
            start: "top 85%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          immediateRender: false,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: grid,
            start: "top 82%",
            once: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      id="experience"
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="experience-heading mb-14 sm:mb-16 space-y-4">
          <h2 className="text-4xl font-black leading-[0.98] tracking-normal text-foreground sm:text-6xl lg:text-7xl">
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
              <div className="absolute bottom-4 left-[19px] top-0 w-px bg-border/40" />

              {education.map((edu: any, i: number) => (
                <div key={i} className="timeline-item group relative pl-16">
                  <div className="absolute left-0 top-1.5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background transition-all group-hover:border-primary/50">
                    <div className="h-2 w-2 rounded-full bg-border group-hover:bg-primary transition-colors" />
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
              <div className="absolute bottom-4 left-[19px] top-0 w-px bg-border/40" />

              {experience.map((exp: any, i: number) => (
                <div key={i} className="timeline-item group relative pl-16">
                  <div className="absolute left-0 top-1.5 z-10 flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background transition-all group-hover:border-primary/50">
                    <div className="h-2 w-2 rounded-full bg-border group-hover:bg-primary transition-colors" />
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
