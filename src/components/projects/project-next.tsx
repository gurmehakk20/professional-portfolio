import Link from "next/link";
import { stretchedLink } from "@/components/ui/card-styles";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import type { Project } from "@/content/types";
import { ProjectCover } from "./project-cover";
import { ProjectImage } from "./project-image";

type ProjectNextProps = {
  project: Project;
  /** The project's position in the list, e.g. "02". */
  number: string;
  /** Background of the section; alternate it with the section above. Default: "subtle". */
  tone?: "default" | "subtle";
};

/** Half the card from md up (minus padding and gap), otherwise the card's inner width. */
const thumbnailSizes =
  "(min-width: 1216px) 535px, (min-width: 768px) calc(50vw - 65px), calc(100vw - 90px)";

/** A single card linking to the next project, shown at the end of a project page. */
export function ProjectNext({ project, number, tone = "subtle" }: ProjectNextProps) {
  // The last word and the arrow stay together, so the arrow never wraps onto a line by itself.
  const splitAt = project.title.lastIndexOf(" ") + 1;
  const titleStart = project.title.slice(0, splitAt);
  const titleEnd = project.title.slice(splitAt);

  return (
    <Section id="next-project" labelledBy="next-project-heading" tone={tone}>
      <div data-reveal className="group relative grid gap-8 rounded-2xl border border-line bg-surface p-6 shadow-card transition-[translate,border-color,box-shadow] duration-300 ease-out-soft hover:border-accent/35 hover:shadow-lift motion-safe:hover:-translate-y-1 md:grid-cols-2 md:gap-10 md:p-8 lg:p-10">
        <div className="flex flex-col md:justify-between">
          <h2
            id="next-project-heading"
            className="font-sans text-eyebrow font-semibold text-accent uppercase"
          >
            Next project
          </h2>
          <div className="mt-6 md:mt-10">
            <p className="flex items-center gap-2.5 text-sm text-muted">
              <span aria-hidden="true" className="font-display font-semibold text-ink tabular-nums">
                {number}
              </span>
              <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
              {project.category}
            </p>
            <h3 className="mt-2 text-h2 font-semibold">
              <Link href={`/work/${project.slug}`} className={stretchedLink}>
                {titleStart}
                <span className="whitespace-nowrap">
                  {titleEnd}
                  <Icon
                    name="arrow-right"
                    size={28}
                    className="ml-2 inline-block size-[0.7em] align-baseline text-accent transition-transform duration-200 ease-out-soft motion-safe:group-hover:translate-x-1"
                  />
                </span>
              </Link>
            </h3>
            <p className="mt-3 max-w-md text-muted">{project.summary}</p>
          </div>
        </div>
        <div className="overflow-hidden rounded-lg border border-line md:self-center">
          {project.cover ? (
            <ProjectImage
              media={project.cover}
              sizes={thumbnailSizes}
              className="transition-transform duration-700 ease-out-soft motion-safe:group-hover:scale-[1.03]"
            />
          ) : (
            <ProjectCover
              project={project}
              className="transition-transform duration-700 ease-out-soft motion-safe:group-hover:scale-[1.03]"
            />
          )}
        </div>
      </div>
    </Section>
  );
}
