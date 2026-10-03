import Image from "next/image";
import { ArrowLink } from "@/components/ui/arrow-link";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { ButtonLink } from "@/components/ui/button";
import { stretchedLink } from "@/components/ui/card-styles";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { displayHost } from "@/lib/links";
import { LivePreview } from "./live-preview";
import { ProjectCover } from "./project-cover";

/*
 * How wide the screenshots are shown, so browsers download a suitable size.
 * The preview takes 7 of 12 columns on large screens and the full width below.
 */
const desktopSizes = "(min-width: 1280px) 620px, (min-width: 1024px) 50vw, calc(100vw - 64px)";
const phoneSizes = "(min-width: 1280px) 150px, (min-width: 1024px) 12vw, 20vw";

type ProjectShowcaseProps = {
  projects: Project[];
  /** Use "h2" when the list sits directly under the page's <h1>, e.g. on /work. */
  headingLevel?: "h2" | "h3";
  className?: string;
};

/**
 * Projects presented one at a time, each as a short case-study teaser: a
 * large preview of the site with its phone view, then the number, name,
 * category, summary, tags and a link to the live site. On large screens the
 * preview and text swap sides from one project to the next.
 */
export function ProjectShowcase({
  projects,
  headingLevel = "h3",
  className,
}: ProjectShowcaseProps) {
  if (projects.length === 0) return null;

  return (
    <ol role="list" className={cn("flex flex-col gap-20 md:gap-28 lg:gap-32", className)}>
      {projects.map((project, index) => (
        <li key={project.slug} data-reveal>
          <ShowcaseItem
            project={project}
            number={String(index + 1).padStart(2, "0")}
            headingLevel={headingLevel}
            flip={index % 2 === 1}
          />
        </li>
      ))}
    </ol>
  );
}

type ShowcaseItemProps = {
  project: Project;
  number: string;
  headingLevel: "h2" | "h3";
  /** Text on the left and preview on the right (large screens). */
  flip: boolean;
};

function ShowcaseItem({ project, number, headingLevel: Heading, flip }: ShowcaseItemProps) {
  const { title, category, summary, liveUrl, caseStudy } = project;
  const tags = project.tags ?? [];
  const caseStudyHref = caseStudy ? `/work/${project.slug}` : undefined;
  // The main link covers the whole project, so the preview is clickable too.
  const mainHref = liveUrl ?? caseStudyHref;

  return (
    <article className="group/project relative grid items-center gap-8 sm:gap-10 lg:grid-cols-12 lg:gap-12 xl:gap-16">
      <div className={cn("lg:col-span-7", flip && "lg:order-last")}>
        <ShowcasePreview project={project} />
      </div>

      <div className="lg:col-span-5">
        <p
          aria-hidden="true"
          className="flex items-center gap-3 text-sm font-semibold text-accent tabular-nums"
        >
          {number}
          <span className="h-px w-8 bg-line-strong" />
        </p>
        <Heading className="mt-4 text-[2rem] leading-[1.1] font-semibold tracking-[-0.03em] transition-colors duration-300 ease-out-soft group-hover/project:text-accent-strong sm:text-[2.25rem] lg:text-[2.5rem]">
          {title}
        </Heading>
        <p className="mt-2 font-medium text-body">{category}</p>
        <p className="mt-5 max-w-xl text-muted lg:text-[1.0625rem]">{summary}</p>

        {tags.length > 0 ? (
          <ul role="list" aria-label="What the work covered" className="mt-5 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        ) : null}

        {mainHref ? (
          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
            <ButtonLink
              href={mainHref}
              variant="secondary"
              trailingIcon={liveUrl ? "arrow-up-right" : "arrow-right"}
              // Hovering anywhere on the project hovers this link, so its arrow and border respond too.
              className={stretchedLink}
            >
              {liveUrl ? "View live website" : "View case study"}
              <span className="sr-only">: {title}</span>
            </ButtonLink>
            {liveUrl && caseStudyHref ? (
              <ArrowLink href={caseStudyHref} className="relative z-10">
                Read the case study<span className="sr-only">: {title}</span>
              </ArrowLink>
            ) : null}
          </div>
        ) : null}
      </div>
    </article>
  );
}

/**
 * The site in a browser window — its screenshot, replaced by the live site
 * on desktop where it allows embedding — with the phone view overlapping the
 * bottom-right corner, where it covers imagery rather than the site's
 * headline (which usually sits on the left). Sized in container units, so the composition
 * keeps its proportions at every width; the padding reserves the space the
 * phone sticks out into, so nothing overflows.
 */
function ShowcasePreview({ project }: { project: Project }) {
  const { cover, mobileCover, liveUrl } = project;

  if (!cover) {
    return <ProjectCover project={project} className="rounded-xl" />;
  }

  return (
    // The padding is on an inner box: container units resolve against the
    // nearest *ancestor* container, so they can't size the container itself.
    <div className="@container">
      <div className="relative pr-[8cqw] pb-[8cqw]">
        <BrowserFrame
          url={displayHost(liveUrl)}
          className="transition-[translate,scale,border-color,box-shadow] duration-500 ease-out-soft group-hover/project:border-accent/30 group-hover/project:shadow-lift motion-safe:group-hover/project:-translate-y-0.5 motion-safe:group-hover/project:scale-[1.01]"
        >
          <div className="relative aspect-[16/10] overflow-hidden bg-subtle">
            <Image
              src={cover.src}
              alt={cover.alt}
              fill
              sizes={desktopSizes}
              className="object-cover object-top"
            />
            {project.embed && liveUrl ? (
              <LivePreview src={liveUrl} title={`Live preview of ${project.title} website`} />
            ) : null}
          </div>
        </BrowserFrame>

        {mobileCover ? (
          <div className="absolute right-0 bottom-0 aspect-[9/19.5] w-[22cqw] overflow-hidden rounded-[3.2cqw] border-[0.9cqw] border-ink bg-surface shadow-frame transition-[translate] duration-500 ease-out-soft motion-safe:group-hover/project:-translate-y-1">
            <Image
              src={mobileCover.src}
              alt={mobileCover.alt}
              fill
              sizes={phoneSizes}
              className="object-cover object-top"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}
