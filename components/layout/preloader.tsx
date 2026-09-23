"use client";

import { useEffect, useLayoutEffect, useState } from "react";

/** Nothing on the page animates until this component says the hero video can
 *  actually play. Without that gate the CSS sequence runs against a black
 *  screen while the video is still downloading, and the content lands all at
 *  once when it finally arrives. */
const MAX_WAIT = 6000;

/** Whether this tab has already been through the entrance. Module state, so it
 *  outlives the component: switching language mounts the whole document again,
 *  React wipes every attribute off <html> on the way, and without this the
 *  visitor would sit through the preloader and the full entrance a second time.
 *  False on the server and on the first client render alike, so hydration
 *  still matches. */
let entered = false;

export function Preloader() {
  const [ready, setReady] = useState(() => entered);
  const [hidden, setHidden] = useState(() => entered);
  const [progress, setProgress] = useState(0);

  // Before paint, or the frame would flash for one frame without its gates.
  // data-settled tells the stylesheet to skip the entrance (see globals.css).
  useLayoutEffect(() => {
    if (!entered) return;
    const root = document.documentElement;
    root.dataset.ready = "true";
    root.dataset.settled = "true";
  }, []);

  useEffect(() => {
    if (entered) return;
    let done = false;

    // Starts the bar from zero on the frame after mount so it animates.
    const start = requestAnimationFrame(() => setProgress(0.85));

    const finish = () => {
      if (done) return;
      done = true;
      entered = true;
      document.documentElement.dataset.ready = "true";
      setReady(true);
      setProgress(1);
      // Let the overlay finish fading before it leaves the tree.
      window.setTimeout(() => setHidden(true), 700);
    };

    const video = document.querySelector("video");

    const videoReady = new Promise<void>((resolve) => {
      if (!video || video.readyState >= 3) return resolve();
      const onReady = () => resolve();
      video.addEventListener("canplay", onReady, { once: true });
      video.addEventListener("loadeddata", onReady, { once: true });
      video.addEventListener("error", onReady, { once: true });
    });

    const fontsReady = document.fonts?.ready ?? Promise.resolve();

    void Promise.all([videoReady, fontsReady]).then(finish);
    const timer = window.setTimeout(finish, MAX_WAIT);

    return () => {
      window.clearTimeout(timer);
      cancelAnimationFrame(start);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-bg transition-opacity duration-700 ease-out ${
        ready ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <span className="relative h-px w-28 overflow-hidden bg-white/15">
        <span
          className={`absolute inset-y-0 left-0 w-full origin-left bg-white/70 transition-transform ease-out ${
            ready ? "duration-500" : "duration-[2600ms]"
          }`}
          style={{ transform: `scaleX(${progress})` }}
        />
      </span>
    </div>
  );
}
