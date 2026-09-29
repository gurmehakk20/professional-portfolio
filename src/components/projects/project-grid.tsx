import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { ProjectCard } from "./project-card";

/**
 * Every project in a calm two-column grid (one column on phones), for the
 * /work page. With an odd number of projects the last one spans both
 * columns, so the grid never ends with an empty gap.
 */
export function ProjectGrid({ projects }: { projects: Project[] }) {
  if (projects.length === 0) return null;

  const lastIndex = projects.length - 1;
  const lastIsWide = projects.length % 2 === 1;

  return (
    <ul role="list" className="grid gap-4 sm:gap-5 md:grid-cols-2 lg:gap-6">
      {projects.map((project, index) => {
        const wide = lastIsWide && index === lastIndex;
        return (
          <li key={project.slug} className={cn(wide && "md:col-span-2")}>
            <ProjectCard
              project={project}
              headingLevel="h2"
              layout={wide ? "wide" : "stacked"}
              className="h-full"
            />
          </li>
        );
      })}
    </ul>
  );
}
