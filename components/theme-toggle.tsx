"use client";

import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";
import { useLanguage } from "@/lib/language-context";
import { THEME_COLORS, THEME_STORAGE_KEY, type Theme } from "@/lib/theme";

const listeners = new Set<() => void>();

function readTheme(): Theme {
  return document.documentElement.getAttribute("data-theme") === "light" ? "light" : "dark";
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => { listeners.delete(listener); };
}

export function toggleTheme() {
  applyTheme(readTheme() === "dark" ? "light" : "dark");
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  // A short colour cross-fade, skipped for reduced motion. The class is
  // removed after the transition so it never taxes normal interaction.
  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    root.classList.add("theme-transition");
    window.setTimeout(() => root.classList.remove("theme-transition"), 320);
  }
  root.setAttribute("data-theme", theme);
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", THEME_COLORS[theme]);
  try { localStorage.setItem(THEME_STORAGE_KEY, theme); } catch { /* private mode: the choice just will not persist */ }
  listeners.forEach((listener) => listener());
}

/** Light/dark switch. The server renders dark; the stored choice is applied by the head script. */
export function ThemeToggle({ className }: { className?: string }) {
  const { language } = useLanguage();
  const theme = useSyncExternalStore(subscribe, readTheme, () => "dark" as Theme);
  const next: Theme = theme === "dark" ? "light" : "dark";
  const label = language === "es"
    ? next === "light" ? "Cambiar a tema claro" : "Cambiar a tema oscuro"
    : next === "light" ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button type="button" onClick={() => applyTheme(next)} aria-label={label} title={label} className={className}>
      {theme === "dark" ? <Sun aria-hidden="true" size={18} /> : <Moon aria-hidden="true" size={18} />}
    </button>
  );
}
