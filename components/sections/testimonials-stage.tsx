"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";

type Item = Dictionary["testimonials"]["items"][number];

interface Props {
  label: string;
  items: readonly Item[];
}

/** A beat before a hovered author takes over, so running the pointer down the
 *  list does not flick through every quote on the way. */
const DWELL = 90;

/** The range a quote's type may take. The recommendations run from about 100
 *  to about 200 words and are always shown in full, so each one is set as
 *  large as its own length allows in the space there is, within these bounds. */
const MAX_SIZE = 44;
const MIN_SIZE = 13;

/** Largest font size, to half a pixel, at which the quote fits the box. */
function fit(quote: HTMLElement, box: HTMLElement) {
  let lo = MIN_SIZE;
  let hi = MAX_SIZE;
  while (hi - lo > 0.5) {
    const mid = (lo + hi) / 2;
    quote.style.fontSize = `${mid}px`;
    if (quote.offsetHeight <= box.clientHeight) lo = mid;
    else hi = mid;
  }
  quote.style.fontSize = `${lo}px`;
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Split screen: the active quote large on the left, the four authors as a
 *  list on the right that switches it. Hover (with a real pointer), click, tap
 *  or keyboard focus all select. Every quote stays in the page; `state` says
 *  which one is shown, which one is on its way out and which are idle, and the
 *  stylesheet runs the mask transition between them. */
export function TestimonialsStage({ label, items }: Props) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  /** No entrance on first render: the section's own reveal handles that. */
  const [moved, setMoved] = useState(false);
  const timer = useRef(0);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  // Size every quote to the box, and again whenever the box changes size.
  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;
    const run = () => {
      box.querySelectorAll<HTMLElement>(".t-quote").forEach((quote) => fit(quote, box));
    };
    run();
    void document.fonts?.ready.then(run);
    const observer = new ResizeObserver(run);
    observer.observe(box);
    return () => observer.disconnect();
  }, [items]);

  const select = (index: number) => {
    window.clearTimeout(timer.current);
    if (index === active) return;
    setPrevious(active);
    setActive(index);
    setMoved(true);
  };

  const state = (index: number) => {
    if (index === active) return moved ? "in" : "shown";
    if (index === previous) return "out";
    return "idle";
  };

  const current = items[active];

  return (
    <div className="reveal [--reveal-i:2] absolute inset-y-0 left-[var(--frame-line)] right-[var(--frame-line)] flex flex-col gap-6 px-6 pb-8 pt-24 md:grid md:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)] md:gap-[5vw] md:px-[clamp(32px,5vw,104px)] md:pb-[clamp(48px,9vh,104px)] md:pt-[clamp(112px,16vh,160px)]">
      <figure aria-live="polite" className="flex min-h-0 flex-1 flex-col">
        {/* The quotes share one cell of this box and are each sized to fill
            it, so the name below stays put whichever one is showing. */}
        <div ref={boxRef} className="grid min-h-0 flex-1 grid-rows-[minmax(0,1fr)]">
          {items.map((item, index) => (
            <blockquote
              key={index}
              data-state={state(index)}
              aria-hidden={index !== active}
              className="t-quote relative max-w-[42em]"
            >
              <span aria-hidden="true" className="t-mark">
                “
              </span>
              {item.quote}”
            </blockquote>
          ))}
        </div>

        <figcaption className="mt-6 flex shrink-0 items-center gap-5 md:mt-10 md:gap-8">
          <div className="t-meta">
            <span key={active} className="t-swap">
              <span className="block text-[13px] font-medium uppercase tracking-[0.19em] text-ink">
                {current.name}
              </span>
              <span className="mt-1.5 block text-[12px] uppercase tracking-[0.16em] text-ink/55">
                {[current.role, current.company].filter(Boolean).join(" · ")}
              </span>
            </span>
          </div>

          <span className="flex shrink-0 items-center gap-2 whitespace-nowrap font-mono text-[12px] tracking-[0.2em] text-ink/45">
            <span className="inline-block overflow-hidden text-ink">
              <span key={active} className="t-swap">
                {pad(active + 1)}
              </span>
            </span>
            / {pad(items.length)}
          </span>
        </figcaption>
      </figure>

      {/* On a phone the list is a row of numbers, so the quote keeps the room
          it needs; the name is in the pill above. */}
      <ol aria-label={label} className="flex shrink-0 gap-2 md:flex-col md:gap-2 md:self-center">
        {items.map((item, index) => (
          <li key={index} className="flex-1 md:flex-none">
            <button
              type="button"
              aria-current={index === active ? "true" : undefined}
              className="t-author"
              onClick={() => select(index)}
              onFocus={() => select(index)}
              onPointerEnter={(event) => {
                if (event.pointerType === "touch") return;
                window.clearTimeout(timer.current);
                timer.current = window.setTimeout(() => select(index), DWELL);
              }}
              onPointerLeave={() => window.clearTimeout(timer.current)}
            >
              <span className="font-mono text-[12px] tracking-[0.2em] text-ink/70">
                {pad(index + 1)}
              </span>
              <span className="sr-only md:not-sr-only">
                <span className="block text-[18px] font-medium text-ink">
                  {item.name}
                </span>
                <span className="mt-1 block text-[12px] uppercase tracking-[0.16em] text-ink/55">
                  {[item.role, item.company].filter(Boolean).join(" · ")}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
