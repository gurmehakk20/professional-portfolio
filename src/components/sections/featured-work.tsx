import { ProjectShowcase } from "@/components/projects/project-showcase";
import { ArrowLink } from "@/components/ui/arrow-link";
import { ButtonLink } from "@/components/ui/button";
import { DotPattern } from "@/components/ui/decor";
import { Section, type SectionTone } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { CtaLink, Project, SectionIntro } from "@/content/types";

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
 * Home page "Selected work": each featured project as a short case-study
 * teaser with a large preview, alternating sides (see ProjectShowcase).
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

      <ProjectShowcase projects={projects} className="mt-12 md:mt-16 lg:mt-20" />

      {cta ? (
        <div
          data-reveal
          className="mt-20 flex flex-col gap-4 rounded-2xl border border-line bg-surface/70 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6 md:mt-28 lg:mt-32 lg:px-8"
        >
          <div>
            <p className="font-display text-lg font-semibold text-ink">
              Want to see what I can build for your business?
            </p>
            <p className="mt-1 text-sm text-muted">
              Tell me what you&apos;re planning — I&apos;ll reply with clear next steps.
            </p>
          </div>
          <ButtonLink
            href={cta.href}
            variant="secondary"
            trailingIcon="arrow-right"
            className="self-start sm:self-auto"
          >
            {cta.label}
          </ButtonLink>
        </div>
      ) : null}
    </Section>
  );
}
