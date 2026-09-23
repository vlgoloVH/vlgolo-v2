/** A case study's content. The facts, wording, numbers and their order come
 *  from the case studies on the current site (vlgolo.com); the page
 *  (app/[lang]/cases/[slug]) arranges them. What makes each case look like
 *  itself is set here too: its colour comes from CASES in lib/site.ts, the
 *  motif picks the Context drawing, and each chapter's layout picks how it is
 *  staged. */

/** The drawing in Context that goes from fragments to structure. */
export type Motif = "network" | "journey" | "pipeline" | "catalog" | "growth";

/** How a transformation chapter is staged. Neighbouring chapters use
 *  different ones, so the page alternates loud and quiet moments.
 *  - sticky:   the screen stays pinned while the points light up beside it
 *  - strip:    a long strip of screens slides sideways as you scroll
 *  - flow:     the points become the steps of a flow that draws itself
 *  - backdrop: a large screen drifts slowly behind the words
 *  - reveal:   the screen opens out from a narrow slit
 *  - focus:    the room takes the case's colour, the screen comes forward
 *              and the points change one at a time in large type */
export type ChapterLayout = "sticky" | "strip" | "flow" | "backdrop" | "reveal" | "focus";

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

export interface CaseStudy {
  slug: string;
  hero: {
    statement: string;
    meta: string[];
  };
  context: {
    invite: string;
    situation: string;
    outcome: string;
    motif: Motif;
    /** Names that appear on the drawing once it has come into order. */
    labels: string[];
  };
  role: {
    /** The role on the project, e.g. "Lead Product Designer". */
    title: string;
    summary: string;
    summaryExtra?: string;
    owned: string[];
    withWhom: string[];
    howIWorked: string[];
  };
  /** The full-screen images between My Role and the transformation, and the
   *  line that opens the transformation. */
  overview: {
    tagline: string;
    images: { src: string; alt: string }[];
  };
  chapters: Chapter[];
  impact: {
    items: { value: string; label: string; body: string }[];
    summary: string;
  };
  reflection: string[];
}
