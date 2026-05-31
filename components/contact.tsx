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
        headers: {
          "Content-Type": "application/json",
        },
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
      className="py-24 sm:py-32 px-4 sm:px-6 lg:px-8 bg-background relative overflow-hidden text-foreground"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <RevealHeader
          title={t.contact.title}
          subtitle={t.contact.subtitle}
          description={t.contact.desc}
        />

        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1fr)] gap-12 sm:gap-16 lg:gap-20">
          <div className="contact-item">
            <Card className="p-0 overflow-hidden bg-card/85 border-border shadow-2xl rounded-2xl hover:border-primary/25 transition-all">
              <div className="flex items-center gap-2 px-6 py-4 bg-secondary/50 border-b border-border">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-400/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/20"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400/20"></div>
                </div>
                <span className="ml-4 text-xs font-mono text-muted-foreground/50 truncate flex-1 uppercase tracking-widest font-bold">
                  send_message.sh
                </span>
              </div>

              <form onSubmit={handleSubmit} className="p-6 sm:p-8 lg:p-10 space-y-7">
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
                    className="text-sm font-black uppercase tracking-widest text-primary/80 ml-1"
                  >
                    {t.contact.form_name}
                  </label>
                  <Input
                    id="name"
                    type="text"
                    placeholder={t.contact.form_placeholder_name}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="bg-secondary/50 border-border focus-visible:ring-primary/50 focus-visible:border-primary placeholder:text-muted-foreground/35 rounded-xl py-6 px-5 text-base sm:text-lg font-medium"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label
                    htmlFor="email"
                    className="text-sm font-black uppercase tracking-widest text-primary/80 ml-1"
                  >
                    {t.contact.form_email}
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder={t.contact.form_placeholder_email}
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="bg-secondary/50 border-border focus-visible:ring-primary/50 focus-visible:border-primary placeholder:text-muted-foreground/35 rounded-xl py-6 px-5 text-base sm:text-lg font-medium"
                    required
                  />
                </div>

                <div className="space-y-4">
                  <label
                    htmlFor="message"
                    className="text-sm font-black uppercase tracking-widest text-primary/80 ml-1"
                  >
                    {t.contact.form_message}
                  </label>
                  <Textarea
                    id="message"
                    placeholder={t.contact.form_placeholder_message}
                    rows={5}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="bg-secondary/50 border-border focus-visible:ring-primary/50 focus-visible:border-primary placeholder:text-muted-foreground/35 rounded-xl p-5 text-base sm:text-lg font-medium resize-none"
                    required
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground font-black text-base sm:text-lg py-7 rounded-xl hover:bg-primary/90 hover:shadow-[0_0_32px_rgba(119,255,150,0.2)] transition-all group"
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
                    className="flex min-w-0 items-center gap-4 sm:gap-6 text-xl sm:text-2xl xl:text-3xl font-bold group hover:text-primary transition-colors"
                  >
                    <div className="shrink-0 p-4 bg-secondary rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <Mail className="h-6 w-6" />
                    </div>
                    <span className="min-w-0 break-all">alexviclop@gmail.com</span>
                  </a>
                  <a
                    href="https://github.com/AVL05"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-0 items-center gap-4 sm:gap-6 text-xl sm:text-2xl xl:text-3xl font-bold group hover:text-primary transition-colors"
                  >
                    <div className="shrink-0 p-4 bg-secondary rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <FaGithub className="h-6 w-6" />
                    </div>
                    <span className="min-w-0 break-all">github.com/AVL05</span>
                  </a>
                  <a
                    href="https://www.linkedin.com/in/alex-vicente-lopez/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex min-w-0 items-center gap-4 sm:gap-6 text-xl sm:text-2xl xl:text-3xl font-bold group hover:text-primary transition-colors"
                  >
                    <div className="shrink-0 p-4 bg-secondary rounded-xl group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                      <FaLinkedin className="h-6 w-6" />
                    </div>
                    <span className="min-w-0 break-words">linkedin / alex-vicente-lopez</span>
                  </a>
                </div>
              </div>

              <a
                href="https://alexgallery.alexviclop.workers.dev/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex text-sm font-mono uppercase tracking-widest text-muted-foreground hover:text-primary transition-colors"
              >
                {t.contact.visual_portfolio_btn}
              </a>
            </div>

            <footer className="mt-20 pt-10 border-t border-border text-center sm:text-left">
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
