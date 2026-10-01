import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { getCaseStudies } from "@/lib/projects";

/*
 * /sitemap.xml — every public page, so search engines can find them.
 * Case-study pages are added automatically for projects with a `caseStudy`
 * in src/content/projects.ts. If you add a new page, add its path below.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const pages: MetadataRoute.Sitemap = ["", "/work", "/services", "/contact"].map((path) => ({
    url: `${site.url}${path}`,
  }));

  const caseStudyPages: MetadataRoute.Sitemap = getCaseStudies().map((project) => ({
    url: `${site.url}/work/${project.slug}`,
  }));

  return [...pages, ...caseStudyPages];
}
