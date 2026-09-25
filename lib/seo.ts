import type { Metadata } from "next";
import { getDictionary } from "@/lib/dictionaries";
import { localizePath, type Locale } from "@/lib/i18n";

/** The share preview for a page: its own title, description, address and
 *  1200 × 630 picture (made for each page and language, in public/og), so a
 *  link to a case shows that case in LinkedIn, Telegram or Slack rather than
 *  the home page. */
export function sharing({
  lang,
  path,
  title,
  description,
  image,
}: {
  lang: Locale;
  /** The page's path without the language, e.g. "/cases/smartcrowd". */
  path: string;
  title: string;
  description: string;
  /** The picture's name under public/og/<lang>/, without ".jpg". */
  image: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const { meta } = getDictionary(lang);
  const images = [{ url: `/og/${lang}/${image}.jpg`, width: 1200, height: 630, alt: title }];
  return {
    openGraph: {
      title,
      description,
      url: localizePath(lang, path),
      siteName: meta.name,
      locale: lang === "uk" ? "uk_UA" : "en_US",
      type: "website",
      images,
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
