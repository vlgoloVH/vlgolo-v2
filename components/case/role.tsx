import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/cases/types";
import { SectionTitle } from "@/components/case/title";
import { Words } from "@/components/about/words";

/** My Role: the title and the role itself on the left, the story of the role
 *  on the right, lighting up word by word. Below, across the whole column,
 *  what I owned, who I worked with and how I worked, each as a set of chips
 *  that come in one after another as the row reaches the screen. */
export function CaseRole({
  labels,
  role,
}: {
  labels: Dictionary["caseStudy"]["role"];
  role: CaseStudy["role"];
}) {
  const groups = [
    { name: labels.owned, items: role.owned },
    { name: labels.withWhom, items: role.withWhom },
    { name: labels.howIWorked, items: role.howIWorked },
  ];

  return (
    <section id="role" className="relative px-6 py-[10vh] md:px-[var(--case-pad)] md:py-[18vh]">
      <div className="grid gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-[6vw]">
        <div>
          <SectionTitle>{labels.label}</SectionTitle>
          <p className="mt-8 inline-flex items-center gap-3 rounded-full border border-white/20 px-5 py-2.5 font-mono text-[12px] uppercase tracking-[0.18em] text-ink md:mt-10">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[rgb(var(--tint))] shadow-[0_0_0_4px_rgb(var(--tint)/0.3)]" />
            {role.title}
          </p>
        </div>
        <div className="md:pt-[0.4em]">
          <p className="text-[20px] font-medium leading-[1.5] tracking-[-0.01em] text-ink md:text-[clamp(20px,1.6vw,26px)]">
            <Words text={role.summary} />
          </p>
          {role.summaryExtra && (
            <p className="mt-6 text-[16px] leading-[1.7] text-ink/60 md:text-[clamp(16px,1.15vw,18px)]">{role.summaryExtra}</p>
          )}
        </div>
      </div>

      <div className="mt-16 grid gap-10 border-t border-white/12 pt-10 md:mt-[12vh] md:grid-cols-3 md:gap-[3vw]">
        {groups.map((group, g) => (
          <div key={group.name} data-p className="cs-chips" style={{ "--g": g } as React.CSSProperties}>
            <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-ink/55">{group.name}</p>
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
