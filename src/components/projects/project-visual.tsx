import { BrowserFrame } from "@/components/ui/browser-frame";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { displayHost } from "@/lib/links";
import { ProjectCover } from "./project-cover";
import { ProjectImage } from "./project-image";

type ProjectVisualProps = {
  project: Project;
  /** How wide the screenshot is shown, for responsive image loading. */
  sizes: string;
  /** Load straight away (the main image at the top of a page). */
  priority?: boolean;
  /** Use the wider banner shape for a designed cover (top of a case study). */
  banner?: boolean;
  className?: string;
};

/**
 * A project's picture: its screenshot in a browser window (or a phone, for
 * mobile screenshots), or — until there's a screenshot — its designed cover.
 */
export function ProjectVisual({ project, sizes, priority, banner, className }: ProjectVisualProps) {
  const { cover } = project;

  if (!cover) {
    return (
      <ProjectCover
        project={project}
        shape={banner ? "banner" : "card"}
        className={cn("rounded-xl", className)}
      />
    );
  }

  if (cover.device === "mobile") {
    return (
      <ProjectImage
        media={cover}
        sizes={sizes}
        priority={priority}
        className={cn("rounded-xl border border-line", className)}
      />
    );
  }

  return (
    <BrowserFrame url={displayHost(project.liveUrl)} className={className}>
      <ProjectImage media={cover} sizes={sizes} priority={priority} />
    </BrowserFrame>
  );
}
