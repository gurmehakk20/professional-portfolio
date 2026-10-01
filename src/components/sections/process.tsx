import { Glow, GridPattern } from "@/components/ui/decor";
import { Icon } from "@/components/ui/icon";
import { Section } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { ProcessStep, SectionIntro } from "@/content/types";

type ProcessProps = {
  intro: SectionIntro;
  steps: ProcessStep[];
  id?: string;
  /** Section number shown before the eyebrow, e.g. "04". */
  number?: string;
};

/**
 * "Process" — the stages of a project on a night-blue band, numbered
 * automatically (01, 02…). Phones and tablets show a vertical timeline; large
 * screens show the steps side by side. As the list scrolls into view the steps
 * appear in turn, each number lights up and the line to the next step draws
 * in (see `.process-steps` in globals.css); with reduced motion everything is
 * simply shown complete.
 */
export function Process({ intro, steps, id = "process", number }: ProcessProps) {
  if (steps.length === 0) return null;

  const headingId = `${id}-heading`;

  return (
    <Section
      id={id}
      labelledBy={headingId}
      tone="dark"
      decor={
        <>
          <GridPattern className="[mask-image:radial-gradient(ellipse_70%_90%_at_80%_0%,black,transparent_75%)]" />
          <Glow className="-top-56 -right-32 w-[40rem] opacity-90" />
          <Glow color="cyan" className="-bottom-64 -left-40 w-[34rem]" />
        </>
      }
    >
      <SectionHeader {...intro} id={headingId} number={number} tone="dark" />

      <ol
        role="list"
        data-reveal="group"
        className="process-steps mt-12 md:mt-16 lg:grid lg:auto-cols-fr lg:grid-flow-col lg:gap-x-6"
      >
        {steps.map((step, index) => (
          <li key={step.title} className="group grid grid-cols-[auto_1fr] gap-x-5 lg:flex lg:flex-col">
            {/* The number, and the line that joins it to the next step. */}
            <div
              aria-hidden="true"
              className="flex flex-col items-center gap-3 pb-3 lg:flex-row lg:gap-4 lg:pb-0"
            >
              <span className="process-dot inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-accent-bright bg-accent-bright font-display text-sm font-semibold text-white tabular-nums shadow-[0_0_0_0_rgb(49_105_196/0)] transition-shadow duration-300 ease-out-soft group-hover:shadow-[0_0_0_6px_rgb(49_105_196/0.35)]">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="relative w-px flex-1 overflow-hidden bg-white/12 group-last:hidden lg:-mr-6 lg:h-px lg:w-auto">
                <span className="process-line absolute inset-0 origin-top bg-linear-to-b from-accent-bright to-accent-on-dark lg:origin-left lg:bg-linear-to-r" />
              </span>
            </div>

            <div className="pb-10 group-last:pb-0 lg:mt-7 lg:flex lg:flex-1 lg:flex-col lg:items-start lg:pr-4 lg:pb-0">
              <h3 className="text-h3 font-semibold">
                <span className="sr-only">Step {index + 1}: </span>
                {step.title}
              </h3>
              <p className="mt-2 lg:mb-5">{step.description}</p>
              {step.outcome ? (
                <p className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-3 py-1 text-xs font-medium text-white lg:mt-auto">
                  <Icon name="check" size={12} strokeWidth={2.5} className="text-accent-on-dark" />
                  <span className="sr-only">Outcome: </span>
                  {step.outcome}
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
