'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Code2, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'
import { useLanguage } from '@/lib/language-context'
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"

const smallImageProjects = [
  'Llibret Falla el Molí 24/25',
  'Arquitectura XML Educativa'
]

function ProjectCard({ project, index, t }: { project: any; index: number, t: any }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const projectNumber = (index + 1).toString().padStart(2, '0')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          ref={cardRef}
          className="project-card group relative h-full cursor-pointer "
        >
          <div className="relative h-full flex flex-col bg-card/50 border border-border overflow-hidden rounded-[2.5rem] transition-all duration-700 hover:border-primary/30 group-hover:-translate-y-2">
            <div className="absolute top-8 left-8 z-30 font-mono text-xs text-muted-foreground/50 tracking-widest uppercase">
              Project <span className="text-primary font-bold">{projectNumber}</span>
            </div>

            <div className="relative aspect-[16/11] overflow-hidden">
               <Image
                src={project.image || '/placeholder.svg'}
                alt={project.title}
                fill
                className={`transition-all duration-1000 ease-out group-hover:scale-105 ${smallImageProjects.includes(project.title) ? 'p-16 object-contain' : 'object-cover'}`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              <div className="absolute top-8 right-8 z-30 flex flex-col items-end gap-2">
                <div className="px-3 py-1 bg-secondary/50 backdrop-blur-md border border-border rounded-full">
                  <span className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">{project.category}</span>
                </div>
              </div>
            </div>

            <div className="p-10 space-y-4 relative">
              <h3 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed line-clamp-2">
                {project.description}
              </p>

              <div className="pt-4 flex items-center justify-between">
                <div className="flex gap-4">
                  {project.technologies.slice(0, 2).map((tech: string) => (
                    <span key={tech} className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">{tech}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                  {t.nav.projects} <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogTrigger>

      <DialogContent
        data-lenis-prevent
        className="max-w-[95vw] lg:max-w-[1200px] bg-background/95 backdrop-blur-[30px] border-border text-foreground p-0 overflow-hidden rounded-[3rem] shadow-2xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto lg:overflow-hidden">
          <div className="lg:col-span-7 bg-secondary/20 relative flex items-center justify-center p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-border">
            <div className="absolute inset-0 bg-grid opacity-20" />
            <div className="relative w-full aspect-video drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
              <Image
                src={project.image || '/placeholder.svg'}
                alt={project.title}
                fill
                className="object-contain"
              />
            </div>
          </div>

          <div className="lg:col-span-5 p-12 lg:p-16 flex flex-col justify-between space-y-12 lg:overflow-y-auto">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] font-bold">{t.projects.concept}</div>
                <h2 className="text-3xl lg:text-5xl font-black text-foreground tracking-tighter leading-none">{project.title}</h2>
                <div className="text-white/30 text-xs font-mono">{project.type}</div>
              </div>

              <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                {project.description}
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-muted-foreground/50">
                  <Code2 className="h-4 w-4" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">{t.skills.technologies}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <div key={tech} className="px-4 py-2 bg-secondary border border-border rounded-xl text-xs font-bold text-muted-foreground">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-12 grid grid-cols-2 gap-4">
              <Button asChild size="lg" className="h-16 bg-primary text-primary-foreground font-black hover:bg-white rounded-2xl transition-all shadow-xl">
                <a href={project.link} target="_blank">{t.projects.view_live}</a>
              </Button>
              {project.github && (
                <Button variant="outline" size="lg" asChild className="h-16 border-border bg-secondary/50 hover:bg-secondary text-foreground rounded-2xl transition-all">
                  <a href={project.github} target="_blank">{t.projects.view_code}</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { t, language } = useLanguage()

  const projects = t.projects.items
  const categories = language === 'es' ? ['Todos', 'Desarrollo Web', 'Diseño Gráfico'] : ['All', 'Web Development', 'Graphic Design']

  const [activeCategory, setActiveCategory] = useState(categories[0])

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef)

    gsap.fromTo(q('.projects-header'),
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

    gsap.fromTo(q('.project-card'),
      { opacity: 0, y: 100 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: q('.projects-grid'),
          start: 'top 85%',
        }
      }
    )
  }, { scope: containerRef })

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === categories[0]) return true
    return project.category === activeCategory
  })

  return (
    <section id="projects" ref={containerRef} className="section-padding bg-background relative overflow-hidden">
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 [mask-image:linear-gradient(to_left,black,transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="projects-header mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-primary font-mono text-sm tracking-[0.3em] uppercase">
              <span className="w-8 h-[1px] bg-primary/50" />
              {t.projects.title}
            </div>
            <h2 className="text-4xl sm:text-7xl font-black text-foreground tracking-tighter leading-none">
              {t.projects.subtitle}
            </h2>
          </div>

          <div className="flex gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${activeCategory === category ? 'bg-primary text-primary-foreground' : 'bg-secondary text-muted-foreground/50 hover:text-foreground'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </header>

        <div className="projects-grid grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} t={t} />
          ))}
        </div>
      </div>
    </section>
  )
}
