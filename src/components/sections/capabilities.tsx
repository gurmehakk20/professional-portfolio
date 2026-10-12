import { Icon } from "@/components/ui/icon";
import { Section, type SectionTone } from "@/components/ui/section";
import type { Capability, SectionIntro } from "@/content/types";

type CapabilitiesProps = {
  intro: SectionIntro;
  items: Capability[];
  id?: string;
  tone?: SectionTone;
};

/**
 * A compact overview of what I can help with, right under the hero: a small
 * heading, then the capabilities in a hairline grid (three columns on large
 * screens, two on tablets, one on phones), each with an icon and one line.
 */
export function Capabilities({
  intro,
  items,
  id = "capabilities",
  tone = "default",
}: CapabilitiesProps) {
  if (items.length === 0) return null;

  const headingId = `${id}-heading`;

  return (
    <Section id={id} labelledBy={headingId} tone={tone} className="py-10! md:py-16!">
      <div data-reveal>
        <h2
          id={headingId}
          className="text-[1.5rem] leading-tight font-semibold tracking-[-0.02em] md:text-[1.75rem]"
        >
          {intro.title}
        </h2>
        {intro.description ? <p className="mt-2 max-w-xl text-muted">{intro.description}</p> : null}
      </div>

      {/* Hairlines between cells come from the gap showing the border colour behind them. */}
      <ul
        role="list"
        data-reveal="group"
        className="mt-6 grid gap-px md:mt-8 overflow-hidden rounded-2xl border border-line bg-line shadow-card sm:grid-cols-2 lg:grid-cols-3"
      >
        {items.map((item) => (
          <li key={item.title} className="flex gap-3.5 bg-surface px-4 py-3.5 sm:gap-4 sm:p-6">
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-xl border border-accent/10 bg-accent-soft text-accent sm:size-10">
              <Icon name={item.icon} size={18} />
            </span>
            <div>
              <h3 className="font-display text-[1.0625rem] leading-snug font-semibold">
                {item.title}
              </h3>
              <p className="mt-0.5 text-sm leading-relaxed text-muted sm:mt-1 sm:text-[0.9375rem]">
                {item.description}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
