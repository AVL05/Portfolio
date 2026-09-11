import type { Metadata } from "next";
import "./globals.css";
import { GeistMono, GeistSans } from "@/lib/fonts";
import { NotFoundContent } from "@/components/not-found-content";

export const metadata: Metadata = {
  title: "Página no encontrada",
  description: "Esta ruta no forma parte del sistema.",
  robots: { index: false, follow: false },
};

/**
 * Global 404 for unmatched URLs (required with multiple root layouts:
 * group-level not-found files cannot cover paths outside their subtree).
 * Bypasses layouts by design, so it owns its document, styles and fonts.
 * Content localizes client-side purely from the URL path.
 */
export default function GlobalNotFound() {
  return (
    <html lang="es" className="dark scroll-smooth overflow-x-clip">
      <body
        className={`font-sans ${GeistSans.variable} ${GeistMono.variable} antialiased bg-background text-foreground overflow-x-clip`}
      >
        <NotFoundContent />
      </body>
    </html>
  );
}
