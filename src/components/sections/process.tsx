import { Glow, GridPattern } from "@/components/ui/decor";
import { Section, type SectionTone } from "@/components/ui/section";
import { SectionHeader } from "@/components/ui/section-header";
import type { ProcessStep, SectionIntro } from "@/content/types";
import { cn } from "@/lib/cn";

type ProcessProps = {
  intro: SectionIntro;
  steps: ProcessStep[];
  id?: string;
  /** "dark" shows the section as a night-blue band with a faint grid. */
  tone?: SectionTone;
  /** Section number shown before the eyebrow, e.g. "04". */
  number?: string;
};

/**
 * "Approach" — the stages of a project, numbered automatically (01, 02…).
 * Phones and tablets show a vertical timeline; large screens show the steps
 * side by side, joined by a hairline.
 */
export function Process({
  intro,
  steps,
  id = "approach",
  tone = "default",
  number,
}: ProcessProps) {
  if (steps.length === 0) return null;

  const headingId = `${id}-heading`;
  const dark = tone === "dark";

  return (
    <Section
      id={id}
      labelledBy={headingId}
      tone={tone}
      decor={
        dark ? (
          <>
            <GridPattern className="[mask-image:radial-gradient(ellipse_70%_90%_at_80%_0%,black,transparent_75%)]" />
            <Glow className="-top-56 -right-32 w-[40rem] opacity-90" />
            <Glow color="cyan" className="-bottom-64 -left-40 w-[34rem]" />
          </>
        ) : undefined
      }
    >
      <SectionHeader {...intro} id={headingId} number={number} tone={dark ? "dark" : "light"} />

      <ol
        role="list"
        className="reveal mt-12 md:mt-16 lg:grid lg:auto-cols-fr lg:grid-flow-col lg:gap-x-6"
      >
        {steps.map((step, index) => (
          <li key={step.title} className="group grid grid-cols-[auto_1fr] gap-x-5 lg:block">
            {/* The number, and the line that joins it to the next step. */}
            <div
              aria-hidden="true"
              className="flex flex-col items-center gap-3 pb-3 lg:flex-row lg:gap-4 lg:pb-0"
            >
              <span
                className={cn(
                  "inline-flex size-11 shrink-0 items-center justify-center rounded-full border font-display text-sm font-semibold tabular-nums",
                  dark
                    ? "border-white/15 bg-white/5 text-accent-on-dark"
                    : "border-accent/15 bg-accent-soft text-accent-strong",
                )}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                className={cn(
                  "w-px flex-1 group-last:hidden lg:-mr-6 lg:h-px lg:w-auto",
                  dark
                    ? "bg-linear-to-b from-white/25 to-white/5 lg:bg-linear-to-r"
                    : "bg-line-strong",
                )}
              />
            </div>

            <div className="pb-10 group-last:pb-0 lg:mt-6 lg:pr-4 lg:pb-0">
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
