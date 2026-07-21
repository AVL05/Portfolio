import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

interface SeoPageShellProps {
  eyebrow: string;
  title: string;
  description: string;
  sections: Array<{ title: string; body: string }>;
}

export function SeoPageShell({ eyebrow, title, description, sections }: SeoPageShellProps) {
  return (
    <main id="main-content" className="case-study min-h-screen bg-background px-4 pb-20 pt-5 text-foreground sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[100rem]">
        <nav className="flex h-14 items-center justify-between border-b border-border/60">
          <Link href="/" className="inline-flex items-center gap-2 font-mono text-[10px] font-bold uppercase tracking-[.16em] text-foreground/68 transition-colors hover:text-primary">
            <ArrowLeft className="h-3.5 w-3.5" /> Aleviclop.dev
          </Link>
          <Link href="/#contact" className="font-mono text-[10px] font-bold uppercase tracking-[.16em] transition-colors hover:text-primary">Contact ↗</Link>
        </nav>

        <header className="grid min-h-[78dvh] gap-8 border-b border-border/60 py-20 md:grid-cols-[.65fr_1.35fr] md:items-end">
          <p className="section-kicker self-start">{eyebrow}</p>
          <div>
            <h1 className="max-w-6xl text-[clamp(3.7rem,9vw,9rem)] font-black leading-[.8] tracking-[-.07em]">{title}</h1>
            <p className="mt-9 max-w-[62ch] text-lg font-medium leading-relaxed text-foreground/66 sm:text-xl">{description}</p>
          </div>
        </header>

        <div>
          {sections.map((section, index) => (
            <article key={section.title} className="grid gap-4 border-b border-border/55 py-9 md:grid-cols-[3rem_minmax(220px,.6fr)_minmax(0,1fr)] md:items-baseline md:py-12">
              <span className="font-mono text-[10px] text-primary">0{index + 1}</span>
              <h2 className="text-2xl font-black tracking-[-.04em] sm:text-3xl">{section.title}</h2>
              <p className="max-w-[65ch] font-medium leading-relaxed text-foreground/65 sm:text-lg">{section.body}</p>
            </article>
          ))}
        </div>

        <div className="mt-16 flex flex-wrap gap-x-8 gap-y-4 font-mono text-[10px] font-bold uppercase tracking-[.15em]">
          <Link href="/proyectos" className="cinema-link">Work <ArrowUpRight /></Link>
          <Link href="/sobre-mi" className="cinema-link">About <ArrowUpRight /></Link>
          <Link href="/fotografia" className="cinema-link">raw.vives <ArrowUpRight /></Link>
        </div>
      </div>
    </main>
  );
}
