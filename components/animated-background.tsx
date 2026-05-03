'use client'

import { useEffect, useRef } from 'react'
import { gsap } from '@/lib/gsap'

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w: number, h: number
    const circles: { x: number; y: number; r: number; color: string; vx: number; vy: number }[] = []

    const resolveColor = (variable: string, opacity: number) => {
      if (typeof window === 'undefined') return 'rgba(0,0,0,0)'

      // 1. Resolve CSS variable to a color string (could be oklch, rgb, etc.)
      const temp = document.createElement('div')
      temp.style.color = variable
      document.body.appendChild(temp)
      const colorStr = getComputedStyle(temp).color
      document.body.removeChild(temp)

      // 2. Use a hidden canvas to convert that string to RGBA data
      const tempCanvas = document.createElement('canvas')
      tempCanvas.width = 1
      tempCanvas.height = 1
      const tempCtx = tempCanvas.getContext('2d')
      if (!tempCtx) return 'rgba(0,0,0,0)'

      tempCtx.fillStyle = colorStr
      tempCtx.fillRect(0, 0, 1, 1)
      const [r, g, b] = tempCtx.getImageData(0, 0, 1, 1).data
      return `rgba(${r}, ${g}, ${b}, ${opacity})`
    }

    const init = () => {
      w = canvas.width = window.innerWidth
      h = canvas.height = window.innerHeight
      circles.length = 0

      const color1 = resolveColor('var(--primary)', 0.1)
      const color2 = resolveColor('var(--accent)', 0.1)

      for (let i = 0; i < 6; i++) {
        circles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 400 + 200,
          color: i % 2 === 0 ? color1 : color2,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'screen'

      circles.forEach((c) => {
        c.x += c.vx
        c.y += c.vy

        if (c.x < -c.r) c.x = w + c.r
        if (c.x > w + c.r) c.x = -c.r
        if (c.y < -c.r) c.y = h + c.r
        if (c.y > h + c.r) c.y = -c.r

        const gradient = ctx.createRadialGradient(c.x, c.y, 0, c.x, c.y, c.r)
        gradient.addColorStop(0, c.color)
        gradient.addColorStop(1, 'transparent')

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2)
        ctx.fill()
      })

      requestAnimationFrame(draw)
    }

    init()
    draw()

    window.addEventListener('resize', init)
    return () => window.removeEventListener('resize', init)
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  )
}
