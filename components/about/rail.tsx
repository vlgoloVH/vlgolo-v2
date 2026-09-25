"use client";

import { useEffect, useRef, useState } from "react";
import { onScrollFrame } from "@/lib/scroll-progress";

/** The About page's left rail: where the Home sections print their name, this
 *  one follows the reader. It shows the current section's name, and its
 *  number unless told not to, set vertically like the Home rails, over a
 *  hairline that fills with the page. Each stop below it is a link to its section. Desktop only. */
export function AboutRail({
  ids,
  names,
  label,
  numbered = true,
}: {
  ids: readonly string[];
  names: readonly string[];
  label: string;
  /** Print the section's number above its name. */
  numbered?: boolean;
}) {
  const [active, setActive] = useState(0);
  const fillRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const sections = ids.map((id) => document.getElementById(id));
    return onScrollFrame(() => {
      const line = window.innerHeight * 0.45;
      let current = 0;
      sections.forEach((section, i) => {
        if (section && section.getBoundingClientRect().top <= line) current = i;
      });
      setActive(current);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (fillRef.current) fillRef.current.style.transform = `scaleY(${max > 0 ? window.scrollY / max : 0})`;
    });
  }, [ids]);

  return (
    <nav
      aria-label={label}
      className="ab-rail-in fixed left-0 top-1/2 z-40 hidden w-[var(--frame-line)] -translate-y-1/2 flex-col items-center gap-6 md:flex"
    >
      {numbered && (
        <span className="font-mono text-[11px] tracking-[0.2em] text-ink">{String(active + 1).padStart(2, "0")}</span>
      )}
      {/* Tall enough for the longest name ("Transformation") on one line. */}
      <span className="relative grid h-[17rem] place-items-start justify-center overflow-hidden">
        {names.map((name, i) => (
          <span
            key={name}
            aria-hidden={i !== active}
            className={`ab-rail-name col-start-1 row-start-1 whitespace-nowrap text-[13px] uppercase tracking-[0.34em] text-ink/60 [text-orientation:upright] [writing-mode:vertical-rl] ${
              i === active ? "is-on" : ""
            }`}
          >
            {name}
          </span>
        ))}
      </span>
      <span aria-hidden="true" className="relative h-16 w-px overflow-hidden bg-white/15">
        <span ref={fillRef} className="absolute inset-0 origin-top scale-y-0 bg-white/80" />
      </span>
      <ol className="flex flex-col items-center gap-2.5">
        {ids.map((id, i) => (
          <li key={id}>
            <a
              href={`#${id}`}
              aria-label={names[i]}
              aria-current={i === active ? "true" : undefined}
              className={`block h-px transition-all duration-500 ease-[var(--ease-soft)] ${
                i === active ? "w-5 bg-ink" : "w-2.5 bg-white/30 can-hover:bg-white/70"
              }`}
            />
          </li>
        ))}
      </ol>
    </nav>
  );
}
