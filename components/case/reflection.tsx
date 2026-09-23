"use client";

import type { Dictionary } from "@/lib/dictionaries";
import { Track } from "@/components/case/track";
import { Label } from "@/components/case/label";

/** Reflection, one insight at a time: pinned on desktop, the active insight
 *  at full strength and the others faint. On a phone they simply stack. */
export function CaseReflection({
  labels,
  insights,
}: {
  labels: Dictionary["caseStudy"]["reflection"];
  insights: string[];
}) {
  return (
    <Track steps={insights.length} className="relative md:h-[260vh]">
      {(active) => (
        <div className="relative px-6 py-[14vh] md:sticky md:top-0 md:flex md:h-[100svh] md:items-center md:px-[var(--frame-pad)] md:py-0">
          <div className="grid w-full gap-10 md:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] md:gap-[5vw]">
            <div>
              <Label index={8}>{labels.label}</Label>
              <h2 className="mt-8 text-[clamp(30px,3vw,52px)] font-bold leading-[1.05] tracking-[-0.03em] text-ink">
                {labels.heading}
              </h2>
            </div>
            <ol className="flex flex-col gap-8 md:gap-[4vh]">
              {insights.map((insight, i) => (
                <li
                  key={insight.slice(0, 24)}
                  className={`cs-insight flex gap-6 text-[clamp(22px,2.2vw,38px)] font-medium leading-[1.25] tracking-[-0.02em] text-ink ${
                    i === active ? "is-on" : ""
                  }`}
                >
                  <span className="mt-[0.5em] font-mono text-[12px] tracking-[0.2em] text-ink/50">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {insight}
                </li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </Track>
  );
}
