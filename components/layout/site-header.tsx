import Link from "next/link";
import { NAV_LINKS, SITE } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-content items-center justify-between px-6 py-5 md:px-10 md:py-6">
        <Link
          href="/"
          className="enter-soft font-display text-base font-semibold tracking-tight text-ink transition-colors duration-300 hover:text-accent md:text-lg"
        >
          {SITE.name}
          <span className="text-accent">.</span>
        </Link>

        <nav aria-label="Main" className="enter-soft">
          <ul className="flex items-center gap-5 md:gap-9">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <Link
                  href={link.href}
                  className="group relative font-mono text-[11px] uppercase tracking-[0.18em] text-muted transition-colors duration-300 hover:text-ink md:text-xs"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 h-px w-full origin-left scale-x-0 bg-accent transition-transform duration-300 ease-out-quart group-hover:scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
