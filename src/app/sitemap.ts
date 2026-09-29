import type { MetadataRoute } from "next";
import { projects } from "@/content/projects";
import { site } from "@/content/site";

/*
 * /sitemap.xml — every public page, so search engines can find them.
 * New projects are added automatically from src/content/projects.ts.
 * Placeholder projects are left out until you remove `placeholder: true`.
 * If you add a new page, add its path to the list below.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ["", "/work", "/services", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
  }));

  const projectPages: MetadataRoute.Sitemap = projects
    .filter((project) => !project.placeholder)
    .map((project) => ({ url: `${site.url}/work/${project.slug}` }));

  return [...pages, ...projectPages];
}
