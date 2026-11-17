"use client";

import { useLanguage } from "@/lib/language-context";
import styles from "./content.module.css";

export function About() {
  const { t } = useLanguage();
  return (
    <ul className={styles.bullets}>
      {t.about.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
    </ul>
  );
}
