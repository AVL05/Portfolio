'use client'

import { useRef } from 'react'
import { Code2, Languages, Palette, Cpu } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'
import { 
  SiHtml5, SiCss, SiJavascript, SiReact, 
  SiVuedotjs, SiTailwindcss, SiBootstrap,
  SiPhp, SiLaravel, SiMysql
} from 'react-icons/si'
import { DiPhotoshop, DiIllustrator } from 'react-icons/di'
import { LuLanguages } from 'react-icons/lu'
import { Film, Camera, Layers } from 'lucide-react'

const skillCategories = [
  {
    title: 'FRONTEND',
    icon: Code2,
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
    title: 'BACKEND',
    icon: Cpu,
    skills: [
      { name: 'PHP', color: '#777BB4', icon: SiPhp },
      { name: 'Laravel', color: '#FF2D20', icon: SiLaravel },
      { name: 'MySQL', color: '#4479A1', icon: SiMysql },
    ],
  },
  {
    title: 'CREATIVE',
    icon: Palette,
    skills: [
      { name: 'Photoshop', color: '#31A8FF', icon: DiPhotoshop },
      { name: 'Illustrator', color: '#FF9A00', icon: DiIllustrator },
      { name: 'InDesign', color: '#FF3366', icon: Layers },
      { name: 'Premiere Pro', color: '#9999FF', icon: Film },
      { name: 'Lightroom', color: '#31A8FF', icon: Camera },
    ],
  },
  {
    title: 'LANGUAGES',
    icon: Languages,
    skills: [
      { name: 'Spanish', level: 'Native', icon: LuLanguages },
      { name: 'Catalan', level: 'Native', icon: LuLanguages },
      { name: 'English', level: 'Intermediate', icon: LuLanguages },
    ],
  },
]

export function Skills() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const rows = gsap.utils.toArray('.skill-row')
    
    rows.forEach((row: any) => {
      const category = row.querySelector('.category-title')
      const items = row.querySelectorAll('.skill-badge')
      
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: row,
          start: 'top 90%',
        }
      })

      tl.from(category, {
        x: -30,
        autoAlpha: 0,
        duration: 0.8,
        ease: 'power3.out'
      })
      .from(items, {
        autoAlpha: 0,
        scale: 0.9,
        y: 15,
        stagger: 0.04,
        duration: 0.5,
        ease: 'power2.out',
        clearProps: 'all'
      }, '-=0.4')
    })
  }, { scope: containerRef })

  return (
    <section
      id="skills"
      ref={containerRef}
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative text-white"
    >
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter opacity-10 absolute -top-12 left-0 select-none hidden sm:block">
            EXPERTISE
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary font-mono relative">
            <span className="text-primary/50 mr-4 font-normal">02.</span>
            Habilidades <span className="text-white/20 ml-2">/ Tech Stack</span>
          </h2>
        </div>

        <div className="space-y-16 sm:space-y-24">
          {skillCategories.map((category) => (
            <div
              key={category.title}
              className="skill-row grid grid-cols-1 lg:grid-cols-12 gap-8 items-start group"
            >
              {/* Category Sidebar */}
              <div className="lg:col-span-4 translate-y-1">
                <div className="flex items-center gap-4 mb-2">
                  <category.icon className="h-6 w-6 text-primary" />
                  <span className="text-xs font-mono text-primary/60 tracking-widest uppercase">
                    Skill Set
                  </span>
                </div>
                <h3 className="category-title text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter text-white/90 group-hover:text-primary transition-colors duration-500">
                  {category.title}
                </h3>
              </div>

                <div className="lg:col-span-8 flex flex-wrap gap-3 sm:gap-4 lg:pt-2">
                  {category.skills.map((skill) => {
                    const SkillIcon = (skill as any).icon;
                    return (
                      <div
                        key={skill.name}
                        className="skill-badge group/item relative px-5 py-3 sm:px-6 sm:py-4 bg-[#111111] border border-white/5 rounded-xl hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_20px_rgba(119,255,150,0.1)] flex items-center gap-4"
                      >
                        {SkillIcon && (
                          <SkillIcon 
                            className="w-6 h-6 sm:w-7 sm:h-7 transition-transform duration-300 group-hover/item:scale-110" 
                            style={{ color: (skill as any).color || 'var(--color-primary)' }}
                          />
                        )}
                        <div className="flex flex-col items-start leading-tight">
                          <span className="text-base sm:text-lg font-bold tracking-tight text-white/80 group-hover/item:text-white transition-colors">
                            {skill.name}
                          </span>
                          {(skill as any).level && (
                            <span className="text-[10px] sm:text-xs font-mono text-primary/40 uppercase tracking-widest mt-0.5">
                              {(skill as any).level}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
