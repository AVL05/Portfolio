"use client";

import { ArrowUpRight, FileText, Mail } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { useLanguage } from "@/lib/language-context";
import { CONTACT_LIMITS, type ContactField } from "@/lib/contact";
import { CV_HREF, GITHUB_URL, LINKEDIN_URL, SITE_EMAIL } from "@/lib/site";
import styles from "./contact.module.css";

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

export function Contact() {
  const { language, t } = useLanguage();
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const startedAtRef = useRef<number>(Date.now());
  const sendingRef = useRef(false);
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
    if (sendingRef.current) return;
    sendingRef.current = true;
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
        // Allow both 12s server attempts to finish before offering a retry.
        signal: AbortSignal.timeout(CONTACT_LIMITS.submitTimeoutMs),
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
      sendingRef.current = false;
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

  return (
    <div className={styles.contact}>
      <h3 className={styles.title}>{t.contact.subtitle}</h3>
      <p className={styles.lead}>{t.hero.availability}. {t.contact.desc}</p>

      <a href={`mailto:${SITE_EMAIL}`} className={styles.email}>
        <Mail aria-hidden="true" />
        <span>{SITE_EMAIL}</span>
        <ArrowUpRight aria-hidden="true" />
      </a>

      <ul className={styles.profiles} aria-label={language === "es" ? "Perfiles y CV" : "Profiles and CV"}>
        <li><a href={CV_HREF[language]} download data-track="cv-download" className="pill pill-secondary"><FileText aria-hidden="true" />{t.hero.cv}</a></li>
        <li><a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="pill pill-secondary"><FaLinkedin aria-hidden="true" />LinkedIn</a></li>
        <li><a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="pill pill-secondary"><FaGithub aria-hidden="true" />GitHub</a></li>
      </ul>

      <form
        ref={formRef}
        data-contact-form
        action="/api/contact"
        method="post"
        onSubmit={handleSubmit}
        aria-busy={isSubmitting}
        className={styles.form}
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

        <div className={styles.field}>
          <label htmlFor="name">{t.contact.form_name}</label>
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t.contact.form_placeholder_name}
            value={formData.name}
            minLength={CONTACT_LIMITS.nameMin}
            maxLength={CONTACT_LIMITS.nameMax}
            aria-invalid={Boolean(formErrors.name)}
            aria-describedby={formErrors.name ? "name-error" : undefined}
            onBlur={() => validateOnBlur("name")}
            onChange={(e) => updateField("name", e.target.value)}
            className={styles.input}
            required
          />
          <p id="name-error" className={styles.error} aria-live="polite">
            {formErrors.name ? getFieldError("name") : ""}
          </p>
        </div>

        <div className={styles.field}>
          <label htmlFor="email">{t.contact.form_email}</label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder={t.contact.form_placeholder_email}
            value={formData.email}
            maxLength={CONTACT_LIMITS.emailMax}
            aria-invalid={Boolean(formErrors.email)}
            aria-describedby={formErrors.email ? "email-error" : undefined}
            onBlur={() => validateOnBlur("email")}
            onChange={(e) => updateField("email", e.target.value)}
            className={styles.input}
            required
          />
          <p id="email-error" className={styles.error} aria-live="polite">
            {formErrors.email ? getFieldError("email") : ""}
          </p>
        </div>

        <div className={styles.field}>
          <label htmlFor="message">{t.contact.form_message}</label>
          <textarea
            id="message"
            name="message"
            placeholder={t.contact.form_placeholder_message}
            rows={5}
            value={formData.message}
            minLength={CONTACT_LIMITS.messageMin}
            maxLength={CONTACT_LIMITS.messageMax}
            aria-invalid={Boolean(formErrors.message)}
            aria-describedby="message-error"
            onBlur={() => validateOnBlur("message")}
            onChange={(e) => updateField("message", e.target.value)}
            className={`${styles.input} ${styles.textarea}`}
            required
          />
          <p id="message-error" className={styles.error} aria-live="polite">
            {formErrors.message
              ? getFieldError("message")
              : messageLength > 0 && messageLength < CONTACT_LIMITS.messageMin
                ? t.contact.form_message_min
                : ""}
          </p>
        </div>

        <button
          type="submit"
          className={`pill pill-primary ${styles.submit}`}
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting
            ? t.contact.form_btn_sending
            : t.contact.form_btn_send}
          <ArrowUpRight aria-hidden="true" />
        </button>

        <div ref={statusRef} tabIndex={-1} aria-live="polite">
          {submitStatus === "success" && (
            <p role="status" className={styles.success}>
              {t.contact.form_success}
            </p>
          )}
          {submitStatus === "error" && (
            <div role="alert" className={styles.failure}>
              <p>{errorMessageFor(submitCode)}</p>
              <div className={styles.failureActions}>
                {submitCode !== "not_configured" && (
                  <button
                    type="button"
                    onClick={() => formRef.current?.requestSubmit()}
                    disabled={isSubmitting}
                    className="action-secondary"
                  >
                    {t.contact.form_retry}
                  </button>
                )}
                <p>
                  {t.contact.form_fallback}{" "}
                  <a href="mailto:alexviclop@gmail.com">alexviclop@gmail.com</a>
                </p>
              </div>
            </div>
          )}
        </div>
      </form>
      <noscript>
        <style>{"[data-contact-form] { display: none; }"}</style>
        <p className={styles.noscript}>
          {t.contact.form_fallback}{" "}
          <a href="mailto:alexviclop@gmail.com">alexviclop@gmail.com</a>
        </p>
      </noscript>
    </div>
  );
}
