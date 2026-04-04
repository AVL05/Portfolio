'use client'

import { useRef } from 'react'
import { Github, Linkedin, ArrowDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

const TypewriterText = ({
  text,
  delay = 0,
}: {
  text: string
  delay?: number
}) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isStarted, setIsStarted] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 530)
    return () => clearInterval(cursorInterval)
  }, [])

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setIsStarted(true)
    }, delay)
    return () => clearTimeout(startTimeout)
  }, [delay, text])

  useEffect(() => {
    if (!isStarted) return

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText((prev) => prev + text[currentIndex])
        setCurrentIndex((prev) => prev + 1)
      }, 70)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text, isStarted])

  return (
    <span className="relative">
      {displayText}
      <span
        className="inline-block w-[3px] h-[1.1em] bg-primary align-middle ml-2 shadow-[0_0_10px_rgba(119,255,150,0.8)]"
        style={{ opacity: showCursor ? 1 : 0, transition: 'opacity 0.1s' }}
      />
    </span>
  )
}

const FloatingCircles = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const circles = gsap.utils.toArray('.floating-circle')
    
    circles.forEach((circle: any, i: number) => {
      gsap.set(circle, { willChange: 'transform' })
      
      // Infinite floating movement
      gsap.to(circle, {
        x: 'random(-150, 150)',
        y: 'random(-150, 150)',
        z: 'random(-100, 100)',
        rotation: 'random(-15, 15)',
        duration: 'random(15, 25)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut',
        delay: i * 0.5
      })
    })
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden pointer-events-none opacity-20" style={{ perspective: '1000px' }}>
      <div className="floating-circle absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      <div className="floating-circle absolute bottom-1/4 right-1/4 w-80 h-80 bg-accent/20 rounded-full blur-[120px]" />
    </div>
  )
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef)
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    // Set initial states for 3D entrance
    gsap.set(q('.hero-number'), { 
      opacity: 0, 
      x: -100,
      rotateY: -60, 
      transformPerspective: 1000, 
      willChange: 'transform, opacity' 
    })
    gsap.set(q('.hero-hi'), { 
      opacity: 0, 
      y: 40,
      rotateX: -90, 
      transformPerspective: 1000, 
      willChange: 'transform, opacity' 
    })
    gsap.set(q('.hero-name'), { 
      opacity: 0, 
      scale: 0.8,
      z: -200, 
      rotateX: 20,
      transformPerspective: 1200, 
      willChange: 'transform, opacity' 
    })
    gsap.set(q('.hero-subtitle'), { 
      opacity: 0, 
      x: 50,
      rotateY: 45, 
      transformPerspective: 1000, 
      willChange: 'transform, opacity' 
    })
    gsap.set(q('.hero-description'), { 
      opacity: 0, 
      y: 30,
      rotateX: 30, 
      transformPerspective: 1000, 
      willChange: 'transform, opacity' 
    })
    gsap.set(q('.social-btn'), { 
      opacity: 0, 
      y: 20,
      scale: 0.9,
      transformPerspective: 1000, 
      willChange: 'transform, opacity' 
    })
    gsap.set(q('.scroll-btn'), { 
      opacity: 0, 
      y: 50,
      willChange: 'transform, opacity' 
    })

    // Animation Timeline
    tl.to(q('.hero-number'), { 
      opacity: 0.1, 
      x: 0,
      rotateY: 0, 
      duration: 1.8,
      ease: 'power4.out'
    }, 0.2)
    .to(q('.hero-hi'), { 
      opacity: 1, 
      y: 0,
      rotateX: 0, 
      duration: 1.2
    }, 0.5)
    .to(q('.hero-name'), { 
      opacity: 1, 
      scale: 1,
      z: 0, 
      rotateX: 0,
      duration: 1.6,
      ease: 'elastic.out(1, 0.75)'
    }, 0.7)
    .to(q('.hero-subtitle'), { 
      opacity: 1, 
      x: 0,
      rotateY: 0, 
      duration: 1.4
    }, 0.9)
    .to(q('.hero-description'), { 
      opacity: 1, 
      y: 0,
      rotateX: 0, 
      duration: 1.2
    }, 1.1)
    .to(q('.social-btn'), {
      opacity: 1,
      y: 0,
      scale: 1,
      stagger: 0.15,
      duration: 1,
      ease: 'back.out(2)',
    }, 1.3)
    .to(q('.scroll-btn'), { 
      opacity: 1, 
      y: 0,
      duration: 1.5,
      ease: 'power3.out'
    }, 2)
  }, { scope: containerRef })

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden font-sans"
      style={{ perspective: '1200px' }}
    >
      <FloatingCircles />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-start justify-center z-10 space-y-8 sm:space-y-12">
        <div className="flex flex-col items-start gap-2">
          <span className="hero-hi text-primary font-mono text-lg sm:text-xl tracking-widest uppercase">
            Hola Mundo, mi nombre es
          </span>
          <div className="flex items-baseline gap-4 sm:gap-6">
            <span className="hero-number text-white/5 font-black text-6xl sm:text-7xl md:text-8xl 2xl:text-9xl select-none leading-none">
              00.
            </span>
            <h1 className="hero-name text-4xl sm:text-6xl md:text-7xl lg:text-8xl 2xl:text-9xl font-black text-white tracking-tighter leading-none">
              <TypewriterText text="Alex Vicente." delay={1000} />
            </h1>
          </div>
        </div>

        <div className="space-y-6 max-w-3xl">
          <h2 className="hero-subtitle text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white/40 tracking-tight leading-tight">
            Diseño experiencias digitales <span className="text-white/80">que impactan.</span>
          </h2>

          <p className="hero-description text-lg sm:text-xl text-white/50 max-w-2xl text-pretty leading-relaxed font-medium">
            Estudiante de <span className="text-primary">Desarrollo Web</span> apasionado por la creación de aplicaciones robustas y el diseño visual minimalista. Combinando técnica y creatividad para resolver problemas complejos.
          </p>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-4">
            <a
              href="https://github.com/AVL05"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn group px-6 py-3 bg-white text-black font-bold rounded-xl flex items-center gap-3 hover:bg-primary transition-all duration-300 hover:shadow-[0_0_30px_rgba(119,255,150,0.5)]"
            >
              <Github className="h-5 w-5" />
              <span>GitHub</span>
            </a>
            <a
              href="https://www.linkedin.com/in/alex-vicente-lopez/"
              target="_blank"
              rel="noopener noreferrer"
              className="social-btn group px-6 py-3 bg-transparent border-2 border-white/10 text-white font-bold rounded-xl flex items-center gap-3 hover:border-primary/50 hover:bg-white/5 transition-all duration-300"
            >
              <Linkedin className="h-5 w-5 text-[#0077b5]" />
              <span>LinkedIn</span>
            </a>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="scroll-btn absolute bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/20 hover:text-primary transition-all duration-500 group"
      >
        <span className="text-xs font-black uppercase tracking-[0.3em] font-mono group-hover:tracking-[0.5em] transition-all">
          Scroll Down
        </span>
        <div className="p-2 border border-white/10 rounded-full group-hover:border-primary group-hover:scale-110 transition-all">
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </div>
      </a>
    </section>
  )
}
