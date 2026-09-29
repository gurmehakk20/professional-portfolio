import { Icon } from "@/components/ui/icon";
import type { Service } from "@/content/types";

/** Pill links to each service further down the /services page. */
export function ServiceJumpLinks({ services }: { services: Service[] }) {
  if (services.length === 0) return null;

  return (
    <nav aria-label="Services on this page">
      <ul role="list" className="flex flex-wrap gap-2">
        {services.map((service) => (
          <li key={service.slug}>
            <a
              href={`#${service.slug}`}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-line bg-surface px-3.5 text-sm font-medium text-ink transition-colors duration-200 ease-out-soft hover:border-line-strong"
            >
              <Icon name={service.icon} size={16} className="shrink-0 text-accent" />
              {service.name}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
