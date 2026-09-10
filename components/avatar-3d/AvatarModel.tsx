"use client";

import { useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import { Bone, Box3, MathUtils, PerspectiveCamera, Quaternion, Vector3 } from "three";
import { clone } from "three/examples/jsm/utils/SkeletonUtils.js";

export default function AvatarModel({ reducedMotion }: { reducedMotion: boolean }) {
  const { scene } = useGLTF("/hero-3d/avatar.glb", false, false);
  const camera = useThree((state) => state.camera);
  const size = useThree((state) => state.size);
  const invalidate = useThree((state) => state.invalidate);
  const elapsed = useRef(0);
  const model = useMemo(() => {
    // Clone the skeleton, keeping cached geometry, textures and materials intact.
    const object = clone(scene);
    object.updateMatrixWorld(true);
    const bounds = new Box3().setFromObject(object, true);
    const center = bounds.getCenter(new Vector3());
    const dimensions = bounds.getSize(new Vector3());
    const bones = ["Spine", "neck", "Head"].map((name) => {
      const bone = object.getObjectByName(name);
      if (!(bone instanceof Bone)) throw new Error(`Missing avatar bone: ${name}`);
      const inverseWorld = bone.getWorldQuaternion(new Quaternion()).invert();
      return {
        bone,
        rest: bone.quaternion.clone(),
        pitchAxis: new Vector3(1, 0, 0).applyQuaternion(inverseWorld),
        yawAxis: new Vector3(0, 1, 0).applyQuaternion(inverseWorld),
        rollAxis: new Vector3(0, 0, 1).applyQuaternion(inverseWorld),
      };
    });
    return { object, center, dimensions, bones, target: new Quaternion(), offset: new Quaternion() };
  }, [scene]);

  useEffect(() => {
    if (!(camera instanceof PerspectiveCamera)) return;
    const halfFov = MathUtils.degToRad(camera.fov / 2);
    const distance = Math.max(
      model.dimensions.y / (2 * Math.tan(halfFov)),
      model.dimensions.x / (2 * Math.tan(halfFov) * (size.width / size.height)),
    ) * 1.18 + model.dimensions.z / 2;
    camera.position.set(0, 0, distance);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, size.width, size.height, model, invalidate]);

  useEffect(() => {
    if (reducedMotion) {
      model.bones.forEach(({ bone, rest }) => bone.quaternion.copy(rest));
      invalidate();
    }
  }, [model, reducedMotion, invalidate]);

  useFrame(({ pointer }, delta) => {
    if (reducedMotion) return;
    const step = Math.min(delta, 0.05);
    elapsed.current += step;
    const time = elapsed.current;
    const blend = 1 - Math.exp(-5 * step);
    model.bones.forEach(({ bone, rest, pitchAxis, yawAxis, rollAxis }, index) => {
      const weight = index === 1 ? 0.3 : 0.7;
      const pitch = index === 0 ? Math.sin(time * 1.6) * 0.006 : -MathUtils.clamp(pointer.y, -1, 1) * 0.08 * weight;
      const yaw = index === 0 ? 0 : MathUtils.clamp(pointer.x, -1, 1) * 0.14 * weight;
      const roll = Math.sin(time * 0.7) * (index === 0 ? 0.003 : 0.001);
      model.target.copy(rest)
        .multiply(model.offset.setFromAxisAngle(pitchAxis, pitch))
        .multiply(model.offset.setFromAxisAngle(yawAxis, yaw))
        .multiply(model.offset.setFromAxisAngle(rollAxis, roll));
      bone.quaternion.slerp(model.target, blend);
    });
  });

  return (
    <group position={[-model.center.x, -model.center.y, -model.center.z]}>
      <primitive object={model.object} dispose={null} />
    </group>
  );
}
