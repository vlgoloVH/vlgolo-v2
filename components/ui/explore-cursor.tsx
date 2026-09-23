"use client";

import { useEffect, useRef, useState } from "react";

/** How long the circle takes to catch up, in ms: the time constant of a plain
 *  exponential ease. It trails a touch behind the pointer and settles without
 *  ever overshooting, so it reads as weight, not as jelly. Measured in time,
 *  not per frame, so it feels the same at 60Hz and 120Hz. */
const LAG = 90;

/** Over anything marked `data-cursor`, a circle carrying that attribute's text
 *  trails the pointer. The pointer itself stays visible; the circle is only
 *  shown for a real mouse or trackpad (see data-hover-capable), and a finger
 *  never sees any of this. It also re-checks what is under a still pointer
 *  when the page scrolls, because the cases slide under the pointer on a wheel
 *  gesture without the pointer itself moving. */
export function ExploreCursor() {
  const ref = useRef<HTMLDivElement>(null);
  // The text stays after the pointer leaves, so it shrinks away with the
  // circle instead of vanishing first.
  const [label, setLabel] = useState("");
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let x = -200;
    let y = -200;
    let cx = x;
    let cy = y;
    let raf = 0;
    let last = 0;
    let placed = false;

    const loop = (now: number) => {
      const dt = last ? Math.min(now - last, 64) : 16;
      last = now;
      const k = 1 - Math.exp(-dt / LAG);
      cx += (x - cx) * k;
      cy += (y - cy) * k;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      if (Math.abs(x - cx) + Math.abs(y - cy) > 0.1) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
        last = 0;
      }
    };

    const check = () => {
      const target = document
        .elementFromPoint(x, y)
        ?.closest<HTMLElement>("[data-cursor]");
      if (target?.dataset.cursor) setLabel(target.dataset.cursor);
      setOn(Boolean(target));
    };

    const onMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return setOn(false);
      x = event.clientX;
      y = event.clientY;
      // The first time, appear where the pointer is instead of flying in.
      if (!placed) {
        cx = x;
        cy = y;
        placed = true;
      }
      check();
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onScroll = () => {
      if (placed) check();
    };

    const onLeave = () => setOn(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("scroll", onScroll, { capture: true, passive: true });
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("scroll", onScroll, { capture: true });
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[60]"
    >
      <div
        data-on={on ? "true" : undefined}
        className="explore-cursor -ml-[60px] -mt-[60px] flex h-[120px] w-[120px] items-center justify-center rounded-full px-3 text-center text-[12px] font-medium uppercase leading-[1.5] tracking-[0.19em] text-ink"
      >
        <span className="relative">{label}</span>
      </div>
    </div>
  );
}
