"use client";

import { useCallback, useRef } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/cases/types";
import { Track } from "@/components/case/track";
import { SectionTitle } from "@/components/case/title";
import { MotifArt, drawMotif } from "@/components/case/motif";

/** Context in its three parts from the current site, pinned on desktop. The
 *  index on the left fills as each part is read, the part itself swaps in
 *  beside it, and the case's drawing goes from scattered fragments to the
 *  structure the work gave it. On a phone the three parts simply follow one
 *  another. */
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
    <Track id="context" steps={3} onProgress={onProgress} className="cs-context relative md:h-[340vh]">
      {(active) => (
        <div className="relative flex flex-col px-6 py-[12vh] md:sticky md:top-0 md:h-[100svh] md:justify-center md:px-[var(--frame-pad)] md:py-0">
          <SectionTitle index={2}>{labels.label}</SectionTitle>

          <div className="mt-10 grid gap-12 md:mt-[6svh] md:grid-cols-[13rem_minmax(0,1fr)_minmax(0,0.8fr)] md:items-start md:gap-[4vw]">
            {/* The index: one hairline per part, filling while it is read. */}
            <ol className="hidden flex-col gap-5 md:flex">
              {labels.stages.map((stage, i) => (
                <li
                  key={stage}
                  className={`cs-part-tab transition-colors duration-500 ${i === active ? "text-ink" : "text-ink/35"}`}
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="flex gap-3 font-mono text-[11px] uppercase tracking-[0.2em]">
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
            <div className="relative hidden md:grid">
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
            <div className="flex flex-col gap-10 md:hidden">
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

            <div className="relative mx-auto aspect-square w-full max-w-[min(420px,46svh)] text-ink md:mx-0 md:ml-auto">
              <span aria-hidden="true" className="ab-corners pointer-events-none absolute inset-0" />
              <MotifArt ref={artRef} motif={context.motif} labels={context.labels} className="absolute inset-[9%]" />
            </div>
          </div>
        </div>
      )}
    </Track>
  );
}
