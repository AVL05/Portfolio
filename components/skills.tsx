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
      { name: 'HTML5', url: 'https://developer.mozilla.org/es/docs/Web/HTML', icon: SiHtml5 },
      { name: 'CSS3', url: 'https://developer.mozilla.org/es/docs/Web/CSS', icon: SiCss },
      { name: 'JavaScript', url: 'https://developer.mozilla.org/es/docs/Web/JavaScript', icon: SiJavascript },
      { name: 'React', url: 'https://react.dev/', icon: SiReact },
      { name: 'Vue.js', url: 'https://vuejs.org/', icon: SiVuedotjs },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com/', icon: SiTailwindcss },
      { name: 'Bootstrap', url: 'https://getbootstrap.com/', icon: SiBootstrap },
    ],
  },
  {
    title: 'Backend & Tools',
    description: 'Gestión de datos, lógica de servidor y herramientas de control de versiones para un flujo de trabajo eficiente.',
    icon: Database,
    skills: [
      { name: 'PHP / Laravel', url: 'https://laravel.com/', icon: SiLaravel },
      { name: 'MySQL', url: 'https://www.mysql.com/', icon: SiMysql },
      { name: 'Electron', url: 'https://www.electronjs.org/', icon: SiElectron },
      { name: 'Git', url: 'https://git-scm.com/', icon: SiGit },
      { name: 'GitHub', url: 'https://github.com/', icon: SiGithub },
    ],
  },
  {
    title: 'Creative Tools (Hobby)',
    description: 'Edición de fotografía, diseño editorial y post-producción de vídeo como parte de mi visión creativa personal.',
    icon: PenTool,
    skills: [
      { name: 'Photoshop', url: 'https://www.adobe.com/es/products/photoshop.html', icon: DiPhotoshop },
      { name: 'Illustrator', url: 'https://www.adobe.com/es/products/illustrator.html', icon: DiIllustrator },
      { name: 'InDesign', url: 'https://www.adobe.com/es/products/indesign.html', icon: Layers },
      { name: 'Lightroom', url: 'https://www.adobe.com/es/products/photoshop-lightroom.html', icon: Camera },
      { name: 'Premiere Pro', url: 'https://www.adobe.com/es/products/premiere.html', icon: Video },
    ],
  }
]

const skillCategories_en = [
  {
    title: 'Frontend Development',
    description: 'Building modern, adaptive and highly interactive interfaces focused on user experience.',
    icon: Globe,
    skills: [
      { name: 'HTML5', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML', icon: SiHtml5 },
      { name: 'CSS3', url: 'https://developer.mozilla.org/en-US/docs/Web/CSS', icon: SiCss },
      { name: 'JavaScript', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript', icon: SiJavascript },
      { name: 'React', url: 'https://react.dev/', icon: SiReact },
      { name: 'Vue.js', url: 'https://vuejs.org/', icon: SiVuedotjs },
      { name: 'Tailwind CSS', url: 'https://tailwindcss.com/', icon: SiTailwindcss },
      { name: 'Bootstrap', url: 'https://getbootstrap.com/', icon: SiBootstrap },
    ],
  },
  {
    title: 'Backend & Tools',
    description: 'Data management, server logic and version control tools for an efficient workflow.',
    icon: Database,
    skills: [
      { name: 'PHP / Laravel', url: 'https://laravel.com/', icon: SiLaravel },
      { name: 'MySQL', url: 'https://www.mysql.com/', icon: SiMysql },
      { name: 'Electron', url: 'https://www.electronjs.org/', icon: SiElectron },
      { name: 'Git', url: 'https://git-scm.com/', icon: SiGit },
      { name: 'GitHub', url: 'https://github.com/', icon: SiGithub },
    ],
  },
  {
    title: 'Creative Tools (Hobby)',
    description: 'Photo editing, editorial design and video post-production as part of my personal creative vision.',
    icon: PenTool,
    skills: [
      { name: 'Photoshop', url: 'https://www.adobe.com/products/photoshop.html', icon: DiPhotoshop },
      { name: 'Illustrator', url: 'https://www.adobe.com/products/illustrator.html', icon: DiIllustrator },
      { name: 'InDesign', url: 'https://www.adobe.com/products/indesign.html', icon: Layers },
      { name: 'Lightroom', url: 'https://www.adobe.com/products/photoshop-lightroom.html', icon: Camera },
      { name: 'Premiere Pro', url: 'https://www.adobe.com/products/premiere.html', icon: Video },
    ],
  }
]

import { RevealHeader } from '@/components/reveal-header'


export function Skills() {
  const { t, language } = useLanguage()
  const skillCategories = language === 'es' ? skillCategories_es : skillCategories_en
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef)

    gsap.fromTo(q('.category-card'),
      { opacity: 0, x: -30 },
      {
        opacity: 1,
        x: 0,
        stagger: 0.15,
        duration: 0.8,
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
        <RevealHeader
          title={t.skills.title}
          subtitle={t.skills.subtitle}
          description={t.skills.desc}
        />

        <div className="categories-grid grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((cat) => (
            <div key={cat.title} className="category-card group h-full">
              <div className="h-full premium-card p-8 space-y-8 transition-all duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full blur-3xl -mr-12 -mt-12 group-hover:bg-primary/10 transition-all duration-300" />

                <div className="relative z-10 space-y-7">
                  <div className="flex items-center gap-5 group/header">
                    <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                      <cat.icon className="h-7 w-7" />
                    </div>
                    <h3 className="text-2xl font-black text-foreground tracking-tight leading-tight group-hover/header:text-primary transition-colors">{cat.title}</h3>
                  </div>

                  <p className="text-muted-foreground text-sm font-medium leading-relaxed min-h-12">
                    {cat.description}
                  </p>

                  <div className="grid grid-cols-2 gap-x-4 gap-y-5 pt-8 border-t border-white/5">
                    {cat.skills.map(skill => (
                      <a 
                        key={skill.name} 
                        href={skill.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="flex items-center gap-3 group/skill cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-xl transition-all"
                      >
                        <div className="p-2 rounded-lg bg-white/5 group-hover/skill:bg-primary/15 transition-all border border-white/5 group-hover/skill:border-primary/30">
                          <skill.icon
                            className="h-4 w-4 text-muted-foreground group-hover/skill:text-primary transition-colors"
                            style={{ fill: 'currentColor' }}
                          />
                        </div>
                        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-muted-foreground group-hover/skill:text-foreground transition-colors">
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
  )
}
