import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/cases/types";
import { Track } from "@/components/case/track";
import { Label } from "@/components/case/label";

/** My role: first the statement and the story of the role, then its scope
 *  drawn as it grew. Pinned on desktop, each area of ownership joins the
 *  column in turn while rings widen behind it, and the people I worked with
 *  arrive last. */
export function CaseRole({
  labels,
  role,
}: {
  labels: Dictionary["caseStudy"]["role"];
  role: CaseStudy["role"];
}) {
  const n = role.scope.length;
  return (
    <section id="role" className="relative">
      <div data-p className="px-6 pb-[6vh] pt-[16vh] md:px-[var(--frame-pad)] md:pt-[20vh]">
        <Label index={3}>{labels.label}</Label>
        <p className="mt-10 max-w-[16em] text-[clamp(36px,5vw,96px)] font-bold leading-[1] tracking-[-0.035em] text-ink md:mt-14">
          {role.statement}
        </p>
        <div className="mt-12 grid gap-6 text-[17px] leading-[1.7] text-ink/70 md:mt-16 md:ml-[40%] md:text-[19px]">
          {role.body.map((paragraph) => (
            <p key={paragraph.slice(0, 24)}>{paragraph}</p>
          ))}
        </div>
      </div>

      <Track className="cs-scope relative md:h-[260vh]" style={{ "--n": n } as React.CSSProperties}>
        <div className="relative overflow-hidden px-6 py-[10vh] md:sticky md:top-0 md:flex md:h-[100svh] md:items-center md:px-[var(--frame-pad)] md:py-0">
          {/* Rings widening as the scope grows. */}
          <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
            {Array.from({ length: 4 }, (_, i) => (
              <span
                key={i}
                className="cs-ring absolute left-1/2 top-1/2 rounded-full border border-white/10"
                style={{ "--r": i } as React.CSSProperties}
              />
            ))}
          </div>

          <div className="relative grid w-full gap-10 md:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] md:items-center">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink/50">{labels.scope}</p>
              <p className="cs-scope-count mt-4 text-[clamp(80px,11vw,200px)] font-bold leading-[0.85] tracking-[-0.05em] text-ink">
                {n}
              </p>
            </div>

            <ol className="flex flex-col items-start">
              {role.scope.map((item, i) => (
                <li key={item} className="cs-scope-item flex flex-col items-start" style={{ "--i": i } as React.CSSProperties}>
                  {i > 0 && (
                    <span aria-hidden="true" className="ml-3 h-4 w-px bg-white/30 md:h-5" />
                  )}
                  <span className="flex items-baseline gap-4 py-1">
                    <span className="font-mono text-[11px] tracking-[0.2em] text-ink/40">{String(i + 1).padStart(2, "0")}</span>
                    <span className="text-[clamp(22px,2.3vw,40px)] font-medium tracking-[-0.02em] text-ink">{item}</span>
                  </span>
                </li>
              ))}
            </ol>
          </div>

          <p className="cs-scope-team relative mt-12 font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50 md:absolute md:bottom-10 md:left-[var(--frame-pad)] md:mt-0">
            {labels.team}: <span className="text-ink/80">{role.team.join(" · ")}</span>
          </p>
        </div>
      </Track>
    </section>
  );
}
