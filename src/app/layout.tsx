import type { Metadata, Viewport } from "next";
import { HashLinkFocus } from "@/components/layout/hash-link-focus";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { JsonLd } from "@/components/seo/json-ld";
import { isPlaceholderSiteUrl, site } from "@/content/site";
import { brandColors } from "@/lib/brand";
import { fontVariables } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // e.g. "Services | Mehak — Web Design & Development"
  title: { default: site.title, template: `%s | ${site.title}` },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.author }],
  creator: site.author,
  // "./" resolves against each page's own path, so every page gets its own canonical URL.
  alternates: { canonical: "./" },
  // Pages set only `title` and `description`; Open Graph and Twitter tags are
  // filled in from those, and the image comes from opengraph-image.tsx.
  openGraph: { type: "website", siteName: site.name, locale: site.locale },
  formatDetection: { telephone: false },
  // Keep an unconfigured deploy out of search results until NEXT_PUBLIC_SITE_URL is set.
  ...(isPlaceholderSiteUrl ? { robots: { index: false, follow: false } } : {}),
};

export const viewport: Viewport = {
  themeColor: brandColors.canvas,
  colorScheme: "light",
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      name: site.name,
      alternateName: site.title,
      url: site.url,
    },
    {
      "@type": "Person",
      name: site.author,
      jobTitle: site.jobTitle,
      url: site.url,
      email: `mailto:${site.contact.email}`,
      sameAs: site.socials.map((social) => social.href),
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" data-scroll-behavior="smooth" className={fontVariables}>
      <body className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2.5 focus:text-sm focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1} className="flex-1 outline-none">
          {children}
        </main>
        <SiteFooter />
        <HashLinkFocus />
        <JsonLd data={structuredData} />
      </body>
    </html>
  );
}
