"use client";

import { Html } from "@react-three/drei/web/Html";
import { roomHotspots, type RoomHotspotId } from "./roomSceneConfig";
import { localizeHref } from "@/lib/i18n-paths";
import styles from "./creative-room.module.css";

export function RoomHotspots({ language, onNavigate, activeHotspot }: { language: "es" | "en"; onNavigate: (href: string) => void; activeHotspot: RoomHotspotId }) {
  return <group>
    {Object.entries(roomHotspots).map(([key, hotspot]) => { const href = localizeHref(hotspot.href, language); return <Html key={key} position={hotspot.position} center zIndexRange={[20, 10]}>
      <a href={href} className={styles.hotspot} aria-label={hotspot.label[language]} data-current={key === activeHotspot || undefined}
        onPointerDown={event => event.stopPropagation()}
        onClick={event => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          onNavigate(href);
        }}>
        <span className={styles.hotspotMarker} aria-hidden="true" />
        <span className={styles.hotspotLabel} aria-hidden="true">{hotspot.label[language]}</span>
      </a>
    </Html>; })}
  </group>;
}
