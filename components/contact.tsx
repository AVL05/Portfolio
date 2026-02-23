'use client'

import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Camera, Github, Linkedin, Mail } from 'lucide-react'
import type React from 'react'
import { useState } from 'react'

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(
    null
  )

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: 'd72eeacd-28fc-442b-83bd-b8c383c5997e',
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      })

      const data = await response.json()

      if (data.success) {
        setSubmitStatus('success')
        setFormData({ name: '', email: '', message: '' })
      } else {
        setSubmitStatus('error')
      }
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section
      id="contact"
      className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-background"
    >
      <div className="max-w-4xl mx-auto">
        <div className="space-y-4 mb-8 sm:mb-12 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-balance text-primary font-mono tracking-tight">
            {'< Contacto />'}
          </h2>
          <p className="sm:text-lg text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed px-2 font-mono text-sm">
            // ¿Quieres hablar sobre un proyecto? Ejecuta el script de abajo o
            utiliza las conexiones directas.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          <Card className="p-0 overflow-hidden bg-[#0d1117] border-primary/20 shadow-2xl">
            {/* Terminal Header */}
            <div className="flex items-center gap-2 px-4 py-3 bg-[#161b22] border-b border-primary/20">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
              <span className="ml-2 text-xs font-mono text-muted-foreground/70 flex-1 text-center pr-8">
                contact_form.sh
              </span>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="flex items-center text-sm font-mono text-primary mb-2"
                >
                  <span className="mr-2 text-green-400">▹</span> Nombre
                </label>
                <div className="flex items-center relative">
                  <Input
                    id="name"
                    type="text"
                    placeholder="Tu nombre completo"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="font-mono bg-black/30 border-primary/20 focus-visible:ring-primary/50 focus-visible:border-primary placeholder:text-muted-foreground/50 rounded-md py-6"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="flex items-center text-sm font-mono text-primary mb-2"
                >
                  <span className="mr-2 text-green-400">▹</span> Correo
                  Electrónico
                </label>
                <div className="flex items-center relative">
                  <Input
                    id="email"
                    type="email"
                    placeholder="tu@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="font-mono bg-black/30 border-primary/20 focus-visible:ring-primary/50 focus-visible:border-primary placeholder:text-muted-foreground/50 rounded-md py-6"
                    required
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="flex items-center text-sm font-mono text-primary mb-2"
                >
                  <span className="mr-2 text-green-400">▹</span> Mensaje
                </label>
                <div className="relative">
                  <Textarea
                    id="message"
                    placeholder="Cuéntame sobre tu proyecto..."
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="font-mono bg-black/30 border-primary/20 focus-visible:ring-primary/50 focus-visible:border-primary placeholder:text-muted-foreground/50 rounded-md resize-none"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full font-mono bg-primary text-[#0d1117] hover:bg-primary/80 hover:shadow-[0_0_15px_rgba(119,255,150,0.4)] transition-all duration-300 group"
                disabled={isSubmitting}
              >
                <span className="mr-2 group-hover:translate-x-1 transition-transform">
                  {'>'}
                </span>
                {isSubmitting ? 'Enviando mensaje...' : '[ Enviar Mensaje_ ]'}
              </Button>

              {submitStatus === 'success' && (
                <p className="text-sm text-green-600 dark:text-green-400 text-center">
                  ¡Mensaje enviado con éxito! Te responderé pronto.
                </p>
              )}

              {submitStatus === 'error' && (
                <p className="text-sm text-red-600 dark:text-red-400 text-center">
                  Hubo un error al enviar el mensaje. Por favor, intenta de
                  nuevo.
                </p>
              )}
            </form>
          </Card>

          <div className="space-y-6">
            <Card className="p-6 bg-[#0d1117] border-primary/20 shadow-xl">
              <h3 className="text-xl font-bold font-mono text-primary mb-4">
                {'< Conexiones />'}
              </h3>
              <div className="space-y-4 font-mono">
                <a
                  href="mailto:alexviclop@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-green-400 transition-colors group"
                >
                  <div className="p-2 bg-black/50 border border-primary/20 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <Mail className="h-5 w-5 group-hover:text-primary transition-colors" />
                  </div>
                  <span>alexviclop@gmail.com</span>
                </a>
                <a
                  href="https://github.com/AVL05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-green-400 transition-colors group"
                >
                  <div className="p-2 bg-black/50 border border-primary/20 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <Github className="h-5 w-5 group-hover:text-primary transition-colors" />
                  </div>
                  <span>github.com/AVL05</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/alex-vicente-lopez/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-muted-foreground hover:text-green-400 transition-colors group"
                >
                  <div className="p-2 bg-black/50 border border-primary/20 rounded-lg group-hover:bg-primary/10 transition-colors">
                    <Linkedin className="h-5 w-5 group-hover:text-primary transition-colors" />
                  </div>
                  <span>linkedin.com/in/alexvicente</span>
                </a>
              </div>
            </Card>

            <Card className="p-6 bg-linear-to-br from-primary/5 to-accent/5 border-primary/20 shadow-xl">
              <div className="flex items-start gap-3">
                <Camera className="h-6 w-6 text-primary mt-1" />
                <div>
                  <h3 className="text-xl font-bold font-mono text-primary mb-2">
                    {'< Portfolio Fotografico />'}
                  </h3>
                  <p className="text-muted-foreground text-pretty leading-relaxed mb-4 text-sm font-mono">
                    // Explora mi colección visual
                  </p>
                  <Button
                    variant="outline"
                    asChild
                    className="font-mono bg-transparent text-primary border-primary/30 hover:bg-primary/10 hover:border-primary"
                  >
                    <a href="#photography">Ver Galería</a>
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        <footer className="mt-12 sm:mt-16 pt-6 sm:pt-8 border-t border-border text-center text-xs sm:text-sm text-muted-foreground">
          <p>© 2025 Alex Vicente López. Diseñado y desarrollado con pasión</p>
        </footer>
      </div>
    </section>
  )
}
