'use client'

import React, { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const followerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    const follower = followerRef.current
    if (!cursor || !follower) return

    const xTo = gsap.quickTo(cursor, 'x', { duration: 0.2, ease: 'power3' })
    const yTo = gsap.quickTo(cursor, 'y', { duration: 0.2, ease: 'power3' })

    const xFollowerTo = gsap.quickTo(follower, 'x', { duration: 0.6, ease: 'power3' })
    const yFollowerTo = gsap.quickTo(follower, 'y', { duration: 0.6, ease: 'power3' })

    const handleMouseMove = (e: MouseEvent) => {
      xTo(e.clientX)
      yTo(e.clientY)
      xFollowerTo(e.clientX)
      yFollowerTo(e.clientY)
    }

    const handleMouseDown = () => {
      gsap.to([cursor, follower], { scale: 0.8, duration: 0.3 })
    }

    const handleMouseUp = () => {
      gsap.to([cursor, follower], { scale: 1, duration: 0.3 })
    }

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mousedown', handleMouseDown)
    window.addEventListener('mouseup', handleMouseUp)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mousedown', handleMouseDown)
      window.removeEventListener('mouseup', handleMouseUp)
    }
  }, [])

  return (
    <>
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 mix-blend-difference hidden md:block"
      />
      <div
        ref={followerRef}
        className="fixed top-0 left-0 w-10 h-10 border border-primary/30 rounded-full pointer-events-none z-9998 -translate-x-1/2 -translate-y-1/2 transition-transform duration-300 ease-out hidden md:block"
      />
    </>
  )
}
