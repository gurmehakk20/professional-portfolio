import Image from "next/image";
import { ButtonLink } from "@/components/ui/button";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Tag } from "@/components/ui/tag";
import type { AboutContent } from "@/content/types";
import { cn } from "@/lib/cn";

type AboutProps = {
  content: AboutContent;
  id?: string;
};

/** Shared by the portrait and the monogram card, so the layout is the same either way. */
const visualFrame =
  "relative aspect-[4/3] overflow-hidden rounded-2xl sm:max-w-md lg:aspect-[4/5] lg:max-w-none";

/** "About" — who the client will be working with. */
export function About({ content, id = "about" }: AboutProps) {
  const { eyebrow, title, description, paragraphs, focusAreas, image, cta } = content;
  const headingId = `${id}-heading`;
  const focusLabelId = `${id}-focus-label`;

  return (
    <Section id={id} labelledBy={headingId}>
      {/*
        Phones and tablets: heading, picture, then text.
        Large screens: picture on the left; heading and text on the right,
        vertically centred against it.
      */}
      <div className="grid gap-8 md:gap-10 lg:grid-cols-12 lg:grid-rows-[1fr_auto_auto_1fr] lg:gap-x-12 lg:gap-y-0 xl:gap-x-16">
        <SectionHeader
          eyebrow={eyebrow}
          title={title}
          description={description}
          id={headingId}
          className="lg:col-span-7 lg:col-start-6 lg:row-start-2"
        />

        <div className="reveal lg:col-span-5 lg:col-start-1 lg:row-span-4 lg:row-start-1 lg:self-center">
          {image ? (
            <div className={cn(visualFrame, "bg-subtle")}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1280px) 443px, (min-width: 1024px) 37vw, (min-width: 640px) 448px, calc(100vw - 2.5rem)"
                className="object-cover object-[50%_30%]"
              />
            </div>
          ) : (
            <MonogramCard title={title} />
          )}
        </div>

        <div className="lg:col-span-7 lg:col-start-6 lg:row-start-3 lg:mt-6">
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
 * Decorative stand-in shown while there's no portrait: an initial set large
 * on a dark card, echoing the wordmark. To show a photo instead, add `image`
 * to the about content in src/content/home.ts — this card is then replaced
 * by the portrait automatically.
 */
function MonogramCard({ title }: { title: string }) {
  // "Hi, I'm Mehak." gives the name "Mehak" and the initial "M".
  // A title without "I'm <name>" falls back to its own first letter.
  const name = title.match(/I['’]m\s+([^\s.,!?]+)/)?.[1];
  const initial = (name ?? title.trim()).charAt(0);

  return (
    <div
      aria-hidden="true"
      className={cn(visualFrame, "flex flex-col justify-between bg-ink p-6 @container sm:p-8")}
    >
      <span className="flex items-center gap-2.5 font-display text-sm leading-none font-bold tracking-[0.2em] text-white uppercase">
        <span className="size-2 rounded-[2px] bg-accent-on-dark" />
        {name}
      </span>

      {/* The negative margin lines the letter up optically with the name above. */}
      <span className="-ml-[0.06em] font-display text-[46cqw] leading-[0.8] font-semibold text-white lg:text-[64cqw]">
        {initial}
        <span className="ml-[0.04em] inline-block size-[0.12em] rounded-[0.015em] bg-accent-on-dark" />
      </span>
    </div>
  );
}
