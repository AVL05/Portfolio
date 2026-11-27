"use client";

import { CornerDownLeft, Download, ExternalLink, Hash, Languages, Mail, Palette, Search } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useId, useMemo, useRef, useState, type ComponentType, type KeyboardEvent } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa6";
import { toggleTheme } from "@/components/theme-toggle";
import { getAlternatePath, type Locale } from "@/lib/i18n-paths";
import { useLanguage } from "@/lib/language-context";
import { FEATURED_PROJECTS, OTHER_PROJECTS } from "@/lib/projects";
import { CV_HREF, GITHUB_URL, HOME_SECTION_IDS, LINKEDIN_URL, SITE_EMAIL } from "@/lib/site";
import styles from "./command-palette.module.css";

export const OPEN_PALETTE_EVENT = "command-palette:open";

type Icon = ComponentType<{ "aria-hidden"?: boolean | "true"; className?: string }>;

interface Command {
  id: string;
  group: string;
  label: string;
  hint?: string;
  keywords?: string;
  icon: Icon;
  run: () => void;
}

const normalize = (value: string) => value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

function openExternal(url: string) {
  window.open(url, "_blank", "noopener,noreferrer");
}

/**
 * Command palette (Ctrl+K / Cmd+K). A native modal dialog holds a combobox
 * (input) controlling a listbox, so focus trapping, Escape and the inert page
 * come from the platform; arrow keys move the active option and Enter runs it.
 */
export function CommandPalette({ triggerClassName }: { triggerClassName: string }) {
  const { language, t } = useLanguage();
  const router = useRouter();
  const pathname = usePathname();
  const es = language === "es";
  const uid = useId();
  const listId = `${uid}-list`;
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [active, setActive] = useState(0);

  const commands = useMemo<Command[]>(() => {
    const groups = es
      ? { go: "Ir a", projects: "Proyectos", links: "Enlaces", prefs: "Preferencias" }
      : { go: "Go to", projects: "Projects", links: "Links", prefs: "Preferences" };
    const goTo = (id: string) => () => {
      const section = document.getElementById(id);
      const disclosure = section?.closest("details");
      if (disclosure) disclosure.open = true;
      if (window.location.hash === `#${id}`) section?.scrollIntoView();
      else window.location.hash = id;
    };
    const target: Locale = es ? "en" : "es";
    const projects = [
      ...FEATURED_PROJECTS,
      ...OTHER_PROJECTS.flatMap((project) => {
        const copy = t.projects.other.find(({ slug }) => slug === project.slug);
        return copy ? [{ ...project, title: copy.title }] : [];
      }),
    ];
    const list: Command[] = [
      { id: "go-hero", group: groups.go, label: es ? "Inicio" : "Home", hint: "#hero", icon: Hash, run: goTo("hero") },
      ...HOME_SECTION_IDS.map((id) => ({ id: `go-${id}`, group: groups.go, label: t.sections[id], hint: `#${id}`, icon: Hash, run: goTo(id) })),
      { id: "go-other", group: groups.go, label: t.projects.otherLabel, hint: "#other", icon: Hash, run: goTo("other") },
      ...projects.flatMap(({ slug, title, live }) => live ? [{
        id: `live-${slug}`,
        group: groups.projects,
        label: `${es ? "Abrir" : "Open"} ${title} (${t.projects.live})`,
        hint: new URL(live).host,
        icon: ExternalLink,
        run: () => openExternal(live),
      }] : []),
      ...projects.flatMap(({ slug, title, tech, code }) => code ? [{
        id: `code-${slug}`,
        group: groups.projects,
        label: `${title} · ${t.projects.code}`,
        keywords: tech.join(" "),
        icon: FaGithub,
        run: () => openExternal(code),
      }] : []),
      { id: "link-github", group: groups.links, label: "GitHub", hint: "AVL05", icon: FaGithub, run: () => openExternal(GITHUB_URL) },
      { id: "link-linkedin", group: groups.links, label: "LinkedIn", hint: "aleviclop", icon: FaLinkedin, run: () => openExternal(LINKEDIN_URL) },
      { id: "link-email", group: groups.links, label: es ? "Escribir un email" : "Send an email", hint: SITE_EMAIL, keywords: "mail correo contacto contact", icon: Mail, run: () => { window.location.href = `mailto:${SITE_EMAIL}`; } },
      {
        id: "link-cv",
        group: groups.links,
        label: es ? "Descargar CV" : "Download CV",
        hint: "PDF",
        keywords: "curriculum resume",
        icon: Download,
        run: () => {
          const link = document.createElement("a");
          link.href = CV_HREF;
          link.download = "";
          link.click();
        },
      },
      { id: "pref-theme", group: groups.prefs, label: es ? "Cambiar tema (claro/oscuro)" : "Toggle theme (light/dark)", keywords: "theme dark light claro oscuro", icon: Palette, run: toggleTheme },
      {
        id: "pref-language",
        group: groups.prefs,
        label: es ? "Cambiar a inglés" : "Switch to Spanish",
        hint: target.toUpperCase(),
        keywords: "language idioma english spanish español",
        icon: Languages,
        run: () => router.push(getAlternatePath(pathname, target) ?? (target === "en" ? "/en" : "/")),
      },
    ];
    return list;
  }, [es, language, pathname, router, t]);

  const results = useMemo(() => {
    const tokens = normalize(query).split(/\s+/).filter(Boolean);
    if (!tokens.length) return commands;
    return commands.filter((command) => {
      const haystack = normalize(`${command.label} ${command.group} ${command.keywords ?? ""} ${command.hint ?? ""}`);
      return tokens.every((token) => haystack.includes(token));
    });
  }, [commands, query]);

  const current = results.length ? Math.min(active, results.length - 1) : -1;
  const optionId = (command: Command) => `${uid}-option-${command.id}`;

  const show = () => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setQuery("");
    setActive(0);
    dialog.showModal();
    setOpen(true);
  };
  const close = () => dialogRef.current?.close();

  useEffect(() => {
    const onKey = (event: globalThis.KeyboardEvent) => {
      if (event.key.toLowerCase() !== "k" || !(event.metaKey || event.ctrlKey) || event.altKey || event.shiftKey) return;
      event.preventDefault();
      if (dialogRef.current?.open) dialogRef.current.close();
      else show();
    };
    const onOpen = () => show();
    window.addEventListener("keydown", onKey);
    window.addEventListener(OPEN_PALETTE_EVENT, onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(OPEN_PALETTE_EVENT, onOpen);
    };
  }, []);

  useEffect(() => {
    if (open && current >= 0) document.getElementById(optionId(results[current]))?.scrollIntoView({ block: "nearest" });
  }, [current, open, results]);

  const run = (command: Command) => {
    close();
    command.run();
  };

  const onInputKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (!results.length) return;
    const last = results.length - 1;
    if (event.key === "ArrowDown") setActive(current >= last ? 0 : current + 1);
    else if (event.key === "ArrowUp") setActive(current <= 0 ? last : current - 1);
    else if (event.key === "Home") setActive(0);
    else if (event.key === "End") setActive(last);
    else if (event.key === "Enter") run(results[current]);
    else return;
    event.preventDefault();
  };

  const grouped: Array<{ group: string; items: Command[] }> = [];
  for (const command of results) {
    const bucket = grouped.find((entry) => entry.group === command.group);
    if (bucket) bucket.items.push(command);
    else grouped.push({ group: command.group, items: [command] });
  }

  const title = es ? "Paleta de comandos" : "Command palette";

  return (
    <>
      <button
        type="button"
        className={triggerClassName}
        onClick={show}
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-keyshortcuts="Control+K Meta+K"
        aria-label={`${title} (Ctrl+K)`}
        title={`${title} (Ctrl+K / ⌘K)`}
      >
        <Search aria-hidden="true" size={18} />
      </button>
      <dialog
        ref={dialogRef}
        className={styles.dialog}
        aria-label={title}
        onClose={() => {
          setOpen(false);
          const target = returnFocusRef.current;
          if (target && target.isConnected) target.focus({ preventScroll: true });
        }}
        onClick={(event) => { if (event.target === event.currentTarget) close(); }}
      >
        <div className={styles.search}>
          <Search aria-hidden="true" size={18} />
          <label htmlFor={`${uid}-input`} className="sr-only">{es ? "Buscar un comando" : "Search commands"}</label>
          <input
            ref={inputRef}
            id={`${uid}-input`}
            className={styles.input}
            type="text"
            role="combobox"
            aria-expanded="true"
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={current >= 0 ? optionId(results[current]) : undefined}
            autoComplete="off"
            autoCorrect="off"
            spellCheck={false}
            placeholder={es ? "Buscar secciones, proyectos…" : "Search sections, projects…"}
            value={query}
            onChange={(event) => { setQuery(event.target.value); setActive(0); }}
            onKeyDown={onInputKeyDown}
          />
          <kbd className={styles.kbd}>esc</kbd>
        </div>
        <div id={listId} role="listbox" aria-label={title} className={styles.list}>
          {grouped.map(({ group, items }, groupIndex) => (
            <div key={group} role="group" aria-labelledby={`${uid}-group-${groupIndex}`}>
              <div id={`${uid}-group-${groupIndex}`} className={styles.group}>{group}</div>
              {items.map((command) => {
                const Icon = command.icon;
                const isActive = results[current]?.id === command.id;
                return (
                  <div
                    key={command.id}
                    id={optionId(command)}
                    role="option"
                    aria-selected={isActive}
                    data-active={isActive || undefined}
                    className={styles.option}
                    onMouseMove={() => { if (!isActive) setActive(results.indexOf(command)); }}
                    onClick={() => run(command)}
                  >
                    <Icon aria-hidden="true" className={styles.icon} />
                    <span className={styles.label}>{command.label}</span>
                    {command.hint ? <span className={styles.hint}>{command.hint}</span> : null}
                    <CornerDownLeft aria-hidden="true" className={styles.enter} />
                  </div>
                );
              })}
            </div>
          ))}
        </div>
        <p role="status" className={results.length ? "sr-only" : styles.empty}>
          {results.length
            ? es ? `${results.length} resultados` : `${results.length} results`
            : es ? "Sin resultados" : "No results"}
        </p>
        <p className={styles.footer} aria-hidden="true">
          <span><kbd>↑</kbd><kbd>↓</kbd> {es ? "navegar" : "navigate"}</span>
          <span><kbd>↵</kbd> {es ? "abrir" : "open"}</span>
          <span><kbd>Ctrl</kbd>/<kbd>⌘</kbd><kbd>K</kbd></span>
        </p>
      </dialog>
    </>
  );
}
