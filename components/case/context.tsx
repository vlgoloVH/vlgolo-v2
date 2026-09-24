"use client";

import { useCallback, useRef } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/cases/types";
import { Track } from "@/components/case/track";
import { SectionTitle } from "@/components/case/title";
import { MotifArt, drawMotif } from "@/components/case/motif";

/** Context in its three parts from the current site, pinned on desktop. Under
 *  the title the three parts sit in a row, each hairline filling while its
 *  part is read; the part itself swaps in below, and on the right the case's
 *  drawing goes from scattered fragments to the structure the work gave it.
 *  On a phone the three parts simply follow one another. */
export function CaseContext({
  labels,
  context,
}: {
  labels: Dictionary["caseStudy"]["context"];
  context: CaseStudy["context"];
}) {
  const artRef = useRef<SVGSVGElement>(null);
  const onProgress = useCallback((p: number) => {
    if (artRef.current) drawMotif(artRef.current, p);
  }, []);
  const parts = [context.invite, context.situation, context.outcome];

  return (
    <Track id="context" steps={3} onProgress={onProgress} className="relative md:h-[340vh]">
      {(active) => (
        <div className="relative px-6 py-[12vh] md:sticky md:top-0 md:flex md:h-[100svh] md:items-center md:px-[var(--case-pad)] md:py-0">
          <div className="grid w-full gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-center md:gap-[6vw]">
            <div>
              <SectionTitle>{labels.label}</SectionTitle>

              {/* The three parts in a row, each hairline filling while read. */}
              <ol className="mt-[5svh] hidden grid-cols-3 gap-6 md:grid">
                {labels.stages.map((stage, i) => (
                  <li
                    key={stage}
                    className={`transition-colors duration-500 ${i === active ? "text-ink" : "text-ink/35"}`}
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <span className="flex gap-3 font-mono text-[12px] uppercase tracking-[0.2em]">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {stage}
                    </span>
                    <span aria-hidden="true" className="mt-3 block h-px bg-white/12">
                      <span className="cs-part-fill block h-full origin-left bg-white/80" />
                    </span>
                  </li>
                ))}
              </ol>

              {/* Desktop: one part at a time, in place. */}
              <div className="mt-[5svh] hidden md:grid">
                {parts.map((part, i) => (
                  <p
                    key={i}
                    className={`cs-beat col-start-1 row-start-1 text-[clamp(21px,1.75vw,30px)] font-medium leading-[1.4] tracking-[-0.01em] text-ink ${
                      i === active ? "is-on" : ""
                    }`}
                  >
                    {part}
                  </p>
                ))}
              </div>

              {/* Phone: all three, in order. */}
              <div className="mt-10 flex flex-col gap-10 md:hidden">
                {parts.map((part, i) => (
                  <div key={i}>
                    <p className="flex gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {labels.stages[i]}
                    </p>
                    <p className="mt-4 text-[19px] leading-[1.5] text-ink">{part}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="cs-motif-frame relative mx-auto aspect-square w-full max-w-[min(520px,62svh)] md:mr-0">
              <span aria-hidden="true" className="ab-corners pointer-events-none absolute inset-0" />
              <MotifArt ref={artRef} motif={context.motif} labels={context.labels} className="absolute inset-[10%]" />
            </div>
          </div>
        </div>
      )}
    </Track>
  );
}
