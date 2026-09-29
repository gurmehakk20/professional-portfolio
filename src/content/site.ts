import type { SiteConfig } from "./types";

/*
 * Global site settings: brand, contact details, navigation, social links
 * and SEO defaults.
 *
 * ⚠️  PLACEHOLDER values are marked below — replace them before launch.
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
    "Independent web designer and developer building fast, responsive, easy-to-use websites for clinics, local businesses and professionals.",
  url,
  locale: "en_GB",
  author: "Mehak",
  jobTitle: "Web Designer & Developer",

  contact: {
    email: "hello@example.com", // PLACEHOLDER
    whatsapp: {
      number: "910000000000", // PLACEHOLDER — country code + number, digits only
      display: "+91 00000 00000", // PLACEHOLDER
      message: "Hi Mehak, I'd like to talk about a website for my business.",
    },
    location: "Working with clients remotely", // PLACEHOLDER — e.g. "Based in Pune · Working remotely"
    responseTime: "I usually reply within one working day.", // PLACEHOLDER — only keep if true
  },

  // PLACEHOLDER — replace with your real profiles, or remove any you don't use.
  // Available icons: "linkedin", "github", "instagram", "dribbble", "behance", "x".
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/your-profile", icon: "linkedin" },
    { label: "GitHub", href: "https://github.com/your-username", icon: "github" },
    { label: "Instagram", href: "https://www.instagram.com/your-handle", icon: "instagram" },
  ],

  nav: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "Approach", href: "/#approach" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/contact" },
  ],

  cta: { label: "Let's Talk", href: "/contact" },

  availability: {
    show: true,
    label: "Available for new projects", // Set show: false when you're fully booked.
  },

  footer: {
    blurb: "Clear, easy-to-use websites for clinics, local businesses and independent professionals.",
  },
};
