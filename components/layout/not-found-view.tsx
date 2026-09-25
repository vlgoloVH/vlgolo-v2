"use client";

import { useEffect } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { localizePath, type Locale } from "@/lib/i18n";
import { RevealSection } from "@/components/layout/reveal-section";
import { GlassButton } from "@/components/ui/glass-button";

const COPY = {
  en: {
    headline: "This page doesn’t exist.",
    body: "The link may be broken, or the page has moved. Let’s get you back on track.",
    home: "Back to home",
    work: "View work",
    scene: "An empty desk at night, the screen still on",
  },
  uk: {
    headline: "Такої сторінки немає.",
    body: "Можливо, посилання зламане або сторінку перенесли. Повернімося назад.",
    home: "На головну",
    work: "Дивитися роботи",
    scene: "Порожній стіл уночі, екран ще світиться",
  },
} as const;

/** The 404, closing the same way the site does: the empty desk from the
 *  contact screen, dimmed like the hero video, a large outlined 404 over it,
 *  one line of explanation and the same glass pills, each rising in turn. The
 *  language comes from the address, since a missing page has no data of its
 *  own. */
export function NotFoundView() {
  const lang: Locale = usePathname()?.startsWith("/uk") ? "uk" : "en";
  const copy = COPY[lang];

  // Opened straight on a missing address: the header and the frame come in on
  // the short entrance, as on the About and case pages (see ScrollDriver).
  useEffect(() => {
    const root = document.documentElement;
    if (!root.dataset.ready) root.dataset.quick = "true";
  }, []);

  return (
    <RevealSection className="relative flex min-h-[100svh] flex-col overflow-hidden bg-bg">
      <title>{`404 — ${lang === "uk" ? "Влад Голобородько" : "Vlad Holoborodko"}`}</title>
      <Image
        id="not-found-scene"
        src="/contact/workspace.jpg"
        alt={copy.scene}
        fill
        priority
        sizes="100vw"
        className="object-cover object-[72%_50%] opacity-[var(--video-dim)] md:object-right"
      />

      <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden md:block">
        <span className="reveal-line absolute inset-y-0 left-[var(--frame-line)] w-px bg-white/12" />
        <span className="reveal-line absolute inset-y-0 right-[var(--frame-line)] w-px bg-white/12" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-6 py-28 text-center md:px-[var(--frame-pad)]">
        <p
          aria-hidden="true"
          className="reveal [--reveal-i:1] text-[clamp(120px,24vw,340px)] font-bold leading-[0.85] tracking-[-0.06em]"
        >
          <span className="cs-outline">404</span>
        </p>
        <h1 className="reveal [--reveal-i:2] mt-8 text-balance text-[clamp(34px,4.4vw,76px)] font-bold leading-[1.19] tracking-[-0.002em] text-ink">{copy.headline}</h1>
        <p className="reveal [--reveal-i:3] mt-6 max-w-[30rem] text-balance text-[20px] leading-relaxed text-ink/75">
          {copy.body}
        </p>
        <div className="reveal [--reveal-i:4] mt-10 grid gap-4 sm:grid-cols-2">
          <GlassButton href={localizePath(lang, "/")} label={copy.home} videoSelector="#not-found-scene" className="w-full" />
          <GlassButton href={localizePath(lang, "/#works")} label={copy.work} videoSelector="#not-found-scene" className="w-full" />
        </div>
      </div>
    </RevealSection>
  );
}
