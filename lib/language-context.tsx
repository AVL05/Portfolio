"use client";

import React, { createContext, useContext } from "react";
import es from "./locales/es.json";
import en from "./locales/en.json";

export type Language = "es" | "en";

export interface ProjectItem {
  title: string;
  description: string;
  summary: string;
  evidence: string[];
  image: string;
  technologies: string[];
  category: string;
  link?: string;
  github?: string;
  type: string;
  role?: string;
  outcome?: string;
  caseStudyHref?: string;
}

export interface TimelineItem {
  title: string;
  contract?: string;
  institution?: string;
  company?: string;
  period: string;
  location: string;
  description: string;
  highlights?: string[];
}

interface Translation {
  nav: {
    home: string;
    skills: string;
    experience: string;
    projects: string;
    contact: string;
  };
  hero: {
    status: string;
    description: string;
    cta_github: string;
    cta_linkedin: string;
    scroll: string;
    studio: {
      destinations: Record<"monitor" | "camera" | "pc" | "mountain", string>;
      navigation: string;
      continue: string;
    };
  };
  skills: {
    groups: { area: string; stack: string[] }[];
    title: string;
    subtitle: string;
    desc: string;
    technologies: string;
    tools: string;
  };
  experience: {
    title: string;
    subtitle: string;
    desc: string;
    edu_title: string;
    job_title: string;
    cv_title: string;
    cv_desc: string;
    cv_btn: string;
    education_list: TimelineItem[];
    experience_list: TimelineItem[];
  };
  currently: {
    title: string;
    items: { label: string; value: string; href: string }[];
  };
  projects: {
    title: string;
    subtitle: string;
    desc: string;
    concept: string;
    view_live: string;
    view_code: string;
    role_label: string;
    outcome_label: string;
    items: ProjectItem[];
  };
  photography: {
    title: string;
    subtitle: string;
    description: string;
    properties: string;
    filters: string;
    view_full: string;
  };
  contact: {
    title: string;
    subtitle: string;
    desc: string;
    form_name: string;
    form_email: string;
    form_message: string;
    form_placeholder_name: string;
    form_placeholder_email: string;
    form_placeholder_message: string;
    form_btn_send: string;
    form_btn_sending: string;
    form_success: string;
    form_error: string;
    form_error_name: string;
    form_error_email: string;
    form_error_message: string;
    links_title: string;
    availability_title: string;
    availability_desc: string;
    cv_btn: string;
    footer_built: string;
  };
}

const translations: Record<Language, Translation> = { es, en };

interface LanguageContextType {
  language: Language;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

/**
 * The language is fixed by the URL (route group) and passed from the
 * server layout. It never changes client-side: switching language is a
 * real navigation to the equivalent URL, so SSR and hydration always agree.
 */
export function LanguageProvider({
  children,
  initialLanguage = "es",
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  return (
    <LanguageContext.Provider
      value={{
        language: initialLanguage,
        t: translations[initialLanguage],
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
