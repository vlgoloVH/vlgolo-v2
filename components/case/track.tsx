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
  children: ReactNode | ((active: number) => ReactNode);
}

/** A scroll-driven stage. On desktop it is a tall track with a sticky child:
 *  `--sp` on the track runs 0 → 1 while the child is pinned, and the
 *  stylesheet moves everything inside from that. Where the track is not
 *  taller than the screen (phones, where nothing pins) `--sp` follows the
 *  track's own trip up the screen instead, so the same choreography plays
 *  without pinning. With reduced motion `--sp` sits at 1: everything is shown
 *  in its finished state. */
export function Track({ className = "", style, id, steps = 0, onProgress, children }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.style.setProperty("--sp", "1");
      if (steps) setActive(steps - 1);
      onProgress?.(1);
      return;
    }
    return onScrollFrame(() => {
      const rect = el.getBoundingClientRect();
      if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
      const pinned = rect.height > window.innerHeight + 4;
      const p = pinned
        ? stickyProgress(el)
        : Math.min(Math.max((viewProgress(el) - 0.15) / 0.5, 0), 1);
      el.style.setProperty("--sp", p.toFixed(4));
      onProgress?.(p);
      if (steps) setActive(Math.min(Math.floor(p * steps), steps - 1));
    });
    // onProgress is read once: callers pass a function that only touches refs.
  }, [steps]);

  return (
    <div ref={ref} id={id} className={className} style={style}>
      {typeof children === "function" ? children(active) : children}
    </div>
  );
}
