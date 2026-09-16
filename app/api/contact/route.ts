import { NextResponse } from "next/server";
import {
  checkContactRateLimit,
  validateContactPayload,
} from "@/lib/contact";

export const runtime = "nodejs";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const UPSTREAM_TIMEOUT_MS = 12_000;

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip = forwarded?.split(",")[0]?.trim() || "unknown";
  return `contact:${ip}`;
}

async function sendViaWeb3Forms(params: {
  accessKey: string;
  name: string;
  email: string;
  message: string;
  language: string;
}): Promise<boolean> {
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), UPSTREAM_TIMEOUT_MS);
    try {
      const response = await fetch(WEB3FORMS_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: params.accessKey,
          subject:
            params.language === "es"
              ? "Nuevo contacto - Portfolio Dev"
              : "New contact - Developer portfolio",
          name: params.name,
          email: params.email,
          message: params.message,
          botcheck: "",
        }),
        signal: controller.signal,
      });
      const data = (await response.json().catch(() => null)) as {
        success?: boolean;
      } | null;
      if (response.ok && data?.success) return true;
      // Un 4xx del proveedor es definitivo: no tiene sentido reintentar.
      if (response.status >= 400 && response.status < 500) return false;
    } catch {
      // Error de red o timeout: se reintenta una vez más abajo.
    } finally {
      clearTimeout(timer);
    }
  }
  return false;
}

export async function POST(request: Request) {
  let body: unknown = null;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, code: "bad_request" },
      { status: 400 },
    );
  }

  const payload = (body ?? {}) as Record<string, unknown>;
  const language = payload.language === "en" ? "en" : "es";

  const validation = validateContactPayload({
    name: payload.name,
    email: payload.email,
    message: payload.message,
    website: payload.website,
    startedAt: payload.startedAt,
  });

  if (!validation.ok) {
    // El spam se responde como éxito para no dar pistas a los bots,
    // pero sin enviar nada al proveedor.
    if (validation.code === "spam_detected") {
      return NextResponse.json({ ok: true });
    }
    const status = validation.code === "too_fast" ? 429 : 400;
    return NextResponse.json(
      { ok: false, code: validation.code, field: validation.field },
      { status },
    );
  }

  const rate = checkContactRateLimit(clientKey(request));
  if (!rate.allowed) {
    return NextResponse.json(
      { ok: false, code: "rate_limited" },
      {
        status: 429,
        headers: {
          "Retry-After": String(Math.ceil(rate.retryAfterMs / 1000)),
        },
      },
    );
  }

  const accessKey =
    process.env.WEB3FORMS_ACCESS_KEY || process.env.CONTACT_WEB3FORMS_KEY;
  if (!accessKey) {
    return NextResponse.json(
      { ok: false, code: "not_configured" },
      { status: 503 },
    );
  }

  const delivered = await sendViaWeb3Forms({
    accessKey,
    name: validation.name ?? "",
    email: validation.email ?? "",
    message: validation.message ?? "",
    language,
  });

  if (!delivered) {
    return NextResponse.json(
      { ok: false, code: "provider_error" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: false, code: "bad_request" }, { status: 405 });
}
