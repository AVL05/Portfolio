import { NextResponse } from "next/server";

const WEB3FORMS_ENDPOINT = "https://api.web3forms.com/submit";
const MAX_NAME_LENGTH = 120;
const MAX_EMAIL_LENGTH = 254;
const MAX_MESSAGE_LENGTH = 4000;
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX_REQUESTS = 5;

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  botcheck?: unknown;
};

const requestLog = new Map<string, number[]>();

function isNonEmptyString(value: unknown, maxLength: number): value is string {
  return (
    typeof value === "string" &&
    value.trim().length > 0 &&
    value.trim().length <= maxLength
  );
}

function isEmail(value: unknown): value is string {
  return (
    isNonEmptyString(value, MAX_EMAIL_LENGTH) &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())
  );
}

function getClientKey(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");
  const ip = forwardedFor?.split(",")[0]?.trim();

  return ip || request.headers.get("x-real-ip") || "unknown";
}

function isRateLimited(key: string) {
  const now = Date.now();
  const recentRequests = (requestLog.get(key) ?? []).filter(
    (timestamp) => now - timestamp < RATE_LIMIT_WINDOW_MS,
  );

  if (recentRequests.length >= RATE_LIMIT_MAX_REQUESTS) {
    requestLog.set(key, recentRequests);
    return true;
  }

  recentRequests.push(now);
  requestLog.set(key, recentRequests);
  return false;
}

export async function POST(request: Request) {
  const accessKey = process.env.WEB3FORMS_ACCESS_KEY;

  if (!accessKey) {
    console.error("WEB3FORMS_ACCESS_KEY is not configured");
    return NextResponse.json({ success: false }, { status: 500 });
  }

  if (isRateLimited(getClientKey(request))) {
    return NextResponse.json({ success: false }, { status: 429 });
  }

  let payload: ContactPayload;

  try {
    payload = (await request.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  if (payload.botcheck) {
    return NextResponse.json({ success: true });
  }

  if (
    !isNonEmptyString(payload.name, MAX_NAME_LENGTH) ||
    !isEmail(payload.email) ||
    !isNonEmptyString(payload.message, MAX_MESSAGE_LENGTH)
  ) {
    return NextResponse.json({ success: false }, { status: 400 });
  }

  const web3formsResponse = await fetch(WEB3FORMS_ENDPOINT, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({
      access_key: accessKey,
      subject: "Nuevo contacto - Portfolio Dev",
      name: payload.name.trim(),
      email: payload.email.trim(),
      message: payload.message.trim(),
    }),
  });

  if (!web3formsResponse.ok) {
    return NextResponse.json({ success: false }, { status: 502 });
  }

  const data = (await web3formsResponse.json()) as { success?: boolean };

  return NextResponse.json(
    { success: Boolean(data.success) },
    { status: data.success ? 200 : 502 },
  );
}
