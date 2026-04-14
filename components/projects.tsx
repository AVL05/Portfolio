'use client'

import { useCallback, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Code2, Layers, Monitor, Phone, ChevronRight } from 'lucide-react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'
import { useLanguage } from '@/lib/language-context'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"

const smallImageProjects = [
  'Llibret Falla el Molí 24/25',
  'Arquitectura XML Educativa'
]

const projects_es = [
  {
    title: 'Llibret Falla el Molí 24/25',
    description: 'Una obra maestra de diseño editorial que trasciende lo tradicional. Este proyecto supuso la creación de una identidad visual cohesiva para una publicación de más de 100 páginas, equilibrando la herencia cultural fallera con un minimalismo tipográfico de vanguardia.',
    image: '/projects/Falla.svg',
    technologies: ['Indesign', 'Photoshop', 'Illustrator'],
    category: 'Diseño Gráfico',
    link: '/projects/LLIBRET 24-25.pdf',
    type: 'Diseño Editorial'
  },
  {
    title: 'El Fogón: Vanguardia Gastronómica',
    description: 'Landing page de alto impacto para un restaurante mediterráneo. El diseño destaca por su estética clean-label, micro-interacciones fluidas con GSAP y una arquitectura orientada al rendimiento y SEO.',
    image: '/projects/el-fogon.png',
    technologies: ['Next.js', 'Tailwind CSS', 'GSAP'],
    category: 'Desarrollo Web',
    link: 'https://prweb02.netlify.app/',
    github: 'https://github.com/AVL05/PRWEB02',
    type: 'Landing Page Premium'
  },
  {
    title: 'Sistema de Gestión Hotelera (API)',
    description: 'Backend robusto y API RESTful diseñada para la gestión integral de reservas. Implementa arquitecturas de bases de datos complejas, garantizando integridad y concurrencia en tiempo real.',
    image: '/projects/api-hotel-cover.png',
    technologies: ['PHP', 'MySQL', 'JavaScript'],
    category: 'Desarrollo Web',
    link: '/projects/Demo_API_Hotel.mp4',
    github: 'https://github.com/avl05/API_Hotel',
    type: 'Arquitectura Backend'
  },
  {
    title: 'E-commerce Navideño Reactivo',
    description: 'Solución de comercio electrónico estacional enfocada en la conversión y UX. Sistema de gestión de estado reactivo para carritos de compra y navegación fluida entre categorías.',
    image: '/projects/aitanamora.png',
    technologies: ['Vue', 'Vite', 'Firebase'],
    category: 'Desarrollo Web',
    link: 'https://aitanamora.vercel.app/',
    github: 'https://github.com/AVL05/Dulces',
    type: 'eCommerce App'
  },
  {
    title: 'Arquitectura XML Educativa',
    description: 'Plataforma Full-stack diseñada para la enseñanza estructurada de lenguajes de marcado. Integra visualizaciones de datos XML y una interfaz optimizada para lectura técnica.',
    image: '/projects/favicon.ico',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'XML'],
    category: 'Desarrollo Web',
    link: 'https://avl05.github.io/web-xml-alex/',
    github: 'https://github.com/avl05/web-xml-alex',
    type: 'Plataforma EduTech'
  },
]

const projects_en = [
  {
    title: 'Llibret Falla el Molí 24/25',
    description: 'An editorial design masterpiece that transcends tradition. Cohesive visual identity for a 100+ page publication, balancing cultural heritage with avant-garde typographic minimalism.',
    image: '/projects/Falla.svg',
    technologies: ['Indesign', 'Photoshop', 'Illustrator'],
    category: 'Graphic Design',
    link: '/projects/LLIBRET 24-25.pdf',
    type: 'Editorial Design'
  },
  {
    title: 'El Fogón: Gastronomic Vanguard',
    description: 'High-impact landing page for a Mediterranean restaurant. Features clean-label aesthetics, fluid GSAP micro-interactions, and a performance-oriented architecture.',
    image: '/projects/el-fogon.png',
    technologies: ['Next.js', 'Tailwind CSS', 'GSAP'],
    category: 'Web Development',
    link: 'https://prweb02.netlify.app/',
    github: 'https://github.com/AVL05/PRWEB02',
    type: 'Premium Landing Page'
  },
  {
    title: 'Hotel Management System (API)',
    description: 'Robust backend and RESTful API for reservation management. Implements complex database architectures ensuring integrity and real-time concurrency.',
    image: '/projects/api-hotel-cover.png',
    technologies: ['PHP', 'MySQL', 'JavaScript'],
    category: 'Web Development',
    link: '/projects/Demo_API_Hotel.mp4',
    github: 'https://github.com/avl05/API_Hotel',
    type: 'Backend Architecture'
  },
  {
    title: 'Reactive Holiday E-commerce',
    description: 'Seasonal e-commerce solution focused on conversion and UX. Features a reactive state management system for carts and fluid category navigation.',
    image: '/projects/aitanamora.png',
    technologies: ['Vue', 'Vite', 'Firebase'],
    category: 'Web Development',
    link: 'https://aitanamora.vercel.app/',
    github: 'https://github.com/AVL05/Dulces',
    type: 'eCommerce App'
  },
  {
    title: 'Educational XML Architecture',
    description: 'Full-stack platform for structured markup language teaching. Integrates XML data visualizations with an interface optimized for technical reading.',
    image: '/projects/favicon.ico',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'XML'],
    category: 'Web Development',
    link: 'https://avl05.github.io/web-xml-alex/',
    github: 'https://github.com/avl05/web-xml-alex',
    type: 'EduTech Platform'
  },
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
          <div className="relative h-full flex flex-col bg-card/30 border border-white/5 overflow-hidden rounded-[2.5rem] transition-all duration-700 hover:border-primary/30 group-hover:-translate-y-2">
            <div className="absolute top-8 left-8 z-30 font-mono text-xs text-white/20 tracking-widest uppercase">
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
                <div className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{project.category}</span>
                </div>
              </div>
            </div>

            <div className="p-10 space-y-4 relative">
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
                {project.description}
              </p>

              <div className="pt-4 flex items-center justify-between">
                <div className="flex gap-4">
                  {project.technologies.slice(0, 2).map((tech: string) => (
                    <span key={tech} className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{tech}</span>
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
        className="max-w-[95vw] lg:max-w-[1200px] bg-background/95 backdrop-blur-[30px] border-white/5 text-white p-0 overflow-hidden rounded-[3rem] shadow-2xl"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[90vh] overflow-y-auto lg:overflow-hidden">
          <div className="lg:col-span-7 bg-[#050505] relative flex items-center justify-center p-12 lg:p-24 border-b lg:border-b-0 lg:border-r border-white/5">
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
                <h2 className="text-3xl lg:text-5xl font-black text-white tracking-tighter leading-none">{project.title}</h2>
                <div className="text-white/30 text-xs font-mono">{project.type}</div>
              </div>

              <p className="text-white/60 text-lg leading-relaxed font-medium">
                {project.description}
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white/30">
                  <Code2 className="h-4 w-4" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">{t.skills.technologies}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech: string) => (
                    <div key={tech} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-white/70">
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
                <Button variant="outline" size="lg" asChild className="h-16 border-white/5 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all">
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

  const projects = language === 'es' ? projects_es : projects_en
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
            <h2 className="text-4xl sm:text-7xl font-black text-white tracking-tighter leading-none">
              {t.projects.subtitle}
            </h2>
          </div>

          <div className="flex gap-4">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${activeCategory === category ? 'bg-primary text-primary-foreground' : 'bg-white/5 text-white/30 hover:text-white/70'}`}
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
