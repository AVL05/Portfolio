import { expect, test } from "@playwright/test";
import { randomUUID } from "node:crypto";

test("security headers restrict browser capabilities and external connections", async ({ request }) => {
  const response = await request.get("/");
  const csp = response.headers()["content-security-policy"];
  expect(csp).toContain("base-uri 'none'");
  expect(csp).toContain("frame-ancestors 'none'");
  expect(csp).toContain("frame-src 'none'");
  expect(csp).toContain("script-src-attr 'none'");
  expect(csp).not.toContain("api.web3forms.com");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
});

test("contact rejects abusive requests without sending email", async ({ request }) => {
  // Distinct fixture identity: desktop, mobile and reruns share one server.
  const client = `e2e:${randomUUID()}`;
  expect((await request.post("/api/contact", {
    headers: { "content-type": "application/json", origin: "https://attacker.invalid" },
    data: "{}",
  })).status()).toBe(403);
  expect((await request.post("/api/contact", {
    headers: { "content-type": "text/plain" }, data: "{}",
  })).status()).toBe(415);
  expect((await request.post("/api/contact", {
    headers: { "content-type": "application/json", "x-forwarded-for": client },
    data: JSON.stringify({ padding: "x".repeat(33_000) }),
  })).status()).toBe(413);
  for (let index = 0; index < 6; index++) {
    const response = await request.post("/api/contact", {
      headers: { "content-type": "application/json", "x-forwarded-for": `${client}:malformed` },
      data: "{",
    });
    expect(response.status()).toBe(index < 5 ? 400 : 429);
    if (index === 5) expect(Number(response.headers()["retry-after"])).toBeGreaterThan(0);
  }
});

for (const [path, role, label] of [
  ["/", "Desarrollador Full-Stack Junior", "Decisiones técnicas"],
  ["/en", "Junior Full-Stack Developer", "Technical decisions"],
] as const) {
  test(`recruiters can reach the technical evidence directly: ${path}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    await expect(page.locator("#hero").getByText(role, { exact: true })).toBeVisible();
    await expect(page.locator("#hero a[download]")).toBeVisible();
    const links = page.locator("#projects").getByRole("link", { name: label, exact: true });
    await expect(links).toHaveCount(3);
    const destinations = await links.evaluateAll(elements => elements.map(element => element.getAttribute("href")!));
    for (const destination of destinations) {
      expect(destination).toMatch(path === "/" ? /^\/proyectos\// : /^\/en\/projects\//);
      await page.goto(path);
      await page.locator(`#projects a[href="${destination}"]`).click();
      await expect(page).toHaveURL(new URL(destination, page.url()).href);
      await expect(page.locator("#decisions")).toBeInViewport();
      await expect(page.locator("#decisions")).toContainText(/\S{10}/);
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
    }
  });
}
