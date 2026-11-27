"use client";

import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Hero } from "@/components/hero";
import { Reveal } from "@/components/reveal";
import { FeaturedProjects, OtherProjects, Skills } from "@/components/projects";
import { Section } from "@/components/section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { Education, Experience } from "@/components/timeline";
import { useLanguage } from "@/lib/language-context";
import { HOME_SECTION_IDS } from "@/lib/site";

export function HomeClient() {
  const { t } = useLanguage();
  const sections = {
    projects: <><FeaturedProjects /><OtherProjects /></>,
    experience: <Experience />,
    about: <About />,
    skills: <Skills />,
    education: <Education />,
    contact: <Contact />,
  };

  return (
    <div className="premium-home min-h-screen">
      <SiteHeader />
      <Reveal />
      <div className="site-column">
        <main id="main-content">
          <Hero />
          {HOME_SECTION_IDS.map((id) => (
            <Section key={id} id={id} title={t.sections[id]}>{sections[id]}</Section>
          ))}
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
