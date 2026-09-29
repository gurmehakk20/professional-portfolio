import { ProjectCard } from "@/components/projects/project-card";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { Project, SectionIntro } from "@/content/types";
import { cn } from "@/lib/cn";

type FeaturedWorkProps = {
  intro: SectionIntro;
  projects: Project[];
  id?: string;
  /** Background of the section; alternate it with the sections around it. */
  tone?: "default" | "subtle";
};

/**
 * Home page "Selected work". The first project is shown as a wide feature
 * card and the rest in two columns. With an even number of projects the last
 * one is wide too (image on the other side), so the grid never ends with a gap.
 */
export function FeaturedWork({
  intro,
  projects,
  id = "work",
  tone = "default",
}: FeaturedWorkProps) {
  if (projects.length === 0) return null;

  const headingId = `${id}-heading`;
  const lastIndex = projects.length - 1;
  const lastIsWide = lastIndex > 0 && projects.length % 2 === 0;

  return (
    <Section id={id} labelledBy={headingId} tone={tone}>
      <SectionHeader
        id={headingId}
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        action={<ArrowLink href="/work">View all work</ArrowLink>}
      />

      <ul role="list" className="reveal mt-10 grid gap-4 sm:gap-5 md:mt-14 md:grid-cols-2 lg:gap-6">
        {projects.map((project, index) => {
          const wide = index === 0 || (lastIsWide && index === lastIndex);
          return (
            <li key={project.slug} className={cn(wide && "md:col-span-2")}>
              <ProjectCard
                project={project}
                layout={wide ? "wide" : "stacked"}
                reverse={wide && index > 0}
                className="h-full"
              />
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
