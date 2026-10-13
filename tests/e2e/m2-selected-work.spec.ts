import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const caseOutput = process.env.M2_CASE_OUTPUT;
const cases = ["distrito-gourmet", "lumaflow-studio", "raw-vives"];

test("case study capture matrix", async ({ browser }, testInfo) => {
  test.skip(!caseOutput || testInfo.project.name.includes("mobile"), "Explicit case capture matrix");
  test.setTimeout(180_000);
  await mkdir(caseOutput!, { recursive: true });
  const results = [];
  for (const [device, width, height] of [["desktop", 1440, 900], ["tablet", 768, 1024], ["mobile", 390, 844]] as const) {
    for (const locale of ["es", "en"]) {
      const context = await browser.newContext({ viewport: { width, height }, reducedMotion: "reduce" });
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      for (const slug of cases) {
        const response = await page.goto(`${locale === "es" ? "/proyectos" : "/en/projects"}/${slug}`);
        expect(response?.status()).toBe(200);
        await page.evaluate(() => document.fonts.ready);
        for (const image of await page.locator("main img").all()) await image.scrollIntoViewIfNeeded();
        await page.waitForLoadState("networkidle");
        await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
        expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
        await expect(page.locator("h1")).toBeVisible();
        await expect(page.locator("[data-project-showcase] img")).toBeVisible();
        await expect(page.locator("[data-project-showcase]").first().locator("figcaption")).toContainText(locale === "es" ? "Captura" : "screenshot");
        await expect(page.locator("[data-project-showcase]").first().locator("video")).toHaveCount(0);
        await page.screenshot({ path: path.join(caseOutput!, `${device}-${locale}-${slug}-hero.png`) });
        for (const image of await page.locator("main img").all()) {
          expect(await image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        }
        await page.screenshot({ path: path.join(caseOutput!, `${device}-${locale}-${slug}-full.png`), fullPage: true });
        results.push({ device, locale, slug, status: response?.status(), errors: [...errors] });
      }
      expect(errors).toEqual([]);
      await context.close();
    }
  }
  await writeFile(path.join(caseOutput!, "case-matrix.json"), JSON.stringify(results, null, 2));
});

for (const locale of ["es", "en"] as const) {
  test(`Distrito Gourmet editorial videos and navigation: ${locale}`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
    const mediaRequests: string[] = [];
    page.on("request", request => {
      if (request.url().endsWith(".mp4")) mediaRequests.push(request.url());
    });
    await page.goto(locale === "es" ? "/proyectos/distrito-gourmet" : "/en/projects/distrito-gourmet");
    await expect(page.locator("h1")).toHaveText("Distrito Gourmet");
    await expect(page.locator("main section[id]")).toHaveCount(8);
    await expect(page.locator("main video")).toHaveCount(3);
    await expect(page.locator("[data-project-showcase] video")).toHaveCount(3);
    expect(mediaRequests).toEqual([]);
    for (const video of await page.locator("main video").all()) {
      await expect(video).toHaveAttribute("preload", "none");
      await expect(video).toHaveAttribute("controls", "");
      expect(await video.getAttribute("autoplay")).toBeNull();
      const source = await video.getAttribute("src");
      const response = await page.request.get(source!, { headers: { Range: "bytes=0-1023" } });
      expect(response.status()).toBe(206);
      expect(response.headers()["content-type"]).toContain("video/mp4");
    }
    const firstVideo = page.locator("main video").first();
    await firstVideo.scrollIntoViewIfNeeded();
    await expect.poll(() => firstVideo.evaluate(element => (element as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
    expect(await firstVideo.evaluate(element => (element as HTMLVideoElement).muted)).toBe(true);
    await page.locator("h1").scrollIntoViewIfNeeded();
    await expect.poll(() => firstVideo.evaluate(element => (element as HTMLVideoElement).paused)).toBe(true);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await firstVideo.scrollIntoViewIfNeeded();
    await expect.poll(() => firstVideo.evaluate(element => (element as HTMLVideoElement).paused)).toBe(true);
    await firstVideo.focus();
    await page.keyboard.press("Space");
    await expect.poll(() => firstVideo.evaluate(element => (element as HTMLVideoElement).paused)).toBe(false);
    await page.keyboard.press("Space");
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
    expect(errors).toEqual([]);
    await page.goto(locale === "es" ? "/" : "/en");
    const distrito = page.locator('.project-scene[data-layout="restaurant"]');
    await expect(distrito).not.toContainText(locale === "es" ? "Demo pública" : "Public demo");
    await expect(distrito.locator("figcaption")).not.toContainText(locale === "es" ? "Captura del sitio publicado" : "Published website screenshot");
  });

  test(`selected work preserves destinations, lazy media and reduced motion: ${locale}`, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(locale === "es" ? "/" : "/en");
    const scenes = page.locator(".project-scene");
    await expect(scenes).toHaveCount(3);
    await expect(scenes.locator("h3")).toHaveText(["Distrito Gourmet", "LumaFlow Studio", "raw.vives"]);
    expect(await scenes.evaluateAll(elements => elements.map(element => element.getAttribute("data-layout"))))
      .toEqual(["restaurant", "product", "photography"]);
    await expect(scenes.first().locator("img")).toHaveCSS("object-fit", "contain");
    for (const scene of await scenes.all()) {
      await scene.scrollIntoViewIfNeeded();
      await expect(scene.locator(".scene-copy")).toHaveCSS("transform", "none");
      await expect(scene.locator(".scene-media")).toHaveCSS("transform", "none");
      await expect(scene.locator("img").first()).toHaveAttribute("loading", "lazy");
      for (const link of await scene.locator("a").all()) {
        expect(await link.getAttribute("href")).toMatch(/^(https:\/\/|\/)/);
        await link.focus();
        await expect(link).toBeFocused();
        expect(await link.evaluate(element => getComputedStyle(element).outlineStyle)).not.toBe("none");
      }
    }
    await expect(page.getByText("AI Creative Assistant", { exact: true })).toHaveCount(0);
    for (const [index, slug] of cases.entries()) {
      const link = scenes.nth(index).locator("a").first();
      await link.click();
      await expect(page).toHaveURL(new RegExp(`${locale === "es" ? "/proyectos" : "/en/projects"}/${slug}$`));
      await expect(page.locator("h1")).toBeVisible();
      await page.goBack({ waitUntil: "domcontentloaded" });
      await expect(page).toHaveURL(locale === "es" ? /\/$/ : /\/en$/);
      await expect(scenes.first().locator("h3")).toBeVisible();
    }
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  });
}

test("project reveals restore their static state when motion preference changes", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", error => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  for (const scene of await page.locator(".project-scene").all()) {
    await scene.scrollIntoViewIfNeeded();
    await expect.poll(() => scene.locator(".scene-copy").evaluate(element => Math.abs(new DOMMatrix(getComputedStyle(element).transform).m42))).toBeLessThan(.1);
  }
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const frame of await page.locator(".project-scene figure > a").all()) await expect(frame).toHaveCSS("clip-path", "none");
  for (const plane of await page.locator(".scene-media").all()) await expect(plane).toHaveCSS("transform", "none");
  expect(errors).toEqual([]);
});

test("secondary previews enhance fine-pointer and keyboard interaction only", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const finePointer = await page.evaluate(() => matchMedia("(hover: hover) and (pointer: fine)").matches);
  const scene = page.locator(".project-scene").nth(1);
  const link = scene.locator("figure > a");
  await expect(scene.locator("img")).toHaveCount(1);
  await link.hover();
  await expect(scene.locator("img")).toHaveCount(finePointer ? 2 : 1);
  await page.mouse.move(0, 0);
  await link.blur();
  await expect(scene.locator("img")).toHaveCount(finePointer ? 2 : 1);
  if (finePointer) await expect(scene.locator('img[aria-hidden="true"]')).toHaveCSS("opacity", "0");
  await link.focus();
  await expect(scene.locator("img")).toHaveCount(finePointer ? 2 : 1);
  await link.blur();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await link.hover();
  await expect(scene.locator("img")).toHaveCount(finePointer ? 2 : 1);
  if (finePointer) await expect(scene.locator('img[aria-hidden="true"]')).toHaveCSS("opacity", "0");
});

test("selected work remains usable without JavaScript", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  await page.goto("/en");
  for (const scene of await page.locator(".project-scene").all()) {
    await scene.scrollIntoViewIfNeeded();
    await expect(scene.locator("h3")).toBeVisible();
    await expect(scene.locator("figure > a")).toHaveCSS("clip-path", "none");
    expect(await scene.locator("a").first().getAttribute("href")).toMatch(/^(https:\/\/|\/)/);
  }
  expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
  await context.close();
});

test("removed public indexes stay gone and never leak into the sitemap", async ({ page }) => {
  for (const route of ["/proyectos", "/en/projects", "/sobre-mi", "/fotografia", "/contacto", "/en/about", "/en/photography", "/en/contact"]) {
    expect((await page.goto(route))?.status()).toBe(404);
  }
});
