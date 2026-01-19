import { About } from "@/components/about";
import { AnimatedBackground } from "@/components/animated-background";
import { Contact } from "@/components/contact";
import { Experience } from "@/components/experience";
import { Hero } from "@/components/hero";
import { LoadingScreen } from "@/components/loading-screen";
import { Navigation } from "@/components/navigation";
import { Photography } from "@/components/photography";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";

export const metadata = {
  title: "Inicio",
  description:
    "Portafolio de Alex Vicente López — Desarrollador Web, Fotógrafo y Diseñador Digital.",
};

export default function Home() {
  return (
    <div className="min-h-screen relative">
      <LoadingScreen />
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
