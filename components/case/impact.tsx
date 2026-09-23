"use client";

import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/cases/types";
import { Track } from "@/components/case/track";
import { SectionTitle } from "@/components/case/title";
import { Words } from "@/components/about/words";

/** Size of the big figure by its length, so "3" and "Global" both fill the
 *  stage without running off it. */
const figure = (value: string) =>
  value.length <= 2
    ? "md:text-[min(22vw,40svh)]"
    : value.length <= 4
      ? "md:text-[min(17vw,34svh)]"
      : "md:text-[min(12vw,26svh)]";

/** Impact as one figure at a time. The stage pins and a single huge number
 *  holds it; as the page scrolls the number is pushed up out of its mask and
 *  the next one rises in, the words beside it change with it, and the light
 *  in the room drifts across. The summary closes the section, lighting up
 *  word by word. On a phone the figures follow one another. */
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
    <section id="impact" className="relative">
      <Track steps={n} className="cs-impact relative md:h-[calc(var(--n)*75vh+100vh)]" style={{ "--n": n } as React.CSSProperties}>
        {(active) => (
          <div className="relative px-6 pt-[14vh] md:sticky md:top-0 md:flex md:h-[100svh] md:flex-col md:overflow-hidden md:px-[var(--frame-pad)] md:pt-[13svh]">
            <div aria-hidden="true" className="cs-impact-bg absolute inset-0 hidden md:block" />
            <SectionTitle index={6} size="m" className="relative">
              {labels.label}
            </SectionTitle>

            {/* Desktop: the stage. */}
            <div className="relative mt-auto hidden grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] items-end gap-[5vw] pb-[12svh] md:grid">
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
              <div className="grid pb-[1.2svh]">
                {items.map((item, i) => (
                  <div key={item.label} className={`cs-beat col-start-1 row-start-1 ${i === active ? "is-on" : ""}`}>
                    <p className="font-mono text-[12px] uppercase tracking-[0.24em] text-ink">{item.label}</p>
                    <p className="mt-5 text-[clamp(18px,1.45vw,24px)] leading-[1.45] text-ink/70">{item.body}</p>
                  </div>
                ))}
                <p className="row-start-2 mt-10 font-mono text-[11px] tracking-[0.2em] text-ink/45">
                  {String(active + 1).padStart(2, "0")} / {String(n).padStart(2, "0")}
                </p>
              </div>
            </div>

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

      <p className="relative mx-auto max-w-[22em] px-6 py-[16vh] text-center text-[clamp(26px,3vw,52px)] font-bold leading-[1.12] tracking-[-0.03em] text-ink md:py-[22vh]">
        <Words text={impact.summary} />
      </p>
    </section>
  );
}
