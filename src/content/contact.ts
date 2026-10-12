import { site } from "./site";
import type { ContactPageContent } from "./types";

/*
 * Contact page copy. Your email address, WhatsApp number and profiles live
 * in src/content/site.ts so they stay the same everywhere on the site — any
 * you leave empty there are hidden here too.
 *
 * The form doesn't need a server: it opens WhatsApp or the visitor's email
 * app with their message already written.
 */

export const contactPage: ContactPageContent = {
  eyebrow: "Start a project",
  title: "Let's talk about your project",
  description:
    "Tell me a little about your business and what you need — custom-coded or WordPress. I'll reply with a few questions and clear next steps.",
  metaDescription: `Start a website project with Gurmehak Kaur, a freelance web developer in ${site.city}: business websites, WordPress websites, landing pages, redesigns and custom builds.`,

  whatsapp: {
    title: "WhatsApp",
    description: "Quickest for a short conversation.",
    label: "Chat on WhatsApp",
  },
  email: {
    title: "Email",
    description: "Best for longer messages or sending files.",
    label: "Send an email",
  },

  form: {
    enabled: true,
    title: "Tell me about your project",
    description:
      "A few details are enough. Your message opens in WhatsApp or your email app, ready to send — nothing is stored on this website.",
    extraOptions: [{ value: "redesign", label: "Redesign of my current website" }],
    otherOption: "Something else",
    budgetOptions: ["Under ₹10,000", "₹10,000–₹20,000", "₹20,000–₹40,000", "Over ₹40,000", "Not sure yet"],
    submitWhatsApp: "Send on WhatsApp",
    submitEmail: "Send by email",
    emailSubject: "New website project",
  },

  nextSteps: {
    title: "What happens next",
    steps: [
      "I reply with a few questions about your business and goals.",
      "We agree on the scope, timeline and cost before anything starts.",
      "Work begins, and you see progress at every stage.",
    ],
  },
};
