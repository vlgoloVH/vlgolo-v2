import type { Dictionary } from "@/lib/dictionaries";

/** The numbers, as a row of four, the way a case closes on its insights:
 *  they rise in one after another as the row comes up, and under the pointer
 *  one comes forward, its outlined figure filling from the bottom while the
 *  others step back. On a touch screen the figures fill as the row arrives. */
export function AboutStats({ stats, label }: { stats: Dictionary["aboutPage"]["stats"]; label: string }) {
  return (
    <section id="numbers" aria-label={label} className="relative px-6 py-[10vh] md:px-[var(--case-pad)] md:py-[14vh]">
      <ol data-p className="cs-insights grid gap-12 sm:grid-cols-2 md:grid-cols-4 md:gap-[3vw]">
        {stats.map((stat, i) => (
          <li key={stat.label} className="cs-insight relative pt-8" style={{ "--i": i } as React.CSSProperties}>
            <span aria-hidden="true" className="cs-insight-rule absolute inset-x-0 top-0 h-px" />
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-ink/55">{stat.label}</p>
            <p className="mt-6 grid text-[64px] font-bold leading-[0.9] tracking-[-0.05em] md:text-[clamp(64px,6vw,112px)]">
              <span className="cs-outline col-start-1 row-start-1">{stat.value}</span>
              <span aria-hidden="true" className="cs-insight-fill col-start-1 row-start-1">{stat.value}</span>
            </p>
            <p className="mt-6 text-[16px] leading-[1.6] text-ink/65 md:text-[clamp(15px,1.1vw,17px)]">{stat.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
