import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

// Explicit audit output stays reviewable; ordinary test runs use test-results.
const output = process.env.M1_AUDIT_OUTPUT;

for (const [device, width, height] of [["desktop", 1440, 900], ["tablet", 768, 1024], ["mobile", 390, 844]] as const) {
  for (const locale of ["es", "en"] as const) {
    test(`M1 visual audit: ${device} ${locale}`, async ({ browser }, testInfo) => {
      test.skip(testInfo.project.name.includes("mobile"), "Viewport matrix runs once");
      const context = await browser.newContext({ viewport: { width, height }, hasTouch: width < 1024, isMobile: width === 390, reducedMotion: "no-preference" });
      const page = await context.newPage();
      const errors: string[] = [];
      page.on("pageerror", error => errors.push(error.message));
      page.on("console", message => { if (message.type() === "error") errors.push(message.text()); });
      try {
        await page.addInitScript(() => {
          const data = { shifts: [] as number[], frames: [] as number[] };
          (window as unknown as { m1Audit: typeof data }).m1Audit = data;
          new PerformanceObserver(list => {
            for (const entry of list.getEntries()) {
              const shift = entry as PerformanceEntry & { hadRecentInput: boolean; value: number };
              if (!shift.hadRecentInput) data.shifts.push(shift.value);
            }
          }).observe({ type: "layout-shift", buffered: true });
          let previous = 0;
          const sample = (time: number) => {
            if (previous) data.frames.push(time - previous);
            previous = time;
            if (time < 3000) requestAnimationFrame(sample);
          };
          requestAnimationFrame(sample);
        });
        await page.goto(locale === "es" ? "/" : "/en");
        await page.waitForLoadState("networkidle");
        await page.evaluate(() => document.fonts.ready);
        await expect(page.locator("[data-hero-footer]")).toHaveCSS("opacity", "1");
        await expect.poll(() => page.locator("[data-hero-line]").last().evaluate(element => Math.abs(new DOMMatrix(getComputedStyle(element).transform).m42))).toBeLessThan(.1);
        const initial = await page.evaluate(() => {
          const data = (window as unknown as { m1Audit: { shifts: number[]; frames: number[] } }).m1Audit;
          const hero = document.querySelector("#hero")!;
          return {
            viewport: { width: innerWidth, height: innerHeight },
            overflow: document.documentElement.scrollWidth > innerWidth,
            clippedLines: [...hero.querySelectorAll<HTMLElement>("[data-hero-line]")].some(line => line.scrollWidth > line.parentElement!.clientWidth + 1),
            layoutShiftSum: data.shifts.reduce((sum, value) => sum + value, 0),
            frameIntervalsMs: data.frames,
            typography: [...hero.querySelectorAll("h1, p, a")].map(element => {
              const style = getComputedStyle(element);
              return { text: element.textContent, family: style.fontFamily, size: style.fontSize, lineHeight: style.lineHeight, color: style.color };
            }),
          };
        });
        expect(initial.overflow).toBe(false);
        expect(initial.clippedLines).toBe(false);
        const directory = output ?? testInfo.outputDir;
        await mkdir(directory, { recursive: true });
        await page.screenshot({ path: path.join(directory, `${device}-${locale}-hero.png`) });
        const scenes = await page.locator(".project-scene").all();
        for (const [index, scene] of scenes.entries()) {
          await scene.scrollIntoViewIfNeeded();
          await page.waitForTimeout(850);
          const clip = await scene.evaluate(element => {
            const box = element.getBoundingClientRect();
            return { x: box.x + scrollX, y: box.y + scrollY, width: box.width, height: box.height };
          });
          await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
          await page.screenshot({ path: path.join(directory, `${device}-${locale}-work-${index + 1}.png`), fullPage: true, clip });
        }
        // Scroll each real section to load its media and finish existing reveals.
        for (const id of ["projects", "about", "experience", "photography", "contact"]) {
          const section = page.locator(`#${id}`);
          if (await section.count()) {
            await section.scrollIntoViewIfNeeded();
            await page.waitForTimeout(650);
          }
        }
        await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
        await page.waitForTimeout(700);
        await page.screenshot({ path: path.join(directory, `${device}-${locale}-full.png`), fullPage: true });
        if (width < 1024) {
          const trigger = page.getByRole("button", { name: locale === "es" ? "Abrir menú" : "Open menu" });
          await trigger.click();
          await expect(page.locator("dialog")).toBeVisible();
          await page.waitForTimeout(500);
          await page.screenshot({ path: path.join(directory, `${device}-${locale}-menu.png`) });
          await page.keyboard.press("Escape");
          await expect(trigger).toBeFocused();
        }
        expect(errors).toEqual([]);
        await writeFile(path.join(directory, `${device}-${locale}.json`), JSON.stringify({ ...initial, errors }, null, 2));
      } finally {
        await context.close();
      }
    });
  }
}
