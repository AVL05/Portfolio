import { expect, test } from "@playwright/test";
import { CASES, hasHorizontalOverflow, trackErrors } from "./helpers";

const FEATURED = [
  { title: "Distrito Gourmet", live: "https://distrito-gourmet.aleviclop.dev", code: "https://github.com/AVL05/distrito-gourmet" },
  { title: "LumaFlow Studio", live: null, code: "https://github.com/AVL05/lumaflow-studio" },
  { title: "raw.vives", live: "https://rawvives.aleviclop.dev", code: "https://github.com/AVL05/alexgallery" },
] as const;

const OTHER = [
  "https://github.com/AVL05/premium-frontend-director",
  "https://github.com/AVL05/echo-the-awakening",
  "https://github.com/avl05/API_Hotel",
  "https://github.com/AVL05/Dulces",
];

test("recruiter journey: every featured project is one click from the home and exposes its decisions", { tag: ["@smoke", "@responsive"] }, async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const [index, slug] of CASES.entries()) {
    await page.goto("/");
    const destination = `/proyectos/${slug}`;
    const card = page.locator("#projects .section-body > ul > li").nth(index);
    const title = card.getByRole("heading", { level: 3 }).getByRole("link");
    await expect(title).toHaveAttribute("href", destination);
    await title.focus();
    await expect(title).toBeFocused();
    await expect(title).toHaveCSS("outline-style", "solid");
    await title.click();
    await expect(page).toHaveURL(destination);
    await expect(page.locator("h1")).toHaveText(FEATURED[index].title);
    await expect(page.locator("#decisions")).toContainText(/\S{10}/);
    expect(await hasHorizontalOverflow(page)).toBe(false);
  }
});

test("project cards, other projects and skills expose real destinations and no unverified claims", { tag: ["@smoke", "@responsive"] }, async ({ page }) => {
  for (const path of ["/", "/en"]) {
    await page.goto(path);
    const cards = page.locator("#projects .section-body > ul > li");
    await expect(cards).toHaveCount(3);
    for (const [index, project] of FEATURED.entries()) {
      const card = cards.nth(index);
      await expect(card.locator("h3")).toContainText(project.title);
      const code = card.locator('a[href^="https://github.com/"]');
      await expect(code).toHaveAttribute("href", project.code);
      await expect(code).toHaveAttribute("target", "_blank");
      await expect(code).toHaveAttribute("rel", /noopener/);
      const live = card.locator('a[href^="https://"]:not([href^="https://github.com/"])');
      if (project.live) await expect(live).toHaveAttribute("href", project.live);
      else await expect(live).toHaveCount(0);
      const image = card.locator("img");
      await expect(image).toHaveAttribute("alt", /.{20,}/);
      await expect(image).toHaveAttribute("width", /\d+/);
      await expect(image).toHaveAttribute("height", /\d+/);
    }
    // Only verifiable figures: the LumaFlow test counts.
    await expect(cards.nth(1)).toContainText(/56/);
    await expect(cards.nth(1)).toContainText(/33/);

    const others = page.locator("#other ul > li h3 a");
    expect(await others.evaluateAll(links => links.map(link => link.getAttribute("href")))).toEqual(OTHER);

    await expect(page.locator("#skills ul > li")).toHaveCount(18);
    await expect(page.locator("#skills")).not.toContainText("TypeScript");
    await expect(page.locator("#skills ul > li svg").first()).toBeVisible();
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
