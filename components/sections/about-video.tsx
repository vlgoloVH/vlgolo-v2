"use client";

import { useEffect, useRef, useState } from "react";
import { ABOUT } from "@/lib/site";

/** VP9 carries an alpha channel, but Safari decodes VP9 without it: it would
 *  show the cut-out clip's black background as a solid box. So Safari, and
 *  anything that cannot play VP9 at all, gets the graded version instead. */
function supportsAlphaVideo() {
  const probe = document.createElement("video");
  if (!probe.canPlayType('video/webm; codecs="vp9"')) return false;
  const ua = navigator.userAgent;
  const isSafari = /Safari/.test(ua) && !/Chrome|Chromium|Edg|OPR/.test(ua);
  return !isSafari;
}

/** The portrait loop. Playback only runs while the section is on screen, and
 *  `muted` is set on the element itself because React sets it as a property
 *  only, which would leave the attribute off the server-rendered markup and get
 *  autoplay blocked. */
export function AboutVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  // The server renders the safe version; the client upgrades on mount, long
  // before the section is scrolled into view.
  const [alpha, setAlpha] = useState(false);

  useEffect(() => {
    setAlpha(supportsAlphaVideo());
  }, []);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.15 },
    );

    visibility.observe(video);
    return () => visibility.disconnect();
    // Switching to the alpha clip swaps the element, so the observer and the
    // muted flag have to be set up again on the new one.
  }, [alpha]);

  return (
    <video
      ref={ref}
      key={alpha ? "alpha" : "flat"}
      data-portrait=""
      /* The graded clip still needs its edge taken to transparent; the cut-out
         one has no edge to hide. */
      className={`h-full w-full object-cover object-bottom ${alpha ? "" : "portrait-blend"}`}
      src={alpha ? ABOUT.video.alphaWebm : ABOUT.video.mp4}
      poster={alpha ? ABOUT.video.alphaPoster : ABOUT.video.poster}
      preload="metadata"
      playsInline
      loop
      muted
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
