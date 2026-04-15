'use client'

import { useRef, useState } from 'react'
import { gsap, useGSAP } from '@/lib/gsap'
import { useLanguage } from '@/lib/language-context'
import { Terminal, User, Code2, Briefcase, GraduationCap, ChevronRight } from 'lucide-react'

const terminalLines = [
  { type: 'command', text: 'whoami' },
  { type: 'output', text: 'Alex Vicente López' },
  { type: 'command', text: 'locate --skills' },
  { type: 'output', text: 'Full-stack development, UI/UX Design, Digital Photography' },
  { type: 'command', text: 'locate --projects' },
  { type: 'output', text: '9 Projects [Web: 4, Design: 5]' },
  { type: 'command', text: 'cat philosophy.md' },
  { type: 'output', text: 'Building digital architectures where precision meets aesthetics. Every line of code is an opportunity to solve a problem beautifully.' },
]

export function About() {
  const { t } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const [activeTab, setActiveTab] = useState<'terminal' | 'bio'>('terminal')

  useGSAP(() => {
    const q = gsap.utils.selector(containerRef)

    gsap.fromTo(q('.about-reveal'),
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        }
      }
    )

    // Floating animation for the dashboard
    gsap.to(q('.dashboard-card'), {
      y: -10,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    })
  }, { scope: containerRef })

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-padding bg-background relative overflow-hidden"
    >
      {/* Background Decor */}
      <div className="absolute top-1/2 left-0 w-full h-[1px] bg-border/20 pointer-events-none" />
      <div className="absolute top-0 left-1/4 w-[1px] h-full bg-border/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">

          {/* Left Column: Content */}
          <div className="lg:col-span-6 space-y-12">
            <header className="about-reveal space-y-4">
              <div className="flex items-center gap-4 text-primary font-mono text-sm tracking-[0.3em] uppercase">
                <span className="w-8 h-[1px] bg-primary/50" />
                {t.about.title}
              </div>
              <h2 className="text-4xl sm:text-6xl font-black text-foreground tracking-tighter leading-none">
                {t.about.subtitle}
              </h2>
            </header>

            <div className="about-reveal space-y-6 text-muted-foreground text-lg leading-relaxed font-medium max-w-xl">
              <p>
                {t.about.p1}
              </p>
              <p>
                {t.about.p2}
              </p>

              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <div className="flex items-center gap-3 text-foreground">
                    <GraduationCap className="h-5 w-5 text-primary" />
                    <span className="font-bold tracking-tight">{t.about.formation}</span>
                  </div>
                  <p className="text-sm">{t.about.formation_desc}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dashboard */}
          <div className="lg:col-span-6 flex items-center justify-center">
            <div className="dashboard-card w-full max-w-2xl dev-border rounded-3xl overflow-hidden shadow-2xl dark:shadow-[0_40px_100px_-20px_rgba(0,0,0,0.6)]">
              {/* Dashboard Header */}
              <div className="px-6 py-4 border-b border-border bg-card flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                  <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
                <div className="flex items-center gap-6">
                  <button
                    onClick={() => setActiveTab('terminal')}
                    className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${activeTab === 'terminal' ? 'text-primary' : 'text-muted-foreground/50 hover:text-foreground'}`}
                  >
                    {t.about.terminal}
                  </button>
                  <button
                    onClick={() => setActiveTab('bio')}
                    className={`text-[10px] uppercase tracking-[0.2em] font-bold transition-all ${activeTab === 'bio' ? 'text-primary' : 'text-muted-foreground/50 hover:text-foreground'}`}
                  >
                    {t.about.summary}
                  </button>
                </div>
              </div>

              {/* Dashboard Body */}
              <div className="p-8 sm:p-12 min-h-[400px] flex flex-col">
                {activeTab === 'terminal' ? (
                  <div className="font-mono text-sm space-y-8">
                    {terminalLines.map((line, i) => (
                      <div key={i} className="space-y-2">
                        {line.type === 'command' ? (
                          <div className="flex items-center gap-3 text-muted-foreground">
                            <ChevronRight className="h-3 w-3 text-primary" />
                            <span className="text-foreground/80">{line.text}</span>
                          </div>
                        ) : (
                          <div className="pl-6 text-primary/80 border-l border-border py-1">
                            {line.text}
                          </div>
                        )}
                      </div>
                    ))}
                    <div className="flex items-center gap-3 text-muted-foreground pt-4">
                      <ChevronRight className="h-3 w-3 text-primary animate-pulse" />
                      <span className="w-2 h-4 bg-primary/50 animate-pulse" />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
                    <div className="flex items-center gap-6">
                      <div className="w-20 h-20 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                        <User className="h-10 w-10" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-foreground">Alex Vicente</h3>
                        <p className="text-muted-foreground font-mono text-xs uppercase tracking-widest">Estudiante de DAW & Creador Digital</p>
                      </div>
                    </div>

                    <div className="space-y-6 pt-4">
                      <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                          <span className="text-muted-foreground/50">Enfoque Actual</span>
                          <span className="text-primary">Full-Stack Dev</span>
                        </div>
                        <div className="h-1 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-primary w-[75%]" />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-[10px] font-mono uppercase tracking-widest">
                          <span className="text-muted-foreground/50">Hobby & Creatividad</span>
                          <span className="text-accent underline decoration-accent/30">Fotografía</span>
                        </div>
                        <div className="h-1 bg-secondary rounded-full overflow-hidden">
                          <div className="h-full bg-accent w-[90%]" />
                        </div>
                      </div>
                    </div>

                    <div className="pt-8 flex flex-wrap gap-3">
                      {['React', 'Vue.js', 'Laravel', 'Electron', 'Photoshop'].map((tech) => (
                        <div key={tech} className="px-4 py-2 rounded-xl bg-secondary border border-border text-[10px] font-mono uppercase text-muted-foreground hover:border-primary/30 hover:text-foreground transition-all cursor-default">
                          {tech}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}

