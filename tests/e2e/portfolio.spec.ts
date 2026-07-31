import { expect, test } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("renders without horizontal overflow and switches language", async ({
  page,
}) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Alex Vicente" })).toBeVisible();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");

  const viewport = await page.locator("html").evaluate((element) => ({
    clientWidth: element.clientWidth,
    scrollWidth: element.scrollWidth,
  }));
  expect(viewport.scrollWidth).toBe(viewport.clientWidth);

  await page.getByRole("button", { name: "Cambiar a inglés" }).click();

  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(
    page.getByRole("button", { name: "Switch to Spanish" }),
  ).toBeVisible();
  await expect(page.getByText("Available for frontend roles")).toBeVisible();
});

test("keeps the archive visible and previews work accessibly", async ({
  page,
}, testInfo) => {
  await page.goto("/");

  const archive = page.getByRole("heading", { name: "Archivo", exact: true });
  await archive.scrollIntoViewIfNeeded();
  await expect(archive).toBeVisible();
  await expect(page.locator("details")).toHaveCount(0);

  if (testInfo.project.name === "desktop-chromium") {
    const hotel = page
      .getByRole("article")
      .filter({
        has: page.getByRole("heading", {
          name: "Sistema de Gestión Hotelera (API)",
        }),
      });

    await hotel.hover();
    await expect(
      page.getByRole("link", {
        name: "Ver demo: Sistema de Gestión Hotelera (API)",
      }),
    ).toBeVisible();
  } else {
    await expect(
      page.getByRole("img", {
        name: "El Fogón: Landing gastronómica",
      }),
    ).toBeVisible();
    await expect(page.locator(".archive-preview")).toBeHidden();
  }
});

test("validates the contact form and handles a successful response", async ({
  page,
}) => {
  await page.route("https://api.web3forms.com/submit", async (route) => {
    await route.fulfill({
      contentType: "application/json",
      body: JSON.stringify({ success: true }),
      status: 200,
    });
  });

  await page.goto("/#contact");
  const submit = page.getByRole("button", { name: "ENVIAR MENSAJE" });
  await submit.click();

  await expect(
    page.getByText("Escribe un nombre de al menos 2 caracteres."),
  ).toBeVisible();
  await expect(page.getByLabel("Tu nombre")).toBeFocused();

  await page.getByLabel("Tu nombre").fill("Prueba Portfolio");
  await page.getByLabel("Tu email").fill("portfolio@example.com");
  await page
    .getByLabel("Tu mensaje")
    .fill("Mensaje de prueba automatizada con longitud suficiente.");
  await submit.click();

  await expect(
    page.getByText("Mensaje enviado. Te responderé pronto."),
  ).toBeVisible();
});

test("serves the CV and local project media", async ({ request }) => {
  for (const path of [
    "/icon.png",
    "/cv/CV_Alex_Vicente_Lopez_Frontend_React_A4.pdf",
    "/projects/Demo_API_Hotel.mp4",
    "/projects/LLIBRET%2024-25.pdf",
  ]) {
    const response = await request.get(path);
    expect(response.ok(), `${path} should be available`).toBeTruthy();
  }
});
