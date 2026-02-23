'use client'

import { Card } from '@/components/ui/card'
import {
  scrollRevealVariants,
  staggerChildrenVariants,
  useScrollReveal,
} from '@/hooks/useScrollReveal'
import { motion } from 'framer-motion'
import { Code2, Languages, Palette } from 'lucide-react'

const skillCategories = [
  {
    icon: Code2,
    title: 'Tecnologías',
    color: 'from-blue-500 to-cyan-500',
    bgColor: 'bg-blue-500/10',
    skills: [
      { name: 'HTML', level: '' },
      { name: 'CSS', level: '' },
      { name: 'JavaScript', level: '' },
      { name: 'React', level: '' },
      { name: 'Vue', level: '' },
      { name: 'Tailwind', level: '' },
      { name: 'Bootstrap', level: '' },
      { name: 'PHP', level: '' },
      { name: 'Laravel', level: '' },
    ],
  },
  {
    icon: Palette,
    title: 'Adobe Creative Suite',
    color: 'from-pink-500 to-purple-500',
    bgColor: 'bg-pink-500/10',
    skills: [
      { name: 'Photoshop', level: 'Edición y retoque fotográfico' },
      { name: 'Illustrator', level: 'Diseño vectorial' },
      { name: 'InDesign', level: 'Maquetación editorial' },
      { name: 'Premiere', level: 'Edición de vídeo' },
      { name: 'Lightroom', level: 'Edición y retoque fotográfico' },
    ],
  },
  {
    icon: Languages,
    title: 'Idiomas',
    color: 'from-green-500 to-emerald-500',
    bgColor: 'bg-green-500/10',
    skills: [
      { name: 'Español', level: 'Nativo' },
      { name: 'Valenciano', level: 'Nativo' },
      { name: 'Inglés', level: 'Intermedio' },
    ],
  },
]

export function Skills() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section
      id="skills"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30 relative overflow-hidden"
    >
      {/* Background decorations */}
      <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-accent/5 to-secondary/5" />
      <motion.div
        className="absolute top-0 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        animate={{
          y: [0, -30, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 6, repeat: Infinity }}
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
            {'< Habilidades />'}
          </motion.h2>
          <motion.p
            className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed px-2"
            variants={scrollRevealVariants}
          >
            Tecnologías, herramientas e idiomas que domino para crear soluciones
            digitales completas
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerChildrenVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div key={category.title} variants={scrollRevealVariants}>
              <Card className="p-0 h-full bg-[#0d1117] border-primary/20 hover:border-primary/50 transition-all duration-500 font-mono shadow-xl overflow-hidden">
                {/* Terminal Header */}
                <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-primary/20">
                  <category.icon className="h-4 w-4 text-primary" />
                  <span className="text-xs font-mono text-muted-foreground/90 font-bold uppercase tracking-wider flex-1">
                    {category.title}
                  </span>
                </div>

                <div className="p-5 sm:p-6 space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      className="flex flex-col space-y-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }
                      }
                      transition={{
                        delay: categoryIndex * 0.2 + skillIndex * 0.1 + 0.3,
                      }}
                    >
                      <div className="flex items-center gap-2">
                        <span className="text-green-400">▹</span>
                        <h4 className="font-bold text-foreground group-hover:text-primary transition-colors">
                          {skill.name}
                        </h4>
                      </div>
                      {skill.level && (
                        <p className="text-sm text-muted-foreground pl-5 text-pretty leading-relaxed">
                          {skill.level}
                        </p>
                      )}
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
