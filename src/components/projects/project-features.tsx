import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { ProjectFeature } from "@/content/types";
import { cn } from "@/lib/cn";

type ProjectFeaturesProps = {
  features: ProjectFeature[];
  /** Background of the section; alternate it with the sections around it. */
  tone?: "default" | "subtle";
};

/** The project's key features as a grid of cards. Hidden when there are none. */
export function ProjectFeatures({ features, tone = "default" }: ProjectFeaturesProps) {
  const count = features.length;
  if (count === 0) return null;

  // Two columns suit 2, 4 or 8 features; three suit 3, 5, 6…
  const threeColumns = count % 3 === 0 || count % 2 === 1;
  // With an odd count, the last card fills the second row while there are two columns.
  const widenLast = count > 1 && count % 2 === 1;

  return (
    <Section id="features" labelledBy="features-heading" tone={tone}>
      <SectionHeader id="features-heading" title="Key features" />
      <ul
        role="list"
        data-reveal="group"
        className={cn(
          "mt-10 grid gap-4 sm:gap-5 md:mt-14 lg:gap-6",
          count === 1 ? "max-w-xl" : "sm:grid-cols-2",
          count > 1 && threeColumns && "lg:grid-cols-3",
        )}
      >
        {features.map((feature, index) => (
          <li
            key={feature.title}
            className={cn(
              "flex gap-4 rounded-xl border border-line bg-surface p-5 shadow-card sm:p-6",
              widenLast && index === count - 1 && "sm:col-span-2 lg:col-span-1",
            )}
          >
            <span className="inline-flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent-soft text-accent">
              <Icon name="check" size={20} strokeWidth={2} />
            </span>
            <div className="min-w-0 pt-1.5">
              <h3 className="text-h3 font-semibold">{feature.title}</h3>
              <p className="mt-1.5 text-muted">{feature.description}</p>
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
