import { Container } from "@/components/ui/container";
import type { Service } from "@/content/types";
import { ServiceDetail } from "./service-detail";

/** Every service on /services, one after another. */
export function ServiceList({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <div className="border-b border-line">
      <Container>
        {services.map((service, index) => (
          <ServiceDetail key={service.slug} service={service} index={index} />
        ))}
      </Container>
    </div>
  );
}
