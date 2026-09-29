import type { FaqItem, SectionIntro } from "./types";

/*
 * Frequently asked questions — shown on the home page and the services page.
 *
 * ⚠️  PLACEHOLDER: review every answer so it matches how you actually work
 * (timelines, maintenance, hosting). Add, remove or reorder freely.
 */

export const faqIntro: SectionIntro = {
  eyebrow: "FAQ",
  title: "Common questions",
  description: "Can't find what you're looking for? Ask me directly — I'm happy to help.",
};

export const faqs: FaqItem[] = [
  {
    question: "How long does a website take?",
    answer:
      "It depends on the size of the website and how quickly the content is ready. A focused landing page usually takes one to two weeks, and a multi-page business website typically takes three to six weeks.\n\nYou'll get a clear timeline before any work begins.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes. I'll look at what your current website does well and where it falls short, then redesign and rebuild it to be clearer, faster and easier to use — keeping the content and links that already work.",
  },
  {
    question: "Will the website work on mobile?",
    answer:
      "Yes. Every website is designed mobile-first and tested on phones, tablets and desktops, so it looks right and works properly on the screens your customers actually use.",
  },
  {
    question: "Can you integrate WhatsApp?",
    answer:
      "Yes. I can add WhatsApp chat buttons and links with a pre-filled message, so customers can reach you in a single tap.",
  },
  {
    question: "Can you help with domain and hosting?",
    answer:
      "Yes. I can help you choose and set up a domain and reliable hosting, or work with what you already have. Accounts stay in your name, so you always remain in control of your website.",
  },
  {
    question: "Do you provide website maintenance?",
    answer:
      "Yes. Support after launch can cover content updates, small changes and keeping things running smoothly. We'll agree on what makes sense for your website.",
  },
  {
    question: "Can you build custom functionality?",
    answer:
      "Often, yes — enquiry forms, booking flows, galleries, multi-language content and integrations with tools you already use. Tell me what you need and I'll suggest the simplest approach that works.",
  },
];
