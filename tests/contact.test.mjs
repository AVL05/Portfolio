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

function loadContactRoute(fetchMock) {
  const module = { exports: {} };
  const sandbox = {
    module, exports: module.exports, AbortController, TextDecoder, URL,
    process: { env: { WEB3FORMS_ACCESS_KEY: "mock-only" } },
    fetch: fetchMock,
    setTimeout: () => 1,
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
  return { route: module.exports };
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
