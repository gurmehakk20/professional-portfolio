import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { ProcessStep, SectionIntro } from "@/content/types";

type ProcessProps = {
  intro: SectionIntro;
  steps: ProcessStep[];
  id?: string;
  tone?: "default" | "subtle";
};

/**
 * "Approach" — the stages of a project, numbered automatically (01, 02…).
 * Phones and tablets show a vertical timeline; large screens show the steps
 * side by side, joined by a hairline.
 */
export function Process({ intro, steps, id = "approach", tone = "default" }: ProcessProps) {
  const headingId = `${id}-heading`;

  return (
    <Section id={id} labelledBy={headingId} tone={tone}>
      <SectionHeader {...intro} id={headingId} />

      <ol
        role="list"
        className="reveal mt-10 md:mt-14 lg:grid lg:auto-cols-fr lg:grid-flow-col lg:gap-x-8"
      >
        {steps.map((step, index) => (
          <li key={step.title} className="group grid grid-cols-[auto_1fr] gap-x-5 lg:block">
            {/* The number, and the line that joins it to the next step. */}
            <div
              aria-hidden="true"
              className="flex flex-col items-center gap-3 pb-3 lg:flex-row lg:gap-4 lg:pb-0"
            >
              <span className="font-display text-2xl leading-none font-semibold text-accent tabular-nums">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="w-px flex-1 bg-line-strong group-last:hidden lg:-mr-4 lg:h-px lg:w-auto" />
            </div>

            <div className="pb-10 group-last:pb-0 lg:mt-6 lg:pb-0">
              <h3 className="text-h3 font-semibold">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2">{step.description}</p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
