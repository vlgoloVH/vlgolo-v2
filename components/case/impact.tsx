"use client";

import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/cases/types";
import { Track } from "@/components/case/track";
import { SectionTitle } from "@/components/case/title";

/** Size of the big figure by its length, so "3" and "Global" both fill the
 *  stage without running off it. */
const figure = (value: string) =>
  value.length <= 2
    ? "md:text-[min(20vw,36svh)]"
    : value.length <= 4
      ? "md:text-[min(15vw,30svh)]"
      : "md:text-[min(11vw,23svh)]";

/** Impact as one figure at a time, on a full pinned screen. The title and the
 *  line that sums the work up sit at the top. The stage holds a single huge
 *  figure; as the page scrolls it is pushed up out of its mask and the next
 *  one rises in, the words beside it change with it, and the light in the
 *  room drifts across. Along the bottom every figure waits in a row, the
 *  current one lit, its rule filling while it holds the stage. On a phone
 *  the figures follow one another. */
export function CaseImpact({
  labels,
  impact,
}: {
  labels: Dictionary["caseStudy"]["impact"];
  impact: CaseStudy["impact"];
}) {
  const { items } = impact;
  const n = items.length;
  return (
    <Track
      id="impact"
      steps={n}
      fit
      className="cs-impact relative md:h-[calc(var(--pin-h,100svh)+var(--n)*75vh)]"
      style={{ "--n": n } as React.CSSProperties}
    >
      {(active) => (
        <div data-pin className="relative px-6 py-[var(--section-y)] md:sticky md:top-[var(--pin-top,0px)] md:flex md:flex-col md:overflow-hidden md:px-[var(--case-pad)]">
          <div aria-hidden="true" className="cs-impact-bg absolute inset-0 hidden md:block" />

          <div className="relative grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-start md:gap-[5vw]">
            <SectionTitle>{labels.label}</SectionTitle>
            <p className="max-w-[34rem] text-[19px] font-medium leading-[1.45] tracking-[-0.01em] text-ink/85 md:justify-self-end md:text-[clamp(18px,1.5vw,25px)]">
              {impact.summary}
            </p>
          </div>

          {/* Desktop: the stage. */}
          <div className="relative mt-[8svh] hidden grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] items-end gap-[5vw] md:grid">
            <div className="grid">
              {items.map((item, i) => (
                <span
                  key={item.label}
                  aria-hidden={i !== active}
                  className="col-start-1 row-start-1 block self-end overflow-hidden pb-[0.02em]"
                >
                  <span
                    className={`cs-figure block font-bold leading-[0.8] tracking-[-0.06em] text-ink ${figure(item.value)} ${
                      i === active ? "is-on" : i < active ? "is-past" : ""
                    }`}
                  >
                    {item.value}
                  </span>
                </span>
              ))}
            </div>
            <div className="grid pb-[1svh]">
              {items.map((item, i) => (
                <div key={item.label} className={`cs-beat col-start-1 row-start-1 ${i === active ? "is-on" : ""}`}>
                  <p className="cs-accent font-mono text-[13px] uppercase tracking-[0.22em]">{item.label}</p>
                  <p className="mt-5 text-[clamp(20px,1.7vw,28px)] font-medium leading-[1.4] tracking-[-0.01em] text-ink">{item.body}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: every figure in a row, the one on stage lit. */}
          <ol className="relative mt-[6svh] hidden gap-[2vw] md:grid md:grid-cols-[repeat(var(--n),minmax(0,1fr))]">
            {items.map((item, i) => (
              <li
                key={item.label}
                className={`transition-opacity duration-500 ${i === active ? "opacity-100" : "opacity-40"}`}
                style={{ "--i": i } as React.CSSProperties}
              >
                <span aria-hidden="true" className="block h-px bg-white/20">
                  <span className="cs-impact-fill block h-full origin-left" />
                </span>
                <p className="mt-4 flex items-baseline gap-3">
                  <span className="text-[22px] font-bold tracking-[-0.03em] text-ink">{item.value}</span>
                  <span className="truncate font-mono text-[11px] uppercase tracking-[0.18em] text-ink/70">{item.label}</span>
                </p>
              </li>
            ))}
          </ol>

          {/* Phone: one after another. */}
          <ol className="mt-10 flex flex-col md:hidden">
            {items.map((item) => (
              <li key={item.label} className="border-t border-white/12 py-8">
                <p className="text-[clamp(64px,22vw,110px)] font-bold leading-[0.85] tracking-[-0.05em] text-ink">{item.value}</p>
                <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink">{item.label}</p>
                <p className="mt-3 text-[17px] leading-[1.5] text-ink/70">{item.body}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </Track>
  );
}
