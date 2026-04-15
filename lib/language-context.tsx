'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import es from './locales/es.json'
import en from './locales/en.json'

type Language = 'es' | 'en'

interface ProjectItem {
  title: string
  description: string
  image: string
  technologies: string[]
  category: string
  link: string
  github?: string
  type: string
}

interface TimelineItem {
  title: string
  institution?: string
  company?: string
  period: string
  location: string
  description: string
}

interface Translation {
  nav: {
    home: string
    about: string
    experience: string
    projects: string
    photography: string
    contact: string
  }
  hero: {
    status: string
    description: string
    cta_github: string
    cta_linkedin: string
    scroll: string
  }
  about: {
    title: string
    subtitle: string
    p1: string
    p2: string
    formation: string
    formation_desc: string
    terminal: string
    summary: string
  }
  skills: {
    title: string
    subtitle: string
    desc: string
    technologies: string
    tools: string
  }
  experience: {
    title: string
    subtitle: string
    desc: string
    edu_title: string
    job_title: string
    cv_title: string
    cv_desc: string
    cv_btn: string
    education_list: TimelineItem[]
    experience_list: TimelineItem[]
  }
  projects: {
    title: string
    subtitle: string
    desc: string
    concept: string
    view_live: string
    view_code: string
    items: ProjectItem[]
  }
  photography: {
    title: string
    subtitle: string
    description: string
    properties: string
    filters: string
    view_full: string
  }
  contact: {
    title: string
    subtitle: string
    desc: string
    form_name: string
    form_email: string
    form_message: string
    form_placeholder_name: string
    form_placeholder_email: string
    form_placeholder_message: string
    form_btn_send: string
    form_btn_sending: string
    form_success: string
    links_title: string
    visual_portfolio_title: string
    visual_portfolio_desc: string
    visual_portfolio_btn: string
    footer_built: string
  }
}

const translations: Record<Language, any> = { es, en }

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: Translation
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>('es')

  useEffect(() => {
    const saved = localStorage.getItem('language') as Language
    if (saved && (saved === 'es' || saved === 'en')) {
      setLanguage(saved)
    }
  }, [])

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang)
    localStorage.setItem('language', lang)
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: translations[language] as Translation }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
