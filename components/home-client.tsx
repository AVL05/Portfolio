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

export function HomeClient() {
  const { t } = useLanguage();
  const s = t.sections;

  return (
    <div className="premium-home min-h-screen">
      <SiteHeader />
      <Reveal />
      <div className="site-column">
        <main id="main-content">
          <Hero />
          <Section id="about" title={s.about}><About /></Section>
          <Section id="experience" title={s.experience}><Experience /></Section>
          <Section id="projects" title={s.projects}><FeaturedProjects /></Section>
          <Section id="other" title={s.other}><OtherProjects /></Section>
          <Section id="skills" title={s.skills}><Skills /></Section>
          <Section id="education" title={s.education}><Education /></Section>
          <Section id="contact" title={s.contact}><Contact /></Section>
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
