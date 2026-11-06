import { expect, test } from "@playwright/test";
import en from "../../lib/locales/en.json";
import es from "../../lib/locales/es.json";

const providerFailure = { status: 503, contentType: "application/json", body: JSON.stringify({ ok: false, code: "provider_error" }) };

test("contact validates inline, keeps the draft on failure and confirms success without analytics events", { tag: ["@smoke"] }, async ({ page }) => {
  const conversions: unknown[] = [];
  await page.exposeFunction("captureConversion", (event: unknown) => conversions.push(event));
  await page.addInitScript(() => {
    Object.assign(window, { va: (type: string, event: unknown) => { if (type === "event") (window as any).captureConversion(event); } });
  });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#contact");
  // The submit handler only exists after hydration; clicking earlier triggers a native reload.
  await page.waitForLoadState("networkidle");
  const form = page.locator("[data-contact-form]");
  const submit = form.locator('[type="submit"]');

  await submit.click();
  await expect(form.locator('[name="name"]')).toHaveAttribute("aria-invalid", "true");
  await expect(form.locator('[name="name"]')).toBeFocused();
  await expect(page.getByText("Escribe un nombre de al menos 2 caracteres.")).toBeVisible();

  await form.locator('[name="name"]').fill("Prueba Portfolio");
  await form.locator('[name="email"]').fill("portfolio@example.invalid");
  await form.locator('[name="message"]').fill("Mensaje de prueba automatizada con longitud suficiente.");
  await page.route("**/api/contact", route => route.fulfill(providerFailure));
  await submit.click();
  await expect(form.getByRole("alert")).toBeVisible();
  await expect(form.locator('[name="message"]')).toHaveValue("Mensaje de prueba automatizada con longitud suficiente.");

  await page.unroute("**/api/contact");
  await page.route("**/api/contact", route => route.fulfill({ status: 200, json: { ok: true } }));
  await submit.click();
  await expect(form.getByRole("status")).toContainText(es.contact.form_success);
  await expect(form.locator('[name="message"]')).toHaveValue("");
  expect(conversions).toEqual([]);
});

test("contact blocks simultaneous submits, recovers from network failure and restores the draft", async ({ page }) => {
  const copy = en.contact;
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  await page.waitForLoadState("networkidle");
  const form = page.locator("[data-contact-form]");
  await form.locator('[name="name"]').fill("Release audit");
  await form.locator('[name="email"]').fill("qa@example.invalid");
  await form.locator('[name="message"]').fill("Local mocked release validation, no external email.");
  let release!: () => void;
  let requests = 0;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/api/contact", async route => {
    requests++;
    await pending;
    await route.abort("failed");
  });
  // Exercise the synchronous race before React commits the disabled state.
  await form.evaluate(element => {
    element.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    element.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
  });
  try {
    await expect.poll(() => requests).toBe(1);
    await expect(form).toHaveAttribute("aria-busy", "true");
    await expect(form.locator('[type="submit"]')).toBeDisabled();
  } finally { release(); }
  await expect(form.getByRole("alert")).toContainText(copy.form_error_network);
  await expect(form).toHaveAttribute("aria-busy", "false");
  await expect(form.locator('[name="message"]')).toHaveValue("Local mocked release validation, no external email.");
  expect(requests).toBe(1);

  await form.locator('[name="name"]').fill("A");
  await form.getByRole("button", { name: copy.form_retry, exact: true }).click();
  await expect(form.locator('[name="name"]')).toHaveAttribute("aria-invalid", "true");
  expect(requests).toBe(1);

  await form.locator('[name="name"]').fill("Release audit");
  await page.reload();
  await expect(form.locator('[name="email"]')).toHaveValue("qa@example.invalid");
  await page.unroute("**/api/contact");
  await page.route("**/api/contact", route => route.fulfill({ status: 200, json: { ok: true } }));
  await form.locator('[type="submit"]').click();
  await expect(form.getByRole("status")).toContainText(copy.form_success);
  await expect(form.locator('[name="message"]')).toHaveValue("");
  expect(await page.evaluate(() => localStorage.getItem("portfolio-contact-draft"))).toBeNull();
});
