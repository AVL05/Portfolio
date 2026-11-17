"use client";

import React, { createContext, useContext } from "react";
import es from "./locales/es.json";
import en from "./locales/en.json";

export type Language = "es" | "en";

export interface TimelineItem {
  title: string;
  contract?: string;
  institution?: string;
  company?: string;
  period: string;
  location: string;
  description?: string;
  highlights?: string[];
}

interface Translation {
  nav: {
    skills: string;
    projects: string;
    contact: string;
    about: string;
    experience: string;
  };
  sections: {
    about: string;
    experience: string;
    projects: string;
    other: string;
    skills: string;
    education: string;
    contact: string;
  };
  hero: {
    role: string;
    tagline: string;
    location: string;
    availability: string;
    work: string;
    contact: string;
    cv: string;
  };
  about: {
    bullets: string[];
  };
  experience: {
    experience_list: TimelineItem[];
    education_list: TimelineItem[];
  };
  languages: {
    title: string;
    items: { name: string; level: string }[];
  };
  projects: {
    live: string;
    code: string;
    case: string;
    featured: { slug: string; description: string; alt: string; evidence: string[] }[];
    other: { slug: string; title: string; description: string }[];
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
    form_error_network: string;
    form_error_rate: string;
    form_error_config: string;
    form_retry: string;
    form_fallback: string;
    form_message_min: string;
    form_error_name: string;
    form_error_email: string;
    form_error_message: string;
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
