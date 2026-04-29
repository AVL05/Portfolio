'use client'

import { useState, useEffect, useRef } from "react";
import dynamicLoader from "next/dynamic";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";

// 1. Load background only on client to save server time and initial JS weight
const AnimatedBackground = dynamicLoader(() => import("@/components/animated-background").then(mod => mod.AnimatedBackground), { ssr: false });

// 2. Dynamic sections
const About = dynamicLoader(() => import("@/components/about").then((mod) => mod.About));
const Skills = dynamicLoader(() => import("@/components/skills").then((mod) => mod.Skills));
const Projects = dynamicLoader(() => import("@/components/projects").then((mod) => mod.Projects));
const Photography = dynamicLoader(() => import("@/components/photography").then((mod) => mod.Photography));
const Experience = dynamicLoader(() => import("@/components/experience").then((mod) => mod.Experience));
const Contact = dynamicLoader(() => import("@/components/contact").then((mod) => mod.Contact));

/**
 * LazySection: Only renders its children when it's near the viewport.
 * This is the ultimate TBT killer for single-page portfolios.
 */
function LazySection({ children, height = "400px" }: { children: React.ReactNode, height?: string }) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "200px" } // Load a bit before it enters the viewport
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ minHeight: isVisible ? "auto" : height }}>
      {isVisible ? children : null}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <Navigation />
      <main className="relative z-10">
        <Hero />
        <LazySection height="600px"><About /></LazySection>
        <LazySection height="800px"><Skills /></LazySection>
        <LazySection height="1000px"><Projects /></LazySection>
        <LazySection height="800px"><Photography /></LazySection>
        <LazySection height="800px"><Experience /></LazySection>
        <LazySection height="400px"><Contact /></LazySection>
      </main>
    </div>
  );
}
