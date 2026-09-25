import type { MetadataRoute } from "next";
import { CASE_SLUGS } from "@/lib/cases";
import { LOCALES, localizePath } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";

/** Every page in both languages, each one pointing at its twin in the other
 *  language so search engines show the right one. */
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/about", ...CASE_SLUGS.map((slug) => `/cases/${slug}`)];
  const url = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

  return paths.flatMap((path) =>
    LOCALES.map((lang) => ({
      url: url(localizePath(lang, path)),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: path === "/" ? 1 : path === "/about" ? 0.8 : 0.7,
      alternates: {
        languages: Object.fromEntries(LOCALES.map((l) => [l, url(localizePath(l, path))])),
      },
    })),
  );
}
