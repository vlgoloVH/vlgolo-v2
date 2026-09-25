import type { CSSProperties, Ref } from "react";

/** Line drawings for the About page that are driven by scroll. Each one is a
 *  400×400 SVG rendered once by <Art>, then moved by drawArt(svg, t) with t
 *  running 0 → 1: the caller (a pinned track, see useSteps) owns the
 *  progress and this only sets attributes.
 *  Plain lines and dots in the current colour (How I work sets a case colour
 *  per drawing), so they read like the case drawings rather than as icons
 *  from a library. */

/** One drawing per How I work statement. */
export type ArtKind =
  | "understand"
  | "smaller"
  | "people"
  | "evidence"
  | "loop";

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
/** Where t sits between a and b, as 0 → 1. */
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

/** A fixed pseudo-random sequence, so the "chaos" is the same on every load
 *  and on the server and the client alike. */
function seeded(seed: number) {
  let a = seed;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let r = Math.imul(a ^ (a >>> 15), 1 | a);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

const range = (n: number) => Array.from({ length: n }, (_, i) => i);

/* ── Geometry ─────────────────────────────────────────────────────────── */

const SMALLER = (() => {
  const rand = seeded(11);
  const targets = [
    [140, 200],
    [200, 200],
    [260, 200],
  ];
  return range(24).map((i) => ({
    from: [50 + rand() * 300, 50 + rand() * 300],
    to: targets[i % 3],
  }));
})();

const PEOPLE = range(5).map((i) => {
  const a = (i / 5) * Math.PI * 2 - Math.PI / 2;
  return { a, deg: (a * 180) / Math.PI + 180 + 135 };
});
const CURSOR = "M0 0 L0 20 L5.5 14.5 L9.5 23.5 L13 22 L9 13 L16.5 13 Z";

const EVIDENCE = (() => {
  const rand = seeded(23);
  return range(10).map((i) => {
    const k = i / 9;
    return {
      from: [60 + rand() * 280, 60 + rand() * 280],
      to: [70 + k * 260, 310 - k * 200 + (i % 2 ? -14 : 10)],
    };
  });
})();

/* ── Markup ───────────────────────────────────────────────────────────── */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.4,
  strokeLinecap: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

/** Dash-drawn: pathLength 1 makes the dash offset a plain 0 → 1. */
const drawn = { ...stroke, pathLength: 1, strokeDasharray: 1, strokeDashoffset: 1 };

function Shapes({ kind }: { kind: ArtKind }) {
  switch (kind) {
    case "understand":
      return (
        <>
          <circle data-lens cx={180} cy={180} r={86} {...drawn} />
          <line data-handle x1={242} y1={242} x2={318} y2={318} {...drawn} strokeWidth={2.4} />
          {range(9).map((i) => (
            <circle key={i} data-dot={i} cx={180} cy={180} r={i === 0 ? 5 : 3.2} fill="currentColor" />
          ))}
        </>
      );
    case "smaller":
      return (
        <>
          <line data-link x1={140} y1={200} x2={260} y2={200} {...drawn} />
          {SMALLER.map(({ from }, i) => (
            <circle key={i} data-dot={i} cx={from[0]} cy={from[1]} r={3.4} fill="currentColor" />
          ))}
        </>
      );
    case "people":
      return (
        <>
          <circle data-meet cx={200} cy={200} r={34} {...drawn} />
          {PEOPLE.map((_, i) => (
            <path key={i} data-cursor-shape={i} d={CURSOR} fill="currentColor" />
          ))}
        </>
      );
    case "evidence":
      return (
        <>
          <polyline
            data-trend
            points={EVIDENCE.map(({ to }) => to.join(",")).join(" ")}
            {...drawn}
          />
          <path data-head d="M0 -7 L12 0 L0 7 Z" fill="currentColor" opacity={0} />
          {EVIDENCE.map(({ from }, i) => (
            <circle key={i} data-dot={i} cx={from[0]} cy={from[1]} r={4} fill="currentColor" />
          ))}
        </>
      );
    case "loop":
      return (
        <>
          <circle
            data-arc
            cx={200}
            cy={200}
            r={112}
            {...drawn}
            transform="rotate(-90 200 200)"
          />
          <path data-head d="M-8 -8 L0 0 L-8 8" {...stroke} strokeWidth={2} opacity={0} />
          {range(3).map((i) => (
            <circle key={i} data-tick={i} r={0} fill="currentColor" />
          ))}
        </>
      );
  }
}

export function Art({
  kind,
  className = "",
  style,
  ref,
}: {
  kind: ArtKind;
  className?: string;
  style?: CSSProperties;
  ref?: Ref<SVGSVGElement>;
}) {
  return (
    <svg
      ref={ref}
      data-art={kind}
      viewBox="0 0 400 400"
      className={className}
      style={style}
      aria-hidden="true"
      focusable="false"
    >
      <Shapes kind={kind} />
    </svg>
  );
}

/* ── Motion ───────────────────────────────────────────────────────────── */

const q = <T extends Element>(svg: SVGSVGElement, sel: string) =>
  [...svg.querySelectorAll<T>(sel)];

const set = (el: Element, attrs: Record<string, string | number>) => {
  for (const key in attrs) el.setAttribute(key, String(attrs[key]));
};

/** Moves the drawing to progress t (0 → 1). Safe to call every frame. */
export function drawArt(svg: SVGSVGElement, t: number) {
  const kind = svg.dataset.art as ArtKind;

  switch (kind) {
    case "understand": {
      const lens = svg.querySelector("[data-lens]");
      const handle = svg.querySelector("[data-handle]");
      if (lens) set(lens, { "stroke-dashoffset": 1 - ease(seg(t, 0, 0.35)) });
      if (handle) set(handle, { "stroke-dashoffset": 1 - ease(seg(t, 0.25, 0.45)) });
      const open = ease(seg(t, 0.35, 0.95));
      q(svg, "[data-dot]").forEach((el, i) => {
        if (i === 0) return set(el, { opacity: seg(t, 0.3, 0.4) });
        const a = ((i - 1) / 8) * Math.PI * 2;
        const r = open * (i % 2 ? 58 : 36);
        set(el, { cx: 180 + Math.cos(a) * r, cy: 180 + Math.sin(a) * r, opacity: open });
      });
      break;
    }

    case "smaller": {
      const e = ease(seg(t, 0.08, 0.78));
      q(svg, "[data-dot]").forEach((el, i) => {
        const { from, to } = SMALLER[i];
        set(el, { cx: lerp(from[0], to[0], e), cy: lerp(from[1], to[1], e), r: 3.4 + e * 3 });
      });
      const link = svg.querySelector("[data-link]");
      if (link) set(link, { "stroke-dashoffset": 1 - ease(seg(t, 0.78, 1)) });
      break;
    }

    case "people": {
      const e = ease(seg(t, 0.05, 0.75));
      q(svg, "[data-cursor-shape]").forEach((el, i) => {
        const { a, deg } = PEOPLE[i];
        const r = lerp(176, 52, e);
        const x = 200 + Math.cos(a) * r;
        const y = 200 + Math.sin(a) * r;
        set(el, { transform: `translate(${x} ${y}) rotate(${deg})`, opacity: 0.35 + e * 0.65 });
      });
      const meet = svg.querySelector("[data-meet]");
      if (meet) set(meet, { "stroke-dashoffset": 1 - ease(seg(t, 0.7, 1)) });
      break;
    }

    case "evidence": {
      const e = ease(seg(t, 0.05, 0.6));
      q(svg, "[data-dot]").forEach((el, i) => {
        const { from, to } = EVIDENCE[i];
        set(el, { cx: lerp(from[0], to[0], e), cy: lerp(from[1], to[1], e) });
      });
      const line = ease(seg(t, 0.6, 0.95));
      const trend = svg.querySelector("[data-trend]");
      if (trend) set(trend, { "stroke-dashoffset": 1 - line });
      const head = svg.querySelector("[data-head]");
      if (head) {
        const last = EVIDENCE[EVIDENCE.length - 1].to;
        const prev = EVIDENCE[EVIDENCE.length - 2].to;
        const deg = (Math.atan2(last[1] - prev[1], last[0] - prev[0]) * 180) / Math.PI;
        set(head, {
          transform: `translate(${last[0]} ${last[1]}) rotate(${deg})`,
          opacity: seg(t, 0.92, 1),
        });
      }
      break;
    }

    case "loop": {
      const s = ease(seg(t, 0.05, 0.9)) * 0.9;
      const arc = svg.querySelector("[data-arc]");
      if (arc) set(arc, { "stroke-dashoffset": 1 - s });
      const a = -Math.PI / 2 + s * Math.PI * 2;
      const head = svg.querySelector("[data-head]");
      if (head)
        set(head, {
          transform: `translate(${200 + Math.cos(a) * 112} ${200 + Math.sin(a) * 112}) rotate(${(a * 180) / Math.PI + 90})`,
          opacity: s > 0.02 ? 1 : 0,
        });
      q(svg, "[data-tick]").forEach((el, i) => {
        const at = (i + 1) * 0.28;
        const on = s >= at ? 1 : 0;
        const ta = -Math.PI / 2 + at * Math.PI * 2;
        set(el, { cx: 200 + Math.cos(ta) * 112, cy: 200 + Math.sin(ta) * 112, r: 5 * on });
      });
      break;
    }
  }
}
