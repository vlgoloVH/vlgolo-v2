"use client";

import { useEffect, useRef } from "react";
import { HERO } from "@/lib/site";

/** Muted autoplay has to be set on the element itself: React only sets `muted`
 *  as a property, so server-rendered markup would be missing the attribute and
 *  the browser would block playback.
 *
 *  Playback waits for the preloader to flip `data-ready` on <html>, so the loop
 *  starts from its first frame at the moment the video becomes visible rather
 *  than running unseen behind the overlay. The observer then stops decoding
 *  once the hero scrolls away. */
export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = ref.current;
    if (!video) return;

    video.muted = true;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (reduced.matches) return;

    const startFromTop = () => {
      video.currentTime = 0;
      void video.play().catch(() => {});
    };

    const root = document.documentElement;
    let attributes: MutationObserver | undefined;

    if (root.dataset.ready) {
      startFromTop();
    } else {
      attributes = new MutationObserver(() => {
        if (!root.dataset.ready) return;
        attributes?.disconnect();
        startFromTop();
      });
      attributes.observe(root, { attributes: true, attributeFilter: ["data-ready"] });
    }

    const visibility = new IntersectionObserver(
      ([entry]) => {
        if (!root.dataset.ready) return;
        if (entry.isIntersecting) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: 0.05 },
    );

    visibility.observe(video);

    return () => {
      attributes?.disconnect();
      visibility.disconnect();
    };
  }, []);

  return (
    <video
      ref={ref}
      /* From tablet up, `contain` keeps the whole frame and its aspect ratio,
         never cropped, never stretched, and centres it. A phone is too narrow
         for that, so there the footage covers the screen instead, framed on
         the figure at the desk rather than on the middle of the room. */
      className="enter-video absolute inset-0 h-full w-full object-cover object-[36%_50%] md:object-contain md:object-center"
      poster={HERO.video.poster}
      preload="auto"
      playsInline
      loop
      muted
      aria-hidden="true"
      tabIndex={-1}
    >
      <source src={HERO.video.webm} type="video/webm" />
      <source src={HERO.video.mp4} type="video/mp4" />
    </video>
  );
}
