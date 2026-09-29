import Link from "next/link";
import { Fragment } from "react";
import { ArrowLink } from "@/components/ui/arrow-link";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { Icon } from "@/components/ui/icon";
import { Tag } from "@/components/ui/tag";
import type { PreviewVariant } from "@/components/ui/website-preview";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { getProjectNumber } from "@/lib/projects";
import { ProjectImage } from "./project-image";

/** Projects without a screenshot take turns between these placeholder layouts. */
const placeholderLayouts: PreviewVariant[] = ["split", "centered", "mobile"];

/** Cards show at most this many tags, so they stay tidy. */
const maxTags = 3;

/*
 * How wide the cover is shown at each screen size (it sits inset inside the
 * card), so browsers download a suitably sized image. Update these if you
 * change the card or grid layout.
 */
const imageSizes = {
  stacked: "(min-width: 1216px) 460px, (min-width: 768px) 38vw, 76vw",
  wide: "(min-width: 1216px) 556px, (min-width: 1024px) 46vw, (min-width: 768px) 66vw, 76vw",
} as const;

/** Gentle zoom on the cover while the card is hovered. */
const coverMotion =
  "transition-transform duration-500 ease-out-soft motion-safe:group-hover/card:scale-[1.02]";

type ProjectCardProps = {
  project: Project;
  /** Use "h2" when the card sits directly under the page's <h1>, e.g. on /work. */
  headingLevel?: "h2" | "h3";
  /** "wide" spans the full width, with the image and text side by side on large screens. */
  layout?: "stacked" | "wide";
  /** Wide layout only: show the image on the right instead of the left. */
  reverse?: boolean;
  className?: string;
};

/** A project preview linking to its page at /work/[slug]. The whole card is clickable. */
export function ProjectCard({
  project,
  headingLevel: Heading = "h3",
  layout = "stacked",
  reverse = false,
  className,
}: ProjectCardProps) {
  const wide = layout === "wide";
  const number = getProjectNumber(project.slug);
  const placeholder = placeholderLayouts[(Number(number) - 1) % placeholderLayouts.length];
  // The phone placeholder brings its own device frame; everything else sits in a browser window.
  const inBrowser = Boolean(project.cover.src) || placeholder !== "mobile";
  const tags = project.tags.slice(0, maxTags);
  const hasLinks = Boolean(project.liveUrl || project.caseStudyUrl);

  return (
    <article
      className={cn(
        "group/card relative flex flex-col rounded-2xl border border-line bg-surface p-2 shadow-card",
        "transition duration-200 ease-out-soft hover:border-line-strong hover:shadow-lift motion-safe:hover:-translate-y-0.5",
        wide && "lg:grid lg:grid-cols-12",
        className,
      )}
    >
      {/* The cover, presented on a tinted panel. */}
      <div
        className={cn(
          "relative flex flex-col justify-center rounded-lg bg-subtle p-[8%]",
          !inBrowser && "overflow-hidden",
          wide && "md:px-[14%] lg:col-span-7 lg:px-[8%]",
          wide && reverse && "lg:order-last",
        )}
      >
        {inBrowser ? (
          <div className={coverMotion}>
            <BrowserFrame url={project.liveUrl ? getHostname(project.liveUrl) : undefined}>
              <ProjectImage
                media={project.cover}
                sizes={imageSizes[layout]}
                placeholder={placeholder}
              />
            </BrowserFrame>
          </div>
        ) : (
          <>
            {/* Takes up the space of a browser window, so covers line up across cards. */}
            <div className="py-4 sm:py-4.5">
              <div className="aspect-[16/10]" />
            </div>
            <div className={cn("absolute inset-0", coverMotion)}>
              <ProjectImage
                media={project.cover}
                sizes={imageSizes[layout]}
                placeholder={placeholder}
                className="size-full"
              />
            </div>
          </>
        )}
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col px-4 pt-5 pb-4 sm:px-5 sm:pt-6 sm:pb-5",
          wide && "lg:col-span-5 lg:self-center lg:px-10 lg:py-8",
        )}
      >
        <Heading className={cn("text-h3 font-semibold", wide && "md:text-2xl lg:text-[1.75rem]")}>
          <Link
            href={`/work/${project.slug}`}
            className="rounded-sm after:absolute after:inset-0 after:z-1 after:rounded-2xl after:content-['']"
          >
            {project.title}
          </Link>
        </Heading>

        {/* Shown above the title, but placed after it so screen readers hear the title first. */}
        <div className="order-first mb-3 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          <span aria-hidden="true" className="font-semibold text-accent tabular-nums">
            {number}
          </span>
          <span aria-hidden="true" className="h-px w-5 bg-line-strong" />
          <span className="text-muted">{project.category}</span>
          {project.placeholder ? <Tag tone="placeholder">Placeholder</Tag> : null}
        </div>

        <p className="mt-2 max-w-prose text-muted">{project.summary}</p>

        {/* Each service stays on one line; lines only break between services. */}
        {project.services.length > 0 ? (
          <p className="mt-4 text-sm font-medium text-ink">
            <span className="sr-only">Services: </span>
            {project.services.map((service, index) => (
              <Fragment key={service}>
                {index > 0 ? " · " : null}
                <span className="whitespace-nowrap">{service}</span>
              </Fragment>
            ))}
          </p>
        ) : null}

        {tags.length > 0 ? (
          <ul role="list" className="mt-4 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag}>
                <Tag>{tag}</Tag>
              </li>
            ))}
          </ul>
        ) : null}

        <div className="mt-auto pt-6">
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 border-t border-line pt-5">
            {/* Visual cue only: the title link above already makes the whole card clickable. */}
            <span
              aria-hidden="true"
              className="inline-flex items-center gap-1.5 font-semibold text-ink transition-colors duration-200 group-hover/card:text-accent-strong"
            >
              View project
              <Icon
                name="arrow-right"
                size={16}
                className="transition-transform duration-200 ease-out-soft group-hover/card:translate-x-0.5"
              />
            </span>

            {hasLinks ? (
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {project.liveUrl ? (
                  <ArrowLink href={project.liveUrl} className="relative z-10">
                    Visit<span className="sr-only"> the {project.title}</span> website
                  </ArrowLink>
                ) : null}
                {project.caseStudyUrl ? (
                  <ArrowLink href={project.caseStudyUrl} className="relative z-10">
                    <span className="sr-only">{project.title} </span>Case study
                  </ArrowLink>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </article>
  );
}

/** "https://www.arkadental.com/contact" → "arkadental.com", shown in the browser frame's address bar. */
function getHostname(url: string): string | undefined {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return undefined;
  }
}
