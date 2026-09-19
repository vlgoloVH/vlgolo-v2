import type { Metadata, Viewport } from "next";
import "@fontsource-variable/inter";
import "./globals.css";
import { HoverCapability } from "@/components/layout/hover-capability";
import { Preloader } from "@/components/layout/preloader";
import { SiteHeader } from "@/components/layout/site-header";
import { SocialRail } from "@/components/layout/social-rail";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.role}`,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: `${SITE.name} — ${SITE.role}`,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        <HoverCapability />
        <Preloader />
        <SiteHeader />
        <SocialRail />
        <main>{children}</main>
      </body>
    </html>
  );
}
