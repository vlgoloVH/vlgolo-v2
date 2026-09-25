import type { Dictionary } from "@/lib/dictionaries";
import { SectionTitle } from "@/components/case/title";
import { Words } from "@/components/about/words";

/** At a glance, in the hand of a case's Reflection: the title, then the four
 *  numbers from the current site side by side, each under its rule with its
 *  label, a large outlined figure and a line that lights up word by word as
 *  it is read. They rise in one after another as the row comes up; under the
 *  pointer one comes forward, its figure filling with colour from the bottom
 *  and its rule lighting, while the others step back. On a touch screen the
 *  figures fill as the row arrives. Two by two on a tablet, stacked on a
 *  phone. */
export function AboutGlance({ copy }: { copy: Dictionary["aboutPage"]["glance"] }) {
  return (
    <section id="glance" className="relative px-6 py-[var(--section-y)] md:px-[var(--case-pad)]">
      <SectionTitle>{copy.label}</SectionTitle>

      <ol data-p className="cs-insights mt-12 grid gap-12 sm:grid-cols-2 md:mt-[9vh] lg:grid-cols-4 md:gap-[3vw]">
        {copy.items.map((item, i) => (
          <li key={item.label} className="cs-insight relative pt-8" style={{ "--i": i } as React.CSSProperties}>
            <span aria-hidden="true" className="cs-insight-rule absolute inset-x-0 top-0 h-px" />
            <p className="flex gap-3 font-mono text-[12px] uppercase tracking-[0.2em] text-ink/55">
              <span>{String(i + 1).padStart(2, "0")}</span>
              {item.label}
            </p>
            <p className="mt-6 grid text-[64px] font-bold leading-[0.9] tracking-[-0.05em] md:text-[clamp(56px,5.4vw,104px)]">
              <span className="cs-outline col-start-1 row-start-1">{item.value}</span>
              <span aria-hidden="true" className="cs-insight-fill col-start-1 row-start-1">{item.value}</span>
            </p>
            <p className="mt-8 text-[18px] font-medium leading-[1.45] tracking-[-0.01em] text-ink md:text-[clamp(17px,1.3vw,21px)]">
              <Words text={item.body} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
