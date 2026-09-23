"use client";

import type { Ref } from "react";
import type { Motif } from "@/lib/cases/types";

/** The Context drawing: complexity turning into clarity, in each case's own
 *  shape. Nodes start scattered and tangled in stray links; as the story moves
 *  from "what I found" to "what happened next" they travel into order, the
 *  stray links let go and the real structure draws itself. Rendered once,
 *  then moved by drawMotif(svg, t) with t 0 → 1. */

const W = 400;
const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);
const seg = (t: number, a: number, b: number) => clamp01((t - a) / (b - a));
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

function seeded(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let r = Math.imul(a ^ (a >>> 15), 1 | a);
    r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

interface Node {
  /** Where it sits in the tangle, and where it settles. */
  chaos: [number, number];
  order: [number, number];
  r: number;
  label?: string;
  /** Set the label under the node rather than over it. */
  below?: boolean;
}

interface Layout {
  nodes: Node[];
  /** The real structure, drawn once everything is in place. */
  links: [number, number][];
  /** Stray links that only exist in the tangle. */
  noise: [number, number][];
}

const polar = (cx: number, cy: number, r: number, a: number): [number, number] => [
  cx + Math.cos(a) * r,
  cy + Math.sin(a) * r,
];

function build(motif: Motif, labels: string[]): Layout {
  const rand = seeded(motif.length * 97 + labels.length);
  const chaos = (): [number, number] => [50 + rand() * 300, 50 + rand() * 300];
  const nodes: Node[] = [];
  const links: [number, number][] = [];
  const add = (order: [number, number], r: number, label?: string, below = false) => {
    nodes.push({ chaos: chaos(), order, r, label, below });
    return nodes.length - 1;
  };

  switch (motif) {
    case "network": {
      // A hub and its product zones, each with its own sub-sections.
      const hub = add([200, 200], 7);
      labels.forEach((label, i) => {
        const a = (i / labels.length) * Math.PI * 2 - Math.PI / 2;
        const zone = add(polar(200, 200, 112, a), 5, label);
        links.push([hub, zone]);
        [-0.34, 0.34].forEach((d) => {
          const leaf = add(polar(200, 200, 168, a + d), 2.6);
          links.push([zone, leaf]);
        });
      });
      break;
    }
    case "journey": {
      // One visitor path through every touchpoint.
      let prev = -1;
      labels.forEach((label, i) => {
        const x = 50 + (i / (labels.length - 1)) * 300;
        const y = 200 + Math.sin(i * 1.1) * 46;
        // Labels alternate above and below the path so neighbours never touch.
        const stop = add([x, y], 5, label, i % 2 === 1);
        if (prev >= 0) links.push([prev, stop]);
        prev = stop;
      });
      for (let i = 0; i < labels.length - 1; i++) {
        const x = 50 + ((i + 0.5) / (labels.length - 1)) * 300;
        const y = 200 + Math.sin((i + 0.5) * 1.1) * 46;
        add([x, y], 2);
      }
      break;
    }
    case "pipeline": {
      // Stages in a row, each with the items that pass through it.
      let prev = -1;
      labels.forEach((label, i) => {
        const x = 70 + (i / (labels.length - 1)) * 260;
        const stage = add([x, 150], 6, label);
        if (prev >= 0) links.push([prev, stage]);
        prev = stage;
        for (let k = 0; k < 3; k++) {
          const item = add([x, 205 + k * 34], 2.6);
          links.push([k === 0 ? stage : item - 1, item]);
        }
      });
      break;
    }
    case "catalog": {
      // One root, two branches, each an orderly grid.
      const root = add([200, 70], 6);
      labels.forEach((label, b) => {
        const bx = b === 0 ? 118 : 282;
        const branch = add([bx, 150], 5, label);
        links.push([root, branch]);
        for (let k = 0; k < 9; k++) {
          const leaf = add([bx - 44 + (k % 3) * 44, 212 + Math.floor(k / 3) * 44], 2.6);
          if (k < 3) links.push([branch, leaf]);
          else links.push([leaf - 3, leaf]);
        }
      });
      break;
    }
    case "growth": {
      // One product at the centre, the rest growing out in rings.
      const core = add([200, 200], 8, labels[0]);
      for (let i = 0; i < 6; i++) {
        const n = add(polar(200, 200, 86, (i / 6) * Math.PI * 2), 4);
        links.push([core, n]);
      }
      for (let i = 0; i < 9; i++) {
        const n = add(polar(200, 200, 152, (i / 9) * Math.PI * 2 + 0.3), 3);
        links.push([1 + (i % 6), n]);
      }
      break;
    }
  }

  const noise: [number, number][] = [];
  for (let i = 0; i < nodes.length * 1.3; i++) {
    const a = Math.floor(rand() * nodes.length);
    const b = Math.floor(rand() * nodes.length);
    if (a !== b) noise.push([a, b]);
  }
  return { nodes, links, noise };
}

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  vectorEffect: "non-scaling-stroke" as const,
};

export function MotifArt({
  motif,
  labels,
  ref,
  className = "",
}: {
  motif: Motif;
  labels: string[];
  ref?: Ref<SVGSVGElement>;
  className?: string;
}) {
  const { nodes, links, noise } = build(motif, labels);
  return (
    <svg
      ref={ref}
      viewBox={`0 0 ${W} ${W}`}
      className={`overflow-visible ${className}`}
      aria-hidden="true"
      data-motif={motif}
      data-labels={labels.join("|")}
    >
      {noise.map(([a, b], i) => (
        <line key={`n${i}`} data-noise={`${a},${b}`} {...stroke} strokeWidth={1} opacity={0} />
      ))}
      {links.map(([a, b], i) => (
        <line key={`l${i}`} data-link={`${a},${b}`} {...stroke} strokeWidth={1.3} opacity={0} />
      ))}
      {nodes.map((node, i) => (
        <g key={`d${i}`} data-node={i}>
          <circle r={node.r} fill="currentColor" />
          {node.label && (
            <text
              y={node.below ? node.r + 20 : -node.r - 10}
              textAnchor="middle"
              fill="currentColor"
              className="font-mono text-[11px] uppercase tracking-[0.12em]"
              opacity={0}
            >
              {node.label}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}

const cache = new WeakMap<SVGSVGElement, Layout>();

/** Moves the drawing to t: 0 a few scattered points, 0.5 the full tangle,
 *  1 the finished structure. */
export function drawMotif(svg: SVGSVGElement, t: number) {
  let layout = cache.get(svg);
  if (!layout) {
    layout = build(svg.dataset.motif as Motif, (svg.dataset.labels ?? "").split("|"));
    cache.set(svg, layout);
  }
  const { nodes } = layout;
  const appear = seg(t, 0, 0.42);
  const order = ease(seg(t, 0.5, 0.92));
  // A slow wobble while tangled, gone once in order.
  const wobble = (1 - order) * 7;

  const pos = nodes.map((node, i) => {
    const w = Math.sin(t * 18 + i) * wobble;
    return [
      lerp(node.chaos[0] + w, node.order[0], order),
      lerp(node.chaos[1] - w, node.order[1], order),
    ];
  });

  svg.querySelectorAll<SVGGElement>("[data-node]").forEach((g, i) => {
    const on = seg(appear, i / nodes.length - 0.1, i / nodes.length + 0.15);
    g.setAttribute("transform", `translate(${pos[i][0].toFixed(1)} ${pos[i][1].toFixed(1)})`);
    g.setAttribute("opacity", (on * (0.45 + order * 0.55)).toFixed(3));
    const text = g.querySelector("text");
    if (text) text.setAttribute("opacity", seg(t, 0.86, 1).toFixed(3));
  });

  const line = (el: SVGLineElement, pair: string, alpha: number) => {
    const [a, b] = pair.split(",").map(Number);
    el.setAttribute("x1", pos[a][0].toFixed(1));
    el.setAttribute("y1", pos[a][1].toFixed(1));
    el.setAttribute("x2", pos[b][0].toFixed(1));
    el.setAttribute("y2", pos[b][1].toFixed(1));
    el.setAttribute("opacity", alpha.toFixed(3));
  };

  const tangle = seg(t, 0.22, 0.5) * (1 - seg(t, 0.55, 0.85));
  svg
    .querySelectorAll<SVGLineElement>("[data-noise]")
    .forEach((el) => line(el, el.dataset.noise!, tangle * 0.3));
  svg
    .querySelectorAll<SVGLineElement>("[data-link]")
    .forEach((el) => line(el, el.dataset.link!, seg(t, 0.7, 0.98) * 0.7));
}
