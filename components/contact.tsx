"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight, CheckCircle2, FileText, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import type React from "react";
import { useRef, useState } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import { RevealHeader } from "@/components/reveal-header";
export function Contact() {
  const { t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    botcheck: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
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

  useGSAP(
    () => {
      const q = gsap.utils.selector(containerRef);
      const items = q(".contact-item");
      if (!items.length) return;

      if (prefersReducedMotion()) {
        gsap.set(items, { autoAlpha: 1, y: 0 });
        return;
      }

      gsap.fromTo(
        items,
        { autoAlpha: 0, y: 48 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 70%",
            once: true,
          },
        },
      );
    },
    { scope: containerRef },
  );

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative overflow-hidden bg-background px-4 py-24 sm:px-6 sm:py-36 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 glow-divider" />
      <div className="pointer-events-none absolute right-[-12rem] top-[15%] h-[40rem] w-[40rem] rounded-full bg-primary/7 blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <RevealHeader
          title={t.contact.title}
          subtitle={t.contact.subtitle}
          description={t.contact.desc}
        />

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-14">
          <div className="contact-item">
            <Card className="dev-panel overflow-hidden py-0">
              <form onSubmit={handleSubmit} className="space-y-6 p-5 sm:p-8">
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.botcheck}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      botcheck: e.target.checked ? "true" : "",
                    })
                  }
                />

                <div className="space-y-2">
                  <label
                    htmlFor="name"
                    className="ml-0.5 block text-xs font-bold uppercase tracking-[0.16em] text-primary/80"
                  >
                    {t.contact.form_name}
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t.contact.form_placeholder_name}
                    value={formData.name}
                    maxLength={120}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="rounded-lg border-border/70 bg-secondary/50 px-4 py-5 text-base placeholder:text-muted-foreground/40 focus-visible:border-primary focus-visible:ring-primary/40"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="ml-0.5 block text-xs font-bold uppercase tracking-[0.16em] text-primary/80"
                  >
                    {t.contact.form_email}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.contact.form_placeholder_email}
                    value={formData.email}
                    maxLength={254}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="rounded-lg border-border/70 bg-secondary/50 px-4 py-5 text-base placeholder:text-muted-foreground/40 focus-visible:border-primary focus-visible:ring-primary/40"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="ml-0.5 block text-xs font-bold uppercase tracking-[0.16em] text-primary/80"
                  >
                    {t.contact.form_message}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t.contact.form_placeholder_message}
                    rows={5}
                    value={formData.message}
                    maxLength={4000}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="resize-none rounded-lg border-border/70 bg-secondary/50 p-4 text-base placeholder:text-muted-foreground/40 focus-visible:border-primary focus-visible:ring-primary/40"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="group w-full rounded-lg bg-primary py-6 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:scale-[0.99]"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t.contact.form_btn_sending
                    : t.contact.form_btn_send}
                </Button>

                {submitStatus === "success" && (
                  <p className="rounded-lg border border-primary/25 bg-primary/10 px-4 py-3 text-center text-sm font-medium text-primary">
                    {t.contact.form_success}
                  </p>
                )}
                {submitStatus === "error" && (
                  <p className="rounded-lg border border-destructive/25 bg-destructive/10 px-4 py-3 text-center text-sm font-medium text-destructive">
                    {t.contact.form_error}
                  </p>
                )}
              </form>
            </Card>
          </div>

          <div className="contact-item flex flex-col justify-between rounded-xl border border-border/60 bg-card/40 p-5 py-6 backdrop-blur-sm sm:p-8">
            <div className="space-y-8">
              <p className="text-xs font-bold uppercase tracking-[0.26em] text-muted-foreground/40">
                {t.contact.links_title}
              </p>
              <div className="rounded-xl border border-primary/25 bg-primary/10 p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  {t.contact.availability_title}
                </div>
                <p className="text-sm font-medium leading-relaxed text-foreground/82">
                  {t.contact.availability_desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href="/cv/CV_Alex_Vicente_Lopez_General_A4.pdf"
                    download
                    className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                  >
                    <FileText className="h-4 w-4" />
                    {t.contact.cv_btn}
                  </a>
                  <a
                    href="mailto:alexviclop@gmail.com"
                    className="inline-flex items-center gap-2 rounded-lg border border-primary/35 bg-background/35 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
                  >
                    <Mail className="h-4 w-4" />
                    {t.contact.email_btn}
                  </a>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-2 font-mono text-[10px] font-bold uppercase tracking-[0.1em] text-primary/80">
                  <a href="/cv/CV_Alex_Vicente_Lopez_Full_Stack_A4.pdf" download className="hover:text-primary hover:underline">Full Stack</a>
                  <a href="/cv/CV_Alex_Vicente_Lopez_Frontend_React_A4.pdf" download className="hover:text-primary hover:underline">Frontend React</a>
                  <a href="/cv/CV_Alex_Vicente_Lopez_Backend_Laravel_PHP_A4.pdf" download className="hover:text-primary hover:underline">Backend Laravel/PHP</a>
                </div>
              </div>
              <div className="space-y-5">
                <a
                  href="mailto:alexviclop@gmail.com"
                  className="group flex min-w-0 items-center gap-4 text-xl font-bold transition-colors hover:text-primary sm:text-2xl"
                >
                  <div className="shrink-0 rounded-lg border border-border/70 bg-secondary p-3.5 transition-all group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground">
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
                  <div className="shrink-0 rounded-lg border border-border/70 bg-secondary p-3.5 transition-all group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground">
                    <FaGithub className="h-5 w-5" />
                  </div>
                  <span className="min-w-0 break-all text-foreground group-hover:text-primary transition-colors">
                    github.com/AVL05
                  </span>
                </a>
                <a
                  href="https://www.linkedin.com/in/aleviclop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex min-w-0 items-center gap-4 text-xl font-bold transition-colors sm:text-2xl"
                >
                  <div className="shrink-0 rounded-lg border border-border/70 bg-secondary p-3.5 transition-all group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground">
                    <FaLinkedin className="h-5 w-5" />
                  </div>
                  <span className="min-w-0 text-foreground group-hover:text-primary transition-colors">
                    linkedin/aleviclop
                  </span>
                </a>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/35 p-5">
                <p className="mb-2 text-sm font-bold text-foreground">
                  {t.contact.visual_portfolio_title}
                </p>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {t.contact.visual_portfolio_desc}
                </p>
                <a
                  href="https://gallery.aleviclop.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  {t.contact.visual_portfolio_btn}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <footer className="mt-16 border-t border-border/50 pt-8 text-center sm:text-left">
              <p className="text-muted-foreground/30 text-xs font-mono tracking-widest uppercase mb-1">
                &copy; 2026 Alex Vicente López
              </p>
              <p className="text-muted-foreground text-sm font-medium mb-4">
                {t.contact.footer_built}
              </p>
              <Link
                href="/legal"
                className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted-foreground/40 transition-colors hover:text-primary"
              >
                Aviso Legal &amp; Privacidad
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
