import type { NextConfig } from "next";
import { PHASE_PRODUCTION_BUILD } from "next/constants";

/*
 * Security headers sent with every response.
 * Strict-Transport-Security (HSTS) is left to the hosting platform.
 */
const securityHeaders = [
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), browsing-topics=()",
  },
];

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // AVIF where the browser supports it, WebP otherwise.
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/:path*", headers: securityHeaders }];
  },
};

export default function config(phase: string): NextConfig {
  // A reminder during `npm run build` until the real site URL is set (see src/content/site.ts).
  if (phase === PHASE_PRODUCTION_BUILD && !process.env.NEXT_PUBLIC_SITE_URL?.trim()) {
    console.warn(
      "\n⚠ NEXT_PUBLIC_SITE_URL is not set. Canonical URLs, sitemap.xml, robots.txt, structured data " +
        "and link-preview images will point to https://www.example.com, and search engines are asked " +
        "not to index the site. Set it in your hosting environment before launch (it's read at build time).\n",
    );
  }
  return nextConfig;
}
