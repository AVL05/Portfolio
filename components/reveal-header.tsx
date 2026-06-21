"use client";

interface RevealHeaderProps {
  title: string;
  subtitle: string;
  description?: string;
  className?: string;
}

export function RevealHeader({
  title,
  subtitle,
  description,
  className = "",
}: RevealHeaderProps) {
  return (
    <header className={`mb-14 space-y-5 sm:mb-18 ${className}`}>
      <div className="flex items-center gap-4 font-mono text-xs font-black uppercase tracking-[0.2em] text-primary sm:text-sm sm:tracking-[0.24em]">
        <span className="h-px w-10 bg-primary/60" />
        {title}
      </div>
      <h2
        className="max-w-5xl pb-2 text-4xl font-black leading-[0.98] tracking-normal text-foreground sm:text-6xl lg:text-7xl"
        aria-label={subtitle}
      >
        {subtitle}
      </h2>
      {description && (
        <p className="max-w-2xl text-balance text-base font-medium leading-relaxed text-muted-foreground sm:text-xl">
          {description}
        </p>
      )}
    </header>
  );
}
