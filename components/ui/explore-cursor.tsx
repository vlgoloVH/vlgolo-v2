"use client";

import { useEffect, useRef, useState } from "react";

/** How far the circle closes on the pointer each frame: below 1 it trails a
 *  touch behind, which is what makes it feel like an object, not a sprite. */
const FOLLOW = 0.22;

/** Over anything marked `data-cursor`, the pointer becomes a circle carrying
 *  that attribute's text. The native cursor is hidden there by the stylesheet
 *  (only for a real mouse or trackpad, see data-hover-capable), and a finger
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
    let placed = false;

    const loop = () => {
      cx += (x - cx) * FOLLOW;
      cy += (y - cy) * FOLLOW;
      el.style.transform = `translate3d(${cx}px, ${cy}px, 0)`;
      raf = Math.abs(x - cx) + Math.abs(y - cy) > 0.1 ? requestAnimationFrame(loop) : 0;
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
        className="explore-cursor -ml-[56px] -mt-[56px] flex h-[112px] w-[112px] items-center justify-center rounded-full bg-white px-4 text-center text-[12px] font-semibold uppercase leading-[1.35] tracking-[0.14em] text-black"
      >
        {label}
      </div>
    </div>
  );
}
