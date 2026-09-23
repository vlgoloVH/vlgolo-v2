/** A case study's content. The facts, wording and numbers come from the case
 *  studies on the current site; the page (app/[lang]/cases/[slug]) arranges
 *  them. What makes each case look like itself is set here too: its colour
 *  comes from CASES in lib/site.ts, and the motifs and layouts below pick the
 *  drawings and the choreography for its sections. */

/** The drawing in Context that goes from tangle to order. */
export type Motif = "network" | "journey" | "pipeline" | "catalog" | "growth";

/** How a transformation chapter is staged. Neighbouring chapters use
 *  different ones, so the page alternates loud and quiet moments.
 *  - sticky:   the screen stays pinned while the points light up beside it
 *  - strip:    a long strip of screens slides sideways as you scroll
 *  - flow:     the points become the steps of a flow that draws itself
 *  - backdrop: a large screen drifts slowly behind the words
 *  - reveal:   the screen opens out from a narrow slit */
export type ChapterLayout = "sticky" | "strip" | "flow" | "backdrop" | "reveal";

export interface Chapter {
  /** Short name, e.g. "Product Architecture". */
  name: string;
  title: string;
  description: string;
  points: string[];
  visual: string;
  layout: ChapterLayout;
  /** For the strip layout: the long image, and its pixel size. */
  strip?: { src: string; width: number; height: number };
}

/** A full-screen visual pause, placed after the chapter at `after`
 *  (-1: after the challenge, before the first chapter). */
export interface Moment {
  src: string;
  alt: string;
  after: number;
  effect: "mask" | "tilt" | "drift" | "enter";
  caption?: string;
}

export type System =
  | {
      /** A foundation built up layer by layer, ending in the products or
       *  brands it serves. */
      variant: "stack";
      label: string;
      title: string;
      description: string;
      points: string[];
      /** Names at the top of the stack. */
      outputs: string[];
      /** Show the outputs as separately coloured brands. */
      brands?: boolean;
    }
  | {
      /** Connected modules around one shared core. */
      variant: "lifecycle";
      label: string;
      title: string;
      description: string;
      modules: string[];
      core: string;
    }
  | {
      /** One product growing into many. */
      variant: "ecosystem";
      label: string;
      title: string;
      description: string;
      core: string;
      products: string[];
      total: number;
      totalLabel: string;
    };

export interface CaseStudy {
  slug: string;
  hero: {
    statement: string;
    meta: string[];
  };
  summary: {
    lead: string;
    product: string;
    problem: string;
    role: string;
    result: string;
  };
  context: {
    headline: string[];
    invite: string;
    situation: string;
    outcome: string;
    motif: Motif;
    /** Names that appear on the drawing once it has come into order. */
    labels: string[];
  };
  role: {
    statement: string;
    body: string[];
    scope: string[];
    team: string[];
  };
  challenge: {
    headline: string;
    tensions: string[];
  };
  chapters: Chapter[];
  moments: Moment[];
  system: System;
  impact: {
    items: { value: string; label: string; body: string }[];
    summary: string;
  };
  reflection: string[];
}
