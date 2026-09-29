import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Tag } from "@/components/ui/tag";
import type { AboutContent } from "@/content/types";

type AboutProps = {
  content: AboutContent;
  /** Your name. Its first letter is shown on the stand-in card until there's a portrait. */
  name: string;
  id?: string;
};

/** "About" — who the client will be working with. */
export function About({ content, name, id = "about" }: AboutProps) {
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
          eyebrow={eyebrow}
          title={title}
          description={description}
          id={headingId}
          className="md:col-span-7 md:col-start-6 md:row-start-2"
        />

        <div className="reveal md:col-span-5 md:col-start-1 md:row-span-4 md:row-start-1 md:self-center">
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
            <MonogramCard name={name} />
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
                    <Tag>{area}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          ) : null}

          {cta ? (
            <div className="mt-10">
              <ButtonLink href={cta.href} trailingIcon="arrow-right">
                {cta.label}
              </ButtonLink>
            </div>
          ) : null}
        </div>
      </div>
    </Section>
  );
}

/**
 * Decorative stand-in shown while there's no portrait: your initial set large
 * on a soft tinted card. To show a photo instead, add `image` to the about
 * content in src/content/home.ts — this card is then replaced by the portrait
 * automatically.
 */
function MonogramCard({ name }: { name: string }) {
  return (
    <div
      aria-hidden="true"
      className="relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl bg-accent-soft p-6 @container sm:max-w-md sm:p-8 md:aspect-[4/5] lg:aspect-[4/3]"
    >
      {/* The negative margin lines the letter up optically with the card's padding. */}
      <span className="-ml-[0.06em] font-display text-[46cqw] leading-[0.8] font-semibold text-accent-strong">
        {name.charAt(0)}
        <span className="ml-[0.04em] inline-block size-[0.12em] rounded-[0.015em] bg-accent" />
      </span>
    </div>
  );
}
