import Link from "next/link";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { Dictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";
import { NAV_LINKS, SITE } from "@/lib/site";

export function SiteHeader({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  return (
    <header className="enter-chrome fixed inset-x-0 top-0 z-50">
      <div className="flex items-center justify-between px-5 py-5 md:px-[var(--frame-pad)] md:py-8">
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
            {dict.status}
          </span>
        </div>

        {/* Nav and language are one row but read as two blocks: the gap between
            them is much wider than the gap inside the nav. */}
        <div className="flex items-center gap-6 md:gap-16">
          <nav aria-label={dict.ui.mainNav}>
            <ul className="flex items-center gap-4 md:gap-10">
              {NAV_LINKS.map((link) => (
                <li key={link.key}>
                  <Link
                    href={localizePath(lang, link.href)}
                    className="group relative text-[13px] text-ink/85 transition-colors duration-300 can-hover:text-ink md:text-[15px]"
                  >
                    {dict.nav[link.key]}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink/70 transition-transform duration-300 ease-out-quart group-can-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <LanguageSwitcher lang={lang} label={dict.ui.language} />
        </div>
      </div>
    </header>
  );
}
