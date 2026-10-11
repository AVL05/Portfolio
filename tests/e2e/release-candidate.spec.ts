import { expect, test } from "@playwright/test";
import es from "../../lib/locales/es.json";
import en from "../../lib/locales/en.json";

for (const [locale, copy] of [["es", es.contact], ["en", en.contact]] as const) {
  test(`contact blocks simultaneous submits and recovers from network failure: ${locale}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(locale === "es" ? "/" : "/en");
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
}
