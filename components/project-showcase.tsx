import Image from "next/image";
import styles from "./project-showcase.module.css";

interface ProjectShowcaseProps {
  image: string;
  alt: string;
  caption: string;
  viewTransitionName: string;
  videoSrc?: string;
}

export function ProjectShowcase({ image, alt, caption, viewTransitionName, videoSrc }: ProjectShowcaseProps) {
  return (
    <figure className={styles.showcase} data-project-showcase>
      <div className={styles.laptop}>
        <div className={styles.screen} style={{ viewTransitionName }}>
          {videoSrc ? (
            <video src={videoSrc} poster={image} controls playsInline preload="none" aria-label={alt}>
              <a href={videoSrc}>{caption}</a>
            </video>
          ) : (
            <Image src={image} alt={alt} fill priority sizes="(max-width: 768px) 88vw, (max-width: 1440px) 82vw, 1180px" />
          )}
        </div>
      </div>
      <div className={styles.base} aria-hidden="true" />
      <figcaption>{caption}</figcaption>
    </figure>
  );
}
