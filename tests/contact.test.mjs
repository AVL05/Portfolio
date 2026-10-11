import assert from "node:assert/strict";
import { test } from "node:test";
import { ModuleKind, transpileModule } from "typescript";
import { readFileSync } from "node:fs";
import { runInNewContext } from "node:vm";

const root = new URL("../", import.meta.url);
const read = (path) => readFileSync(new URL(path, root), "utf8");

function loadLib(relativePath) {
  const module = { exports: {} };
  runInNewContext(
    transpileModule(read(relativePath), {
      compilerOptions: { module: ModuleKind.CommonJS },
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
    module, exports: module.exports, AbortController,
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

test("contact API rejects invalid input and spam without calling the provider", async () => {
  let calls = 0;
  const { route } = loadContactRoute(async () => { calls++; throw new Error("Unexpected network"); });
  assert.equal((await route.POST({ json: async () => { throw new Error("Invalid JSON"); } })).status, 400);
  assert.equal((await route.POST({ json: async () => ({ ...validPayload, email: "invalid" }) })).status, 400);
  assert.equal((await route.POST({ json: async () => ({ ...validPayload, website: "bot" }) })).body.ok, true);
  assert.equal((await route.GET()).status, 405);
  assert.equal(calls, 0);
});

test("contact API reports missing configuration without attempting delivery", async () => {
  contact.clearContactRateLimits();
  const { route } = loadContactRoute(async () => { throw new Error("Unexpected network"); }, false);
  const response = await route.POST({ json: async () => validPayload, headers: new Headers() });
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
    const response = await route.POST({ json: async () => validPayload, headers: new Headers() });
    assert.equal(response.status, scenario === "success" ? 200 : 502);
    assert.equal(calls, ["success", "4xx"].includes(scenario) ? 1 : 2);
    assert.ok(timeouts.reduce((sum, value) => sum + value, 0) < contact.CONTACT_LIMITS.submitTimeoutMs);
  });
}
