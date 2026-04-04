'use client'

import { useCallback, useRef, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
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
      'Un proyecto de diseño editorial de gran envergadura que redefine la comunicación visual de la comisión para su libro anual. El desafío consistió en fusionar la rica tradición fallera con una estética contemporánea y limpia. Me encargué de la dirección de arte completa, desde la maquetación de más de 100 páginas hasta la creación de infografías personalizadas y la preparación técnica exhaustiva para impresión en alta fidelidad, asegurando una coherencia visual en cada sección.',
    image: '/projects/Falla.svg',
    technologies: ['Adobe InDesign', 'Photoshop', 'Illustrator'],
    category: 'Diseño Gráfico',
    link: '/projects/LLIBRET 24-25.pdf',
  },
  {
    title: 'Web de XML',
    description:
      'Plataforma educativa diseñada específicamente para desmitificar el uso de XML en un entorno de aprendizaje intensivo de 4 semanas. La aplicación no solo sirve como repositorio de contenido, sino que integra un currículo interactivo con ejemplos de código en tiempo real y evaluaciones progresivas. El enfoque se centró en la arquitectura de la información para garantizar que conceptos técnicos complejos se presenten de manera jerárquica y digerible para estudiantes de desarrollo.',
    image: '/projects/favicon.ico',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'XML'],
    category: 'Desarrollo Web',
    link: 'https://avl05.github.io/web-xml-alex/',
    github: 'https://github.com/avl05/web-xml-alex',
  },
  {
    title: 'Cartel Cena de Proclamación',
    description:
      'Creación de la identidad visual para uno de los eventos más emblemáticos del calendario fallero. El diseño del cartel utiliza una composición tipográfica audaz y elementos gráficos simbólicos para capturar la solemnidad y la alegría de la cena de proclamación. Se buscó un impacto visual inmediato que funcionara tanto en soportes digitales (redes sociales) como en impresiones físicas de gran formato, manteniendo la elegancia institucional de la Falla el Molí.',
    image: '/projects/Falla.svg',
    technologies: ['Adobe Illustrator', 'Photoshop'],
    category: 'Diseño Gráfico',
    link: '/projects/Cartel proclamacion (JPG).jpg',
  },
  {
    title: 'Pancarta FM 24/25',
    description: 'Diseño publicitario de gran formato para la Fallera Mayor de la comisión. El objetivo fue crear una pieza de impacto urbano que honrara la figura de la FM mediante un retoque fotográfico avanzado y una composición que equilibra la majestuosidad de la indumentaria tradicional con un fondo moderno y dinámico. Se prestó especial atención a la gestión del color y la resolución para garantizar una impresión nítida en dimensiones exteriores.',
    image: '/projects/Pancarta_Irene.jpg',
    technologies: ['Photoshop', 'Lightroom'],
    category: 'Diseño Gráfico',
    link: '/projects/Pancarta_Irene.jpg',
  },
  {
    title: 'Pancarta FMi 24/25',
    description: 'Proyecto hermano al de la FM, adaptando el lenguaje visual para la Fallera Mayor Infantil. En este caso, la dirección creativa se inclinó por una paleta más luminosa y elementos gráficos que aportaran frescura sin perder el aire de distinción. La complejidad técnica radicó en integrar elementos de alta resolución para un soporte que requiere visibilidad óptima tanto a corta como a larga distancia.',
    image: '/projects/Pancarta_Claudia.jpg',
    technologies: ['Photoshop', 'Lightroom'],
    category: 'Diseño Gráfico',
    link: '/projects/Pancarta_Claudia.jpg',
  },
  {
    title: 'XIX Concurso',
    description: 'Diseño conmemorativo para el decimonoveno concurso anual de la comisión. El cartel utiliza técnicas de fotomontaje y filtros artísticos para evocar la historia y el legado del certamen. Se trabajó una composición radial que dirige la mirada hacia los elementos centrales del premio, utilizando una tipografía robusta que refuerza la presencia institucional del evento.',
    image: '/projects/XIX Concurso.png',
    technologies: ['Photoshop', 'Lightroom'],
    category: 'Diseño Gráfico',
    link: '/projects/XIX Concurso.png',
  },
  {
    title: 'XX Concurso',
    description: 'Evolución visual para la vigésima edición del concurso. Marcando un hito temporal, el diseño optó por un estilo más minimalista y experimental, jugando con espacios negativos y contrastes de saturación elevados. Este proyecto permitió explorar nuevas fronteras en la comunicación visual de la falla, separándose de lo convencional para captar a un público más joven.',
    image: '/projects/XX Concurso.png',
    technologies: ['Photoshop', 'Lightroom'],
    category: 'Diseño Gráfico',
    link: '/projects/XX Concurso.png',
  },
  {
    title: 'XXI Concurso',
    description: 'La entrega más reciente de la serie de concursos, donde se consolidó una línea gráfica pulida y profesional. El diseño se centra en la limpieza compositiva, permitiendo que la información clave respire. Se utilizaron degradados técnicos y texturas digitales para aportar una capa extra de profundidad, demostrando la madurez del lenguaje visual desarrollado a lo largo de las tres ediciones.',
    image: '/projects/XXI Concurso.png',
    technologies: ['Photoshop', 'Lightroom'],
    category: 'Diseño Gráfico',
    link: '/projects/XXI Concurso.png',
  },
  {
    title: 'Dulces Navideños',
    description:
      'Aplicación web de temporada desarrollada con Vue.js para gestionar encargos de repostería artesanal. El proyecto se enfocó en crear un flujo de usuario (UX) extremadamente sencillo e intuitivo, permitiendo a los clientes navegar por el catálogo y realizar pedidos con pocos clics. La reactividad de Vue se utilizó para actualizar carritos y precios en tiempo real, ofreciendo una experiencia de compra moderna que impulsó significativamente las ventas del cliente en el periodo navideño.',
    image: '/projects/aitanamora.png',
    technologies: ['Vue'],
    category: 'Desarrollo Web',
    link: 'https://aitanamora.vercel.app/',
    github: 'https://github.com/AVL05/Dulces',
  },
  {
    title: 'API Reservas Hotel',
    description:
      'Un sistema integral de gestión hotelera que combina un backend robusto en PHP/MySQL con un frontend dinámico. Este proyecto fue un reto de arquitectura Full-stack, donde implementé un sistema de autenticación seguro, lógica de validación de reservas para evitar duplicados y un panel de administración capaz de gestionar múltiples habitaciones y estados en tiempo real. La interfaz fue diseñada pensando en la eficiencia operativa, reduciendo el tiempo de gestión para el personal del hotel.',
    image: '/projects/api-hotel-cover.png',
    technologies: ['PHP', 'MySQL', 'JavaScript', 'HTML', 'CSS'],
    category: 'Desarrollo Web',
    link: '/projects/Demo_API_Hotel.mp4',
    github: 'https://github.com/avl05/API_Hotel',
  },
  {
    title: 'El Fogón',
    description:
      'Desarrollo de un sitio web de vanguardia para un restaurante de alta cocina mediterránea. Utilizando las últimas capacidades de Tailwind CSS v4, el proyecto destaca por un diseño "Mobile First" extremadamente pulido y animaciones sutiles que elevan la percepción de la marca. La arquitectura semántica de HTML5 asegura un SEO óptimo, mientras que la dirección creativa se centró en la tipografía y la fotografía gastronómica para abrir el apetito del usuario desde la pantalla.',
    image: '/projects/el-fogon.png',
    technologies: ['Tailwind CSS', 'JavaScript', 'HTML5'],
    category: 'Desarrollo Web',
    link: 'https://prweb02.netlify.app/',
    github: 'https://github.com/AVL05/PRWEB02',
  },
]

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog"

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null)
  const shouldOpenInNewTab = (link: string) => link.startsWith('http')
  const getButtonText = (link: string) => {
    if (link.includes('.pdf')) return 'Ver PDF'
    if (link.includes('.jpg') || link.includes('.png')) return 'Ver Imagen'
    if (link.startsWith('http')) return 'Ver Sitio'
    return 'Ver Proyecto'
  }

  const projectNumber = (index + 1).toString().padStart(2, '0')

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div
          ref={cardRef}
          className="project-card group relative h-full cursor-pointer"
        >
          <Card className="relative h-full flex flex-col bg-[#0d0d0d] border-white/5 overflow-hidden rounded-3xl transition-all duration-700 hover:border-primary/40 hover:shadow-[0_0_80px_-20px_rgba(119,255,150,0.2)]">
            {/* Background Number */}
            <span className="absolute top-4 right-8 text-8xl font-black text-white/[0.02] select-none pointer-events-none group-hover:text-primary/[0.05] transition-colors duration-700">
              {projectNumber}
            </span>

            {/* Image Container */}
            <div className={`relative aspect-[16/10] overflow-hidden ${smallImageProjects.includes(project.title) ? 'p-12' : ''}`}>
              {/* Status Badge */}
              <div className="absolute top-6 left-6 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/10">
                <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                <span className="text-[10px] font-bold tracking-widest uppercase text-white/80">
                  {project.category}
                </span>
              </div>

              <Image
                src={project.image || '/placeholder.svg'}
                alt={project.title}
                fill
                priority={index === 0}
                className={`transition-all duration-1000 ease-out group-hover:scale-110 group-hover:rotate-1 ${smallImageProjects.includes(project.title) ? 'object-contain' : 'object-cover'}`}
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d0d0d] via-[#0d0d0d]/40 to-transparent opacity-80 group-hover:opacity-95 transition-opacity duration-500" />

              {/* Reveal Text on Hover */}
              <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col justify-end translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h3 className="text-3xl font-bold text-white tracking-tight group-hover:text-primary transition-colors duration-500">
                  {project.title}
                </h3>
                <p className="text-white/60 text-sm mt-4 line-clamp-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                   {project.technologies.slice(0, 3).map((tech) => (
                    <span key={tech} className="text-[10px] font-mono text-primary/80 uppercase tracking-widest">
                      #{tech.replace(' ', '')}
                    </span>
                  ))}
                  <span className="text-[10px] font-mono text-white/20 uppercase">Click para detalles</span>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </DialogTrigger>

      <DialogContent className="max-w-[95vw] md:max-w-[90vw] lg:max-w-[1100px] 2xl:max-w-[1200px] bg-[#0a0a0a]/95 backdrop-blur-2xl border-white/10 text-white p-0 overflow-hidden rounded-[2rem] sm:rounded-[3rem] shadow-[0_0_100px_-20px_rgba(119,255,150,0.1)]">
        <div className="grid grid-cols-1 lg:grid-cols-12 h-full max-h-[90vh] lg:max-h-[85vh]">
          {/* Left: Visuals Section */}
          <div className="relative h-[350px] lg:h-auto lg:col-span-7 bg-[#0d0d0d] flex items-center justify-center group/modal-img overflow-hidden">
             {/* Background Mesh/Pattern */}
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,var(--color-primary)_0%,transparent_70%)] group-hover/modal-img:opacity-20 transition-opacity duration-700" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
            
            <div className="relative w-full h-full p-6 md:p-14 flex items-center justify-center z-10">
              <div className="relative w-full h-full">
                <Image
                  src={project.image || '/placeholder.svg'}
                  alt={project.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 1000px"
                  className="object-contain transition-transform duration-1000 group-hover/modal-img:scale-[1.03] drop-shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                />
              </div>
            </div>

            {/* Subtle Vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />
          </div>

          {/* Right: Info Section */}
          <div className="lg:col-span-5 p-8 md:p-12 lg:p-16 flex flex-col justify-between bg-black/40 border-l border-white/5 overflow-y-auto">
            <div className="space-y-12">
              <DialogHeader className="space-y-6 text-left">
                <div className="flex items-center gap-4">
                  <div className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
                    <span className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">
                      {project.category}
                    </span>
                  </div>
                  <div className="h-[1px] w-8 bg-white/10" />
                  <span className="text-white/20 font-mono text-xs tracking-widest">{projectNumber}</span>
                </div>
                
                <DialogTitle className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tightest text-white leading-[0.9] text-balance">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="sr-only">
                  Detalles sobre el proyecto {project.title}: {project.description}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-10">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary" />
                    <h4 className="text-[10px] font-black font-mono text-white/40 uppercase tracking-[0.3em]">Concepto</h4>
                  </div>
                  <p className="text-white/60 leading-relaxed text-lg sm:text-xl font-medium">
                    {project.description}
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary/40" />
                    <h4 className="text-[10px] font-black font-mono text-white/40 uppercase tracking-[0.3em]">Tecnologías</h4>
                  </div>
                  <div className="flex flex-wrap gap-2 pt-2">
                    {project.technologies.map((tech) => (
                      <div 
                        key={tech} 
                        className="bg-white/[0.03] border border-white/10 hover:border-primary/30 transition-all duration-300 text-white/70 py-1.5 px-4 rounded-xl text-xs font-bold"
                      >
                        {tech}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-14 space-y-8 mt-auto">
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="h-[70px] bg-primary text-black font-black hover:bg-white rounded-2xl flex-1 text-base transition-all duration-500 shadow-[0_20px_40px_-15px_rgba(119,255,150,0.3)]">
                  <a href={project.link} target={shouldOpenInNewTab(project.link) ? '_blank' : '_self'}>
                    <span className="flex-1 text-left px-2">{getButtonText(project.link)}</span>
                    <div className="h-10 w-10 rounded-xl bg-black/10 flex items-center justify-center">
                      <ExternalLink className="h-5 w-5" />
                    </div>
                  </a>
                </Button>
                {project.github && (
                  <Button variant="outline" size="lg" asChild className="h-[70px] border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 text-white rounded-2xl flex-1 text-base transition-all duration-500">
                    <a href={project.github} target="_blank">
                      <Github className="mr-3 h-5 w-5" />
                      Repositorio
                    </a>
                  </Button>
                )}
              </div>

              <div className="flex items-center justify-between opacity-30">
                 <p className="text-[9px] font-mono uppercase tracking-[0.4em]">
                  AVL Portfolio &copy; 2024
                </p>
                <div className="flex gap-1">
                  <div className="w-1 h-1 rounded-full bg-white" />
                  <div className="w-1 h-1 rounded-full bg-white/50" />
                  <div className="w-1 h-1 rounded-full bg-white/20" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [isAnimating, setIsAnimating] = useState(false)

  useGSAP(() => {
    gsap.fromTo('.projects-header-element', 
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 1,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        }
      }
    )

    gsap.fromTo('.project-card',
      { opacity: 0, y: 60, rotateX: 15, transformOrigin: 'top center' },
      {
        opacity: 1,
        y: 0,
        rotateX: 0,
        stagger: 0.15,
        duration: 1.2,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        }
      }
    )
  }, { scope: containerRef })

  const categories = ['Todos', 'Diseño Gráfico', 'Desarrollo Web']

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'Todos') return true
    return project.category === activeCategory
  })

  const handleCategoryChange = useCallback((category: string) => {
    if (isAnimating || category === activeCategory) return
    setIsAnimating(true)

    const cards = gridRef.current?.querySelectorAll('.project-card')
    if (!cards || cards.length === 0) {
      setActiveCategory(category)
      setIsAnimating(false)
      return
    }

    gsap.to(cards, {
      opacity: 0,
      y: 20,
      scale: 0.95,
      stagger: 0.05,
      duration: 0.4,
      ease: 'power2.in',
      onComplete: () => {
        setActiveCategory(category)
        requestAnimationFrame(() => {
          const newCards = gridRef.current?.querySelectorAll('.project-card')
          if (newCards) {
            gsap.set(newCards, { opacity: 0, y: 20, scale: 0.95 })
            gsap.to(newCards, {
              opacity: 1,
              y: 0,
              scale: 1,
              stagger: 0.1,
              duration: 0.8,
              ease: 'power3.out',
              onComplete: () => setIsAnimating(false),
            })
          } else {
            setIsAnimating(false)
          }
        })
      },
    })
  }, [activeCategory, isAnimating])

  return (
    <section id="projects" ref={containerRef} className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden text-white">
      <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(to_right,#ffffff02_1px,transparent_1px),linear-gradient(to_bottom,#ffffff02_1px,transparent_1px)] bg-[size:64px_64px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <h2 className="projects-header-element text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl font-black tracking-tighter opacity-10 absolute -top-12 left-0 select-none hidden sm:block uppercase">
            PROJECTS
          </h2>
          <h2 className="projects-header-element text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-mono relative">
            <span className="text-primary/50 mr-4 font-normal">03.</span>
            Proyectos <span className="text-white/20 ml-2">/ Mis Trabajos</span>
          </h2>
        </div>

        <div className="filter-buttons flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <div key={category} className="category-btn">
              <button
                onClick={() => handleCategoryChange(category)}
                disabled={isAnimating}
                className={`px-8 py-2.5 rounded-full text-[10px] font-black tracking-[0.2em] uppercase transition-all duration-500 border ${
                  activeCategory === category
                    ? 'bg-primary border-primary text-black shadow-[0_0_30px_rgba(119,255,150,0.2)] scale-110'
                    : 'bg-transparent border-white/5 text-white/30 hover:border-white/20 hover:text-white'
                }`}
              >
                {category}
              </button>
            </div>
          ))}
        </div>

        <div ref={gridRef} className="projects-grid grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}
