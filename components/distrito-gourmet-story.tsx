"use client";

import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { useLanguage } from "@/lib/language-context";
import content from "@/lib/locales/distrito-gourmet.json";
import { DISTRITO_URLS } from "@/lib/case-study-content";
import styles from "./project-case-study.module.css";
import { ProjectShowcase } from "./project-showcase";
import { Chapter } from "./project-case-study";

const videos: Record<string, { src: string; poster: string; duration: string }> = {
  design: { src: "Inicio.mp4", poster: "home-poster.webp", duration: "00:18" },
  customer: { src: "Experiencia usuario.mp4", poster: "customer-poster.webp", duration: "02:25" },
  backoffice: { src: "Administracion.mp4", poster: "admin-poster.webp", duration: "01:21" },
};

export function DistritoGourmetStory() {
  const { language } = useLanguage();
  const copy = content[language];

  return <>
    {copy.sections.map(section => {
      const video = videos[section.id];
      const [number, ...rest] = section.label.split(" / ");
      return <Chapter key={section.id} id={section.id} number={number} label={rest.join(" / ")} title={section.title}
        tone={section.id === "backoffice" ? "raised" : undefined}>
        {section.paragraphs.map(paragraph => <p key={paragraph} className={styles.prose}>{paragraph}</p>)}
        {video && section.video ? <div className={styles.videoFigure}>
          <ProjectShowcase image={`/projects/distrito_gourmet/${video.poster}`}
            alt={section.video.title} videoSrc={`/projects/distrito_gourmet/${video.src}`}
            viewTransitionName={`distrito-${section.id}`} autoPlayOnView
            caption={<>
              <div><h3 id={`${section.id}-video-title`}>{section.video.title}</h3><span>{video.duration}</span></div>
              <p id={`${section.id}-video-description`}>{section.video.description}</p>
              <p className={styles.videoHighlights}>{copy.highlights}: {section.video.highlights}</p>
            </>} />
        </div> : null}
        {section.items.length ? <div className={styles.chapterItems} data-count={section.items.length}>
          {section.items.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}
        </div> : null}
        {section.after?.map(paragraph => <p className={styles.prose} key={paragraph}>{paragraph}</p>)}
      </Chapter>;
    })}
    <Chapter number="09" label={language === "es" ? "Demo y código" : "Demo and code"} title={copy.explore}>
      <p className={styles.prose}>{copy.exploreBody}</p>
      <div className={styles.inlineActions}>
        <a className="action-primary" href={DISTRITO_URLS.demo} target="_blank" rel="noopener noreferrer">{copy.demo}<ArrowUpRight aria-hidden="true" /></a>
        <a className="action-secondary" href={DISTRITO_URLS.github} target="_blank" rel="noopener noreferrer"><FaGithub aria-hidden="true" />{copy.code}</a>
      </div>
    </Chapter>
  </>;
}
