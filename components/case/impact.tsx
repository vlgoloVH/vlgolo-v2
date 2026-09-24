import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/cases/types";
import { SectionTitle } from "@/components/case/title";

/** Impact on one screen: the title, then every figure side by side, each with
 *  its label and a line on what it means. The figures rise in one after
 *  another as the row comes up, over a soft wash of the case's colour. */
export function CaseImpact({
  labels,
  impact,
}: {
  labels: Dictionary["caseStudy"]["impact"];
  impact: CaseStudy["impact"];
}) {
  const { items } = impact;
  return (
    <section id="impact" className="relative overflow-hidden px-6 py-[14vh] md:px-[var(--case-pad)] md:py-[18vh]">
      <div aria-hidden="true" className="cs-impact-bg pointer-events-none absolute inset-0" />
      <SectionTitle className="relative">{labels.label}</SectionTitle>

      <ol
        data-p
        className="cs-impact relative mt-12 grid gap-x-[3vw] sm:grid-cols-2 md:mt-[9vh]"
        style={{ "--n": items.length } as React.CSSProperties}
      >
        {items.map((item, i) => (
          <li
            key={item.label}
            className="cs-impact-item border-t border-white/15 py-8 md:py-0 md:pt-8"
            style={{ "--i": i } as React.CSSProperties}
          >
            <p className="text-[clamp(56px,16vw,88px)] font-bold leading-[0.9] tracking-[-0.05em] text-ink md:text-[clamp(56px,5.6vw,108px)]">
              {item.value}
            </p>
            <p className="mt-6 font-mono text-[12px] uppercase tracking-[0.2em] text-ink">{item.label}</p>
            <p className="mt-3 max-w-[22rem] text-[16px] leading-[1.55] text-ink/65 md:text-[17px]">{item.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
