"use client";

import { useGLTF } from "@react-three/drei/core/Gltf";
import { useMemo } from "react";
import { Box3, Group, Mesh, Vector3 } from "three";
import type { ModelPlacement } from "../roomSceneConfig";

export function RoomModel({ placement }: { placement: ModelPlacement }) {
  const { scene } = useGLTF(`/hero-3d/optimized/${placement.file}.glb`, false, true);
  const model = useMemo(() => {
    const copy = scene.clone(true);
    copy.rotation.set(...placement.rotation);
    copy.updateMatrixWorld(true);
    const bounds = new Box3().setFromObject(copy);
    const center = bounds.getCenter(new Vector3());
    const size = bounds.getSize(new Vector3());
    const factor = placement.size / Math.max(size.x, size.y, size.z);
    const normalized = new Group();
    copy.position.set(-center.x, -bounds.min.y, -center.z);
    copy.traverse((node) => {
      if (node instanceof Mesh) {
        node.castShadow = placement.castShadow ?? true;
        node.receiveShadow = true;
      }
    });
    normalized.add(copy);
    return { object: normalized, factor };
  }, [scene, placement]);
  return <primitive object={model.object} position={placement.position} scale={model.factor * placement.scale} dispose={null} />;
}
