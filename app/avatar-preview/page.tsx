import type { Metadata } from "next";
import Link from "next/link";
import AvatarPreview from "@/components/avatar-3d/AvatarPreview";

export const metadata: Metadata = {
  title: "Prueba del avatar 3D",
  robots: { index: false, follow: false },
};

export default function AvatarPreviewPage() {
  return (
    <main id="main-content" className="mx-auto max-w-5xl px-4 py-8">
      <Link href="/" className="underline">Volver al portfolio</Link>
      <h1 className="my-4 text-2xl font-semibold">Prueba del avatar 3D</h1>
      <p className="mb-6">Mueve el cursor sobre el visor. La preferencia de movimiento reducido desactiva la animación.</p>
      <AvatarPreview />
    </main>
  );
}
