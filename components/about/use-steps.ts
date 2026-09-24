"use client";

import { useEffect, useState, type RefObject } from "react";
import { drawArt } from "@/components/about/art";
import { onScrollFrame, prefersReducedMotion, stickyProgress } from "@/lib/scroll-progress";

/** Drives a pinned sequence: a tall track with a sticky stage inside, split
 *  into steps by `weights` (a heavier step holds the screen longer). Returns
 *  the active step, and on every frame draws each `[data-art]` drawing in the
 *  stage to its step's progress: finished for steps already passed, untouched
 *  for steps still to come, live for the active one. With reduced motion the
 *  drawings are simply shown finished. */
export function useSteps(
  trackRef: RefObject<HTMLElement | null>,
  stageRef: RefObject<HTMLElement | null>,
  weights: number[],
) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const stage = stageRef.current;
    if (!track || !stage) return;

    const arts = [...stage.querySelectorAll<SVGSVGElement>("svg[data-art]")];
    const total = weights.reduce((a, b) => a + b, 0);
    const ends = weights.map((_, i) => weights.slice(0, i + 1).reduce((a, b) => a + b, 0) / total);
    const still = prefersReducedMotion();

    const off = onScrollFrame(() => {
      // Hidden (the other layout is showing): nothing to do.
      if (!track.offsetParent) return;
      const p = stickyProgress(track);
      const step = Math.min(ends.findIndex((end) => p <= end), weights.length - 1);
      const index = step < 0 ? weights.length - 1 : step;
      const start = index === 0 ? 0 : ends[index - 1];
      // Each drawing finishes a little before its step ends, so it rests
      // complete for a moment before the next one takes over.
      const local = Math.min(((p - start) / (ends[index] - start)) * 1.25, 1);

      arts.forEach((svg, i) => {
        drawArt(svg, still || i < index ? 1 : i > index ? 0 : local);
      });
      setActive(index);
    });

    return off;
  }, [trackRef, stageRef, weights]);

  return active;
}
