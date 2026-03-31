'use client'

import { useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import { gsap, useGSAP } from '@/lib/gsap'

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
      'Diseño editorial completo del llibret de la Falla el Molí para la temporada 2024/2025. Proyecto integral que incluye maquetación, diseño gráfico y preparación para impresión.',
    image: '/projects/Falla.svg',
    technologies: ['Adobe InDesign', 'Photoshop', 'Illustrator'],
    category: 'Diseño Gráfico',
    link: '/projects/LLIBRET 24-25.pdf',
  },
  {
    title: 'Web de XML',
    description:
      'Aplicación web educativa diseñada para aprender a usar XML en 4 semanas. Incluye tutoriales interactivos, ejemplos prácticos y ejercicios progresivos.',
    image: '/projects/favicon.ico',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'XML'],
    category: 'Desarrollo Web',
    link: 'https://avl05.github.io/web-xml-alex/',
    github: 'https://github.com/avl05/web-xml-alex',
  },
  {
    title: 'Cartel Cena de Proclamación',
    description:
      'Diseño de cartel para la invitación a la cena de proclamación de la Falla el Molí 24/25. Diseño visual impactante que captura la esencia del evento.',
    image: '/projects/Falla.svg',
    technologies: ['Adobe Illustrator', 'Photoshop'],
    category: 'Diseño Gráfico',
    link: '/projects/Cartel proclamacion (JPG).jpg',
  },
  {
    title: 'Pancarta FM 24/25',
    description: 'Diseño de una pancarta para la FM (Irene)',
    image: '/projects/Pancarta_Irene.jpg',
    technologies: ['Photoshop', 'Lightroom'],
    category: 'Diseño Gráfico',
    link: '/projects/Pancarta_Irene.jpg',
  },
  {
    title: 'Pancarta FMi 24/25',
    description: 'Diseño de una pancarta para la FMi (Claudia)',
    image: '/projects/Pancarta_Claudia.jpg',
    technologies: ['Photoshop', 'Lightroom'],
    category: 'Diseño Gráfico',
    link: '/projects/Pancarta_Claudia.jpg',
  },
  {
    title: 'XIX Concurso',
    description: 'Diseño del cartel de la Falla el Molí por el XIX Concurso',
    image: '/projects/XIX Concurso.png',
    technologies: ['Photoshop', 'Lightroom'],
    category: 'Diseño Gráfico',
    link: '/projects/XIX Concurso.png',
  },
  {
    title: 'XX Concurso',
    description: 'Diseño del cartel de la Falla el Molí por el XX Concurso',
    image: '/projects/XX Concurso.png',
    technologies: ['Photoshop', 'Lightroom'],
    category: 'Diseño Gráfico',
    link: '/projects/XX Concurso.png',
  },
  {
    title: 'XXI Concurso',
    description: 'Diseño del cartel de la Falla el Molí por el XXI Concurso',
    image: '/projects/XXI Concurso.png',
    technologies: ['Photoshop', 'Lightroom'],
    category: 'Diseño Gráfico',
    link: '/projects/XXI Concurso.png',
  },
  {
    title: 'Dulces Navideños',
    description:
      'Página web hecha con Vue, para el encargo de dulces navideños',
    image: '/projects/aitanamora.png',
    technologies: ['Vue'],
    category: 'Desarrollo Web',
    link: 'https://aitanamora.vercel.app/',
    github: 'https://github.com/AVL05/Dulces',
  },
  {
    title: 'API Reservas Hotel',
    description:
      'Sistema de gestión hotelera completo con API RESTful, panel de administración seguro y frontend moderno (SPA). Incluye autenticación, gestión de reservas y base de datos optimizada. Hecho por Gabi y Alex',
    image: '/projects/api-hotel-cover.png',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    category: 'Desarrollo Web',
    link: '/projects/Demo_API_Hotel.mp4',
    github: 'https://github.com/avl05/API_Hotel',
  },
  {
    title: 'El Fogón',
    description:
      'Sitio web moderno y responsivo para un restaurante mediterráneo. Desarrollado con HTML5 semántico y Tailwind CSS v4, ofreciendo una experiencia visual atractiva y fluida.',
    image: '/projects/el-fogon.png',
    technologies: ['Tailwind CSS', 'JavaScript', 'HTML5'],
    category: 'Desarrollo Web',
    link: 'https://prweb02.netlify.app/',
    github: 'https://github.com/AVL05/PRWEB02',
  },
]

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('Todos')

  const categories = ['Todos', 'Diseño Gráfico', 'Desarrollo Web']

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'Todos') return true
    return project.category === activeCategory
  })

  useGSAP(() => {
    gsap.from('.projects-header', {
      opacity: 0,
      y: 30,
      duration: 1,
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
      }
    })

    gsap.from('.category-btn', {
      opacity: 0,
      y: 20,
      stagger: 0.1,
      duration: 0.8,
      scrollTrigger: {
        trigger: '.filter-buttons',
        start: 'top 85%',
      }
    })

    gsap.from('.project-card', {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 1,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.projects-grid',
        start: 'top 85%',
      }
    })
  }, { scope: containerRef })

  const shouldOpenInNewTab = (link: string) => link.startsWith('http')
  const getButtonText = (link: string) => {
    if (link.includes('.pdf')) return 'Ver PDF'
    if (link.includes('.jpg') || link.includes('.png')) return 'Ver Imagen'
    if (link.startsWith('http')) return 'Ver Sitio'
    return 'Ver Proyecto'
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Desarrollo Web': return 'from-blue-500 to-cyan-500'
      case 'Diseño Gráfico': return 'from-orange-500 to-red-500'
      default: return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <section id="projects" ref={containerRef} className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden text-white">
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter opacity-10 absolute -top-12 left-0 select-none hidden sm:block uppercase">
            PROJECTS
          </h2>
          <h2 className="projects-header text-3xl sm:text-4xl md:text-5xl font-bold text-primary font-mono relative">
            <span className="text-primary/50 mr-4 font-normal">03.</span>
            Proyectos <span className="text-white/20 ml-2">/ My Work</span>
          </h2>
          <p className="projects-header text-base sm:text-lg text-white/50 max-w-2xl mt-4 font-medium">
            Una selección de mis trabajos recientes en desarrollo web y diseño gráfico.
          </p>
        </div>

        <div className="filter-buttons flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <div key={category} className="category-btn">
              <Button
                variant={activeCategory === category ? 'default' : 'outline'}
                onClick={() => setActiveCategory(category)}
                className={`transition-all duration-300 font-mono ${
                  activeCategory === category
                    ? 'shadow-lg scale-105 bg-primary text-black'
                    : 'hover:bg-white/5 border-white/10 text-white'
                }`}
              >
                {category}
              </Button>
            </div>
          ))}
        </div>

        <div className="projects-grid grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-10">
          <AnimatePresence mode="popLayout" initial={false}>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="project-card h-full"
              >
                <Card className="overflow-hidden bg-[#111111] border-white/5 hover:border-primary/50 transition-all duration-500 group h-full flex flex-col rounded-2xl hover:shadow-[0_0_50px_rgba(119,255,150,0.1)]">
                  <div className="flex items-center gap-2 px-6 py-4 bg-[#181818] border-b border-white/5">
                    <div className="flex gap-1.5">
                      <div className="w-2.5 h-2.5 rounded-full bg-red-500/30"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30"></div>
                      <div className="w-2.5 h-2.5 rounded-full bg-green-500/30"></div>
                    </div>
                    <span className="ml-4 text-xs font-mono text-white/30 truncate flex-1 uppercase tracking-widest">
                      {project.category} :: {project.title.toLowerCase().replace(/ /g, '_')}
                    </span>
                  </div>

                  <div className={`relative aspect-video overflow-hidden ${smallImageProjects.includes(project.title) ? 'bg-[#0a0a0a] p-12' : ''}`}>
                    <Image
                      src={project.image || '/placeholder.svg'}
                      alt={project.title}
                      fill
                      className={`transition-all duration-700 group-hover:scale-105 ${smallImageProjects.includes(project.title) ? 'object-contain' : 'object-cover'}`}
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 flex items-center justify-center">
                      <ExternalLink className="h-10 w-10 text-white scale-75 group-hover:scale-100 transition-transform" />
                    </div>
                  </div>

                  <div className="p-8 space-y-6 flex-1 flex flex-col">
                    <h3 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-white/60 leading-relaxed grow text-pretty font-medium">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary" className="bg-white/5 text-white/70 border-white/5 hover:border-primary/30 transition-colors">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                    <div className="pt-4 flex gap-4">
                      <Button asChild className="bg-primary text-black font-bold hover:bg-primary/90 rounded-xl">
                        <a href={project.link} target={shouldOpenInNewTab(project.link) ? '_blank' : '_self'}>
                          {getButtonText(project.link)}
                        </a>
                      </Button>
                      {project.github && (
                        <Button variant="outline" asChild className="border-white/10 hover:bg-white/5 rounded-xl">
                          <a href={project.github} target="_blank"><Github className="h-4 w-4 mr-2" /> Source</a>
                        </Button>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}
