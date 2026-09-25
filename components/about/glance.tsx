import type { Dictionary } from "@/lib/dictionaries";
import { SectionTitle } from "@/components/case/title";
import { Words } from "@/components/about/words";

/** At a glance, in the hand of a case's Reflection turned on its side: where
 *  Reflection sets three insights in a row under big outlined numbers, this
 *  runs four statements down the page as rows. Each row has the statement as
 *  a large outlined word on the left and what it means on the right, lighting
 *  up word by word. The rows rise in one after another; under the pointer one
 *  comes forward, its outline filling with colour from the bottom and its
 *  rule lighting, while the others step back. On a touch screen the words
 *  fill as the rows arrive. On a phone each row stacks. */
export function AboutGlance({ copy }: { copy: Dictionary["aboutPage"]["glance"] }) {
  return (
    <section id="glance" className="relative px-6 py-[10vh] md:flex md:min-h-[100svh] md:flex-col md:justify-center md:px-[var(--case-pad)] md:py-[14vh]">
      <SectionTitle>{copy.label}</SectionTitle>

      <ol data-p className="cs-insights mt-12 md:mt-[9vh]">
        {copy.items.map((item, i) => (
          <li
            key={item.label}
            className="cs-insight relative grid gap-5 py-8 md:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] md:items-end md:gap-[5vw] md:py-[4.5vh]"
            style={{ "--i": i } as React.CSSProperties}
          >
            <span aria-hidden="true" className="cs-insight-rule absolute inset-x-0 top-0 h-px" />
            <div>
              <p className="flex gap-3 font-mono text-[12px] uppercase tracking-[0.2em] text-ink/55">
                <span>{String(i + 1).padStart(2, "0")}</span>
                {item.label}
              </p>
              <p className="mt-4 grid whitespace-nowrap text-[40px] font-bold leading-[0.95] tracking-[-0.045em] md:mt-5 md:text-[clamp(40px,4vw,76px)]">
                <span className="cs-outline col-start-1 row-start-1">{item.value}</span>
                <span aria-hidden="true" className="cs-insight-fill col-start-1 row-start-1">{item.value}</span>
              </p>
            </div>
            <p className="max-w-[32rem] text-[18px] font-medium leading-[1.45] tracking-[-0.01em] text-ink md:text-[clamp(17px,1.35vw,22px)]">
              <Words text={item.body} />
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
