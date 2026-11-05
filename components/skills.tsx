"use client";

import { useRef } from "react";
import { deferToViewport, gsap, motion, revealTrigger, useGSAP } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import styles from "./profile.module.css";

export function Skills() {
  const { language, t } = useLanguage();
  const containerRef = useRef<HTMLElement>(null);
  const groups = t.skills.groups;

  useGSAP(
    (_, contextSafe) => deferToViewport(containerRef.current, contextSafe!(() => {
      const rows = gsap.utils.selector(containerRef)(".capability-row");
      const media = gsap.matchMedia();
      media.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.from(rows, {
          y: motion.distance.content,
          duration: motion.duration.enter,
          stagger: motion.stagger.content,
          ease: motion.ease.out,
          scrollTrigger: revealTrigger(containerRef.current),
        });
        // Staggered children may restore a neutral matrix during media reversion.
        return () => gsap.set(rows, { clearProps: "transform" });
      });
      return () => media.revert();
    })),
    { scope: containerRef },
  );

  return (
    <section id="about" ref={containerRef} aria-labelledby="capabilities-title" className={`surface-paper ${styles.chapter} ${styles.capabilities}`}>
      <div className={styles.frame}>
        <header className={styles.aside}>
          <h2 id="capabilities-title">
            {language === "es" ? <>De principio <span className="accent-serif">a fin.</span></> : <>From start <span className="accent-serif">to finish.</span></>}
          </h2>
          <p>{t.skills.desc}</p>
        </header>

        <ol className={`capability-grid ${styles.capabilityList}`}>
          {groups.map((group, index) => (
            <li key={group.area} className={`capability-row ${styles.capabilityRow}`} data-primary={index === 0 || undefined}>
              <span aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              <h3>{group.area}</h3>
              <p>{group.stack.join(" · ")}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
