'use client'

import React, { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

interface GSAPScrollRevealProps {
  children: React.ReactNode
  direction?: 'up' | 'down' | 'left' | 'right'
  distance?: number
  duration?: number
  delay?: number
  stagger?: number
  className?: string
}

export function GSAPScrollReveal({
  children,
  direction = 'up',
  distance = 50,
  duration = 1,
  delay = 0,
  stagger = 0.2,
  className = '',
}: GSAPScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const vars: gsap.TweenVars = {
      opacity: 0,
      duration,
      delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    }

    if (direction === 'up') vars.y = distance
    else if (direction === 'down') vars.y = -distance
    else if (direction === 'left') vars.x = distance
    else if (direction === 'right') vars.x = -distance

    const targets = containerRef.current?.children
    if (targets && targets.length > 0) {
      gsap.from(targets, {
        ...vars,
        stagger,
      })
    }
  }, { scope: containerRef })

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  )
}
