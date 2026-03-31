'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Briefcase, Calendar, FileText, GraduationCap } from 'lucide-react'

const education = [
  {
    title: 'Desarrollo de Aplicaciones Web',
    institution: 'IES Serra Perenxisa',
    period: 'Actual',
    description:
      'Formación avanzada en desarrollo frontend y backend, bases de datos relacionales y no relacionales, y arquitectura eficiente de aplicaciones web modernas.',
  },
  {
    title: 'Sistemas Microinformáticos y Redes',
    institution: 'Grado Medio SMR',
    period: '2024',
    description:
      'Instalación, configuración y mantenimiento de sistemas microinformáticos aislados o en red, así como administración de infraestructura tecnológica.',
  },
]

const experience = [
  {
    title: 'Prácticas de Desarrollo Web',
    company: 'Burguet Sistemas',
    period: 'Actual',
    description:
      'Desarrollo y mantenimiento activo de aplicaciones web empleando frameworks actuales. Colaboración en la resolución de bugs e implementación de nuevas funcionalidades.',
  },
  {
    title: 'Diseñador Gráfico y Fotógrafo',
    company: 'Falla el Molí',
    period: '2023 - 2025',
    description:
      'Responsable de identidad visual. Gestión completa de redes sociales, creación de cartelería, dirección de reportajes fotográficos y maquetación del llibret.',
  },
  {
    title: 'Técnico en Prácticas',
    company: 'Ayuntamiento de Carlet',
    period: '2024',
    description:
      'Asistencia en el departamento de informática. Resolución de incidencias en hardware y software, mantenimiento de infraestructura de red y soporte a usuarios.',
  },
]

export function Experience() {
  return (
    <section
      id="experience"
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden text-white"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black tracking-tighter opacity-10 absolute -top-12 left-0 select-none hidden sm:block uppercase">
            JOURNEY
          </h2>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-primary font-mono relative">
            <span className="text-primary/50 mr-4 font-normal">05.</span>
            Trayectoria <span className="text-white/20 ml-2">/ My Experience</span>
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mt-4 font-medium">
            Mi camino académico y profesional en el mundo del desarrollo y el diseño digital.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20">
          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold tracking-tight uppercase">Educación</h3>
            </div>

            <div className="relative border-l border-white/10 pl-8 ml-3 space-y-12">
              {education.map((edu, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-primary group-hover:bg-primary transition-colors ring-4 ring-[#0a0a0a]" />
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {edu.title}
                      </h4>
                      <span className="text-xs font-mono text-primary/60 bg-primary/5 px-2 py-1 rounded">
                        {edu.period}
                      </span>
                    </div>
                    <p className="text-white/40 font-mono text-sm tracking-wider uppercase">
                      {edu.institution}
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed max-w-lg">
                      {edu.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-12">
            <div className="flex items-center gap-4">
              <Briefcase className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold tracking-tight uppercase">Experiencia</h3>
            </div>

            <div className="relative border-l border-white/10 pl-8 ml-3 space-y-12">
              {experience.map((exp, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-[37px] top-1.5 w-4 h-4 rounded-full bg-[#0a0a0a] border-2 border-primary group-hover:bg-primary transition-colors ring-4 ring-[#0a0a0a]" />
                  <div className="space-y-3">
                    <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                      <h4 className="text-xl font-bold text-white group-hover:text-primary transition-colors">
                        {exp.title}
                      </h4>
                      <span className="text-xs font-mono text-primary/60 bg-primary/5 px-2 py-1 rounded">
                        {exp.period}
                      </span>
                    </div>
                    <p className="text-white/40 font-mono text-sm tracking-wider uppercase">
                      {exp.company}
                    </p>
                    <p className="text-white/60 text-sm leading-relaxed max-w-lg">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-24 text-center">
          <div className="inline-block p-10 bg-[#111111] border border-white/5 rounded-3xl max-w-2xl group hover:border-primary/20 transition-all">
            <h3 className="text-2xl font-bold mb-4">¿Quieres saber más?</h3>
            <p className="text-white/50 mb-8 max-w-md mx-auto text-pretty">
              Puedes descargar mi currículum completo para ver todos los detalles de mi formación técnica y trayectoria profesional.
            </p>
            <Button size="lg" asChild className="bg-primary text-black font-bold hover:bg-primary/90 px-8 py-6 rounded-2xl">
              <a href="/curriculum.pdf" download>
                <FileText className="h-5 w-5 mr-3" />
                Descargar CV [PDF]
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
