import type { Dictionary } from "@/lib/dictionaries";
import { SectionTitle } from "@/components/case/title";
import { Words } from "@/components/about/words";

type Copy = Dictionary["aboutPage"]["story"];

/** Points of the rising line on desktop, one per stage, in a 1200 × 72 box:
 *  each stage sits at the left edge of its column, a little higher than the
 *  last, so the path reads as growth. */
const W = 1200;
const H = 72;
const Y = [58, 44, 50, 32, 24, 10];

/** One smooth curve through every point: each span is a cubic with flat
 *  handles, so the line eases into and out of each stage. */
function curve(points: [number, number][]) {
  return points.reduce((d, [x, y], i) => {
    if (i === 0) return `M ${x} ${y}`;
    const [px, py] = points[i - 1];
    const mx = (px + x) / 2;
    return `${d} C ${mx} ${py} ${mx} ${y} ${x} ${y}`;
  }, "");
}

/** My story, laid out like a case's My role: the title on the left, a short
 *  lead on the right that lights up word by word. Under it, the path from art
 *  school to lead: on desktop a line that draws itself left to right as the
 *  row comes up, lighting each stage's point as it reaches it; on a phone the
 *  same path runs down the side of the stages. */
export function AboutStory({ copy }: { copy: Copy }) {
  const n = copy.path.length;
  const points = copy.path.map((_, i) => [(i / n) * W + 6, Y[i] ?? H / 2] as [number, number]);

  return (
    <section id="story" className="relative px-6 py-[10vh] md:px-[var(--case-pad)] md:py-[18vh]">
      <div className="grid gap-10 md:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] md:gap-[6vw]">
        <SectionTitle>{copy.label}</SectionTitle>
        <p className="text-[20px] font-medium leading-[1.5] tracking-[-0.01em] text-ink md:pt-[0.4em] md:text-[clamp(20px,1.6vw,26px)]">
          <Words text={copy.lead} />
        </p>
      </div>

      <div data-p className="ab-path mt-14 md:mt-[12vh]" style={{ "--n": n } as React.CSSProperties}>
        {/* Desktop: the line, then the stages in columns under their points.
            The columns have no gap (the space is padding inside each), so
            column i starts exactly at i / n of the width, where its point is. */}
        <svg
          aria-hidden="true"
          viewBox={`0 0 ${W} ${H}`}
          className="hidden h-auto w-full overflow-visible md:block"
        >
          <path d={curve(points)} pathLength={1} className="ab-path-base" />
          <path d={curve(points)} pathLength={1} className="ab-path-line" />
          {points.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={5}
              className="ab-path-dot"
              style={{ "--i": i } as React.CSSProperties}
            />
          ))}
        </svg>

        <div className="relative md:mt-8">
          {/* Phone: the path runs down the left, filling as it goes. */}
          <span aria-hidden="true" className="absolute bottom-2 left-[5px] top-2 w-px bg-white/12 md:hidden">
            <span className="ab-path-fill block h-full w-full origin-top" />
          </span>

          <ol className="flex flex-col gap-9 pl-8 md:grid md:grid-cols-6 md:gap-0 md:pl-0">
            {copy.path.map((stage, i) => (
              <li key={stage.name} className="ab-path-stage relative md:pr-[2vw]" style={{ "--i": i } as React.CSSProperties}>
                <span aria-hidden="true" className="ab-path-pip absolute -left-8 top-[0.3em] h-[11px] w-[11px] rounded-full md:hidden" />
                <p className="font-mono text-[12px] uppercase tracking-[0.2em] text-ink/50">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <p className="mt-3 text-[22px] font-bold leading-[1.1] tracking-[-0.02em] text-ink md:text-[clamp(18px,1.5vw,26px)]">
                  {stage.name}
                </p>
                <p className="mt-3 text-[16px] leading-[1.6] text-ink/65 md:text-[clamp(14px,1vw,16px)]">
                  {stage.note}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
