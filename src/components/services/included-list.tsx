import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { SectionIntro } from "@/content/types";

/** "Included in every project": the essentials that come with any service. */
export function IncludedList({ intro, items }: { intro: SectionIntro; items: string[] }) {
  if (items.length === 0) return null;

  return (
    <Section tone="default" id="included" labelledBy="included-heading">
      <SectionHeader
        id="included-heading"
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
      />
      <ul
        role="list"
        className="reveal mt-10 grid gap-3 sm:grid-cols-2 sm:gap-4 md:mt-14 lg:grid-cols-3 lg:gap-5"
      >
        {items.map((item) => (
          <li
            key={item}
            className="flex items-center gap-3 rounded-xl border border-line bg-surface px-5 py-4 font-medium text-ink"
          >
            <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <Icon name="check" size={16} strokeWidth={2.25} />
            </span>
            {item}
          </li>
        ))}
      </ul>
    </Section>
  );
}
