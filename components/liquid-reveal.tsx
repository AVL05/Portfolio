'use client'

import React, { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

interface LiquidRevealProps {
  children: React.ReactNode
  trigger?: string
}

export function LiquidReveal({ children, trigger }: LiquidRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const el = containerRef.current
    if (!el) return

    gsap.fromTo(el,
      {
        filter: 'blur(30px) contrast(200%)',
        opacity: 0,
        scale: 0.8,
        y: 100
      },
      {
        filter: 'blur(0px) contrast(100%)',
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 1.5,
        ease: 'power4.out',
        scrollTrigger: {
          trigger: trigger || el,
          start: 'top 85%',
        }
      }
    )
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className="will-change-transform">
      {children}
    </div>
  )
}
