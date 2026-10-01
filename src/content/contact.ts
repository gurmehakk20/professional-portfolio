import type { ContactPageContent } from "./types";

/*
 * Contact page copy. Your email address and WhatsApp number live in
 * src/content/site.ts so they stay the same everywhere on the site.
 *
 * The optional form doesn't need a server: it opens WhatsApp or the
 * visitor's email app with their message already written.
 */

export const contactPage: ContactPageContent = {
  eyebrow: "Contact",
  title: "Let's talk about your website",
  description:
    "Tell me a little about your business and what you need. WhatsApp is the quickest way to reach me, but email works just as well.",
  metaDescription:
    "Get in touch about a new website, a redesign or a landing page. Message on WhatsApp or send an email.",

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
    title: "Or send a quick message",
    description:
      "Fill in a few details and your message will open in WhatsApp or your email app, ready to send. Nothing is stored on this website.",
    otherOption: "Something else",
    submitWhatsApp: "Send on WhatsApp",
    submitEmail: "Send by email",
    emailSubject: "Website enquiry",
  },

  nextSteps: {
    title: "What happens next",
    steps: [
      "I'll reply to learn more about your business and what you need.",
      "We'll agree on the scope, timeline and cost before anything starts.",
      "Work begins, and you'll see progress at every stage.",
    ],
  },
};
