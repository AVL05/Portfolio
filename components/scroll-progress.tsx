'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    if (!barRef.current) return

    gsap.to(barRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.documentElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      }
    })
  }, [])

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[10000] pointer-events-none">
      <div
        ref={barRef}
        className="h-full bg-primary origin-left scale-x-0"
        style={{
          boxShadow: '0 0 15px rgba(var(--color-primary), 0.5)'
        }}
      />
    </div>
  )
}
