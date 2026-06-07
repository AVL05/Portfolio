"use client";

import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";
import { FaInstagram } from "react-icons/fa6";
import Image from "next/image";
import { useLanguage } from "@/lib/language-context";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

const photographyLinks = {
  website: "https://gallery.aleviclop.dev/",
  instagram: "https://www.instagram.com/aleexx_005/",
};

import { RevealHeader } from "@/components/reveal-header";

export function Photography() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  const galleryImages = [
    { src: "/photography/hero.webp", label: "Featured" },
    { src: "/photography/landscape.png", label: "Landscape" },
    { src: "/photography/urban.png", label: "Urban" },
  ];

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const cards = q(".photo-card");

      if (prefersReducedMotion()) {
        gsap.set(cards, { opacity: 1, scale: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        cards,
        { opacity: 0, scale: 0.96, y: 30 },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          immediateRender: false,
          stagger: 0.12,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      id="photography"
      ref={containerRef}
      className="section-padding relative overflow-hidden bg-background px-4 text-foreground sm:px-6 lg:px-8"
    >
      <div className="absolute inset-x-0 top-1/4 h-px bg-linear-to-r from-transparent via-primary/24 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mb-8 grid grid-cols-1 items-end gap-8 lg:mb-10 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <RevealHeader
              title={t.photography.title}
              subtitle={t.photography.subtitle}
              description={t.photography.description}
              className="mb-0"
            />
          </div>

          <figure className="photo-card group relative aspect-[16/10] overflow-hidden rounded-3xl border border-border/70 bg-card shadow-2xl lg:col-span-7 lg:aspect-[16/9]">
            <Image
              src={galleryImages[0].src}
              alt={galleryImages[0].label}
              fill
              className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
              sizes="(max-width: 1024px) 100vw, 760px"
              priority
            />
          <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-62" />
            <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
              <div>
                <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-primary">
                  01
                </p>
                <p className="mt-2 text-2xl font-black tracking-normal">
                  {galleryImages[0].label}
                </p>
              </div>
              <span className="hidden rounded-xl border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur sm:inline-flex">
                alexgallery
              </span>
            </figcaption>
          </figure>
        </div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {galleryImages.slice(1).map((image, index) => (
            <figure
              key={image.src}
              className="photo-card group relative aspect-[16/10] overflow-hidden rounded-3xl border border-border/70 bg-card lg:col-span-4"
            >
              <Image
                src={image.src}
                alt={image.label}
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 420px"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/10 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-60" />
              <figcaption className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 text-white sm:p-7">
                <div>
                  <p className="text-[10px] font-mono uppercase tracking-[0.28em] text-primary">
                    0{index + 2}
                  </p>
                  <p className="mt-2 text-2xl font-black tracking-normal">
                    {image.label}
                  </p>
                </div>
                <span className="hidden rounded-xl border border-white/20 bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/80 backdrop-blur sm:inline-flex">
                  Portfolio
                </span>
              </figcaption>
            </figure>
          ))}

          <div className="photo-card dev-panel flex flex-col justify-between gap-8 p-6 sm:p-8 lg:col-span-4">
            <div className="flex items-center gap-4">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-secondary text-primary">
                <FaInstagram className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-mono uppercase tracking-[0.22em] text-muted-foreground">
                  Visual portfolio
                </p>
                <p className="text-lg font-black tracking-normal">@aleexx_005</p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                asChild
                className="h-12 justify-center rounded-2xl border-primary/20 px-6 font-bold text-primary hover:bg-primary/10"
              >
                <a
                  href={photographyLinks.website}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t.photography.view_full}
                </a>
              </Button>
              <Button
                variant="ghost"
                asChild
                className="h-12 justify-center rounded-2xl px-6 font-bold text-muted-foreground hover:text-foreground"
              >
                <a
                  href={photographyLinks.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaInstagram className="mr-2 h-4 w-4" />
                  Instagram
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
