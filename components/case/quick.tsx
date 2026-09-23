import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/cases/types";

type Labels = Dictionary["caseStudy"]["quick"];

/** Where each of the four answers starts before the grid pulls together. */
const SCATTER = [
  [-6, 5, -2],
  [7, -4, 2],
  [-4, -6, 1.5],
  [5, 7, -1.5],
];

/** Project in 30 seconds: the one screen a recruiter needs. The lead line on
 *  the left; on the right four short answers that drift in slightly out of
 *  place and pull into a clean grid as the section arrives. */
export function CaseQuick({ labels, summary }: { labels: Labels; summary: CaseStudy["summary"] }) {
  const rows: [string, string][] = [
    [labels.product, summary.product],
    [labels.problem, summary.problem],
    [labels.role, summary.role],
    [labels.result, summary.result],
  ];

  return (
    <section data-p className="relative px-6 py-[14vh] md:px-[var(--frame-pad)] md:py-[18vh]">
      <p className="ab-label">{labels.label}</p>
      <div className="mt-10 grid gap-14 md:mt-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.25fr)] md:gap-[6vw]">
        <p className="text-[clamp(34px,4.2vw,76px)] font-bold leading-[1.02] tracking-[-0.035em] text-ink">
          {summary.lead}
        </p>
        <dl className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
          {rows.map(([term, text], i) => (
            <div
              key={term}
              className="cs-quick border-t border-white/15 pt-6"
              style={
                {
                  "--dx": SCATTER[i][0],
                  "--dy": SCATTER[i][1],
                  "--dr": `${SCATTER[i][2]}deg`,
                  "--i": i,
                } as React.CSSProperties
              }
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink/50">{term}</dt>
              <dd className="mt-4 text-[17px] leading-[1.6] text-ink/85 md:text-[18px]">{text}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
