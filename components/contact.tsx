"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import { localizeHref } from "@/lib/i18n-paths";
import { RevealHeader } from "@/components/reveal-header";
import { CONTACT_LIMITS } from "@/lib/contact";

type ContactField = "name" | "email" | "message";
type ContactFormErrors = Partial<Record<ContactField, true>>;
type SubmitCode =
  | "provider_error"
  | "network_error"
  | "rate_limited"
  | "not_configured"
  | "too_fast"
  | null;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DRAFT_KEY = "portfolio-contact-draft";
const CV_HREF = "/cv/CV_Alex_Vicente_Lopez.pdf?v=2026-09";

export function Contact() {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const startedAtRef = useRef<number>(Date.now());
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    website: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(
    null,
  );
  const [submitCode, setSubmitCode] = useState<SubmitCode>(null);
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});

  // Restaura el borrador si el usuario recarga o el envío falla: el mensaje nunca se pierde.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(DRAFT_KEY);
      if (!raw) return;
      const draft = JSON.parse(raw) as Partial<
        Record<"name" | "email" | "message", string>
      >;
      setFormData((current) => ({
        ...current,
        name: typeof draft.name === "string" ? draft.name.slice(0, 120) : "",
        email: typeof draft.email === "string" ? draft.email.slice(0, 254) : "",
        message:
          typeof draft.message === "string"
            ? draft.message.slice(0, CONTACT_LIMITS.messageMax)
            : "",
      }));
    } catch {
      // Sin almacenamiento disponible: el formulario sigue funcionando.
    }
  }, []);

  // Guarda el borrador en cada cambio para no perderlo nunca.
  useEffect(() => {
    try {
      if (!formData.name && !formData.email && !formData.message) {
        window.localStorage.removeItem(DRAFT_KEY);
        return;
      }
      window.localStorage.setItem(
        DRAFT_KEY,
        JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      );
    } catch {
      // Ignora errores de cuota o modo privado.
    }
  }, [formData.name, formData.email, formData.message]);

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

  const errorMessageFor = (code: SubmitCode) => {
    if (code === "rate_limited" || code === "too_fast") {
      return t.contact.form_error_rate;
    }
    if (code === "not_configured") {
      return t.contact.form_error_config;
    }
    if (code === "network_error" || code === "provider_error") {
      return t.contact.form_error_network;
    }
    return t.contact.form_error;
  };

  const send = async () => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    setSubmitCode(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          message: formData.message.trim(),
          website: formData.website,
          startedAt: startedAtRef.current,
          language,
        }),
        signal: AbortSignal.timeout(15_000),
      });

      const data = (await response.json().catch(() => null)) as {
        ok?: boolean;
        code?: string;
      } | null;

      if (response.ok && data?.ok) {
        setSubmitStatus("success");
        setSubmitCode(null);
        setFormErrors({});
        setFormData({ name: "", email: "", message: "", website: "" });
        try {
          window.localStorage.removeItem(DRAFT_KEY);
        } catch {
          // Ignora errores de almacenamiento.
        }
        startedAtRef.current = Date.now();
      } else {
        setSubmitStatus("error");
        const code = data?.code;
        setSubmitCode(
          code === "rate_limited" ||
          code === "too_fast" ||
          code === "not_configured" ||
          code === "provider_error"
            ? code
            : "provider_error",
        );
      }
    } catch {
      // Timeout, sin conexión o respuesta no-JSON: el borrador queda guardado.
      setSubmitStatus("error");
      setSubmitCode("network_error");
    } finally {
      setIsSubmitting(false);
      window.requestAnimationFrame(() => {
        statusRef.current?.focus();
      });
    }
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

    await send();
  };

  const messageLength = formData.message.trim().length;

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
      aria-label={t.contact.title}
      ref={containerRef}
      className="relative overflow-hidden bg-background px-4 py-24 sm:px-6 sm:py-36 lg:px-8"
    >

      <div className="relative z-10 mx-auto max-w-[100rem]">
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
                {/* Honeypot anti-spam: invisible para personas, irresistible para bots. */}
                <div aria-hidden="true" className="absolute h-px w-px overflow-hidden">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={formData.website}
                    onChange={(e) =>
                      setFormData({ ...formData, website: e.target.value })
                    }
                  />
                </div>

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
                  <div className="ml-0.5 flex items-baseline justify-between gap-3">
                    <label
                      htmlFor="message"
                      className="block text-xs font-bold uppercase tracking-[0.16em] text-primary/80"
                    >
                      {t.contact.form_message}
                    </label>
                    <span
                      id="message-count"
                      className="font-mono text-[11px] text-muted-foreground tabular-nums"
                    >
                      {messageLength}/{CONTACT_LIMITS.messageMax}{" "}
                      {t.contact.form_message_count}
                    </span>
                  </div>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder={t.contact.form_placeholder_message}
                    rows={5}
                    value={formData.message}
                    minLength={20}
                    maxLength={CONTACT_LIMITS.messageMax}
                    aria-invalid={Boolean(formErrors.message)}
                    aria-describedby={`message-count${formErrors.message ? " message-error" : ""}`}
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
                    {formErrors.message
                      ? getFieldError("message")
                      : messageLength > 0 && messageLength < 20
                        ? t.contact.form_message_min
                        : ""}
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

                <div ref={statusRef} tabIndex={-1} aria-live="polite">
                  {submitStatus === "success" && (
                    <p role="status" className="rounded-lg border border-primary/25 bg-primary/10 px-4 py-3 text-center text-sm font-medium text-primary">
                      {t.contact.form_success}
                    </p>
                  )}
                  {submitStatus === "error" && (
                    <div role="alert" className="rounded-lg border border-destructive/25 bg-destructive/10 px-4 py-3 text-center">
                      <p className="text-sm font-medium text-destructive">
                        {errorMessageFor(submitCode)}
                      </p>
                      <div className="mt-3 flex flex-col items-center justify-center gap-2 sm:flex-row">
                        {submitCode !== "not_configured" && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={send}
                            disabled={isSubmitting}
                            className="min-h-11"
                          >
                            {t.contact.form_retry}
                          </Button>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {t.contact.form_fallback}{" "}
                          <a
                            href="mailto:alexviclop@gmail.com"
                            className="font-semibold text-primary underline underline-offset-2"
                          >
                            alexviclop@gmail.com
                          </a>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </form>
            </Card>
          </div>

          <div className="contact-item flex flex-col justify-between border-y border-border/60 py-6 sm:py-8">
            <div className="space-y-10">
              <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted-foreground">
                {t.contact.links_title}
              </p>
              <div className="max-w-xl">
                <p className="mb-3 text-sm font-bold text-primary">
                  {t.contact.availability_title}
                </p>
                <p className="text-base font-medium leading-relaxed text-foreground/72">
                  {t.contact.availability_desc}
                </p>
              </div>

              <a
                href="mailto:alexviclop@gmail.com"
                className="group flex min-w-0 items-center gap-4 text-xl font-bold transition-colors hover:text-primary sm:text-2xl"
              >
                <span className="shrink-0 rounded-lg border border-border/70 bg-secondary p-3.5 transition-all group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground">
                  <Mail className="h-5 w-5" />
                </span>
                <span className="min-w-0 break-all text-foreground transition-colors group-hover:text-primary">
                  alexviclop@gmail.com
                </span>
              </a>

              <div className="flex flex-wrap gap-3">
                <a
                  href={CV_HREF}
                  download
                  data-track="cv-download"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary-foreground transition-all hover:-translate-y-0.5 hover:bg-primary/90"
                >
                  <FileText className="h-4 w-4" />
                  {t.contact.cv_btn}
                </a>
                <a
                  href="https://www.linkedin.com/in/aleviclop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-primary/35 bg-background/35 px-4 py-2.5 text-xs font-bold uppercase tracking-[0.12em] text-primary transition-all hover:-translate-y-0.5 hover:bg-primary hover:text-primary-foreground"
                >
                  <FaLinkedin className="h-4 w-4" />
                  LinkedIn
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
                    href={localizeHref(item.href, language)}
                    className="inline-flex min-h-11 items-center font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
                  >
                    {item[language]}
                  </Link>
                ))}
              </nav>
              <nav
                aria-label={
                  language === "es" ? "Perfiles externos" : "External profiles"
                }
                className="mb-6 flex flex-wrap justify-center gap-3 sm:justify-start"
              >
                <a
                  href="https://github.com/AVL05"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
                >
                  <FaGithub className="h-3.5 w-3.5" />
                  GitHub
                </a>
                <a
                  href="https://rawvives.aleviclop.dev/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-primary"
                >
                  raw.vives
                  <ArrowUpRight className="h-3.5 w-3.5" />
                </a>
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
