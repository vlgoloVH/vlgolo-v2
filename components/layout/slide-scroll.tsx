"use client";

import { useEffect } from "react";

/** Section-to-section scrolling is entirely native CSS scroll snap (see
 *  `.section-slide` in globals.css) — the browser owns wheel, trackpad and
 *  touch momentum itself, consistently, on every platform, instead of a
 *  hand-rolled engine trying to reconstruct that from raw event timing.
 *
 *  The one thing CSS can't do on its own: while the Works section fills the
 *  screen, a vertical wheel gesture should pan its horizontal case track
 *  sideways instead of scrolling the page past it. That's all this file
 *  does. Touch needs nothing here — the track is natively horizontally
 *  scrollable (see `data-h-track` in Works), so a finger swipe on it just
 *  scrolls it directly, no JS involved. */
export function SlideScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    /** Whichever section currently fills the viewport, read fresh off real
     *  geometry on every event rather than tracked as state. */
    const activeTrack = (): HTMLElement | null => {
      const mid = window.innerHeight / 2;
      for (const section of document.querySelectorAll<HTMLElement>(".section-slide")) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= mid && rect.bottom >= mid) {
          return section.querySelector<HTMLElement>("[data-h-track]");
        }
      }
      return null;
    };

    const onWheel = (event: WheelEvent) => {
      if (event.ctrlKey) return; // pinch zoom

      const track = activeTrack();
      if (!track) return;

      const max = track.scrollWidth - track.clientWidth;
      const forward = event.deltaY > 0;
      const hasRoom = forward ? track.scrollLeft < max - 1 : track.scrollLeft > 0;
      if (!hasRoom) return; // exhausted — let it fall through to the page's own snap scroll

      event.preventDefault();
      track.scrollLeft = Math.min(Math.max(track.scrollLeft + event.deltaY, 0), max);
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    return () => window.removeEventListener("wheel", onWheel);
  }, []);

  return null;
}
