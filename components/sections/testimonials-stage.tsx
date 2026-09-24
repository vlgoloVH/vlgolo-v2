"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";

type Item = Dictionary["testimonials"]["items"][number];

interface Props {
  label: string;
  fullLabel: string;
  closeLabel: string;
  items: readonly Item[];
}

/** A beat before a hovered author takes over, so running the pointer down the
 *  list does not flick through every quote on the way. */
const DWELL = 90;

/** Excerpts up to this many characters are set a size larger (see `.t-quote`
 *  in globals.css): two steps, so the type stays steady between quotes. */
const SHORT = 175;

/** On a screen too short for the stylesheet's size, a quote may come down,
 *  but never below this share of it: the excerpts are written to fit, so this
 *  is a safety margin, not a way to squeeze in more text. */
const FLOOR = 0.78;

/** The stylesheet's size for the quote, or the largest below it (to half a
 *  pixel, down to FLOOR) at which it fits the box. */
function fit(quote: HTMLElement, box: HTMLElement) {
  quote.style.removeProperty("font-size");
  if (quote.offsetHeight <= box.clientHeight) return;
  const base = parseFloat(getComputedStyle(quote).fontSize);
  let lo = base * FLOOR;
  let hi = base;
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
export function TestimonialsStage({ label, fullLabel, closeLabel, items }: Props) {
  const [active, setActive] = useState(0);
  const [previous, setPrevious] = useState<number | null>(null);
  /** No entrance on first render: the section's own reveal handles that. */
  const [moved, setMoved] = useState(false);
  const timer = useRef(0);
  const boxRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

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
    <div className="reveal [--reveal-i:2] absolute inset-0 flex flex-col gap-6 px-6 pb-20 pt-24 md:left-[var(--frame-line)] md:right-[var(--frame-line)] md:grid md:grid-cols-[minmax(0,1.9fr)_minmax(0,1fr)] md:grid-rows-[minmax(0,1fr)] md:gap-[5vw] md:px-[clamp(32px,5vw,104px)] md:pb-[clamp(48px,9vh,104px)] md:pt-[clamp(112px,16vh,160px)]">
      <figure aria-live="polite" className="flex min-h-0 flex-1 flex-col justify-center">
        {/* The quotes share one cell of this box and are each sized to fill
            it, so the name below stays put whichever one is showing. On a
            phone the box is only as tall as the longest quote (and shrinks
            with it on a short screen), so the name sits right under the quote
            and the pair is centred on the screen. */}
        <div ref={boxRef} className="grid min-h-0 flex-initial grid-rows-[minmax(0,1fr)] md:flex-1">
          {items.map((item, index) => (
            <blockquote
              key={index}
              data-state={state(index)}
              data-size={item.quote.length <= SHORT ? "l" : "m"}
              aria-hidden={index !== active}
              className="t-quote relative max-w-[42em]"
            >
              <span aria-hidden="true" className="t-mark">
                “
              </span>
              {item.quote}”
              {/* The whole recommendation, right under the excerpt it belongs
                  to. Quiet on purpose: it should not compete with the quote. */}
              <button
                type="button"
                tabIndex={index === active ? 0 : -1}
                onClick={() => dialogRef.current?.showModal()}
                className="mx-auto mt-5 block text-[11px] font-normal uppercase leading-none tracking-[0.2em] text-ink/45 underline-offset-4 transition-colors duration-300 can-hover:text-ink can-hover:underline md:mx-0 md:mt-7 md:text-[12px]"
              >
                {fullLabel}
              </button>
            </blockquote>
          ))}
        </div>

        <figcaption className="mt-10 flex shrink-0 items-center justify-center gap-5 md:justify-start md:gap-8">
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

          {/* A phone has the same count in the row of numbers below. */}
          <span className="hidden shrink-0 items-center gap-2 whitespace-nowrap font-mono md:flex text-[12px] tracking-[0.2em] text-ink/45">
            <span className="inline-block overflow-hidden text-ink">
              <span key={active} className="t-swap">
                {pad(active + 1)}
              </span>
            </span>
            / {pad(items.length)}
          </span>
        </figcaption>

        <dialog
          ref={dialogRef}
          aria-label={`${current.name}: ${fullLabel}`}
          className="contact-dialog"
          onClick={(event) => {
            if (event.target === event.currentTarget) dialogRef.current?.close();
          }}
        >
          <div className="relative w-full rounded-[28px] border border-white/10 bg-surface p-7 text-left md:p-12">
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              aria-label={closeLabel}
              className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full text-ink/60 transition-colors duration-300 can-hover:bg-white/5 can-hover:text-ink md:right-7 md:top-7"
            >
              <svg
                viewBox="0 0 16 16"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
                strokeLinecap="round"
                aria-hidden="true"
              >
                <path d="M3 3l10 10M13 3 3 13" />
              </svg>
            </button>

            <p className="pr-10 text-[17px] leading-[1.7] text-ink md:text-[19px]">
              “{current.full}”
            </p>
            <p className="mt-8 text-[13px] font-medium uppercase tracking-[0.19em] text-ink">
              {current.name}
            </p>
            <p className="mt-1.5 text-[12px] uppercase tracking-[0.16em] text-ink/55">
              {[current.role, current.company].filter(Boolean).join(" · ")}
            </p>
          </div>
        </dialog>
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
