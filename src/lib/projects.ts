import { projects } from "@/content/projects";
import type { Project } from "@/content/types";

export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug);
}

/** Projects marked `featured`, or the first three if none are. */
export function getFeaturedProjects(): Project[] {
  const featured = projects.filter((project) => project.featured);
  return featured.length > 0 ? featured : projects.slice(0, 3);
}

/** Projects with a full case study — each gets a page at /work/[slug]. */
export function getCaseStudies(): Project[] {
  return projects.filter((project) => project.caseStudy);
}

/** The case study after this one, wrapping around to the first. */
export function getNextCaseStudy(slug: string): Project | undefined {
  const caseStudies = getCaseStudies();
  if (caseStudies.length < 2) return undefined;
  const index = caseStudies.findIndex((project) => project.slug === slug);
  return caseStudies[(index + 1) % caseStudies.length];
}

/** "01", "02"… based on the project's position in the list. */
export function getProjectNumber(slug: string): string {
  const index = projects.findIndex((project) => project.slug === slug);
  return String(index + 1).padStart(2, "0");
}
