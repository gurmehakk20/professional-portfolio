import type { FaqItem, SectionIntro } from "./types";

/*
 * Frequently asked questions — shown on the home page and the services page.
 * Keep to questions that help someone decide to get in touch.
 * Review every answer so it matches how you work.
 */

export const faqIntro: SectionIntro = {
  eyebrow: "FAQ",
  title: "Questions before you start",
  description: "The things people usually ask before getting in touch. Anything else? Just ask.",
};

export const faqs: FaqItem[] = [
  // Keep these timelines in step with `timeline` in services.ts.
  {
    question: "How long does a website take?",
    answer:
      "It depends on the size of the project and how quickly the content is ready. A landing page usually takes one to two weeks and a business website three to five. WordPress websites and custom builds depend on scope.\n\nYou'll get a clear timeline before any work begins.",
  },
  // Keep these prices in step with `pricing` in services.ts.
  {
    question: "How much does a website cost?",
    answer:
      "Projects start from ₹7,000 for a landing page, ₹10,000 for a business website and ₹18,000 for a custom-coded website. WordPress websites are quoted on scope.\n\nThe final price depends on the number of pages, design complexity, functionality, content, integrations and timeline. After a short conversation, I'll send a clear quote, so you know exactly what you're agreeing to before we start.",
  },
  {
    question: "Should I choose WordPress or a custom-coded website?",
    answer:
      "It depends on what you need. WordPress is a good fit if you'd like to update the content yourself and standard features cover your needs. A custom-coded site suits a distinctive design, specific functionality, or when speed and a lean codebase matter most.\n\nTell me about your project and I'll recommend the approach that fits.",
  },
  {
    question: "Do you work with existing designs?",
    answer:
      "Yes. If you already have designs — in Figma, for example — I'll build them faithfully as a fast, responsive website. If you don't, I'll design it with you from scratch.",
  },
  {
    question: "Can you redesign an existing website?",
    answer:
      "Yes. I'll look at what your current website does well and where it falls short, then redesign and rebuild it to be clearer, faster and easier to use — keeping the content and links that already work.",
  },
  {
    question: "Can you handle deployment?",
    answer:
      "Yes. I can set up hosting, connect your domain and make sure everything is secure and working before launch. Accounts stay in your name, so you're always in control of your website.",
  },
  {
    question: "Do you work with agencies?",
    answer:
      "Yes. I can join your team as a freelance or white-label developer — building from your designs or handling design and development — and work within your process and tools.",
  },
  {
    question: "What do I need to provide?",
    answer:
      "Your logo, any photos you'd like to use and the key details about your business, such as your services and contact information. If you're not sure what to write, I can help with the wording.",
  },
  {
    question: "What happens after launch?",
    answer:
      "You'll get a walkthrough of your website and everything you need to manage it. I'm also available for updates, small improvements and ongoing support — we'll agree on what makes sense for you.",
  },
];
