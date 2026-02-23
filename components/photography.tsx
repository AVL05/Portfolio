'use client'

import { Button } from '@/components/ui/button'
import { useScrollReveal } from '@/hooks/useScrollReveal'
import { motion } from 'framer-motion'
import { Camera, ExternalLink, Globe, Instagram } from 'lucide-react'
import Image from 'next/image'

// Enlaces a tus redes de fotografía
const photographyLinks = {
  website: 'https://alexgallery.alexviclop.workers.dev/', // Tu galería fotográfica
  instagram: 'https://www.instagram.com/raw.vives/', // Tu Instagram de fotografía
  portfolio: 'https://galeria-fotografica.vercel.app/', // Tu galería principal
}

export function Photography() {
  const { ref, isInView } = useScrollReveal()
  // Use a simpler approach for the showcase image
  const imagePath = '/photography/hero.webp'
  const hasHeroImage = true // Set to true by default or use a single check

  return (
    <section
      id="photography"
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 relative"
    >
      <div className="max-w-4xl mx-auto" ref={ref}>
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Camera className="h-8 w-8 text-primary" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold bg-linear-to-r from-primary to-accent bg-clip-text text-transparent">
              Fotografía
            </h2>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Explora mi mundo a través del lente. Capturando momentos, emociones
            y la belleza que nos rodea.
          </p>
        </motion.div>

        {/* Photography Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative"
        >
          {/* Main showcase card - RAW Editor OS Window */}
          <div className="relative overflow-hidden rounded-xl bg-[#0d1117] border border-primary/20 shadow-2xl backdrop-blur-md font-mono">
            {/* Window controls and title */}
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
              {/* Left sidebar - mock tools */}
              <div className="hidden lg:flex flex-col gap-4 p-4 border-r border-primary/20 bg-[#0d1117] items-center text-muted-foreground">
                <Camera className="w-5 h-5 text-primary" />
                <div className="w-6 h-px bg-border/50 my-2"></div>
                <div className="w-4 h-4 border-2 border-current rounded-sm"></div>
                <div className="w-4 h-4 border border-current rounded-full"></div>
                <div className="w-4 h-4 border-t-2 border-l-2 border-current"></div>
              </div>

              {/* Main image area */}
              <div className="relative w-full p-4 sm:p-6 lg:p-8 flex items-center justify-center bg-[#090b0f]">
                {/* Viewfinder brackets */}
                <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-primary/50"></div>
                <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-primary/50"></div>
                <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-primary/50"></div>
                <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-primary/50"></div>

                {/* Hero image */}
                <motion.div className="relative w-full aspect-video sm:aspect-3/2 rounded-none overflow-hidden ring-1 ring-border/30 shadow-2xl">
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
                      <span className="absolute bottom-4 right-4 text-xs font-mono text-muted-foreground/30">
                        NO_SIGNAL
                      </span>
                    </div>
                  )}

                  {/* Crosshair target */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                    <div className="w-px h-12 bg-primary"></div>
                    <div className="absolute h-px w-12 bg-primary"></div>
                    <div className="absolute w-4 h-4 border border-primary rounded-full"></div>
                  </div>
                </motion.div>
              </div>

              {/* Right sidebar - Exif properties & CTA */}
              <div className="w-full lg:w-80 p-6 border-t lg:border-t-0 lg:border-l border-primary/20 bg-[#0d1117] flex flex-col justify-between">
                <div>
                  <h3 className="text-primary font-bold mb-4 uppercase text-sm border-b border-primary/20 pb-2">
                    Propiedades.RAW
                  </h3>
                  <div className="space-y-3 text-xs text-muted-foreground font-mono">
                    <div className="flex justify-between">
                      <span>ISO</span>
                      <span className="text-foreground">100</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Apertura</span>
                      <span className="text-foreground">f/2.8</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Exposicion</span>
                      <span className="text-foreground">1/250s</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Dist focal</span>
                      <span className="text-foreground">35mm</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Lente</span>
                      <span className="text-foreground text-right">
                        Sigma 35mm Art
                      </span>
                    </div>
                  </div>

                  <div className="mt-8">
                    <h3 className="text-primary font-bold mb-3 uppercase text-sm border-b border-primary/20 pb-2">
                      Filtros
                    </h3>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="h-8 rounded bg-primary/10 border border-primary/30 flex items-center justify-center text-[10px] text-primary cursor-pointer hover:bg-primary/20">
                        B&N
                      </div>
                      <div className="h-8 rounded bg-[#161b22] border border-border flex items-center justify-center text-[10px] cursor-pointer hover:bg-white/5">
                        CINE
                      </div>
                      <div className="h-8 rounded bg-[#161b22] border border-border flex items-center justify-center text-[10px] cursor-pointer hover:bg-white/5">
                        VNTG
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 space-y-3">
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
        </motion.div>
      </div>
    </section>
  )
}
