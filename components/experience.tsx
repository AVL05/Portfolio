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
      className="section-padding bg-background relative overflow-hidden"
    >
      {/* Absolute BG Decor */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-border/50 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealHeader
          title={t.experience.title}
          subtitle={t.experience.subtitle}
          description={t.experience.desc}
        />

        <div className="timeline-grid grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20">
          {/* Education */}
          <div className="space-y-16">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <GraduationCap className="h-7 w-7" />
              </div>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">
                {t.experience.edu_title}
              </h3>
            </div>

            <div className="space-y-12 relative">
              {/* Vertical line connection */}
              <div className="absolute left-[27px] top-4 bottom-4 w-[1px] bg-border/30" />

              {education.map((edu, i) => (
                <div key={i} className="timeline-item relative pl-20 group">
                  <div className="absolute left-0 top-2 w-14 h-14 bg-background border border-border rounded-xl flex items-center justify-center z-10 group-hover:border-primary/50 transition-colors">
                    <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                        <h4 className="text-xl sm:text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                          {edu.title}
                        </h4>
                        <span className="w-fit shrink-0 text-[10px] font-mono text-primary/70 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
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
          <div className="space-y-16">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Briefcase className="h-7 w-7" />
              </div>
              <h3 className="text-3xl font-bold text-foreground tracking-tight">
                {t.experience.job_title}
              </h3>
            </div>

            <div className="space-y-12 relative">
              {/* Vertical line connection */}
              <div className="absolute left-[27px] top-4 bottom-4 w-[1px] bg-border/30" />

              {experience.map((exp, i) => (
                <div key={i} className="timeline-item relative pl-20 group">
                  <div className="absolute left-0 top-2 w-14 h-14 bg-background border border-border rounded-xl flex items-center justify-center z-10 group-hover:border-primary/50 transition-colors">
                    <span className="text-xs font-mono text-muted-foreground group-hover:text-primary transition-colors">
                      0{i + 1}
                    </span>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
                        <h4 className="text-xl sm:text-2xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                          {exp.title}
                        </h4>
                        <span className="w-fit shrink-0 text-[10px] font-mono text-primary/70 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">
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

        <div className="mt-24 p-6 sm:p-10 lg:p-14 dev-border rounded-2xl bg-card/60 flex flex-col md:flex-row items-center justify-between gap-8 lg:gap-12 group hover:bg-card/80 transition-all">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground tracking-tight">
              {t.experience.cv_title}
            </h3>
            <p className="text-muted-foreground text-lg font-medium max-w-xl">
              {t.experience.cv_desc}
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="h-14 sm:h-16 px-6 sm:px-8 bg-primary text-primary-foreground font-black hover:bg-white rounded-xl transition-all shadow-2xl shrink-0"
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
