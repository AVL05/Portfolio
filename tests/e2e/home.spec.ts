import { expect, test } from "@playwright/test";
import { CASES, HOMES, hasHorizontalOverflow, heroLinesFit, trackErrors } from "./helpers";

for (const home of HOMES) {
  test(`home ${home.locale}: identity, CV, project index, no errors or overflow`, { tag: ["@smoke", "@responsive"] }, async ({ page }) => {
    const errors = trackErrors(page);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(home.path);
    await expect(page.locator("html")).toHaveAttribute("lang", home.locale);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(home.title);

    const hero = page.locator("#hero");
    await expect(hero.getByRole("link", { name: home.work, exact: true })).toHaveAttribute("href", "#projects");
    const cv = hero.getByRole("link", { name: home.cv, exact: true });
    await expect(cv).toHaveAttribute("download", "");
    const pdf = await page.request.get((await cv.getAttribute("href"))!);
    expect(pdf.ok()).toBe(true);
    expect(pdf.headers()["content-type"]).toContain("pdf");

    const index = hero.getByRole("navigation", { name: /Proyectos seleccionados|Selected work/ }).getByRole("link");
    await expect(index).toHaveCount(3);
    expect(await index.evaluateAll(links => links.map(link => link.getAttribute("href"))))
      .toEqual(CASES.map(slug => `${home.cases}${slug}`));

    await page.evaluate(() => document.fonts.ready);
    expect(await hasHorizontalOverflow(page)).toBe(false);
    expect(await heroLinesFit(page)).toBe(true);
    expect(errors).toEqual([]);
  });
}

test("mobile menu traps focus, closes with Escape, restores focus and navigates", { tag: ["@smoke", "@mobile-only"] }, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const trigger = page.getByRole("button", { name: "Abrir menú" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Menú", exact: true });
  await expect(dialog).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  for (let i = 0; i < 8; i++) {
    await page.keyboard.press("Tab");
    // Native dialogs can move focus to browser chrome between tab cycles.
    expect(await dialog.evaluate(element => element.matches(":modal") && (element.contains(document.activeElement) || document.activeElement === document.body))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await dialog.getByRole("link", { name: "Sobre mí", exact: true }).click();
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#experience$/);
  await expect(page.locator("#experience-title")).toBeInViewport();
});

test("navigation marks the current section and keyboard focus is immediate", { tag: ["@responsive"] }, async ({ page }, testInfo) => {
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
  const email = page.locator('#contact input[name="email"]');
  await email.focus();
  await expect(email).toBeFocused();
  await expect(email).toHaveCSS("visibility", "visible");
});

test("without JavaScript the home still delivers content, switching and a contact fallback", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  try {
    for (const home of HOMES) {
      await page.goto(home.path);
      await expect(page.locator("h1")).toHaveText(home.title);
      await expect(page.locator("#hero").getByRole("link", { name: home.cv, exact: true })).toBeVisible();
      await expect(page.getByRole("navigation", { name: /Navegación móvil|Mobile navigation/ })).toBeVisible();
      await expect(page.locator("a[hreflang]").first()).toHaveAttribute("href", home.path === "/" ? "/en" : "/");
      await expect(page.locator("[data-contact-form]")).toBeHidden();
      await expect(page.locator('noscript a[href="mailto:alexviclop@gmail.com"]')).toBeVisible();
      await page.locator(".project-scene").last().scrollIntoViewIfNeeded();
      await expect(page.locator(".project-scene h3")).toHaveCount(3);
      await expect(page.locator(".project-scene figure > a").first()).toHaveCSS("clip-path", "none");
      expect(await hasHorizontalOverflow(page)).toBe(false);
    }
  } finally { await context.close(); }
});
