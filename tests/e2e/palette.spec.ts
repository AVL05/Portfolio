import { expect, test, type Page } from "@playwright/test";
import { hasHorizontalOverflow, trackErrors } from "./helpers";

const open = async (page: Page, path = "/") => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(path);
  await page.waitForLoadState("networkidle");
  await page.keyboard.press("Control+k");
  const dialog = page.getByRole("dialog", { name: /Paleta de comandos|Command palette/ });
  await expect(dialog).toBeVisible();
  return dialog;
};

test("Ctrl+K opens the palette, filters by typing, moves with arrows and Enter jumps to the section", { tag: ["@smoke"] }, async ({ page }) => {
  const errors = trackErrors(page);
  const dialog = await open(page);
  const input = dialog.getByRole("combobox", { name: "Buscar un comando" });
  await expect(input).toBeFocused();
  await expect(input).toHaveAttribute("aria-expanded", "true");
  await expect(dialog.getByRole("listbox")).toBeVisible();
  // Every group is reachable: sections, case studies, links and preferences.
  expect(await dialog.getByRole("group").count()).toBe(4);

  await input.fill("proy");
  const options = dialog.getByRole("option");
  await expect(options.first()).toContainText("Proyectos destacados");
  await expect(options.first()).toHaveAttribute("aria-selected", "true");
  const first = await options.first().getAttribute("id");
  await expect(input).toHaveAttribute("aria-activedescendant", first!);
  await page.keyboard.press("ArrowDown");
  await expect(options.nth(1)).toHaveAttribute("aria-selected", "true");
  await expect(input).toHaveAttribute("aria-activedescendant", (await options.nth(1).getAttribute("id"))!);
  await page.keyboard.press("ArrowUp");
  await expect(options.first()).toHaveAttribute("aria-selected", "true");

  await page.keyboard.press("Enter");
  await expect(dialog).not.toBeVisible();
  await expect(page).toHaveURL(/#projects$/);
  await expect(page.locator("#projects-title")).toBeInViewport();
  expect(await hasHorizontalOverflow(page)).toBe(false);
  expect(errors).toEqual([]);
});

test("Escape closes the palette and returns focus; Ctrl+K toggles it", { tag: ["@smoke"] }, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const trigger = page.getByRole("button", { name: /Paleta de comandos/ });
  await trigger.focus();
  await page.keyboard.press("Control+k");
  const dialog = page.getByRole("dialog", { name: "Paleta de comandos" });
  await expect(dialog).toBeVisible();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  // Focus stays inside the modal while tabbing.
  for (let i = 0; i < 4; i++) {
    await page.keyboard.press("Tab");
    expect(await dialog.evaluate(element => element.matches(":modal") && (element.contains(document.activeElement) || document.activeElement === document.body))).toBe(true);
  }
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await page.keyboard.press("Control+k");
  await expect(dialog).toBeVisible();
  await page.keyboard.press("Control+k");
  await expect(dialog).not.toBeVisible();
});

test("commands open case studies, switch theme and language, and external links open safely", { tag: ["@smoke"] }, async ({ page, context }) => {
  await context.route("https://distrito-gourmet.aleviclop.dev/**", route => route.fulfill({ status: 200, contentType: "text/html", body: "<title>stub</title>" }));
  let dialog = await open(page);
  let input = dialog.getByRole("combobox");

  await input.fill("raw.vives");
  await expect(dialog.getByRole("option").first()).toContainText("Caso de estudio: raw.vives");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/proyectos/raw-vives");

  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.keyboard.press("Control+k");
  await input.fill("tema");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  await page.keyboard.press("Enter");
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");

  await page.keyboard.press("Control+k");
  await input.fill("ingles");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL("/en");
  await page.waitForLoadState("networkidle");
  await page.keyboard.press("Control+k");
  dialog = page.getByRole("dialog", { name: "Command palette" });
  input = dialog.getByRole("combobox", { name: "Search commands" });
  await input.fill("live");
  await expect(dialog.getByRole("option")).toHaveCount(2);
  await input.fill("distrito live");
  const popup = page.waitForEvent("popup");
  await page.keyboard.press("Enter");
  const opened = await popup;
  expect(opened.url()).toContain("distrito-gourmet.aleviclop.dev");
  expect(await opened.evaluate(() => window.opener)).toBeNull();
});

test("the palette explains empty results and lists the CV, email and profiles", { tag: ["@smoke"] }, async ({ page }) => {
  const dialog = await open(page);
  const input = dialog.getByRole("combobox");
  await input.fill("zzzz");
  await expect(dialog.getByRole("option")).toHaveCount(0);
  await expect(dialog.getByRole("status")).toHaveText("Sin resultados");
  await input.fill("");
  for (const label of ["GitHub", "LinkedIn", "Escribir un email", "Descargar CV"]) {
    await expect(dialog.getByRole("option", { name: new RegExp(label) })).toHaveCount(1);
  }
});

test("on a phone the palette opens from the menu and focus returns to the menu button", { tag: ["@smoke", "@mobile-only"] }, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  const menu = page.getByRole("button", { name: "Abrir menú" });
  await menu.click();
  await page.getByRole("button", { name: "Buscar y comandos" }).click();
  const dialog = page.getByRole("dialog", { name: "Paleta de comandos" });
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("combobox")).toBeFocused();
  expect(await hasHorizontalOverflow(page)).toBe(false);
  await dialog.getByRole("combobox").fill("contacto");
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/#contact$/);
});

test("revealed sections stay visible under reduced motion and no content is hidden without scrolling back", { tag: ["@responsive"] }, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  expect(await page.locator("[data-reveal='pending']").count()).toBe(0);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/");
  await page.waitForLoadState("networkidle");
  await page.locator("#contact").scrollIntoViewIfNeeded();
  // Everything the visitor scrolls past ends up shown, never left transparent.
  await expect(page.locator("#contact .section-body")).toHaveAttribute("data-reveal", "shown");
});
