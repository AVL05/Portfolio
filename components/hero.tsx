'use client'

import { useRef } from 'react'
import { ArrowDown, Mail, BriefcaseBusiness } from 'lucide-react'
import { FaGithub, FaLinkedin } from 'react-icons/fa6'
import { gsap, useGSAP } from '@/lib/gsap'
import { useLanguage } from '@/lib/language-context'

export function Hero() {
  const { t, language } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const gridRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef)
    const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })

    // 1. Entrance Animation
    tl.fromTo(q('.reveal-char'),
      { opacity: 0, filter: 'blur(10px)' },
      {
        opacity: 1,
        filter: 'blur(0px)',
        stagger: 0.03,
        duration: 1.2,
        ease: 'expo.out',
        onStart: () => {
          // Custom Scramble Effect
          q('.reveal-char').forEach((el, i) => {
            const originalChar = el.textContent
            const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*"
            let iterations = 0

            const interval = setInterval(() => {
              el.textContent = chars[Math.floor(Math.random() * chars.length)]
              iterations++
              if (iterations > 10 + i * 2) {
                el.textContent = originalChar
                clearInterval(interval)
              }
            }, 50)
          })
        }
      }
    )
    .fromTo(q('.hero-badge'),
      { opacity: 0, scale: 0.5, rotateY: 180 },
      { opacity: 1, scale: 1, rotateY: 0, duration: 1.2, ease: 'elastic.out(1, 0.3)' },
      "-=1"
    )
    .fromTo(q('.hero-description'),
      { opacity: 0, x: -30, filter: 'blur(5px)' },
      { opacity: 1, x: 0, filter: 'blur(0px)', duration: 1, ease: 'power3.out' },
      "-=0.8"
    )
    .fromTo(q('.social-magnetic'),
      { opacity: 0, scale: 0, stagger: 0.1 },
      { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(2)' },
      "-=0.6"
    )
    .fromTo(q('.scroll-indicator'),
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 1, ease: 'power4.out' },
      "-=0.4"
    )

    // 3. Mouse Interaction (Subtle Parallax)
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const xPos = (clientX / window.innerWidth - 0.5)
      const yPos = (clientY / window.innerHeight - 0.5)

      // Background Glows Parallax
      gsap.to(q('.hero-glow'), {
        x: xPos * 100,
        y: yPos * 100,
        duration: 2.5,
        ease: 'power3.out',
        stagger: 0.1
      })

      // Grid (Perspective Shift)
      gsap.to(gridRef.current, {
        rotateX: 45 + yPos * 10,
        rotateY: xPos * 10,
        z: xPos * 50,
        duration: 2,
        ease: 'power2.out'
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
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
        className="absolute inset-[-100px] bg-grid opacity-[0.1] dark:opacity-20 pointer-events-none"
      />

      <div className="absolute top-0 left-0 w-full h-full bg-linear-to-b from-transparent via-background/50 to-background pointer-events-none" />

      {/* Decorative Glows */}
      <div className="hero-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[radial-gradient(circle,rgba(var(--color-primary),0.05)_0%,transparent_70%)] pointer-events-none opacity-30" />
      <div className="hero-glow absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-[radial-gradient(circle,rgba(var(--color-accent),0.05)_0%,transparent_70%)] pointer-events-none opacity-20" />

      <div className="w-full max-w-7xl mx-auto z-10 flex flex-col items-center text-center space-y-12">

        {/* Status Badge */}
        <div className="hero-badge group flex items-center gap-3 px-6 py-2 dev-border rounded-full shadow-lg dark:shadow-[0_0_20px_rgba(0,0,0,0.3)] cursor-default overflow-hidden relative">
          <div className="absolute inset-0 bg-primary/10 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-in-out" />
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          <span className="text-[10px] sm:text-xs font-mono font-bold tracking-[0.2em] uppercase text-primary/80 relative z-10">
            {t.hero.status}
          </span>
        </div>

        {/* Main Title */}
        <div className="relative space-y-4 perspective-2000">
          {/* Cinematic Background Glow */}
          <div className="absolute inset-0 -z-10 bg-radial from-primary/10 via-transparent to-transparent blur-[120px] scale-150" />

          <h1 className="flex flex-wrap justify-center py-4 gap-x-[0.3em] preserve-3d">
            {name.split(' ').map((word, i) => (
              <span key={i} className="inline-block whitespace-nowrap preserve-3d">
                {word.split('').map((char, j) => (
                  <span
                    key={j}
                    className="reveal-char inline-block text-5xl sm:text-7xl md:text-8xl lg:text-9xl text-foreground text-display cursor-default"
                  >
                    {char}
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <h2 className="hero-description text-lg sm:text-2xl md:text-3xl text-muted-foreground font-medium tracking-tight max-w-4xl text-balance">
            {t.hero.description}
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
          <a href="#projects" className="social-magnetic w-full sm:w-auto block">
            <div className="group flex items-center justify-center gap-3 px-8 py-4 bg-foreground text-background font-bold rounded-xl hover:bg-primary hover:text-primary-foreground transition-all duration-300 shadow-xl">
              <BriefcaseBusiness className="h-5 w-5" />
              <span className="text-sm tracking-tight">{language === 'es' ? 'Ver proyectos' : 'View projects'}</span>
            </div>
          </a>

          <a href="#contact" className="social-magnetic w-full sm:w-auto block">
            <div className="group flex items-center justify-center gap-3 px-8 py-4 bg-card border border-border text-foreground font-bold rounded-xl hover:border-primary/50 transition-all duration-300">
              <Mail className="h-5 w-5 text-accent" />
              <span className="text-sm tracking-tight text-muted-foreground group-hover:text-foreground">{language === 'es' ? 'Contactar' : 'Contact'}</span>
            </div>
          </a>
        </div>

        <div className="hero-description flex flex-wrap items-center justify-center gap-5 pt-10 text-muted-foreground/60">
          <a href="https://github.com/AVL05" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:text-primary transition-colors">
            <FaGithub className="h-4 w-4" />
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/alex-vicente-lopez/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest hover:text-primary transition-colors">
            <FaLinkedin className="h-4 w-4" />
            LinkedIn
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
  href="#projects"
  className="scroll-indicator absolute bottom-12 flex flex-col items-center gap-4 text-muted-foreground/50 hover:text-primary transition-all duration-500 group"
>
        <span className="text-[10px] font-black uppercase tracking-[0.4em] font-mono group-hover:tracking-[0.6em] transition-all">
          {t.hero.scroll}
        </span>
        <div className="p-3 border border-border/50 rounded-full group-hover:border-primary/30 group-hover:scale-110 transition-all flex items-center justify-center bg-secondary">
          <ArrowDown className="scroll-arrow h-4 w-4" />
        </div>
      </a>

      {/* Depth Mask Transition */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-linear-to-t from-background to-transparent backdrop-blur-[2px] pointer-events-none z-20" />
    </section>
  )
}

