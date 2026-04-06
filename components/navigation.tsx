'use client'

import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'

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
  const [indicatorStyle, setIndicatorStyle] = useState({ left: 0, width: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const navRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const mobileMenuItemsRef = useRef<(HTMLAnchorElement | null)[]>([])
  const navLinksContainerRef = useRef<HTMLDivElement>(null)
  const navLinksRefs = useRef<(HTMLAnchorElement | null)[]>([])

  useGSAP(() => {
    if (progressRef.current) {
      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: 'left center' })
    }
  }, { scope: containerRef })

  useEffect(() => {
    if (!mobileMenuRef.current) return

    if (isMobileMenuOpen) {
      gsap.set(mobileMenuRef.current, { rotateY: -90, opacity: 0, transformPerspective: 1200, transformOrigin: 'right center' })
      gsap.to(mobileMenuRef.current, {
        rotateY: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
      })
      gsap.fromTo(mobileMenuItemsRef.current.filter(Boolean),
        { opacity: 0, rotateX: 30, z: -30, transformPerspective: 800 },
        {
          opacity: 1,
          rotateX: 0,
          z: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: 'power2.out',
          delay: 0.2,
        }
      )
    } else {
      gsap.to(mobileMenuRef.current, {
        rotateY: -90,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.in',
      })
    }
  }, [isMobileMenuOpen])

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

  useEffect(() => {
    const activeIndex = navItems.findIndex(item => item.href.substring(1) === activeSection)
    const activeLink = navLinksRefs.current[activeIndex]
    if (activeLink && navLinksContainerRef.current) {
      const containerRect = navLinksContainerRef.current.getBoundingClientRect()
      const linkRect = activeLink.getBoundingClientRect()
      setIndicatorStyle({
        left: linkRect.left - containerRect.left,
        width: linkRect.width,
      })
    }
  }, [activeSection])

  const handleMobileNavClick = (href: string) => {
    setIsMobileMenuOpen(false)
    const element = document.querySelector(href)
    if (element) {
      gsap.to(window, {
        scrollTo: { y: element, offsetY: 80 },
        duration: 1.2,
        ease: 'power3.inOut',
      })
    }
  }

  return (
    <div ref={containerRef}>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-90 transition-all duration-500 ${
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

            <div
              ref={navLinksContainerRef}
              className="hidden md:flex items-center gap-8 relative"
            >
              <div
                className="absolute bottom-[-4px] h-[2px] bg-primary transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
              />
              {navItems.map((item, index) => {
                const isActive = activeSection === item.href.substring(1)
                return (
                  <a
                    key={item.name}
                    ref={(el) => { navLinksRefs.current[index] = el; }}
                    href={item.href}
                    className={`group relative text-xs font-black uppercase tracking-[0.2em] transition-colors duration-300 ${
                      isActive ? 'text-primary' : 'text-white/40 hover:text-white'
                    }`}
                  >
                    <span className="mr-2 text-[10px] opacity-30 font-mono">0{index + 1}.</span>
                    {item.name}
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

        {isMobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="fixed inset-0 top-0 left-0 w-full h-screen bg-[#0a0a0a] z-80 md:hidden flex flex-col items-center justify-center space-y-8"
          >
            {navItems.map((item, index) => (
              <a
                key={item.name}
                ref={(el) => { mobileMenuItemsRef.current[index] = el; }}
                href={item.href}
                className="text-4xl sm:text-5xl font-black text-white hover:text-primary transition-all tracking-tighter"
                onClick={(e) => {
                  e.preventDefault()
                  handleMobileNavClick(item.href)
                }}
              >
                <span className="text-lg font-mono text-primary/40 mr-4">0{index + 1}.</span>
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
          </div>
        )}
      </nav>
    </div>
  )
}
