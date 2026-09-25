"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export interface WorkItem {
  slug: string;
  tint: string;
  title: string;
  /** The name as set on the slide: always two lines. */
  lines: string[];
  description: string;
  tags: string[];
  cover: string;
  href: string;
}

interface Props {
  items: WorkItem[];
  explore: string;
  progressLabel: string;
}

const hexToRgb = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
};

const pad = (n: number) => String(n).padStart(2, "0");

/** The horizontal track of cases and the progress bar under it. Each case
 *  carries its own tint, so the next colour arrives with the next case at its
 *  edge rather than blending in. The bar is written straight to the DOM on
 *  scroll; only the case number goes through state, once per case. */
export function WorksTrack({ items, explore, progressLabel }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    const fill = fillRef.current;
    if (!track || !fill) return;

    const last = items.length - 1;
    let raf = 0;

    const update = () => {
      raf = 0;
      const position = Math.min(
        Math.max(track.scrollLeft / Math.max(track.clientWidth, 1), 0),
        last,
      );
      fill.style.transform = `scaleX(${(position + 1) / items.length})`;
      setCurrent(Math.round(position));
    };

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };

    update();
    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items]);

  /** The image leans a little towards the pointer while it is over it. */
  const onMediaMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") return;
    const el = event.currentTarget;
    const rect = el.getBoundingClientRect();
    const mx = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    const my = ((event.clientY - rect.top) / rect.height) * 2 - 1;
    el.style.setProperty("--mx", mx.toFixed(3));
    el.style.setProperty("--my", my.toFixed(3));
    el.dataset.hover = "true";
  };

  const onMediaLeave = (event: React.PointerEvent<HTMLDivElement>) => {
    const el = event.currentTarget;
    el.style.removeProperty("--mx");
    el.style.removeProperty("--my");
    delete el.dataset.hover;
  };

  return (
    <>
      {/* Native overflow-x is the source of truth for horizontal position: on
          mobile it is a plain touch-swipe carousel, and on desktop SlideScroll
          feeds the wheel into this same scrollLeft instead of reinventing it.
          No snapping of its own: the cases scroll freely, so a gesture leaves
          them wherever it leaves them. On a phone the track runs the full
          width, so each case's colour reaches the screen edges; the copy
          keeps the same 24px inset as every other section. */}
      <div
        ref={trackRef}
        data-h-track
        className="hide-scrollbar reveal [--reveal-i:2] absolute inset-0 flex overflow-x-auto overscroll-x-none md:left-[var(--frame-line)] md:right-[var(--frame-line)]"
      >
        {items.map((item, index) => {
          const body = (
            <div className="grid w-full items-center gap-6 px-6 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-[4vw] md:px-[clamp(32px,5vw,104px)]">
              <div className="order-2 md:order-1">
                <h3
                  aria-label={item.title}
                  className="text-[40px] font-bold leading-[0.98] tracking-[-0.025em] text-ink md:text-[clamp(48px,6.4vw,112px)]"
                >
                  {item.lines.map((line) => (
                    <span key={line} aria-hidden="true" className="block">
                      {line}
                    </span>
                  ))}
                </h3>
                <p className="mt-4 max-w-[25rem] text-[16px] leading-[1.6] text-ink md:mt-10 md:text-[clamp(17px,1.4vw,21px)] md:leading-[1.9]">
                  {item.description}
                </p>
                {/* On a short phone the tags give way, so the slide still fits. */}
                <ul className="mt-5 flex flex-wrap gap-2 md:mt-10 md:gap-3 [@media(max-width:767px)_and_(max-height:700px)]:hidden">
                  {item.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink/55 md:px-4 md:py-2 md:text-[11px]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="order-1 md:order-2">
                <div
                  className="case-media ml-auto w-full max-w-[calc(62vh*4/3)]"
                  onPointerMove={onMediaMove}
                  onPointerLeave={onMediaLeave}
                >
                  {/* The frame is a device-like bezel around the picture, in the
                      case's own colour: the tint mixed into a grey a step
                      lighter than the section, so it reads as the background
                      colour, only lighter. */}
                  <div className="rounded-[clamp(22px,2.6vw,44px)] bg-[color-mix(in_srgb,rgb(var(--tint))_34%,#2e2e30)] p-[clamp(8px,0.85vw,14px)] shadow-[0_50px_100px_-30px_rgba(0,0,0,0.7)]">
                    <div className="relative aspect-[16/10] overflow-hidden rounded-[clamp(14px,1.8vw,30px)] bg-[#1c1c1e] md:aspect-[4/3]">
                      <Image
                        src={item.cover}
                        alt={item.title}
                        fill
                        sizes="(min-width: 768px) 55vw, 90vw"
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );

          return (
            <Link
              key={item.slug}
              href={item.href}
              prefetch={false}
              data-cursor={explore}
              // The case's own colour, laid thinly over the section surface.
              style={{ "--tint": hexToRgb(item.tint).join(" ") } as React.CSSProperties}
              // On a phone the slide keeps clear of the header above and the
              // counter below.
              className="works-tint relative flex h-full w-full shrink-0 items-center pb-14 pt-16 md:py-0"
            >
              {body}
            </Link>
          );
        })}
      </div>

      {/* Which case this is and how many are left: a thin rule that fills as
          the track moves, between the current number and the total. */}
      <div className="reveal [--reveal-i:3] pointer-events-none absolute bottom-8 right-6 flex items-center gap-4 font-mono text-[12px] tracking-[0.2em] text-ink/45 md:bottom-[8vh] md:right-[calc(var(--frame-line)+clamp(32px,5vw,104px))]">
        <span className="sr-only">
          {progressLabel} {current + 1} / {items.length}
        </span>
        <span aria-hidden="true" className="w-[2ch] text-ink">
          {pad(current + 1)}
        </span>
        <span aria-hidden="true" className="relative h-px w-24 overflow-hidden bg-white/15 md:w-32">
          <span ref={fillRef} className="absolute inset-0 origin-left bg-white/80" />
        </span>
        <span aria-hidden="true">{pad(items.length)}</span>
      </div>
    </>
  );
}
