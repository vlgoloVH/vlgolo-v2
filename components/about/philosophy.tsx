"use client";

import { useRef } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { Art, type ArtKind } from "@/components/about/art";
import { useSteps, useViewArt } from "@/components/about/use-steps";
import { Words } from "@/components/about/words";

type Copy = Dictionary["aboutPage"]["philosophy"];

const KINDS: ArtKind[] = ["network", "reduce", "scale"];
/** Reduce complexity is the page's signature moment, so it holds the screen
 *  longest. */
const WEIGHTS = [1, 1.7, 1];

/** 03 · Thinking. The statement lights up word by word, then the three
 *  principles pin to the screen: one line drawing on the right plays out each
 *  principle as the page scrolls. The middle one, reduce complexity, is the
 *  loud one: sixteen stray strokes settle into four clean rows. On a phone
 *  nothing pins: each principle carries its own drawing, played as it rises. */
export function AboutPhilosophy({ copy }: { copy: Copy }) {
  return (
    <section id="thinking" data-section className="relative">
      <div data-p className="px-6 pb-[10vh] pt-[16vh] md:px-[var(--frame-pad)] md:pb-[14vh] md:pt-[22vh]">
        <p className="ab-label">
          <span>03</span>
          {copy.label}
        </p>
        <p className="mt-10 max-w-[18em] text-[clamp(34px,4.6vw,84px)] font-bold leading-[1.06] tracking-[-0.03em] text-ink md:mt-14">
          <Words text={copy.statement} />
        </p>
      </div>

      <Pinned copy={copy} />
      <Stacked copy={copy} />
    </section>
  );
}

function Pinned({ copy }: { copy: Copy }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const active = useSteps(trackRef, stageRef, WEIGHTS);

  return (
    <div ref={trackRef} className="relative hidden h-[360vh] md:block">
      <div className="sticky top-0 flex h-[100svh] items-center px-[var(--frame-pad)]">
        <div className="grid w-full grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] items-center gap-[6vw]">
          <ol className="flex flex-col gap-[5vh]">
            {copy.principles.map((item, i) => (
              <li key={item.title} data-on={i === active ? "true" : undefined} className="ab-step">
                <span className="font-mono text-[12px] tracking-[0.2em] text-ink/60">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-[clamp(30px,3.4vw,60px)] font-bold leading-[1.02] tracking-[-0.03em] text-ink">
                  {item.title}
                </h3>
                <p className="ab-step-body mt-3 max-w-[24rem] text-[18px] leading-relaxed text-ink/65">
                  {item.body}
                </p>
              </li>
            ))}
          </ol>

          <div ref={stageRef} className="relative mx-auto aspect-square w-full max-w-[min(600px,72vh)]">
            {/* A quiet frame: the corners of the drawing area only. */}
            <span aria-hidden="true" className="ab-corners pointer-events-none absolute inset-0" />
            {KINDS.map((kind, i) => (
              <Art
                key={kind}
                kind={kind}
                className={`ab-art absolute inset-[6%] text-ink ${i === active ? "opacity-100" : "opacity-0"}`}
              />
            ))}
            <span className="absolute -bottom-10 left-0 font-mono text-[11px] tracking-[0.2em] text-ink/40">
              {String(active + 1).padStart(2, "0")} / {String(KINDS.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stacked({ copy }: { copy: Copy }) {
  return (
    <ol className="flex flex-col gap-20 px-6 pb-[12vh] md:hidden">
      {copy.principles.map((item, i) => (
        <StackedItem key={item.title} index={i} title={item.title} body={item.body} />
      ))}
    </ol>
  );
}

function StackedItem({ index, title, body }: { index: number; title: string; body: string }) {
  const ref = useRef<SVGSVGElement>(null);
  useViewArt(ref);
  return (
    <li>
      <Art ref={ref} kind={KINDS[index]} className="mb-8 w-[72%] text-ink" />
      <span className="font-mono text-[12px] tracking-[0.2em] text-ink/60">
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3 className="mt-3 text-[32px] font-bold leading-[1.05] tracking-[-0.03em] text-ink">{title}</h3>
      <p className="mt-3 text-[17px] leading-relaxed text-ink/65">{body}</p>
    </li>
  );
}
