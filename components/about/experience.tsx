"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { onScrollFrame } from "@/lib/scroll-progress";
import { SectionTitle } from "@/components/case/title";

type Copy = Dictionary["aboutPage"]["experience"];

/** Experience, told as growth. The title runs across the column, then a
 *  35 / 65 split: the left column stays put and keeps score (range, the
 *  active chapter's year as a large outlined number, the stage of the work it
 *  stands for, and the evolution rail), while the chapters scroll past on
 *  the right. Whichever chapter is nearest the middle of the screen is the
 *  active one: full strength, the others dimmed. The stage is rewritten as
 *  the chapters change: the old word leaves upward under its mask and the new
 *  one rises in. On a phone the left column is just the range, and each
 *  chapter carries its stage above its name. */
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
    <section id="experience" className="relative px-6 pt-[14vh] md:px-[var(--case-pad)] md:pt-[18vh]">
      <SectionTitle>{copy.label}</SectionTitle>

      <div className="md:grid md:grid-cols-[minmax(0,0.35fr)_minmax(0,0.65fr)] md:gap-[4vw]">
        <aside className="mt-6 md:sticky md:top-0 md:mt-0 md:flex md:h-[100svh] md:flex-col md:justify-center">
          <p className="font-mono text-[13px] uppercase tracking-[0.2em] text-ink/60">{copy.range}</p>

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

          {/* The active chapter's stage, rewritten under a mask. */}
          <p aria-hidden="true" className="mt-4 hidden overflow-hidden pb-[0.08em] md:mt-6 md:grid">
            {copy.chapters.map((chapter, i) => (
              <span
                key={chapter.company}
                className={`ab-stage col-start-1 row-start-1 text-[clamp(28px,2.6vw,44px)] font-bold leading-[1.05] tracking-[-0.02em] text-ink ${
                  i === active ? "is-on" : i < active ? "is-past" : ""
                }`}
              >
                {chapter.stage}
              </span>
            ))}
          </p>

          {/* The evolution rail: one stop per chapter with its stage beside
              it; the active one is lit and longer, the ones behind it stay
              half lit, so the rail reads as a climb. */}
          <p className="mt-10 hidden font-mono text-[11px] uppercase tracking-[0.2em] text-ink/45 md:block">
            {copy.growth}
          </p>
          <ol aria-hidden="true" className="mt-4 hidden flex-col gap-2.5 md:flex">
            {copy.chapters.map((chapter, i) => (
              <li
                key={chapter.company}
                className={`flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.18em] transition-colors duration-500 ease-[var(--ease-soft)] ${
                  i === active ? "text-ink" : i < active ? "text-ink/55" : "text-ink/25"
                }`}
              >
                <span
                  className={`h-px transition-all duration-500 ease-[var(--ease-soft)] ${
                    i === active ? "w-14 bg-ink" : i < active ? "w-6 bg-white/50" : "w-6 bg-white/20"
                  }`}
                />
                {chapter.stage}
              </li>
            ))}
          </ol>
        </aside>

        <ol ref={listRef} className="mt-12 pb-[10vh] md:mt-0 md:pb-[14vh]">
          {copy.chapters.map((chapter, i) => {
            const [role, mode] = chapter.role;
            return (
              <li
                key={chapter.company}
                data-on={i === active ? "true" : undefined}
                className="ab-chapter flex flex-col justify-center border-t border-white/10 py-12 first:border-t-0 md:min-h-[72vh] md:py-0"
              >
                <p className="font-mono text-[12px] tracking-[0.2em] text-ink/60">
                  {chapter.years}
                  {/* Phone: the stage rides with the chapter. */}
                  <span className="cs-accent ml-4 uppercase md:hidden">{chapter.stage}</span>
                </p>
                <p className="mt-4 flex flex-wrap gap-x-4 font-mono text-[12px] uppercase tracking-[0.2em] md:text-[13px]">
                  <span className="text-ink">{role}</span>
                  <span className="text-ink/50">{mode}</span>
                </p>
                <h3 className="mt-3 text-[clamp(40px,5.6vw,104px)] font-bold leading-[0.98] tracking-[-0.035em] text-ink">
                  {chapter.company}
                </h3>
                <p className="mt-6 max-w-[34rem] text-[17px] leading-relaxed text-ink/70 md:mt-8 md:text-[clamp(17px,1.35vw,21px)]">
                  {chapter.note}
                </p>
                <ul className="mt-6 flex max-w-[40rem] flex-wrap gap-2.5 md:mt-8">
                  {chapter.tags.map((tag, k) => (
                    <li
                      key={tag}
                      style={{ "--c": k } as React.CSSProperties}
                      className="ab-tag rounded-[20px] border border-white/15 bg-white/[0.03] px-4 py-2 text-[14px] leading-[1.3] text-ink/90 md:text-[15px]"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
