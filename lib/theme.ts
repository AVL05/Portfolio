/**
 * Theme contract: dark by default, light on explicit choice.
 * The choice is stored per browser and applied before first paint by a tiny
 * inline script, so there is no flash. Without JS the page stays dark.
 */
export type Theme = "dark" | "light";

export const THEME_STORAGE_KEY = "theme";
export const THEME_COLORS: Record<Theme, string> = { dark: "#0f0e0d", light: "#f6f3ee" };

export const themeInitScript = `(function(){try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark"){document.documentElement.setAttribute("data-theme",t);var m=document.querySelector('meta[name="theme-color"]');if(m)m.setAttribute("content",t==="light"?"${THEME_COLORS.light}":"${THEME_COLORS.dark}");}}catch(e){}})();`;
