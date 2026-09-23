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

  useEffect(() => () => window.clearTimeout(timer.current), []);

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
    <div className="reveal [--reveal-i:2] absolute inset-y-0 left-[var(--frame-line)] right-[var(--frame-line)] flex flex-col justify-center gap-10 px-6 pb-10 pt-24 md:grid md:grid-cols-[minmax(0,1.75fr)_minmax(0,1fr)] md:items-center md:gap-[5vw] md:px-[clamp(32px,5vw,104px)] md:py-0">
      <figure aria-live="polite">
        <div className="grid">
          {items.map((item, index) => (
            <blockquote
              key={index}
              data-state={state(index)}
              aria-hidden={index !== active}
              className="t-quote relative max-w-[15em]"
            >
              <span aria-hidden="true" className="t-mark">
                “
              </span>
              {item.quote}”
            </blockquote>
          ))}
        </div>

        <figcaption className="mt-8 flex items-center gap-5 md:mt-14 md:gap-8">
          <div className="t-meta">
            <span key={active} className="t-swap">
              <span className="block text-[13px] font-medium uppercase tracking-[0.19em] text-ink">
                {current.name}
              </span>
              <span className="mt-1.5 block text-[12px] uppercase tracking-[0.16em] text-ink/55">
                {current.role} · {current.company}
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

      <ol aria-label={label} className="flex flex-col gap-1 md:gap-2">
        {items.map((item, index) => (
          <li key={index}>
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
              <span>
                <span className="block text-[16px] font-medium text-ink md:text-[18px]">
                  {item.name}
                </span>
                <span className="mt-1 block text-[12px] uppercase tracking-[0.16em] text-ink/55">
                  {item.role} · {item.company}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
