import Link from "next/link";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { Dictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";
import { NAV_LINKS, SITE } from "@/lib/site";

export function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <header className="enter-chrome fixed inset-x-0 top-0 z-50">
      <div className="relative flex items-center justify-between px-5 py-5 md:px-[var(--frame-pad)] md:py-8">
        <div className="flex items-center gap-4 md:gap-7">
          <Link
            href={localizePath(lang, "/")}
            className="text-[13px] font-bold tracking-tight text-ink transition-opacity duration-300 can-hover:opacity-70 md:text-lg"
          >
            {SITE.wordmark}
          </Link>

          {/* Availability reads as a live badge beside the name, not as a label
              buried at the bottom of the screen. */}
          <span className="flex items-center gap-2 text-[13px] text-[#4ade80] md:text-[15px]">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-[status-pulse_2.8s_ease-out_infinite] rounded-full bg-[#4ade80]" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
            </span>
            {/* Below 1360 the words would run into the centred nav, so the
                pulsing dot carries it alone and the words stay for screen
                readers. */}
            <span className="sr-only min-[1360px]:not-sr-only">{dict.status}</span>
          </span>
        </div>

        {/* Centred on the page itself, not in the space left between the two
            sides, so it sits on the same axis as the hero headline. Tablet and
            mobile get their own menu later. */}
        <nav
          aria-label={dict.ui.mainNav}
          className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 lg:block"
        >
          <ul className="flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <li key={link.key}>
                <Link
                  href={localizePath(lang, link.href)}
                  className="group relative text-[15px] text-ink/85 transition-colors duration-300 can-hover:text-ink"
                >
                  {dict.nav[link.key]}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink/70 transition-transform duration-300 ease-out-quart group-can-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-5 md:gap-8">
          <LanguageSwitcher lang={lang} label={dict.ui.language} />

          <a
            href={SITE.resume}
            download
            className="flex items-center gap-2 rounded-full border border-white/20 px-3.5 py-1.5 text-[13px] text-ink transition-colors duration-300 can-hover:border-white/50 can-hover:bg-white/5 md:px-4 md:py-2 md:text-[15px]"
          >
            {dict.resume}
            {/* The arrow keeps dropping into the tray, on a slow loop. */}
            <svg
              viewBox="0 0 14 14"
              width="14"
              height="14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
              className="overflow-visible"
            >
              <g className="download-arrow">
                <path d="M7 1.5v7M4 5.8 7 8.8l3-3" />
              </g>
              <path d="M2 12.5h10" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
