import type { ReactNode } from "react";

/**
 * One home section: a title strip between two rules, then the body.
 * The id doubles as the anchor target (kept stable for existing redirects).
 */
export function Section({
  id,
  title,
  children,
}: Readonly<{ id: string; title: string; children: ReactNode }>) {
  return (
    <section id={id} aria-labelledby={`${id}-title`}>
      <div className="section-strip">
        <h2 id={`${id}-title`}><span aria-hidden="true">/</span>{title}</h2>
      </div>
      <div className="section-body" data-reveal>{children}</div>
    </section>
  );
}
