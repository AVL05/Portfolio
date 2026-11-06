import { expect, test } from "@playwright/test";
import { CASES, hasHorizontalOverflow, trackErrors } from "./helpers";

test("recruiter journey: every project is one click from the home and exposes its decisions", { tag: ["@smoke", "@responsive"] }, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const titles = ["Distrito Gourmet", "LumaFlow Studio", "raw.vives"];
  for (const [index, slug] of CASES.entries()) {
    await page.goto("/");
    const destination = `/proyectos/${slug}`;
    // Every scene keeps a visible, focusable case action pointing at the same destination.
    const action = page.locator(`#work-${index + 1}`).getByRole("link", { name: "Ver caso de estudio", exact: true });
    await expect(action).toHaveAttribute("href", destination);
    await action.focus();
    await expect(action).toBeFocused();
    await expect(action).toHaveCSS("outline-style", "solid");
    await page.getByRole("navigation", { name: /Proyectos seleccionados/ }).locator(`a[href="${destination}"]`).click();
    await expect(page).toHaveURL(destination);
    await expect(page.locator("h1")).toHaveText(titles[index]);
    await expect(page.locator("#decisions")).toContainText(/\S{10}/);
    expect(await hasHorizontalOverflow(page)).toBe(false);
  }
});

test("Distrito Gourmet videos load on demand, play in view and respond to the keyboard", { tag: ["@responsive"] }, async ({ page, request }) => {
  const errors = trackErrors(page);
  const mediaRequests: string[] = [];
  page.on("request", req => { if (req.resourceType() === "media") mediaRequests.push(req.url()); });
  await page.goto("/proyectos/distrito-gourmet");
  await page.waitForLoadState("networkidle");
  await expect(page.locator("main video")).toHaveCount(3);
  expect(mediaRequests).toEqual([]);

  for (const video of await page.locator("main video").all()) {
    await expect(video).toHaveAttribute("preload", "none");
    await expect(video).toHaveAttribute("controls", "");
    await expect(video).toHaveAttribute("playsinline", "");
    expect(await video.getAttribute("autoplay")).toBeNull();
    expect((await request.head((await video.getAttribute("poster"))!)).status()).toBe(200);
    const source = (await video.getAttribute("src"))!;
    const head = await request.head(source);
    expect(head.status()).toBe(200);
    expect(Number(head.headers()["content-length"])).toBeLessThan(20_000_000);
    const partial = await request.get(source, { headers: { Range: "bytes=0-1023" } });
    expect(partial.status()).toBe(206);
    expect(partial.headers()["content-type"]).toContain("video/mp4");
  }

  const first = page.locator("main video").first();
  const paused = () => first.evaluate(element => (element as HTMLVideoElement).paused);
  // Motion allowed: plays muted while in view, pauses when it leaves.
  await first.scrollIntoViewIfNeeded();
  await expect.poll(() => first.evaluate(element => (element as HTMLVideoElement).currentTime)).toBeGreaterThan(0);
  expect(await first.evaluate(element => (element as HTMLVideoElement).muted)).toBe(true);
  await page.locator("h1").scrollIntoViewIfNeeded();
  await expect.poll(paused).toBe(true);
  // Reduced motion: never autoplays; the native keyboard control still works.
  await page.emulateMedia({ reducedMotion: "reduce" });
  await first.scrollIntoViewIfNeeded();
  await expect.poll(paused).toBe(true);
  await first.focus();
  await page.keyboard.press("Space");
  await expect.poll(paused).toBe(false);
  await page.keyboard.press("Space");
  await expect.poll(paused).toBe(true);
  expect(await hasHorizontalOverflow(page)).toBe(false);
  expect(errors).toEqual([]);
});

// Regression: a late viewport notification used to call pause() and cancel a viewer-started play.
test("a viewer-started video is never paused by a late viewport notification under reduced motion", { tag: ["@smoke"] }, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/proyectos/distrito-gourmet");
  const video = page.locator("main video").first();
  await page.locator("h1").scrollIntoViewIfNeeded();
  await expect.poll(() => video.evaluate(element => (element as HTMLVideoElement).paused)).toBe(true);
  // Re-enter the viewport and press play in the same task, before the observer
  // has reported the intersection: this is the ordering a slow runner produces.
  const outcome = await video.evaluate(async element => {
    const media = element as HTMLVideoElement;
    media.scrollIntoView({ block: "center" });
    await media.play();
    await new Promise<void>(resolve => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
    await new Promise<void>(resolve => setTimeout(resolve, 250));
    return media.paused;
  });
  expect(outcome).toBe(false);
});
