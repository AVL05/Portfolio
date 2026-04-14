'use client'

import { useRef } from 'react'
import { ArrowDown, Terminal, Code2, Sparkles } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { gsap, useGSAP } from '@/lib/gsap'
import { useLanguage } from '@/lib/language-context'

const MagneticLink = ({ children, href, className = "" }: { children: React.ReactNode, href: string, className?: string }) => {
  const linkRef = useRef<HTMLAnchorElement>(null)

  useGSAP(() => {
    const link = linkRef.current
    if (!link) return

    const xTo = gsap.quickTo(link, "x", { duration: 1, ease: "elastic.out(1, 0.3)" })
    const yTo = gsap.quickTo(link, "y", { duration: 1, ease: "elastic.out(1, 0.3)" })

    const mouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = link.getBoundingClientRect()
      const x = clientX - (left + width / 2)
      const y = clientY - (top + height / 2)
      xTo(x * 0.35)
      yTo(y * 0.35)
    }

    const mouseLeave = () => {
      xTo(0)
      yTo(0)
    }

    link.addEventListener("mousemove", mouseMove)
    link.addEventListener("mouseleave", mouseLeave)

    return () => {
      link.removeEventListener("mousemove", mouseMove)
      link.removeEventListener("mouseleave", mouseLeave)
    }
  }, { scope: linkRef })

  return (
    <a
      ref={linkRef}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-block translate-z-0 ${className}`}
    >
      {children}
    </a>
  )
}

export function Hero() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef)
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    // entrance animation
    tl.fromTo(q('.reveal-char'),
      { y: 100, opacity: 0, rotateX: -90 },
      { y: 0, opacity: 1, rotateX: 0, stagger: 0.05, duration: 2, ease: 'expo.out' }
    )
    .fromTo(q('.hero-badge'),
      { opacity: 0, scale: 0.8, y: 20 },
      { opacity: 1, scale: 1, y: 0, duration: 1.5 },
      "-=1.5"
    )
    .fromTo(q('.hero-description'),
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1.5 },
      "-=1.2"
    )
    .fromTo(q('.social-magnetic'),
      { opacity: 0, y: 40, stagger: 0.1 },
      { opacity: 1, y: 0, duration: 1.2, ease: 'back.out(2)' },
      "-=1.0"
    )
    .fromTo(q('.scroll-indicator'),
      { opacity: 0 },
      { opacity: 1, duration: 1.5 },
      "-=0.5"
    )

    // Grid parallax
    const moveGrid = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const x = (clientX / window.innerWidth - 0.5) * 50
      const y = (clientY / window.innerHeight - 0.5) * 50
      gsap.to(gridRef.current, {
        x: x,
        y: y,
        duration: 2,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', moveGrid)
    return () => window.removeEventListener('mousemove', moveGrid)
  }, { scope: containerRef })

  const name = "Alex Vicente"

  return (
    <section
      id="hero"
      ref={containerRef}
      className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden"
    >
      {/* Background elements */}
      <div
        ref={gridRef}
        className="absolute inset-[-100px] bg-grid opacity-30 pointer-events-none"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent via-background/50 to-background pointer-events-none" />

      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/10 rounded-full blur-[160px] pointer-events-none opacity-50" />
      <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-accent/10 rounded-full blur-[120px] pointer-events-none opacity-30" />

      <div className="w-full max-w-7xl mx-auto z-10 flex flex-col items-center text-center space-y-12">

        {/* Status Badge */}
        <div className="hero-badge flex items-center gap-3 px-6 py-2 dev-border rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase text-primary/80">
            {t.hero.status}
          </span>
        </div>

        {/* Main Title */}
        <div className="space-y-4">
          <div className="flex flex-wrap justify-center overflow-hidden py-4">
            {name.split('').map((char, i) => (
              <span
  key={i}
  className="reveal-char inline-block text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-foreground tracking-tighter leading-none"
  style={{ minWidth: char === ' ' ? '0.25em' : 'auto' }}
>
                {char}
              </span>
            ))}
          </div>

          <h2 className="hero-description text-lg sm:text-2xl md:text-4xl text-foreground/50 font-medium tracking-tight max-w-4xl text-balance">
            {t.hero.description}
          </h2>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-8">
          <MagneticLink href="https://github.com/AVL05" className="social-magnetic w-full sm:w-auto">
            <div className="group flex items-center justify-center gap-4 px-10 py-5 bg-foreground text-background font-bold rounded-2xl hover:bg-primary hover:text-primary-foreground transition-all duration-500 shadow-xl">
              <FaGithub className="h-5 w-5" />
              <span className="text-sm tracking-tight">GitHub</span>
            </div>
          </MagneticLink>

          <MagneticLink href="https://www.linkedin.com/in/alex-vicente-lopez/" className="social-magnetic w-full sm:w-auto">
            <div className="group flex items-center justify-center gap-4 px-10 py-5 bg-card border border-border text-foreground font-bold rounded-2xl hover:border-primary/50 transition-all duration-500">
              <FaLinkedin className="h-5 w-5 text-accent" />
              <span className="text-sm tracking-tight text-foreground/70">LinkedIn</span>
            </div>
          </MagneticLink>
        </div>

        {/* Tech Indicators */}
        <div className="hero-description grid grid-cols-2 md:grid-cols-3 gap-8 pt-16 opacity-30">
          <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-default">
            <Terminal className="h-4 w-4" />
            <span className="text-[10px] font-mono tracking-widest uppercase">Frontend</span>
          </div>
          <div className="flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-default">
            <Code2 className="h-4 w-4" />
            <span className="text-[10px] font-mono tracking-widest uppercase">Backend</span>
          </div>
          <div className="hidden md:flex items-center gap-3 grayscale hover:grayscale-0 transition-all cursor-default">
            <Sparkles className="h-4 w-4" />
            <span className="text-[10px] font-mono tracking-widest uppercase">Digital Art</span>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
  href="#about"
  className="scroll-indicator absolute bottom-12 flex flex-col items-center gap-4 text-foreground/20 hover:text-primary transition-all duration-500 group"
>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] font-mono group-hover:tracking-[0.6em] transition-all">
          {t.hero.scroll}
        </span>
        <div className="p-3 border border-white/5 rounded-full group-hover:border-primary/30 group-hover:scale-110 transition-all flex items-center justify-center bg-white/5">
          <ArrowDown className="h-4 w-4 animate-bounce" />
        </div>
      </a>
    </section>
  )
}

