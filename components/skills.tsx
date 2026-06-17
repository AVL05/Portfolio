"use client";

import { useRef } from "react";
import {
  Globe,
  Database,
  PenTool,
} from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiReact,
  SiVuedotjs,
  SiTailwindcss,
  SiBootstrap,
  SiLaravel,
  SiMysql,
  SiElectron,
  SiGit,
  SiGithub,
} from "react-icons/si";
import { DiPhotoshop, DiIllustrator } from "react-icons/di";

const allSkills = [
  { name: "HTML5", icon: SiHtml5 },
  { name: "CSS3", icon: SiCss },
  { name: "JavaScript", icon: SiJavascript },
  { name: "React", icon: SiReact },
  { name: "Vue.js", icon: SiVuedotjs },
  { name: "Tailwind CSS", icon: SiTailwindcss },
  { name: "Bootstrap", icon: SiBootstrap },
  { name: "Laravel", icon: SiLaravel },
  { name: "MySQL", icon: SiMysql },
  { name: "Electron", icon: SiElectron },
  { name: "Git", icon: SiGit },
  { name: "GitHub", icon: SiGithub },
  { name: "Photoshop", icon: DiPhotoshop },
  { name: "Illustrator", icon: DiIllustrator },
];

const skillCategories_es = [
  {
    title: "Frontend Development",
    description:
      "Interfaces modernas, adaptativas y altamente interactivas enfocadas en la experiencia de usuario.",
    icon: Globe,
    accent: "primary",
    skills: [
      { name: "HTML5", url: "https://developer.mozilla.org/es/docs/Web/HTML", icon: SiHtml5 },
      { name: "CSS3", url: "https://developer.mozilla.org/es/docs/Web/CSS", icon: SiCss },
      { name: "JavaScript", url: "https://developer.mozilla.org/es/docs/Web/JavaScript", icon: SiJavascript },
      { name: "React", url: "https://react.dev/", icon: SiReact },
      { name: "Vue.js", url: "https://vuejs.org/", icon: SiVuedotjs },
      { name: "Tailwind CSS", url: "https://tailwindcss.com/", icon: SiTailwindcss },
      { name: "Bootstrap", url: "https://getbootstrap.com/", icon: SiBootstrap },
    ],
  },
  {
    title: "Backend & Tools",
    description:
      "Gestión de datos, lógica de servidor y control de versiones.",
    icon: Database,
    accent: "accent",
    skills: [
      { name: "PHP / Laravel", url: "https://laravel.com/", icon: SiLaravel },
      { name: "MySQL", url: "https://www.mysql.com/", icon: SiMysql },
      { name: "Electron", url: "https://www.electronjs.org/", icon: SiElectron },
      { name: "Git", url: "https://git-scm.com/", icon: SiGit },
      { name: "GitHub", url: "https://github.com/", icon: SiGithub },
    ],
  },
  {
    title: "Creative Tools",
    description:
      "Edición de fotografía, diseño editorial y post-producción de vídeo.",
    icon: PenTool,
    accent: "muted",
    skills: [
      { name: "Photoshop", url: "https://www.adobe.com/es/products/photoshop.html", icon: DiPhotoshop },
      { name: "Illustrator", url: "https://www.adobe.com/es/products/illustrator.html", icon: DiIllustrator },
      { name: "InDesign", url: "https://www.adobe.com/es/products/indesign.html", icon: PenTool },
    ],
  },
];

const skillCategories_en = [
  {
    title: "Frontend Development",
    description:
      "Modern, adaptive and interactive interfaces focused on user experience.",
    icon: Globe,
    accent: "primary",
    skills: [
      { name: "HTML5", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", icon: SiHtml5 },
      { name: "CSS3", url: "https://developer.mozilla.org/en-US/docs/Web/CSS", icon: SiCss },
      { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: SiJavascript },
      { name: "React", url: "https://react.dev/", icon: SiReact },
      { name: "Vue.js", url: "https://vuejs.org/", icon: SiVuedotjs },
      { name: "Tailwind CSS", url: "https://tailwindcss.com/", icon: SiTailwindcss },
      { name: "Bootstrap", url: "https://getbootstrap.com/", icon: SiBootstrap },
    ],
  },
  {
    title: "Backend & Tools",
    description:
      "Data management, server logic and version control.",
    icon: Database,
    accent: "accent",
    skills: [
      { name: "PHP / Laravel", url: "https://laravel.com/", icon: SiLaravel },
      { name: "MySQL", url: "https://www.mysql.com/", icon: SiMysql },
      { name: "Electron", url: "https://www.electronjs.org/", icon: SiElectron },
      { name: "Git", url: "https://git-scm.com/", icon: SiGit },
      { name: "GitHub", url: "https://github.com/", icon: SiGithub },
    ],
  },
  {
    title: "Creative Tools",
    description:
      "Photo editing, editorial design and video post-production.",
    icon: PenTool,
    accent: "muted",
    skills: [
      { name: "Photoshop", url: "https://www.adobe.com/products/photoshop.html", icon: DiPhotoshop },
      { name: "Illustrator", url: "https://www.adobe.com/products/illustrator.html", icon: DiIllustrator },
      { name: "InDesign", url: "https://www.adobe.com/products/indesign.html", icon: PenTool },
    ],
  },
];

function SkillMarquee() {
  const doubled = [...allSkills, ...allSkills];
  return (
    <div className="relative mb-14 overflow-hidden py-3">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-20 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-20 bg-linear-to-l from-background to-transparent" />
      <div className="flex animate-marquee whitespace-nowrap" style={{ willChange: "transform" }}>
        {doubled.map((skill, i) => (
          <div
            key={i}
            className="mx-4 inline-flex shrink-0 items-center gap-2.5 rounded-xl border border-border/60 bg-card/55 px-4 py-2.5 backdrop-blur"
          >
            <skill.icon className="h-4 w-4 text-muted-foreground" style={{ fill: "currentColor" }} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground">
              {skill.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillItem({ skill }: { skill: { name: string; url: string; icon: any } }) {
  return (
    <a
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group/skill flex min-w-0 items-center gap-3 rounded-xl outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
    >
      <div className="rounded-xl border border-border/60 bg-secondary/70 p-2 transition-all group-hover/skill:border-primary/30 group-hover/skill:bg-primary/10">
        <skill.icon
          className="h-4 w-4 text-muted-foreground group-hover/skill:text-primary transition-colors"
          style={{ fill: "currentColor" }}
        />
      </div>
      <span className="truncate text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground group-hover/skill:text-foreground transition-colors">
        {skill.name}
      </span>
    </a>
  );
}

export function Skills() {
  const { t, language } = useLanguage();
  const skillCategories = language === "es" ? skillCategories_es : skillCategories_en;
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const cards = q(".category-card");
      const grid = q(".categories-grid")[0];
      const heading = q(".skills-heading")[0];

      if (prefersReducedMotion()) {
        gsap.set([heading, cards], { opacity: 1, y: 0, x: 0 });
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
        cards,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          immediateRender: false,
          stagger: 0.12,
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

  const [frontend, backend, creative] = skillCategories;

  return (
    <section
      id="skills"
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="skills-heading mb-14 sm:mb-16 space-y-4">
          <h2 className="text-4xl font-black leading-[0.98] tracking-normal text-foreground sm:text-6xl lg:text-7xl">
            {t.skills.subtitle}
          </h2>
          <p className="max-w-2xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
            {t.skills.desc}
          </p>
        </div>

        <SkillMarquee />

        <div className="categories-grid grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Frontend - large */}
          <div className="category-card lg:col-span-7 group h-full">
            <div className="premium-card relative h-full space-y-6 overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-primary via-primary/60 to-transparent" />
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-primary/20 bg-primary/10 text-primary">
                  <frontend.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black tracking-normal text-foreground group-hover:text-primary transition-colors sm:text-xl">
                  {frontend.title}
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                {frontend.description}
              </p>
              <div className="grid grid-cols-2 gap-3 border-t border-border/50 pt-5 sm:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3">
                {frontend.skills.map((skill) => (
                  <SkillItem key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          </div>

          {/* Backend - medium */}
          <div className="category-card lg:col-span-5 group h-full">
            <div className="premium-card relative h-full space-y-6 overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-accent via-accent/60 to-transparent" />
              <div className="flex items-center gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-accent/20 bg-accent/10 text-accent">
                  <backend.icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-black tracking-normal text-foreground group-hover:text-primary transition-colors sm:text-xl">
                  {backend.title}
                </h3>
              </div>
              <p className="text-sm font-medium leading-relaxed text-muted-foreground">
                {backend.description}
              </p>
              <div className="grid grid-cols-1 gap-3 border-t border-border/50 pt-5 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                {backend.skills.map((skill) => (
                  <SkillItem key={skill.name} skill={skill} />
                ))}
              </div>
            </div>
          </div>

          {/* Creative - full width, horizontal */}
          <div className="category-card lg:col-span-12 group">
            <div className="premium-card relative overflow-hidden p-6 sm:p-8">
              <div className="absolute inset-x-0 top-0 h-0.5 bg-linear-to-r from-muted-foreground/40 via-muted-foreground/20 to-transparent" />
              <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:gap-10">
                <div className="flex items-center gap-4 shrink-0">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border/60 bg-secondary text-muted-foreground">
                    <creative.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-black tracking-normal text-foreground sm:text-xl">
                      {creative.title}
                    </h3>
                    <p className="text-xs font-medium text-muted-foreground mt-0.5">
                      {language === "es" ? "Hobby" : "Hobby"}
                    </p>
                  </div>
                </div>
                <p className="text-sm font-medium leading-relaxed text-muted-foreground lg:max-w-xs xl:max-w-sm">
                  {creative.description}
                </p>
                <div className="flex flex-wrap gap-3 border-t border-border/50 pt-5 lg:border-t-0 lg:border-l lg:pl-10 lg:pt-0">
                  {creative.skills.map((skill) => (
                    <SkillItem key={skill.name} skill={skill} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
