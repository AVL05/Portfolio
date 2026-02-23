'use client'

import { Card } from '@/components/ui/card'
import {
  scrollRevealVariants,
  staggerChildrenVariants,
  useScrollReveal,
} from '@/hooks/useScrollReveal'
import { motion } from 'framer-motion'

export function About() {
  const { ref, isInView } = useScrollReveal()

  return (
    <section
      id="about"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-linear-to-br from-primary/5 to-accent/5 opacity-50" />
      <motion.div
        className="absolute top-20 -right-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-20 -left-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
        animate={{
          scale: [1.2, 1, 1.2],
          opacity: [0.6, 0.3, 0.6],
        }}
        transition={{ duration: 6, repeat: Infinity }}
      />

      <div className="max-w-4xl mx-auto relative z-10" ref={ref}>
        <motion.div
          className="space-y-6 text-center"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={staggerChildrenVariants}
        >
          <motion.h2
            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-balance text-primary px-2 font-mono tracking-tight"
            variants={scrollRevealVariants}
          >
            Conoce al Desarrollador, No Solo el Código
          </motion.h2>

          <motion.div
            className="w-full max-w-2xl mx-auto mt-8 bg-[#0d1117] border border-primary/20 rounded-xl overflow-hidden shadow-2xl backdrop-blur-md"
            variants={scrollRevealVariants}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
          >
            {/* Window controls */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-primary/20">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-2 text-xs font-mono text-muted-foreground/70">
                about.ts
              </span>
            </div>

            {/* Code content */}
            <div className="p-6 text-left font-mono text-sm sm:text-base overflow-x-auto leading-relaxed space-y-4">
              <p className="text-muted-foreground flex items-center gap-2">
                <span className="text-green-400">root@portfolio:~$</span> whoami
              </p>
              <p className="text-foreground pl-2 text-pretty">
                ¡Hola! Soy{' '}
                <span className="text-primary font-bold">
                  Alex Vicente López
                </span>
                , un estudiande de Desarrollo de Aplicaciones Web.
              </p>

              <p className="text-muted-foreground flex items-center gap-2 mt-4">
                <span className="text-green-400">root@portfolio:~$</span> cat
                background.txt
              </p>
              <div className="pl-2 space-y-2 text-foreground text-pretty">
                <p>
                  Mi camino tecnológico comenzó con Sistemas Microinformáticos y
                  Redes Locales, y actualmente me estoy especializando en
                  Desarrollo de Aplicaciones Web.
                </p>
                <p>
                  Mi punto fuerte es combinar la lógica del código con mi pasión
                  por el diseño digital y la fotografía creativa. Esto me
                  permite crear soluciones que no solo funcionan perfectamente,
                  sino que también ofrecen una experiencia visual increíble.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div className="pt-8" variants={scrollRevealVariants}>
            <Card className="inline-block px-6 py-3 bg-primary/10 border border-primary/40 backdrop-blur-md hover:bg-primary/20 transition-colors cursor-pointer group shadow-[0_0_15px_rgba(119,255,150,0.1)] hover:shadow-[0_0_25px_rgba(119,255,150,0.2)]">
              <p className="text-primary font-mono text-sm flex items-center gap-2">
                <span className="text-green-400 animate-pulse">●</span>
                <span className="group-hover:text-green-300 transition-colors">
                  Disponible para nuevos proyectos
                </span>
              </p>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
