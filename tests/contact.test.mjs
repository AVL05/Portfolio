import assert from "node:assert/strict";
import { test } from "node:test";
import { ModuleKind, ScriptTarget, transpileModule } from "typescript";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

function loadLib(relativePath) {
  const module = { exports: {} };
  runInNewContext(
    transpileModule(read(relativePath), {
      compilerOptions: { module: ModuleKind.CommonJS, target: ScriptTarget.ESNext },
    }).outputText,
    { module, exports: module.exports },
  );
  return module.exports;
}

const contact = loadLib("lib/contact.ts");

test("contact validation accepts a real message", () => {
  const result = contact.validateContactPayload({
    name: "Alex",
    email: "hola@ejemplo.com",
    message: "Hola, tengo una oportunidad de desarrollo que me gustaría comentar.",
    website: "",
    startedAt: Date.now() - 10_000,
  });
  assert.equal(result.ok, true);
});

test("contact validation rejects short or invalid fields", () => {
  assert.equal(
    contact.validateContactPayload({
      name: "A",
      email: "hola@ejemplo.com",
      message: "Mensaje suficientemente largo para pasar.",
    }).code,
    "invalid_name",
  );
  assert.equal(
    contact.validateContactPayload({
      name: "Alex",
      email: "no-es-email",
      message: "Mensaje suficientemente largo para pasar.",
    }).code,
    "invalid_email",
  );
  assert.equal(
    contact.validateContactPayload({
      name: "Alex",
      email: "hola@ejemplo.com",
      message: "corto",
    }).code,
    "invalid_message",
  );
});

test("contact honeypot and time-trap stop bots", () => {
  assert.equal(
    contact.validateContactPayload({
      name: "Alex",
      email: "hola@ejemplo.com",
      message: "Mensaje suficientemente largo para pasar el mínimo.",
      website: "http://spam.example",
    }).code,
    "spam_detected",
  );
  assert.equal(
    contact.validateContactPayload({
      name: "Alex",
      email: "hola@ejemplo.com",
      message: "Mensaje suficientemente largo para pasar el mínimo.",
      website: "",
      startedAt: Date.now(),
    }).code,
    "too_fast",
  );
});

test("contact rate limit allows 5 and blocks the 6th", () => {
  contact.clearContactRateLimits();
  const key = `test:${Date.now()}`;
  for (let i = 0; i < 5; i += 1) {
    assert.equal(contact.checkContactRateLimit(key).allowed, true);
  }
  assert.equal(contact.checkContactRateLimit(key).allowed, false);
});

function loadContactRoute(fetchMock, configured = true) {
  const module = { exports: {} };
  const timeouts = [];
  const sandbox = {
    module, exports: module.exports, AbortController, TextDecoder, URL,
    process: { env: configured ? { WEB3FORMS_ACCESS_KEY: "mock-only" } : {} },
    fetch: fetchMock,
    setTimeout: (_callback, duration) => { timeouts.push(duration); return 1; },
    clearTimeout: () => {},
    require: (id) => {
      if (id === "next/server") return { NextResponse: { json: (body, options = {}) => ({ body, status: options.status ?? 200, headers: options.headers }) } };
      if (id === "@/lib/contact") return contact;
      throw new Error(`Unexpected import: ${id}`);
    },
  };
  runInNewContext(transpileModule(read("app/api/contact/route.ts"), {
    compilerOptions: { module: ModuleKind.CommonJS },
  }).outputText, sandbox);
  return { route: module.exports, timeouts };
}

const validPayload = { name: "QA local", email: "qa@example.invalid", message: "Mocked contact audit, no real email is sent.", language: "en" };

function contactRequest(body = validPayload, headers = {}) {
  return new Request("https://www.aleviclop.dev/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json", ...headers },
    body: typeof body === "string" ? body : JSON.stringify(body),
  });
}

test("contact API rejects invalid input and spam without calling the provider", async () => {
  let calls = 0;
  const { route } = loadContactRoute(async () => { calls++; throw new Error("Unexpected network"); });
  contact.clearContactRateLimits();
  assert.equal((await route.POST(contactRequest("{"))).status, 400);
  assert.equal((await route.POST(contactRequest({ ...validPayload, email: "invalid" }))).status, 400);
  assert.equal((await route.POST(contactRequest({ ...validPayload, website: "bot" }))).body.ok, true);
  assert.equal((await route.GET()).status, 405);
  assert.equal(calls, 0);
});

test("contact API reports missing configuration without attempting delivery", async () => {
  contact.clearContactRateLimits();
  const { route } = loadContactRoute(async () => { throw new Error("Unexpected network"); }, false);
  const response = await route.POST(contactRequest());
  assert.equal(response.status, 503);
  assert.equal(response.body.code, "not_configured");
});

for (const scenario of ["success", "4xx", "5xx", "network"]) {
  test(`contact provider ${scenario} preserves retry and timeout contracts`, async () => {
    contact.clearContactRateLimits();
    let calls = 0;
    const { route, timeouts } = loadContactRoute(async (url, options) => {
      calls++;
      assert.equal(url, "https://api.web3forms.com/submit");
      const body = JSON.parse(options.body);
      assert.equal(body.access_key, "mock-only");
      assert.equal(body.email, validPayload.email);
      assert.equal(body.subject, "New contact - Developer portfolio");
      if (scenario === "network") throw new Error("Offline mock");
      const status = scenario === "4xx" ? 400 : scenario === "5xx" ? 503 : 200;
      return { ok: status === 200, status, json: async () => ({ success: status === 200 }) };
    });
    const response = await route.POST(contactRequest());
    assert.equal(response.status, scenario === "success" ? 200 : 502);
    assert.equal(calls, ["success", "4xx"].includes(scenario) ? 1 : 2);
    assert.ok(timeouts.reduce((sum, value) => sum + value, 0) < contact.CONTACT_LIMITS.submitTimeoutMs);
  });
}

test("contact rejects cross-origin and non-JSON requests without delivery", async () => {
  const { route } = loadContactRoute(() => assert.fail("Unexpected delivery"));
  assert.equal((await route.POST(contactRequest(validPayload, { origin: "https://attacker.invalid" }))).status, 403);
  assert.equal((await route.POST(contactRequest(validPayload, { "sec-fetch-site": "cross-site" }))).status, 403);
  assert.equal((await route.POST(contactRequest(validPayload, { "content-type": "text/plain" }))).status, 415);
});

test("contact accepts same-origin JSON with a charset and keeps delivery private", async () => {
  contact.clearContactRateLimits();
  let deliveries = 0;
  const { route } = loadContactRoute(async () => {
    deliveries++;
    return { ok: true, json: async () => ({ success: true }) };
  });
  const response = await route.POST(contactRequest(validPayload, {
    origin: "https://www.aleviclop.dev",
    "sec-fetch-site": "same-origin",
    "content-type": "application/json; charset=utf-8",
  }));
  assert.equal(response.status, 200);
  assert.equal(deliveries, 1);
  assert.equal(JSON.stringify(response.body), '{"ok":true}');
});

test("contact caps actual bytes even without an honest Content-Length", async () => {
  const { route } = loadContactRoute(() => assert.fail("Unexpected delivery"));
  for (const headers of [{}, { "content-length": "1" }]) {
    contact.clearContactRateLimits();
    assert.equal((await route.POST(contactRequest({ ...validPayload, padding: "x".repeat(33_000) }, headers))).status, 413);
  }
  contact.clearContactRateLimits();
  assert.equal((await route.POST(contactRequest(validPayload, { "content-length": "33000" }))).status, 413);
});

test("contact bounds streamed multibyte input and accepts a full Unicode message", async () => {
  const { route } = loadContactRoute(async () => ({ ok: true, json: async () => ({ success: true }) }));
  contact.clearContactRateLimits();
  assert.equal((await route.POST(contactRequest({ ...validPayload, message: "界".repeat(4000) }))).status, 200);
  contact.clearContactRateLimits();
  const bytes = new TextEncoder().encode(JSON.stringify({ ...validPayload, padding: "界".repeat(12_000) }));
  let offset = 0;
  let cancelled = false;
  const stream = new ReadableStream({
    pull(controller) {
      if (offset >= bytes.length) return controller.close();
      controller.enqueue(bytes.slice(offset, offset += 513));
    },
    cancel() { cancelled = true; },
  });
  const request = new Request("https://www.aleviclop.dev/api/contact", {
    method: "POST", headers: { "content-type": "application/json" }, body: stream, duplex: "half",
  });
  assert.equal((await route.POST(request)).status, 413);
  assert.equal(cancelled, true);
});

test("contact rate limits malformed input before parsing", async () => {
  contact.clearContactRateLimits();
  const { route } = loadContactRoute(() => assert.fail("Unexpected delivery"));
  for (let i = 0; i < 5; i++) assert.equal((await route.POST(contactRequest("{"))).status, 400);
  const response = await route.POST(contactRequest("{"));
  assert.equal(response.status, 429);
  assert.ok(Number(response.headers["Retry-After"]) > 0);
});

test("contact rejects non-object JSON and broken body streams safely", async () => {
  const { route } = loadContactRoute(() => assert.fail("Unexpected delivery"));
  for (const body of ["null", "[]", "true", "42"]) {
    contact.clearContactRateLimits();
    assert.equal((await route.POST(contactRequest(body))).status, 400);
  }
  contact.clearContactRateLimits();
  const body = new ReadableStream({ start(controller) { controller.error(new Error("Disconnected")); } });
  const request = new Request("https://www.aleviclop.dev/api/contact", {
    method: "POST", headers: { "content-type": "application/json" }, body, duplex: "half",
  });
  assert.equal((await route.POST(request)).status, 400);
});

test("contact limiter bounds tracked clients and recovers after expiry", () => {
  contact.clearContactRateLimits();
  const now = Date.now();
  for (let i = 0; i < 1000; i++) assert.equal(contact.checkContactRateLimit(`client:${i}`, now).allowed, true);
  assert.equal(contact.checkContactRateLimit("overflow", now).allowed, false);
  assert.equal(contact.checkContactRateLimit("client:0", now).allowed, true);
  assert.equal(contact.checkContactRateLimit("overflow", now + contact.CONTACT_LIMITS.rateLimitWindowMs).allowed, true);
});
