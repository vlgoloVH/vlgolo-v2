import type { Dictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";
import { CASES } from "@/lib/site";
import { RevealSection } from "@/components/layout/reveal-section";
import { WorksTrack, type WorkItem } from "@/components/sections/works-track";
import { ExploreCursor } from "@/components/ui/explore-cursor";

/** One section-slide holding a horizontal track of full-screen cases —
 *  SlideScroll (components/layout) feeds a vertical wheel/swipe into the
 *  track's scrollLeft while this section is active, so each case slides in
 *  from the side and the one before it slides out. Every case fills edge to
 *  edge between the frame lines, never past them into the rail or social-icon
 *  strips. The behaviour (tint, progress, image drift) lives in WorksTrack. */
export function Works({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const items: WorkItem[] = CASES.map((item) => ({
    slug: item.slug,
    tint: item.tint,
    title: item.title,
    lines: [...item.lines],
    description: dict.works.cases[item.slug],
    tags: [...item.tags],
    cover: item.cover,
    href: localizePath(lang, item.href),
  }));

  return (
    <RevealSection
      id="works"
      className="section-slide relative z-20 overflow-hidden bg-surface"
    >
      <WorksTrack items={items} explore={dict.works.explore} progressLabel={dict.works.progress} />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="reveal-line absolute inset-y-0 left-[var(--frame-line)] w-px bg-white/12" />
        <span className="reveal-line absolute inset-y-0 right-[var(--frame-line)] w-px bg-white/12" />
      </div>

      {/* Section name in the left margin, exactly where the About rail sits. */}
      <div
        aria-hidden="true"
        className="absolute left-0 top-1/2 hidden w-[var(--frame-line)] -translate-y-1/2 justify-center md:flex"
      >
        <span className="reveal [--reveal-i:1] text-[14px] uppercase tracking-[0.36em] text-ink/60 [text-orientation:upright] [writing-mode:vertical-rl]">
          {dict.works.rail}
        </span>
      </div>

      <ExploreCursor />
    </RevealSection>
  );
}
