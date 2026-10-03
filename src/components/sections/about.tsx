import Image from "next/image";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Tag } from "@/components/ui/tag";
import type { AboutContent } from "@/content/types";

type AboutProps = {
  content: AboutContent;
  /** Your name. Its first letter is shown on the stand-in card until there's a portrait. */
  name: string;
  id?: string;
  /** Section number shown before the eyebrow, e.g. "05". */
  number?: string;
};

/** "About" — who the client will be working with. */
export function About({ content, name, id = "about", number }: AboutProps) {
  const { eyebrow, title, description, paragraphs, focusAreas, image, cta } = content;
  const headingId = `${id}-heading`;
  const focusLabelId = `${id}-focus-label`;

  return (
    <Section id={id} labelledBy={headingId}>
      {/*
        Phones: heading, picture, then text.
        Tablets and up: picture on the left; heading and text on the right,
        vertically centred against it.
      */}
      <div className="grid gap-8 md:grid-cols-12 md:grid-rows-[1fr_auto_auto_1fr] md:gap-x-10 md:gap-y-0 lg:gap-x-12 xl:gap-x-16">
        <SectionHeader
          number={number}
          eyebrow={eyebrow}
          title={title}
          description={description}
          id={headingId}
          className="md:col-span-7 md:col-start-6 md:row-start-2"
        />

        <div data-reveal className="md:col-span-5 md:col-start-1 md:row-span-4 md:row-start-1 md:self-center">
          {image ? (
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-subtle sm:max-w-md md:aspect-[4/5] md:max-w-none">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1280px) 443px, (min-width: 768px) 37vw, (min-width: 640px) 448px, calc(100vw - 2.5rem)"
                className="object-cover object-[50%_30%]"
              />
            </div>
          ) : (
            <MonogramCard name={name} focus={focusAreas.slice(0, 2)} />
          )}
        </div>

        <div className="md:col-span-7 md:col-start-6 md:row-start-3 md:mt-6">
          <div className="max-w-[65ch] space-y-4">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          {focusAreas.length > 0 ? (
            <div className="mt-8">
              <p id={focusLabelId} className="text-sm font-semibold text-ink">
                Focus areas
              </p>
              <ul role="list" aria-labelledby={focusLabelId} className="mt-3 flex flex-wrap gap-2">
                {focusAreas.map((area) => (
                  <li key={area}>
                    <Tag tone="accent">{area}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {cta ? (
            <div className="mt-10">
              <ArrowLink href={cta.href}>{cta.label}</ArrowLink>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

/**
 * Decorative stand-in shown while there's no portrait: your initial on a
 * deep-to-lighter blue card with a fine grid. To show a photo instead, add `image`
 * to the about content in src/content/home.ts — this card is then replaced
 * by the portrait automatically.
 */
function MonogramCard({ name, focus }: { name: string; focus: string[] }) {
  return (
    <div
      aria-hidden="true"
      className="relative isolate flex aspect-[4/3] flex-col justify-between overflow-hidden rounded-2xl bg-linear-150 from-accent to-accent-bright p-6 shadow-lift @container sm:max-w-md sm:p-8 md:aspect-[4/5] lg:aspect-[4/3]"
    >
      <div className="absolute inset-0 -z-10 bg-grid fade-edges [--grid-line:rgb(255_255_255/0.14)] [--grid-size:2.5rem]" />
      <div className="absolute -top-1/3 -right-1/4 -z-10 aspect-square w-3/4 rounded-full bg-[radial-gradient(closest-side,rgb(255_255_255/0.28),transparent)]" />

      {focus.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {focus.map((area) => (
            <span
              key={area}
              className="rounded-full border border-white/25 bg-white/10 px-3 py-1 text-xs font-medium text-white"
            >
              {area}
            </span>
          ))}
        </div>
      ) : (
        <span />
      )}

      {/* The negative margin lines the letter up optically with the card's padding. */}
      <span className="-ml-[0.06em] font-display text-[46cqw] leading-[0.8] font-semibold tracking-[-0.04em] text-white">
        {name.charAt(0)}
        <span className="ml-[0.04em] inline-block size-[0.12em] rounded-[0.015em] bg-cyan-soft" />
      </span>
    </div>
  );
}
