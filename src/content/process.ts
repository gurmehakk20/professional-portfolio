import type { ProcessStep, SectionIntro } from "./types";

/*
 * The "Process" section — shown on the home page and the services page.
 * Step numbers (01, 02…) are added automatically from the order below.
 */

export const processIntro: SectionIntro = {
  eyebrow: "Process",
  title: "From first call to launch in four clear steps",
  description: "You always know what's happening, what I need from you and what comes next.",
};

export const processSteps: ProcessStep[] = [
  {
    title: "Understand",
    description:
      "We talk through your business, customers and goals, then agree on scope, timeline and cost.",
    outcome: "A clear plan",
  },
  {
    title: "Design",
    description:
      "I plan the structure and design the key pages, then refine them with your feedback before any code is written.",
    outcome: "Designs you've approved",
  },
  {
    title: "Build",
    description:
      "I build the site with clean, fast, responsive code and share progress as it comes together.",
    outcome: "A working site to review",
  },
  {
    title: "Launch",
    description:
      "I test across devices, set up hosting and your domain, and hand over everything you need.",
    outcome: "Your site, live",
  },
];
