"use client";

import { useLanguage, type TimelineItem } from "@/lib/language-context";
import styles from "./content.module.css";

/** Heading line is the employer for work and the title for education. */
function Timeline({ items, kind }: { items: TimelineItem[]; kind: "work" | "study" }) {
  return (
    <ol className={styles.timeline}>
      {items.map((item) => {
        const heading = kind === "work" ? item.company : item.title;
        const detail = kind === "work" ? item.title : item.institution;
        return (
          <li key={`${heading}-${item.period}`}>
            <div className={styles.head}>
              <h3>{heading}</h3>
              <p className={styles.period}>{item.period}</p>
            </div>
            <p className={styles.sub}>{detail} <span aria-hidden="true">·</span> <span>{item.location}</span></p>
            {item.highlights?.length ? (
              <ul className={styles.points}>
                {item.highlights.map((point) => <li key={point}>{point}</li>)}
              </ul>
            ) : null}
          </li>
        );
      })}
    </ol>
  );
}

export function Experience() {
  const { t } = useLanguage();
  return <Timeline items={t.experience.experience_list} kind="work" />;
}

export function Education() {
  const { t } = useLanguage();
  return (
    <>
      <Timeline items={t.experience.education_list} kind="study" />
      <div className={styles.languages}>
        <h3>{t.languages.title}</h3>
        <ul>
          {t.languages.items.map((item) => <li key={item.name}>{item.name}<span>{item.level}</span></li>)}
        </ul>
      </div>
    </>
  );
}
