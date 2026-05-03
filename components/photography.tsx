'use client'

import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Camera, Globe, ChevronRight } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa6'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { gsap, useGSAP } from '@/lib/gsap'

const photographyLinks = {
  website: 'https://alexgallery.alexviclop.workers.dev/',
  instagram: 'https://www.instagram.com/raw.vives/',
  portfolio: 'https://galeria-fotografica.vercel.app/',
}

import { RevealHeader } from '@/components/reveal-header'

export function Photography() {
  const { t } = useLanguage()
  const showcaseRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const galleryImages = [
    { src: '/photography/hero.webp', label: 'Featured', iso: '100', f: '2.8', exp: '1/250s' },
    { src: '/photography/landscape.png', label: 'Landscape', iso: '400', f: '8.0', exp: '1/1000s' },
    { src: '/photography/urban.png', label: 'Urban', iso: '800', f: '1.8', exp: '1/60s' },
  ]

  const [activeIndex, setActiveIndex] = useState(0)

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef)

    gsap.fromTo(q('.photo-card'),
      { opacity: 0, scale: 0.9, y: 30 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 70%',
        }
      }
    )
  }, { scope: containerRef })

  return (
    <section
      id="photography"
      ref={containerRef}
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden text-foreground"
    >
      <div className="max-w-7xl mx-auto relative z-10 section-padding">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-12 mb-16 sm:mb-0">
          <RevealHeader
            title={t.photography.title}
            subtitle={t.photography.subtitle}
            description={t.photography.description}
          />

          <div className="flex gap-4">
            <Button
              variant="outline"
              asChild
              className="border-primary/20 hover:bg-primary/10 text-primary rounded-full px-8 h-12 font-bold"
            >
              <a href={photographyLinks.website} target="_blank" rel="noopener noreferrer">
                <Globe className="mr-2 h-4 w-4" />
                {t.photography.view_full}
              </a>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Viewer */}
          <div className="lg:col-span-8 photo-card">
            <div className="relative overflow-hidden rounded-[2.5rem] bg-card border border-border aspect-video group/img">
              <Image
                src={galleryImages[activeIndex].src}
                alt={galleryImages[activeIndex].label}
                fill
                className="object-cover transition-transform duration-3000 group-hover/img:scale-110"
                sizes="(max-width: 1200px) 100vw, 800px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover/img:opacity-100 transition-opacity duration-500" />

              <div className="absolute bottom-8 left-8 text-white opacity-0 group-hover/img:opacity-100 translate-y-4 group-hover/img:translate-y-0 transition-all duration-500">
                <p className="font-mono text-[10px] tracking-[0.4em] uppercase text-primary mb-2">RAW_METADATA</p>
                <div className="flex gap-6 text-xs font-bold tracking-wider">
                  <span>ISO {galleryImages[activeIndex].iso}</span>
                  <span>f/{galleryImages[activeIndex].f}</span>
                  <span>{galleryImages[activeIndex].exp}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Thumbnails / Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {galleryImages.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveIndex(i)}
                className={`photo-card relative h-32 rounded-3xl overflow-hidden border-2 transition-all duration-500 group ${activeIndex === i ? 'border-primary' : 'border-transparent grayscale hover:grayscale-0'}`}
              >
                <Image
                  src={img.src}
                  alt={img.label}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 1024px) 100vw, 400px"
                />
                <div className={`absolute inset-0 ${activeIndex === i ? 'bg-primary/10' : 'bg-black/40 group-hover:bg-black/10'} transition-colors`} />
                <div className="absolute bottom-4 left-4">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white drop-shadow-md">
                    {img.label}
                  </span>
                </div>
              </button>
            ))}

            <a
              href={photographyLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="photo-card mt-auto flex items-center justify-between p-8 bg-secondary/50 rounded-3xl border border-border group hover:border-primary/30 transition-all"
            >
              <div className="flex items-center gap-4">
                <div className="p-3 bg-card rounded-2xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                  <FaInstagram className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">Follow me</p>
                  <p className="text-lg font-black tracking-tight">@raw.vives</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-all translate-x-0 group-hover:translate-x-2" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

