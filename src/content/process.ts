import type { ProcessStep, SectionIntro } from "./types";

/*
 * The "Approach" section — shown on the home page and the services page.
 * Step numbers (01, 02…) are added automatically from the order below.
 */

export const processIntro: SectionIntro = {
  eyebrow: "Approach",
  title: "A clear process from first call to launch",
  description: "Four simple stages, so you always know what's happening and what comes next.",
};

export const processSteps: ProcessStep[] = [
  {
    title: "Understand",
    description: "Understand the business, audience and goals.",
  },
  {
    title: "Design",
    description: "Create the structure, visual direction and user experience.",
  },
  {
    title: "Build",
    description: "Develop the responsive website with clean, maintainable code.",
  },
  {
    title: "Launch",
    description: "Test, optimise and prepare the website for launch.",
  },
];
