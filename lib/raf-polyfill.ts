if (typeof window !== 'undefined') {
  const isBrave = (navigator as any).brave?.isBrave?.() ?? false;

  if (isBrave || !window.requestAnimationFrame) {
    let lastTime = 0;
    const vendors = ['ms', 'moz', 'webkit', 'o'];

    for (let x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
      window.requestAnimationFrame = (window as any)[`${vendors[x]}RequestAnimationFrame`];
      window.cancelAnimationFrame =
        (window as any)[`${vendors[x]}CancelAnimationFrame`] ||
        (window as any)[`${vendors[x]}CancelRequestAnimationFrame`];
    }

    if (!window.requestAnimationFrame) {
      window.requestAnimationFrame = (callback: FrameRequestCallback): number => {
        const currentTime = performance.now();
        const timeToCall = Math.max(0, 16 - (currentTime - lastTime));
        const id = window.setTimeout(() => {
          callback(currentTime + timeToCall);
        }, timeToCall);
        lastTime = currentTime + timeToCall;
        return id;
      };
    }

    if (!window.cancelAnimationFrame) {
      window.cancelAnimationFrame = (id: number) => {
        clearTimeout(id);
      };
    }
  }

  // Ensure performance API exists (sometimes blocked by Brave shields)
  if (!window.performance?.now) {
    const performanceStart = Date.now();
    window.performance = window.performance || ({} as Performance);
    (window.performance as any).now = () => Date.now() - performanceStart;
  }
}

export {};
