import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const mediaOutput = process.env.M3_MEDIA_OUTPUT;

test("motion capture matrix", async ({ browser }, testInfo) => {
  test.skip(!mediaOutput || testInfo.project.name.includes("mobile"), "Explicit motion recording matrix");
  test.setTimeout(180_000);
  await mkdir(mediaOutput!, { recursive: true });
  const records = [];
  for (const [device, width, height] of [["desktop", 1440, 900], ["tablet", 768, 1024], ["mobile", 390, 844]] as const) {
    for (const locale of ["es", "en"]) {
      const context = await browser.newContext({ viewport: { width, height }, hasTouch: width < 1024,
        isMobile: width === 390, reducedMotion: "no-preference",
        recordVideo: { dir: mediaOutput!, size: { width, height } } });
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      const video = page.video()!;
      await page.goto(locale === "es" ? "/" : "/en");
      await page.evaluate(() => document.fonts.ready);
      // Fixed observation windows make the before/after recordings comparable.
      await page.waitForTimeout(1400);
      await page.screenshot({ path: path.join(mediaOutput!, `${device}-${locale}-hero.png`) });
      if (width < 1024) {
        await page.locator("[data-menu-trigger]").click();
        await page.waitForTimeout(500);
        await page.screenshot({ path: path.join(mediaOutput!, `${device}-${locale}-menu.png`) });
        await page.keyboard.press("Escape");
      }
      for (const scene of await page.locator(".project-scene").all()) {
        await scene.scrollIntoViewIfNeeded();
        await page.waitForTimeout(800);
      }
      const preview = page.locator('.project-scene[data-layout="product"] figure a');
      if (width >= 1024) {
        await preview.hover();
        await page.waitForTimeout(500);
        await page.screenshot({ path: path.join(mediaOutput!, `${device}-${locale}-preview.png`) });
        await page.mouse.move(1, 1);
        await page.waitForTimeout(300);
      }
      for (const id of ["about", "experience", "photography", "contact"]) {
        await page.locator(`#${id}`).scrollIntoViewIfNeeded();
        await page.waitForTimeout(600);
      }
      await page.locator('#contact input[name="name"]').focus();
      await page.waitForTimeout(250);
      await page.emulateMedia({ reducedMotion: "reduce" });
      for (const image of await page.locator("main img").all()) await image.scrollIntoViewIfNeeded();
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
      expect(errors).toEqual([]);
      await page.screenshot({ path: path.join(mediaOutput!, `${device}-${locale}-full.png`), fullPage: true });
      await context.close();
      const videoPath = path.join(mediaOutput!, `${device}-${locale}-motion.webm`);
      await video.saveAs(videoPath);
      await video.delete();
      records.push({ device, locale, viewport: { width, height }, errors, video: videoPath });
    }
  }
  await writeFile(path.join(mediaOutput!, "matrix.json"), JSON.stringify(records, null, 2));
});

for (const locale of ["es", "en"]) {
  test(`fast scrolling and live reduced motion preserve readable content: ${locale}`, async ({ page }) => {
    await page.goto(locale === "es" ? "/" : "/en");
    await page.emulateMedia({ reducedMotion: "no-preference" });
    for (const id of ["contact", "about", "projects", "contact"]) {
      await page.evaluate(id => scrollTo({ top: document.getElementById(id)!.offsetTop - innerHeight * .8, behavior: "instant" }), id);
      await page.waitForTimeout(100);
      const content = page.locator(id === "contact" ? ".contact-item" : id === "about" ? ".capability-row" : ".scene-copy");
      for (const item of await content.all()) {
        await expect(item).toHaveCSS("opacity", "1");
        await expect(item).toHaveCSS("visibility", "visible");
      }
    }
    await page.emulateMedia({ reducedMotion: "reduce" });
    for (const selector of [".contact-item", ".capability-row", ".rh-word", ".scene-media"]) {
      for (const item of await page.locator(selector).all()) await expect(item).toHaveCSS("transform", "none");
    }
    await expect(page.locator(".custom-cursor")).toHaveCount(0);
    await expect(page.locator("p[data-hero-copy]")).toHaveCSS("transform", "none");
    await expect(page.locator("p[data-hero-copy]")).toHaveCSS("opacity", "1");
  });
}

test("project preview decodes before fading and reverses without unmounting", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.includes("mobile"), "Fine pointer only");
  await page.goto("/en");
  const frame = page.locator('.project-scene[data-layout="product"] figure a');
  await frame.hover();
  const image = frame.locator('img[aria-hidden="true"]');
  await expect(image).toHaveAttribute("data-visible", "true");
  expect(await image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  for (let i = 0; i < 3; i++) {
    await page.mouse.move(1, 1);
    await expect(image).toHaveAttribute("data-visible", "false");
    await frame.hover();
    await expect(image).toHaveAttribute("data-visible", "true");
  }
  await page.mouse.move(1, 1);
  await expect(image).toHaveCSS("opacity", "0");
  await frame.focus();
  await expect(image).toHaveAttribute("data-visible", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(image).toHaveCSS("opacity", "0");
});

test("menu active state follows capabilities and keyboard focus is immediate", async ({ page }, testInfo) => {
  await page.goto("/en");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.locator("#about").scrollIntoViewIfNeeded();
  if (testInfo.project.name.includes("mobile")) {
    await page.locator("[data-menu-trigger]").click();
    await expect(page.locator('dialog a[href="#experience"]')).toHaveAttribute("aria-current", "location");
    await page.keyboard.press("Escape");
    await expect(page.locator("[data-menu-trigger]")).toBeFocused();
  } else {
    await expect(page.locator('header nav a[href="#experience"]')).toHaveAttribute("aria-current", "location");
  }
  await page.locator('#contact input[name="email"]').focus();
  await expect(page.locator('#contact input[name="email"]')).toBeFocused();
  await expect(page.locator('#contact input[name="email"]')).toHaveCSS("visibility", "visible");
});

test("contact pending feedback is immediate and a failed request preserves the draft", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en");
  let release!: () => void;
  let requests = 0;
  const pending = new Promise<void>(resolve => { release = resolve; });
  await page.route("**/api/contact", async route => {
    requests++;
    await pending;
    await route.fulfill({ status: 503, contentType: "application/json", body: JSON.stringify({ ok: false, code: "provider_error" }) });
  });
  const form = page.locator("#contact form");
  await form.locator('[name="name"]').fill("Motion test");
  await form.locator('[name="email"]').fill("motion@example.invalid");
  await form.locator('[name="message"]').fill("A local mocked message that must stay in the draft.");
  const submit = form.locator('[type="submit"]');
  await submit.click();
  try {
    await expect(form).toHaveAttribute("aria-busy", "true");
    await expect(submit).toBeDisabled();
  } finally { release(); }
  await expect(form).toHaveAttribute("aria-busy", "false");
  await expect(submit).toBeEnabled();
  await expect(form.locator('[name="email"]')).toHaveValue("motion@example.invalid");
  expect(requests).toBe(1);
});
