import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="grid min-h-screen place-items-center bg-background px-6 text-foreground">
      <div className="max-w-2xl border-l border-primary pl-6 sm:pl-10">
        <p className="font-mono text-xs font-bold uppercase tracking-[.18em] text-primary">404 / Not found</p>
        <h1 className="mt-5 text-5xl font-black leading-[.9] tracking-[-.05em] sm:text-7xl">Página no encontrada.</h1>
        <p className="mt-5 max-w-xl font-medium leading-relaxed text-muted-foreground">La ruta no existe o ha cambiado. The page does not exist or has moved.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link href="/" className="inline-flex min-h-11 items-center bg-primary px-5 text-sm font-bold text-primary-foreground">Inicio / Home</Link>
          <Link href="/#projects" className="inline-flex min-h-11 items-center border border-border px-5 text-sm font-bold">Proyectos / Work</Link>
        </div>
      </div>
    </main>
  );
}
