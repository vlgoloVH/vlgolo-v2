"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { LanguageSwitcher } from "@/components/layout/language-switcher";
import type { Dictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";
import { NAV_LINKS } from "@/lib/site";

/** Phone only. The burger sits at the right end of the header and opens a
 *  full-screen sheet with the same links as the desktop nav, centred, and the
 *  language choice above them. The sheet is portalled to <body> one layer
 *  below the header, so the header stays on top and the burger itself turns
 *  into the close button. */
export function MobileMenu({ lang, dict }: { lang: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!open) return;

    const root = document.documentElement;
    root.style.overflow = "hidden";

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    // Turning a phone into something wider closes it: from tablet up the
    // header has no burger to close it with.
    const wide = window.matchMedia("(min-width: 768px)");
    const onWide = () => {
      if (wide.matches) setOpen(false);
    };

    // Any link tapped while the sheet is open closes it on the spot. This
    // listens on window in the capture phase because SlideScroll catches
    // same-page section links on document, also in capture, and stops them
    // there to run its own glide, so a click handler on the link itself would
    // never fire. The scroll lock comes off first, so that glide can move.
    const onLink = (event: MouseEvent) => {
      if (!(event.target as Element | null)?.closest?.("a[href]")) return;
      root.style.overflow = "";
      setOpen(false);
    };

    window.addEventListener("keydown", onKey);
    window.addEventListener("click", onLink, true);
    wide.addEventListener("change", onWide);

    return () => {
      root.style.overflow = "";
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("click", onLink, true);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <>
      <button
        type="button"
        aria-label={open ? dict.ui.closeMenu : dict.ui.openMenu}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((value) => !value)}
        className="-mr-2 flex h-10 w-10 items-center justify-center text-ink md:hidden"
      >
        {/* Two bars that cross into an X. */}
        <span aria-hidden="true" className="relative block h-3 w-5">
          <span
            className={`absolute left-0 top-1/2 h-px w-full bg-current transition-transform duration-500 ease-out-quart ${
              open ? "rotate-45" : "-translate-y-[5px]"
            }`}
          />
          <span
            className={`absolute left-0 top-1/2 h-px w-full bg-current transition-transform duration-500 ease-out-quart ${
              open ? "-rotate-45" : "translate-y-[5px]"
            }`}
          />
        </span>
      </button>

      {mounted &&
        createPortal(
          <div
            id="mobile-menu"
            data-open={open ? "true" : undefined}
            aria-hidden={!open}
            inert={!open}
            className="mobile-menu fixed inset-0 z-[45] flex flex-col items-center justify-center bg-bg/95 backdrop-blur-xl md:hidden"
          >
            <div
              className="mobile-menu-item mb-14"
              style={{ "--menu-i": 0 } as React.CSSProperties}
            >
              <LanguageSwitcher lang={lang} label={dict.ui.language} large />
            </div>

            <nav aria-label={dict.ui.mainNav}>
              <ul className="flex flex-col items-center gap-11">
                {NAV_LINKS.map((link, index) => (
                  <li
                    key={link.key}
                    className="mobile-menu-item"
                    style={{ "--menu-i": index + 1 } as React.CSSProperties}
                  >
                    <Link
                      href={localizePath(lang, link.href)}
                      className="text-[32px] font-medium tracking-tight text-ink"
                    >
                      {dict.nav[link.key]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>,
          document.body,
        )}
    </>
  );
}
