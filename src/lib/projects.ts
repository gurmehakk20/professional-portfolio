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

/** The project after this one, wrapping around to the first. */
export function getNextProject(slug: string): Project | undefined {
  if (projects.length < 2) return undefined;
  const index = projects.findIndex((project) => project.slug === slug);
  return projects[(index + 1) % projects.length];
}

/** "01", "02"… based on the project's position in the list. */
export function getProjectNumber(slug: string): string {
  const index = projects.findIndex((project) => project.slug === slug);
  return String(index + 1).padStart(2, "0");
}
