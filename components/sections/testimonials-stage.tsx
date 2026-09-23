"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";

type Item = Dictionary["testimonials"]["items"][number];

interface Props {
  label: string;
  items: readonly Item[];
}

/** How long the pointer has to rest on a quote before it takes over. Long
 *  enough that sweeping across the section does not shuffle everything, short
 *  enough to feel like it answered the hover. */
const DWELL = 320;
const SWIPE = 50;

const pad = (n: number) => String(n).padStart(2, "0");

/** Every quote is always on stage; `slots[i]` says where quote i sits. Slot 0
 *  is the main position, 1–3 the small ones around it. Choosing a quote swaps
 *  its slot with the active one's, and the stylesheet animates the move — each
 *  quote keeps its own size and line breaks and is only translated and scaled,
 *  so nothing reflows and no text is swapped in place. */
export function TestimonialsStage({ label, items }: Props) {
  const [slots, setSlots] = useState(() => items.map((_, i) => i));
  const active = slots.indexOf(0);

  const timer = useRef(0);
  /** The quote that has just been sent to the pointer's position. It ignores
   *  the pointer until the pointer has left it once, or it would take the main
   *  spot straight back and the two would trade places forever. */
  const settling = useRef<number | null>(null);
  const touch = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const select = (index: number) => {
    window.clearTimeout(timer.current);
    if (index === active) return;
    setSlots((current) => {
      const next = [...current];
      const from = current.indexOf(0);
      next[from] = current[index];
      next[index] = 0;
      return next;
    });
    settling.current = active;
  };

  const step = (direction: 1 | -1) =>
    select((active + direction + items.length) % items.length);

  return (
    <div
      className="reveal [--reveal-i:2] absolute inset-y-0 left-[var(--frame-line)] right-[var(--frame-line)] px-6 pb-[12vh] pt-[16vh] md:px-[clamp(32px,5vw,104px)] md:pb-[10vh] md:pt-[14vh]"
      onTouchStart={(event) => {
        const t = event.touches[0];
        touch.current = { x: t.clientX, y: t.clientY };
      }}
      onTouchEnd={(event) => {
        const start = touch.current;
        touch.current = null;
        if (!start) return;
        const t = event.changedTouches[0];
        const dx = t.clientX - start.x;
        const dy = t.clientY - start.y;
        // Sideways only: an upward swipe is the page scroll and stays that.
        if (Math.abs(dx) > SWIPE && Math.abs(dx) > Math.abs(dy) * 1.5) {
          step(dx < 0 ? 1 : -1);
        }
      }}
    >
      <ul aria-label={label} className="t-stage relative h-full w-full">
        {items.map((item, index) => {
          const isActive = index === active;
          return (
            <li
              key={index}
              data-slot={slots[index]}
              data-active={isActive ? "true" : undefined}
              aria-current={isActive ? "true" : undefined}
              role={isActive ? undefined : "button"}
              tabIndex={isActive ? undefined : 0}
              className="t-item"
              onClick={() => select(index)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  select(index);
                }
              }}
              onPointerEnter={(event) => {
                if (event.pointerType === "touch" || isActive) return;
                if (settling.current === index) return;
                window.clearTimeout(timer.current);
                timer.current = window.setTimeout(() => select(index), DWELL);
              }}
              onPointerLeave={() => {
                if (settling.current === index) settling.current = null;
                window.clearTimeout(timer.current);
              }}
            >
              <blockquote className="t-quote">
                <span aria-hidden="true" className="t-mark">
                  “
                </span>
                {item.quote}”
              </blockquote>

              <div className="t-meta" aria-hidden={!isActive}>
                <div>
                  <p className="text-[13px] font-medium uppercase tracking-[0.19em] text-ink">
                    {item.name}
                  </p>
                  <p className="mt-1.5 text-[12px] uppercase tracking-[0.16em] text-ink/55">
                    {item.role} · {item.company}
                  </p>
                </div>
                <span aria-hidden="true" className="h-8 w-px bg-white/20" />
                <span className="font-mono text-[12px] tracking-[0.2em] text-ink/70">
                  {pad(index + 1)} / {pad(items.length)}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
