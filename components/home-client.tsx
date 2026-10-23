"use client";

import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import type { ReactNode } from "react";
import { Currently } from "@/components/currently";
import { Skills } from "@/components/skills";
import { Projects } from "@/components/projects";
import { Photography } from "@/components/photography";
import { Experience } from "@/components/experience";
import { Contact } from "@/components/contact";

export function HomeClient({ children }: { children?: ReactNode }) {
  return (
    <div className="premium-home min-h-screen relative">
      <Navigation />

      <main id="main-content" className="relative z-10">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Photography />
        <Currently />
        <Contact />
        {children}
      </main>
    </div>
  );
}
