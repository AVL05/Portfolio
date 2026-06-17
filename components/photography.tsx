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
  instagram: "https://www.instagram.com/aleviclop/",
};

export function Photography() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const heading = q(".photo-heading")[0];
      const content = q(".photo-content");

      if (prefersReducedMotion()) {
        gsap.set([heading, content], { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        heading,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          immediateRender: false,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 80%",
            once: true,
          },
        },
      );

      gsap.fromTo(
        content,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          immediateRender: false,
          stagger: 0.12,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
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
      className="section-padding relative overflow-hidden bg-background px-4 sm:px-6 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="photo-heading mb-10 sm:mb-12 space-y-4">
          <h2 className="text-4xl font-black leading-[0.98] tracking-normal text-foreground sm:text-6xl lg:text-7xl">
            {t.photography.subtitle}
          </h2>
          <p className="max-w-xl text-base font-medium leading-relaxed text-muted-foreground sm:text-lg">
            {t.photography.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_auto]">
          <figure className="photo-content group relative overflow-hidden rounded-2xl border border-border/60 bg-card">
            <div className="relative aspect-[16/9]">
              <Image
                src="/photography/hero.webp"
                alt="Fotografía - Alex Vicente"
                fill
                className="object-cover transition-transform duration-1000 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 1024px) 100vw, 860px"
                priority
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-50" />
            </div>
          </figure>

          <div className="photo-content flex flex-col justify-between gap-8 p-0 lg:w-56 xl:w-64">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-border/60 bg-secondary text-muted-foreground">
                  <FaInstagram className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-muted-foreground">Instagram</p>
                  <p className="text-base font-black tracking-normal">@aleviclop</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                asChild
                className="h-11 justify-center rounded-xl border-primary/25 font-bold text-primary hover:bg-primary/8 hover:border-primary/40"
              >
                <a href={photographyLinks.website} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" />
                  {t.photography.view_full}
                </a>
              </Button>
              <Button
                variant="ghost"
                asChild
                className="h-11 justify-center rounded-xl font-bold text-muted-foreground hover:text-foreground"
              >
                <a href={photographyLinks.instagram} target="_blank" rel="noopener noreferrer">
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
