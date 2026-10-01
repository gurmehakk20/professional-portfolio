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

/** Closing call to action in a night-blue panel with a faint grid, shown near the end of most pages. */
export function FinalCta({ content, id = "lets-talk", flushTop }: FinalCtaProps) {
  const headingId = `${id}-heading`;
  const { title, description, primaryCta, whatsappLabel } = content;

  return (
    <Section id={id} labelledBy={headingId} flushTop={flushTop}>
      <div className="theme-dark relative isolate overflow-hidden rounded-3xl px-6 py-12 ring-1 ring-white/10 sm:px-10 md:px-14 md:py-16">
        {/* Grid and soft glows. Decorative only. */}
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-grid [mask-image:radial-gradient(ellipse_70%_100%_at_100%_50%,black,transparent_75%)]"
        />
        <div
          aria-hidden="true"
          className="absolute -top-1/2 -right-[10%] -z-10 aspect-square w-[42rem] max-w-[120%] rounded-full bg-[radial-gradient(closest-side,rgb(37_99_235/0.45),transparent)]"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-2/3 left-[20%] -z-10 aspect-square w-[30rem] max-w-full rounded-full bg-[radial-gradient(closest-side,rgb(6_182_212/0.22),transparent)]"
        />

        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          <div className="max-w-2xl">
            <h2 id={headingId} className="text-h2 font-semibold">
              {title}
            </h2>
            <p className="mt-4 text-lead">{description}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row lg:shrink-0">
            <ButtonLink href={primaryCta.href} size="lg" trailingIcon="arrow-right">
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
