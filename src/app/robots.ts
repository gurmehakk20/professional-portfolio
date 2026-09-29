import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/** /robots.txt — lets every search engine crawl the site and points them to the sitemap. */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
