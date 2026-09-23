"use client";

import { Fragment } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { Track } from "@/components/case/track";
import { SectionTitle } from "@/components/case/title";

/** Reflection, the quietest part of the page: pinned, one insight at a time,
 *  its number large and outlined, its words arriving one after another and
 *  settling. No cards, no colour, just the thought. On a phone they stack. */
export function CaseReflection({
  labels,
  insights,
}: {
  labels: Dictionary["caseStudy"]["reflection"];
  insights: string[];
}) {
  const n = insights.length;
  return (
    <Track id="reflection" steps={n} className="relative md:h-[calc(var(--n)*80vh+100vh)]" style={{ "--n": n } as React.CSSProperties}>
      {(active) => (
        <div className="relative px-6 py-[14vh] md:sticky md:top-0 md:flex md:h-[100svh] md:flex-col md:justify-center md:px-[var(--frame-pad)] md:py-0">
          <SectionTitle index={7}>{labels.label}</SectionTitle>

          <div className="mt-[8svh] hidden grid-cols-[minmax(0,0.42fr)_minmax(0,1.58fr)] items-start gap-[4vw] md:grid">
            <div className="grid">
              {insights.map((_, i) => (
                <span key={i} aria-hidden="true" className="col-start-1 row-start-1 block self-start overflow-hidden">
                  <span className={`cs-figure cs-outline block text-[min(13vw,26svh)] font-bold leading-[0.8] tracking-[-0.05em] ${i === active ? "is-on" : i < active ? "is-past" : ""}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </span>
              ))}
            </div>
            <div className="grid">
              {insights.map((insight, i) => {
                const words = insight.split(" ");
                return (
                  <p
                    key={i}
                    aria-hidden={i !== active}
                    className={`cs-insight col-start-1 row-start-1 max-w-[22em] text-[clamp(26px,2.7vw,48px)] font-medium leading-[1.2] tracking-[-0.025em] text-ink ${i === active ? "is-on" : ""}`}
                  >
                    {words.map((word, w) => (
                      <Fragment key={w}>
                        <span className="cs-insight-word inline-block" style={{ "--w": w } as React.CSSProperties}>
                          {word}
                        </span>{" "}
                      </Fragment>
                    ))}
                  </p>
                );
              })}
            </div>
          </div>

          <ol className="mt-10 flex flex-col gap-10 md:hidden">
            {insights.map((insight, i) => (
              <li key={i}>
                <p className="cs-outline text-[64px] font-bold leading-[0.8] tracking-[-0.05em]">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-5 text-[22px] font-medium leading-[1.3] tracking-[-0.02em] text-ink">{insight}</p>
              </li>
            ))}
          </ol>
        </div>
      )}
    </Track>
  );
}
