import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import type { HeroContent, SiteConfig } from "@/content/types";
import { cn } from "@/lib/cn";
import { HeroVisual } from "./hero-visual";

type HeroProps = {
  content: HeroContent;
  /** Optional "Available for new projects" note shown under the buttons. */
  availability?: SiteConfig["availability"];
};

/**
 * The top of the home page: what I do, the two main actions and an
 * illustration. Nothing here animates — it's the first thing people see.
 */
export function Hero({ content, availability }: HeroProps) {
  const { eyebrow, title, description, primaryCta, secondaryCta } = content;

  return (
    <section aria-labelledby="hero-heading">
      <Container className="grid items-center gap-10 pt-10 pb-14 md:pt-16 lg:grid-cols-2 lg:gap-12 lg:py-20 xl:gap-16">
        <div className="max-w-2xl">
          {eyebrow ? (
            <p className="text-eyebrow font-semibold text-accent uppercase">{eyebrow}</p>
          ) : null}
          <h1 id="hero-heading" className={cn("text-display font-semibold", eyebrow && "mt-4")}>
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-lead text-muted">
            {keepHyphenatedWordsTogether(description)}
          </p>

          {/* Phones: two equal buttons (stacked on the narrowest screens). */}
          <div className="mt-8 flex max-w-md flex-wrap gap-3">
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
            <p className="mt-6 flex items-center gap-3 text-sm text-muted">
              <span
                aria-hidden="true"
                className="ml-1 size-2 shrink-0 rounded-full bg-accent ring-4 ring-accent/15"
              />
              {availability.label}
            </p>
          ) : null}
        </div>

        <HeroVisual />
      </Container>
    </section>
  );
}

/** Stops words like "business-focused" from breaking at the hyphen. */
function keepHyphenatedWordsTogether(text: string) {
  return text.split(/(\S+-\S+)/).map((part, index) =>
    index % 2 === 1 ? (
      <span key={index} className="whitespace-nowrap">
        {part}
      </span>
    ) : (
      part
    ),
  );
}
