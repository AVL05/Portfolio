"use client";

import { Html } from "@react-three/drei/web/Html";
import { roomHotspots, type RoomHotspotId } from "./roomSceneConfig";
import styles from "./creative-room.module.css";

export function RoomHotspots({ language, onNavigate, activeHotspot }: { language: "es" | "en"; onNavigate: (href: string) => void; activeHotspot: RoomHotspotId }) {
  return <group>
    {Object.entries(roomHotspots).map(([key, hotspot]) => <Html key={key} position={hotspot.position} center zIndexRange={[20, 10]}>
      <a href={hotspot.href} className={styles.hotspot} aria-label={hotspot.label[language]} data-current={key === activeHotspot || undefined}
        onPointerDown={event => event.stopPropagation()}
        onClick={event => {
          if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
          event.preventDefault();
          onNavigate(hotspot.href);
        }}>
        <span className={styles.hotspotMarker} aria-hidden="true" />
        <span className={styles.hotspotLabel} aria-hidden="true">{hotspot.label[language]}</span>
      </a>
    </Html>)}
  </group>;
}
