'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

interface RevealHeaderProps {
  title: string
  subtitle: string
  description?: string
  className?: string
}

export function RevealHeader({ title, subtitle, description, className = "" }: RevealHeaderProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef)

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
      }
    })

    tl.fromTo(q('.header-line'),
      { opacity: 0, x: -10 },
      { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
    )
    .fromTo(q('.header-subtitle .char'),
      { opacity: 0, y: 30, rotateX: -45 },
      { opacity: 1, y: 0, rotateX: 0, stagger: 0.01, duration: 0.6, ease: 'power4.out' },
      "-=0.3"
    )

    if (description) {
      tl.fromTo(q('.header-description'),
        { opacity: 0, y: 15 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' },
        "-=0.4"
      )
    }
  }, { scope: containerRef })

  return (
    <header ref={containerRef} className={`mb-24 sm:mb-32 space-y-6 ${className}`}>
      <div className="header-line flex items-center gap-4 text-primary font-mono text-sm tracking-[0.3em] uppercase">
        <span className="w-8 h-[1px] bg-primary/50" />
        {title}
      </div>
      <h2 className="header-subtitle text-4xl sm:text-7xl font-black text-foreground tracking-tighter leading-none overflow-hidden">
        {subtitle.split('').map((char, i) => (
          <span key={i} className="char inline-block">
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </h2>
      {description && (
        <p className="header-description text-muted-foreground text-lg sm:text-xl font-medium max-w-2xl text-balance">
          {description}
        </p>
      )}
    </header>
  )
}
