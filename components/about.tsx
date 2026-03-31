'use client'

import { useRef } from 'react'
import { Card } from '@/components/ui/card'
import { gsap, useGSAP } from '@/lib/gsap'

export function About() {
  const containerRef = useRef<HTMLDivElement>(null)
  const terminalRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef)
    
    // Initial entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none'
      }
    })

    tl.fromTo(q('.about-title'), { autoAlpha: 0.01, x: -30 }, { autoAlpha: 1, x: 0, duration: 1 })
      .fromTo(terminalRef.current, { autoAlpha: 0, scale: 0.95, y: 30 }, { autoAlpha: 1, scale: 1, y: 0, duration: 1, clearProps: 'all' }, '-=0.5')
      .fromTo(q('.about-status'), { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8, clearProps: 'all' }, '-=0.3')

    // Terminal typing-like staggered entrance with separate fromTo for reliability
    gsap.fromTo(q('.terminal-line'), 
      { autoAlpha: 0.01, x: -20 },
      {
        autoAlpha: 1,
        x: 0,
        stagger: 0.3,
        duration: 0.8,
        scrollTrigger: {
          trigger: terminalRef.current,
          start: 'top 75%'
        },
        clearProps: 'all'
      }
    )
  }, { scope: containerRef })

  return (
    <section
      id="about"
      ref={containerRef}
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden text-white"
    >
      {/* Background decoration */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter opacity-10 absolute -top-12 left-0 select-none hidden sm:block uppercase">
            WHOAMI
          </h2>
          <h2 className="about-title text-3xl sm:text-4xl md:text-5xl font-bold text-primary font-mono relative">
            <span className="text-primary/50 mr-4 font-normal">01.</span>
            Sobre Mí <span className="text-white/20 ml-2">/ Background</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-12 space-y-8">
            <div
              ref={terminalRef}
              className="w-full bg-[#111111]/80 border border-white/10 rounded-xl overflow-hidden shadow-2xl backdrop-blur-xl"
            >
              {/* Window controls */}
              <div className="flex items-center gap-2 px-4 py-3 bg-[#181818] border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-3 text-xs font-mono text-white/40 tracking-wider">
                  ~/bio/about_me.sh
                </span>
              </div>

              {/* Code content */}
              <div className="p-8 text-left font-mono text-sm sm:text-base overflow-x-auto leading-relaxed space-y-8">
                <div className="terminal-line space-y-3">
                  <p className="text-white/40 flex items-center gap-2">
                    <span className="text-primary">alex@portfolio:</span>
                    <span className="text-accent">~</span>$ whoami
                  </p>
                  <p className="text-white/90 pl-2 text-pretty text-lg">
                    ¡Hola! Soy{' '}
                    <span className="text-primary font-bold">
                      Alex Vicente López
                    </span>
                    , un estudiante de Desarrollo de Aplicaciones Web apasionado por la tecnología y el diseño minimalista.
                  </p>
                </div>

                <div className="terminal-line space-y-4">
                  <p className="text-white/40 flex items-center gap-2">
                    <span className="text-primary">alex@portfolio:</span>
                    <span className="text-accent">~</span>$ cat experience.txt
                  </p>
                  <div className="pl-2 space-y-4 text-white/70 text-pretty">
                    <p>
                      Mi formación en Sistemas Microinformáticos y Redes Locales me dio una base sólida que ahora estoy expandiendo con el Desarrollo de Aplicaciones Web.
                    </p>
                    <p>
                      Busco la armonía perfecta entre la robustez del código y la elegancia visual, utilizando herramientas como la fotografía creativa para enriquecer mi visión digital.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-status flex justify-center">
              <div className="inline-flex items-center gap-4 px-8 py-4 bg-[#111111] border border-primary/30 rounded-2xl hover:bg-primary/5 transition-all duration-500 cursor-pointer group shadow-[0_0_30px_rgba(119,255,150,0.05)] hover:shadow-[0_0_40px_rgba(119,255,150,0.15)] hover:scale-105 active:scale-95">
                <div className="w-3 h-3 bg-primary rounded-full animate-pulse shadow-[0_0_10px_rgba(119,255,150,1)]" />
                <span className="text-primary font-mono text-sm font-bold tracking-wider uppercase">
                  Disponible para nuevos proyectos
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
