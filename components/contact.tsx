"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import type React from "react";
import { useState, useRef } from "react";
import { useLanguage } from "@/lib/language-context";
import { RevealHeader } from "@/components/reveal-header";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";

export function Contact() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLDivElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    botcheck: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const items = q(".contact-item");

      if (prefersReducedMotion()) {
        gsap.set(items, { opacity: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        items,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          immediateRender: false,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            once: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "d72eeacd-28fc-442b-83bd-b8c383c5997e",
          subject: "Nuevo contacto - Portfolio Dev",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          botcheck: formData.botcheck,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitStatus("success");
        setFormData({ name: "", email: "", message: "", botcheck: "" });
      } else {
        setSubmitStatus("error");
      }
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative overflow-hidden bg-background px-4 py-24 sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border/50 to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <RevealHeader
          title={t.contact.title}
          subtitle={t.contact.subtitle}
          description={t.contact.desc}
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] lg:gap-16">
          <div className="contact-item">
            <Card className="dev-panel overflow-hidden">
              <form onSubmit={handleSubmit} className="space-y-6 p-6 sm:p-8">
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.botcheck}
                  onChange={(e) =>
                    setFormData({ ...formData, botcheck: e.target.checked ? "true" : "" })
                  }
                />

                <div className="space-y-2">
                  <label htmlFor="name" className="ml-0.5 block text-xs font-bold uppercase tracking-widest text-primary/75">
                    {t.contact.form_name}
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t.contact.form_placeholder_name}
                    value={formData.name}
                    maxLength={120}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="rounded-xl border-border/70 bg-secondary/50 px-4 py-5 text-base placeholder:text-muted-foreground/40 focus-visible:border-primary focus-visible:ring-primary/40"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="email" className="ml-0.5 block text-xs font-bold uppercase tracking-widest text-primary/75">
                    {t.contact.form_email}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.contact.form_placeholder_email}
                    value={formData.email}
                    maxLength={254}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="rounded-xl border-border/70 bg-secondary/50 px-4 py-5 text-base placeholder:text-muted-foreground/40 focus-visible:border-primary focus-visible:ring-primary/40"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="ml-0.5 block text-xs font-bold uppercase tracking-widest text-primary/75">
                    {t.contact.form_message}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t.contact.form_placeholder_message}
                    rows={5}
                    value={formData.message}
                    maxLength={4000}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="resize-none rounded-xl border-border/70 bg-secondary/50 p-4 text-base placeholder:text-muted-foreground/40 focus-visible:border-primary focus-visible:ring-primary/40"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="group w-full rounded-xl bg-primary py-6 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:scale-[0.99]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? t.contact.form_btn_sending : t.contact.form_btn_send}
                </Button>

                {submitStatus === "success" && (
                  <p className="text-center text-sm font-medium text-primary">
                    {t.contact.form_success}
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="text-center text-sm font-medium text-destructive">
                    Algo salió mal. Intenta de nuevo.
                  </p>
                )}
              </form>
            </Card>
          </div>

          <div className="contact-item flex flex-col justify-between py-2">
            <div className="space-y-8">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-muted-foreground/40">
                {t.contact.links_title}
              </p>
              <div className="space-y-5">
                <a
                  href="mailto:alexviclop@gmail.com"
                  className="group flex min-w-0 items-center gap-4 text-xl font-bold transition-colors hover:text-primary sm:text-2xl"
                >
                  <div className="shrink-0 rounded-xl border border-border/70 bg-secondary p-3.5 transition-all group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground">
                    <Mail className="h-5 w-5" />
                  </div>
                  <span className="min-w-0 break-all text-foreground group-hover:text-primary transition-colors">
                    alexviclop@gmail.com
                  </span>
                </a>
                <a
                  href="https://github.com/AVL05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-w-0 items-center gap-4 text-xl font-bold transition-colors sm:text-2xl"
                >
                  <div className="shrink-0 rounded-xl border border-border/70 bg-secondary p-3.5 transition-all group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground">
                    <FaGithub className="h-5 w-5" />
                  </div>
                  <span className="min-w-0 break-all text-foreground group-hover:text-primary transition-colors">
                    github.com/AVL05
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/alex-vicente-lopez/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-w-0 items-center gap-4 text-xl font-bold transition-colors sm:text-2xl"
                >
                  <div className="shrink-0 rounded-xl border border-border/70 bg-secondary p-3.5 transition-all group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground">
                    <FaLinkedin className="h-5 w-5" />
                  </div>
                  <span className="min-w-0 text-foreground group-hover:text-primary transition-colors">
                    linkedin/alex-vicente-lopez
                  </span>
                </a>
              </div>

              <a
                href="https://gallery.aleviclop.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {t.contact.visual_portfolio_btn}
              </a>
            </div>

            <footer className="mt-16 border-t border-border/50 pt-8 text-center sm:text-left">
              <p className="text-muted-foreground/30 text-xs font-mono tracking-widest uppercase mb-1">
                &copy; 2026 Alex Vicente Lopez
              </p>
              <p className="text-muted-foreground text-sm font-medium">
                {t.contact.footer_built}
              </p>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
