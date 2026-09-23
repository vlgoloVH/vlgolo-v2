import type { Ref } from "react";

/** Line drawings for the About page that are driven by scroll. Each one is a
 *  400×400 SVG rendered once by <Art>, then moved by drawArt(svg, t) with t
 *  running 0 → 1: the caller owns the progress (a sticky track, or the
 *  drawing's own trip through the viewport) and this only sets attributes.
 *  Plain lines and dots in the ink colour, so they sit with the frame lines
 *  and the type rather than reading as icons from a library. */

export type ArtKind =
  // Product philosophy
  | "network"
  | "reduce"
  | "scale"
  // How I work
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

const NET_NODES = [
  [200, 200],
  [112, 122],
  [206, 72],
  [298, 118],
  [334, 226],
  [270, 318],
  [150, 322],
  [70, 232],
] as const;
const NET_EDGES = [
  [0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7],
  [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 7], [7, 1],
] as const;

/** Reduce complexity: sixteen strokes thrown across the square settle into
 *  four clean rows of a simple list, each row four strokes laid on top of one
 *  another, so many lines become few. */
const REDUCE = (() => {
  const rand = seeded(7);
  const rowsY = [128, 176, 224, 272];
  const rowsLen = [228, 168, 248, 132];
  return range(16).map((i) => {
    const row = i % 4;
    return {
      from: [40 + rand() * 320, 40 + rand() * 320, 40 + rand() * 320, 40 + rand() * 320],
      to: [96, rowsY[row], 96 + rowsLen[row], rowsY[row]],
    };
  });
})();

const SCALE_CELLS = range(25).map((i) => {
  const col = i % 5;
  const row = Math.floor(i / 5);
  return { x: 60 + col * 58, y: 60 + row * 58, d: Math.abs(col - 2) + Math.abs(row - 2) };
});

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
    case "network":
      return (
        <>
          <circle data-ring cx={200} cy={200} r={14} {...stroke} opacity={0} />
          {NET_EDGES.map(([a, b], i) => (
            <line
              key={`e${i}`}
              data-edge={i}
              x1={NET_NODES[a][0]}
              y1={NET_NODES[a][1]}
              x2={NET_NODES[b][0]}
              y2={NET_NODES[b][1]}
              {...drawn}
              opacity={0.55}
            />
          ))}
          {NET_NODES.map(([x, y], i) => (
            <circle key={`n${i}`} data-node={i} cx={x} cy={y} r={0} fill="currentColor" />
          ))}
        </>
      );
    case "reduce":
      return (
        <>
          <line data-guide x1={72} y1={110} x2={72} y2={290} {...drawn} opacity={0.5} />
          {REDUCE.map(({ from }, i) => (
            <g key={i} data-stroke={i}>
              <line x1={from[0]} y1={from[1]} x2={from[2]} y2={from[3]} {...stroke} />
              <circle cx={from[0]} cy={from[1]} r={3.2} fill="currentColor" />
            </g>
          ))}
        </>
      );
    case "scale":
      return (
        <>
          {SCALE_CELLS.map(({ x, y, d }, i) => (
            <rect
              key={i}
              data-cell={i}
              x={x}
              y={y}
              width={46}
              height={46}
              rx={7}
              {...stroke}
              fill={d === 0 ? "currentColor" : "none"}
              fillOpacity={d === 0 ? 0.9 : 0}
              style={{ transformBox: "fill-box", transformOrigin: "center", transform: "scale(0)" }}
            />
          ))}
        </>
      );
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
  ref,
}: {
  kind: ArtKind;
  className?: string;
  ref?: Ref<SVGSVGElement>;
}) {
  return (
    <svg
      ref={ref}
      data-art={kind}
      viewBox="0 0 400 400"
      className={className}
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
    case "network": {
      q(svg, "[data-node]").forEach((el, i) => {
        const s = ease(seg(t, i * 0.035, i * 0.035 + 0.22));
        set(el, { r: (i === 0 ? 7 : 4) * s, opacity: s });
      });
      q(svg, "[data-edge]").forEach((el, i) => {
        const s = ease(seg(t, 0.22 + i * 0.025, 0.5 + i * 0.025));
        set(el, { "stroke-dashoffset": 1 - s });
      });
      const ring = svg.querySelector("[data-ring]");
      if (ring) {
        const s = seg(t, 0.55, 1);
        set(ring, { r: 14 + s * 90, opacity: (1 - s) * 0.45 * (s > 0 ? 1 : 0) });
      }
      break;
    }

    case "reduce": {
      // The signature moment: hold the mess a beat, then let it settle.
      const e = ease(seg(t, 0.12, 0.82));
      q(svg, "[data-stroke]").forEach((g, i) => {
        const { from, to } = REDUCE[i];
        const [x1, y1, x2, y2] = from.map((v, k) => lerp(v, to[k], e));
        const line = g.firstElementChild!;
        const dot = g.lastElementChild!;
        set(line, { x1, y1, x2, y2, opacity: 0.32 + e * 0.68 });
        set(dot, { cx: lerp(x1, 72, e), cy: y1, opacity: 0.5 + e * 0.5 });
      });
      const guide = svg.querySelector("[data-guide]");
      if (guide) set(guide, { "stroke-dashoffset": 1 - ease(seg(t, 0.78, 1)) });
      break;
    }

    case "scale": {
      q<SVGRectElement>(svg, "[data-cell]").forEach((el, i) => {
        const { d } = SCALE_CELLS[i];
        const s = ease(seg(t, d * 0.17, d * 0.17 + 0.26));
        el.style.transform = `scale(${s})`;
        el.setAttribute("opacity", String(s));
      });
      break;
    }

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
