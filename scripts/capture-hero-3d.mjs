import { chromium } from "@playwright/test";
import { createRequire } from "node:module";

const sharp = createRequire(import.meta.url)(createRequire(import.meta.url).resolve("sharp", {
  paths: [createRequire(import.meta.url).resolve("next")],
}));
const origin = process.env.HERO_CAPTURE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({ headless: true, args: ["--enable-unsafe-swiftshader"] });
try {
  const page = await browser.newPage({ viewport: { width: 1440, height: 810 }, locale: "es-ES", reducedMotion: "reduce" });
  await page.goto(`${origin}/proyectos`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.addStyleTag({ content: "nextjs-portal { visibility: hidden !important; }" });
  await sharp(await page.screenshot()).resize(1024, 576).webp({ quality: 85 })
    .toFile("public/hero-3d/textures/monitor-portfolio.webp");

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(origin, { waitUntil: "networkidle" });
  await page.getByRole("region", { name: "Alex Creative Space" }).scrollIntoViewIfNeeded();
  await page.locator('[data-ready="true"] canvas').waitFor({ timeout: 60000 });
  await page.addStyleTag({ content: 'a[class*="hotspot"], [class*="caption"], [class*="controls"], [class*="hint"], [class*="poster"], nextjs-portal { visibility: hidden !important; }' });
  await sharp(await page.locator("canvas").screenshot()).resize({ width: 1200 }).webp({ quality: 85 })
    .toFile("public/hero-3d/textures/studio-preview.webp");
  console.log("Captured monitor texture and studio preview from the local portfolio.");
} finally {
  await browser.close();
}
