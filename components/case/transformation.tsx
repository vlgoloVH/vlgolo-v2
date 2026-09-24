"use client";

import Image from "next/image";
import { Fragment, useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/cases/types";
import { onScrollFrame, prefersReducedMotion } from "@/lib/scroll-progress";
import { SectionTitle } from "@/components/case/title";

/** Product Transformation: the section's name, then the chapters as one
 *  continuous block, as on the current site. The words scroll on the left, a
 *  chapter to a screen; on the right one pinned frame holds the chapter being
 *  read.
 *
 *  The frame and the words move together. Each chapter's own progress
 *  (--cp, 0 → 1 while it passes the middle of the screen) lights its points
 *  one after another and fills that chapter's segment of the bar along the
 *  frame. A new chapter's title rises word by word out of its mask, and its
 *  picture wipes up over the last one, settling from a slight zoom, then
 *  drifts gently while the chapter is read. Under the pointer the frame tilts
 *  towards it. On a phone each chapter carries its own picture. */
export function CaseTransformation({
  labels,
  chapters,
}: {
  labels: Dictionary["caseStudy"]["transformation"];
  chapters: CaseStudy["chapters"];
}) {
  const [first, ...rest] = labels.label.split(" ");
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const frame = useRef<HTMLDivElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    return onScrollFrame(() => {
      const line = window.innerHeight * 0.5;
      let current = 0;
      refs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        if (rect.top <= line) current = i;
        const p = reduced ? 1 : Math.min(Math.max((line - rect.top) / rect.height, 0), 1);
        el.style.setProperty("--cp", p.toFixed(4));
        bars.current[i]?.style.setProperty("--cp", p.toFixed(4));
        if (i === current) frame.current?.style.setProperty("--cp", p.toFixed(4));
      });
      setActive(current);
    });
  }, []);

  /** The frame leans a few degrees towards the pointer. */
  const tilt = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== "mouse" || prefersReducedMotion()) return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--tx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
    e.currentTarget.style.setProperty("--ty", (((e.clientY - r.top) / r.height) * 2 - 1).toFixed(3));
  };
  const untilt = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.style.setProperty("--tx", "0");
    e.currentTarget.style.setProperty("--ty", "0");
  };

  return (
    <section id="transformation" className="relative">
      <header className="relative px-6 pt-[16vh] md:px-[var(--case-pad)] md:pt-[20vh]">
        <SectionTitle>{`${first}\n${rest.join(" ")}`}</SectionTitle>
      </header>

      <div className="grid gap-[4vw] px-6 pb-[10vh] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:px-[var(--case-pad)] md:pb-[14vh]">
        <div>
          {chapters.map((chapter, i) => {
            const n = chapter.points.length;
            return (
              <article
                key={chapter.name}
                id={`chapter-${i + 1}`}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className={`cs-chapter flex flex-col justify-center py-[8vh] md:min-h-[100svh] md:py-[12vh] ${
                  i === active ? "is-on" : ""
                } ${i <= active ? "is-seen" : ""}`}
                style={{ "--n": n } as React.CSSProperties}
              >
                <p className="cs-accent font-mono text-[12px] uppercase tracking-[0.22em]">{chapter.name}</p>
                <h3
                  aria-label={chapter.title}
                  className="mt-5 max-w-[14em] text-[clamp(30px,3.2vw,60px)] font-bold leading-[1.04] tracking-[-0.035em] text-ink"
                >
                  {chapter.title.split(" ").map((word, w) => (
                    <Fragment key={w}>
                      <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.08em] align-top">
                        <span className="cs-chapter-word inline-block" style={{ "--w": w } as React.CSSProperties}>
                          {word}
                        </span>
                      </span>{" "}
                    </Fragment>
                  ))}
                </h3>
                <p className="mt-6 max-w-[36rem] text-[17px] leading-[1.7] text-ink/70 md:mt-7 md:text-[18px]">
                  {chapter.description}
                </p>
                <ul className="mt-8 flex max-w-[36rem] flex-col gap-1 md:mt-10">
                  {chapter.points.map((point, k) => (
                    <li
                      key={point}
                      className="cs-chapter-point flex items-baseline gap-4 py-2 text-[16px] leading-[1.45] text-ink md:text-[17px]"
                      style={{ "--pi": k } as React.CSSProperties}
                    >
                      <span aria-hidden="true" className="cs-chapter-mark relative top-[-0.2em] h-[7px] w-[7px] shrink-0 rounded-[2px]" />
                      {point}
                    </li>
                  ))}
                </ul>
                {/* Phone: the chapter's picture right under its words. */}
                <div className="mt-10 overflow-hidden rounded-[12px] md:hidden">
                  <Image src={chapter.visual} alt={chapter.title} width={1200} height={1440} sizes="90vw" className="h-auto w-full" />
                </div>
              </article>
            );
          })}
        </div>

        {/* Desktop: one frame, pinned. */}
        <div className="hidden md:block">
          <div className="sticky top-0 flex h-[100svh] flex-col justify-center">
            <div ref={frame} onPointerMove={tilt} onPointerLeave={untilt} className="cs-frame relative h-[72svh] w-full">
              <div className="cs-frame-inner relative h-full w-full overflow-hidden rounded-[clamp(12px,1.2vw,20px)] bg-white/[0.03]">
                {chapters.map((chapter, i) => (
                  <div
                    key={chapter.name}
                    aria-hidden={i !== active}
                    className={`cs-frame-layer absolute inset-0 ${i <= active ? "is-in" : ""}`}
                    style={{ zIndex: i + 1 }}
                  >
                    <Image
                      src={chapter.visual}
                      alt={chapter.title}
                      fill
                      sizes="(min-width: 768px) 42vw, 90vw"
                      className="cs-frame-img object-cover"
                    />
                  </div>
                ))}
                <span aria-hidden="true" className="absolute inset-x-0 bottom-0 z-[20] h-28 bg-gradient-to-t from-black/60 to-transparent" />
                <div aria-hidden="true" className="absolute inset-x-5 bottom-5 z-[21] grid">
                  {chapters.map((chapter, i) => (
                    <span
                      key={chapter.name}
                      className={`cs-frame-name col-start-1 row-start-1 font-mono text-[12px] uppercase tracking-[0.2em] text-ink ${
                        i === active ? "is-on" : ""
                      }`}
                    >
                      {chapter.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            {/* One segment per chapter, filling while it is read. */}
            <div aria-hidden="true" className="mt-5 flex gap-2">
              {chapters.map((chapter, i) => (
                <span key={chapter.name} className="h-[2px] flex-1 overflow-hidden bg-white/15">
                  <span
                    ref={(el) => {
                      bars.current[i] = el;
                    }}
                    className="cs-frame-bar block h-full origin-left"
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
