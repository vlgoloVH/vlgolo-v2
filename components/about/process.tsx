"use client";

import { useCallback, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { Art, drawArt, type ArtKind } from "@/components/about/art";
import { Track } from "@/components/case/track";
import { SectionTitle } from "@/components/case/title";

type Copy = Dictionary["aboutPage"]["process"];

const KINDS: ArtKind[] = ["understand", "smaller", "people", "loop"];

/** Each step borrows a case's colour, as "r g b". The colour lives in the
 *  drawing only, the way it does in a case's Context drawing. */
const TINTS = ["29 78 216", "8 145 178", "124 58 237", "249 115 22"];

/** How I work. Pinned like the case Overview deck: on the left the four
 *  steps as short titles, the one in play lit; on the right a deck of cards,
 *  one per step, each with its drawing and a few lines on what the step
 *  means. As the page scrolls the next card slides up and lands on the one
 *  before, which sinks back a little (smaller, darker, its edge still showing),
 *  and the drawing on the new card draws itself in. On a phone the cards
 *  stick and stack as they pass, the way the Overview images do. */
export function AboutProcess({ copy }: { copy: Copy }) {
  const n = copy.steps.length;
  const [active, setActive] = useState(0);
  const deckRef = useRef<HTMLDivElement>(null);
  const phoneRef = useRef<HTMLOListElement>(null);

  // --pos runs from a little before the first card to a little past the last,
  // so the first drawing plays in and the last card holds for a moment.
  // Card i slides in as --pos goes from i − 1 to i.
  const onProgress = useCallback(
    (p: number) => {
      const pos = p * n - 0.6;
      const deck = deckRef.current;
      if (deck) {
        deck.style.setProperty("--pos", pos.toFixed(4));
        deck.querySelectorAll<SVGSVGElement>("svg[data-art]").forEach((svg, i) => {
          const t = i === 0 ? (pos + 0.6) / 0.6 : pos - i + 1;
          drawArt(svg, Math.min(Math.max(t, 0), 1));
        });
      }
      phoneRef.current?.querySelectorAll<SVGSVGElement>("svg[data-art]").forEach((svg) => drawArt(svg, 1));
      setActive(Math.min(Math.max(Math.round(pos), 0), n - 1));
    },
    [n],
  );

  const heading = <SectionTitle>{copy.label}</SectionTitle>;

  const card = (step: Copy["steps"][number], i: number) => (
    <div className="ab-card-face flex h-full flex-col overflow-hidden rounded-[20px] border border-white/10 p-6 md:p-[clamp(24px,2.2vw,36px)]">
      <p className="flex items-center justify-between font-mono text-[12px] uppercase tracking-[0.2em] text-ink/55">
        <span>{String(i + 1).padStart(2, "0")}</span>
        <span>{step.title}</span>
      </p>
      <div className="cs-motif-frame relative my-5 aspect-[16/10] w-full md:my-[3svh] md:aspect-auto md:flex-1">
        <Art
          kind={KINDS[i]}
          style={{ "--tint": TINTS[i] } as React.CSSProperties}
          className="ab-art-tint absolute inset-0 h-full w-full"
        />
      </div>
      <p className="text-[17px] leading-[1.55] text-ink/80 md:text-[clamp(16px,1.2vw,19px)]">{step.body}</p>
    </div>
  );

  return (
    <Track
      id="process"
      onProgress={onProgress}
      className="relative md:h-[calc(var(--n)*80vh+100vh)]"
      style={{ "--n": n } as React.CSSProperties}
    >
      {/* Desktop: the titles and the deck, pinned. */}
      <div className="sticky top-0 hidden h-[100svh] items-center overflow-hidden px-[var(--case-pad)] md:flex">
        <div className="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-center gap-[5vw]">
          <div>
            {heading}
            <ol className="mt-[6vh] flex flex-col gap-[1.6vh]">
              {copy.steps.map((step, i) => (
                <li
                  key={step.title}
                  data-on={i === active ? "true" : undefined}
                  style={{ "--tint": TINTS[i] } as React.CSSProperties}
                  className="ab-statement flex items-baseline gap-5 text-[clamp(30px,3.2vw,56px)] font-medium leading-[1.1] tracking-[-0.025em] text-ink"
                >
                  <span className="ab-statement-num w-8 shrink-0 font-mono text-[12px] tracking-[0.2em]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {step.title}
                </li>
              ))}
            </ol>
          </div>

          <div ref={deckRef} className="relative h-[min(74svh,640px)]">
            {copy.steps.map((step, i) => (
              <div
                key={step.title}
                aria-hidden={i !== active}
                className="ab-card absolute inset-0"
                style={{ "--i": i, zIndex: i + 1 } as React.CSSProperties}
              >
                {card(step, i)}
                <span aria-hidden="true" className="ab-card-shade pointer-events-none absolute inset-0 rounded-[20px] bg-black" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Phone: the same cards, stacked by the page itself. */}
      <div className="px-6 py-[10vh] md:hidden">
        {heading}
        <ol ref={phoneRef} className="mt-10 flex flex-col gap-6">
          {copy.steps.map((step, i) => (
            <li key={step.title} className="sticky" style={{ top: `calc(14svh + ${i * 12}px)` }}>
              {card(step, i)}
            </li>
          ))}
        </ol>
      </div>
    </Track>
  );
}
