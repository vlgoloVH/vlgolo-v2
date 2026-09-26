import type { Metadata, Viewport } from "next";
import { notFound } from "next/navigation";
import "@fontsource-variable/inter";
import "../globals.css";
import { Analytics } from "@vercel/analytics/next";
import { HoverCapability } from "@/components/layout/hover-capability";
import { Preloader } from "@/components/layout/preloader";
import { SiteHeader } from "@/components/layout/site-header";
import { SocialRail } from "@/components/layout/social-rail";
import { getDictionary } from "@/lib/dictionaries";
import { LOCALES, isLocale, localizePath } from "@/lib/i18n";
import { SITE_URL } from "@/lib/site";
import { sharing } from "@/lib/seo";

type Params = Promise<{ lang: string }>;

export function generateStaticParams() {
  return LOCALES.map((lang) => ({ lang }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isLocale(lang)) return {};
  const { meta } = getDictionary(lang);
  const title = `${meta.name} — ${meta.role}`;

  return {
    metadataBase: new URL(SITE_URL),
    title: { default: title, template: `%s — ${meta.name}` },
    description: meta.description,
    alternates: {
      canonical: localizePath(lang, "/"),
      languages: {
        en: "/",
        uk: "/uk",
        "x-default": "/",
      },
    },
    ...sharing({ lang, path: "/", title, description: meta.description, image: "home" }),
  };
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Params;
}) {
  const { lang } = await params;
  if (!isLocale(lang)) notFound();
  const dict = getDictionary(lang);

  return (
    <html lang={lang}>
      <body className="font-sans">
        <HoverCapability />
        <Preloader />
        <SiteHeader lang={lang} dict={dict} />
        <SocialRail />
        <main>{children}</main>
        <Analytics />
      </body>
    </html>
  );
}
