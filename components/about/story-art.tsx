import type { CSSProperties, Ref } from "react";

/** The My story drawings, one per stage of the path, each in its own colour:
 *  a loose sketch (art school), a construction of square, circle and
 *  diagonals (graphic design), three artboards ticked off (freelance), a phone
 *  and a browser (digital products), screens joined into a flow (product
 *  design) and a hub with the people and products around it (lead). Every
 *  line is drawn in with its dash, one after another, then the points appear:
 *  the same hand as the case drawings. Rendered once, moved by
 *  drawStory(svg, t) with t 0 → 1. */

const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
  pathLength: 1,
  strokeDasharray: 1,
  strokeDashoffset: 1,
};

/** A line drawn in its turn. */
const S = (props: Record<string, unknown>) => ({ ...line, "data-s": "", ...props });
/** A point that appears once the lines are in. */
const dot = (cx: number, cy: number, r = 4) => ({ cx, cy, r, fill: "currentColor", opacity: 0, "data-dot": "" });

function Stage({ index }: { index: number }) {
  switch (index) {
    case 0:
      return (
        <>
          <path {...S({ d: "M118 238 C 96 176, 150 116, 212 126 S 306 196, 270 256 S 158 312, 132 262" })} />
          <path {...S({ d: "M134 250 C 116 192, 164 138, 222 146 S 294 206, 262 250" })} opacity={0.55} />
          <path {...S({ d: "M232 270 L 262 240" })} />
          <path {...S({ d: "M246 280 L 278 248" })} />
          <path {...S({ d: "M262 288 L 290 260" })} />
          <circle {...dot(212, 126, 4.5)} />
        </>
      );
    case 1:
      return (
        <>
          <path {...S({ d: "M120 120 H 280 V 280 H 120 Z" })} />
          <circle {...S({ cx: 200, cy: 200, r: 80 })} />
          <path {...S({ d: "M120 120 L 280 280" })} opacity={0.5} />
          <path {...S({ d: "M280 120 L 120 280" })} opacity={0.5} />
          <path {...S({ d: "M173 120 V 280 M227 120 V 280" })} opacity={0.35} />
          {[
            [120, 120],
            [280, 120],
            [120, 280],
            [280, 280],
            [200, 200],
          ].map(([x, y], i) => (
            <circle key={i} {...dot(x, y)} />
          ))}
        </>
      );
    case 2:
      return (
        <>
          {[
            [86, 104, 100, 76],
            [214, 140, 104, 80],
            [118, 238, 116, 76],
          ].map(([x, y, w, h], i) => (
            <g key={i}>
              <rect {...S({ x, y, width: w, height: h, rx: 6 })} />
              <path {...S({ d: `M${x + w / 2 - 14} ${y + h / 2} l 9 9 l 20 -20` })} />
            </g>
          ))}
          <circle {...dot(86, 104)} />
          <circle {...dot(318, 140)} />
          <circle {...dot(234, 314)} />
        </>
      );
    case 3:
      return (
        <>
          <rect {...S({ x: 96, y: 96, width: 96, height: 184, rx: 16 })} />
          <path {...S({ d: "M130 112 H 158" })} />
          <path {...S({ d: "M112 150 H 176 M112 170 H 160 M112 190 H 168" })} opacity={0.5} />
          <rect {...S({ x: 214, y: 128, width: 132, height: 112, rx: 8 })} />
          <path {...S({ d: "M214 150 H 346" })} />
          <path {...S({ d: "M230 172 H 300 M230 192 H 330 M230 212 H 280" })} opacity={0.5} />
          <circle {...dot(144, 256, 5)} />
          <circle {...dot(226, 139, 2.5)} />
          <circle {...dot(236, 139, 2.5)} />
        </>
      );
    case 4:
      return (
        <>
          <rect {...S({ x: 64, y: 172, width: 64, height: 64, rx: 8 })} />
          <rect {...S({ x: 168, y: 172, width: 64, height: 64, rx: 8 })} />
          <rect {...S({ x: 272, y: 172, width: 64, height: 64, rx: 8 })} />
          <path {...S({ d: "M128 204 H 164 M156 196 l 8 8 l -8 8" })} />
          <path {...S({ d: "M232 204 H 268 M260 196 l 8 8 l -8 8" })} />
          <path {...S({ d: "M304 172 C 304 110, 96 110, 96 168 M88 160 l 8 8 l 8 -8" })} opacity={0.6} />
          <circle {...dot(96, 204)} />
          <circle {...dot(200, 204)} />
          <circle {...dot(304, 204)} />
        </>
      );
    default: {
      const nodes = Array.from({ length: 6 }, (_, i) => {
        const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
        return [200 + Math.cos(a) * 118, 200 + Math.sin(a) * 118];
      });
      return (
        <>
          <circle {...S({ cx: 200, cy: 200, r: 26 })} />
          {nodes.map(([x, y], i) => (
            <path key={i} {...S({ d: `M${200 + (x - 200) * 0.24} ${200 + (y - 200) * 0.24} L ${200 + (x - 200) * 0.9} ${200 + (y - 200) * 0.9}` })} />
          ))}
          <circle {...S({ cx: 200, cy: 200, r: 150 })} opacity={0.3} />
          {nodes.map(([x, y], i) => (
            <circle key={i} {...dot(x, y, 6)} />
          ))}
          <circle {...dot(200, 200, 7)} />
        </>
      );
    }
  }
}

export function StoryArt({
  index,
  className = "",
  style,
  ref,
}: {
  index: number;
  className?: string;
  style?: CSSProperties;
  ref?: Ref<SVGSVGElement>;
}) {
  return (
    <svg ref={ref} viewBox="0 0 400 400" className={className} style={style} aria-hidden="true" focusable="false">
      <Stage index={index} />
    </svg>
  );
}

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

/** Draws one stage to t: its lines one after another over the first three
 *  quarters, then its points. Safe to call every frame. */
export function drawStory(svg: SVGSVGElement, t: number) {
  const lines = svg.querySelectorAll("[data-s]");
  const m = lines.length;
  lines.forEach((el, k) => {
    const start = (k / m) * 0.6;
    el.setAttribute("stroke-dashoffset", (1 - ease(clamp01((t - start) / 0.3))).toFixed(4));
  });
  svg.querySelectorAll("[data-dot]").forEach((el, j) => {
    el.setAttribute("opacity", clamp01((t - 0.75 - j * 0.03) / 0.12).toFixed(3));
  });
}
