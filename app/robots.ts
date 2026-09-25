import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

/** Everything is open to search engines; the sitemap lists every page. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
