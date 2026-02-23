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
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30"
    >
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-8 sm:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-balance">
            Experiencia y Formación
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed px-2">
            Mi trayectoria académica y profesional en el mundo del desarrollo y
            diseño digital
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-16 relative">
          <div className="space-y-8 relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg border border-primary/20">
                <GraduationCap className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-mono font-bold text-primary">
                {'< Educación />'}
              </h3>
            </div>

            <div className="relative border-l-2 border-primary/30 pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-10">
              {education.map((edu, index) => (
                <div key={index} className="relative group">
                  {/* Git commit node */}
                  <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:bg-primary ring-4 ring-background transition-colors cursor-pointer" />

                  <Card className="p-5 sm:p-6 bg-[#0d1117] border-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(119,255,150,0.1)] transition-all font-mono">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-lg font-bold text-green-400">
                          {edu.title}
                        </h4>
                        <p className="text-purple-400 font-medium text-sm sm:text-base mt-1">
                          Centro:{' '}
                          <span className="text-foreground">
                            {edu.institution}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-yellow-500/80">
                        <Calendar className="h-4 w-4" />
                        <span>Date: {edu.period}</span>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed border-l-2 border-primary/20 pl-3">
                        {edu.description}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-8 relative">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-2 sm:p-3 bg-primary/10 rounded-lg border border-primary/20">
                <Briefcase className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-mono font-bold text-primary">
                {'< Experiencia />'}
              </h3>
            </div>

            <div className="relative border-l-2 border-primary/30 pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-10">
              {experience.map((exp, index) => (
                <div key={index} className="relative group">
                  {/* Git commit node */}
                  <div className="absolute -left-[33px] sm:-left-[41px] top-1.5 w-4 h-4 rounded-full bg-background border-2 border-primary group-hover:bg-primary ring-4 ring-background transition-colors cursor-pointer" />

                  <Card className="p-5 sm:p-6 bg-[#0d1117] border-primary/20 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(119,255,150,0.1)] transition-all font-mono">
                    <div className="space-y-3">
                      <div>
                        <h4 className="text-lg font-bold text-green-400">
                          {exp.title}
                        </h4>
                        <p className="text-purple-400 font-medium text-sm sm:text-base mt-1">
                          Empresa:{' '}
                          <span className="text-foreground">{exp.company}</span>
                        </p>
                      </div>

                      <div className="flex items-center gap-2 text-sm text-yellow-500/80">
                        <Calendar className="h-4 w-4" />
                        <span>Date: {exp.period}</span>
                      </div>

                      <p className="text-muted-foreground text-sm leading-relaxed border-l-2 border-primary/20 pl-3">
                        {exp.description}
                      </p>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 text-center">
          <Card className="inline-block p-6 sm:p-8 max-w-2xl mx-4">
            <h3 className="text-xl sm:text-2xl font-semibold mb-3 sm:mb-4">
              Mi Currículum
            </h3>
            <p className="text-sm sm:text-base text-muted-foreground mb-4 sm:mb-6 text-pretty leading-relaxed">
              Descarga mi CV completo para más detalles sobre mi experiencia y
              formación
            </p>
            <Button size="lg" asChild className="w-full sm:w-auto">
              <a href="/curriculum.pdf" download>
                <FileText className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Descargar CV
              </a>
            </Button>
          </Card>
        </div>
      </div>
    </section>
  )
}
