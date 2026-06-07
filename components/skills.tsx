"use client";

import { useRef } from "react";
import {
  Globe,
  Database,
  PenTool,
  Layers,
  Camera,
  Video,
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

const skillCategories_es = [
  {
    title: "Frontend Development",
    description:
      "Construcción de interfaces modernas, adaptativas y altamente interactivas enfocadas en la experiencia de usuario.",
    icon: Globe,
    skills: [
      {
        name: "HTML5",
        url: "https://developer.mozilla.org/es/docs/Web/HTML",
        icon: SiHtml5,
      },
      {
        name: "CSS3",
        url: "https://developer.mozilla.org/es/docs/Web/CSS",
        icon: SiCss,
      },
      {
        name: "JavaScript",
        url: "https://developer.mozilla.org/es/docs/Web/JavaScript",
        icon: SiJavascript,
      },
      { name: "React", url: "https://react.dev/", icon: SiReact },
      { name: "Vue.js", url: "https://vuejs.org/", icon: SiVuedotjs },
      {
        name: "Tailwind CSS",
        url: "https://tailwindcss.com/",
        icon: SiTailwindcss,
      },
      {
        name: "Bootstrap",
        url: "https://getbootstrap.com/",
        icon: SiBootstrap,
      },
    ],
  },
  {
    title: "Backend & Tools",
    description:
      "Gestión de datos, lógica de servidor y herramientas de control de versiones para un flujo de trabajo eficiente.",
    icon: Database,
    skills: [
      { name: "PHP / Laravel", url: "https://laravel.com/", icon: SiLaravel },
      { name: "MySQL", url: "https://www.mysql.com/", icon: SiMysql },
      {
        name: "Electron",
        url: "https://www.electronjs.org/",
        icon: SiElectron,
      },
      { name: "Git", url: "https://git-scm.com/", icon: SiGit },
      { name: "GitHub", url: "https://github.com/", icon: SiGithub },
    ],
  },
  {
    title: "Creative Tools (Hobby)",
    description:
      "Edición de fotografía, diseño editorial y post-producción de vídeo como parte de mi visión creativa personal.",
    icon: PenTool,
    skills: [
      {
        name: "Photoshop",
        url: "https://www.adobe.com/es/products/photoshop.html",
        icon: DiPhotoshop,
      },
      {
        name: "Illustrator",
        url: "https://www.adobe.com/es/products/illustrator.html",
        icon: DiIllustrator,
      },
      {
        name: "InDesign",
        url: "https://www.adobe.com/es/products/indesign.html",
        icon: Layers,
      },
      {
        name: "Lightroom",
        url: "https://www.adobe.com/es/products/photoshop-lightroom.html",
        icon: Camera,
      },
      {
        name: "Premiere Pro",
        url: "https://www.adobe.com/es/products/premiere.html",
        icon: Video,
      },
    ],
  },
];

const skillCategories_en = [
  {
    title: "Frontend Development",
    description:
      "Building modern, adaptive and highly interactive interfaces focused on user experience.",
    icon: Globe,
    skills: [
      {
        name: "HTML5",
        url: "https://developer.mozilla.org/en-US/docs/Web/HTML",
        icon: SiHtml5,
      },
      {
        name: "CSS3",
        url: "https://developer.mozilla.org/en-US/docs/Web/CSS",
        icon: SiCss,
      },
      {
        name: "JavaScript",
        url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
        icon: SiJavascript,
      },
      { name: "React", url: "https://react.dev/", icon: SiReact },
      { name: "Vue.js", url: "https://vuejs.org/", icon: SiVuedotjs },
      {
        name: "Tailwind CSS",
        url: "https://tailwindcss.com/",
        icon: SiTailwindcss,
      },
      {
        name: "Bootstrap",
        url: "https://getbootstrap.com/",
        icon: SiBootstrap,
      },
    ],
  },
  {
    title: "Backend & Tools",
    description:
      "Data management, server logic and version control tools for an efficient workflow.",
    icon: Database,
    skills: [
      { name: "PHP / Laravel", url: "https://laravel.com/", icon: SiLaravel },
      { name: "MySQL", url: "https://www.mysql.com/", icon: SiMysql },
      {
        name: "Electron",
        url: "https://www.electronjs.org/",
        icon: SiElectron,
      },
      { name: "Git", url: "https://git-scm.com/", icon: SiGit },
      { name: "GitHub", url: "https://github.com/", icon: SiGithub },
    ],
  },
  {
    title: "Creative Tools (Hobby)",
    description:
      "Photo editing, editorial design and video post-production as part of my personal creative vision.",
    icon: PenTool,
    skills: [
      {
        name: "Photoshop",
        url: "https://www.adobe.com/products/photoshop.html",
        icon: DiPhotoshop,
      },
      {
        name: "Illustrator",
        url: "https://www.adobe.com/products/illustrator.html",
        icon: DiIllustrator,
      },
      {
        name: "InDesign",
        url: "https://www.adobe.com/products/indesign.html",
        icon: Layers,
      },
      {
        name: "Lightroom",
        url: "https://www.adobe.com/products/photoshop-lightroom.html",
        icon: Camera,
      },
      {
        name: "Premiere Pro",
        url: "https://www.adobe.com/products/premiere.html",
        icon: Video,
      },
    ],
  },
];

import { RevealHeader } from "@/components/reveal-header";

export function Skills() {
  const { t, language } = useLanguage();
  const skillCategories =
    language === "es" ? skillCategories_es : skillCategories_en;
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const cards = q(".category-card");
      const grid = q(".categories-grid")[0];

      if (prefersReducedMotion()) {
        gsap.set(cards, { opacity: 1, x: 0 });
        return;
      }

      gsap.fromTo(
        cards,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          immediateRender: false,
          stagger: 0.15,
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
      id="skills"
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-background"
    >
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-linear-to-r from-transparent via-accent/25 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <RevealHeader
          title={t.skills.title}
          subtitle={t.skills.subtitle}
          description={t.skills.desc}
        />

        <div className="categories-grid grid grid-cols-1 gap-6 lg:grid-cols-3 lg:gap-8">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="category-card group h-full">
              <div className="premium-card relative h-full space-y-8 overflow-hidden p-6 transition-all duration-300 transform-gpu [transform-style:preserve-3d] group-hover:[transform:perspective(1000px)_rotateX(1.8deg)_translateY(-6px)] sm:p-8">
                <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-primary/70 via-accent/60 to-transparent" />
                <div className="relative z-10 space-y-7">
                  <div className="flex items-center gap-4 group/header">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-primary/20 bg-primary/12 text-primary">
                      <cat.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-xl font-black leading-tight tracking-normal text-foreground transition-colors group-hover/header:text-primary sm:text-2xl">
                      {cat.title}
                    </h3>
                  </div>

                  <p className="min-h-12 text-sm font-medium leading-relaxed text-muted-foreground">
                    {cat.description}
                  </p>

                  <div className="grid grid-cols-1 gap-x-4 gap-y-4 border-t border-border/60 pt-7 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
                    {cat.skills.map((skill) => (
                      <a
                        key={skill.name}
                        href={skill.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/skill flex min-w-0 cursor-pointer items-center gap-3 rounded-xl outline-none transition-all focus-visible:ring-2 focus-visible:ring-primary/50"
                      >
                        <div className="rounded-xl border border-border/60 bg-secondary/70 p-2 transition-all group-hover/skill:border-primary/30 group-hover/skill:bg-primary/15">
                          <skill.icon
                            className="h-4 w-4 text-muted-foreground group-hover/skill:text-primary transition-colors"
                            style={{ fill: "currentColor" }}
                          />
                        </div>
                        <span className="truncate text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground group-hover/skill:text-foreground transition-colors">
                          {skill.name}
                        </span>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
