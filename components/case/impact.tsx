import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/cases/types";
import { Label } from "@/components/case/label";
import { CountUp } from "@/components/case/count-up";

/** Impact as a run of very large numbers rather than tiles: each number
 *  rises into view through a mask and counts up once, with its label sliding
 *  behind it in outline. Nothing here is added: these are the case's own
 *  figures. */
export function CaseImpact({
  labels,
  impact,
}: {
  labels: Dictionary["caseStudy"]["impact"];
  impact: CaseStudy["impact"];
}) {
  return (
    <section id="impact" className="relative overflow-hidden py-[14vh] md:py-[18vh]">
      <div className="px-6 md:px-[var(--frame-pad)]">
        <Label index={7}>{labels.label}</Label>
      </div>
      <ol className="mt-12 md:mt-16">
        {impact.items.map((item, i) => (
          <li key={item.label} data-p className="relative border-t border-white/10 px-6 py-10 md:px-[var(--frame-pad)] md:py-[6vh]">
            <span
              aria-hidden="true"
              className="ab-slide ab-fragment pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 opacity-60"
              style={{ "--dir": i % 2 ? 1 : -1 } as React.CSSProperties}
            >
              {item.label}
            </span>
            <div className="relative grid gap-4 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:items-end md:gap-[5vw]">
              <p className="overflow-hidden text-[clamp(96px,17vw,320px)] font-bold leading-[0.82] tracking-[-0.055em] text-ink">
                <span className="cs-rise block">
                  <CountUp value={item.value} />
                </span>
              </p>
              <div className="md:pb-[1.2vw]">
                <p className="font-mono text-[12px] uppercase tracking-[0.24em] text-ink">{item.label}</p>
                <p className="mt-4 max-w-[26rem] text-[17px] leading-[1.6] text-ink/65">{item.body}</p>
              </div>
            </div>
          </li>
        ))}
      </ol>
      <p className="mt-[8vh] max-w-[22em] px-6 text-[clamp(24px,2.6vw,44px)] font-medium leading-[1.25] tracking-[-0.02em] text-ink md:px-[var(--frame-pad)]">
        {impact.summary}
      </p>
    </section>
  );
}
