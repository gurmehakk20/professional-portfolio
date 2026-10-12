import type { ProcessStep, SectionIntro } from "./types";

/*
 * The "Process" section — shown on the home page and the services page.
 * Step numbers (01, 02…) are added automatically from the order below.
 */

export const processIntro: SectionIntro = {
  eyebrow: "Process",
  title: "From first call to launch in five clear steps",
  description:
    "Timelines and deliverables depend on the scope we agree — and you'll always know what's happening and what comes next.",
};

export const processSteps: ProcessStep[] = [
  {
    title: "Discovery",
    description:
      "We talk through your business, goals and content, and what the website needs to do.",
    outcome: "A clear brief",
  },
  {
    title: "Planning",
    description:
      "We agree on the pages, the design direction, the approach — custom-coded or WordPress — and the scope.",
    outcome: "An agreed scope",
  },
  {
    title: "Design & development",
    description:
      "I design the key pages, refine them with your feedback and build the site with the approach that suits it.",
    outcome: "A working site to review",
  },
  {
    title: "Review",
    description:
      "I test responsiveness, links, forms and the visual details across screen sizes, and fix anything that's off.",
    outcome: "A tested, polished site",
  },
  {
    title: "Launch & handover",
    description:
      "I deploy the site or hand it over, connect your domain and show you how to manage it.",
    outcome: "Your site, live",
  },
];
