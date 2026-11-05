import { expect, test } from "@playwright/test";
import { ROUTE_PAIRS } from "../../lib/i18n-paths";

const routes = [
  ...ROUTE_PAIRS.flatMap(pair => [pair.es, pair.en]),
  "/legal",
  "/en/legal",
];

for (const route of routes) {
  test(`frontend layout preserves readable headings and media: ${route}`, async ({ page }, testInfo) => {
    const errors: string[] = [];
    page.on("pageerror", error => errors.push(error.message));
    page.on("response", response => {
      if (response.request().resourceType() === "image" && response.status() >= 400) {
        errors.push(`Image ${response.status()}: ${response.url()}`);
      }
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    expect((await page.goto(route))?.status()).toBe(200);
    await page.evaluate(() => document.fonts.ready);
    await expect(page.locator("main")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toBeVisible();

    // Catch clipping inside overflow containers as well as document overflow.
    const clippedHeadings = await page.locator("main :is(h1, h2, h3, h4)").evaluateAll(elements =>
      elements.filter(element => {
        const box = element.getBoundingClientRect();
        return box.width < 1 || box.left < -1 || box.right > innerWidth + 1;
      }).map(element => element.textContent),
    );
    expect(clippedHeadings).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth)).toBe(false);
    const clippedNavigation = await page.locator("main > section:first-child > nav:first-child a").evaluateAll(elements =>
      elements.filter(element => {
        const box = element.getBoundingClientRect();
        return box.left < -1 || box.right > innerWidth + 1;
      }).map(element => element.textContent),
    );
    expect(clippedNavigation).toEqual([]);

    // Responsive duplicates (hero thumbnails on touch, plate on desktop) are not rendered at every width.
    for (const image of await page.locator("main img").all()) {
      if (!(await image.isVisible())) continue;
      await image.scrollIntoViewIfNeeded();
      await expect.poll(() => image.evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    }
    await page.locator("h1").scrollIntoViewIfNeeded();
    await page.screenshot({ path: testInfo.outputPath("page.png") });
    if (route === "/") {
      for (const section of ["projects", "about", "experience", "photography", "contact"]) {
        await page.locator(`#${section}`).evaluate(element => element.scrollIntoView({ block: "start", behavior: "instant" }));
        await page.screenshot({ path: testInfo.outputPath(`${section}.png`) });
      }
    }
    expect(errors).toEqual([]);
  });
}

test("unmatched routes retain the shared design and localized recovery", async ({ page }) => {
  for (const route of ["/missing-page", "/en/missing-page"]) {
    expect((await page.goto(route))?.status()).toBe(404);
    await expect(page.locator("h1")).toHaveText(route.startsWith("/en") ? "Page not found." : "Página no encontrada.");
    await expect(page.locator("main")).toHaveCSS("background-color", "rgb(14, 13, 11)");
    await expect(page.locator(".utility-code")).toHaveAttribute("aria-hidden", "true");
  }
});

test("the hero plate follows pointer and keyboard focus, and reduced motion swaps instantly", async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const rows = page.locator("[data-hero-row] a");
  const plate = page.locator("[data-hero-plate]");
  await expect(rows).toHaveCount(3);
  await expect(rows.first()).toHaveAttribute("data-active", "true");
  if (testInfo.project.name.includes("desktop")) {
    await expect(plate).toBeVisible();
    expect(await plate.locator("img").first().evaluate(element => (element as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
    await rows.nth(1).hover();
    await expect(rows.nth(1)).toHaveAttribute("data-active", "true");
    await expect.poll(() => plate.locator('[data-plate-layer="1"]').evaluate(element => getComputedStyle(element).clipPath)).toMatch(/inset\(0(px)?( 0(px|%)?)*\)|none/);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await rows.nth(2).focus();
    await expect(rows.nth(2)).toHaveAttribute("data-active", "true");
    expect(await plate.locator('[data-plate-layer="2"]').evaluate(element => getComputedStyle(element).clipPath)).toMatch(/inset\(0(px)?( 0(px|%)?)*\)|none/);
  } else {
    await expect(plate).toBeHidden();
    await expect(rows.first().locator("img")).toBeVisible();
  }
  await expect(page.locator(".project-scene").first()).toHaveCSS("position", "relative");
});

test("the full navigation works on desktop and touch with focus restoration", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Abrir menú" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Menú", exact: true });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("link", { name: "Proyectos", exact: true })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("photography links keep a visible focus against the dark gallery", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const link = page.locator('#photography a').first();
  await link.focus();
  await expect(link).toBeFocused();
  await expect(link).toHaveCSS("outline-color", "rgb(212, 137, 90)");
  await expect(link).toHaveCSS("outline-style", "solid");
});

test("the hero index opens each case and every scene keeps its case action", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const index = page.getByRole("navigation", { name: /Proyectos seleccionados/ });
  await expect(index.getByRole("link")).toHaveCount(3);
  for (const [number, [title, slug]] of [["Distrito Gourmet", "distrito-gourmet"], ["LumaFlow Studio", "lumaflow-studio"], ["raw.vives", "raw-vives"]].entries()) {
    await expect(index.getByRole("link", { name: new RegExp(`^${title.replace(".", "\\.")}`) })).toHaveAttribute("href", `/proyectos/${slug}`);
    const scene = page.locator(`#work-${number + 1}`);
    await scene.scrollIntoViewIfNeeded();
    await expect(scene.getByRole("heading", { name: title, exact: true })).toBeInViewport();
    const action = scene.getByRole("link", { name: "Ver caso de estudio", exact: true });
    await expect(action).toBeVisible();
    await action.focus();
    await expect(action).toBeFocused();
  }
});

test("contact visual order matches keyboard and reading order", async ({ page }) => {
  await page.goto("/");
  const direct = page.locator(".contact-direct");
  const form = page.locator(".contact-form");
  expect(await direct.evaluate(element => Boolean(element.compareDocumentPosition(document.querySelector('.contact-form')!) & Node.DOCUMENT_POSITION_FOLLOWING))).toBe(true);
  await expect(direct).toHaveCSS("order", "0");
  await expect(form).toHaveCSS("order", "0");
});
