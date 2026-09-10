import type { Vector3Tuple } from "three";

export type ModelPlacement = {
  file: string;
  position: Vector3Tuple;
  rotation: Vector3Tuple;
  scale: number;
  size: number;
  castShadow?: boolean;
};
// Position anchors each asset at its bottom center. Size normalizes its longest axis.
export const roomSceneConfig = {
  desk: { file: "desk", position: [0, 0, -1.05], rotation: [0, 0, 0], scale: 1, size: 2.8 },
  monitor: { file: "monitor", position: [-0.15, 1.13, -1.15], rotation: [0, 0, 0], scale: 1, size: 1.05 },
  pc: { file: "pc-tower", position: [1.02, 1.13, -1.06], rotation: [0, -Math.PI / 2, 0], scale: 1, size: 0.7 },
  chair: { file: "office-chair", position: [-0.1, 0.068, 0.35], rotation: [0, Math.PI, 0], scale: 1, size: 1.25 },
  camera: { file: "camera", position: [-0.95, 1.13, -0.78], rotation: [0, 0.3, 0], scale: 1, size: 0.32 },
  cameraLens: { file: "camera-lens", position: [-0.62, 1.13, -0.78], rotation: [0, 0, 0], scale: 1, size: 0.23 },
  shelf: { file: "shelf", position: [-0.2, 2.18, -1.78], rotation: [0, 0, 0], scale: 1, size: 1.85 },
  plant: { file: "potted-plant", position: [-1.92, 0, -1.1], rotation: [0, 0, 0], scale: 1, size: 1.35 },
  lamp: { file: "desk-lamp", position: [-1.13, 1.13, -1.3], rotation: [0, Math.PI, 0], scale: 1, size: 0.65 },
  rug: { file: "office-rug", position: [-0.1, 0.024, 0.58], rotation: [0, 0, 0], scale: 1, size: 1.95, castShadow: false },
  wallPanel: { file: "topographic-wall-panel", position: [-1.68, 1.65, -1.9], rotation: [0, 0, 0], scale: 1, size: 0.92 },
} satisfies Record<string, ModelPlacement>;

type PropPlacement = { position: Vector3Tuple; rotation: Vector3Tuple; scale: Vector3Tuple };
export const roomPropConfig = {
  keyboard: { position: [-0.15, 1.16, -0.68], rotation: [0, 0, 0], scale: [1, 1, 1], size: [0.62, 0.045, 0.22], color: "#1c1d1e" },
  mouse: { position: [0.34, 1.18, -0.65], rotation: [0, 0, 0], scale: [0.065, 0.025, 0.1], color: "#292a2b" },
} satisfies Record<string, PropPlacement & { color: string; size?: Vector3Tuple }>;

export const roomLightingConfig = {
  exposure: 1.12,
  ambient: 0.22,
  hemisphere: { sky: "#b8c4cf", ground: "#705039", intensity: 0.55 },
  sunset: { position: [4.8, 4.3, 0.7], color: "#ffd0a0", intensity: 3.6 },
  fill: { position: [-3.5, 3.2, 4], color: "#c0cede", intensity: 0.85 },
} satisfies {
  exposure: number; ambient: number;
  hemisphere: { sky: string; ground: string; intensity: number };
  sunset: { position: Vector3Tuple; color: string; intensity: number };
  fill: { position: Vector3Tuple; color: string; intensity: number };
};

// Lamp-local coordinates after normalization to unit height; follow its transform.
export const lampLightConfig = {
  position: [-0.225, 0.87, 0],
  target: [-0.5, 0.03, -0.6],
  emitterScale: [0.075, 0.012, 0.025],
  color: "#ffd0a0",
  intensity: 2.4,
  angle: 0.9,
  distance: 2.5,
} satisfies {
  position: Vector3Tuple; target: Vector3Tuple; emitterScale: Vector3Tuple;
  color: string; intensity: number; angle: number; distance: number;
};

export const roomCameraConfig = {
  position: [-6.4, 5.4, 7.3],
  target: [0, 1.35, -0.1],
  fov: 38,
  margin: 1.12,
  bounds: { min: [-2.6, -0.32, -2.1], max: [2.8, 3.22, 2.1] },
  minPolarAngle: 0.88, maxPolarAngle: 1.24,
  minAzimuthAngle: -0.92, maxAzimuthAngle: -0.43,
  focusMinDistance: 6.2,
} satisfies {
  position: Vector3Tuple; target: Vector3Tuple; fov: number; margin: number;
  bounds: { min: Vector3Tuple; max: Vector3Tuple };
  minPolarAngle: number; maxPolarAngle: number;
  minAzimuthAngle: number; maxAzimuthAngle: number; focusMinDistance: number;
};
export const roomHotspots = {
  monitor: { position: [-0.15, 1.7, -1.02], href: "/proyectos", label: { es: "Explorar proyectos", en: "Explore projects" } },
  camera: { position: [-0.95, 1.4, -0.72], href: "/fotografia", label: { es: "Fotografía · raw.vives", en: "Photography · raw.vives" } },
  pc: { position: [1.02, 1.7, -0.83], href: "/#about", label: { es: "Stack y desarrollo", en: "Stack and development" } },
  mountain: { position: [2.4, 1.9, 0], href: "/sobre-mi", label: { es: "Sobre mí y mi creatividad", en: "About me and my creativity" } },
} satisfies Record<string, { position: Vector3Tuple; href: string; label: { es: string; en: string } }>;

export type RoomHotspotId = keyof typeof roomHotspots;

// Monitor-local coordinates at unit model size, before its world transform.
export const monitorScreenConfig: {
  position: Vector3Tuple; rotation: Vector3Tuple; scale: Vector3Tuple;
  offset: number; width: number; aspect: number; texture: string | null;
  color: string; emissiveIntensity: number;
} = {
  position: [0, 0.48, 0.079], rotation: [0, 0, 0], scale: [1, 1, 1],
  offset: 0.004, width: 0.84, aspect: 16 / 9,
  texture: "/hero-3d/textures/monitor-portfolio.webp", color: "#111923", emissiveIntensity: 0.12,
};

export const roomInteractionConfig = {
  roomParallax: 0.0125, roomDamping: 7,
  lampVariation: 0.004, lampFrequency: 0.5,
  cameraDuration: 0.85, orbitDamping: 0.07, rotateSpeed: 0.38, zoomSpeed: 0.45,
  focusDuration: 380, focusEasing: "cubic-bezier(0.22, 1, 0.36, 1)",
  heroMinDistanceFactor: 0.9, maxDistanceFactor: 1.2, maxDistance: 16,
};
export const mountainTexture = "/hero-3d/textures/Meshy_AI_mountain-window-view.png";
export const roomPreviewConfig = { src: "/hero-3d/textures/studio-preview.webp" };

export const windowDepthConfig = {
  depth: 0.25,
  parallaxX: 0.01,
  parallaxY: 0.005,
  damping: 4,
};
