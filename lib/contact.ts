export const CONTACT_LIMITS = {
  nameMin: 2,
  nameMax: 120,
  emailMax: 254,
  messageMin: 20,
  messageMax: 4000,
  minFormAgeMs: 2500,
  maxFormAgeMs: 24 * 60 * 60 * 1000,
  rateLimitWindowMs: 10 * 60 * 1000,
  rateLimitMax: 5,
} as const;

export type ContactField = "name" | "email" | "message";

export interface ContactPayload {
  name: unknown;
  email: unknown;
  message: unknown;
  website?: unknown;
  startedAt?: unknown;
}

export type ContactErrorCode =
  | "invalid_name"
  | "invalid_email"
  | "invalid_message"
  | "spam_detected"
  | "too_fast"
  | "rate_limited"
  | "not_configured"
  | "provider_error"
  | "bad_request";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

export function validateContactPayload(payload: ContactPayload): {
  ok: boolean;
  code?: ContactErrorCode;
  field?: ContactField;
  name?: string;
  email?: string;
  message?: string;
} {
  // Honeypot: los bots rellenan este campo invisible; los humanos nunca lo ven.
  if (asString(payload.website).trim() !== "") {
    return { ok: false, code: "spam_detected" };
  }

  // Time-trap: un envío en menos de ~2.5s casi siempre es un bot.
  // Se tolera su ausencia (JS desactivado, autofill) pero no un valor futuro.
  if (payload.startedAt !== undefined) {
    const startedAt = Number(payload.startedAt);
    if (Number.isFinite(startedAt)) {
      const age = Date.now() - startedAt;
      if (age < 0 || age > CONTACT_LIMITS.maxFormAgeMs) {
        return { ok: false, code: "spam_detected" };
      }
      if (age < CONTACT_LIMITS.minFormAgeMs) {
        return { ok: false, code: "too_fast" };
      }
    }
  }

  const name = asString(payload.name).trim();
  const email = asString(payload.email).trim();
  const message = asString(payload.message).trim();

  if (name.length < CONTACT_LIMITS.nameMin || name.length > CONTACT_LIMITS.nameMax) {
    return { ok: false, code: "invalid_name", field: "name" };
  }
  if (email.length > CONTACT_LIMITS.emailMax || !EMAIL_PATTERN.test(email)) {
    return { ok: false, code: "invalid_email", field: "email" };
  }
  if (
    message.length < CONTACT_LIMITS.messageMin ||
    message.length > CONTACT_LIMITS.messageMax
  ) {
    return { ok: false, code: "invalid_message", field: "message" };
  }

  return { ok: true, name, email, message };
}

/** Rate limiter en memoria por IP (suficiente para un formulario de portfolio). */
const rateBuckets = new Map<string, number[]>();

export function checkContactRateLimit(
  key: string,
  now = Date.now(),
): { allowed: boolean; retryAfterMs: number } {
  const windowStart = now - CONTACT_LIMITS.rateLimitWindowMs;
  const hits = (rateBuckets.get(key) ?? []).filter((at) => at > windowStart);
  if (hits.length >= CONTACT_LIMITS.rateLimitMax) {
    const retryAfterMs = hits[0] + CONTACT_LIMITS.rateLimitWindowMs - now;
    rateBuckets.set(key, hits);
    return { allowed: false, retryAfterMs: Math.max(retryAfterMs, 1000) };
  }
  hits.push(now);
  rateBuckets.set(key, hits);
  return { allowed: true, retryAfterMs: 0 };
}

export function clearContactRateLimits(): void {
  rateBuckets.clear();
}
