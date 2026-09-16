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
