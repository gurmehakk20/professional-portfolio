import Link from "next/link";
import { Icon } from "@/components/ui/icon";
import type { Service } from "@/content/types";

/**
 * A service summary for the home page. The whole card links to the
 * service's section on /services (the title's link is stretched over it).
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative flex w-full flex-col rounded-2xl border border-line bg-surface p-6 shadow-card transition-[translate,border-color,box-shadow] duration-200 ease-out-soft hover:border-line-strong hover:shadow-lift motion-safe:hover:-translate-y-0.5 lg:p-8">
      <div className="flex items-center justify-between gap-4">
        <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Icon name={service.icon} size={20} />
        </span>
        <Icon
          name="arrow-right"
          size={20}
          className="shrink-0 text-muted transition-[translate,color] duration-200 ease-out-soft group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>
      <h3 className="mt-6 text-h3 font-semibold">
        <Link
          href={`/services#${service.slug}`}
          className="after:absolute after:inset-0 after:rounded-2xl after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-3 focus-visible:after:outline-(--focus-ring)"
        >
          {service.name}
        </Link>
      </h3>
      <p className="mt-2 max-w-xl text-muted">{service.summary}</p>
    </div>
  );
}
