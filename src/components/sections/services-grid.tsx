import { ServiceCard } from "@/components/services/service-card";
import { ArrowLink } from "@/components/ui/arrow-link";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { SectionIntro, Service } from "@/content/types";
import { cn } from "@/lib/cn";

type ServicesGridProps = {
  intro: SectionIntro;
  services: Service[];
  id?: string;
};

/** Home page "What I build": one card per service, each linking to /services. */
export function ServicesGrid({ intro, services, id = "services" }: ServicesGridProps) {
  if (services.length === 0) return null;

  const headingId = `${id}-heading`;
  // Two cards per row from tablets up, and an odd card left on its own fills
  // the row. Large screens show three per row when the cards divide evenly
  // into rows of three (3 or 6 services).
  const threeUp = services.length % 3 === 0;

  return (
    <Section id={id} labelledBy={headingId}>
      <SectionHeader
        id={headingId}
        eyebrow={intro.eyebrow}
        title={intro.title}
        description={intro.description}
        action={<ArrowLink href="/services">See all services</ArrowLink>}
      />
      <ul
        role="list"
        className={cn(
          "reveal mt-10 grid gap-4 sm:grid-cols-2 sm:gap-5 md:mt-14 lg:gap-6",
          threeUp && "lg:grid-cols-3",
        )}
      >
        {services.map((service) => (
          <li
            key={service.slug}
            className={cn("flex sm:last:odd:col-span-2", threeUp && "lg:last:odd:col-span-1")}
          >
            <ServiceCard service={service} />
          </li>
        ))}
      </ul>
    </Section>
  );
}
