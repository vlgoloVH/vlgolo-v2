import type { Dictionary } from "@/lib/dictionaries";
import { SectionTitle } from "@/components/case/title";

/** Reflection, the quietest part of the page: the title and all three
 *  insights at once, side by side, each under its outlined number. They rise
 *  in one after another as the row comes up. No cards, no colour, just the
 *  thought. On a phone they stack. */
export function CaseReflection({
  labels,
  insights,
}: {
  labels: Dictionary["caseStudy"]["reflection"];
  insights: string[];
}) {
  return (
    <section id="reflection" className="relative px-6 py-[14vh] md:flex md:min-h-[100svh] md:flex-col md:justify-center md:px-[var(--case-pad)] md:py-[14vh]">
      <SectionTitle>{labels.label}</SectionTitle>
      <ol data-p className="mt-12 grid gap-12 md:mt-[9vh] md:grid-cols-3 md:gap-[3vw]">
        {insights.map((insight, i) => (
          <li key={i} className="cs-insight border-t border-white/15 pt-8" style={{ "--i": i } as React.CSSProperties}>
            <p className="cs-outline text-[56px] font-bold leading-[0.8] tracking-[-0.05em] md:text-[clamp(56px,5vw,96px)]">
              {String(i + 1).padStart(2, "0")}
            </p>
            <p className="mt-8 text-[21px] font-medium leading-[1.35] tracking-[-0.015em] text-ink md:text-[clamp(20px,1.55vw,26px)]">
              {insight}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
