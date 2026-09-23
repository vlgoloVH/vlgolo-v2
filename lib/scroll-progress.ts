/** One shared scroll ticker for everything on a page that follows the scroll:
 *  a single passive listener and at most one rAF per frame, however many
 *  pieces subscribe. Each subscriber reads layout and writes styles in its own
 *  callback; nothing here re-renders React. */

type Tick = () => void;

const ticks = new Set<Tick>();
let raf = 0;
let listening = false;

const run = () => {
  raf = 0;
  ticks.forEach((tick) => tick());
};

const schedule = () => {
  if (!raf) raf = requestAnimationFrame(run);
};

/** Calls `tick` once now and then on every frame the page scrolls or resizes.
 *  Returns the unsubscribe. */
export function onScrollFrame(tick: Tick) {
  ticks.add(tick);
  if (!listening) {
    listening = true;
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
  }
  tick();
  return () => {
    ticks.delete(tick);
    if (ticks.size === 0 && listening) {
      listening = false;
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      cancelAnimationFrame(raf);
      raf = 0;
    }
  };
}

const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1);

/** How far an element has travelled through the viewport: 0 as its top meets
 *  the bottom edge, 1 as its bottom leaves the top edge. */
export function viewProgress(el: Element) {
  const rect = el.getBoundingClientRect();
  const vh = window.innerHeight;
  return clamp01((vh - rect.top) / (vh + rect.height));
}

/** For a tall track holding a sticky child: 0 when the track's top reaches the
 *  top of the viewport, 1 when its bottom reaches the bottom, so the sticky
 *  child is pinned for exactly that range. */
export function stickyProgress(el: Element) {
  const rect = el.getBoundingClientRect();
  const range = rect.height - window.innerHeight;
  return range > 0 ? clamp01(-rect.top / range) : 0;
}

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
