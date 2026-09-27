import type { Metadata, Viewport } from "next";
import "@fontsource-variable/plus-jakarta-sans";
import "@fontsource-variable/instrument-sans";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/ui/JsonLd";
import { getSiteSettings } from "@/lib/content";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  return {
    metadataBase: new URL(s.url),
    title: { default: s.seo.title ?? s.name, template: `%s | ${s.name}` },
    description: s.seo.description ?? s.description,
    applicationName: s.name,
    openGraph: {
      siteName: s.name,
      type: "website",
      locale: "en_GB",
      images: [{ url: "/opengraph-image", width: 1200, height: 630, alt: s.name }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export const viewport: Viewport = {
  themeColor: "#06173b",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSiteSettings();
  return (
    <html lang="en-GB">
      <body>
        <JsonLd data={[organizationJsonLd(), websiteJsonLd()]} />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[60] focus:rounded-full focus:bg-gold-500 focus:px-5 focus:py-2.5 focus:font-medium focus:text-forest-950"
        >
          Skip to main content
        </a>
        <Navbar navigation={settings.navigation} cta={settings.primaryCta} />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
