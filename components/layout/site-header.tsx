import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site";

/** Sizes and the gap are in vw for the same reason the hero type is: the 1440
 *  Figma proportions should hold at any desktop width. The header shares the
 *  hero's content column, so the wordmark sits on the left vertical rule and
 *  the last nav item on the right one. */
export function SiteHeader() {
  return (
    <header className="enter-chrome fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-5 md:px-0 md:py-[2.3vw]">
        <Link
          href="/"
          className="text-[13px] font-bold tracking-[-0.01em] text-ink transition-opacity duration-300 hover:opacity-70 md:text-[1.55vw]"
        >
          {SITE.wordmark}
        </Link>

        <nav aria-label="Main">
          <ul className="flex items-center gap-4 md:gap-[3.54vw]">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="group relative text-[13px] text-ink transition-opacity duration-300 hover:opacity-70 md:text-[1.15vw]"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink/70 transition-transform duration-300 ease-out-quart group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
