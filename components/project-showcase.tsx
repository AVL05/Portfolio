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
    // True only while playback was started by this effect, never by the viewer.
    let autoStarted = false;
    const syncPlayback = () => {
      if (visible && !reducedMotion.matches && !document.hidden) {
        if (video.paused) {
          autoStarted = true;
          // Browsers may block autoplay; native controls remain available.
          video.play().catch(() => { autoStarted = false; });
        }
        return;
      }
      // Leaving the viewport or the tab always pauses. A reduced-motion preference
      // may only stop playback the page started itself: calling pause() here when a
      // viewer has pressed play (e.g. Space on the focused video) would cancel
      // their request whenever an observer notification arrives late.
      if (!visible || document.hidden || autoStarted) {
        autoStarted = false;
        video.pause();
      }
    };
    const onPause = () => { autoStarted = false; };
    video.addEventListener("pause", onPause);
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= .35;
      syncPlayback();
    }, { threshold: .35 });
    observer.observe(video);
    reducedMotion.addEventListener("change", syncPlayback);
    document.addEventListener("visibilitychange", syncPlayback);
    return () => {
      observer.disconnect();
      video.removeEventListener("pause", onPause);
      reducedMotion.removeEventListener("change", syncPlayback);
      document.removeEventListener("visibilitychange", syncPlayback);
      video.pause();
    };
  }, [autoPlayOnView, videoSrc]);

  return (
    <figure className={styles.showcase} data-project-showcase>
      <div className={styles.browser}>
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
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
