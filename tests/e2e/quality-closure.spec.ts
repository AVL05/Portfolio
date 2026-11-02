import { expect, test, type Page } from "@playwright/test";
import { ROUTE_PAIRS } from "../../lib/i18n-paths";

type Conversion = { name: string; data: Record<string, string> };

async function captureConversions(page: Page) {
  const captured: Conversion[] = [];
  await page.exposeFunction("captureConversion", (event: Conversion) => captured.push(event));
  await page.addInitScript(() => {
    Object.assign(window, {
      va: (type: string, event: unknown) => {
        if (type === "event") (window as any).captureConversion(event);
      },
    });
  });
  return captured;
}

for (const pair of ROUTE_PAIRS.filter(pair => pair.es !== "/")) {
  for (const path of [pair.es, pair.en]) {
    test(`case navigation meets AA text contrast: ${path}`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready);
      const ratios = await page.locator("main > section:first-child nav:first-child").evaluate(nav => {
        const canvas = document.createElement("canvas");
        canvas.width = canvas.height = 1;
        const ctx = canvas.getContext("2d", { willReadFrequently: true })!;
        const luminance = (values: Uint8ClampedArray) => Array.from(values).slice(0, 3)
          .map(value => value / 255)
          .map(value => value <= .04045 ? value / 12.92 : ((value + .055) / 1.055) ** 2.4)
          .reduce((sum, value, index) => sum + value * [.2126, .7152, .0722][index], 0);
        return [...nav.querySelectorAll("a, a span")].filter(element =>
          !element.classList.contains("sr-only") && element.getAttribute("aria-hidden") !== "true"
          && [...element.childNodes].some(node => node.nodeType === Node.TEXT_NODE && node.textContent?.trim()),
        ).map(element => {
          const ancestors: Element[] = [];
          for (let current: Element | null = element; current; current = current.parentElement) ancestors.unshift(current);
          ctx.fillStyle = "white";
          ctx.fillRect(0, 0, 1, 1);
          for (const ancestor of ancestors) {
            ctx.fillStyle = getComputedStyle(ancestor).backgroundColor;
            ctx.fillRect(0, 0, 1, 1);
          }
          const background = luminance(ctx.getImageData(0, 0, 1, 1).data);
          ctx.fillStyle = getComputedStyle(element).color;
          ctx.fillRect(0, 0, 1, 1);
          const foreground = luminance(ctx.getImageData(0, 0, 1, 1).data);
          return { text: element.textContent?.trim(), ratio: (Math.max(background, foreground) + .05) / (Math.min(background, foreground) + .05) };
        });
      });
      expect(ratios.length).toBeGreaterThan(2);
      for (const item of ratios) expect(item.ratio, `${item.text}: ${item.ratio}`).toBeGreaterThanOrEqual(4.5);
    });
  }
}

for (const [locale, home] of [["es", "/"], ["en", "/en"]] as const) {
  test(`Hobby keeps links and confirmed contact without custom events: ${locale}`, async ({ page }) => {
    const captured = await captureConversions(page);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(home);
    await page.waitForLoadState("networkidle");
    const download = page.waitForEvent("download");
    await page.locator('[data-track="cv-download"]').first().evaluate((link: HTMLAnchorElement) => link.click());
    expect((await download).suggestedFilename()).toBe("CV_Alex_Vicente_Lopez.pdf");
    await page.route("https://**", route => route.abort());
    for (const selector of ['a[href="https://github.com/AVL05"]', 'a[href*="linkedin.com/in/"]', '#projects a[target="_blank"][href^="https://"]:not([href*="github.com"])']) {
      const link = page.locator(selector).first();
      await expect(link).toHaveAttribute("href", /^https:\/\//);
      await link.evaluate((element: HTMLAnchorElement) => element.click());
    }
    const form = page.locator("[data-contact-form]");
    await form.locator('[name="name"]').fill("Private test name");
    await form.locator('[name="email"]').fill("private@example.invalid");
    await form.locator('[name="message"]').fill("Local mocked contact check without analytics or email delivery.");
    await page.route("**/api/contact", route => route.fulfill({ status: 200, json: { ok: true } }));
    await Promise.all([
      page.waitForResponse("**/api/contact"),
      form.evaluate(element => element.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }))),
    ]);
    await expect(form.locator('[name="message"]')).toHaveValue("");
    await expect(form.getByRole("status")).toBeVisible();
    expect(captured).toEqual([]);
  });
}

test("District videos keep deferred loading, posters and keyboard playback", async ({ page, request }) => {
  test.setTimeout(90_000);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const initialMedia: string[] = [];
  page.on("request", request => { if (request.resourceType() === "media") initialMedia.push(request.url()); });
  await page.goto("/proyectos/distrito-gourmet");
  await page.waitForLoadState("networkidle");
  expect(initialMedia).toEqual([]);
  const videos = page.locator("video");
  await expect(videos).toHaveCount(3);
  for (const video of await videos.all()) {
    await expect(video).toHaveAttribute("preload", "none");
    await expect(video).toHaveAttribute("controls", "");
    await expect(video).toHaveAttribute("playsinline", "");
    expect(await video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
    expect((await request.head((await video.getAttribute("poster"))!)).status()).toBe(200);
    const head = await request.head((await video.getAttribute("src"))!);
    expect(head.status()).toBe(200);
    expect(Number(head.headers()["content-length"])).toBeLessThan(20_000_000);
    await video.scrollIntoViewIfNeeded();
    await expect.poll(() => video.evaluate(element => {
      const bounds = element.getBoundingClientRect();
      return bounds.top >= 0 && bounds.bottom <= innerHeight;
    })).toBe(true);
    // Scroll observers must settle before native keyboard interaction.
    await page.waitForTimeout(300);
    await video.focus();
    await expect(video).toBeFocused();
    await page.keyboard.press("Space");
    await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.currentTime), { timeout: 15_000 }).toBeGreaterThan(.2);
    expect(await video.evaluate((element: HTMLVideoElement) => ({ error: element.error, width: element.videoWidth }))).toEqual({ error: null, width: 1920 });
    await page.keyboard.press("Space");
    await expect.poll(() => video.evaluate((element: HTMLVideoElement) => element.paused)).toBe(true);
  }
});
