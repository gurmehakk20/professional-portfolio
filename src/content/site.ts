import type { SiteConfig } from "./types";

/*
 * Global site settings: brand, contact details, navigation, social links
 * and SEO defaults.
 *
 * Contact details and profiles left empty ("") are hidden on the site, so
 * nothing fake is ever shown — but people need at least an email address or
 * a WhatsApp number to reach you. The production build warns if both are empty.
 */

/**
 * Canonical production URL (no trailing slash).
 * Set NEXT_PUBLIC_SITE_URL in your hosting environment (e.g. https://gurmehak.dev).
 * On Vercel it falls back to the project's production domain (your custom
 * domain once you add one, otherwise the .vercel.app address), so canonical
 * URLs and search indexing work even before it's set. It's read at build
 * time, so rebuild after changing it.
 */
const PLACEHOLDER_URL = "https://www.example.com";
const vercelDomain = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL?.trim();
const url = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
  (vercelDomain ? `https://${vercelDomain}` : PLACEHOLDER_URL)
).replace(/\/+$/, "");

if (!/^https?:\/\//.test(url)) {
  throw new Error(`NEXT_PUBLIC_SITE_URL must start with https:// (got "${url}").`);
}

/** True until the real site URL is set. While true, search engines are asked not to index the site. */
export const isPlaceholderSiteUrl = url === PLACEHOLDER_URL;

/** Where you're based. Used in search titles and descriptions — change it here and they all update. */
const city = "Bengaluru";

export const site: SiteConfig = {
  name: "Gurmehak",
  tagline: "Web Developer & WordPress Website Designer",
  title: `Freelance Web Developer & WordPress Designer in ${city} | Gurmehak Kaur`,
  titleSuffix: "Gurmehak Kaur",
  city,
  description: `Freelance web developer in ${city} building custom-coded and WordPress websites for small businesses, clinics, startups and agencies.`,
  url,
  locale: "en_GB",
  author: "Gurmehak",
  fullName: "Gurmehak Kaur",
  jobTitle: "Web Developer & WordPress Website Designer",

  contact: {
    email: "gurmehakkaur52@gmail.com", // Leave empty ("") to hide email everywhere
    whatsapp: {
      number: "917973086834", // Country code + number, digits only. Leave empty to hide WhatsApp.
      display: "+91 79730 86834", // How the number is shown on the site
      message: "Hi Gurmehak, I'd like to talk about a website project.",
    },
    location: `Based in ${city} · Working with clients remotely`, // Optional
    responseTime: "I usually reply within one working day.", // Optional — only keep if true
  },

  // Profiles shown in the footer and contact sections. Empty links are hidden.
  // Available icons: "linkedin", "github", "instagram", "dribbble", "behance", "x".
  socials: [
    { label: "LinkedIn", href: "https://www.linkedin.com/in/gurmehak-kaur2004/", icon: "linkedin" },
    { label: "GitHub", href: "", icon: "github" }, // Hidden for now — e.g. "https://github.com/gurmehakk20"
  ],

  nav: [
    { label: "Home", href: "/" },
    { label: "Work", href: "/#work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/#about" },
    { label: "Contact", href: "/contact" },
  ],

  cta: { label: "Start a project", href: "/contact" },

  availability: {
    show: true,
    label: "Available for new projects", // Set show: false when you're fully booked.
  },

  footer: {
    blurb: "Custom-coded and WordPress websites for small businesses, clinics, startups and agencies.",
  },
};

if (process.env.NODE_ENV === "production" && !site.contact.email && !site.contact.whatsapp.number) {
  console.warn(
    "\n⚠ No email address or WhatsApp number is set in src/content/site.ts, so visitors have no way to contact you. Add at least one before launch.\n",
  );
}
