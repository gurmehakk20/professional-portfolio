import Image from "next/image";
import { WebsitePreview, type PreviewVariant } from "@/components/ui/website-preview";
import type { ProjectMedia } from "@/content/types";
import { cn } from "@/lib/cn";

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
  className?: string;
};

/** A phone is about 27% of the box's width, so it never needs a wide image. */
const phoneSizes = "(min-width: 768px) 320px, 30vw";

/**
 * A project screenshot in a fixed 16:10 box (no layout shift).
 * Phone screenshots (`device: "mobile"`) are shown in a phone outline.
 * Falls back to an abstract website preview when `media.src` is empty.
 */
export function ProjectImage({
  media,
  sizes,
  priority = false,
  placeholder = "split",
  className,
}: ProjectImageProps) {
  const loading = priority ? { loading: "eager" as const, fetchPriority: "high" as const } : {};

  return (
    <div className={cn("relative aspect-[16/10] overflow-hidden bg-subtle", className)}>
      {!media.src ? (
        <WebsitePreview variant={placeholder} />
      ) : media.device === "mobile" ? (
        // The "mobile" placeholder's phone outline, a touch narrower so a standard
        // 1170×2532 capture shows whole. Sized in container units.
        <div className="absolute inset-0 flex items-center justify-center @container">
          <div className="relative h-[54cqw] w-[25.7cqw] overflow-hidden rounded-[3.2cqw] border-[0.7cqw] border-ink bg-surface">
            <Image
              src={media.src}
              alt={media.alt}
              fill
              sizes={phoneSizes}
              className="object-cover object-top"
              {...loading}
            />
          </div>
        </div>
      ) : (
        <Image
          src={media.src}
          alt={media.alt}
          fill
          sizes={sizes}
          className="object-cover object-top"
          {...loading}
        />
      )}
    </div>
  );
}
