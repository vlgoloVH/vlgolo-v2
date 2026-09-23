"use client";

import { useRef } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { Art, type ArtKind } from "@/components/about/art";
import { useSteps } from "@/components/about/use-steps";

type Copy = Dictionary["aboutPage"]["process"];

const KINDS: ArtKind[] = ["understand", "smaller", "people", "evidence", "loop"];
const WEIGHTS = [1, 1, 1, 1, 1];

/** 05 · Process. Five statements pinned to the screen; the scroll walks
 *  through them one at a time, the active one at full strength and full size,
 *  the rest faint. On the right, one drawing per statement plays out as its
 *  statement is read. On a phone the statements simply stack. */
export function AboutProcess({ copy }: { copy: Copy }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const active = useSteps(trackRef, stageRef, WEIGHTS);

  const heading = (
    <>
      <p className="ab-label">
        <span>05</span>
        {copy.label}
      </p>
      <h2 className="mt-8 text-[clamp(40px,4.6vw,84px)] font-bold leading-[1] tracking-[-0.035em] text-ink">
        {copy.heading}
      </h2>
    </>
  );

  return (
    <section id="process" data-section className="relative">
      <div ref={trackRef} className="relative hidden h-[420vh] md:block">
        <div className="sticky top-0 flex h-[100svh] items-center px-[var(--frame-pad)]">
          <div className="grid w-full grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-center gap-[5vw]">
            <div>
              {heading}
              <ol className="mt-[6vh] flex flex-col gap-[1.6vh]">
                {copy.statements.map((line, i) => (
                  <li
                    key={line}
                    data-on={i === active ? "true" : undefined}
                    className="ab-statement flex items-baseline gap-5 text-[clamp(26px,2.7vw,48px)] font-medium leading-[1.12] tracking-[-0.025em] text-ink"
                  >
                    <span className="w-8 shrink-0 font-mono text-[12px] tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {line}
                  </li>
                ))}
              </ol>
            </div>

            <div ref={stageRef} className="relative mx-auto aspect-square w-full max-w-[min(520px,64vh)]">
              <span aria-hidden="true" className="ab-corners pointer-events-none absolute inset-0" />
              {KINDS.map((kind, i) => (
                <Art
                  key={kind}
                  kind={kind}
                  className={`ab-art absolute inset-[8%] text-ink ${i === active ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div data-p className="px-6 py-[14vh] md:hidden">
        {heading}
        <ol className="mt-10 flex flex-col gap-8">
          {copy.statements.map((line, i) => (
            <li
              key={line}
              style={{ "--i": i, "--n": copy.statements.length } as React.CSSProperties}
              className="ab-stack-line flex items-baseline gap-4 text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-ink"
            >
              <span className="font-mono text-[11px] tracking-[0.2em] text-ink/50">
                {String(i + 1).padStart(2, "0")}
              </span>
              {line}
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
