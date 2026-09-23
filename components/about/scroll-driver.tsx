"use client";

import { useEffect } from "react";
import { onScrollFrame, prefersReducedMotion, viewProgress } from "@/lib/scroll-progress";

/** Publishes scroll position to CSS for every `[data-p]` element on the page:
 *  `--p` runs 0 → 1 as the element crosses the viewport. The stylesheet turns
 *  that into parallax, drift and reveals (see the About block in globals.css),
 *  so the motion lives in CSS and this only measures. Elements well off screen
 *  are skipped. With reduced motion nothing is written and the stylesheet
 *  holds everything at rest. It also shortens the site entrance when the page
 *  is opened directly. */
export function ScrollDriver() {
  useEffect(() => {
    // Opened straight on this page: the site's entrance has not started yet,
    // so it can be shortened (see html[data-quick] in globals.css).
    const root = document.documentElement;
    if (!root.dataset.ready) root.dataset.quick = "true";

    if (prefersReducedMotion()) return;

    const els = [...document.querySelectorAll<HTMLElement>("[data-p]")];
    const near = new Set<HTMLElement>();

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const el = entry.target as HTMLElement;
          if (entry.isIntersecting) near.add(el);
          else near.delete(el);
          // One last write on the way in or out, so a fast scroll never
          // leaves an element parked short of 0 or 1.
          el.style.setProperty("--p", viewProgress(el).toFixed(4));
        });
      },
      { rootMargin: "25% 0px 25% 0px" },
    );
    els.forEach((el) => {
      el.style.setProperty("--p", viewProgress(el).toFixed(4));
      io.observe(el);
    });

    const off = onScrollFrame(() => {
      near.forEach((el) => el.style.setProperty("--p", viewProgress(el).toFixed(4)));
    });

    return () => {
      off();
      io.disconnect();
    };
  }, []);

  return null;
}
