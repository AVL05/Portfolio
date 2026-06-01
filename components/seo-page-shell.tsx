import Link from "next/link";

interface SeoPageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  sections: Array<{
    title: string;
    body: string;
  }>;
}

export function SeoPageShell({
  eyebrow,
  title,
  description,
  sections,
}: SeoPageShellProps) {
  return (
    <main className="min-h-screen bg-background px-4 py-24 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <nav className="mb-14 flex items-center justify-between gap-6 rounded-2xl border border-border/70 bg-card/58 px-4 py-3 backdrop-blur-xl">
          <Link
            href="/"
            className="font-mono text-xs font-black uppercase tracking-[0.22em] text-muted-foreground transition-colors hover:text-primary"
          >
            ALEX VICENTE
          </Link>
          <Link
            href="/#contact"
            className="rounded-xl border border-border bg-card/70 px-4 py-2 font-mono text-[10px] font-black uppercase tracking-[0.18em] text-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            Contacto
          </Link>
        </nav>

        <header className="border-b border-border/70 pb-12">
          <p className="mb-5 font-mono text-xs font-black uppercase tracking-[0.24em] text-primary">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-black leading-[0.98] tracking-normal text-foreground sm:text-6xl">
            {title}
          </h1>
          <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            {description}
          </p>
        </header>

        <div className="grid gap-6 py-12 md:grid-cols-2">
          {sections.map((section) => (
            <article
              key={section.title}
              className="rounded-2xl border border-border/70 bg-card/62 p-6 transition-colors hover:border-primary/30"
            >
              <h2 className="mb-4 text-xl font-black tracking-normal text-foreground">
                {section.title}
              </h2>
              <p className="leading-relaxed text-muted-foreground">
                {section.body}
              </p>
            </article>
          ))}
        </div>

        <div className="flex flex-wrap gap-3 border-t border-border/70 pt-8">
          <Link
            href="/proyectos"
            className="rounded-xl bg-primary px-4 py-2 text-sm font-bold text-primary-foreground"
          >
            Ver proyectos
          </Link>
          <Link
            href="/sobre-mi"
            className="rounded-xl border border-border px-4 py-2 text-sm font-bold text-foreground"
          >
            Sobre Alex Vicente López
          </Link>
          <Link
            href="/fotografia"
            className="rounded-xl border border-border px-4 py-2 text-sm font-bold text-foreground"
          >
            Fotografía
          </Link>
        </div>
      </div>
    </main>
  );
}
