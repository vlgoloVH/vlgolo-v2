import type { Dictionary } from "@/lib/dictionaries";
import { SectionTitle } from "@/components/case/title";

/** The product design stack: six groups of tools in three columns, each a
 *  set of chips that come in one after another as its row reaches the
 *  screen, the same way a case lays out what I owned and who I worked with. */
export function AboutStack({ copy }: { copy: Dictionary["aboutPage"]["stack"] }) {
  return (
    <section id="stack" className="relative px-6 py-[var(--section-y)] md:px-[var(--case-pad)]">
      <SectionTitle>{copy.label}</SectionTitle>

      <div className="mt-12 grid gap-x-[3vw] gap-y-12 border-t border-white/12 pt-10 sm:grid-cols-2 md:mt-[9vh] md:grid-cols-3 md:gap-y-[7vh]">
        {copy.groups.map((group, g) => (
          <div key={group.title} data-p className="cs-chips" style={{ "--g": g % 3 } as React.CSSProperties}>
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-ink/55">{group.title}</p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {group.items.map((item, i) => (
                <li
                  key={item}
                  className="cs-chip rounded-[20px] border border-white/15 bg-white/[0.03] px-4 py-2 text-[15px] leading-[1.3] text-ink/90 md:text-[16px]"
                  style={{ "--c": i } as React.CSSProperties}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
