import Link from "next/link";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Icon } from "@/components/ui/icon";
import { Section, type SectionTone } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import { Tag } from "@/components/ui/tag";
import type { SectionIntro, Service } from "@/content/types";

type ServicesOverviewProps = {
  intro: SectionIntro;
  services: Service[];
  /** Deliverables that come with every service, shown once under the list. */
  standard?: string[];
  id?: string;
  tone?: SectionTone;
  /** Section number shown before the eyebrow, e.g. "02". */
  number?: string;
};

/**
 * Home page services as an editorial list (not cards): each row says what the
 * service is, who it's for and the problem it solves, with its deliverables.
 * The whole row links to the service on /services.
 */
export function ServicesOverview({
  intro,
  services,
  standard = [],
  id = "services",
  tone = "default",
  number,
}: ServicesOverviewProps) {
  if (services.length === 0) return null;

  const headingId = `${id}-heading`;

  return (
    <Section id={id} labelledBy={headingId} tone={tone}>
      <SectionHeader
        id={headingId}
        number={number}
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        action={<ArrowLink href="/services">Compare services</ArrowLink>}
      />

      <ol role="list" data-reveal="group" className="mt-10 border-t border-line md:mt-14">
        {services.map((service, index) => (
          <li key={service.slug} className="group relative isolate border-b border-line">
            {/* Soft highlight behind the row on hover. */}
            <span
              aria-hidden="true"
              className="absolute inset-y-0 -inset-x-3 -z-10 rounded-2xl bg-surface opacity-0 shadow-card transition-opacity duration-200 ease-out-soft group-hover:opacity-100 sm:-inset-x-5"
            />
            <div className="grid gap-5 py-8 sm:py-9 lg:grid-cols-12 lg:gap-10 lg:py-10">
              <div className="flex items-start gap-4 lg:col-span-4">
                <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl border border-accent/10 bg-linear-135 from-accent-soft to-cyan-soft text-accent">
                  <Icon name={service.icon} size={22} />
                </span>
                <div>
                  <span aria-hidden="true" className="text-sm font-semibold text-accent tabular-nums">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-0.5 text-[1.5rem] leading-tight font-semibold tracking-[-0.02em]">
                    <Link
                      href={`/services#${service.slug}`}
                      className="after:absolute after:inset-y-0 after:-inset-x-3 after:z-1 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-(--focus-ring) sm:after:-inset-x-5"
                    >
                      {service.name}
                    </Link>
                  </h3>
                </div>
              </div>

              <div className="lg:col-span-5">
                <p className="text-body">{service.summary}</p>
                <dl className="mt-5 grid gap-4 text-sm sm:grid-cols-2 sm:gap-6 lg:grid-cols-1 lg:gap-3">
                  <div className="lg:grid lg:grid-cols-[5.5rem_1fr] lg:gap-3">
                    <dt className="font-semibold text-ink">Best for</dt>
                    <dd className="mt-1 text-muted lg:mt-0">{service.bestFor}</dd>
                  </div>
                  <div className="lg:grid lg:grid-cols-[5.5rem_1fr] lg:gap-3">
                    <dt className="font-semibold text-ink">Solves</dt>
                    <dd className="mt-1 text-muted lg:mt-0">{service.problem}</dd>
                  </div>
                </dl>
              </div>

              <div className="flex flex-col justify-between gap-5 lg:col-span-3">
                {service.deliverables.length > 0 ? (
                  <ul
                    role="list"
                    aria-label={`${service.name} includes`}
                    className="flex flex-wrap gap-2 lg:flex-col lg:items-start"
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
                <span
                  aria-hidden="true"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent-strong"
                >
                  See details
                  <Icon
                    name="arrow-right"
                    size={16}
                    className="transition-transform duration-200 ease-out-soft group-hover:translate-x-0.5"
                  />
                </span>
              </div>
            </div>
          </li>
        ))}
      </ol>

      {standard.length > 0 ? (
        <div className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-center lg:gap-6">
          <p id={`${id}-standard`} className="shrink-0 text-sm font-semibold text-ink">
            Included in every project
          </p>
          <ul role="list" aria-labelledby={`${id}-standard`} className="flex flex-wrap gap-2">
            {standard.map((item) => (
              <li key={item}>
                <Tag>
                  <Icon name="check" size={12} strokeWidth={2.5} className="mr-1 -ml-0.5 text-accent" />
                  {item}
                </Tag>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Section>
  );
}
