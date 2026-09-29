import Image from "next/image";
import { WebsitePreview, type PreviewVariant } from "@/components/ui/website-preview";
import type { ProjectMedia } from "@/content/types";
import { cn } from "@/lib/cn";

const aspectClasses = {
  "16/10": "aspect-[16/10]",
  "4/3": "aspect-[4/3]",
  "3/2": "aspect-[3/2]",
} as const;

type ProjectImageProps = {
  media: ProjectMedia;
  /**
   * How wide the image is shown at each breakpoint, so the browser downloads
   * the right size, e.g. "(min-width: 1024px) 50vw, 100vw".
   */
  sizes: string;
  /** Load straight away. Use only for the main image at the top of a page. */
  priority?: boolean;
  /** Abstract layout shown while the project has no image yet. */
  placeholder?: PreviewVariant;
  aspect?: keyof typeof aspectClasses;
  className?: string;
};

/**
 * A project screenshot in a fixed aspect-ratio box (no layout shift).
 * Falls back to an abstract website preview when `media.src` is empty.
 */
export function ProjectImage({
  media,
  sizes,
  priority = false,
  placeholder = "split",
  aspect = "16/10",
  className,
}: ProjectImageProps) {
  return (
    <div className={cn("relative overflow-hidden bg-subtle", aspectClasses[aspect], className)}>
      {media.src ? (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          className="object-cover object-top"
          {...(priority ? { loading: "eager" as const, fetchPriority: "high" as const } : {})}
        />
      ) : (
        <WebsitePreview variant={placeholder} />
      )}
    </div>
  );
}
