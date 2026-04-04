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
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-[#0a0a0a] relative overflow-hidden text-white"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-20">
          <h2 className="text-4xl sm:text-6xl md:text-7xl 2xl:text-8xl font-black tracking-tighter opacity-10 absolute -top-12 left-0 select-none hidden sm:block uppercase">
            SAY HELLO
          </h2>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary font-mono relative">
            <span className="text-primary/50 mr-4 font-normal">06.</span>
            Contacto <span className="text-white/20 ml-2">/ Let's Connect</span>
          </h2>
          <p className="text-base sm:text-lg text-white/50 max-w-2xl mt-4 font-medium">
            ¿Tienes un proyecto en mente o simplemente quieres saludar? Mi puerta digital siempre está abierta.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 sm:gap-20">
          <Card className="p-0 overflow-hidden bg-[#111111] border-white/5 shadow-2xl rounded-3xl hover:border-primary/20 transition-all">
            <div className="flex items-center gap-2 px-6 py-4 bg-[#181818] border-b border-white/5">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full bg-red-400/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/20"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-green-400/20"></div>
              </div>
              <span className="ml-4 text-xs font-mono text-white/30 truncate flex-1 uppercase tracking-widest font-bold">
                send_message.sh
              </span>
            </div>

            <form onSubmit={handleSubmit} className="p-8 sm:p-10 space-y-8">
              <div className="space-y-4">
                <label htmlFor="name" className="text-sm font-black uppercase tracking-widest text-primary/80 ml-1">
                  Tu Nombre
                </label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Alex Vicente"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-white/5 border-white/5 focus-visible:ring-primary/50 focus-visible:border-primary placeholder:text-white/20 rounded-2xl py-7 px-6 text-lg font-medium"
                  required
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="email" className="text-sm font-black uppercase tracking-widest text-primary/80 ml-1">
                  Tu Email
                </label>
                <Input
                  id="email"
                  type="email"
                  placeholder="hola@ejemplo.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-white/5 border-white/5 focus-visible:ring-primary/50 focus-visible:border-primary placeholder:text-white/20 rounded-2xl py-7 px-6 text-lg font-medium"
                  required
                />
              </div>

              <div className="space-y-4">
                <label htmlFor="message" className="text-sm font-black uppercase tracking-widest text-primary/80 ml-1">
                  Tu Mensaje
                </label>
                <Textarea
                  id="message"
                  placeholder="Cuéntame sobre tu proyecto o idea..."
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/5 border-white/5 focus-visible:ring-primary/50 focus-visible:border-primary placeholder:text-white/20 rounded-2xl p-6 text-lg font-medium resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-primary text-black font-black text-lg py-8 rounded-2xl hover:bg-primary/90 hover:shadow-[0_0_40px_rgba(119,255,150,0.3)] transition-all group"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'ENVIANDO...' : 'ENVIAR MENSAJE'}
              </Button>

              {submitStatus === 'success' && (
                <p className="text-sm text-primary font-bold text-center animate-pulse">
                  ✓ ¡Mensaje enviado con éxito! Te responderé pronto.
                </p>
              )}
            </form>
          </Card>

          <div className="flex flex-col justify-between py-4">
            <div className="space-y-12">
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-white/30 mb-8 ml-1">
                  Direct Links
                </h3>
                <div className="space-y-6">
                  <a
                    href="mailto:alexviclop@gmail.com"
                    className="flex items-center gap-6 text-2xl sm:text-3xl font-bold group hover:text-primary transition-colors"
                  >
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-primary group-hover:text-black transition-all">
                      <Mail className="h-6 w-6" />
                    </div>
                    alexviclop@gmail.com
                  </a>
                  <a
                    href="https://github.com/AVL05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 text-2xl sm:text-3xl font-bold group hover:text-primary transition-colors"
                  >
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-primary group-hover:text-black transition-all">
                      <Github className="h-6 w-6" />
                    </div>
                    github.com/AVL05
                  </a>
                  <a
                    href="https://www.linkedin.com/in/alex-vicente-lopez/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 text-2xl sm:text-3xl font-bold group hover:text-primary transition-colors"
                  >
                    <div className="p-4 bg-white/5 rounded-2xl group-hover:bg-primary group-hover:text-black transition-all">
                      <Linkedin className="h-6 w-6" />
                    </div>
                    linkedin / alexvicvicente
                  </a>
                </div>
              </div>

              <Card className="p-8 bg-[#111111] border-white/5 rounded-3xl mt-12 group hover:border-primary/20 transition-all">
                <div className="flex flex-col sm:flex-row items-center gap-6">
                  <div className="p-5 bg-primary/10 rounded-2xl text-primary">
                    <Camera className="h-8 w-8" />
                  </div>
                  <div className="text-center sm:text-left">
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">Portafolio Visual</h3>
                    <p className="text-white/40 text-sm mb-4">Explora mis capturas y visión creativa</p>
                    <Button variant="link" asChild className="text-primary font-bold p-0 h-auto hover:text-white transition-colors">
                      <a href="#photography">Ver Galería →</a>
                    </Button>
                  </div>
                </div>
              </Card>
            </div>

            <footer className="mt-20 pt-10 border-t border-white/5 text-center sm:text-left">
              <p className="text-white/20 text-xs font-mono tracking-widest uppercase mb-2">
                © 2025 Alex Vicente López
              </p>
              <p className="text-white/40 text-sm font-medium">
                Diseñado con pasión. Desarrollado con precisión.
              </p>
            </footer>
          </div>
        </div>
      </div>
    </section>
  )
}
