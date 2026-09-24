import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";

/** The way on: the next case, full size. The room shifts from this case's
 *  colour to the next one's as the section comes up, so the step to the next
 *  page is already half taken; its cover grows a touch under the pointer, and
 *  the whole section is the link. */
export function CaseNext({
  labels,
  href,
  title,
  lines,
  cover,
  tint,
}: {
  labels: Dictionary["caseStudy"]["next"];
  href: string;
  title: string;
  lines: readonly string[];
  cover: string;
  /** The next case's colour as "r g b". */
  tint: string;
}) {
  return (
    <section data-p className="cs-next relative overflow-hidden" style={{ "--next": tint } as React.CSSProperties}>
      <div aria-hidden="true" className="cs-next-bg absolute inset-0" />
      <Link
        href={href}
        data-cursor={labels.view}
        className="group relative grid min-h-[100svh] items-center gap-12 px-6 py-[14vh] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:gap-[5vw] md:px-[var(--case-pad)]"
      >
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-ink/60">{labels.label}</p>
          <p aria-label={title} className="mt-8 text-[clamp(56px,8.4vw,160px)] font-bold uppercase leading-[0.84] tracking-[-0.045em] text-ink">
            {lines.map((line) => (
              <span key={line} aria-hidden="true" className="block">
                {line}
              </span>
            ))}
          </p>
          <span className="mt-10 inline-block text-[12px] uppercase tracking-[0.3em] text-ink/70 md:hidden">
            {labels.view}
          </span>
        </div>
        <div className="cs-next-cover overflow-hidden rounded-[clamp(12px,1.4vw,24px)]">
          <Image
            src={cover}
            alt=""
            width={3600}
            height={2700}
            sizes="(min-width: 768px) 40vw, 90vw"
            className="h-auto w-full transition-transform duration-700 ease-[var(--ease-soft)] group-can-hover:scale-[1.04]"
          />
        </div>
      </Link>
    </section>
  );
}
