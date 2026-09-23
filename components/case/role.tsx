import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/cases/types";
import { Track } from "@/components/case/track";
import { SectionTitle } from "@/components/case/title";
import { Words } from "@/components/about/words";

/** My Role: the words on the left, the reach of the role drawn on the right.
 *  From the role at the top a line runs down and splits three ways, into what
 *  I owned, who I worked with and how I worked, and each branch fills with its
 *  items as the page scrolls, so the scale of the responsibility builds up
 *  rather than sitting there as a wall of tags. Pinned on desktop; on a phone
 *  the same drawing plays as it comes up the screen. */
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
  const total = groups.reduce((n, g) => n + g.items.length, 0);
  let seq = 0;

  return (
    <Track id="role" className="relative md:h-[300vh]">
      <div className="relative px-6 py-[12vh] md:sticky md:top-0 md:flex md:h-[100svh] md:items-center md:px-[var(--frame-pad)] md:py-0">
        <div className="grid w-full gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] md:gap-[5vw]">
          <div>
            <SectionTitle index={3}>{labels.label}</SectionTitle>
            <p className="mt-8 max-w-[34rem] text-[19px] font-medium leading-[1.5] text-ink md:mt-[5svh] md:text-[clamp(18px,1.4vw,23px)]">
              <Words text={role.summary} />
            </p>
            {role.summaryExtra && (
              <p className="mt-5 max-w-[34rem] text-[16px] leading-[1.65] text-ink/60 md:text-[clamp(15px,1.05vw,17px)]">
                {role.summaryExtra}
              </p>
            )}
          </div>

          <div className="cs-scope relative self-center" style={{ "--total": total } as React.CSSProperties}>
            {/* The role itself, where every branch starts. */}
            <div className="flex justify-center md:justify-start">
              <p className="cs-scope-root inline-flex items-center gap-3 rounded-full border border-white/25 px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-ink">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-[rgb(var(--tint))] shadow-[0_0_0_4px_rgb(var(--tint)/0.25)]" />
                {role.title}
              </p>
            </div>
            <span aria-hidden="true" className="cs-scope-stem ml-[calc(50%-0.5px)] block h-8 w-px origin-top bg-white/50 md:ml-[1.4rem]" />
            <span aria-hidden="true" className="cs-scope-bar hidden h-px origin-left bg-white/50 md:ml-[1.4rem] md:block" />

            <div className="grid gap-10 md:grid-cols-3 md:gap-6">
              {groups.map((group, g) => (
                <div key={group.name} className="relative md:pl-[1.4rem]" style={{ "--g": g } as React.CSSProperties}>
                  <span aria-hidden="true" className="cs-scope-branch absolute left-0 top-0 hidden h-full w-px origin-top bg-white/25 md:block" />
                  <p className="cs-scope-head flex items-baseline justify-between gap-3 pt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/60 md:pt-8">
                    {group.name}
                    <span className="text-ink/35">{String(group.items.length).padStart(2, "0")}</span>
                  </p>
                  <ul className="mt-5 flex flex-col gap-3">
                    {group.items.map((item) => {
                      const t = 0.3 + 0.6 * (seq++ / total);
                      return (
                        <li
                          key={item}
                          className="cs-scope-item relative flex gap-3 text-[15px] leading-[1.35] text-ink md:text-[clamp(14px,1.05vw,16px)]"
                          style={{ "--t": t.toFixed(3) } as React.CSSProperties}
                        >
                          <span aria-hidden="true" className="cs-scope-tick mt-[0.65em] h-px w-3 shrink-0 bg-[rgb(var(--tint))] md:-ml-[1.4rem] md:w-[1.1rem]" />
                          {item}
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Track>
  );
}
