"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import type React from "react";
import { useState } from "react";
import { useLanguage } from "@/lib/language-context";

import { RevealHeader } from "@/components/reveal-header";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useRef } from "react";

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
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );

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
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
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
    } catch (error) {
      console.error("Error submitting form:", error);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="contact"
      ref={containerRef}
      className="relative overflow-hidden bg-background px-4 py-24 text-foreground sm:px-6 sm:py-32 lg:px-8"
    >
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-linear-to-r from-transparent via-border to-transparent" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <RevealHeader
          title={t.contact.title}
          subtitle={t.contact.subtitle}
          description={t.contact.desc}
        />

        <div className="grid grid-cols-1 gap-12 sm:gap-16 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] lg:gap-20">
          <div className="contact-item">
            <Card className="overflow-hidden rounded-3xl border-border bg-card/86 p-0 shadow-2xl transition-all hover:border-primary/25">
              <div className="flex items-center gap-2 border-b border-border bg-secondary/50 px-6 py-4">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/20"></div>
                </div>
                <span className="ml-4 text-xs font-mono text-muted-foreground/50 truncate flex-1 uppercase tracking-widest font-bold">
                  send_message.sh
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-7 p-6 sm:p-8 lg:p-10">
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
                <div className="space-y-4">
                  <label
                    htmlFor="name"
                    className="ml-1 text-sm font-black uppercase tracking-widest text-primary/80"
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
                    className="rounded-2xl border-border bg-secondary/50 px-5 py-6 text-base font-medium placeholder:text-muted-foreground/45 focus-visible:border-primary focus-visible:ring-primary/50 sm:text-lg"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label
                    htmlFor="email"
                    className="ml-1 text-sm font-black uppercase tracking-widest text-primary/80"
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
                    className="rounded-2xl border-border bg-secondary/50 px-5 py-6 text-base font-medium placeholder:text-muted-foreground/45 focus-visible:border-primary focus-visible:ring-primary/50 sm:text-lg"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label
                    htmlFor="message"
                    className="ml-1 text-sm font-black uppercase tracking-widest text-primary/80"
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
                    className="resize-none rounded-2xl border-border bg-secondary/50 p-5 text-base font-medium placeholder:text-muted-foreground/45 focus-visible:border-primary focus-visible:ring-primary/50 sm:text-lg"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="group w-full rounded-2xl bg-primary py-7 text-base font-black text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 hover:shadow-[0_0_32px_rgba(119,255,150,0.2)] sm:text-lg"
                  disabled={isSubmitting}
                >
                  {isSubmitting
                    ? t.contact.form_btn_sending
                    : t.contact.form_btn_send}
                </Button>

                {submitStatus === "success" && (
                  <p className="text-sm text-primary font-bold text-center animate-pulse">
                    {t.contact.form_success}
                  </p>
                )}
              </form>
            </Card>
          </div>

          <div className="contact-item flex flex-col justify-between py-4">
            <div className="space-y-10">
              <div>
                <h3 className="text-sm font-black uppercase tracking-[0.3em] text-muted-foreground/30 mb-8 ml-1">
                  {t.contact.links_title}
                </h3>
                <div className="space-y-6">
                  <a
                    href="mailto:alexviclop@gmail.com"
                    className="group flex min-w-0 items-center gap-4 text-xl font-bold transition-colors hover:text-primary sm:gap-6 sm:text-2xl xl:text-3xl"
                  >
                    <div className="shrink-0 rounded-2xl bg-secondary p-4 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                      <Mail className="h-6 w-6" />
                    </div>
                    <span className="min-w-0 break-all">alexviclop@gmail.com</span>
                  </a>
                  <a
                    href="https://github.com/AVL05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-0 items-center gap-4 text-xl font-bold transition-colors hover:text-primary sm:gap-6 sm:text-2xl xl:text-3xl"
                  >
                    <div className="shrink-0 rounded-2xl bg-secondary p-4 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                      <FaGithub className="h-6 w-6" />
                    </div>
                    <span className="min-w-0 break-all">github.com/AVL05</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/alex-vicente-lopez/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex min-w-0 items-center gap-4 text-xl font-bold transition-colors hover:text-primary sm:gap-6 sm:text-2xl xl:text-3xl"
                  >
                    <div className="shrink-0 rounded-2xl bg-secondary p-4 transition-all group-hover:bg-primary group-hover:text-primary-foreground">
                      <FaLinkedin className="h-6 w-6" />
                    </div>
                    <span className="min-w-0 break-words">linkedin / alex-vicente-lopez</span>
                  </a>
                </div>
              </div>

              <a
                href="https://gallery.aleviclop.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {t.contact.visual_portfolio_btn}
              </a>
            </div>

            <footer className="mt-20 border-t border-border pt-10 text-center sm:text-left">
              <p className="text-muted-foreground/30 text-xs font-mono tracking-widest uppercase mb-2">
                © 2026 Alex Vicente López
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
