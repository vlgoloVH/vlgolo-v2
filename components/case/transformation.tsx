"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/cases/types";
import { onScrollFrame } from "@/lib/scroll-progress";
import { SectionTitle } from "@/components/case/title";
import { Words } from "@/components/about/words";

/** Product Transformation: the section's name, the line from the current site
 *  that frames it and an index of the chapters to jump to, then the chapters
 *  as one continuous block, as on the current site. The words scroll on the
 *  left, a chapter to a screen; on the right one pinned frame holds the
 *  chapter being read and crossfades to the next as its words take over. The
 *  chapter in the frame is lit, the others rest dimmed. On a phone each
 *  chapter carries its own picture. */
export function CaseTransformation({
  labels,
  overview,
  chapters,
}: {
  labels: Dictionary["caseStudy"]["transformation"];
  overview: CaseStudy["overview"];
  chapters: CaseStudy["chapters"];
}) {
  const [first, ...rest] = labels.label.split(" ");
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLElement | null)[]>([]);

  useEffect(
    () =>
      onScrollFrame(() => {
        const line = window.innerHeight * 0.5;
        let current = 0;
        refs.current.forEach((el, i) => {
          if (el && el.getBoundingClientRect().top <= line) current = i;
        });
        setActive(current);
      }),
    [],
  );

  return (
    <section id="transformation" className="relative">
      <header className="relative px-6 pb-[6vh] pt-[16vh] md:px-[var(--case-pad)] md:pt-[20vh]">
        <SectionTitle>{`${first}\n${rest.join(" ")}`}</SectionTitle>
        <div className="mt-12 grid gap-12 md:mt-[8vh] md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:gap-[5vw]">
          <p className="max-w-[18em] text-[clamp(28px,3vw,54px)] font-bold leading-[1.05] tracking-[-0.035em] text-ink">
            <Words text={overview.tagline} />
          </p>
          <ol className="self-end border-t border-white/12">
            {chapters.map((chapter, i) => (
              <li key={chapter.name} className="border-b border-white/12">
                <a
                  href={`#chapter-${i + 1}`}
                  className="group flex items-baseline gap-5 py-4 text-[16px] text-ink/65 transition-colors duration-300 can-hover:text-ink md:text-[18px]"
                >
                  <span className="font-mono text-[12px] tracking-[0.2em] text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="transition-transform duration-500 ease-[var(--ease-soft)] group-can-hover:translate-x-2">
                    {chapter.name}
                  </span>
                  <span aria-hidden="true" className="ml-auto text-ink/35 transition-transform duration-500 group-can-hover:translate-y-0.5">
                    ↓
                  </span>
                </a>
              </li>
            ))}
          </ol>
        </div>
      </header>

      <div className="grid gap-[4vw] px-6 pb-[10vh] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:px-[var(--case-pad)] md:pb-[14vh]">
        <div>
          {chapters.map((chapter, i) => (
            <article
              key={chapter.name}
              id={`chapter-${i + 1}`}
              ref={(el) => {
                refs.current[i] = el;
              }}
              className={`cs-chapter flex flex-col justify-center py-[8vh] md:min-h-[100svh] md:py-[12vh] ${i === active ? "is-on" : ""}`}
            >
              <p className="cs-accent font-mono text-[12px] uppercase tracking-[0.22em]">{chapter.name}</p>
              <h3 className="mt-5 max-w-[14em] text-[clamp(30px,3.2vw,60px)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
                {chapter.title}
              </h3>
              <p className="mt-6 max-w-[36rem] text-[17px] leading-[1.7] text-ink/70 md:mt-7 md:text-[18px]">
                {chapter.description}
              </p>
              <ul className="mt-8 flex max-w-[36rem] flex-col border-t border-white/10 md:mt-10">
                {chapter.points.map((point) => (
                  <li key={point} className="flex gap-4 border-b border-white/10 py-4 text-[16px] leading-[1.45] text-ink md:text-[17px]">
                    <span aria-hidden="true" className="cs-accent shrink-0">→</span>
                    {point}
                  </li>
                ))}
              </ul>
              {/* Phone: the chapter's picture right under its words. */}
              <div className="mt-10 overflow-hidden rounded-[12px] md:hidden">
                <Image src={chapter.visual} alt={chapter.title} width={1200} height={1440} sizes="90vw" className="h-auto w-full" />
              </div>
            </article>
          ))}
        </div>

        {/* Desktop: one frame, pinned, crossfading between the chapters. */}
        <div className="hidden md:block">
          <div className="sticky top-0 flex h-[100svh] items-center">
            <div className="relative h-[76svh] w-full overflow-hidden rounded-[clamp(12px,1.2vw,20px)] bg-white/[0.03]">
              {chapters.map((chapter, i) => (
                <div key={chapter.name} aria-hidden={i !== active} className={`cs-chapter-visual absolute inset-0 ${i === active ? "is-on" : ""}`}>
                  <Image
                    src={chapter.visual}
                    alt={chapter.title}
                    fill
                    sizes="(min-width: 768px) 42vw, 90vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
