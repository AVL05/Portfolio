'use client'

import { useEffect, useRef, useState } from 'react'
import { Card } from '@/components/ui/card'

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

  return (
    <section
      id="about"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden text-white"
    >
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-16">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter opacity-10 absolute -top-12 left-0 select-none hidden sm:block uppercase">
            WHOAMI
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary font-mono relative">
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
              <div className="flex items-center gap-2 px-4 py-3 bg-[#181818] border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                <span className="ml-3 text-xs font-mono text-white/40 tracking-wider">
                  ~/bio/about_me.sh
                </span>
              </div>

              <div className="p-8 text-left font-mono text-sm sm:text-base overflow-x-auto leading-relaxed space-y-6 min-h-[280px]">
                {terminalLines.map((line, i) => {
                  if (i >= visibleLines) return null
                  const isCurrentLine = i === lineIndexRef.current && isTyping
                  const isCommand = line.type === 'command'

                  return (
                    <div key={i} className={isCommand ? 'space-y-3' : 'space-y-4'}>
                      {isCommand ? (
                        <p className="text-white/40 flex items-center gap-2">
                          <span className="text-primary">alex@portfolio:</span>
                          <span className="text-accent">~</span>
                          <span>
                            {isCurrentLine
                              ? line.text.substring(0, charIndexRef.current)
                              : line.text}
                            {isCurrentLine && (
                              <span className="inline-block w-[6px] h-[1.1em] bg-primary align-middle ml-1 animate-pulse" />
                            )}
                          </span>
                        </p>
                      ) : (
                        <p className="text-white/90 pl-2 text-pretty text-lg">
                          {isCurrentLine
                            ? line.text.substring(0, charIndexRef.current)
                            : line.text}
                          {isCurrentLine && (
                            <span className="inline-block w-[6px] h-[1.1em] bg-primary align-middle ml-1 animate-pulse" />
                          )}
                        </p>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="flex justify-center">
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
