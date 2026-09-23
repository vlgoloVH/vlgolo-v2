import type { System } from "@/lib/cases/types";
import { Track } from "@/components/case/track";
import { Label } from "@/components/case/label";

/** The layers a design system is built from, bottom up. */
const LAYERS = ["Token", "Colors", "Typography", "Spacing", "Components", "Patterns", "Screens"];

function Layer({ name, index }: { name: string; index: number }) {
  let body: React.ReactNode = null;
  switch (index) {
    case 0:
      body = (
        <span className="flex items-center gap-3 font-mono text-[12px] text-ink/70">
          <span className="h-3.5 w-3.5 rounded-full bg-[rgb(var(--tint))]" />
          --brand
        </span>
      );
      break;
    case 1:
      body = (
        <span className="flex gap-1.5">
          {[90, 70, 50, 30, 15].map((mix) => (
            <span
              key={mix}
              className="h-6 w-6 rounded-md"
              style={{ background: `color-mix(in srgb, rgb(var(--tint)) ${mix}%, ${mix > 50 ? "#000" : "#fff"})` }}
            />
          ))}
          <span className="h-6 w-6 rounded-md bg-white/90" />
          <span className="h-6 w-6 rounded-md border border-white/25 bg-black" />
        </span>
      );
      break;
    case 2:
      body = (
        <span className="flex items-baseline gap-3 text-ink">
          <span className="text-[30px] font-bold leading-none">Aa</span>
          <span className="text-[20px] font-medium leading-none">Aa</span>
          <span className="text-[14px] leading-none text-ink/70">Aa</span>
        </span>
      );
      break;
    case 3:
      body = (
        <span className="flex items-end gap-1.5">
          {[4, 8, 12, 16, 24, 32].map((s) => (
            <span key={s} className="w-2 bg-white/50" style={{ height: s }} />
          ))}
        </span>
      );
      break;
    case 4:
      body = (
        <span className="flex items-center gap-2.5">
          <span className="rounded-full bg-[rgb(var(--tint))] px-3.5 py-1.5 text-[11px] font-medium text-white">Button</span>
          <span className="h-7 w-24 rounded-md border border-white/25" />
          <span className="relative h-4 w-7 rounded-full bg-[rgb(var(--tint))]">
            <span className="absolute right-0.5 top-0.5 h-3 w-3 rounded-full bg-white" />
          </span>
        </span>
      );
      break;
    case 5:
      body = (
        <span className="flex gap-2">
          {[0, 1].map((k) => (
            <span key={k} className="flex w-24 flex-col gap-1.5 rounded-lg border border-white/15 p-2">
              <span className="h-6 rounded bg-white/10" />
              <span className="h-1.5 w-3/4 rounded bg-white/40" />
              <span className="h-1.5 w-1/2 rounded bg-white/20" />
            </span>
          ))}
        </span>
      );
      break;
    case 6:
      body = (
        <span className="flex gap-2">
          <span className="h-14 w-24 rounded-md border border-white/20 bg-white/[0.04]" />
          <span className="h-14 w-8 rounded-md border border-white/20 bg-white/[0.04]" />
        </span>
      );
      break;
  }
  return (
    <li className="cs-layer flex items-center justify-between gap-6 border-t border-white/10 py-3" style={{ "--i": index } as React.CSSProperties}>
      <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink/50">
        {String(index + 1).padStart(2, "0")} {name}
      </span>
      {body}
    </li>
  );
}

/** A foundation built up on screen, layer by layer, ending in what it serves.
 *  Pinned on desktop; each layer lands on the stack as the page scrolls. */
function Stack({ system }: { system: Extract<System, { variant: "stack" }> }) {
  const count = LAYERS.length + 1;
  return (
    <Track className="cs-stack relative md:h-[340vh]" style={{ "--n": count } as React.CSSProperties}>
      <div className="relative px-6 py-[12vh] md:sticky md:top-0 md:flex md:h-[100svh] md:items-center md:px-[var(--frame-pad)] md:py-0">
        <div className="grid w-full gap-14 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-[6vw]">
          <div>
            <Label index={6}>{system.label}</Label>
            <h2 className="mt-8 text-[clamp(38px,4.6vw,88px)] font-bold leading-[1] tracking-[-0.035em] text-ink">
              {system.title}
            </h2>
            <p className="mt-8 max-w-[34rem] text-[17px] leading-[1.7] text-ink/70 md:text-[19px]">{system.description}</p>
            <ul className="mt-8 grid gap-2.5 text-[15px] leading-[1.5] text-ink/60 md:text-[16px]">
              {system.points.map((point) => (
                <li key={point} className="flex gap-3">
                  <span aria-hidden="true" className="mt-[0.7em] h-px w-3 shrink-0 bg-white/40" />
                  {point}
                </li>
              ))}
            </ul>
          </div>

          <div>
            {/* The outputs sit on top of the stack; they arrive last. */}
            <ul
              className={`cs-layer grid gap-2 ${system.brands ? "grid-cols-3" : "grid-cols-2 sm:grid-cols-4"}`}
              style={{ "--i": LAYERS.length } as React.CSSProperties}
            >
              {system.outputs.map((name, i) => (
                <li
                  key={name}
                  className="flex min-h-[64px] items-end rounded-lg border border-white/15 p-3 text-[13px] font-medium leading-[1.25] text-ink"
                  style={
                    system.brands
                      ? { background: `color-mix(in oklch, rgb(var(--tint)) 40%, hsl(${[0, 150, 290][i]} 55% 45%))` }
                      : { background: "rgb(var(--tint) / 0.18)" }
                  }
                >
                  {name}
                </li>
              ))}
            </ul>
            <ol className="mt-4 flex flex-col-reverse">
              {LAYERS.map((name, i) => (
                <Layer key={name} name={name} index={i} />
              ))}
            </ol>
          </div>
        </div>
      </div>
    </Track>
  );
}

/** Four modules on a loop around one core, the loop drawing itself. */
function Lifecycle({ system }: { system: Extract<System, { variant: "lifecycle" }> }) {
  const n = system.modules.length;
  return (
    <div data-p className="grid gap-14 px-6 py-[14vh] md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-center md:gap-[6vw] md:px-[var(--frame-pad)] md:py-[18vh]">
      <div>
        <Label index={6}>{system.label}</Label>
        <h2 className="mt-8 text-[clamp(38px,4.6vw,88px)] font-bold leading-[1] tracking-[-0.035em] text-ink">{system.title}</h2>
        <p className="mt-8 max-w-[34rem] text-[17px] leading-[1.7] text-ink/70 md:text-[19px]">{system.description}</p>
      </div>
      <div className="relative mx-auto aspect-square w-full max-w-[520px]">
        <svg viewBox="0 0 400 400" aria-hidden="true" className="absolute inset-0 h-full w-full overflow-visible text-ink">
          <circle cx={200} cy={200} r={140} fill="none" stroke="currentColor" strokeOpacity={0.12} />
          <circle
            className="cs-loop"
            cx={200}
            cy={200}
            r={140}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.5}
            pathLength={1}
            transform="rotate(-90 200 200)"
          />
          {system.modules.map((_, i) => {
            const a = (i / n) * Math.PI * 2 - Math.PI / 2;
            return (
              <line
                key={i}
                className="cs-spoke"
                style={{ "--i": i } as React.CSSProperties}
                x1={200}
                y1={200}
                x2={200 + Math.cos(a) * 140}
                y2={200 + Math.sin(a) * 140}
                stroke="currentColor"
                strokeOpacity={0.35}
                pathLength={1}
              />
            );
          })}
        </svg>
        <span className="absolute left-1/2 top-1/2 flex h-28 w-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgb(var(--tint))] text-center text-[14px] font-bold text-white">
          {system.core}
        </span>
        {system.modules.map((name, i) => {
          const a = (i / n) * Math.PI * 2 - Math.PI / 2;
          return (
            <span
              key={name}
              className="cs-module absolute w-[34%] -translate-x-1/2 -translate-y-1/2 rounded-lg border border-white/20 bg-surface px-3 py-2.5 text-center text-[13px] font-medium leading-[1.3] text-ink"
              style={{ left: `${50 + Math.cos(a) * 35}%`, top: `${50 + Math.sin(a) * 35}%`, "--i": i } as React.CSSProperties}
            >
              {name}
            </span>
          );
        })}
      </div>
    </div>
  );
}

/** One product at the centre and the others joining around it, ring by
 *  ring, with the count climbing to the total. */
function Ecosystem({ system }: { system: Extract<System, { variant: "ecosystem" }> }) {
  const n = system.products.length;
  const place = (i: number) => {
    const inner = i < 5;
    const k = inner ? i : i - 5;
    const count = inner ? 5 : n - 5;
    const a = (k / count) * Math.PI * 2 - Math.PI / 2 + (inner ? 0 : Math.PI / count);
    const r = inner ? 23 : 42;
    return { x: 50 + Math.cos(a) * r, y: 50 + Math.sin(a) * r };
  };
  return (
    <div data-p className="px-6 py-[14vh] md:px-[var(--frame-pad)] md:py-[18vh]">
      <div className="grid gap-14 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-center md:gap-[6vw]">
        <div>
          <Label index={6}>{system.label}</Label>
          <h2 className="mt-8 text-[clamp(38px,4.6vw,88px)] font-bold leading-[1] tracking-[-0.035em] text-ink">{system.title}</h2>
          <p className="mt-8 max-w-[34rem] text-[17px] leading-[1.7] text-ink/70 md:text-[19px]">{system.description}</p>
          <p className="mt-10 flex items-baseline gap-4">
            <span className="text-[clamp(64px,8vw,140px)] font-bold leading-none tracking-[-0.05em] text-ink">{system.total}</span>
            <span className="font-mono text-[11px] uppercase tracking-[0.24em] text-ink/50">{system.totalLabel}</span>
          </p>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-[600px]" style={{ "--n": n } as React.CSSProperties}>
          <svg viewBox="0 0 100 100" aria-hidden="true" className="absolute inset-0 h-full w-full text-ink">
            {system.products.map((name, i) => {
              const { x, y } = place(i);
              return (
                <line
                  key={name}
                  className="cs-eco-link"
                  style={{ "--i": i } as React.CSSProperties}
                  x1={50}
                  y1={50}
                  x2={x}
                  y2={y}
                  stroke="currentColor"
                  strokeOpacity={0.25}
                  strokeWidth={0.25}
                  pathLength={1}
                />
              );
            })}
          </svg>
          <span className="absolute left-1/2 top-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-[rgb(var(--tint))] text-center text-[13px] font-bold leading-tight text-white">
            {system.core}
          </span>
          {system.products.map((name, i) => {
            const { x, y } = place(i);
            return (
              <span
                key={name}
                className="cs-eco-node absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap rounded-full border border-white/20 bg-surface px-3 py-1.5 text-[11px] font-medium text-ink md:text-[12px]"
                style={{ left: `${x}%`, top: `${y}%`, "--i": i } as React.CSSProperties}
              >
                {name}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function CaseSystem({ system }: { system: System }) {
  return (
    <section id="system" className="relative">
      {system.variant === "stack" && <Stack system={system} />}
      {system.variant === "lifecycle" && <Lifecycle system={system} />}
      {system.variant === "ecosystem" && <Ecosystem system={system} />}
    </section>
  );
}
