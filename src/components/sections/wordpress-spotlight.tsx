import { Fragment } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Glow } from "@/components/ui/decor";
import { Icon, type IconName } from "@/components/ui/icon";
import { Section, type SectionTone } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { WordPressSpotlightContent } from "@/content/types";
import { cn } from "@/lib/cn";

type WordPressSpotlightProps = {
  content: WordPressSpotlightContent;
  id?: string;
  tone?: SectionTone;
  /** Section number shown before the eyebrow, e.g. "03". */
  number?: string;
};

/** Icons for the two columns of the comparison, in order. */
const optionIcons: IconName[] = ["panels", "code"];

/**
 * "Need a WordPress website?" — makes the WordPress offer easy to find:
 * why WordPress can be the right choice on the left, and an honest
 * "which should you choose?" comparison with custom code on the right.
 * It doesn't show a WordPress example; add one to the projects when you have it.
 */
export function WordPressSpotlight({
  content,
  id = "wordpress",
  tone = "subtle",
  number,
}: WordPressSpotlightProps) {
  const headingId = `${id}-heading`;
  const { benefits, comparison, cta } = content;

  return (
    <Section
      id={id}
      labelledBy={headingId}
      tone={tone}
      decor={<Glow className="-right-48 -bottom-56 hidden w-[36rem] md:block" />}
    >
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-x-16">
        <div className="lg:col-span-6">
          <SectionHeader
            id={headingId}
            number={number}
            eyebrow={content.eyebrow}
            title={content.title}
            description={content.description}
          />

          <ul role="list" data-reveal="group" className="mt-10 space-y-7">
            {benefits.map((benefit) => (
              <li key={benefit.title} className="flex gap-4">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/10 bg-surface text-accent shadow-card">
                  <Icon name={benefit.icon} size={20} />
                </span>
                <div>
                  <h3 className="font-display text-[1.0625rem] leading-snug font-semibold">
                    {benefit.title}
                  </h3>
                  <p className="mt-1 text-muted">{benefit.description}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div data-reveal className="lg:col-span-6 lg:self-center">
          <div className="rounded-2xl border border-line bg-surface p-6 shadow-card sm:p-8">
            <h3 className="font-display text-xl font-semibold tracking-[-0.01em]">
              {comparison.title}
            </h3>

            {/* From sm up the labels share one grid row and the lists the next, so the
                lists line up even when one label wraps onto two lines. */}
            <div className="mt-6 grid gap-y-4 sm:grid-flow-col sm:grid-cols-2 sm:grid-rows-[auto_1fr] sm:gap-x-8">
              {comparison.options.map((option, index) => (
                <Fragment key={option.label}>
                  <p
                    id={`${id}-option-${index}`}
                    className={cn(
                      "flex items-start gap-2.5 font-semibold text-ink",
                      index > 0 && "max-sm:mt-3",
                    )}
                  >
                    <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
                      <Icon name={optionIcons[index] ?? "check"} size={16} />
                    </span>
                    <span className="self-center">{option.label}</span>
                  </p>
                  <ul
                    role="list"
                    aria-labelledby={`${id}-option-${index}`}
                    className="space-y-2.5 text-[0.9375rem]"
                  >
                    {option.points.map((point) => (
                      <li key={point} className="flex gap-2.5">
                        <span className="flex h-lh shrink-0 items-center text-accent">
                          <Icon name="check" size={16} strokeWidth={2.25} />
                        </span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </Fragment>
              ))}
            </div>

            <p className="mt-7 border-t border-line pt-5 text-[0.9375rem] text-muted">
              {comparison.note}
            </p>
            <ButtonLink
              href={cta.href}
              variant="secondary"
              trailingIcon="arrow-right"
              className="mt-5 w-full sm:w-auto"
            >
              {cta.label}
            </ButtonLink>
          </div>
        </div>
      </div>
    </Section>
  );
}
