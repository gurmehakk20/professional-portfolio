import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { ProjectMedia } from "@/content/types";
import { cn } from "@/lib/cn";
import { ProjectImage } from "./project-image";

type ProjectGalleryProps = {
  screenshots: ProjectMedia[];
  /** Background of the section; alternate it with the sections around it. */
  tone?: "default" | "subtle";
};

/** Full container width, and half of it (minus the gap) from md up. */
const fullSizes =
  "(min-width: 1216px) 1152px, (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)";
const halfSizes =
  "(min-width: 1216px) 564px, (min-width: 768px) calc(50vw - 44px), (min-width: 640px) calc(100vw - 64px), calc(100vw - 40px)";

/** Screenshots in a two-column gallery. Hidden when there are none. */
export function ProjectGallery({ screenshots, tone = "default" }: ProjectGalleryProps) {
  if (screenshots.length === 0) return null;

  // With an odd number of screenshots, the first one runs full width.
  const firstIsWide = screenshots.length % 2 === 1;

  return (
    <Section id="screenshots" labelledBy="screenshots-heading" tone={tone}>
      <SectionHeader id="screenshots-heading" title="Screenshots" />
      <div data-reveal="group" className="mt-10 grid gap-4 sm:gap-5 md:mt-14 md:grid-cols-2 lg:gap-6">
        {screenshots.map((screenshot, index) => {
          const wide = firstIsWide && index === 0;
          return (
            <figure key={index} className={cn(wide && "md:col-span-2")}>
              <div className="overflow-hidden rounded-xl border border-line bg-surface shadow-card">
                <ProjectImage media={screenshot} sizes={wide ? fullSizes : halfSizes} />
              </div>
              {screenshot.caption ? (
                <figcaption className="mt-3 text-sm text-muted">{screenshot.caption}</figcaption>
              ) : null}
            </figure>
          );
        })}
      </div>
    </Section>
  );
}
