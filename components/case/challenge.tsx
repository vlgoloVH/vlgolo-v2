import type { Dictionary } from "@/lib/dictionaries";
import type { CaseStudy } from "@/lib/cases/types";
import { Track } from "@/components/case/track";
import { Label } from "@/components/case/label";

/** The shapes of interface in the pile: toolbars, rows, cards, pills. Each
 *  has a place in the tangle (x, y as a share of the stage, and a turn) and a
 *  place in the tidy layout it clears into. */
const FRAGMENTS = (() => {
  let a = 42;
  const rand = () => {
    a = (a * 16807) % 2147483647;
    return a / 2147483647;
  };
  const kinds = ["bar", "card", "row", "row", "pill", "card", "row", "pill", "row", "bar", "card", "row", "pill", "row", "card", "row", "pill", "row"];
  const size = { bar: [92, 6], card: [43, 14], row: [43, 4.5], pill: [20, 5] } as const;
  // Tidy layout: toolbars across the full width, everything else stacked in
  // two columns, each piece going to whichever column is shorter.
  const colY = [4, 4];
  return kinds.map((kind, i) => {
    const [w, h] = size[kind as keyof typeof size];
    let gx: number;
    let gy: number;
    if (kind === "bar") {
      gy = Math.max(colY[0], colY[1]);
      gx = 4;
      colY[0] = colY[1] = gy + h + 3;
    } else {
      const c = colY[0] <= colY[1] ? 0 : 1;
      gx = c === 0 ? 4 : 53;
      gy = colY[c];
      colY[c] += h + 2;
    }
    return {
      kind,
      w,
      h,
      cx: 2 + rand() * (98 - w),
      cy: 2 + rand() * (94 - h),
      cr: (rand() - 0.5) * 26,
      gx,
      gy,
      i,
    };
  });
})();

/** The challenge, before any solution: the tensions that made the problem
 *  hard arrive one by one, while the stage fills with overlapping bits of
 *  interface until it is a mess, then, just before the page moves on, the
 *  pile clears into a calm layout. */
export function CaseChallenge({
  labels,
  challenge,
}: {
  labels: Dictionary["caseStudy"]["challenge"];
  challenge: CaseStudy["challenge"];
}) {
  const n = challenge.tensions.length;
  return (
    <Track id="challenge" className="cs-challenge relative md:h-[300vh]" style={{ "--n": n } as React.CSSProperties}>
      <div className="relative overflow-hidden px-6 py-[12vh] md:sticky md:top-0 md:flex md:h-[100svh] md:items-center md:px-[var(--frame-pad)] md:py-0">
        <div className="grid w-full gap-12 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-[5vw]">
          <div>
            <Label index={4}>{labels.label}</Label>
            <h2 className="mt-8 text-[clamp(36px,4.4vw,84px)] font-bold leading-[1] tracking-[-0.035em] text-ink">
              {challenge.headline}
            </h2>
            <ol className="mt-10 flex flex-col gap-5 md:mt-14">
              {challenge.tensions.map((line, i) => (
                <li
                  key={line}
                  className="cs-tension flex gap-5 text-[18px] leading-[1.5] text-ink md:text-[21px]"
                  style={{ "--i": i } as React.CSSProperties}
                >
                  <span className="mt-[0.35em] font-mono text-[11px] tracking-[0.2em] text-ink/40">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {line}
                </li>
              ))}
            </ol>
          </div>

          <div aria-hidden="true" className="cs-pile relative mx-auto aspect-[4/5] w-full max-w-[min(520px,70vh)]">
            {FRAGMENTS.map((f) => (
              <span
                key={f.i}
                className={`cs-frag cs-frag--${f.kind}`}
                style={
                  {
                    "--w": f.w,
                    "--h": f.h,
                    "--cx": f.cx,
                    "--cy": f.cy,
                    "--cr": `${f.cr}deg`,
                    "--gx": f.gx,
                    "--gy": f.gy,
                    "--i": f.i,
                    "--m": FRAGMENTS.length,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>
      </div>
    </Track>
  );
}
