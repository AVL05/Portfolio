"use client";

import { useRef } from "react";
import {
  Globe,
  Database,
  PenTool,
} from "lucide-react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import { TiltCard } from "@/components/tilt-card";
import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
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
  { name: "TypeScript", icon: SiTypescript },
  { name: "React", icon: SiReact },
  { name: "Next.js", icon: SiNextdotjs },
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
    description: "Interfaces modernas, adaptativas y altamente interactivas enfocadas en la experiencia de usuario.",
    icon: Globe,
    accent: "primary",
    skills: [
      { name: "HTML5", url: "https://developer.mozilla.org/es/docs/Web/HTML", icon: SiHtml5 },
      { name: "CSS3", url: "https://developer.mozilla.org/es/docs/Web/CSS", icon: SiCss },
      { name: "JavaScript", url: "https://developer.mozilla.org/es/docs/Web/JavaScript", icon: SiJavascript },
      { name: "TypeScript", url: "https://www.typescriptlang.org/", icon: SiTypescript },
      { name: "React", url: "https://react.dev/", icon: SiReact },
      { name: "Next.js", url: "https://nextjs.org/", icon: SiNextdotjs },
      { name: "Vue.js", url: "https://vuejs.org/", icon: SiVuedotjs },
      { name: "Tailwind CSS", url: "https://tailwindcss.com/", icon: SiTailwindcss },
      { name: "Bootstrap", url: "https://getbootstrap.com/", icon: SiBootstrap },
    ],
  },
  {
    title: "Backend & Tools",
    description: "Gestión de datos, lógica de servidor y control de versiones.",
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
    description: "Edición de fotografía, diseño editorial y post-producción de vídeo.",
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
    description: "Modern, adaptive and interactive interfaces focused on user experience.",
    icon: Globe,
    accent: "primary",
    skills: [
      { name: "HTML5", url: "https://developer.mozilla.org/en-US/docs/Web/HTML", icon: SiHtml5 },
      { name: "CSS3", url: "https://developer.mozilla.org/en-US/docs/Web/CSS", icon: SiCss },
      { name: "JavaScript", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript", icon: SiJavascript },
      { name: "TypeScript", url: "https://www.typescriptlang.org/", icon: SiTypescript },
      { name: "React", url: "https://react.dev/", icon: SiReact },
      { name: "Next.js", url: "https://nextjs.org/", icon: SiNextdotjs },
      { name: "Vue.js", url: "https://vuejs.org/", icon: SiVuedotjs },
      { name: "Tailwind CSS", url: "https://tailwindcss.com/", icon: SiTailwindcss },
      { name: "Bootstrap", url: "https://getbootstrap.com/", icon: SiBootstrap },
    ],
  },
  {
    title: "Backend & Tools",
    description: "Data management, server logic and version control.",
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
    description: "Photo editing, editorial design and video post-production.",
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
    <div className="relative mb-16 overflow-hidden py-4">
      <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-32 bg-linear-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-32 bg-linear-to-l from-background to-transparent" />
      <div className="flex animate-marquee whitespace-nowrap" style={{ willChange: "transform" }}>
        {doubled.map((skill, i) => (
          <div
            key={i}
            className="mx-3 inline-flex shrink-0 items-center gap-2.5 rounded-xl border border-border/50 bg-card/60 px-4 py-3 backdrop-blur-sm transition-colors hover:border-primary/30 hover:bg-primary/5"
          >
            <skill.icon className="h-4 w-4 text-muted-foreground/70" style={{ fill: "currentColor" }} />
            <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground/70">
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
  const [frontend, backend, creative] = skillCategories;
  const containerRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const words = q(".sk-word");
      const cards = q(".sk-card");

      if (prefersReducedMotion()) {
        gsap.set([words, cards, q(".sk-desc")], { autoAlpha: 1, y: 0, scale: 1 });
        return;
      }

      gsap
        .timeline({
          scrollTrigger: { trigger: containerRef.current, start: "top 78%", once: true },
        })
        .fromTo(
          words,
          { yPercent: 115, autoAlpha: 0 },
          { yPercent: 0, autoAlpha: 1, duration: 0.9, ease: "expo.out", stagger: 0.07 },
        )
        .fromTo(
          q(".sk-desc"),
          { autoAlpha: 0, y: 16 },
          { autoAlpha: 1, y: 0, duration: 0.6, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          cards,
          { autoAlpha: 0, y: 64, scale: 0.94 },
          {
            autoAlpha: 1,
            y: 0,
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.13,
          },
          "-=0.35",
        );
    },
    { scope: containerRef },
  );

  return (
    <section
      id="skills"
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-background section-alt-bg"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 glow-divider" />
      <div className="pointer-events-none absolute right-[8%] top-[15%] h-[30rem] w-[30rem] rounded-full bg-accent/5 blur-[100px]" />
      <div className="pointer-events-none absolute left-[5%] bottom-[15%] h-[24rem] w-[24rem] rounded-full bg-primary/6 blur-[80px]" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-14 sm:mb-16 space-y-5">
          <h2
            className="text-4xl font-black leading-[0.94] tracking-normal text-foreground sm:text-6xl lg:text-7xl xl:text-8xl"
            aria-label={t.skills.subtitle}
          >
            {t.skills.subtitle.split(" ").map((word, i) => (
              <span
                key={i}
                className="mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom"
              >
                <span className="sk-word inline-block">{word}</span>
              </span>
            ))}
          </h2>
          <p className="sk-desc max-w-2xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
            {t.skills.desc}
          </p>
        </div>

        <SkillMarquee />

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:gap-6">
          {/* Frontend - large */}
          <div className="sk-card lg:col-span-7 group h-full">
            <TiltCard className="premium-card relative h-full space-y-6 overflow-hidden p-6 sm:p-8">
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
            </TiltCard>
          </div>

          {/* Backend - medium */}
          <div className="sk-card lg:col-span-5 group h-full">
            <TiltCard className="premium-card relative h-full space-y-6 overflow-hidden p-6 sm:p-8">
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
            </TiltCard>
          </div>

          {/* Creative - full width */}
          <div className="sk-card lg:col-span-12 group">
            <TiltCard max={3} className="premium-card relative overflow-hidden p-6 sm:p-8">
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
                    <p className="text-xs font-medium text-muted-foreground mt-0.5">Hobby</p>
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
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}
