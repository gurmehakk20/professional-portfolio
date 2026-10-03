import Image from "next/image";
import { ProjectImage } from "@/components/projects/project-image";
import { BrowserFrame } from "@/components/ui/browser-frame";
import { Icon } from "@/components/ui/icon";
import { MobileScreen, WebsitePreview } from "@/components/ui/website-preview";
import type { Project } from "@/content/types";
import { cn } from "@/lib/cn";
import { displayHost } from "@/lib/links";

type HeroVisualProps = {
  /** The project to feature — its title, screenshots and live link appear in the composition. */
  project?: Project;
  /** Shown on the little design-tool cursor. */
  name: string;
};

/** Small caption text that scales with the composition but stays readable. */
const caption = "text-[clamp(0.5625rem,2.2cqw,0.6875rem)] font-semibold tracking-[0.12em] uppercase";

/** The featured-project label is a real link, so its text never shrinks below 12px. */
const labelCaption = "text-xs font-semibold tracking-[0.12em] uppercase";

/*
 * Hero showcase: a browser window with the featured project, the same site
 * on a phone, and a few small "design file" cards (project label, palette
 * and type, a named cursor). The project label is a real link to the live
 * site ("View live website"); the browser window links there too for mouse
 * users. Everything else is decorative — the project is presented properly
 * in the Work section — so it's hidden from screen readers.
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
  const liveUrl = project?.liveUrl;

  const frame = (
    <BrowserFrame url={displayHost(liveUrl)}>
      {/* The real screenshots show only on large screens, beside the headline.
          Below that the composition sits under the buttons and the Work
          section with the same screenshots follows right after, so the drawn
          preview keeps the first load light (hidden lazy images aren't fetched). */}
      <div className={cn("relative aspect-[16/10]", hasScreenshot && "lg:hidden")}>
        <WebsitePreview variant="split" />
      </div>
      {hasScreenshot && cover ? (
        <ProjectImage media={cover} sizes="40vw" className="hidden lg:block" />
      ) : null}
    </BrowserFrame>
  );

  // The label card is the link to the live site when there is one.
  const Label = liveUrl ? "a" : "div";
  const labelLink = liveUrl
    ? { href: liveUrl, target: "_blank", rel: "noopener noreferrer" }
    : {};

  return (
    <div className="relative mx-auto w-full max-w-xl select-none @container lg:max-w-none">
      <div className="relative pt-[15cqw] pr-[9cqw] pb-[17cqw] pl-[3cqw]">
        {/* Dots and a soft glow behind the composition. */}
        <div aria-hidden="true" className="absolute top-0 right-0 -z-10 h-[46cqw] w-[52cqw] bg-dots fade-edges" />
        <div aria-hidden="true" className="absolute inset-[8%] -z-10 rounded-full bg-[radial-gradient(closest-side,rgb(49_105_196/0.2),transparent)]" />

        {/* The site itself. A mouse-only shortcut to the live site — keyboard
            and screen-reader users get the "View live website" link below. */}
        {liveUrl ? (
          <a href={liveUrl} target="_blank" rel="noopener noreferrer" aria-hidden="true" tabIndex={-1} className="block">
            {frame}
          </a>
        ) : (
          <div aria-hidden="true">{frame}</div>
        )}

        {/* Featured project label — top left. */}
        {project ? (
          <Label
            {...labelLink}
            className="group enter absolute top-0 left-0 w-[66cqw] [--enter-delay:720ms] rounded-[2.4cqw] @sm:w-[56cqw] @lg:w-[48cqw] border border-line bg-surface p-[2.6cqw] shadow-float transition-[border-color,box-shadow] duration-200 ease-out-soft hover:border-accent/35 hover:shadow-lift"
          >
            <div className="flex items-center gap-[2.4cqw]">
              <span aria-hidden="true" className="grid size-[9cqw] shrink-0 place-items-center rounded-[1.8cqw] bg-linear-135 from-accent to-accent-bright font-display text-[4.2cqw] font-bold text-white">
                {project.title.charAt(0)}
              </span>
              <span className="min-w-0">
                <span className={`block truncate text-muted ${labelCaption}`}>Featured project</span>
                <span className="mt-[0.6cqw] block truncate font-display text-[clamp(0.875rem,3.6cqw,1rem)] leading-tight font-semibold text-ink">
                  {project.title}
                </span>
              </span>
            </div>
            {liveUrl ? (
              <span className="mt-[2.4cqw] flex items-center gap-[1cqw] border-t border-line pt-[2.2cqw] text-[clamp(0.8125rem,2.8cqw,0.875rem)] font-semibold text-accent-strong">
                View live website
                <Icon
                  name="arrow-up-right"
                  size={14}
                  className="shrink-0 transition-transform duration-200 ease-out-soft motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5"
                />
                <span className="sr-only"> (opens in a new tab)</span>
              </span>
            ) : null}
          </Label>
        ) : null}

        {/* The same site on a phone — bottom right. */}
        <div aria-hidden="true" className="enter absolute right-0 bottom-0 aspect-[9/19] [--enter-delay:820ms] w-[25cqw] overflow-hidden rounded-[4.2cqw] border-[length:1cqw] border-ink bg-surface shadow-frame">
          <MobileScreen className={project?.mobileCover ? "lg:hidden" : undefined} />
          {project?.mobileCover ? (
            <div className="absolute inset-0 hidden lg:block">
              <Image
                src={project.mobileCover.src}
                alt=""
                fill
                sizes="160px"
                className="object-cover object-top"
              />
            </div>
          ) : null}
        </div>

        {/* Palette and type, like a card from a design file — bottom left. */}
        <div aria-hidden="true" className="enter absolute bottom-0 left-0 w-[40cqw] [--enter-delay:900ms] rounded-[2.4cqw] border border-line bg-surface p-[2.6cqw] shadow-float">
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
        <div aria-hidden="true" className="pointer-events-none enter absolute top-[46%] left-[50%] flex items-start [--enter-delay:1080ms] drop-shadow-[0_4px_8px_rgb(28_78_156/0.3)]">
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
