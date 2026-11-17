"use client";

import { useLanguage } from "@/lib/language-context";
import styles from "./content.module.css";

export function About() {
  const { t } = useLanguage();
  return (
    <div className={styles.bio}>
      {t.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
    </div>
  );
}
