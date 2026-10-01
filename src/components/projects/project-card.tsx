import Link from "next/link";
import { ArrowLink } from "@/components/ui/arrow-link";
import { stretchedLink } from "@/components/ui/card-styles";
import { Icon } from "@/components/ui/icon";
import { Tag } from "@/components/ui/tag";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { ProjectVisual } from "./project-visual";

/*
 * How wide the picture is shown at each screen size, so browsers download a
 * suitably sized image. Update these if you change the card or grid layout.
 */
const imageSizes = {
  stacked: "(min-width: 1216px) 520px, (min-width: 768px) 42vw, 86vw",
  wide: "(min-width: 1216px) 620px, (min-width: 1024px) 52vw, 86vw",
} as const;

type ProjectCardProps = {
  project: Project;
  /** Use "h2" when the card sits directly under the page's <h1>, e.g. on /work. */
  headingLevel?: "h2" | "h3";
  /** "wide" spans the full width, with picture and text side by side on large screens. */
  layout?: "stacked" | "wide";
  /** Wide layout only: show the picture on the right instead of the left. */
  reverse?: boolean;
  className?: string;
};

/**
 * A project as proof of work: picture, category, name, one-line summary,
 * technologies and links. The whole card links to the case study if there
 * is one, otherwise to the live site. With neither, it's a plain card.
 */
export function ProjectCard({
  project,
  headingLevel: Heading = "h3",
  layout = "stacked",
  reverse = false,
  className,
}: ProjectCardProps) {
  const wide = layout === "wide";
  const caseStudyHref = project.caseStudy ? `/work/${project.slug}` : undefined;
  const cardHref = caseStudyHref ?? project.liveUrl;
  const opensNewTab = !caseStudyHref && Boolean(project.liveUrl);
  const technologies = project.technologies ?? [];
  const role = project.role ?? [];

  return (
    <article
      className={cn(
        "group/card relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface shadow-card",
        cardHref &&
          "transition duration-300 ease-out-soft hover:border-accent/35 hover:shadow-lift motion-safe:hover:-translate-y-1",
        wide && "lg:grid lg:grid-cols-12",
        className,
      )}
    >
      {/* The picture, inset on a soft panel. */}
      <div
        className={cn(
          "relative m-2 mb-0 overflow-hidden rounded-xl",
          project.cover && project.cover.device !== "mobile"
            ? "bg-linear-160 from-accent-soft via-[#f2f5fb] to-cyan-soft p-[7%]"
            : null,
          wide && "lg:col-span-7 lg:mb-2",
          wide && reverse && "lg:order-last",
        )}
      >
        <div
          className={cn(
            "transition-transform duration-700 ease-out-soft",
            cardHref && "motion-safe:group-hover/card:scale-[1.03]",
          )}
        >
          <ProjectVisual project={project} sizes={imageSizes[layout]} />
        </div>
      </div>

      <div
        className={cn(
          "flex flex-1 flex-col px-5 pt-6 pb-6 sm:px-7 sm:pb-7",
          wide && "lg:col-span-5 lg:justify-center lg:px-10 lg:py-10",
        )}
      >
        <Heading
          className={cn("text-h3 font-semibold", wide && "md:text-2xl lg:text-[2rem] lg:leading-tight")}
        >
          {cardHref ? (
            <Link
              href={cardHref}
              className={stretchedLink}
              {...(opensNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              {project.title}
              <span className="sr-only">
                {caseStudyHref ? ", view case study" : ", visit live site (opens in a new tab)"}
              </span>
            </Link>
          ) : (
            project.title
          )}
        </Heading>

        {/* Shown above the name, but placed after it so screen readers hear the name first. */}
        <div className="order-first mb-4 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
          <Tag tone="accent">{project.category}</Tag>
          {role.length > 0 ? <span className="text-muted">{role.join(" & ")}</span> : null}
          {project.year ? <span className="text-muted">{project.year}</span> : null}
        </div>

        <p className={cn("mt-3 text-muted", wide && "lg:text-[1.0625rem]")}>{project.summary}</p>

        {technologies.length > 0 ? (
          <div className="mt-5">
            <p className="sr-only">Built with</p>
            <ul role="list" className="flex flex-wrap gap-2">
              {technologies.map((technology) => (
                <li key={technology}>
                  <Tag>{technology}</Tag>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        {cardHref || project.caseStudyUrl ? (
          <div className="mt-auto pt-7">
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-line pt-5">
              {/* Visual cue only: the name above already links the whole card. */}
              {cardHref ? (
                <span
                  aria-hidden="true"
                  className="inline-flex items-center gap-1.5 font-semibold text-accent-strong"
                >
                  {caseStudyHref ? "View case study" : "Visit live site"}
                  <Icon
                    name={caseStudyHref ? "arrow-right" : "arrow-up-right"}
                    size={16}
                    className={cn(
                      "transition-transform duration-300 ease-out-soft",
                      caseStudyHref
                        ? "motion-safe:group-hover/card:translate-x-1"
                        : "motion-safe:group-hover/card:translate-x-0.5 motion-safe:group-hover/card:-translate-y-0.5",
                    )}
                  />
                </span>
              ) : null}
              {caseStudyHref && project.liveUrl ? (
                <ArrowLink href={project.liveUrl} className="relative z-10">
                  Visit live site<span className="sr-only">: {project.title}</span>
                </ArrowLink>
              ) : null}
              {project.caseStudyUrl ? (
                <ArrowLink href={project.caseStudyUrl} className="relative z-10">
                  Case study<span className="sr-only">: {project.title}</span>
                </ArrowLink>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </article>
  );
}
