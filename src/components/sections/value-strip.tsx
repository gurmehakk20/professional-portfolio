import { Container } from "@/components/ui/container";
import { Icon } from "@/components/ui/icon";
import type { ValuePoint } from "@/content/types";

/*
 * The band of qualities under the hero (Mobile-first, Fast-loading…).
 * Phones: a compact list. From 34rem (544px), where three items fit side by
 * side: centred rows of three. Desktops: one row with hairline dividers.
 */
export function ValueStrip({ items }: { items: ValuePoint[] }) {
  if (items.length === 0) return null;

  return (
    <section aria-labelledby="value-strip-heading" className="border-y border-line bg-surface">
      <Container className="py-8 md:py-10">
        <h2 id="value-strip-heading" className="sr-only">
          What every website is built to be
        </h2>
        <ul
          role="list"
          className="flex flex-col gap-5 min-[34rem]:flex-row min-[34rem]:flex-wrap min-[34rem]:justify-center min-[34rem]:gap-x-0 min-[34rem]:gap-y-8 lg:flex-nowrap"
        >
          {items.map((item) => (
            <li
              key={item.title}
              className="flex gap-3.5 min-[34rem]:basis-1/3 min-[34rem]:flex-col min-[34rem]:items-center min-[34rem]:gap-3 min-[34rem]:px-2 min-[34rem]:text-center lg:flex-1 lg:basis-0 lg:border-l lg:border-line lg:px-4 lg:first:border-l-0"
            >
              <Icon name={item.icon} size={22} className="mt-px shrink-0 text-accent min-[34rem]:mt-0" />
              <div>
                <h3 className="text-base font-semibold">{item.title}</h3>
                {item.description ? (
                  <p className="text-sm text-muted min-[34rem]:mt-1 min-[34rem]:text-balance">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
