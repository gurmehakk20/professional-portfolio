import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Glow, GridPattern } from "@/components/ui/decor";
import type { HeroContent, Project, SiteConfig } from "@/content/types";
import { HeroVisual } from "./hero-visual";

type HeroProps = {
  content: HeroContent;
  /** Optional "Available for new projects" note shown under the buttons. */
  availability?: SiteConfig["availability"];
  /** Featured project shown in the showcase on the right. */
  project?: Project;
  /** Your name, shown on the showcase's cursor tag. */
  name: string;
};

/**
 * The top of the home page: what I do, the two main actions and a showcase
 * of the featured project. The section slides up under the transparent header
 * so its grid and glows run to the top of the screen.
 *
 * On load the text fades up line by line, then the showcase follows (the
 * `enter` classes in globals.css); the glows drift very slowly behind it all.
 * Both are pure CSS and switch off with reduced motion.
 */
export function Hero({ content, availability, project, name }: HeroProps) {
  const { eyebrow, title, titleHighlight, description, primaryCta, secondaryCta } = content;

  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate -mt-(--header-height) overflow-hidden pt-(--header-height)"
    >
      <GridPattern className="[mask-image:radial-gradient(ellipse_80%_75%_at_70%_15%,black,transparent_78%)]" />
      <Glow className="ambient-drift -top-40 -right-40 w-[48rem]" />
      <Glow color="cyan" className="ambient-drift-alt top-[38%] -left-56 w-[32rem]" />

      <Container className="grid items-center gap-10 pt-8 pb-16 sm:gap-12 sm:pt-14 md:pb-20 lg:grid-cols-12 lg:gap-8 lg:pt-16 lg:pb-24 xl:gap-12">
        <div className="lg:col-span-7 xl:col-span-6">
          {eyebrow ? (
            <p className="enter inline-flex items-center gap-2.5 rounded-full border border-accent/15 bg-surface/80 py-1.5 pr-4 pl-2.5 text-eyebrow font-semibold text-accent-strong uppercase shadow-card">
              <span
                aria-hidden="true"
                className="size-2 rounded-full bg-linear-135 from-accent to-accent-bright ring-4 ring-accent/10"
              />
              {eyebrow}
            </p>
          ) : null}

          <h1
            id="hero-heading"
            // Sized to its column on two-column layouts rather than to the window.
            className="enter mt-6 text-display font-semibold [--enter-delay:80ms] sm:mt-7 lg:text-[clamp(3.25rem,0.9rem+4.1vw,4.5rem)]"
          >
            <HighlightedTitle title={title} highlight={titleHighlight} />
          </h1>

          <p className="enter mt-6 max-w-xl text-lead text-body [--enter-delay:160ms]">{description}</p>

          <div className="enter mt-8 flex max-w-md flex-wrap gap-3 [--enter-delay:240ms] sm:mt-9 sm:max-w-none">
            <ButtonLink
              href={primaryCta.href}
              size="lg"
              trailingIcon="arrow-right"
              className="flex-1 sm:flex-none"
            >
              {primaryCta.label}
            </ButtonLink>
            {secondaryCta ? (
              <ButtonLink
                href={secondaryCta.href}
                variant="secondary"
                size="lg"
                className="flex-1 sm:flex-none"
              >
                {secondaryCta.label}
              </ButtonLink>
            ) : null}
          </div>

          {availability?.show ? (
            <p className="enter mt-6 flex items-center gap-3 text-sm text-muted [--enter-delay:320ms] sm:mt-8">
              <span
                aria-hidden="true"
                className="ml-1 size-2 shrink-0 rounded-full bg-cyan ring-4 ring-cyan/20"
              />
              {availability.label}
            </p>
          ) : null}
        </div>

        <div className="enter-pop [--enter-delay:400ms] lg:col-span-5 xl:col-span-6">
          <HeroVisual project={project} name={name} />
        </div>
      </Container>
    </section>
  );
}

/** Renders the title with `highlight` (if it appears in it) in the blue gradient. */
function HighlightedTitle({ title, highlight }: { title: string; highlight?: string }) {
  const start = highlight ? title.indexOf(highlight) : -1;
  if (!highlight || start === -1) return title;

  return (
    <>
      {title.slice(0, start)}
      <span className="text-gradient box-decoration-clone">{highlight}</span>
      {title.slice(start + highlight.length)}
    </>
  );
}
