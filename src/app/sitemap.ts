import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/*
 * /sitemap.xml — every public page, so search engines can find them.
 * New projects are added automatically from src/content/projects.ts.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ["", "/work", "/services", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
  }));

  const projectPages: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${site.url}/work/${project.slug}`,
  }));

  return [...pages, ...projectPages];
}
