'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Camera, Globe } from 'lucide-react'
import { FaInstagram } from 'react-icons/fa6'
import Image from 'next/image'
import { useLanguage } from '@/lib/language-context'
import { gsap, useGSAP } from '@/lib/gsap'

const photographyLinks = {
  website: 'https://alexgallery.alexviclop.workers.dev/',
  instagram: 'https://www.instagram.com/raw.vives/',
  portfolio: 'https://galeria-fotografica.vercel.app/',
}

export function Photography() {
  const { t } = useLanguage()
  const showcaseRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const imagePath = '/photography/hero.webp'
  const hasHeroImage = true

  return (
    <section
      id="photography"
      ref={containerRef}
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden text-foreground"
    >
      <div className="max-w-7xl mx-auto relative z-10 section-padding">
        <div className="mb-24">
          <h2 className="text-4xl sm:text-7xl md:text-8xl 2xl:text-9xl font-black tracking-tighter opacity-[0.03] absolute -top-16 left-0 select-none hidden sm:block uppercase">
            GALLERY
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-mono relative">
            <span className="text-primary/50 mr-2 sm:mr-4 font-normal text-lg sm:text-2xl md:text-3xl">04.</span>
            {t.photography.title} <span className="text-foreground/20 ml-2 block sm:inline text-xl sm:text-2xl md:text-3xl">{t.photography.subtitle}</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mt-6 font-medium leading-relaxed">
            {t.photography.description}
          </p>
        </div>

        <div ref={showcaseRef} className="relative group/editor transition-all duration-700">
          <div className="relative overflow-hidden rounded-[2rem] bg-card/80 border border-border shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] font-mono will-change-transform">
            <div className="flex items-center justify-between px-4 sm:px-8 py-4 sm:py-5 bg-secondary/50 border-b border-border">
              <div className="flex items-center gap-2">
                 <Camera className="w-4 h-4 text-primary/40" />
                 <span className="text-[10px] font-mono text-muted-foreground/50 uppercase tracking-[0.2em] font-bold">
                  Image Viewer
                </span>
              </div>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-border"></div>
                <div className="w-2 h-2 rounded-full bg-border"></div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              <div className="hidden lg:flex flex-col gap-6 p-6 border-r border-border bg-card/30 items-center text-muted-foreground/30">
                <div className="w-5 h-5 border-2 border-current rounded-sm"></div>
                <div className="w-5 h-5 border border-current rounded-full"></div>
                <div className="w-5 h-5 border-t-2 border-l-2 border-current"></div>
              </div>

              <div className="relative w-full p-6 sm:p-10 lg:p-12 flex items-center justify-center bg-background/20">
                <div className="absolute top-12 left-12 w-12 h-12 border-t border-l border-primary/20"></div>
                <div className="absolute top-12 right-12 w-12 h-12 border-t border-r border-primary/20"></div>
                <div className="absolute bottom-12 left-12 w-12 h-12 border-b border-l border-primary/20"></div>
                <div className="absolute bottom-12 right-12 w-12 h-12 border-b border-r border-primary/20"></div>

                <div ref={imageRef} className="relative w-full aspect-video sm:aspect-3/2 rounded-none overflow-hidden shadow-2xl ring-1 ring-border group/img scale-110">
                  {hasHeroImage ? (
                    <Image
                      src={imagePath}
                      alt="Fotografía destacada - Alex Vicente López"
                      fill
                      priority
                      className="object-cover transition-transform duration-[2000ms] group-hover/img:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
                      <Camera className="h-16 w-16 sm:h-20 sm:w-20 text-muted-foreground/10" />
                    </div>
                  )}
                </div>
              </div>

              <div className="w-full lg:w-96 p-8 border-t lg:border-t-0 lg:border-l border-border bg-card/30 flex flex-col justify-between">
                <div>
                  <h3 className="text-primary/60 font-black mb-6 uppercase text-[10px] tracking-[0.4em] border-b border-border/50 pb-3">
                    {t.photography.properties}
                  </h3>
                  <div className="grid grid-cols-2 gap-3 text-[10px] text-muted-foreground font-mono">
                    {[
                      { label: 'ISO', value: '100' },
                      { label: 'f/', value: '2.8' },
                      { label: 'Exp', value: '1/250s' },
                      { label: 'Dist', value: '35mm' },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center bg-muted/20 p-2 rounded-lg border border-border/10">
                        <span className="opacity-40">{item.label}</span>
                        <span className="text-foreground/80 font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-16 space-y-4">
                  <Button
                    asChild
                    size="lg"
                    className="w-full h-16 font-sans bg-primary text-primary-foreground font-black hover:bg-primary/90 transition-all duration-500 rounded-2xl group/btn overflow-hidden relative"
                  >
                    <a
                      href={photographyLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full h-full"
                    >
                      <Globe className="h-5 w-5 group-hover/btn:rotate-12 transition-transform" />
                      <span className="text-base uppercase tracking-tight">{t.photography.view_full}</span>
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    asChild
                    size="lg"
                    className="w-full h-14 font-mono bg-transparent text-foreground border-border hover:border-primary/50 hover:bg-primary/5 transition-all duration-500 rounded-2xl"
                  >
                    <a
                      href={photographyLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <FaInstagram className="h-4 w-4" />
                      <span>@raw.vives</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
