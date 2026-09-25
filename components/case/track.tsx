"use client";

import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import {
  onScrollFrame,
  prefersReducedMotion,
  stickyProgress,
  viewProgress,
} from "@/lib/scroll-progress";

interface Props {
  className?: string;
  style?: CSSProperties;
  id?: string;
  /** Split the progress into this many steps and hand the active one to
   *  `children`. */
  steps?: number;
  /** Called with the progress every frame it changes, for drawings that are
   *  moved by script rather than by the stylesheet. */
  onProgress?: (p: number) => void;
  /** The pinned child (marked `data-pin`) is only as tall as its content and
   *  its padding, not a whole screen, and is held in the middle of the screen
   *  while pinned. Its height and offset are published as --pin-h and
   *  --pin-top, so the track can be `--pin-h` plus the scroll it needs and the
   *  child can stick at `--pin-top`. That way the space above and below a
   *  pinned scene is its own padding, the same as any other section. */
  fit?: boolean;
  children: ReactNode | ((active: number) => ReactNode);
}

/** A scroll-driven stage. On desktop it is a tall track with a sticky child:
 *  `--sp` on the track runs 0 → 1 while the child is pinned, and the
 *  stylesheet moves everything inside from that. Where the track is not
 *  taller than the screen (phones, where nothing pins) `--sp` follows the
 *  track's own trip up the screen instead, so the same choreography plays
 *  without pinning. With reduced motion `--sp` sits at 1: everything is shown
 *  in its finished state. */
export function Track({ className = "", style, id, steps = 0, onProgress, fit = false, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const pin = fit ? el.querySelector<HTMLElement>("[data-pin]") : null;

    // Fit: keep --pin-h and --pin-top in step with the child and the window.
    let resize: ResizeObserver | undefined;
    const measure = () => {
      if (!pin) return;
      const h = pin.offsetHeight;
      el.style.setProperty("--pin-h", `${h}px`);
      el.style.setProperty("--pin-top", `${Math.max((window.innerHeight - h) / 2, 0)}px`);
    };
    if (pin) {
      measure();
      resize = new ResizeObserver(measure);
      resize.observe(pin);
      window.addEventListener("resize", measure);
    }
    const cleanup = () => {
      resize?.disconnect();
      if (pin) window.removeEventListener("resize", measure);
    };

    if (prefersReducedMotion()) {
      el.style.setProperty("--sp", "1");
      if (steps) setActive(steps - 1);
      onProgress?.(1);
      return cleanup;
    }
    const off = onScrollFrame(() => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
      let p: number;
      if (pin) {
        // Pinned only where the child really sticks (not on a phone, and not
        // while it is hidden): then the trip is from its top reaching
        // --pin-top to its bottom meeting the track's end.
        const h = pin.offsetHeight;
        const sticks = h > 0 && getComputedStyle(pin).position === "sticky" && rect.height > h + 4;
        const top = Math.max((window.innerHeight - h) / 2, 0);
        p = sticks
          ? Math.min(Math.max((top - rect.top) / (rect.height - h), 0), 1)
          : Math.min(Math.max((viewProgress(el) - 0.15) / 0.5, 0), 1);
      } else {
        const pinned = rect.height > window.innerHeight + 4;
        p = pinned
          ? stickyProgress(el)
          : Math.min(Math.max((viewProgress(el) - 0.15) / 0.5, 0), 1);
      }
      el.style.setProperty("--sp", p.toFixed(4));
      onProgress?.(p);
      if (steps) setActive(Math.min(Math.floor(p * steps), steps - 1));
    });
    return () => {
      off();
      cleanup();
    };
    // onProgress is read once: callers pass a function that only touches refs.
  }, [steps, fit]);

  return (
    <div ref={ref} id={id} className={className} style={style}>
      {typeof children === "function" ? children(active) : children}
    </div>
  );
}
