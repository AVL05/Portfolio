import { expect, test, type Locator } from "@playwright/test";

const fullyRevealed = /^(none|inset\(0(px)?( 0(px|%)?)*\))$/;
// Under reduced motion the global stylesheet gives every property a .01ms transition,
// so a computed value read in the same frame as a style change can still be the old
// one. Poll the rendered value instead of sampling it once.
const clipOf = (layer: Locator) => layer.evaluate(element => getComputedStyle(element).clipPath);

// Regression: the plate must settle to a fully revealed layer for pointer and keyboard users.
test("the hero plate follows pointer and keyboard focus, and reduced motion swaps instantly", { tag: ["@smoke", "@responsive"] }, async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const rows = page.locator("[data-hero-row] a");
  const plate = page.locator("[data-hero-plate]");
  await expect(rows).toHaveCount(3);
  await expect(rows.first()).toHaveAttribute("data-active", "true");
  if (!testInfo.project.name.includes("desktop")) {
    await expect(plate).toBeHidden();
    await expect(rows.first().locator("img")).toBeVisible();
    return;
  }
  await expect(plate).toBeVisible();
  expect(await plate.locator("img").first().evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
  const layerAt = (index: number) => plate.locator(`[data-plate-layer="${index}"]`);
  await rows.nth(1).hover();
  await expect(rows.nth(1)).toHaveAttribute("data-active", "true");
  // The wipe publishes its settled state; assert it instead of sampling a running tween.
  await expect(plate.locator('[data-plate-layer="1"]')).toHaveAttribute("data-plate-state", "revealed");
  await expect.poll(() => clipOf(layerAt(1))).toMatch(fullyRevealed);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await rows.nth(2).focus();
  await expect(rows.nth(2)).toHaveAttribute("data-active", "true");
  await expect(plate.locator('[data-plate-layer="2"]')).toHaveAttribute("data-plate-state", "revealed");
  await expect.poll(() => clipOf(layerAt(2))).toMatch(fullyRevealed);
  // Keyboard users can always return to the first project.
  await rows.first().focus();
  await expect(plate.locator('[data-plate-layer="0"]')).toHaveAttribute("data-plate-state", "revealed");
  await expect.poll(() => clipOf(layerAt(0))).toMatch(fullyRevealed);
});

test("a reduced-motion preference that turns on mid-wipe settles the plate", { tag: ["@smoke"] }, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const layer = page.locator('[data-hero-plate] [data-plate-layer="1"]');
  await page.locator("[data-hero-row] a").nth(1).focus();
  await expect(layer).toHaveAttribute("data-plate-state", "revealing");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(layer).toHaveAttribute("data-plate-state", "revealed");
  await expect.poll(() => clipOf(layer)).toMatch(fullyRevealed);
});

test("the hero entrance finishes, never hides copy, and reduced motion resets live transforms", async ({ page }) => {
  await page.addInitScript(() => {
    const sample = () => {
      const description = document.querySelector("p[data-hero-copy]");
      if (description && Number(getComputedStyle(description).opacity) < 1) document.documentElement.dataset.heroCopyHidden = "true";
      if (description && getComputedStyle(description).transform !== "none") document.documentElement.dataset.heroCopyMoved = "true";
      if (performance.now() < 5000) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/en");
  const line = page.locator("[data-hero-line]").last();
  await expect.poll(() => line.evaluate(element => {
    const transform = getComputedStyle(element).transform;
    return transform === "none" || Math.abs(new DOMMatrix(transform).m42) < .1;
  })).toBe(true);
  await expect(page.locator("[data-hero-footer]")).toHaveCSS("opacity", "1");
  await expect(page.locator("html")).not.toHaveAttribute("data-hero-copy-hidden", "true");
  await expect(page.locator("html")).not.toHaveAttribute("data-hero-copy-moved", "true");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(line).toHaveCSS("transform", "none");
  await expect(page.locator("[data-hero-title]")).toHaveCSS("transform", "none");
});

test("late hydration leaves the server-rendered hero visible", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route("**/_next/static/chunks/*.js", async route => {
    await new Promise(resolve => setTimeout(resolve, 1800));
    await route.continue();
  });
  await page.goto("/en");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("[data-hero-indicator]")).toHaveCSS("opacity", "1");
  await expect(page.locator("[data-hero-footer]")).toHaveCSS("opacity", "1");
  for (const line of await page.locator("[data-hero-line]").all()) await expect(line).toHaveCSS("transform", "none");
});

test("slow font loading does not move the hero summary", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 412, height: 823 });
  await page.route("**/*.woff2", async route => {
    await new Promise(resolve => setTimeout(resolve, 2500));
    await route.continue();
  });
  await page.goto("/", { waitUntil: "domcontentloaded" });
  const summary = page.locator("[data-hero-summary]");
  const before = await summary.boundingBox();
  await page.evaluate(() => document.fonts.ready);
  const after = await summary.boundingBox();
  expect(before).not.toBeNull();
  expect(after).not.toBeNull();
  expect(Math.abs(after!.y - before!.y)).toBeLessThan(1);
});

test("fast scrolling and a live reduced-motion switch keep content readable", { tag: ["@responsive"] }, async ({ page }) => {
  await page.goto("/");
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
  for (const selector of [".contact-item", ".capability-row", "[data-hero-line]", ".scene-media", ".project-scene figure > a"]) {
    for (const item of await page.locator(selector).all()) await expect(item).toHaveCSS("transform", "none");
  }
  for (const frame of await page.locator(".project-scene figure > a").all()) await expect(frame).toHaveCSS("clip-path", "none");
  await expect(page.locator("p[data-hero-copy]")).toHaveCSS("opacity", "1");
});

test("case links claim one unique view-transition name at a time", async ({ page }) => {
  await page.goto("/en");
  await page.waitForLoadState("networkidle");
  await page.evaluate(() => document.addEventListener("click", event => event.preventDefault(), { capture: true }));
  const named = () => page.evaluate(() => [...document.querySelectorAll<HTMLElement>("*")]
    .map(element => element.style.getPropertyValue("view-transition-name")).filter(Boolean));
  expect(await named()).toEqual([]);
  await page.locator("[data-hero-row] a").nth(1).click();
  expect(await named()).toEqual(["project-lumaflow-studio"]);
  await page.locator('.project-scene[data-layout="photography"] figure a').first().click();
  expect(await named()).toEqual(["project-raw-vives"]);
});
