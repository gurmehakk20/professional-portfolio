import type { SiteConfig } from "./types";

/*
 * Global site settings: brand, contact details, navigation, social links
 * and SEO defaults.
 *
 * ✏️  TODO before launch: fill in the fields marked TODO below.
 * Contact details and profiles left empty ("") are hidden on the site, so
 * nothing fake is ever shown — but people need at least an email address or
 * a WhatsApp number to reach you. The production build warns until one is set.
 */

/**
 * Canonical production URL (no trailing slash).
 * Set NEXT_PUBLIC_SITE_URL in your hosting environment (e.g. https://mehak.dev).
 * It's read at build time, so rebuild after changing it.
 */
const PLACEHOLDER_URL = "https://www.example.com";
const url = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || PLACEHOLDER_URL).replace(/\/+$/, "");

if (!/^https?:\/\//.test(url)) {
  throw new Error(`NEXT_PUBLIC_SITE_URL must start with https:// (got "${url}").`);
}

/** True until the real site URL is set. While true, search engines are asked not to index the site. */
export const isPlaceholderSiteUrl = url === PLACEHOLDER_URL;

export const site: SiteConfig = {
  name: "Mehak",
  tagline: "Web Design & Development",
  title: "Mehak — Web Design & Development",
  description:
    "Independent web designer and developer building modern, responsive, conversion-aware websites with React and Next.js for businesses, startups and agencies.",
  url,
  locale: "en_GB",
  author: "Mehak",
  fullName: "Gurmehak Kaur",
  jobTitle: "Web Designer & Developer",

  contact: {
    email: "", // TODO: your email address, e.g. "hello@yourdomain.com"
    whatsapp: {
      number: "", // TODO: country code + number, digits only, e.g. "919876543210"
      display: "", // TODO: how it's shown, e.g. "+91 98765 43210"
      message: "Hi Mehak, I'd like to talk about a website project.",
    },
    location: "Working with clients remotely", // Optional — e.g. "Based in Pune · Working remotely"
    responseTime: "I usually reply within one working day.", // Optional — only keep if true
  },

  // Profiles shown in the footer and contact sections. Empty links are hidden.
  // Available icons: "linkedin", "github", "instagram", "dribbble", "behance", "x".
  socials: [
    { label: "LinkedIn", href: "", icon: "linkedin" }, // TODO: e.g. "https://www.linkedin.com/in/your-name"
    { label: "GitHub", href: "https://github.com/gurmehakk20", icon: "github" },
  ],

  nav: [
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/services" },
    { label: "Process", href: "/#process" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/contact" },
  ],

  cta: { label: "Let's talk", href: "/contact" },

  availability: {
    show: true,
    label: "Available for new projects", // Set show: false when you're fully booked.
  },

  footer: {
    blurb: "Modern, easy-to-use websites for businesses, startups and professional services.",
  },
};

if (process.env.NODE_ENV === "production" && !site.contact.email && !site.contact.whatsapp.number) {
  console.warn(
    "\n⚠ No email address or WhatsApp number is set in src/content/site.ts, so visitors have no way to contact you. Add at least one before launch.\n",
  );
}
