'use client'

import dynamicLoader from "next/dynamic";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";

// 1. Load background only on client
const AnimatedBackground = dynamicLoader(() => import("@/components/animated-background").then(mod => mod.AnimatedBackground), { ssr: false });

// 2. Dynamic sections
const About = dynamicLoader(() => import("@/components/about").then((mod) => mod.About));
const Skills = dynamicLoader(() => import("@/components/skills").then((mod) => mod.Skills));
const Projects = dynamicLoader(() => import("@/components/projects").then((mod) => mod.Projects));
const Photography = dynamicLoader(() => import("@/components/photography").then((mod) => mod.Photography));
const Experience = dynamicLoader(() => import("@/components/experience").then((mod) => mod.Experience));
const Contact = dynamicLoader(() => import("@/components/contact").then((mod) => mod.Contact));


export default function Home() {
  return (
    <div className="min-h-screen relative">
      <AnimatedBackground />

      <Navigation />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Photography />
        <Experience />
        <Contact />
      </main>
    </div>
  );
}
