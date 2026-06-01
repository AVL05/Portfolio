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

import { RevealHeader } from "@/components/reveal-header";

export function Experience() {
  const { t } = useLanguage();
  const education = t.experience.education_list;
  const experience = t.experience.experience_list;
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const items = q(".timeline-item");
      const grid = q(".timeline-grid")[0];

      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

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
            start: "top 85%",
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
      {/* Absolute BG Decor */}
      <div className="pointer-events-none absolute left-0 top-0 h-px w-full bg-border/50" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealHeader
          title={t.experience.title}
          subtitle={t.experience.subtitle}
          description={t.experience.desc}
        />

        <div className="timeline-grid grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-20">
          {/* Education */}
          <div className="space-y-14">
            <div className="flex items-center gap-6 group">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/70 bg-secondary text-primary transition-transform group-hover:scale-105">
                <GraduationCap className="h-7 w-7" />
              </div>
              <h3 className="text-3xl font-bold tracking-normal text-foreground">
                {t.experience.edu_title}
              </h3>
            </div>

            <div className="relative space-y-10">
              {/* Vertical line connection */}
              <div className="absolute bottom-4 left-[27px] top-4 w-px bg-border/35" />

              {education.map((edu, i) => (
                <div key={i} className="timeline-item group relative pl-20">
                  <div className="absolute left-0 top-2 z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background transition-colors group-hover:border-primary/50">
                    <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                        <h4 className="text-xl font-bold leading-tight tracking-normal text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                          {edu.title}
                        </h4>
                        <span className="w-fit shrink-0 rounded-xl border border-primary/10 bg-primary/5 px-3 py-1 font-mono text-[10px] text-primary/80">
                          {edu.period}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs font-mono uppercase tracking-widest">
                        <span className="text-foreground/70 font-bold">
                          {edu.institution}
                        </span>
                        <span className="opacity-30">•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {edu.location}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground/80 text-sm leading-relaxed font-medium">
                      {edu.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job Experience */}
          <div className="space-y-14">
            <div className="flex items-center gap-6 group">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-border/70 bg-secondary text-primary transition-transform group-hover:scale-105">
                <Briefcase className="h-7 w-7" />
              </div>
              <h3 className="text-3xl font-bold tracking-normal text-foreground">
                {t.experience.job_title}
              </h3>
            </div>

            <div className="relative space-y-10">
              {/* Vertical line connection */}
              <div className="absolute bottom-4 left-[27px] top-4 w-px bg-border/35" />

              {experience.map((exp, i) => (
                <div key={i} className="timeline-item group relative pl-20">
                  <div className="absolute left-0 top-2 z-10 flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-background transition-colors group-hover:border-primary/50">
                    <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                        <h4 className="text-xl font-bold leading-tight tracking-normal text-foreground transition-colors group-hover:text-primary sm:text-2xl">
                          {exp.title}
                        </h4>
                        <span className="w-fit shrink-0 rounded-xl border border-primary/10 bg-primary/5 px-3 py-1 font-mono text-[10px] text-primary/80">
                          {exp.period}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 text-muted-foreground text-xs font-mono uppercase tracking-widest">
                        <span className="text-foreground/70 font-bold">
                          {exp.company}
                        </span>
                        <span className="opacity-30">•</span>
                        <span className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" /> {exp.location}
                        </span>
                      </div>
                    </div>
                    <p className="text-muted-foreground/80 text-sm leading-relaxed font-medium">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="group mt-24 flex flex-col items-center justify-between gap-8 rounded-3xl border border-border/80 bg-card/68 p-6 transition-all hover:border-primary/30 hover:bg-card/84 sm:p-10 md:flex-row lg:gap-12 lg:p-14">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl font-bold tracking-normal text-foreground sm:text-3xl lg:text-4xl">
              {t.experience.cv_title}
            </h3>
            <p className="text-muted-foreground text-lg font-medium max-w-xl">
              {t.experience.cv_desc}
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-14 shrink-0 rounded-2xl bg-primary px-6 font-black text-primary-foreground shadow-2xl transition-all hover:-translate-y-0.5 hover:bg-white sm:h-16 sm:px-8"
          >
            <a
              href="/CV_Alex_Vicente_Lopez_Desarrollador_Web_Junior.pdf"
              download
              className="flex items-center gap-3"
            >
              <FileText className="h-6 w-6" />
              {t.experience.cv_btn}
              <ChevronRight className="h-5 w-5 opacity-50" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
