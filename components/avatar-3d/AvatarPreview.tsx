"use client";

import dynamic from "next/dynamic";

const AvatarCanvas = dynamic(() => import("./AvatarCanvas"), {
  ssr: false,
  loading: () => <p role="status">Preparando visor 3D…</p>,
});

export default function AvatarPreview() {
  return <AvatarCanvas />;
}
