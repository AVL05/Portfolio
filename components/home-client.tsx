"use client";

import dynamicLoader from "next/dynamic";
import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import type { ReactNode } from "react";

const Skills = dynamicLoader(() =>
  import("@/components/skills").then((mod) => mod.Skills),
);
const Projects = dynamicLoader(() =>
  import("@/components/projects").then((mod) => mod.Projects),
);
const Photography = dynamicLoader(() =>
  import("@/components/photography").then((mod) => mod.Photography),
);
const Experience = dynamicLoader(() =>
  import("@/components/experience").then((mod) => mod.Experience),
);
const Contact = dynamicLoader(() =>
  import("@/components/contact").then((mod) => mod.Contact),
);

export function HomeClient({ children }: { children?: ReactNode }) {
  return (
    <div className="min-h-screen relative">
      <Navigation />

      <main id="main-content" className="relative z-10">
        <Hero />
        <Projects />
        <Skills />
        <Experience />
        <Photography />
        <Contact />
        {children}
      </main>
    </div>
  );
}
