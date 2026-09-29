import { ArrowLink } from "@/components/ui/arrow-link";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { FaqItem, SectionIntro } from "@/content/types";

type FaqProps = {
  intro: SectionIntro;
  items: FaqItem[];
  id?: string;
  tone?: "default" | "subtle";
};

/**
 * Frequently asked questions as native <details> elements: no JavaScript,
 * keyboard accessible, and closed answers still show up in find-in-page.
 */
export function Faq({ intro, items, id = "faq", tone = "default" }: FaqProps) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} labelledBy={headingId} tone={tone}>
      <div className="grid gap-10 md:gap-14 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <SectionHeader id={headingId} {...intro} />
          <ArrowLink href="/contact" className="mt-6">
            Ask a question
          </ArrowLink>
        </div>

        <ul role="list" className="reveal border-t border-line lg:col-span-7">
          {items.map((item) => (
            <li key={item.question}>
              <FaqEntry item={item} />
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}

function FaqEntry({ item }: { item: FaqItem }) {
  const paragraphs = item.answer
    .split("\n\n")
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  return (
    <details className="group border-b border-line">
      <summary className="group/summary flex items-start justify-between gap-5 rounded-lg py-5 font-display text-[1.0625rem] leading-relaxed font-semibold tracking-[-0.01em] text-ink md:py-6">
        <span>{item.question}</span>
        {/* One line tall, so the circle lines up with the first line of a long question. */}
        <span aria-hidden="true" className="flex h-lh shrink-0 items-center">
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-line-strong bg-surface duration-250 ease-out-soft group-open:rotate-45 group-hover/summary:border-ink/35 motion-safe:transition-[rotate,border-color]">
            <Icon name="plus" size={16} />
          </span>
        </span>
      </summary>
      <div className="max-w-[65ch] space-y-4 pb-6 sm:pr-13 md:-mt-1">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </details>
  );
}
