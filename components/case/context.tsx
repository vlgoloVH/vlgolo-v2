"use client";

import { useCallback, useRef } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/cases/types";
import { Track } from "@/components/case/track";
import { Label } from "@/components/case/label";
import { MotifArt, drawMotif } from "@/components/case/motif";

/** Context as a short story in three beats, pinned to the screen. The
 *  headline holds on the left; the beat being read swaps in beneath it; on the
 *  right the case's drawing goes from a few scattered points, to a tangle,
 *  to the structure the work gave it. */
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
  const beats = [context.invite, context.situation, context.outcome];

  return (
    <Track id="context" steps={3} onProgress={onProgress} className="relative md:h-[330vh]">
      {(active) => (
        <div className="relative px-6 py-[12vh] md:sticky md:top-0 md:flex md:h-[100svh] md:items-center md:px-[var(--frame-pad)] md:py-0">
          <div className="grid w-full gap-12 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:items-center md:gap-[5vw]">
            <div>
              <Label index={2}>{labels.label}</Label>
              <h2 className="mt-8 text-[clamp(38px,4.6vw,86px)] font-bold leading-[1] tracking-[-0.035em] text-ink">
                {context.headline.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </h2>

              <ol className="mt-10 flex gap-6 font-mono text-[11px] uppercase tracking-[0.2em] md:mt-14">
                {labels.stages.map((stage, i) => (
                  <li
                    key={stage}
                    className={`transition-colors duration-500 ${i === active ? "text-ink" : "text-ink/30"}`}
                  >
                    {String(i + 1).padStart(2, "0")} / {stage}
                  </li>
                ))}
              </ol>

              {/* Desktop: one beat at a time, crossfading in place. */}
              <div className="relative mt-6 hidden min-h-[12.5em] text-[19px] leading-[1.65] text-ink/80 md:grid">
                {beats.map((beat, i) => (
                  <p key={i} className={`cs-beat col-start-1 row-start-1 max-w-[36rem] ${i === active ? "is-on" : ""}`}>
                    {beat}
                  </p>
                ))}
              </div>
              {/* Phone: all three, in order. */}
              <div className="mt-6 flex flex-col gap-8 text-[17px] leading-[1.65] text-ink/80 md:hidden">
                {beats.map((beat, i) => (
                  <div key={i}>
                    <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45">
                      {String(i + 1).padStart(2, "0")} / {labels.stages[i]}
                    </p>
                    <p className="mt-3">{beat}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mx-auto aspect-square w-full max-w-[min(560px,72vh)] text-ink">
              <span aria-hidden="true" className="ab-corners pointer-events-none absolute inset-0" />
              <MotifArt ref={artRef} motif={context.motif} labels={context.labels} className="absolute inset-[7%]" />
            </div>
          </div>
        </div>
      )}
    </Track>
  );
}
