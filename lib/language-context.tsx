"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { flushSync } from "react-dom";
import { useRouter } from "next/navigation";
import { ScrollTrigger } from "@/lib/gsap";
import es from "./locales/es.json";
import en from "./locales/en.json";

export type Language = "es" | "en";

interface ProjectItem {
  title: string;
  description: string;
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
  };
  skills: {
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
    email_btn: string;
    visual_portfolio_title: string;
    visual_portfolio_desc: string;
    visual_portfolio_btn: string;
    footer_built: string;
  };
}

const translations: Record<Language, Translation> = { es, en };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: Translation;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

type ViewTransitionDocument = Document & {
  startViewTransition?: (update: () => void) => {
    finished: Promise<void>;
  };
};

export function LanguageProvider({
  children,
  initialLanguage = "es",
}: {
  children: React.ReactNode;
  initialLanguage?: Language;
}) {
  const [language, setLanguage] = useState<Language>(initialLanguage);
  const router = useRouter();

  useEffect(() => {
    const saved = localStorage.getItem("language") as Language;
    if (saved && (saved === "es" || saved === "en")) {
      setLanguage(saved);
      document.documentElement.lang = saved;
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
      if (saved !== initialLanguage) {
        void fetch("/api/language", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ language: saved }),
        }).then((response) => {
          if (response.ok) router.refresh();
        });
      }
    }
  }, [initialLanguage, router]);

  const handleSetLanguage = (lang: Language) => {
    if (lang === language) return;

    const updateLanguage = () => {
      flushSync(() => setLanguage(lang));
      document.documentElement.lang = lang;
      window.requestAnimationFrame(() => ScrollTrigger.refresh());
    };
    const transitionDocument = document as ViewTransitionDocument;
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (transitionDocument.startViewTransition && !reduceMotion) {
      transitionDocument.startViewTransition(updateLanguage);
    } else {
      updateLanguage();
    }

    localStorage.setItem("language", lang);
    void fetch("/api/language", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: lang }),
    }).then((response) => {
      if (response.ok) router.refresh();
    });
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage: handleSetLanguage,
        t: translations[language],
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
