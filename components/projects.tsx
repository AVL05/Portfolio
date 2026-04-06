'use client'

import { useCallback, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ExternalLink, Github, Code2, Layers, Monitor, Phone } from 'lucide-react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'
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
  'Web de XML',
  'Cartel Cena de Proclamación',
  'XIX Concurso',
  'XX Concurso',
  'XXI Concurso',
]

const projects = [
  {
    title: 'Llibret Falla el Molí 24/25',
    description:
      'Una obra maestra de diseño editorial que trasciende lo tradicional. Este proyecto supuso la creación de una identidad visual cohesiva para una publicación de más de 100 páginas, equilibrando la herencia cultural fallera con un minimalismo tipográfico de vanguardia. La dirección de arte se centró en la jerarquía visual y la preparación técnica para una impresión de gran formato con acabados premium.',
    image: '/projects/Falla.svg',
    technologies: ['Indesign', 'Photoshop', 'Illustrator'],
    category: 'Diseño Gráfico',
    link: '/projects/LLIBRET 24-25.pdf',
    type: 'Editorial Design'
  },
  {
    title: 'Cartel Cena de Proclamación',
    description:
      'Diseño de cartelería de gran formato para el evento de Proclamación. Utilizando una estética elegante y minimalista, este proyecto enfocó la atención en la tipografía clásica y el uso de espacios en blanco para transmitir la solemnidad del acto, manteniendo la coherencia con la identidad visual global de la comisión.',
    image: '/projects/Cartel proclamacion (JPG).jpg',
    technologies: ['Photoshop', 'Illustrator'],
    category: 'Diseño Gráfico',
    link: '#',
    type: 'Event Identity'
  },
  {
    title: 'XXI Concurso Fotografía',
    description:
      'Serie fotográfica galardonada que explora la técnica de la luz natural aplicada a escenas tradicionales. Este proyecto supuso un reto técnico en cuanto a post-producción digital para realzar texturas y colores sin perder la naturalidad de la captura original.',
    image: '/projects/XXI Concurso.png',
    technologies: ['Lightroom', 'Photoshop'],
    category: 'Diseño Gráfico',
    link: '#',
    type: 'Photography Series'
  },
  {
    title: 'Pancartas de Honor',
    description:
      'Diseño y dirección creativa de pancartas conmemorativas para representantes de la comisión. Un trabajo de composición visual que combina fotografía de alta resolución con elementos gráficos ornamentales para crear una pieza de gran impacto emocional y visual.',
    image: '/projects/Pancarta_Claudia.jpg',
    technologies: ['Photoshop', 'Photography'],
    category: 'Diseño Gráfico',
    link: '#',
    type: 'Large Format Design'
  },
  {
    title: 'XX Concurso Diseño',
    description:
      'Propuesta creativa para la identidad visual del vigésimo aniversario de concursos locales. El diseño integra elementos vectoriales complejos con una paleta de colores vibrante, asegurando la legibilidad en múltiples soportes publicitarios.',
    image: '/projects/XX Concurso.png',
    technologies: ['Illustrator', 'InDesign'],
    category: 'Diseño Gráfico',
    link: '#',
    type: 'Visual Identity'
  },
  {
    title: 'XIX Concurso Editorial',
    description:
      'Trabajo de maquetación y diseño editorial enfocado en la documentación histórica de la comisión. Un ejercicio de jerarquía visual y gestión de grandes bloques de texto e imagen para una lectura fluida y atractiva.',
    image: '/projects/XIX Concurso.png',
    technologies: ['InDesign', 'Photoshop'],
    category: 'Diseño Gráfico',
    link: '#',
    type: 'Editorial Design'
  },
  {
    title: 'Arquitectura XML Educativa',
    description:
      'Desarrollo de una plataforma Full-stack diseñada para la enseñanza estructurada de lenguajes de marcado. La aplicación implementa una arquitectura de información que facilita el aprendizaje progresivo, integrando visualizaciones de datos XML y una interfaz de usuario optimizada para la lectura de código técnico.',
    image: '/projects/favicon.ico',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'XML'],
    category: 'Desarrollo Web',
    link: 'https://avl05.github.io/web-xml-alex/',
    github: 'https://github.com/avl05/web-xml-alex',
    type: 'Education Platform'
  },
  {
    title: 'El Fogón: Vanguardia Gastronómica',
    description:
      'Landing page de alto impacto para un restaurante mediterráneo. El diseño destaca por su estética clean-label, micro-interacciones fluidas y una optimización SEO orientada a resultados.',
    image: '/projects/el-fogon.png',
    technologies: ['Next.js', 'Tailwind CSS', 'GSAP'],
    category: 'Desarrollo Web',
    link: 'https://prweb02.netlify.app/',
    github: 'https://github.com/AVL05/PRWEB02',
    type: 'Luxury Landing Page'
  },
  {
    title: 'E-commerce Navideño Reactivo',
    description:
      'Solución de comercio electrónico estacional enfocada en la conversión y la experiencia de usuario (UX). Implementa un sistema de gestión de estado reactivo para carritos de compra y navegación fluida entre categorías.',
    image: '/projects/aitanamora.png',
    technologies: ['Vue', 'Vite', 'Firebase'],
    category: 'Desarrollo Web',
    link: 'https://aitanamora.vercel.app/',
    github: 'https://github.com/AVL05/Dulces',
    type: 'Seasonal Shop'
  },
  {
    title: 'Sistema de Gestión Hotelera (API)',
    description:
      'Backend robusto y API RESTful diseñada para la gestión integral de reservas. El sistema maneja arquitecturas de bases de datos complejas, garantizando la integridad de los datos y la concurrencia en tiempo real.',
    image: '/projects/api-hotel-cover.png',
    technologies: ['PHP', 'MySQL', 'JavaScript'],
    category: 'Desarrollo Web',
    link: '/projects/Demo_API_Hotel.mp4',
    github: 'https://github.com/avl05/API_Hotel',
    type: 'Enterprise API'
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
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

            {/* Project Number (Dev style) */}
            <div className="absolute top-8 left-8 z-30 font-mono text-xs text-white/20 tracking-widest uppercase">
              Project <span className="text-primary font-bold">{projectNumber}</span>
            </div>

            {/* Image Container */}
            <div className="relative aspect-[16/11] overflow-hidden">
               <Image
                src={project.image || '/placeholder.svg'}
                alt={project.title}
                fill
                className={`transition-all duration-1000 ease-out group-hover:scale-105 ${smallImageProjects.includes(project.title) ? 'p-16 object-contain' : 'object-cover'}`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              {/* Dev Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-500" />

              {/* Tech Tags (Top Right) */}
              <div className="absolute top-8 right-8 z-30 flex flex-col items-end gap-2">
                <div className="px-3 py-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/50">{project.category}</span>
                </div>
              </div>
            </div>

            {/* content */}
            <div className="p-10 space-y-4 relative">
              <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
                {project.description}
              </p>

              <div className="pt-4 flex items-center justify-between">
                <div className="flex gap-4">
                  {project.technologies.slice(0, 2).map(tech => (
                    <span key={tech} className="text-[10px] font-mono text-white/20 uppercase tracking-widest">{tech}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-primary font-mono text-[10px] uppercase font-bold tracking-widest opacity-0 group-hover:opacity-100 translate-x-4 group-hover:translate-x-0 transition-all">
                  Detalles <ChevronRight className="h-3 w-3" />
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
          {/* Visuals */}
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

          {/* Info */}
          <div className="lg:col-span-5 p-12 lg:p-16 flex flex-col justify-between space-y-12 lg:overflow-y-auto">
            <div className="space-y-10">
              <div className="space-y-4">
                <div className="text-primary font-mono text-[10px] uppercase tracking-[0.4em] font-bold">Concept Study</div>
                <h2 className="text-4xl lg:text-5xl font-black text-white tracking-tighter leading-none">{project.title}</h2>
                <div className="text-white/30 text-xs font-mono">{project.type}</div>
              </div>

              <p className="text-white/60 text-lg leading-relaxed font-medium">
                {project.description}
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4 text-white/30">
                  <Code2 className="h-4 w-4" />
                  <span className="text-[10px] font-mono uppercase tracking-widest">Tecnologías Clave</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map(tech => (
                    <div key={tech} className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-xs font-bold text-white/70">
                      {tech}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-12 grid grid-cols-2 gap-4">
              <Button asChild size="lg" className="h-16 bg-primary text-black font-black hover:bg-white rounded-2xl transition-all shadow-xl">
                <a href={project.link} target="_blank">Entrar Al Proyecto</a>
              </Button>
              {project.github && (
                <Button variant="outline" size="lg" asChild className="h-16 border-white/5 bg-white/5 hover:bg-white/10 text-white rounded-2xl transition-all">
                  <a href={project.github} target="_blank">Código Fuente</a>
                </Button>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6"/>
    </svg>
  )
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('Todos')

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
        stagger: 0.2,
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
    if (activeCategory === 'Todos') return true
    return project.category === activeCategory
  })

  return (
    <section id="projects" ref={containerRef} className="section-padding bg-background relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-primary/5 [mask-image:linear-gradient(to_left,black,transparent)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="projects-header mb-32 flex flex-col md:flex-row md:items-end justify-between gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-4 text-primary font-mono text-sm tracking-[0.3em] uppercase">
              <span className="w-8 h-[1px] bg-primary/50" />
              03. Casos de Estudio
            </div>
            <h2 className="text-4xl sm:text-7xl font-black text-white tracking-tighter leading-none">
              Proyectos con <span className="text-primary">alma</span> digital.
            </h2>
          </div>

          <div className="flex gap-4">
            {['Todos', 'Desarrollo Web', 'Diseño Gráfico'].map(category => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-300 ${activeCategory === category ? 'bg-primary text-black' : 'bg-white/5 text-white/30 hover:text-white/70'}`}
              >
                {category}
              </button>
            ))}
          </div>
        </header>

        <div className="projects-grid grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
