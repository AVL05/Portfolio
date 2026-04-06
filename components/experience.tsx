'use client'

import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Briefcase, Calendar, FileText, GraduationCap, ChevronRight, MapPin } from 'lucide-react'
import { gsap, useGSAP } from '@/lib/gsap'

const education = [
  {
    title: 'Desarrollo de Aplicaciones Web',
    institution: 'IES Serra Perenxisa',
    period: '2024 - 2026',
    location: 'Torrent, Valencia',
    description:
      'Especialización técnica en arquitecturas web modernas, gestión de bases de datos de alto rendimiento y despliegue de infraestructuras escalables. Enfoque práctico en frameworks de vanguardia y metodologías ágiles.',
  },
  {
    title: 'Sistemas Microinformáticos y Redes',
    institution: 'Enseñanzas Profesionales Sorolla',
    period: '2022 - 2024',
    location: 'Valencia',
    description:
      'Fundamentos sólidos en administración de sistemas, seguridad en redes e infraestructura de hardware. Resolución de problemas críticos y optimización de entornos tecnológicos empresariales.',
  },
]

const experience = [
  {
    title: 'Software Developer (Intern)',
    company: 'Burguet Sistemas',
    period: '2024 - Presente',
    location: 'Xirivella, Valencia',
    description:
      'Colaboración activa en el ciclo de vida de desarrollo de aplicaciones empresariales. Convertir aplicacion de Java a REACT y Electron, y web PHP a REACT y PHP.',
  },
  {
    title: 'Visual Identity & Digital Strategy',
    company: 'Comisiones Culturales',
    period: '2023 - 2025',
    location: 'Valencia, España',
    description:
      'Liderazgo en la transformación digital de la comunicación visual. Dirección artística de publicaciones editoriales, gestión estratégica de redes sociales y creación de activos multimedia de alto impacto.',
  },
  {
    title: 'IT Support Technical',
    company: 'Soporte Municipal',
    period: '2024',
    location: 'Carlet, Valencia',
    description:
      'Gestión integral de incidencias tecnológicas en entornos públicos. Soporte técnico especializado en hardware y software, asegurando la continuidad operativa de los servicios.',
  },
]

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null)

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef)

    gsap.fromTo(q('.experience-header'),
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1.5,
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    )

    gsap.fromTo(q('.timeline-item'),
      { opacity: 0, y: 30 },
      {
        opacity: 1,
        y: 0,
        stagger: 0.2,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: q('.timeline-grid'),
          start: 'top 85%',
        }
      }
    )
  }, { scope: containerRef })

  return (
    <section
      id="experience"
      ref={containerRef}
      className="section-padding bg-background relative overflow-hidden"
    >
      {/* Absolute BG Decor */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-white/5 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <header className="experience-header mb-32 space-y-6">
          <div className="flex items-center gap-4 text-primary font-mono text-sm tracking-[0.3em] uppercase">
            <span className="w-8 h-[1px] bg-primary/50" />
            05. Trayectoria
          </div>
          <h2 className="text-4xl sm:text-7xl font-black text-white tracking-tighter leading-none">
            Evolución y <span className="text-primary italic">progreso</span>.
          </h2>
          <p className="text-white/50 text-xl font-medium max-w-2xl text-balance">
            Un recorrido forjado a través de la formación continua y la aplicación práctica en entornos reales.
          </p>
        </header>

        <div className="timeline-grid grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Education */}
          <div className="space-y-16">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <GraduationCap className="h-7 w-7" />
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight">Formación Académica</h3>
            </div>

            <div className="space-y-12 relative">
               {/* Vertical line connection */}
              <div className="absolute left-[27px] top-4 bottom-4 w-[1px] bg-white/5" />

              {education.map((edu, i) => (
                <div key={i} className="timeline-item relative pl-20 group">
                  <div className="absolute left-0 top-2 w-14 h-14 bg-background border border-white/10 rounded-2xl flex items-center justify-center z-10 group-hover:border-primary/50 transition-colors">
                    <span className="text-xs font-mono text-white/30 group-hover:text-primary transition-colors">0{i+1}</span>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-4">
                        <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{edu.title}</h4>
                        <span className="text-[10px] font-mono text-primary/60 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">{edu.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/30 text-xs font-mono uppercase tracking-widest">
                        <span className="text-white/50 font-bold">{edu.institution}</span>
                        <span className="opacity-30">•</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {edu.location}</span>
                      </div>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed font-medium">
                      {edu.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Job Experience */}
          <div className="space-y-16">
            <div className="flex items-center gap-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                <Briefcase className="h-7 w-7" />
              </div>
              <h3 className="text-3xl font-bold text-white tracking-tight">Experiencia Profesional</h3>
            </div>

            <div className="space-y-12 relative">
               {/* Vertical line connection */}
              <div className="absolute left-[27px] top-4 bottom-4 w-[1px] bg-white/5" />

              {experience.map((exp, i) => (
                <div key={i} className="timeline-item relative pl-20 group">
                  <div className="absolute left-0 top-2 w-14 h-14 bg-background border border-white/10 rounded-2xl flex items-center justify-center z-10 group-hover:border-primary/50 transition-colors">
                    <span className="text-xs font-mono text-white/30 group-hover:text-primary transition-colors">0{i+1}</span>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1">
                      <div className="flex items-center justify-between gap-4">
                        <h4 className="text-2xl font-bold text-white group-hover:text-primary transition-colors">{exp.title}</h4>
                        <span className="text-[10px] font-mono text-primary/60 bg-primary/5 px-3 py-1 rounded-full border border-primary/10">{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-2 text-white/30 text-xs font-mono uppercase tracking-widest">
                        <span className="text-white/50 font-bold">{exp.company}</span>
                        <span className="opacity-30">•</span>
                        <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {exp.location}</span>
                      </div>
                    </div>
                    <p className="text-white/40 text-sm leading-relaxed font-medium">
                      {exp.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-32 p-12 lg:p-20 dev-border rounded-[4rem] bg-[#070707] flex flex-col md:flex-row items-center justify-between gap-12 group hover:bg-[#0a0a0a] transition-all">
          <div className="space-y-4 text-center md:text-left">
            <h3 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">¿Necesitas un documento más detallado?</h3>
            <p className="text-white/40 text-lg font-medium max-w-xl">
              Descarga mi currículum profesional completo en formato PDF para obtener una visión profunda de mis capacidades técnicas.
            </p>
          </div>
          <Button asChild size="lg" className="h-20 px-10 bg-primary text-black font-black hover:bg-white rounded-3xl transition-all shadow-2xl shrink-0">
             <a href="/curriculum.pdf" download className="flex items-center gap-3">
                <FileText className="h-6 w-6" />
                DESCARGAR CV [PDF]
                <ChevronRight className="h-5 w-5 opacity-50" />
              </a>
          </Button>
        </div>
      </div>
    </section>
  )
}

