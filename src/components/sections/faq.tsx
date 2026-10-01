import { ArrowLink } from "@/components/ui/arrow-link";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { FaqItem, SectionIntro } from "@/content/types";
import { toParagraphs } from "@/lib/text";

type FaqProps = {
  intro: SectionIntro;
  items: FaqItem[];
  id?: string;
  tone?: "default" | "subtle";
  /** Section number shown before the eyebrow, e.g. "06". */
  number?: string;
};

/**
 * Frequently asked questions as native <details> elements: no JavaScript,
 * keyboard accessible, and closed answers still show up in find-in-page.
 */
export function Faq({ intro, items, id = "faq", tone = "default", number }: FaqProps) {
  if (items.length === 0) return null;

  const headingId = `${id}-heading`;

  return (
    <Section id={id} labelledBy={headingId} tone={tone}>
      <div className="grid gap-10 md:gap-14 lg:grid-cols-12 lg:gap-x-12">
        <div className="lg:sticky lg:top-28 lg:col-span-5 lg:self-start">
          <SectionHeader id={headingId} {...intro} number={number} />
          <ArrowLink href="/contact" className="mt-6">
            Ask a question
          </ArrowLink>
        </div>

        <ul
          role="list"
          className="reveal rounded-2xl border border-line bg-surface px-5 shadow-card sm:px-7 lg:col-span-7"
        >
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
  return (
    <details className="group border-b border-line [li:last-child_&]:border-b-0">
      <summary className="group/summary flex items-start justify-between gap-5 rounded-lg py-5 font-display text-[1.0625rem] leading-relaxed font-semibold tracking-[-0.01em] text-ink md:py-6">
        <span>{item.question}</span>
        {/* One line tall, so the circle lines up with the first line of a long question. */}
        <span aria-hidden="true" className="flex h-lh shrink-0 items-center">
          <span className="inline-flex size-8 items-center justify-center rounded-full border border-line-strong bg-surface duration-250 ease-out-soft group-open:rotate-45 group-open:border-accent group-open:bg-accent group-open:text-white group-hover/summary:border-accent/50 motion-safe:transition-[rotate,border-color,background-color]">
            <Icon name="plus" size={16} />
          </span>
        </span>
      </summary>
      <div className="max-w-[65ch] space-y-4 pb-6 sm:pr-13 md:-mt-1">
        {toParagraphs(item.answer).map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </details>
  );
}
