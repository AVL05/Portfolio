'use client'

import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { AnimatePresence, motion } from 'framer-motion'

const navItems = [
  { name: 'Inicio', href: '#hero' },
  { name: 'Sobre Mí', href: '#about' },
  { name: 'Experiencia', href: '#experience' },
  { name: 'Proyectos', href: '#projects' },
  { name: 'Fotografía', href: '#photography' },
  { name: 'Contacto', href: '#contact' },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('hero')
  const containerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef)
    
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          scrub: 0.1,
          start: 0,
          end: 'max',
        }
      })
    }

    if (navRef.current) {
      gsap.fromTo(navRef.current, 
        { y: -100, autoAlpha: 0.01 },
        {
          y: 0,
          autoAlpha: 1,
          duration: 1.2,
          ease: 'power4.out',
          delay: 1.5,
          clearProps: 'all'
        }
      )
    }
  }, { scope: containerRef })

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
      const sections = navItems.map((item) => item.href.substring(1))
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 150 && rect.bottom >= 150
        }
        return false
      })
      if (currentSection) setActiveSection(currentSection)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div ref={containerRef}>
      <div 
        ref={progressRef}
        className="fixed top-0 left-0 right-0 h-1 bg-primary origin-left z-100 scale-x-0 shadow-[0_0_10px_rgba(119,255,150,0.5)]"
      />

      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-90 transition-all duration-300 ${
          isScrolled
            ? 'py-4 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/5'
            : 'py-8 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          <div className="flex items-center justify-between">
            <a
              href="#hero"
              className="group text-2xl font-black text-white tracking-tighter transition-all"
            >
              ALEX <span className="text-primary">VICENTE</span>
            </a>

            <div className="hidden md:flex items-center gap-8">
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1)
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className={`group relative text-xs font-black uppercase tracking-[0.2em] transition-all duration-300 ${
                      isActive ? 'text-primary' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    <span className="mr-2 text-[10px] opacity-30 font-mono">0{index + 1}.</span>
                    {item.name}
                    <div className={`absolute -bottom-1 left-0 h-[2px] bg-primary transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                  </a>
                )
              })}
            </div>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/5 p-0"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#0a0a0a] z-80 md:hidden flex flex-col items-center justify-center space-y-8"
            >
              {navItems.map((item, index) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-4xl sm:text-5xl font-black text-white hover:text-primary transition-all tracking-tighter"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg font-mono text-primary/40 mr-4">0{index + index}.</span>
                  {item.name}
                </a>
              ))}
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-8 right-8 text-white scale-150"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <X className="h-8 w-8" />
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </div>
  )
}
