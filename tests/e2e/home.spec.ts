import { expect, test } from "@playwright/test";
import { HOMES, hasHorizontalOverflow, trackErrors } from "./helpers";

const SECTION_IDS = ["hero", "about", "experience", "projects", "other", "skills", "education", "contact"];

for (const home of HOMES) {
  test(`home ${home.locale}: framed column, ordered sections, no errors or overflow`, { tag: ["@smoke", "@responsive"] }, async ({ page }) => {
    const errors = trackErrors(page);
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(home.path);
    await expect(page.locator("html")).toHaveAttribute("lang", home.locale);
    await expect(page.locator("h1")).toHaveCount(1);
    await expect(page.locator("h1")).toHaveText(home.title);
    expect(await page.locator("main section[id]").evaluateAll(sections => sections.map(section => section.id))).toEqual(SECTION_IDS);
    await expect(page.locator(".site-column")).toBeVisible();
    await expect(page.getByRole("link", { name: /Saltar al contenido|Skip to content/ })).toHaveAttribute("href", "#main-content");
    await page.evaluate(() => document.fonts.ready);
    expect(await hasHorizontalOverflow(page)).toBe(false);
    expect(errors).toEqual([]);
  });
}

for (const home of HOMES) {
  test(`home ${home.locale}: hero, about, experience and education carry the real content`, { tag: ["@smoke", "@responsive"] }, async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(home.path);
    const hero = page.locator("#hero");
    await expect(hero.getByText(home.role, { exact: true })).toBeVisible();
    await expect(hero.getByText(home.tagline, { exact: true })).toBeVisible();
    await expect(hero.getByText(home.availability, { exact: true })).toBeVisible();
    await expect(hero.getByRole("link", { name: home.work, exact: true })).toHaveAttribute("href", "#projects");
    await expect(hero.getByRole("link", { name: home.contact, exact: true })).toHaveAttribute("href", "mailto:alexviclop@gmail.com");
    const cv = hero.getByRole("link", { name: home.cv, exact: true });
    await expect(cv).toHaveAttribute("download", "");
    const pdf = await page.request.get((await cv.getAttribute("href"))!);
    expect(pdf.ok()).toBe(true);
    expect(pdf.headers()["content-type"]).toContain("pdf");

    await expect(page.locator("#about li")).toHaveCount(3);
    const jobs = page.locator("#experience ol > li");
    await expect(jobs).toHaveCount(2);
    await expect(jobs.nth(0).locator("h3")).toHaveText(home.companies[0]);
    await expect(jobs.nth(1).locator("h3")).toHaveText(home.companies[1]);
    await expect(jobs.nth(0).locator("ul li")).toHaveCount(3);
    await expect(jobs.nth(1).locator("ul li")).toHaveCount(2);
    const education = page.locator("#education ol > li");
    await expect(education).toHaveCount(3);
    const courseTitle = home.locale === "es" ? "Curso de AWS Academy Cloud Foundations" : "AWS Academy Cloud Foundations course";
    const course = education.filter({ has: page.getByRole("heading", { name: courseTitle, exact: true }) });
    await expect(course).toBeVisible();
    await expect(course.getByText("2025–2026", { exact: true })).toBeVisible();
    for (const language of home.languages) await expect(page.locator("#education")).toContainText(language);
    // TypeScript is deliberately not advertised anywhere on the home.
    await expect(page.locator("main")).not.toContainText("TypeScript");
  });
}

test("theme is dark by default, switches to light and survives reload and language change", { tag: ["@smoke", "@responsive"] }, async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  await expect(html).toHaveAttribute("data-theme", "dark");
  const dark = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
  await page.getByRole("button", { name: "Cambiar a tema claro" }).click();
  await expect(html).toHaveAttribute("data-theme", "light");
  expect(await page.evaluate(() => getComputedStyle(document.body).backgroundColor)).not.toBe(dark);
  await page.reload();
  await expect(html).toHaveAttribute("data-theme", "light");
  await page.goto("/en");
  await expect(html).toHaveAttribute("data-theme", "light");
  await page.getByRole("button", { name: "Switch to dark theme" }).click();
  await expect(html).toHaveAttribute("data-theme", "dark");
});

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
  await expect(page).toHaveURL(/#about$/);
  await expect(page.locator("#about-title")).toBeInViewport();
});

test("navigation marks the current section", { tag: ["@responsive"] }, async ({ page }, testInfo) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/en#experience");
  await expect(page.locator("#experience-title")).toBeInViewport();
  if (testInfo.project.name.includes("mobile")) {
    await page.locator("[data-menu-trigger]").click();
    await expect(page.locator('dialog a[href="#experience"]')).toHaveAttribute("aria-current", "location");
    await page.keyboard.press("Escape");
    await expect(page.locator("[data-menu-trigger]")).toBeFocused();
  } else {
    await expect(page.locator('header nav a[href="#experience"]')).toHaveAttribute("aria-current", "location");
  }
});

test("without JavaScript the home still renders, stays dark and keeps navigation and language switching", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false, viewport: { width: 390, height: 844 } });
  const page = await context.newPage();
  try {
    for (const home of HOMES) {
      await page.goto(home.path);
      await expect(page.locator("h1")).toHaveText(home.title);
      await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
      await expect(page.getByRole("navigation", { name: /Navegación móvil|Mobile navigation/ })).toBeVisible();
      await expect(page.locator("a[hreflang]").first()).toHaveAttribute("href", home.path === "/" ? "/en" : "/");
      expect(await hasHorizontalOverflow(page)).toBe(false);
    }
  } finally { await context.close(); }
});
