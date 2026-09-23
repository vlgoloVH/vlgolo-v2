"use client";

import { useState } from "react";
import type { Dictionary } from "@/lib/dictionaries";
import { ABOUT_PAGE } from "@/lib/site";

type Copy = Dictionary["aboutPage"]["capabilities"];

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

/** One small line drawing per area. Each one changes when its row opens (the
 *  row's data-open drives the stylesheet, see `.ab-icon`). */
function Icon({ index }: { index: number }) {
  if (index === 0)
    // Product thinking: a target that tightens on its centre.
    return (
      <svg viewBox="0 0 64 64" className="ab-icon ab-icon--target" aria-hidden="true">
        <circle cx={32} cy={32} r={24} {...line} />
        <circle className="ab-icon-inner" cx={32} cy={32} r={12} {...line} />
        <g className="ab-icon-cross">
          <line x1={32} y1={2} x2={32} y2={14} {...line} />
          <line x1={32} y1={50} x2={32} y2={62} {...line} />
          <line x1={2} y1={32} x2={14} y2={32} {...line} />
          <line x1={50} y1={32} x2={62} y2={32} {...line} />
        </g>
        <circle cx={32} cy={32} r={2.6} fill="currentColor" />
      </svg>
    );
  if (index === 1)
    // Experience design: three steps, joined by a path that draws in.
    return (
      <svg viewBox="0 0 64 64" className="ab-icon ab-icon--flow" aria-hidden="true">
        <rect x={4} y={8} width={16} height={12} rx={3} {...line} />
        <rect x={24} y={26} width={16} height={12} rx={3} {...line} />
        <rect x={44} y={44} width={16} height={12} rx={3} {...line} />
        <path className="ab-icon-path" d="M12 20 V32 H24 M40 32 H52 V44" {...line} pathLength={1} />
      </svg>
    );
  // Systems & scale: a module that multiplies into a grid.
  return (
    <svg viewBox="0 0 64 64" className="ab-icon ab-icon--grid" aria-hidden="true">
      {Array.from({ length: 9 }, (_, i) => {
        const x = 6 + (i % 3) * 19;
        const y = 6 + Math.floor(i / 3) * 19;
        return (
          <rect
            key={i}
            className={i === 4 ? "ab-icon-core" : "ab-icon-cell"}
            style={{ "--i": i } as React.CSSProperties}
            x={x}
            y={y}
            width={14}
            height={14}
            rx={2.5}
            {...line}
            fill={i === 4 ? "currentColor" : "none"}
          />
        );
      })}
    </svg>
  );
}

/** 06 · Capabilities. Three large rows rather than a wall of tags. A row opens
 *  on hover (with a real pointer) or on tap, showing what sits inside it, and
 *  its drawing changes as it does. The tools follow as one quiet line. */
export function AboutCapabilities({ copy }: { copy: Copy }) {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="capabilities" data-section className="relative px-6 py-[16vh] md:px-[var(--frame-pad)] md:py-[20vh]">
      <p className="ab-label">
        <span>06</span>
        {copy.label}
      </p>

      <ul className="mt-12 border-b border-white/10 md:mt-16">
        {copy.groups.map((group, i) => {
          const isOpen = open === i;
          return (
            <li
              key={group.title}
              data-open={isOpen ? "true" : undefined}
              className="ab-cap border-t border-white/10"
              onPointerEnter={(event) => event.pointerType !== "touch" && setOpen(i)}
              onPointerLeave={(event) => event.pointerType !== "touch" && setOpen(null)}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : i)}
                className="relative flex w-full items-center gap-5 py-7 text-left md:gap-10 md:py-10"
              >
                <span className="w-8 shrink-0 font-mono text-[12px] tracking-[0.2em] text-ink/50">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="ab-cap-title flex-1 text-[clamp(32px,5.4vw,104px)] font-bold leading-[1] tracking-[-0.035em] text-ink">
                  {group.title}
                </span>
                <span className="h-11 w-11 shrink-0 text-ink md:h-16 md:w-16">
                  <Icon index={i} />
                </span>
              </button>

              <div className="ab-cap-panel">
                <div className="overflow-hidden">
                  <ul className="flex flex-wrap gap-x-3 gap-y-2 pb-9 pl-[calc(2rem+1.25rem)] text-[18px] text-ink/70 md:pb-12 md:pl-[calc(2rem+2.5rem)] md:text-[24px]">
                    {group.items.map((item, k) => (
                      <li key={item} className="flex items-center gap-3">
                        {k > 0 && <span aria-hidden="true" className="text-ink/30">·</span>}
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-[14px] text-ink/50">
        <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink/40">
          {copy.toolsLabel}
        </span>
        {ABOUT_PAGE.tools.join(" · ")}
      </p>
    </section>
  );
}
