"use client";

import { useState } from "react";
import { LANGUAGES } from "@/lib/site";

/** Visual switch only for now: it holds the selection so the header is
 *  complete, and swaps nothing until the UA copy exists. */
export function LanguageSwitcher() {
  const [active, setActive] = useState<string>(LANGUAGES[0].code);

  return (
    <div className="flex items-center gap-2" role="group" aria-label="Language">
      {LANGUAGES.map((lang, index) => (
        <span key={lang.code} className="flex items-center gap-2">
          {index > 0 && (
            <span aria-hidden="true" className="h-2.5 w-px bg-white/25" />
          )}
          <button
            type="button"
            onClick={() => setActive(lang.code)}
            aria-pressed={active === lang.code}
            className={`text-[13px] tracking-[0.06em] transition-opacity duration-300 md:text-[15px] ${
              active === lang.code
                ? "text-ink opacity-100"
                : "text-ink opacity-40 hover:opacity-70"
            }`}
          >
            {lang.label}
          </button>
        </span>
      ))}
    </div>
  );
}
