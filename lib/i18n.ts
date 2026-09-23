/** English lives at the bare paths (/, /about), Ukrainian under /uk. The
 *  middleware maps the bare paths onto the `en` segment internally, so both
 *  languages are real, separately indexable pages. */
export const LOCALES = ["en", "uk"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "en";

/** What the switcher shows. The code is ISO 639-1 ("uk"), the label is the
 *  one people actually recognise ("UA"). */
export const LOCALE_LABELS: Record<Locale, string> = {
  en: "EN",
  uk: "UA",
};

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value);
}

/** An internal link in the given language: "/about" becomes "/uk/about". */
export function localizePath(locale: Locale, href: string): string {
  if (locale === DEFAULT_LOCALE) return href;
  if (href === "/") return `/${locale}`;
  return `/${locale}${href.startsWith("/#") ? href.slice(1) : href}`;
}

/** The same page with the language prefix taken off: "/uk/about" → "/about". */
export function stripLocale(pathname: string): string {
  const bare = pathname.replace(/^\/(en|uk)(?=\/|$)/, "");
  return bare || "/";
}
