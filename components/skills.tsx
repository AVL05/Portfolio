'use client'

import { useRef } from 'react'
import {
  Globe,
  Database,
  PenTool,
  Layers,
  Camera,
  Video,
  Code2
} from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useLanguage } from '@/lib/language-context'
import {
  SiHtml5, SiCss, SiJavascript, SiReact,
  SiVuedotjs, SiTailwindcss, SiBootstrap,
  SiPhp, SiLaravel, SiMysql, SiElectron,
  SiGit, SiGithub
} from 'react-icons/si'
import { DiPhotoshop, DiIllustrator } from 'react-icons/di'

const skillCategories_es = [
  {
    title: 'Frontend Development',
    description: 'Construcción de interfaces modernas, adaptativas y altamente interactivas enfocadas en la experiencia de usuario.',
    icon: Globe,
    skills: [
      { name: 'HTML5', color: '#E34F26', icon: SiHtml5 },
      { name: 'CSS3', color: '#1572B6', icon: SiCss },
      { name: 'JavaScript', color: '#F7DF1E', icon: SiJavascript },
      { name: 'React', color: '#61DAFB', icon: SiReact },
      { name: 'Vue.js', color: '#4FC08D', icon: SiVuedotjs },
      { name: 'Tailwind CSS', color: '#06B6D4', icon: SiTailwindcss },
      { name: 'Bootstrap', color: '#7952B3', icon: SiBootstrap },
    ],
  },
  {
    title: 'Backend & Tools',
    description: 'Gestión de datos, lógica de servidor y herramientas de control de versiones para un flujo de trabajo eficiente.',
    icon: Database,
    skills: [
      { name: 'PHP / Laravel', color: '#FF2D20', icon: SiLaravel },
      { name: 'MySQL', color: '#4479A1', icon: SiMysql },
      { name: 'Electron', color: '#47848F', icon: SiElectron },
      { name: 'Git', color: '#F05032', icon: SiGit },
      { name: 'GitHub', color: '#181717', icon: SiGithub },
    ],
  },
  {
    title: 'Creative Tools (Hobby)',
    description: 'Edición de fotografía, diseño editorial y post-producción de vídeo como parte de mi visión creativa personal.',
    icon: PenTool,
    skills: [
      { name: 'Photoshop', color: '#31A8FF', icon: DiPhotoshop },
      { name: 'Illustrator', color: '#FF9A00', icon: DiIllustrator },
      { name: 'InDesign', color: '#FF3366', icon: Layers },
      { name: 'Lightroom', color: '#31A8FF', icon: Camera },
      { name: 'Premiere Pro', color: '#9999FF', icon: Video },
    ],
  }
]

const skillCategories_en = [
  {
    title: 'Frontend Development',
    description: 'Building modern, adaptive and highly interactive interfaces focused on user experience.',
    icon: Globe,
    skills: [
      { name: 'HTML5', color: '#E34F26', icon: SiHtml5 },
      { name: 'CSS3', color: '#1572B6', icon: SiCss },
      { name: 'JavaScript', color: '#F7DF1E', icon: SiJavascript },
      { name: 'React', color: '#61DAFB', icon: SiReact },
      { name: 'Vue.js', color: '#4FC08D', icon: SiVuedotjs },
      { name: 'Tailwind CSS', color: '#06B6D4', icon: SiTailwindcss },
      { name: 'Bootstrap', color: '#7952B3', icon: SiBootstrap },
    ],
  },
  {
    title: 'Backend & Tools',
    description: 'Data management, server logic and version control tools for an efficient workflow.',
    icon: Database,
    skills: [
      { name: 'PHP / Laravel', color: '#FF2D20', icon: SiLaravel },
      { name: 'MySQL', color: '#4479A1', icon: SiMysql },
      { name: 'Electron', color: '#47848F', icon: SiElectron },
      { name: 'Git', color: '#F05032', icon: SiGit },
      { name: 'GitHub', color: '#181717', icon: SiGithub },
    ],
  },
  {
    title: 'Creative Tools (Hobby)',
    description: 'Photo editing, editorial design and video post-production as part of my personal creative vision.',
    icon: PenTool,
    skills: [
      { name: 'Photoshop', color: '#31A8FF', icon: DiPhotoshop },
      { name: 'Illustrator', color: '#FF9A00', icon: DiIllustrator },
      { name: 'InDesign', color: '#FF3366', icon: Layers },
      { name: 'Lightroom', color: '#31A8FF', icon: Camera },
      { name: 'Premiere Pro', color: '#9999FF', icon: Video },
    ],
  }
]

export function Skills() {
  const { t, language } = useLanguage()
  const skillCategories = language === 'es' ? skillCategories_es : skillCategories_en
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef)

    gsap.fromTo(q('.skill-header'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    )

    gsap.fromTo(q('.category-card'),
      { opacity: 0, x: -50 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.3,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: q('.categories-grid'),
          start: 'top 85%',
        }
      }
    )
  }, { scope: containerRef })

  return (
    <section
      id="skills"
      ref={containerRef}
      className="section-padding bg-background relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="skill-header mb-32 space-y-6">
          <div className="flex items-center gap-4 text-primary font-mono text-sm tracking-[0.3em] uppercase">
            <span className="w-8 h-[1px] bg-primary/50" />
            {t.skills.title}
          </div>
          <h2 className="text-4xl sm:text-7xl font-black text-foreground tracking-tighter leading-none">
            {t.skills.subtitle}
          </h2>
          <p className="text-muted-foreground text-xl font-medium max-w-2xl text-balance">
            {t.skills.desc}
          </p>
        </header>

        <div className="categories-grid grid grid-cols-1 lg:grid-cols-3 gap-12">
          {skillCategories.map((cat, i) => (
            <div key={cat.title} className="category-card group">
              <div className="h-full dev-border p-10 rounded-[3rem] space-y-10 transition-all duration-700 hover:border-primary/20 hover:bg-secondary/20">
                <header className="space-y-6">
                  <div className="w-16 h-16 rounded-2xl bg-secondary flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <cat.icon className="h-8 w-8" />
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold text-foreground tracking-tight">{cat.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-medium">
                      {cat.description}
                    </p>
                  </div>
                </header>

                <div className="grid grid-cols-2 gap-x-4 gap-y-6 pt-4 border-t border-border">
                  {cat.skills.map(skill => (
                    <div key={skill.name} className="flex items-center gap-4 group/skill">
                      <div className="relative">
                        <skill.icon
                          className="h-5 w-5 text-muted-foreground/40 group-hover/skill:text-primary transition-colors"
                          style={{ fill: 'currentColor' }}
                        />
                      </div>
                      <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground/60 group-hover/skill:text-foreground transition-colors">
                        {skill.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
