"use client";

import { useCallback, useRef } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { Track } from "@/components/case/track";
import { SectionTitle } from "@/components/case/title";
import { MotifArt, drawMotif } from "@/components/case/motif";

type Copy = Dictionary["aboutPage"]["story"];

/** My story, built like a case's Context and pinned on desktop the same way.
 *  Under the title and a short lead the stages of the path sit in a row, each
 *  hairline filling while its stage is read; the stage itself swaps in below.
 *  On the right the path draws itself: scattered points travel into one line
 *  from art school to lead, the way a case's drawing goes from fragments to
 *  structure. On a phone the stages simply follow one another. */
export function AboutStory({ copy }: { copy: Copy }) {
  const artRef = useRef<SVGSVGElement>(null);
  const onProgress = useCallback((p: number) => {
    if (artRef.current) drawMotif(artRef.current, p);
  }, []);
  const n = copy.path.length;

  return (
    <Track
      id="story"
      steps={n}
      onProgress={onProgress}
      className="relative md:h-[calc(var(--n)*60vh+100vh)]"
      style={{ "--n": n } as React.CSSProperties}
    >
      {(active) => (
        <div className="relative px-6 py-[9vh] md:sticky md:top-0 md:flex md:h-[100svh] md:items-center md:px-[var(--case-pad)] md:py-0">
          <div className="grid w-full gap-12 md:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] md:items-center md:gap-[6vw]">
            <div>
              <SectionTitle>{copy.label}</SectionTitle>
              <p className="mt-6 max-w-[34rem] text-[17px] leading-[1.6] text-ink/60 md:mt-[3svh] md:text-[clamp(16px,1.15vw,19px)]">
                {copy.lead}
              </p>

              {/* The stages in a row, each hairline filling while read. */}
              <ol
                className="mt-[5svh] hidden gap-4 md:grid"
                style={{ gridTemplateColumns: `repeat(${n}, minmax(0, 1fr))`, "--parts": n } as React.CSSProperties}
              >
                {copy.path.map((stage, i) => (
                  <li
                    key={stage.name}
                    className={`transition-colors duration-500 ${i === active ? "text-ink" : "text-ink/35"}`}
                    style={{ "--i": i } as React.CSSProperties}
                  >
                    <span className="font-mono text-[12px] uppercase tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span aria-hidden="true" className="mt-3 block h-px bg-white/12">
                      <span className="cs-part-fill block h-full origin-left bg-white/80" />
                    </span>
                  </li>
                ))}
              </ol>

              {/* Desktop: one stage at a time, in place. */}
              <div className="mt-[5svh] hidden md:grid">
                {copy.path.map((stage, i) => (
                  <div key={stage.name} className={`cs-beat col-start-1 row-start-1 ${i === active ? "is-on" : ""}`}>
                    <p className="cs-accent font-mono text-[13px] uppercase tracking-[0.22em]">{stage.name}</p>
                    <p className="mt-4 text-[clamp(21px,1.75vw,30px)] font-medium leading-[1.4] tracking-[-0.01em] text-ink">
                      {stage.note}
                    </p>
                  </div>
                ))}
              </div>

              {/* Phone: every stage, in order. */}
              <ol className="mt-10 flex flex-col gap-10 md:hidden">
                {copy.path.map((stage, i) => (
                  <li key={stage.name}>
                    <p className="flex gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
                      <span>{String(i + 1).padStart(2, "0")}</span>
                      {stage.name}
                    </p>
                    <p className="mt-4 text-[19px] leading-[1.5] text-ink">{stage.note}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div className="cs-motif-frame relative mx-auto aspect-square w-full max-w-[min(520px,62svh)] md:mr-0">
              <span aria-hidden="true" className="ab-corners pointer-events-none absolute inset-0" />
              <MotifArt
                ref={artRef}
                motif="journey"
                labels={copy.path.map((stage) => stage.short)}
                className="absolute inset-[10%] h-[80%] w-[80%]"
              />
            </div>
          </div>
        </div>
      )}
    </Track>
  );
}
