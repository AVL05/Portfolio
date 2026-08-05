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

type ContactField = "name" | "email" | "message";
type ContactFormErrors = Partial<Record<ContactField, true>>;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function Contact() {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
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
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});

  const isFieldInvalid = (field: ContactField, value: string) => {
    const normalizedValue = value.trim();

    if (field === "name" && normalizedValue.length < 2) {
      return true;
    }
    if (field === "email" && !EMAIL_PATTERN.test(normalizedValue)) {
      return true;
    }
    if (field === "message" && normalizedValue.length < 20) {
      return true;
    }

    return false;
  };

  const getFieldError = (field: ContactField) =>
    ({
      name: t.contact.form_error_name,
      email: t.contact.form_error_email,
      message: t.contact.form_error_message,
    })[field];

  const updateField = (field: ContactField, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));

    if (formErrors[field] && !isFieldInvalid(field, value)) {
      setFormErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
  };

  const validateOnBlur = (field: ContactField) => {
    if (!formData[field].trim()) return;

    const hasError = isFieldInvalid(field, formData[field]);
    setFormErrors((current) => {
      const next = { ...current };
      if (hasError) next[field] = true;
      else delete next[field];
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const nextErrors = (["name", "email", "message"] as ContactField[]).reduce(
      (errors, field) => {
        if (isFieldInvalid(field, formData[field])) errors[field] = true;
        return errors;
      },
      {} as ContactFormErrors,
    );

    if (Object.keys(nextErrors).length) {
      setFormErrors(nextErrors);
      setSubmitStatus(null);
      const firstInvalidField = Object.keys(nextErrors)[0] as ContactField;
      window.requestAnimationFrame(() => {
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)
          ?.focus();
      });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: "d72eeacd-28fc-442b-83bd-b8c383c5997e",
          subject:
            language === "es"
              ? "Nuevo contacto - Portfolio Dev"
              : "New contact - Developer portfolio",
          name: formData.name,
          email: formData.email,
          message: formData.message,
          botcheck: formData.botcheck,
        }),
        signal: AbortSignal.timeout(12_000),
      });

      const data = (await response.json()) as { success?: boolean };
      if (response.ok && data.success) {
        setSubmitStatus("success");
        setFormErrors({});
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
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="space-y-6 p-5 sm:p-8"
                noValidate
              >
                <input
                  type="checkbox"
                  name="botcheck"
                  className="hidden"
                  tabIndex={-1}
                  aria-hidden="true"
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
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder={t.contact.form_placeholder_name}
                    value={formData.name}
                    minLength={2}
                    maxLength={120}
                    aria-invalid={Boolean(formErrors.name)}
                    aria-describedby={formErrors.name ? "name-error" : undefined}
                    onBlur={() => validateOnBlur("name")}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="rounded-lg border-border/70 bg-secondary/50 px-4 py-5 text-base placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/40"
                    required
                  />
                  <p
                    id="name-error"
                    className="min-h-5 text-sm font-medium text-destructive"
                    aria-live="polite"
                  >
                    {formErrors.name ? getFieldError("name") : ""}
                  </p>
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
                    name="email"
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    placeholder={t.contact.form_placeholder_email}
                    value={formData.email}
                    maxLength={254}
                    aria-invalid={Boolean(formErrors.email)}
                    aria-describedby={formErrors.email ? "email-error" : undefined}
                    onBlur={() => validateOnBlur("email")}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="rounded-lg border-border/70 bg-secondary/50 px-4 py-5 text-base placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/40"
                    required
                  />
                  <p
                    id="email-error"
                    className="min-h-5 text-sm font-medium text-destructive"
                    aria-live="polite"
                  >
                    {formErrors.email ? getFieldError("email") : ""}
                  </p>
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
                    name="message"
                    placeholder={t.contact.form_placeholder_message}
                    rows={5}
                    value={formData.message}
                    minLength={20}
                    maxLength={4000}
                    aria-invalid={Boolean(formErrors.message)}
                    aria-describedby={formErrors.message ? "message-error" : undefined}
                    onBlur={() => validateOnBlur("message")}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="resize-none rounded-lg border-border/70 bg-secondary/50 p-4 text-base placeholder:text-muted-foreground/70 focus-visible:border-primary focus-visible:ring-primary/40"
                    required
                  />
                  <p
                    id="message-error"
                    className="min-h-5 text-sm font-medium text-destructive"
                    aria-live="polite"
                  >
                    {formErrors.message ? getFieldError("message") : ""}
                  </p>
                </div>

                <Button
                  type="submit"
                  className="group w-full rounded-lg bg-primary py-6 text-sm font-bold text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90 active:scale-[0.99]"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                >
                  {isSubmitting
                    ? t.contact.form_btn_sending
                    : t.contact.form_btn_send}
                </Button>

                {submitStatus === "success" && (
                  <p role="status" className="rounded-lg border border-primary/25 bg-primary/10 px-4 py-3 text-center text-sm font-medium text-primary">
                    {t.contact.form_success}
                  </p>
                )}
                {submitStatus === "error" && (
                  <p role="alert" className="rounded-lg border border-destructive/25 bg-destructive/10 px-4 py-3 text-center text-sm font-medium text-destructive">
                    {t.contact.form_error}
                  </p>
                )}
              </form>
            </Card>
          </div>

          <div className="contact-item flex flex-col justify-between rounded-lg border border-border/60 bg-card/40 p-5 py-6 sm:p-8">
            <div className="space-y-8">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {t.contact.links_title}
              </p>
              <div className="rounded-lg border border-primary/25 bg-primary/10 p-5">
                <div className="mb-3 flex items-center gap-2 text-sm font-bold text-primary">
                  <CheckCircle2 className="h-4 w-4" />
                  {t.contact.availability_title}
                </div>
                <p className="text-sm font-medium leading-relaxed text-foreground/82">
                  {t.contact.availability_desc}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <a
                    href="/cv/CV_Alex_Vicente_Lopez.pdf"
                    download
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                  >
                    <FileText className="h-4 w-4" />
                    {t.contact.cv_btn}
                  </a>
                  <a
                    href="mailto:alexviclop@gmail.com"
                    className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/35 bg-background/35 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
                  >
                    <Mail className="h-4 w-4" />
                    {t.contact.email_btn}
                  </a>
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

              <div className="rounded-lg border border-border/60 bg-background/35 p-5">
                <p className="mb-2 text-sm font-bold text-foreground">
                  {t.contact.visual_portfolio_title}
                </p>
                <p className="mb-4 text-sm leading-relaxed text-muted-foreground">
                  {t.contact.visual_portfolio_desc}
                </p>
                <a
                  href="https://rawvives.aleviclop.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary transition-all hover:bg-primary hover:text-primary-foreground"
                >
                  {t.contact.visual_portfolio_btn}
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>

            <footer className="mt-16 border-t border-border/50 pt-8 text-center sm:text-left">
              <nav
                aria-label={language === "es" ? "Páginas del portfolio" : "Portfolio pages"}
                className="mb-6 flex flex-wrap justify-center gap-x-5 gap-y-2 sm:justify-start"
              >
                {[
                  { href: "/sobre-mi", es: "Sobre mí", en: "About" },
                  { href: "/proyectos", es: "Proyectos", en: "Projects" },
                  { href: "/fotografia", es: "Fotografía", en: "Photography" },
                  { href: "/contacto", es: "Contacto", en: "Contact" },
                ].map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="inline-flex min-h-11 items-center font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item[language]}
                  </Link>
                ))}
              </nav>
              <p className="mb-1 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
                &copy; 2026 Alex Vicente López
              </p>
              <p className="text-muted-foreground text-sm font-medium mb-4">
                {t.contact.footer_built}
              </p>
              <Link
                href="/legal"
                className="inline-flex min-h-11 items-center font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
              >
                {language === "es" ? "Aviso legal y privacidad" : "Legal notice & privacy"}
              </Link>
            </footer>
          </div>
        </div>
      </div>
    </section>
  );
}
