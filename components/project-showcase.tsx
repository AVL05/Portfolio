"use client";

import Image from "next/image";
import { useEffect, useRef, type ReactNode } from "react";
import styles from "./project-showcase.module.css";

interface ProjectShowcaseProps {
  image: string;
  alt: string;
  caption: ReactNode;
  viewTransitionName: string;
  videoSrc?: string;
  autoPlayOnView?: boolean;
}

export function ProjectShowcase({ image, alt, caption, viewTransitionName, videoSrc, autoPlayOnView = false }: ProjectShowcaseProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !autoPlayOnView || !("IntersectionObserver" in window)) return;
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const syncPlayback = () => {
      if (visible && !reducedMotion.matches && !document.hidden) {
        // Browsers may block autoplay; native controls remain available.
        void video.play().catch(() => {});
      } else {
        video.pause();
      }
    };
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= .35;
      syncPlayback();
    }, { threshold: .35 });
    observer.observe(video);
    reducedMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [autoPlayOnView, videoSrc]);

  return (
    <figure className={styles.showcase} data-project-showcase>
      <div className={styles.laptop}>
        <div className={styles.screen} style={{ viewTransitionName }}>
          {videoSrc ? (
            <video ref={videoRef} src={videoSrc} poster={image} controls playsInline muted={autoPlayOnView} preload="none" aria-label={alt}>
              <a href={videoSrc}>{alt}</a>
            </video>
          ) : (
            <Image src={image} alt={alt} fill priority sizes="(max-width: 768px) 88vw, (max-width: 1440px) 82vw, 1180px" />
          )}
        </div>
      </div>
      <div className={styles.base} aria-hidden="true" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
