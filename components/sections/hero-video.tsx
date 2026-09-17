"use client";

import { useEffect, useRef } from "react";
import { HERO } from "@/lib/site";

/** Muted autoplay has to be set on the element itself: React only sets `muted`
 *  as a property, so server-rendered markup would be missing the attribute and
 *  the browser would block playback. The observer also stops decoding frames
 *  once the hero has scrolled away. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );

    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <video
      ref={ref}
      /* `contain` keeps the whole frame and its aspect ratio at every viewport
         shape — never cropped, never stretched — and centres it. */
      className="enter-video absolute inset-0 h-full w-full object-contain object-center"
      poster={HERO.video.poster}
      preload="metadata"
      playsInline
      loop
      muted
      autoPlay
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={HERO.video.webm} type="video/webm" />
      <source src={HERO.video.mp4} type="video/mp4" />
    </video>
  );
}
