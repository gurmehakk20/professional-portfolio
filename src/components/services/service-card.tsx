import Link from "next/link";
import { stretchedLink } from "@/components/ui/card-styles";
import { Icon } from "@/components/ui/icon";
import type { Service } from "@/content/types";

/**
 * A service summary for the home page. The whole card links to the
 * service's section on /services (the title's link is stretched over it).
 * Phones: icon, title and arrow on one row. From sm up: icon and arrow on
 * top, then the title.
 */
export function ServiceCard({ service }: { service: Service }) {
  return (
    <div className="group relative grid w-full grid-cols-[auto_1fr_auto] items-center gap-x-4 rounded-2xl border border-line bg-surface p-6 shadow-card transition-[translate,border-color,box-shadow] duration-200 ease-out-soft hover:border-line-strong hover:shadow-lift motion-safe:hover:-translate-y-0.5 sm:flex sm:flex-col sm:items-stretch lg:p-8">
      <div className="contents sm:flex sm:items-center sm:justify-between sm:gap-4">
        <span className="col-start-1 row-start-1 inline-flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <Icon name={service.icon} size={20} />
        </span>
        <Icon
          name="arrow-right"
          size={20}
          className="col-start-3 row-start-1 shrink-0 text-muted transition-[translate,color] duration-200 ease-out-soft group-hover:translate-x-0.5 group-hover:text-accent"
        />
      </div>
      <h3 className="col-start-2 row-start-1 text-h3 font-semibold sm:mt-6">
        <Link href={`/services#${service.slug}`} className={stretchedLink}>
          {service.name}
        </Link>
      </h3>
      <p className="col-span-full mt-4 max-w-xl text-muted sm:mt-2">{service.summary}</p>
    </div>
  );
}
