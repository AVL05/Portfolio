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
      <div className="max-w-7xl mx-auto relative z-10 section-padding">
        <div className="mb-24">
          <h2 className="text-4xl sm:text-7xl md:text-8xl 2xl:text-9xl font-black tracking-tighter opacity-[0.03] absolute -top-16 left-0 select-none hidden sm:block uppercase">
            GALLERY
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-mono relative">
            <span className="text-primary/50 mr-4 font-normal">04.</span>
            Fotografía <span className="text-white/20 ml-2">/ Creative View</span>
          </h2>
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mt-6 font-medium leading-relaxed">
            Explora mi mundo a través del lente. Capturando momentos, emociones y la belleza que nos rodea.
          </p>
        </div>

        <div ref={showcaseRef} className="relative group/editor transition-all duration-700">
          <div className="relative overflow-hidden rounded-[2rem] bg-[#050505]/80 border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,1)] backdrop-blur-3xl font-mono will-change-transform hover:shadow-[0_50px_120px_-20px_rgba(119,255,150,0.05)]">
            <div className="flex items-center justify-between px-8 py-5 bg-[#0a0a0a]/80 border-b border-white/5">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
              </div>
              <span className="text-[10px] font-mono text-white/30 uppercase tracking-[0.3em] font-black">
                RAW_EDITOR_V2.exe
              </span>
              <div className="flex gap-2">
                <div className="w-2 h-2 rounded-full bg-primary/20"></div>
                <div className="w-2 h-2 rounded-full bg-primary/20"></div>
              </div>
            </div>

            <div className="flex flex-col lg:flex-row">
              <div className="hidden lg:flex flex-col gap-6 p-6 border-r border-white/5 bg-[#0a0a0a]/50 items-center text-white/20">
                <Camera className="w-5 h-5 text-primary opacity-60" />
                <div className="w-8 h-px bg-white/5 my-2"></div>
                <div className="w-5 h-5 border-2 border-current rounded-sm"></div>
                <div className="w-5 h-5 border border-current rounded-full"></div>
                <div className="w-5 h-5 border-t-2 border-l-2 border-current"></div>
              </div>

              <div className="relative w-full p-6 sm:p-10 lg:p-12 flex items-center justify-center bg-[#000000]">
                <div className="absolute top-12 left-12 w-12 h-12 border-t border-l border-primary/30"></div>
                <div className="absolute top-12 right-12 w-12 h-12 border-t border-r border-primary/30"></div>
                <div className="absolute bottom-12 left-12 w-12 h-12 border-b border-l border-primary/30"></div>
                <div className="absolute bottom-12 right-12 w-12 h-12 border-b border-r border-primary/30"></div>

                <div className="relative w-full aspect-video sm:aspect-3/2 rounded-none overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.8)] ring-1 ring-white/10 group/img">
                  {hasHeroImage ? (
                    <Image
                      src={imagePath}
                      alt="Fotografía destacada - Alex Vicente López"
                      fill
                      className="object-cover transition-transform duration-[2000ms] group-hover/img:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]">
                      <Camera className="h-16 w-16 sm:h-20 sm:w-20 text-white/5" />
                    </div>
                  )}

                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-px h-16 bg-primary"></div>
                    <div className="absolute h-px w-16 bg-primary"></div>
                    <div className="absolute w-6 h-6 border border-primary rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="w-full lg:w-96 p-8 border-t lg:border-t-0 lg:border-l border-white/5 bg-[#070707] flex flex-col justify-between">
                <div>
                  <h3 className="text-primary font-black mb-6 uppercase text-[10px] tracking-[0.4em] border-b border-white/5 pb-3">
                    Propiedades.RAW
                  </h3>
                  <div className="space-y-4 text-xs text-white/40 font-mono">
                    {[
                      { label: 'ISO', value: '100' },
                      { label: 'Apertura', value: 'f/2.8' },
                      { label: 'Exposicion', value: '1/250s' },
                      { label: 'Dist focal', value: '35mm' },
                      { label: 'Lente', value: 'Sigma 35mm Art' },
                    ].map((item) => (
                      <div key={item.label} className="flex justify-between items-center bg-white/[0.02] p-2 rounded-lg border border-white/[0.03]">
                        <span className="opacity-60">{item.label}</span>
                        <span className="text-white font-bold">{item.value}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-10">
                    <h3 className="text-primary font-black mb-5 uppercase text-[10px] tracking-[0.4em] border-b border-white/5 pb-3">
                      Filtros
                    </h3>
                    <div className="grid grid-cols-3 gap-3">
                      <div data-cursor-hover className="h-10 rounded-xl bg-primary/10 border border-primary/30 flex items-center justify-center text-[10px] text-primary cursor-pointer hover:bg-primary/20 transition-all font-black">
                        B&N
                      </div>
                      <div data-cursor-hover className="h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-[10px] cursor-pointer hover:bg-white/10 transition-all font-black text-white/40">
                        CINE
                      </div>
                      <div data-cursor-hover className="h-10 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center text-[10px] cursor-pointer hover:bg-white/10 transition-all font-black text-white/40">
                        VNTG
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-16 space-y-4">
                  <Button
                    asChild
                    size="lg"
                    className="w-full h-16 font-sans bg-primary text-black font-black hover:bg-white transition-all duration-500 rounded-2xl shadow-[0_15px_30px_-10px_rgba(119,255,150,0.4)] group/btn overflow-hidden relative"
                  >
                    <a
                      href={photographyLinks.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-3 w-full h-full"
                    >
                      <Globe className="h-5 w-5 group-hover/btn:rotate-12 transition-transform" />
                      <span className="text-base uppercase tracking-tight">Ver Galería Completa</span>
                    </a>
                  </Button>

                  <Button
                    variant="outline"
                    asChild
                    size="lg"
                    className="w-full h-14 font-mono bg-transparent text-white border-white/10 hover:border-primary/50 hover:bg-primary/5 transition-all duration-500 rounded-2xl"
                  >
                    <a
                      href={photographyLinks.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2"
                    >
                      <Instagram className="h-4 w-4" />
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
