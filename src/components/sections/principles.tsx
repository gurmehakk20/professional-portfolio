import { Icon } from "@/components/ui/icon";
import { Section, type SectionTone } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { Principle, SectionIntro } from "@/content/types";

type PrinciplesProps = {
  intro: SectionIntro;
  items: Principle[];
  id?: string;
  tone?: SectionTone;
  /** Section number shown before the eyebrow, e.g. "03". */
  number?: string;
};

/**
 * "Why work with me" — the principles behind every website.
 * An open list divided by hairlines (rather than cards), with the heading
 * beside it on wide screens. Works well with three to six principles.
 */
export function Principles({ intro, items, id = "why", tone = "default", number }: PrinciplesProps) {
  if (items.length === 0) return null;

  const headingId = `${id}-heading`;

  return (
    <Section id={id} labelledBy={headingId} tone={tone}>
      <div className="grid gap-10 md:gap-14 xl:grid-cols-12 xl:gap-x-16">
        <div className="xl:sticky xl:top-28 xl:col-span-5 xl:self-start">
          <SectionHeader {...intro} id={headingId} number={number} />
        </div>

        <ul
          role="list"
          data-reveal="group"
          className="grid gap-x-8 gap-y-8 sm:grid-cols-2 sm:gap-y-10 xl:col-span-7"
        >
          {items.map((item) => (
            <li key={item.title} className="relative border-t border-line pt-6">
              {/* Short accent mark on the hairline. */}
              <span aria-hidden="true" className="absolute -top-px left-0 h-0.5 w-12 rounded-full bg-linear-to-r from-accent to-cyan" />
              {/* Phones: icon beside the title. From sm up: icon above it. */}
              <div className="flex items-center gap-3 sm:block">
                <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-xl border border-accent/10 bg-linear-135 from-accent-soft to-cyan-soft text-accent">
                  <Icon name={item.icon} size={20} />
                </span>
                <h3 className="text-h3 font-semibold sm:mt-5">{item.title}</h3>
              </div>
              <p className="mt-2">{item.description}</p>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
