'use client'

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import {
  scrollRevealVariants,
  staggerChildrenVariants,
  useScrollReveal,
} from '@/hooks/useScrollReveal'
import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, Github } from 'lucide-react'
import Image from 'next/image'
import { useState } from 'react'

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
  const { ref, isInView } = useScrollReveal()
  const [activeCategory, setActiveCategory] = useState('Todos')

  const categories = ['Todos', 'Diseño Gráfico', 'Desarrollo Web']

  const filteredProjects = projects.filter((project) => {
    if (activeCategory === 'Todos') return true
    return project.category === activeCategory
  })

  // Función para determinar si el enlace debe abrir en nueva pestaña
  const shouldOpenInNewTab = (link: string) => {
    return link.startsWith('http')
  }

  // Función para obtener el texto del botón según el tipo de enlace
  const getButtonText = (link: string) => {
    if (link.includes('.pdf')) return 'Ver PDF'
    if (link.includes('.jpg') || link.includes('.png')) return 'Ver Imagen'
    if (link.startsWith('http')) return 'Ver Sitio'
    return 'Ver Proyecto'
  }

  // Función para obtener color basado en categoría
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Desarrollo Web':
        return 'from-blue-500 to-cyan-500'
      case 'Diseño Gráfico':
        return 'from-orange-500 to-red-500'
      case 'Fotografía':
        return 'from-green-500 to-emerald-500'
      default:
        return 'from-gray-500 to-gray-600'
    }
  }

  return (
    <section
      id="projects"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden"
    >
      {/* Background decorations - Grid Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#2a3341_1px,transparent_1px),linear-gradient(to_bottom,#2a3341_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20" />
      <div className="absolute inset-0 bg-linear-to-br from-background via-background/90 to-background" />
      <motion.div
        className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/10 rounded-full blur-[100px]"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
      />

      <div className="max-w-6xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="space-y-4 mb-12 text-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerChildrenVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-balance text-primary font-mono tracking-tight"
            variants={scrollRevealVariants}
          >
            {'< Proyectos />'}
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed px-2"
            variants={scrollRevealVariants}
          >
            Una selección de mis trabajos recientes en desarrollo web, diseño
            gráfico y fotografía
          </motion.p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ delay: 0.2 }}
        >
          {categories.map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? 'default' : 'outline'}
              onClick={() => setActiveCategory(category)}
              className={`transition-all duration-300 ${
                activeCategory === category
                  ? 'shadow-lg scale-105'
                  : 'hover:bg-primary/10'
              }`}
            >
              {category}
            </Button>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          variants={staggerChildrenVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.div
                key={project.title}
                variants={scrollRevealVariants}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="overflow-hidden bg-[#0d1117] border-primary/20 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(119,255,150,0.15)] transition-all duration-500 group h-full flex flex-col rounded-xl backdrop-blur-md">
                  {/* OS Window Header */}
                  <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-primary/20">
                    <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                    <span className="ml-2 text-xs font-mono text-muted-foreground/70 truncate flex-1">
                      ~/projects/
                      {project.category.toLowerCase().replace(/ /g, '-')}/
                      {project.title.toLowerCase().replace(/ /g, '-')}.tsx
                    </span>
                  </div>

                  {/* Image container with enhanced effects */}
                  <div
                    className={`relative aspect-video overflow-hidden bg-black/50 group-hover:bg-black/80 transition-colors duration-500 ${
                      smallImageProjects.includes(project.title)
                        ? 'flex items-center justify-center'
                        : ''
                    }`}
                  >
                    {/* Overlay gradient - neutral */}
                    <motion.div className="absolute inset-0 bg-background/0 group-hover:bg-background/20 transition-colors duration-500 z-10" />

                    {/* Image */}
                    <Image
                      src={project.image || '/placeholder.svg'}
                      alt={project.title}
                      fill
                      className={`transition-all duration-500 relative z-0 ${
                        smallImageProjects.includes(project.title)
                          ? 'object-contain p-8'
                          : 'object-cover'
                      }`}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />

                    {/* Category badge */}
                    <motion.div
                      className="absolute top-4 right-4 z-20"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <Badge
                        variant="secondary"
                        className={`bg-linear-to-r ${getCategoryColor(
                          project.category
                        )} text-white border-0 backdrop-blur-sm font-medium px-3 py-1`}
                      >
                        {project.category}
                      </Badge>
                    </motion.div>

                    {/* Hover overlay */}
                    <motion.div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30 flex items-center justify-center">
                      <motion.div
                        className="text-white text-center"
                        initial={{ y: 20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.1 }}
                      >
                        <ExternalLink className="h-8 w-8 mx-auto mb-2" />
                        <p className="text-sm font-medium">Ver Proyecto</p>
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-4 grow flex flex-col font-mono text-sm sm:text-base">
                    <motion.h3
                      className="text-xl sm:text-2xl font-bold text-primary transition-colors duration-300"
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={{ delay: 0.4 }}
                    >
                      {'< '}
                      {project.title}
                      {' />'}
                    </motion.h3>

                    <motion.div
                      className="text-muted-foreground text-pretty leading-relaxed grow"
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={{ delay: 0.5 }}
                    >
                      {project.description}
                    </motion.div>

                    {/* Technologies as Array */}
                    <motion.div
                      className="flex flex-wrap gap-2 pl-4 ml-2"
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={{ delay: 0.6 }}
                    >
                      <div className="w-full text-foreground/70 mb-1">
                        <span className="text-[#e2c08d]">stack</span>: [
                      </div>
                      {project.technologies.map((tech, techIndex) => (
                        <motion.span
                          key={tech}
                          className="text-green-400 bg-primary/5 px-2 py-0.5 rounded border border-primary/20"
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={
                            isInView
                              ? { opacity: 1, scale: 1 }
                              : { opacity: 0, scale: 0.8 }
                          }
                          transition={{
                            delay: 0.7 + techIndex * 0.05,
                          }}
                        >
                          "{tech}"
                          {techIndex < project.technologies.length - 1
                            ? ','
                            : ''}
                        </motion.span>
                      ))}
                      <div className="w-full text-foreground/70 mt-1">],</div>
                    </motion.div>

                    {/* Action button */}
                    <motion.div
                      className="pt-4 pl-4 ml-2 mt-auto"
                      initial={{ opacity: 0, y: 10 }}
                      animate={
                        isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }
                      }
                      transition={{ delay: 0.8 }}
                    >
                      <div className="flex flex-wrap gap-3">
                        <Button
                          variant="default"
                          size="sm"
                          asChild
                          className="font-mono bg-primary text-[#0d1117] hover:bg-primary/80 hover:shadow-[0_0_15px_rgba(119,255,150,0.4)] transition-all duration-300"
                        >
                          <a
                            href={project.link}
                            target={
                              shouldOpenInNewTab(project.link)
                                ? '_blank'
                                : '_self'
                            }
                            rel={
                              shouldOpenInNewTab(project.link)
                                ? 'noopener noreferrer'
                                : undefined
                            }
                          >
                            <div className="flex items-center">
                              <span className="mr-2">{'>'}</span>
                              {getButtonText(project.link).replace(
                                'Ver ',
                                'run '
                              )}
                            </div>
                          </a>
                        </Button>

                        {project.github && (
                          <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="font-mono bg-transparent text-primary border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300"
                          >
                            <a
                              href={project.github}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <div className="flex items-center">
                                <Github className="h-4 w-4 mr-2" />
                                view_source
                              </div>
                            </a>
                          </Button>
                        )}
                      </div>
                    </motion.div>
                    {/* Trailing removed */}
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  )
}
