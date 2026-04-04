'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Camera, Globe, Instagram } from 'lucide-react'
import Image from 'next/image'

const photographyLinks = {
  website: 'https://alexgallery.alexviclop.workers.dev/',
  instagram: 'https://www.instagram.com/raw.vives/',
  portfolio: 'https://galeria-fotografica.vercel.app/',
}

export function Photography() {
  const showcaseRef = useRef<HTMLDivElement>(null)
  const imagePath = '/photography/hero.webp'
  const hasHeroImage = true

  return (
    <section
      id="photography"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden text-white"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl font-black tracking-tighter opacity-10 absolute -top-12 left-0 select-none hidden sm:block uppercase">
            GALLERY
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-mono relative">
            <span className="text-primary/50 mr-4 font-normal">04.</span>
            Fotografía <span className="text-white/20 ml-2">/ Creative View</span>
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mt-4 font-medium">
            Explora mi mundo a través del lente. Capturando momentos, emociones y la belleza que nos rodea.
          </p>
        </div>

        <div ref={showcaseRef} className="relative">
          <div className="relative overflow-hidden rounded-xl bg-[#0d1117]/80 border border-primary/20 shadow-2xl backdrop-blur-xl font-mono">
            <div className="flex items-center justify-between px-4 py-3 bg-[#161b22] border-b border-primary/20">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              </div>
              <span className="text-xs font-mono text-muted-foreground/70 uppercase tracking-wider font-semibold">
                RAW_EDITOR.exe
              </span>
              <div className="flex gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-primary/40"></div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              <div className="hidden lg:flex flex-col gap-4 p-4 border-r border-primary/20 bg-[#0d1117]/50 items-center text-muted-foreground">
                <Camera className="w-5 h-5 text-primary" />
                <div className="w-6 h-px bg-border/50 my-1"></div>
                <div className="w-4 h-4 border-2 border-current rounded-sm"></div>
                <div className="w-4 h-4 border border-current rounded-full"></div>
                <div className="w-4 h-4 border-t-2 border-l-2 border-current"></div>
              </div>

              <div className="relative w-full p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-[#090b0f]">
                <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-primary/50"></div>
                <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-primary/50"></div>
                <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-primary/50"></div>
                <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-primary/50"></div>

                <div className="relative w-full aspect-video sm:aspect-3/2 rounded-none overflow-hidden ring-1 ring-border/30 shadow-2xl">
                  {hasHeroImage ? (
                    <Image
                      src={imagePath}
                      alt="Fotografía destacada - Alex Vicente López"
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#161b22]">
                      <Camera className="h-16 w-16 sm:h-20 sm:w-20 text-white/10" />
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-px h-12 bg-primary"></div>
                    <div className="absolute h-px w-12 bg-primary"></div>
                    <div className="absolute w-4 h-4 border border-primary rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-primary/20 bg-[#0d1117] flex flex-col justify-between">
                <div>
                  <h3 className="text-primary font-bold mb-4 uppercase text-sm border-b border-primary/20 pb-2">
                    Propiedades.RAW
                  </h3>
                  <div className="space-y-3 text-xs text-muted-foreground font-mono">
                    {[
                      { label: 'ISO', value: '100' },
                      { label: 'Apertura', value: 'f/2.8' },
                      { label: 'Exposicion', value: '1/250s' },
                      { label: 'Dist focal', value: '35mm' },
                      { label: 'Lente', value: 'Sigma 35mm Art' },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between">
                        <span>{item.label}</span>
                        <span className="text-foreground">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8">
                    <h3 className="text-primary font-bold mb-3 uppercase text-sm border-b border-primary/20 pb-2">
                      Filtros
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-8 rounded bg-primary/10 border border-primary/30 flex items-center justify-center text-[10px] text-primary cursor-pointer hover:bg-primary/20 transition-all">
                        B&N
                      </div>
                      <div className="h-8 rounded bg-[#161b22] border border-border flex items-center justify-center text-[10px] cursor-pointer hover:bg-white/5 transition-all">
                        CINE
                      </div>
                      <div className="h-8 rounded bg-[#161b22] border border-border flex items-center justify-center text-[10px] cursor-pointer hover:bg-white/5 transition-all">
                        VNTG
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-12 space-y-3">
                  <Button
                    asChild
                    className="w-full font-mono bg-primary text-[#0d1117] hover:bg-primary/80 hover:shadow-[0_0_15px_rgba(119,255,150,0.4)] transition-all duration-300"
                  >
                    <a
                      href={photographyLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Globe className="mr-2 h-4 w-4" />[ EXPORT_GALLERY ]
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    asChild
                    className="w-full font-mono bg-transparent text-primary border-primary/30 hover:bg-primary/10 hover:border-primary transition-all duration-300"
                  >
                    <a
                      href={photographyLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Instagram className="mr-2 h-4 w-4" />
                      @raw.vives
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
