'use client'

import { useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current

    if (!cursor || !follower) return

    gsap.set([cursor, follower], { xPercent: -50, yPercent: -50 })

    const moveCursor = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'none',
      })
      gsap.to(follower, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    const onMouseEnter = () => {
      gsap.to([cursor, follower], {
        opacity: 1,
        duration: 0.3,
      })
    }

    const onMouseLeave = () => {
      gsap.to([cursor, follower], {
        opacity: 0,
        duration: 0.3,
      })
    }

    const onLinkEnter = () => {
      gsap.to(cursor, {
        scale: 0.5,
        duration: 0.3,
        backgroundColor: 'var(--color-primary)',
      })
      gsap.to(follower, {
        scale: 2.5,
        duration: 0.3,
        borderColor: 'var(--color-primary)',
        backgroundColor: 'rgba(var(--color-primary), 0.1)',
        borderWidth: '1px',
      })
    }

    const onLinkLeave = () => {
      gsap.to(cursor, {
        scale: 1,
        duration: 0.3,
        backgroundColor: 'var(--color-primary)',
      })
      gsap.to(follower, {
        scale: 1,
        duration: 0.3,
        borderColor: 'rgba(var(--color-primary), 0.5)',
        backgroundColor: 'transparent',
        borderWidth: '1px',
      })
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', onMouseEnter)
    document.addEventListener('mouseleave', onMouseLeave)

    const interactiveElements = document.querySelectorAll('a, button, [role="button"], .skill-badge, .project-card')
    interactiveElements.forEach((el) => {
      el.addEventListener('mouseenter', onLinkEnter)
      el.addEventListener('mouseleave', onLinkLeave)
    })

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', onMouseEnter)
      document.removeEventListener('mouseleave', onMouseLeave)
      interactiveElements.forEach((el) => {
        el.removeEventListener('mouseenter', onLinkEnter)
        el.removeEventListener('mouseleave', onLinkLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-100 mix-blend-difference opacity-0 hidden md:block"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-primary/50 rounded-full pointer-events-none z-99 opacity-0 hidden md:block"
      />
    </>
  )
}
