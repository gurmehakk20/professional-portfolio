import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import type { FinalCtaContent } from "@/content/types";
import { whatsappUrl } from "@/lib/links";

type FinalCtaProps = {
  content: FinalCtaContent;
  id?: string;
  /** Drop the top padding when the section above has the same background. */
  flushTop?: boolean;
};

/** Closing call to action in a dark panel, shown near the end of most pages. */
export function FinalCta({ content, id = "lets-talk", flushTop }: FinalCtaProps) {
  const headingId = `${id}-heading`;
  const { title, description, primaryCta, whatsappLabel } = content;

  return (
    <Section id={id} labelledBy={headingId} flushTop={flushTop}>
      <div className="relative isolate overflow-hidden rounded-3xl bg-ink px-6 py-12 [--focus-ring:var(--color-accent-on-dark)] sm:px-10 md:px-14 md:py-16">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h2 id={headingId} className="text-h2 font-semibold text-white">
              {title}
            </h2>
            <p className="mt-4 text-lead text-on-dark-muted">{description}</p>
          </div>
          <div className="relative flex flex-col gap-3 sm:flex-row lg:shrink-0">
            {/* A faint hairline ring around the buttons on large screens. Decorative only. */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-1/2 -z-10 hidden aspect-square w-[calc(100%+3rem)] -translate-1/2 rounded-full border border-white/10 lg:block"
            />
            <ButtonLink
              href={primaryCta.href}
              variant="inverse"
              size="lg"
              trailingIcon="arrow-right"
            >
              {primaryCta.label}
            </ButtonLink>
            {whatsappLabel ? (
              <ButtonLink href={whatsappUrl()} variant="outline-inverse" size="lg" icon="whatsapp">
                {whatsappLabel}
              </ButtonLink>
            ) : null}
          </div>
        </div>
      </div>
    </Section>
  );
}
