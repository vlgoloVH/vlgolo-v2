"use client";

import { useRef } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { Art, type ArtKind } from "@/components/about/art";
import { useSteps } from "@/components/about/use-steps";
import { SectionTitle } from "@/components/case/title";

type Copy = Dictionary["aboutPage"]["process"];

const KINDS: ArtKind[] = ["understand", "smaller", "people", "evidence", "loop"];
const WEIGHTS = [1, 1, 1, 1, 1];

/** Each principle borrows a case's colour, as "r g b", so the drawings speak
 *  the same colour language as the case pages. */
const TINTS = ["29 78 216", "8 145 178", "249 115 22", "124 58 237", "202 138 4"];

/** How I work. Five statements pinned to the screen; the scroll walks
 *  through them one at a time, the active one at full strength and full size,
 *  the rest faint. On the right, one drawing per statement plays out as its
 *  statement is read, on the dot grid a case's Context drawing sits on and in
 *  that statement's own colour, with the room's light shifting to match. On a
 *  phone the statements simply stack. */
export function AboutProcess({ copy }: { copy: Copy }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const active = useSteps(trackRef, stageRef, WEIGHTS);

  const heading = <SectionTitle>{copy.label}</SectionTitle>;

  return (
    <section id="process" className="relative">
      <div ref={trackRef} className="relative hidden h-[420vh] md:block">
        <div className="sticky top-0 flex h-[100svh] items-center px-[var(--case-pad)]">
          <div className="grid w-full grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] items-center gap-[5vw]">
            <div>
              {heading}
              <ol className="mt-[6vh] flex flex-col gap-[1.6vh]">
                {copy.statements.map((line, i) => (
                  <li
                    key={line}
                    data-on={i === active ? "true" : undefined}
                    style={{ "--tint": TINTS[i] } as React.CSSProperties}
                    className="ab-statement flex items-baseline gap-5 text-[clamp(26px,2.7vw,48px)] font-medium leading-[1.12] tracking-[-0.025em] text-ink"
                  >
                    <span className="ab-statement-num w-8 shrink-0 font-mono text-[12px] tracking-[0.2em]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {line}
                  </li>
                ))}
              </ol>
            </div>

            <div ref={stageRef} className="cs-motif-frame relative mx-auto aspect-square w-full max-w-[min(520px,64vh)]">
              {KINDS.map((kind, i) => (
                <span
                  key={kind}
                  aria-hidden="true"
                  style={{ "--tint": TINTS[i] } as React.CSSProperties}
                  className={`ab-art-glow pointer-events-none absolute inset-0 ${i === active ? "opacity-100" : "opacity-0"}`}
                />
              ))}
              <span aria-hidden="true" className="ab-corners pointer-events-none absolute inset-0" />
              {KINDS.map((kind, i) => (
                <Art
                  key={kind}
                  kind={kind}
                  style={{ "--tint": TINTS[i] } as React.CSSProperties}
                  className={`ab-art ab-art-tint absolute inset-[8%] h-[84%] w-[84%] ${i === active ? "opacity-100" : "opacity-0"}`}
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
              style={{ "--i": i, "--n": copy.statements.length, "--tint": TINTS[i] } as React.CSSProperties}
              className="ab-stack-line flex items-baseline gap-4 text-[26px] font-medium leading-[1.15] tracking-[-0.02em] text-ink"
            >
              <span className="cs-accent font-mono text-[11px] tracking-[0.2em]">
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
