"use client";

import { useLanguage } from "@/lib/language-context";
import content from "@/lib/locales/distrito-gourmet.json";
import { DISTRITO_URLS } from "@/lib/case-study-content";
import styles from "./project-case-study.module.css";
import { ProjectShowcase } from "./project-showcase";

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
      const description = <div className={styles.chapterCopy}>
        <p className="section-kicker">{section.label}</p>
        <h2>{section.title}</h2>
        {section.paragraphs.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
      </div>;
      const items = section.items.length ? <div className={styles.chapterItems}>
        {section.items.map(item => <article key={item.title}><h3>{item.title}</h3><p>{item.body}</p></article>)}
      </div> : null;

      return <section key={section.id} id={section.id} className={styles.chapter} data-composition={section.id}>
        <div>
          <div className={section.id === "design" ? styles.splitChapter : styles.chapterBody}>
            {description}
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
          </div>
          {items}
          {section.after?.map(paragraph => <p className={styles.afterParagraph} key={paragraph}>{paragraph}</p>)}
        </div>
      </section>;
    })}
    <section className={styles.chapter}>
      <div className={styles.chapterCopy}>
        <h2>{copy.explore}</h2><p>{copy.exploreBody}</p>
        <div className={styles.exploreLinks}>
          <a className="cinema-link" href={DISTRITO_URLS.demo} target="_blank" rel="noopener noreferrer">{copy.demo} ↗</a>
          <a className="cinema-link" href={DISTRITO_URLS.github} target="_blank" rel="noopener noreferrer">{copy.code} ↗</a>
        </div>
      </div>
    </section>
  </>;
}
