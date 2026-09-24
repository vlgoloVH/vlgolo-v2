import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";

/** The way on: the next case as a band across the bottom of the page, a
 *  little under half a screen, with the contact scene after it. The room
 *  shifts from this case's colour to the next one's as the band comes up;
 *  under the pointer the name steps aside and the cover grows a touch. The
 *  whole band is the link. */
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
    <section data-p className="cs-next relative overflow-hidden border-t border-white/12" style={{ "--next": tint } as React.CSSProperties}>
      <div aria-hidden="true" className="cs-next-bg absolute inset-0" />
      <Link
        href={href}
        data-cursor={labels.view}
        className="group relative flex min-h-[46svh] items-center justify-between gap-8 px-6 py-12 md:px-[var(--case-pad)] md:py-[6svh]"
      >
        <div>
          <p className="font-mono text-[12px] uppercase tracking-[0.3em] text-ink/60">{labels.label}</p>
          <p
            aria-label={title}
            className="mt-6 text-[clamp(44px,7vw,136px)] font-bold uppercase leading-[0.86] tracking-[-0.045em] text-ink transition-transform duration-700 ease-[var(--ease-soft)] group-can-hover:translate-x-3"
          >
            {lines.map((line) => (
              <span key={line} aria-hidden="true" className="block">
                {line}
              </span>
            ))}
          </p>
        </div>
        <div className="cs-next-cover hidden aspect-[4/3] h-[32svh] shrink-0 overflow-hidden rounded-[clamp(10px,1vw,18px)] sm:block">
          <Image
            src={cover}
            alt=""
            width={1200}
            height={900}
            sizes="(min-width: 768px) 32vw, 40vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-soft)] group-can-hover:scale-[1.06]"
          />
        </div>
      </Link>
    </section>
  );
}
