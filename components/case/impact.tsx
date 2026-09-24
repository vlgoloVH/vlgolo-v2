"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/cases/types";
import { prefersReducedMotion } from "@/lib/scroll-progress";
import { SectionTitle } from "@/components/case/title";

/** A figure that counts up from zero once, when it first comes into view,
 *  keeping what follows the number ("+", "M+", "%", "nd"). A figure with no
 *  number in front ("Global") simply shows. */
function Figure({ value, start, delay }: { value: string; start: boolean; delay: number }) {
  const match = value.match(/^(\d+)(.*)$/);
  const [shown, setShown] = useState(match ? `0${match[2]}` : value);

  useEffect(() => {
    if (!start || !match) return;
    const target = Number(match[1]);
    if (prefersReducedMotion()) {
      setShown(value);
      return;
    }
    let raf = 0;
    const t0 = performance.now() + delay;
    const tick = (now: number) => {
      const t = Math.min(Math.max((now - t0) / 1400, 0), 1);
      const eased = 1 - Math.pow(1 - t, 4);
      setShown(`${Math.round(target * eased)}${match[2]}`);
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // match is derived from value.
  }, [start, value, delay]);

  return (
    <>
      <span className="sr-only">{value}</span>
      <span aria-hidden="true" className="tabular-nums">
        {shown}
      </span>
    </>
  );
}

/** Impact on one screen: the title, then every figure side by side. As the
 *  row comes up each cell's rule draws across, its figure rises and counts
 *  up, one cell after another. Under the pointer a cell lights from where
 *  the pointer is, in the case's colour, and its figure leans towards it. */
export function CaseImpact({
  labels,
  impact,
}: {
  labels: Dictionary["caseStudy"]["impact"];
  impact: CaseStudy["impact"];
}) {
  const { items } = impact;
  const list = useRef<HTMLOListElement>(null);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const el = list.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setStart(true);
        io.disconnect();
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const light = (e: React.PointerEvent<HTMLLIElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
    e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
    e.currentTarget.style.setProperty("--lx", (((e.clientX - r.left) / r.width) * 2 - 1).toFixed(3));
  };

  return (
    <section id="impact" className="relative px-6 py-[14vh] md:px-[var(--case-pad)] md:py-[18vh]">
      <SectionTitle>{labels.label}</SectionTitle>

      <ol
        ref={list}
        className={`cs-impact relative mt-12 grid sm:grid-cols-2 md:mt-[9vh] ${start ? "is-on" : ""}`}
        style={{ "--n": items.length } as React.CSSProperties}
      >
        {items.map((item, i) => (
          <li
            key={item.label}
            onPointerMove={light}
            className="cs-impact-item group relative overflow-hidden py-8 md:pb-10 md:pr-[2.4vw] md:pt-9"
            style={{ "--i": i } as React.CSSProperties}
          >
            <span aria-hidden="true" className="cs-impact-rule absolute inset-x-0 top-0 h-px bg-white/20" />
            <span aria-hidden="true" className="cs-impact-light pointer-events-none absolute inset-0" />
            <p className="cs-impact-figure relative text-[clamp(56px,16vw,88px)] font-bold leading-[0.9] tracking-[-0.05em] text-ink md:text-[clamp(56px,5.6vw,108px)]">
              <Figure value={item.value} start={start} delay={i * 160} />
            </p>
            <p className="relative mt-6 font-mono text-[12px] uppercase tracking-[0.2em] text-ink">{item.label}</p>
            <p className="relative mt-3 max-w-[22rem] text-[16px] leading-[1.55] text-ink/65 md:text-[17px]">{item.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
