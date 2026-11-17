import { Network } from "lucide-react";
import type { ComponentType } from "react";
import {
  SiBitbucket,
  SiCloudflare,
  SiCss,
  SiDocker,
  SiElectron,
  SiGit,
  SiGithub,
  SiGreensock,
  SiHtml5,
  SiJavascript,
  SiLaravel,
  SiMysql,
  SiNextdotjs,
  SiPhp,
  SiReact,
  SiTailwindcss,
  SiVercel,
  SiVite,
  SiVuedotjs,
} from "react-icons/si";
import styles from "./tech-chip.module.css";

type Icon = ComponentType<{ "aria-hidden"?: boolean | "true"; className?: string }>;

// Icons are single-colour (currentColor) so the page keeps one accent.
const ICONS: Record<string, Icon> = {
  React: SiReact,
  "React 19": SiReact,
  "Next.js": SiNextdotjs,
  JavaScript: SiJavascript,
  HTML: SiHtml5,
  CSS: SiCss,
  "Tailwind CSS": SiTailwindcss,
  GSAP: SiGreensock,
  PHP: SiPhp,
  Laravel: SiLaravel,
  Sanctum: SiLaravel,
  MySQL: SiMysql,
  "APIs REST": Network as Icon,
  Git: SiGit,
  GitHub: SiGithub,
  Bitbucket: SiBitbucket,
  Docker: SiDocker,
  Electron: SiElectron,
  Vercel: SiVercel,
  Cloudflare: SiCloudflare,
  Vue: SiVuedotjs,
  Vite: SiVite,
};

const LABELS_EN: Record<string, string> = { "APIs REST": "REST APIs" };

export function TechChip({ name, locale = "es" }: { name: string; locale?: "es" | "en" }) {
  const Icon = ICONS[name];
  const label = locale === "en" ? LABELS_EN[name] ?? name : name;
  return (
    <li className={styles.chip}>
      {Icon ? <Icon aria-hidden="true" className={styles.icon} /> : null}
      {label}
    </li>
  );
}

export function TechList({ items, locale, label }: { items: readonly string[]; locale: "es" | "en"; label?: string }) {
  return (
    <ul className={styles.list} aria-label={label}>
      {items.map((name) => <TechChip key={name} name={name} locale={locale} />)}
    </ul>
  );
}
