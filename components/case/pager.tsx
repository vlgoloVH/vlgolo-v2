import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";

export interface PagerCase {
  href: string;
  title: string;
  lines: readonly string[];
  cover: string;
  /** The case's colour as "r g b". */
  tint: string;
}

/** Previous and next case, the screen split down the middle. Under the pointer
 *  a half takes on its case's colour, the cover opens out from a slit behind
 *  the name and settles to size, and the name steps toward the middle. On a
 *  phone the two stack, covers showing. With only one neighbour it takes the
 *  whole width. */
export function CasePager({
  labels,
  previous,
  next,
}: {
  labels: Dictionary["caseStudy"]["pager"];
  previous: PagerCase | null;
  next: PagerCase | null;
}) {
  const halves = [
    previous && { side: "prev" as const, label: `← ${labels.previous}`, item: previous },
    next && { side: "next" as const, label: `${labels.next} →`, item: next },
  ].filter(Boolean) as { side: "prev" | "next"; label: string; item: PagerCase }[];

  return (
    <nav aria-label={`${labels.previous} / ${labels.next}`} className={`relative grid border-t border-white/12 ${halves.length > 1 ? "md:grid-cols-2" : ""}`}>
      {halves.map(({ side, label, item }) => (
        <Link
          key={side}
          href={item.href}
          data-cursor={labels.view}
          className={`cs-pager group relative flex min-h-[46svh] flex-col justify-between overflow-hidden px-6 py-10 md:min-h-[72svh] md:px-[var(--frame-pad)] md:py-[7svh] ${
            side === "next" ? "md:items-end md:text-right" : ""
          } ${halves.length > 1 && side === "next" ? "border-t border-white/12 md:border-l md:border-t-0" : ""}`}
          style={{ "--c": item.tint } as React.CSSProperties}
        >
          <span aria-hidden="true" className="cs-pager-tint absolute inset-0" />
          <span aria-hidden="true" className="cs-pager-img absolute inset-0">
            <Image src={item.cover} alt="" fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
            <span className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.55),rgba(0,0,0,0.15)_45%,rgba(0,0,0,0.7))]" />
          </span>

          <span className="relative font-mono text-[12px] uppercase tracking-[0.28em] text-ink/70">{label}</span>
          <span
            aria-label={item.title}
            className={`cs-pager-name relative mt-16 block text-[clamp(44px,6.4vw,124px)] font-bold uppercase leading-[0.86] tracking-[-0.045em] text-ink ${
              side === "prev" ? "[--dx:1]" : "[--dx:-1]"
            }`}
          >
            {item.lines.map((line) => (
              <span key={line} aria-hidden="true" className="block">
                {line}
              </span>
            ))}
          </span>
        </Link>
      ))}
    </nav>
  );
}
