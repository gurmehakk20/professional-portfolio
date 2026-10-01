import { ProjectCard } from "@/components/projects/project-card";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ButtonLink } from "@/components/ui/button";
import { DotPattern } from "@/components/ui/decor";
import { Section, type SectionTone } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { CtaLink, Project, SectionIntro } from "@/content/types";
import { cn } from "@/lib/cn";

type FeaturedWorkProps = {
  intro: SectionIntro;
  projects: Project[];
  id?: string;
  /** Background of the section; alternate it with the sections around it. */
  tone?: SectionTone;
  /** Section number shown before the eyebrow, e.g. "01". */
  number?: string;
  /** Adds a "View all work" link — pass it when there are more projects than shown here. */
  viewAllHref?: string;
  /** The prompt under the projects, e.g. "Start a project". */
  cta?: CtaLink;
};

/**
 * Home page "Selected work". The first project is shown as a wide feature
 * card and the rest in two columns. With an even number of projects the last
 * one is wide too (picture on the other side), so the grid never ends with a gap.
 * A short prompt underneath turns the proof into a next step.
 */
export function FeaturedWork({
  intro,
  projects,
  id = "work",
  tone = "default",
  number,
  viewAllHref,
  cta,
}: FeaturedWorkProps) {
  if (projects.length === 0) return null;

  const headingId = `${id}-heading`;
  const lastIndex = projects.length - 1;
  const lastIsWide = lastIndex > 0 && projects.length % 2 === 0;

  return (
    <Section
      id={id}
      labelledBy={headingId}
      tone={tone}
      decor={<DotPattern className="top-10 right-0 hidden h-64 w-96 md:block" />}
    >
      <SectionHeader
        id={headingId}
        number={number}
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        action={viewAllHref ? <ArrowLink href={viewAllHref}>View all work</ArrowLink> : undefined}
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

      {cta ? (
        <div className="mt-6 flex flex-col gap-4 rounded-2xl border border-line bg-surface/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 lg:mt-8 lg:px-8">
          <div>
            <p className="font-display text-lg font-semibold text-ink">
              Have a project like this in mind?
            </p>
            <p className="mt-1 text-sm text-muted">
              Tell me what you&apos;re planning — I&apos;ll reply with clear next steps.
            </p>
          </div>
          <ButtonLink href={cta.href} variant="secondary" trailingIcon="arrow-right" className="self-start sm:self-auto">
            {cta.label}
          </ButtonLink>
        </div>
      ) : null}
    </Section>
  );
}
