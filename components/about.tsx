'use client'

import { useEffect, useRef, useState } from 'react'
import { Card } from '@/components/ui/card'
import { gsap, useGSAP } from '@/lib/gsap'

const TYPING_SPEED = 40
const LINE_PAUSE = 600

const terminalLines = [
  { type: 'command', text: '$ whoami' },
  { type: 'output', text: '¡Hola! Soy Alex Vicente López, un estudiante de Desarrollo de Aplicaciones Web apasionado por la tecnología y el diseño minimalista.' },
  { type: 'command', text: '$ cat experience.txt' },
  { type: 'output', text: 'Mi formación en Sistemas Microinformáticos y Redes Locales me dio una base sólida que ahora estoy expandiendo con el Desarrollo de Aplicaciones Web.' },
  { type: 'output', text: 'Busco la armonía perfecta entre la robustez del código y la elegancia visual, utilizando herramientas como la fotografía creativa para enriquecer mi visión digital.' },
]

export function About() {
  const terminalRef = useRef<HTMLDivElement>(null)
  const [visibleLines, setVisibleLines] = useState(0)
  const [typingText, setTypingText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [hasStarted, setHasStarted] = useState(false)
  const lineIndexRef = useRef(0)
  const charIndexRef = useRef(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const typeNextChar = () => {
    if (lineIndexRef.current >= terminalLines.length) {
      setIsTyping(false)
      return
    }

    const line = terminalLines[lineIndexRef.current]

    if (charIndexRef.current === 0) {
      setVisibleLines(prev => Math.max(prev, lineIndexRef.current + 1))
    }

    if (charIndexRef.current < line.text.length) {
      setTypingText(prev => {
        const lines = prev.split('\n')
        if (lines.length <= lineIndexRef.current) {
          lines.push('')
        }
        lines[lineIndexRef.current] = line.text.substring(0, charIndexRef.current + 1)
        return lines.join('\n')
      })
      charIndexRef.current++
      timeoutRef.current = setTimeout(typeNextChar, TYPING_SPEED)
    } else {
      charIndexRef.current = 0
      lineIndexRef.current++
      timeoutRef.current = setTimeout(typeNextChar, LINE_PAUSE)
    }
  }

  useEffect(() => {
    if (!hasStarted) return

    setIsTyping(true)
    lineIndexRef.current = 0
    charIndexRef.current = 0
    setVisibleLines(0)
    setTypingText('')

    timeoutRef.current = setTimeout(typeNextChar, 300)

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [hasStarted])

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (terminalRef.current) {
      observer.observe(terminalRef.current)
    }

    return () => observer.disconnect()
  }, [])

  useGSAP(() => {
    const terminal = terminalRef.current
    if (!terminal) return

    const moveTerminal = (e: MouseEvent) => {
      const { left, top, width, height } = terminal.getBoundingClientRect()
      const x = (e.clientX - left) / width - 0.5
      const y = (e.clientY - top) / height - 0.5

      gsap.to(terminal, {
        rotateY: x * 10,
        rotateX: -y * 10,
        x: x * 20,
        y: y * 20,
        duration: 1.5,
        ease: 'power3.out',
        transformPerspective: 1200,
      })
    }

    const resetTerminal = () => {
      gsap.to(terminal, {
        rotateY: 0,
        rotateX: 0,
        x: 0,
        y: 0,
        duration: 2,
        ease: 'elastic.out(1, 0.3)',
      })
    }

    terminal.addEventListener('mousemove', moveTerminal)
    terminal.addEventListener('mouseleave', resetTerminal)

    return () => {
      terminal.removeEventListener('mousemove', moveTerminal)
      terminal.removeEventListener('mouseleave', resetTerminal)
    }
  }, { scope: terminalRef })

  return (
    <section
      id="about"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#050505] relative overflow-hidden text-white section-padding"
    >
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-20">
          <h2 className="text-4xl sm:text-7xl md:text-8xl 2xl:text-9xl font-black tracking-tighter opacity-[0.03] absolute -top-16 left-0 select-none hidden sm:block uppercase">
            WHOAMI
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-mono relative">
            <span className="text-primary/50 mr-4 font-normal">01.</span>
            Sobre Mí <span className="text-white/20 ml-2">/ Background</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-12 space-y-12">
            <div
              ref={terminalRef}
              className="w-full bg-[#0a0a0a]/90 border border-white/10 rounded-[2rem] overflow-hidden shadow-[0_30px_100px_-20px_rgba(0,0,0,0.8)] backdrop-blur-2xl transition-all duration-300 will-change-transform"
            >
              <div className="flex items-center gap-2 px-6 py-4 bg-[#111111]/80 border-b border-white/5">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                </div>
                <span className="ml-4 text-xs font-mono text-white/30 tracking-[0.2em] uppercase">
                  ~/bio/about_me.sh
                </span>
              </div>

              <div className="p-10 md:p-14 text-left font-mono text-sm sm:text-base overflow-x-auto leading-relaxed space-y-8 min-h-[350px]">
                {terminalLines.map((line, i) => {
                  if (i >= visibleLines) return null
                  const isCurrentLine = i === lineIndexRef.current && isTyping
                  const isCommand = line.type === 'command'

                  return (
                    <div key={i} className={isCommand ? 'space-y-4' : 'space-y-6'}>
                      {isCommand ? (
                        <p className="text-white/40 flex items-center gap-3">
                          <span className="text-primary font-bold">alex@portfolio:</span>
                          <span className="text-accent">~</span>
                          <span className="text-white/80">
                            {isCurrentLine
                              ? line.text.substring(0, charIndexRef.current)
                              : line.text}
                            {isCurrentLine && (
                              <span className="inline-block w-[8px] h-[1.1em] bg-primary align-middle ml-2 animate-pulse shadow-[0_0_10px_rgba(119,255,150,0.8)]" />
                            )}
                          </span>
                        </p>
                      ) : (
                        <p className="text-white/90 pl-4 border-l-2 border-white/5 text-pretty text-lg md:text-xl font-medium tracking-tight">
                          {isCurrentLine
                            ? line.text.substring(0, charIndexRef.current)
                            : line.text}
                          {isCurrentLine && (
                            <span className="inline-block w-[8px] h-[1.1em] bg-primary align-middle ml-2 animate-pulse shadow-[0_0_10px_rgba(119,255,150,0.8)]" />
                          )}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <div 
                data-cursor-hover
                className="inline-flex items-center gap-5 px-10 py-5 bg-[#0a0a0a] border border-primary/20 rounded-2xl hover:border-primary/50 transition-all duration-700 cursor-pointer group shadow-[0_20px_50px_-15px_rgba(119,255,150,0.05)] hover:shadow-[0_20px_60px_-10px_rgba(119,255,150,0.15)] hover:-translate-y-1"
              >
                <div className="relative">
                  <div className="w-3 h-3 bg-primary rounded-full animate-ping absolute inset-0 opacity-40" />
                  <div className="w-3 h-3 bg-primary rounded-full shadow-[0_0_15px_rgba(119,255,150,1)] relative z-10" />
                </div>
                <span className="text-primary font-mono text-sm font-black tracking-[0.2em] uppercase">
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
