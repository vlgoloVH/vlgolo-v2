import type { Dictionary } from "@/lib/dictionaries";
import { SectionTitle } from "@/components/case/title";

/** At a glance: four short statements about the profile, set as large
 *  outlined words the way a case closes on its insights. They rise in one
 *  after another as the grid comes up; under the pointer one comes forward,
 *  its outline filling from the bottom while the others step back. On a touch
 *  screen they fill as the grid arrives. Two by two, since the statements are
 *  words rather than figures. */
export function AboutGlance({ copy }: { copy: Dictionary["aboutPage"]["glance"] }) {
  return (
    <section id="glance" className="relative px-6 py-[10vh] md:px-[var(--case-pad)] md:py-[14vh]">
      <SectionTitle>{copy.label}</SectionTitle>

      <ol data-p className="cs-insights mt-12 grid gap-12 md:mt-[9vh] md:grid-cols-2 md:gap-x-[5vw] md:gap-y-[8vh]">
        {copy.items.map((item, i) => (
          <li key={item.label} className="cs-insight relative pt-8" style={{ "--i": i } as React.CSSProperties}>
            <span aria-hidden="true" className="cs-insight-rule absolute inset-x-0 top-0 h-px" />
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-ink/55">{item.label}</p>
            <p className="mt-6 grid whitespace-nowrap text-[40px] font-bold leading-[0.95] tracking-[-0.045em] md:text-[clamp(44px,4.2vw,80px)]">
              <span className="cs-outline col-start-1 row-start-1">{item.value}</span>
              <span aria-hidden="true" className="cs-insight-fill col-start-1 row-start-1">{item.value}</span>
            </p>
            <p className="mt-6 max-w-[30rem] text-[16px] leading-[1.6] text-ink/65 md:text-[clamp(15px,1.1vw,17px)]">{item.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
