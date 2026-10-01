import { ProjectImage } from "@/components/projects/project-image";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { MobileScreen, WebsitePreview } from "@/components/ui/website-preview";
import type { Project } from "@/content/types";
import { displayHost } from "@/lib/links";

type HeroVisualProps = {
  /** The project to feature — its title, category and cover appear in the composition. */
  project?: Project;
  /** Shown on the little design-tool cursor. */
  name: string;
};

/** Small caption text that scales with the composition but stays readable. */
const caption = "text-[clamp(0.5625rem,2.2cqw,0.6875rem)] font-semibold tracking-[0.12em] uppercase";

/*
 * Hero showcase: a browser window with the featured project, the same site
 * on a phone, and a few small "design file" cards (project label, palette
 * and type, a named cursor). Purely decorative — the project itself is
 * presented properly in the Work section — so it's hidden from screen readers.
 *
 * Sizes use container query units (cqw = 1% of the composition's width), so
 * it keeps its proportions from a small phone to a wide desktop. The padding
 * reserves the space the floating cards stick out into, so nothing ever
 * extends past the column. On load the cards settle in just after the
 * browser window (see the hero).
 */
export function HeroVisual({ project, name }: HeroVisualProps) {
  const cover = project?.cover;
  const hasScreenshot = Boolean(cover?.src && cover.device !== "mobile");

  return (
    <div aria-hidden="true" className="relative mx-auto w-full max-w-xl select-none @container lg:max-w-none">
      <div className="relative pt-[13cqw] pr-[9cqw] pb-[17cqw] pl-[3cqw]">
        {/* Dots and a soft glow behind the composition. */}
        <div className="absolute top-0 right-0 -z-10 h-[46cqw] w-[52cqw] bg-dots fade-edges" />
        <div className="absolute inset-[8%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(37_99_235/0.2),transparent)]" />

        <BrowserFrame url={displayHost(project?.liveUrl)}>
          {hasScreenshot && cover ? (
            <ProjectImage media={cover} sizes="(min-width: 1024px) 40vw, 90vw" priority />
          ) : (
            <div className="relative aspect-[16/10]">
              <WebsitePreview variant="split" />
            </div>
          )}
        </BrowserFrame>

        {/* Featured project label — top left. */}
        {project ? (
          <div className="enter absolute top-0 left-0 w-[56cqw] [--enter-delay:720ms] rounded-[2.4cqw] @lg:w-[48cqw] border border-line bg-surface p-[2.6cqw] shadow-float">
            <div className="flex items-center gap-[2.4cqw]">
              <span className="grid size-[9cqw] shrink-0 place-items-center rounded-[1.8cqw] bg-linear-135 from-accent to-cyan font-display text-[4.2cqw] font-bold text-white">
                {project.title.charAt(0)}
              </span>
              <span className="min-w-0">
                <span className={`block truncate text-muted ${caption}`}>Featured project</span>
                <span className="mt-[0.6cqw] block truncate font-display text-[clamp(0.75rem,3.6cqw,1rem)] leading-tight font-semibold text-ink">
                  {project.title}
                </span>
              </span>
            </div>
            <span className="mt-[2.2cqw] inline-flex items-center gap-[1.2cqw] rounded-full border border-accent/15 bg-accent-soft px-[2cqw] py-[0.7cqw] text-[clamp(0.5625rem,2.4cqw,0.75rem)] font-medium text-accent-strong">
              <span className="size-[1.4cqw] rounded-full bg-accent" />
              {project.category}
            </span>
          </div>
        ) : null}

        {/* The same site on a phone — bottom right. */}
        <div className="enter absolute right-0 bottom-0 aspect-[9/19] [--enter-delay:820ms] w-[25cqw] overflow-hidden rounded-[4.2cqw] border-[length:1cqw] border-ink bg-surface shadow-frame">
          <MobileScreen />
        </div>

        {/* Palette and type, like a card from a design file — bottom left. */}
        <div className="enter absolute bottom-0 left-0 w-[40cqw] [--enter-delay:900ms] rounded-[2.4cqw] border border-line bg-surface p-[2.6cqw] shadow-float">
          <div className="flex items-end justify-between gap-[2cqw]">
            <span className="font-display text-[8cqw] leading-[0.8] font-semibold tracking-[-0.04em] text-ink">
              Aa
            </span>
            <span className={`text-right text-muted ${caption}`}>
              Type &amp;
              <br />
              palette
            </span>
          </div>
          <div className="mt-[2.6cqw] flex gap-[1.6cqw]">
            <span className="size-[5.4cqw] rounded-full bg-ink" />
            <span className="size-[5.4cqw] rounded-full bg-accent" />
            <span className="size-[5.4cqw] rounded-full bg-cyan" />
            <span className="size-[5.4cqw] rounded-full bg-accent-soft ring-1 ring-accent/20 ring-inset" />
            <span className="size-[5.4cqw] rounded-full bg-canvas ring-1 ring-line-strong ring-inset" />
          </div>
        </div>

        {/* A named cursor, as in a shared design file. */}
        <div className="enter absolute top-[46%] left-[50%] flex items-start [--enter-delay:1080ms] drop-shadow-[0_4px_8px_rgb(37_99_235/0.3)]">
          <svg viewBox="0 0 16 16" className="size-[4.6cqw]" fill="none">
            <path
              d="M2 1.5 14 7.2 8.6 8.6 6.6 14.5 2 1.5Z"
              className="fill-accent stroke-white"
              strokeWidth="1.25"
              strokeLinejoin="round"
            />
          </svg>
          <span className="mt-[3.4cqw] -ml-[0.6cqw] rounded-full bg-accent px-[2cqw] py-[0.6cqw] text-[clamp(0.5625rem,2.3cqw,0.75rem)] font-semibold text-white">
            {name}
          </span>
        </div>
      </div>
    </div>
  );
}
