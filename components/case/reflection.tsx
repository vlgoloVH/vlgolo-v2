import type { Dictionary } from "@/lib/dictionaries";
import { SectionTitle } from "@/components/case/title";
import { Words } from "@/components/about/words";

/** Reflection, the quietest part of the page: the title and all three
 *  insights at once, side by side. They rise in one after another as the row
 *  comes up and their words light up as they are read. Under the pointer an
 *  insight comes forward: its outlined number fills with the case's colour
 *  from the bottom, its rule lights, and the other two step back. On a touch
 *  screen the numbers fill as the row arrives. On a phone they stack. */
export function CaseReflection({
  labels,
  insights,
}: {
  labels: Dictionary["caseStudy"]["reflection"];
  insights: string[];
}) {
  return (
    <section id="reflection" className="relative px-6 py-[var(--section-y)] md:px-[var(--case-pad)]">
      <SectionTitle>{labels.label}</SectionTitle>
      <ol data-p className="cs-insights mt-12 grid gap-12 md:mt-[9vh] md:grid-cols-3 md:gap-[3vw]">
        {insights.map((insight, i) => (
          <li key={i} className="cs-insight relative pt-8" style={{ "--i": i } as React.CSSProperties}>
            <span aria-hidden="true" className="cs-insight-rule absolute inset-x-0 top-0 h-px" />
            <p aria-hidden="true" className="grid text-[56px] font-bold leading-[0.9] tracking-[-0.05em] md:text-[clamp(56px,5vw,96px)]">
              <span className="cs-outline col-start-1 row-start-1">{String(i + 1).padStart(2, "0")}</span>
              <span className="cs-insight-fill col-start-1 row-start-1">{String(i + 1).padStart(2, "0")}</span>
            </p>
            <p className="mt-8 text-[21px] font-medium leading-[1.35] tracking-[-0.015em] text-ink md:text-[clamp(20px,1.55vw,26px)]">
              <Words text={insight} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
