import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Tag } from "@/components/ui/tag";
import type { Service } from "@/content/types";
import { cn } from "@/lib/cn";

type ServiceDetailProps = {
  service: Service;
  /** Position in the list, starting at 0. Shown as "01", "02"… */
  index: number;
};

/**
 * One service on /services: the pitch and call to action on the left,
 * who it's for and what's included on the right. Optional fields
 * (timeline, pricing, add-ons) are simply left out when empty.
 */
export function ServiceDetail({ service, index }: ServiceDetailProps) {
  const headingId = `${service.slug}-heading`;
  const number = String(index + 1).padStart(2, "0");
  const { audience, includes, timeline, pricing } = service;
  const addOns = service.addOns ?? [];
  const cta = service.cta ?? {
    label: "Discuss your project",
    href: `/contact?service=${service.slug}`,
  };
  const hasDetails = audience.length > 0 || includes.length > 0 || addOns.length > 0;

  return (
    <article
      id={service.slug}
      aria-labelledby={headingId}
      className={cn("py-12 md:py-16", index > 0 && "border-t border-line")}
    >
      <div className="grid gap-8 lg:grid-cols-12 lg:grid-rows-[auto_1fr] lg:gap-x-12">
        <div className="lg:col-span-5">
          <div className="flex items-center gap-4">
            <span className="inline-flex size-11 items-center justify-center rounded-xl border border-accent/10 bg-linear-135 from-accent-soft to-cyan-soft text-accent">
              <Icon name={service.icon} size={20} />
            </span>
            <span
              aria-hidden="true"
              className="font-display text-2xl leading-none font-semibold text-accent tabular-nums"
            >
              {number}
            </span>
          </div>
          <h2 id={headingId} className="mt-6 text-h2 font-semibold">
            {service.name}
          </h2>
          <p className="mt-4 max-w-2xl text-lead text-muted">
            {service.description ?? service.summary}
          </p>

          <p className="mt-6 max-w-xl border-l-2 border-accent pl-4">
            <span className="font-semibold text-ink">The problem it solves: </span>
            {service.problem}
          </p>

          {service.deliverables.length > 0 ? (
            <ul
              role="list"
              aria-label={`${service.name} includes`}
              className="mt-6 flex flex-wrap gap-2"
            >
              {service.deliverables.map((deliverable) => (
                <li key={deliverable}>
                  <Tag tone="accent">
                    <Icon name="check" size={12} strokeWidth={2.5} className="mr-1 -ml-0.5" />
                    {deliverable}
                  </Tag>
                </li>
              ))}
            </ul>
          ) : null}

          {timeline || pricing ? (
            <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
              {timeline ? (
                <div>
                  <dt className="text-sm text-muted">Timeline</dt>
                  <dd className="mt-1 flex items-center gap-2 font-semibold text-ink">
                    <Icon name="clock" size={18} className="shrink-0 text-accent" />
                    {timeline}
                  </dd>
                </div>
              ) : null}
              {pricing ? (
                <div>
                  <dt className="text-sm text-muted">Pricing</dt>
                  <dd className="mt-1 font-semibold text-ink">{pricing.label}</dd>
                  {pricing.note ? <dd className="text-sm text-muted">{pricing.note}</dd> : null}
                </div>
              ) : null}
            </dl>
          ) : null}
        </div>

        {hasDetails ? (
          <div className="rounded-2xl border border-line bg-surface p-6 sm:p-8 lg:col-span-7 lg:col-start-6 lg:row-span-2 lg:row-start-1 lg:self-start">
            {audience.length > 0 || includes.length > 0 ? (
              <div
                className={cn(
                  "grid gap-8",
                  audience.length > 0 && includes.length > 0 && "sm:grid-cols-2 sm:gap-10",
                )}
              >
                {audience.length > 0 ? (
                  <div>
                    <h3 className="text-base font-semibold">Who it&apos;s for</h3>
                    <ul role="list" className="mt-4 space-y-3 text-[0.9375rem]">
                      {audience.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span aria-hidden="true" className="flex h-lh shrink-0 items-center">
                            <span className="size-1.5 rounded-full bg-accent" />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {includes.length > 0 ? (
                  <div>
                    <h3 className="text-base font-semibold">What&apos;s included</h3>
                    <ul role="list" className="mt-4 space-y-3 text-[0.9375rem]">
                      {includes.map((item) => (
                        <li key={item} className="flex gap-3">
                          <span className="flex h-lh shrink-0 items-center text-accent">
                            <Icon name="check" size={18} strokeWidth={2.25} />
                          </span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
              </div>
            ) : null}

            {addOns.length > 0 ? (
              <div
                className={cn(
                  (audience.length > 0 || includes.length > 0) && "mt-8 border-t border-line pt-6",
                )}
              >
                <h3 className="text-base font-semibold">Optional add-ons</h3>
                <ul role="list" className="mt-3 flex flex-wrap gap-2">
                  {addOns.map((addOn) => (
                    <li key={addOn}>
                      <Tag>{addOn}</Tag>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        ) : null}

        {/* After the details on phones; under the intro on desktop. */}
        <div className="lg:col-span-5 lg:col-start-1 lg:row-start-2">
          <ButtonLink href={cta.href} trailingIcon="arrow-right">
            {cta.label}
            <span className="sr-only">: {service.name}</span>
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
