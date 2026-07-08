"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  Home,
  FolderGit2,
  Layers,
  Briefcase,
  Camera,
  Mail,
  Languages,
  FileText,
  ExternalLink,
  Search,
  CornerDownLeft,
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { useLanguage } from "@/lib/language-context";

export const OPEN_PALETTE_EVENT = "open-command-palette";

interface PaletteItem {
  id: string;
  label: string;
  hint?: string;
  group: "nav" | "actions";
  icon: React.ComponentType<{ className?: string }>;
  action: () => void;
}

export function CommandPalette() {
  const { t, language, setLanguage } = useLanguage();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQuery("");
    setSelected(0);
  }, []);

  const goTo = useCallback(
    (hash: string) => {
      close();
      // Espera al cierre del overlay para que el scroll no se bloquee.
      requestAnimationFrame(() => {
        document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
      });
    },
    [close],
  );

  const items = useMemo<PaletteItem[]>(
    () => [
      {
        id: "home",
        label: t.nav.home,
        group: "nav",
        icon: Home,
        action: () => goTo("#hero"),
      },
      {
        id: "projects",
        label: t.nav.projects,
        group: "nav",
        icon: FolderGit2,
        action: () => goTo("#projects"),
      },
      {
        id: "skills",
        label: t.nav.skills,
        group: "nav",
        icon: Layers,
        action: () => goTo("#skills"),
      },
      {
        id: "experience",
        label: t.nav.experience,
        group: "nav",
        icon: Briefcase,
        action: () => goTo("#experience"),
      },
      {
        id: "photography",
        label: t.photography.title,
        group: "nav",
        icon: Camera,
        action: () => goTo("#photography"),
      },
      {
        id: "contact",
        label: t.nav.contact,
        group: "nav",
        icon: Mail,
        action: () => goTo("#contact"),
      },
      {
        id: "lang",
        label: t.palette.action_lang,
        group: "actions",
        icon: Languages,
        action: () => {
          setLanguage(language === "es" ? "en" : "es");
          close();
        },
      },
      {
        id: "cv",
        label: t.palette.action_cv,
        hint: "PDF",
        group: "actions",
        icon: FileText,
        action: () => {
          const a = document.createElement("a");
          a.href = "/CV_Alex_Vicente_Lopez_Desarrollador_Web_Junior.pdf";
          a.download = "";
          a.click();
          close();
        },
      },
      {
        id: "github",
        label: "GitHub",
        hint: "AVL05",
        group: "actions",
        icon: FaGithub,
        action: () => {
          window.open(
            "https://github.com/AVL05",
            "_blank",
            "noopener,noreferrer",
          );
          close();
        },
      },
      {
        id: "linkedin",
        label: "LinkedIn",
        hint: "alex-vicente-lopez",
        group: "actions",
        icon: FaLinkedin,
        action: () => {
          window.open(
            "https://www.linkedin.com/in/alex-vicente-lopez/",
            "_blank",
            "noopener,noreferrer",
          );
          close();
        },
      },
      {
        id: "gallery",
        label: t.palette.action_gallery,
        hint: "gallery.aleviclop.dev",
        group: "actions",
        icon: ExternalLink,
        action: () => {
          window.open(
            "https://gallery.aleviclop.dev/",
            "_blank",
            "noopener,noreferrer",
          );
          close();
        },
      },
      {
        id: "email",
        label: t.palette.action_email,
        hint: "alexviclop@gmail.com",
        group: "actions",
        icon: Mail,
        action: () => {
          window.location.href = "mailto:alexviclop@gmail.com";
          close();
        },
      },
    ],
    [t, language, setLanguage, goTo, close],
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        (item.hint ?? "").toLowerCase().includes(q),
    );
  }, [items, query]);

  /* Atajo global Ctrl/⌘ + K y evento custom desde la nav */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") close();
    };
    const onOpenEvent = () => setOpen(true);
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpenEvent);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpenEvent);
    };
  }, [close]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => setSelected(0), [query]);

  useEffect(() => {
    listRef.current
      ?.querySelector(`[data-index="${selected}"]`)
      ?.scrollIntoView({ block: "nearest" });
  }, [selected]);

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelected((s) => Math.min(s + 1, filtered.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelected((s) => Math.max(s - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      filtered[selected]?.action();
    }
  };

  if (!open) return null;

  const groups: { key: "nav" | "actions"; label: string }[] = [
    { key: "nav", label: t.palette.nav_group },
    { key: "actions", label: t.palette.actions_group },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={t.palette.placeholder}
      className="fixed inset-0 z-[110] flex items-start justify-center px-4 pt-[16vh]"
    >
      <button
        aria-hidden="true"
        tabIndex={-1}
        onClick={close}
        className="absolute inset-0 cursor-default bg-background/70 backdrop-blur-md"
      />

      <div className="glass relative w-full max-w-xl overflow-hidden rounded-2xl motion-safe:animate-in motion-safe:fade-in motion-safe:zoom-in-95 motion-safe:duration-200">
        {/* Input */}
        <div className="flex items-center gap-3 border-b border-border/60 px-4 py-3.5">
          <Search className="h-4 w-4 shrink-0 text-primary/70" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onInputKeyDown}
            placeholder={t.palette.placeholder}
            className="w-full bg-transparent font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground/40"
            spellCheck={false}
            autoComplete="off"
          />
          <kbd className="hidden shrink-0 rounded-md border border-border/60 bg-secondary/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground/60 sm:block">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-[46vh] overflow-y-auto p-2">
          {filtered.length === 0 && (
            <p className="px-3 py-8 text-center font-mono text-xs text-muted-foreground/50">
              {t.palette.empty}
            </p>
          )}

          {groups.map((group) => {
            const groupItems = filtered.filter((i) => i.group === group.key);
            if (!groupItems.length) return null;
            return (
              <div key={group.key} className="mb-1">
                <p className="px-3 pb-1.5 pt-2.5 font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-muted-foreground/40">
                  {group.label}
                </p>
                {groupItems.map((item) => {
                  const index = filtered.indexOf(item);
                  const isSelected = index === selected;
                  return (
                    <button
                      key={item.id}
                      data-index={index}
                      onClick={() => item.action()}
                      onMouseMove={() => setSelected(index)}
                      className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition-colors duration-150 ${
                        isSelected
                          ? "bg-primary/12 text-foreground"
                          : "text-muted-foreground"
                      }`}
                    >
                      <item.icon
                        className={`h-4 w-4 shrink-0 ${isSelected ? "text-primary" : "text-muted-foreground/60"}`}
                      />
                      <span className="flex-1 truncate text-sm font-medium">
                        {item.label}
                      </span>
                      {item.hint && (
                        <span className="hidden truncate font-mono text-[10px] text-muted-foreground/40 sm:block">
                          {item.hint}
                        </span>
                      )}
                      {isSelected && (
                        <CornerDownLeft className="h-3.5 w-3.5 shrink-0 text-primary/60" />
                      )}
                    </button>
                  );
                })}
              </div>
            );
          })}
        </div>

        {/* Footer hints */}
        <div className="flex items-center gap-4 border-t border-border/60 bg-secondary/30 px-4 py-2.5">
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/50">
            <kbd className="rounded border border-border/60 bg-secondary/60 px-1 py-px">
              ↑↓
            </kbd>
            {t.palette.footer_nav}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/50">
            <kbd className="rounded border border-border/60 bg-secondary/60 px-1 py-px">
              ↵
            </kbd>
            {t.palette.footer_select}
          </span>
          <span className="flex items-center gap-1.5 font-mono text-[10px] text-muted-foreground/50">
            <kbd className="rounded border border-border/60 bg-secondary/60 px-1 py-px">
              esc
            </kbd>
            {t.palette.footer_close}
          </span>
        </div>
      </div>
    </div>
  );
}
