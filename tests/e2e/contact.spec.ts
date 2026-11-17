import { expect, test } from "@playwright/test";
import es from "../../lib/locales/es.json";

const providerFailure = { status: 503, contentType: "application/json", body: JSON.stringify({ ok: false, code: "provider_error" }) };

test("contact validates inline, keeps the draft on failure and confirms success without analytics events", async ({ page }) => {
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
