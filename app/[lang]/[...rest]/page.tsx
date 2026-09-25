import { notFound } from "next/navigation";

/** Any address that is not a page lands here and gets the site's own 404
 *  (app/[lang]/not-found.tsx), inside the site's header and frame, instead of
 *  the framework's bare one. */
export const dynamicParams = true;

export default function Missing() {
  notFound();
}
