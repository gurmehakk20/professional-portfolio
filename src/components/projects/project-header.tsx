import Link from "next/link";
import { Fragment } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Glow, GridPattern } from "@/components/ui/decor";
import { Icon } from "@/components/ui/icon";
import type { Project } from "@/content/types";
import { ProjectVisual } from "./project-visual";

type ProjectHeaderProps = {
  project: Project;
  /** The project's position in the list, e.g. "01". */
  number: string;
};

/** The cover spans the container: 1152px at most, otherwise the viewport minus side padding. */
const coverSizes =
  "(min-width: 1216px) 1152px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)";

/** Top of a case study: back link, title, key facts, links and the cover. */
export function ProjectHeader({ project, number }: ProjectHeaderProps) {
  const facts = [
    { label: "Role", items: project.role ?? [] },
    { label: "Year", items: project.year ? [project.year] : [] },
    { label: "Technologies", items: project.technologies ?? [] },
  ].filter((fact) => fact.items.length > 0);
  const hasLinks = Boolean(project.liveUrl || project.caseStudyUrl);

  return (
    <div className="relative isolate -mt-(--header-height) overflow-hidden pt-[calc(var(--header-height)+1rem)] sm:pt-[calc(var(--header-height)+1.5rem)] lg:pt-[calc(var(--header-height)+2rem)]">
      <GridPattern className="bottom-auto h-[36rem] [mask-image:radial-gradient(ellipse_75%_90%_at_85%_0%,black,transparent_75%)]" />
      <Glow className="-top-48 -right-24 w-[34rem]" />
      <Glow color="cyan" className="-top-24 right-[28%] hidden w-[22rem] md:block" />
      <Container>
        <Link
          href="/work"
          className="group inline-flex h-10 items-center gap-2 text-sm font-medium text-muted transition-colors duration-200 hover:text-ink"
        >
          <Icon
            name="arrow-left"
            size={16}
            className="transition-transform duration-200 ease-out-soft group-hover:-translate-x-0.5"
          />
          All work
        </Link>

        <header className="mt-6 grid gap-10 md:mt-8 lg:mt-10 lg:grid-cols-12 lg:items-end lg:gap-8">
          <div className="lg:col-span-7">
            <p className="flex items-center gap-2.5 text-eyebrow font-semibold text-accent uppercase">
              <span aria-hidden="true" className="tabular-nums">
                {number}
              </span>
              <span aria-hidden="true" className="h-px w-6 bg-line-strong" />
              {project.category}
            </p>
            <h1 className="mt-4 text-h1 font-semibold">{project.title}</h1>
            <p className="mt-5 max-w-2xl text-lead text-muted">{project.summary}</p>

            {hasLinks ? (
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                {project.liveUrl ? (
                  <ButtonLink href={project.liveUrl} trailingIcon="arrow-up-right">
                    Visit live site
                  </ButtonLink>
                ) : null}
                {project.caseStudyUrl ? (
                  <ButtonLink href={project.caseStudyUrl} variant="secondary" icon="file-text">
                    Read the full case study
                  </ButtonLink>
                ) : null}
              </div>
            ) : null}
          </div>

          {facts.length > 0 ? (
            <dl className="max-w-lg divide-y divide-line border-y border-line text-sm lg:col-span-4 lg:col-start-9 lg:max-w-none">
              {facts.map((fact) => (
                <div key={fact.label} className="grid grid-cols-[6.5rem_1fr] gap-4 py-3.5">
                  <dt className="text-muted">{fact.label}</dt>
                  <dd className="font-medium text-ink">
                    {/* Each item is one unit, so lines break between items, not inside them. */}
                    {fact.items.map((item, index) => (
                      <Fragment key={item}>
                        {index > 0 ? " " : null}
                        <span className="inline-block">
                          {item}
                          {index < fact.items.length - 1 ? "," : null}
                        </span>
                      </Fragment>
                    ))}
                  </dd>
                </div>
              ))}
            </dl>
          ) : null}
        </header>

        <ProjectVisual project={project} sizes={coverSizes} priority banner className="mt-10 md:mt-14" />
      </Container>
    </div>
  );
}
