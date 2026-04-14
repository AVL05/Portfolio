'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'es' | 'en'

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
  }
  projects: {
    title: string
    subtitle: string
    desc: string
    concept: string
    view_live: string
    view_code: string
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

const translations: Record<Language, Translation> = {
  es: {
    nav: {
      home: 'Inicio',
      about: 'Sobre Mí',
      experience: 'Experiencia',
      projects: 'Proyectos',
      photography: 'Fotografía',
      contact: 'Contacto',
    },
    hero: {
      status: 'Disponible para nuevas oportunidades',
      description: 'Estudiante de Desarrollo de Aplicaciones Web (DAW). Construyendo el futuro digital a través de código limpio, diseño moderno y una visión creativa única.',
      cta_github: 'GitHub',
      cta_linkedin: 'LinkedIn',
      scroll: 'Scroll',
    },
    about: {
      title: '01. Sobre Mí',
      subtitle: 'Codificando con propósito y visión.',
      p1: 'Como estudiante y entusiasta del diseño, mi enfoque se centra en la intersección entre la funcionalidad técnica y la excelencia visual.',
      p2: 'Actualmente cursando Desarrollo de Aplicaciones Web, combino mi formación técnica en sistemas con una sensibilidad creativa forjada a través de la fotografía y el diseño digital.',
      formation: 'Formación',
      formation_desc: 'DAW & Sistemas Microinformáticos',
      terminal: 'Terminal',
      summary: 'Resumen',
    },
    skills: {
      title: '02. Habilidades',
      subtitle: 'Arsenal Técnico',
      desc: 'Dominio de un espectro diverso de lenguajes y herramientas para materializar visiones complejas en realidades tangibles.',
      technologies: 'Tecnologías',
      tools: 'Herramientas',
    },
    projects: {
      title: '03. Proyectos',
      subtitle: 'Selección de Trabajos',
      desc: 'Una muestra de desafíos transformados en soluciones digitales innovadoras.',
      concept: 'Estudio de Concepto',
      view_live: 'Ver Proyecto',
      view_code: 'Ver Código',
    },
    photography: {
      title: '04. Fotografía',
      subtitle: '/ Creative View',
      description: 'Explora mi mundo a través del lente. Capturando momentos, emociones y la belleza que nos rodea.',
      properties: 'Propiedades.RAW',
      filters: 'Filtros',
      view_full: 'Ver Galería Completa',
    },
    experience: {
      title: '05. Trayectoria',
      subtitle: 'Evolución y progreso.',
      desc: 'Un recorrido forjado a través de la formación continua y la aplicación práctica en entornos reales.',
      edu_title: 'Formación Académica',
      job_title: 'Experiencia Profesional',
      cv_title: '¿Necesitas un documento más detallado?',
      cv_desc: 'Descarga mi currículum profesional completo en formato PDF para obtener una visión profunda de mis capacidades técnicas.',
      cv_btn: 'DESCARGAR CV [PDF]',
    },
    contact: {
      title: '06. Contacto',
      subtitle: "/ Let's Connect",
      desc: '¿Tienes un proyecto en mente o simplemente quieres saludar? Mi puerta digital siempre está abierta.',
      form_name: 'Tu Nombre',
      form_email: 'Tu Email',
      form_message: 'Tu Mensaje',
      form_placeholder_name: 'Tu Nombre',
      form_placeholder_email: 'hola@ejemplo.com',
      form_placeholder_message: 'Cuéntame sobre tu proyecto o idea...',
      form_btn_send: 'ENVIAR MENSAJE',
      form_btn_sending: 'ENVIANDO...',
      form_success: '✓ ¡Mensaje enviado con éxito! Te responderé pronto.',
      links_title: 'Direct Links',
      visual_portfolio_title: 'Portafolio Visual',
      visual_portfolio_desc: 'Explora mis capturas y visión creativa',
      visual_portfolio_btn: 'Ver Galería →',
      footer_built: 'Diseñado con pasión. Desarrollado con precisión.',
    }
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      experience: 'Experience',
      projects: 'Projects',
      photography: 'Photography',
      contact: 'Contact',
    },
    hero: {
      status: 'Available for new opportunities',
      description: 'Web Application Development (DAW) student. Building the digital future through clean code, modern design, and a unique creative vision.',
      cta_github: 'GitHub',
      cta_linkedin: 'LinkedIn',
      scroll: 'Scroll',
    },
    about: {
      title: '01. About Me',
      subtitle: 'Coding with purpose and vision.',
      p1: 'As a student and design enthusiast, my focus is on the intersection of technical functionality and visual excellence.',
      p2: 'Currently studying Web Application Development, I combine my technical background in systems with a creative sensitivity forged through photography and digital design.',
      formation: 'Education',
      formation_desc: 'DAW & IT Systems',
      terminal: 'Terminal',
      summary: 'Summary',
    },
    skills: {
      title: '02. Skills',
      subtitle: 'Technical Arsenal',
      desc: 'Mastery of a diverse spectrum of languages and tools to materialize complex visions into tangible realities.',
      technologies: 'Technologies',
      tools: 'Tools',
    },
    projects: {
      title: '03. Projects',
      subtitle: 'Selected Works',
      desc: 'A sample of challenges transformed into innovative digital solutions.',
      concept: 'Concept Study',
      view_live: 'View Live',
      view_code: 'View Code',
    },
    photography: {
      title: '04. Photography',
      subtitle: '/ Creative View',
      description: 'Explore my world through the lens. Capturing moments, emotions and the beauty that surrounds us.',
      properties: 'Properties.RAW',
      filters: 'Filters',
      view_full: 'View Full Gallery',
    },
    experience: {
      title: '05. Journey',
      subtitle: 'Evolution and progress.',
      desc: 'A journey forged through continuous training and practical application in real environments.',
      edu_title: 'Academic Education',
      job_title: 'Professional Experience',
      cv_title: 'Need a more detailed document?',
      cv_desc: 'Download my full professional resume in PDF format to get a deep insight into my technical capabilities.',
      cv_btn: 'DOWNLOAD CV [PDF]',
    },
    contact: {
      title: '06. Contact',
      subtitle: "/ Let's Connect",
      desc: 'Have a project in mind or just want to say hello? My digital door is always open.',
      form_name: 'Your Name',
      form_email: 'Your Email',
      form_message: 'Your Message',
      form_placeholder_name: 'Your Name',
      form_placeholder_email: 'hello@example.com',
      form_placeholder_message: 'Tell me about your project or idea...',
      form_btn_send: 'SEND MESSAGE',
      form_btn_sending: 'SENDING...',
      form_success: '✓ Message sent successfully! I will get back to you soon.',
      links_title: 'Direct Links',
      visual_portfolio_title: 'Visual Portfolio',
      visual_portfolio_desc: 'Explore my captures and creative vision',
      visual_portfolio_btn: 'View Gallery →',
      footer_built: 'Built with passion. Developed with precision.',
    }
  }
}

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
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t: translations[language] }}>
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
