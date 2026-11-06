import { expect, test } from "@playwright/test";

// Contact API abuse handling (origin, content type, size, rate limit) is covered
// without a browser in tests/contact.test.mjs; this checks the delivered headers.
test("security headers restrict browser capabilities and external connections", { tag: ["@smoke"] }, async ({ request }) => {
  const response = await request.get("/");
  const csp = response.headers()["content-security-policy"];
  expect(csp).toContain("base-uri 'none'");
  expect(csp).toContain("frame-ancestors 'none'");
  expect(csp).toContain("frame-src 'none'");
  expect(csp).toContain("script-src-attr 'none'");
  expect(csp).not.toContain("api.web3forms.com");
  expect(response.headers()["x-content-type-options"]).toBe("nosniff");
});
