import Link from "next/link";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import { NAV_LINKS, SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="enter-chrome fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-content items-center justify-between px-5 py-5 md:px-14 md:py-8">
        <Link
          href="/"
          className="text-[13px] font-bold tracking-tight text-ink transition-opacity duration-300 hover:opacity-70 md:text-lg"
        >
          {SITE.wordmark}
        </Link>

        {/* Nav and language are one row but read as two blocks: the gap between
            them is much wider than the gap inside the nav. */}
        <div className="flex items-center gap-6 md:gap-16">
          <nav aria-label="Main">
            <ul className="flex items-center gap-4 md:gap-10">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="group relative text-[13px] text-ink/85 transition-colors duration-300 hover:text-ink md:text-[15px]"
                  >
                    {link.label}
                    <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-ink/70 transition-transform duration-300 ease-out-quart group-hover:scale-x-100" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <LanguageSwitcher />
        </div>
      </div>
    </header>
  );
}
