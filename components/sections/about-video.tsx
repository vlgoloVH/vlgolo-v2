"use client";

import { useEffect, useRef } from "react";
import { ABOUT } from "@/lib/site";

/** The portrait loop. The fade into the section colour on the sides and the
 *  top is baked into the file itself, so there is no mask or blend mode to go
 *  wrong on a given browser. Decoding only runs while the section is on screen, and
 *  `muted` is set on the element itself because React sets it as a property
 *  only, which would leave the attribute off the server-rendered markup and get
 *  autoplay blocked. */
export function AboutVideo() {
  const ref = useRef<HTMLVideoElement>(null);

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
  }, []);

  return (
    <video
      ref={ref}
      data-portrait=""
      className="h-full w-full object-cover object-bottom"
      poster={ABOUT.video.poster}
      preload="metadata"
      playsInline
      loop
      muted
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={ABOUT.video.webm} type="video/webm" />
      <source src={ABOUT.video.mp4} type="video/mp4" />
    </video>
  );
}
