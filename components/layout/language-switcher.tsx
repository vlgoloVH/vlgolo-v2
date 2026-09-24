"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LOCALES,
  LOCALE_LABELS,
  localizePath,
  stripLocale,
  type Locale,
} from "@/lib/i18n";

/** Each option is a real link to the same page in the other language, so the
 *  choice lives in the address and can be shared or bookmarked. The page stays
 *  where it is scrolled to: only the words change. */
export function LanguageSwitcher({
  lang,
  label,
  large = false,
}: {
  lang: Locale;
  label: string;
  /** The phone menu sets it a size up, to match the links above it. */
  large?: boolean;
}) {
  const path = stripLocale(usePathname());

  return (
    <div className="flex items-center gap-2" role="group" aria-label={label}>
      {LOCALES.map((code, index) => (
        <span key={code} className="flex items-center gap-2">
          {index > 0 && (
            <span aria-hidden="true" className="h-2.5 w-px bg-white/25" />
          )}
          <Link
            href={localizePath(code, path)}
            hrefLang={code}
            scroll={false}
            aria-current={code === lang ? "true" : undefined}
            className={`${large ? "text-[17px]" : "text-[13px] md:text-[15px]"} tracking-[0.06em] transition-opacity duration-300 ${
              code === lang
                ? "pointer-events-none text-ink opacity-100"
                : "text-ink opacity-40 can-hover:opacity-70"
            }`}
          >
            {LOCALE_LABELS[code]}
          </Link>
        </span>
      ))}
    </div>
  );
}
