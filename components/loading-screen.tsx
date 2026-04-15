"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";

export function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const logoStrokeRef = useRef<SVGAElement>(null);
  const logoFillRef = useRef<SVGAElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const cornerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const curtainTopRef = useRef<HTMLDivElement>(null);
  const curtainBottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    tl.fromTo(logoStrokeRef.current, { opacity: 0 }, { opacity: 1, duration: 1 })
      .fromTo(logoFillRef.current, { opacity: 0 }, { opacity: 1, duration: 0.5 }, "-=0.5")
      .fromTo(nameRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3");

    cornerRefs.current.forEach((corner) => {
      if (corner) {
        gsap.fromTo(corner, { scale: 0 }, { scale: 1, duration: 0.8, delay: 0.2, ease: "power2.out" });
      }
    });

    return () => {
      tl.kill();
    };
  }, []);

  useEffect(() => {
    if (progressLineRef.current) {
      gsap.to(progressLineRef.current, {
        width: `${loadingProgress}%`,
        duration: 0.3,
        ease: "power2.out",
      });
    }
  }, [loadingProgress]);

  useEffect(() => {
    let animationFrame: number;
    let progress = 0;

    const failSafeTimeout = setTimeout(() => {
      exitLoading();
    }, 6000);

    const updateProgress = () => {
      const remaining = 100 - progress;
      const increment = Math.random() * (remaining > 20 ? 1.5 : 0.8);

      progress = Math.min(100, progress + increment);
      setLoadingProgress(progress);

      if (progress < 100) {
        animationFrame = requestAnimationFrame(updateProgress);
      } else {
        setTimeout(exitLoading, 500);
      }
    };

    const exitLoading = () => {
      if (!containerRef.current) {
        setIsLoading(false);
        return;
      }

      const tl = gsap.timeline({
        onComplete: () => setIsLoading(false),
      });

      // Dramatic Exit sequence
      tl.to('.loading-ui-element', {
        opacity: 0,
        y: -20,
        stagger: 0.05,
        duration: 0.4,
        ease: 'power2.in'
      })
      .to(containerRef.current, {
        scale: 1.1,
        filter: 'blur(10px)',
        opacity: 0,
        duration: 0.8,
        ease: "expo.in"
      }, "-=0.2")
      .to([curtainTopRef.current, curtainBottomRef.current], {
        scaleY: 1,
        duration: 0.8,
        ease: "expo.inOut",
        stagger: 0.1,
      }, "-=0.6")
      .to([curtainTopRef.current, curtainBottomRef.current], {
        scaleY: 0,
        duration: 0.8,
        ease: "expo.inOut",
        stagger: -0.1,
      })
      .set(containerRef.current, { display: "none" });
    };

    animationFrame = requestAnimationFrame(updateProgress);
    return () => {
      cancelAnimationFrame(animationFrame);
      clearTimeout(failSafeTimeout);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-100 bg-background flex items-center justify-center overflow-hidden"
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl aspect-square bg-primary/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative flex flex-col items-center w-full max-w-sm px-8">
        <div className="relative mb-12 flex flex-col items-center">
          <div className="relative h-24 sm:h-32 mb-4 overflow-visible loading-ui-element">
            <svg
              width="240"
              height="120"
              viewBox="0 0 240 120"
              className="overflow-visible"
            >
              <defs>
                <linearGradient
                  id="logo-gradient"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop offset="0%" stopColor="var(--primary)" />
                  <stop offset="100%" stopColor="var(--accent)" />
                </linearGradient>
              </defs>

              <text
                ref={logoStrokeRef as any}
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="text-6xl sm:text-7xl font-bold fill-none stroke-foreground/10"
                strokeWidth="0.5"
                style={{
                  letterSpacing: "0.15em",
                  fontFamily: "var(--font-geist-sans)",
                }}
              >
                AVL
              </text>

              <text
                ref={logoFillRef as any}
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                className="text-6xl sm:text-7xl font-bold"
                fill="url(#logo-gradient)"
                style={{
                  letterSpacing: "0.15em",
                  fontFamily: "var(--font-geist-sans)",
                  clipPath: `inset(0 ${100 - loadingProgress}% 0 0)`,
                }}
              >
                AVL
              </text>
            </svg>
          </div>

          <div
            ref={nameRef}
            className="text-center space-y-3 loading-ui-element"
          >
            <h2 className="text-xs sm:text-sm uppercase tracking-[0.5em] text-muted-foreground/40 font-light">
              Alex Vicente López
            </h2>
            <div className="flex items-center justify-center gap-3 text-[9px] sm:text-[10px] tracking-[0.3em] text-primary/60 uppercase font-medium">
              <span>Digital Developer</span>
              <span className="w-1 h-1 bg-primary/30 rounded-full" />
              <span>Visual Artist</span>
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col items-center gap-6 mt-8 loading-ui-element">
          <div className="w-full h-px bg-border/20 relative overflow-hidden">
            <div
              ref={progressLineRef}
              className="absolute inset-y-0 left-0 bg-linear-to-r from-primary to-accent"
              style={{ width: "0%" }}
            />
          </div>

          <div className="flex justify-between w-full px-1 items-baseline loading-ui-element">
            <span className="text-[10px] tracking-widest text-muted-foreground/30 uppercase font-mono">
              System Initializing
            </span>
            <span
              className="text-2xl font-mono text-muted-foreground/40 tabular-nums"
              key={Math.floor(loadingProgress)}
            >
              {Math.floor(loadingProgress).toString().padStart(3, "0")}
            </span>
          </div>
        </div>
      </div>

      <div className="absolute inset-8 sm:inset-12 pointer-events-none opacity-30">
        <div
          ref={(el) => { cornerRefs.current[0] = el; }}
          className="absolute top-0 left-0 w-12 h-px bg-primary/50"
          style={{ transformOrigin: "left center" }}
        />
        <div
          ref={(el) => { cornerRefs.current[1] = el; }}
          className="absolute top-0 left-0 w-px h-12 bg-primary/50"
          style={{ transformOrigin: "top center" }}
        />

        <div
          ref={(el) => { cornerRefs.current[2] = el; }}
          className="absolute bottom-0 right-0 w-12 h-px bg-primary/50"
          style={{ transformOrigin: "right center" }}
        />
        <div
          ref={(el) => { cornerRefs.current[3] = el; }}
          className="absolute bottom-0 right-0 w-px h-12 bg-primary/50"
          style={{ transformOrigin: "bottom center" }}
        />
      </div>

      {/* Curtain panels for exit reveal */}
      <div
        ref={curtainTopRef}
        className="absolute inset-x-0 top-0 h-1/2 bg-background origin-bottom scale-y-0"
      />
      <div
        ref={curtainBottomRef}
        className="absolute inset-x-0 bottom-0 h-1/2 bg-background origin-top scale-y-0"
      />
    </div>
  );
}
