"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { onScrollFrame } from "@/lib/scroll-progress";

type Copy = Dictionary["aboutPage"]["experience"];

/** 04 · Experience. A 35 / 65 split: the left column stays put and keeps
 *  score (range, the active chapter's year as a large outlined number, and a
 *  rail of stops), while the chapters scroll past on the right. Whichever
 *  chapter is nearest the middle of the screen is the active one: full
 *  strength, the others dimmed. On a phone the left column is just a heading
 *  and the chapters stack. */
export function AboutExperience({ copy }: { copy: Copy }) {
  const listRef = useRef<HTMLOListElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const items = [...list.children] as HTMLElement[];
    return onScrollFrame(() => {
      const mid = window.innerHeight / 2;
      let best = 0;
      let bestDistance = Infinity;
      items.forEach((item, i) => {
        const rect = item.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - mid);
        if (distance < bestDistance) {
          bestDistance = distance;
          best = i;
        }
      });
      setActive(best);
    });
  }, []);

  const startYear = (years: string) => years.split(/[–-]/)[0];

  return (
    <section id="experience" data-section className="relative px-6 py-[14vh] md:px-[var(--frame-pad)] md:py-[10vh]">
      <div className="md:grid md:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] md:gap-[4vw]">
        <aside className="md:sticky md:top-0 md:flex md:h-[100svh] md:flex-col md:justify-center">
          <p className="ab-label">
            <span>04</span>
            {copy.label}
          </p>
          <p className="mt-6 font-mono text-[13px] tracking-[0.2em] text-ink/60">{copy.range}</p>

          {/* The active chapter's year, crossfading as the chapters change. */}
          <div aria-hidden="true" className="relative mt-8 hidden h-[clamp(96px,11vw,200px)] md:block">
            {copy.chapters.map((chapter, i) => (
              <span
                key={chapter.company}
                className={`ab-year absolute left-0 top-0 ${i === active ? "is-on" : ""}`}
              >
                {startYear(chapter.years)}
              </span>
            ))}
          </div>

          <p className="mt-4 text-[clamp(28px,2.6vw,44px)] font-bold tracking-[-0.02em] text-ink md:mt-6">
            {copy.years}
          </p>

          {/* One stop per chapter; the active one is lit and longer. */}
          <ol aria-hidden="true" className="mt-10 hidden gap-2 md:flex">
            {copy.chapters.map((chapter, i) => (
              <li
                key={chapter.company}
                className={`h-px transition-all duration-500 ease-[var(--ease-soft)] ${
                  i === active ? "w-14 bg-ink" : "w-6 bg-white/25"
                }`}
              />
            ))}
          </ol>
        </aside>

        <ol ref={listRef} className="mt-14 md:mt-0">
          {copy.chapters.map((chapter, i) => (
            <li
              key={chapter.company}
              data-on={i === active ? "true" : undefined}
              className="ab-chapter flex flex-col justify-center border-t border-white/10 py-12 md:min-h-[72vh] md:py-0"
            >
              <p className="font-mono text-[12px] tracking-[0.2em] text-ink/60">{chapter.years}</p>
              <p className="mt-4 text-[12px] uppercase tracking-[0.2em] text-ink/60 md:text-[13px]">
                {chapter.role}
              </p>
              <h3 className="mt-3 text-[clamp(40px,5.6vw,104px)] font-bold leading-[0.98] tracking-[-0.035em] text-ink">
                {chapter.company}
              </h3>
              <p className="mt-6 max-w-[34rem] text-[18px] leading-relaxed text-ink/70 md:mt-8 md:text-[21px]">
                {chapter.note}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
