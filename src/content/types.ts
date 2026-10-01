/*
 * Shared types for everything in /src/content.
 *
 * Components are built against these types, so as long as your content
 * matches them you can change any text, list or link without touching
 * the components themselves.
 */

import type { IconName } from "@/components/ui/icon";

export type { IconName };

/** A text link or button. `href` can be internal ("/work", "/#about") or external ("https://…"). */
export type CtaLink = {
  label: string;
  href: string;
};

/** Heading block used at the top of most sections. */
export type SectionIntro = {
  /** Small label shown above the title, e.g. "Selected work". */
  eyebrow?: string;
  title: string;
  description?: string;
};

/* ------------------------------------------------------------------ */
/* Site                                                                */
/* ------------------------------------------------------------------ */

/** A profile link. Leave `href` empty ("") to hide it. */
export type SocialLink = {
  label: string;
  href: string;
  icon: IconName;
};

/**
 * Your contact details. Anything left empty ("") is simply not shown, so the
 * site never displays placeholder details.
 */
export type ContactDetails = {
  /** e.g. "hello@yourdomain.com". Leave empty to hide email everywhere. */
  email: string;
  whatsapp: {
    /** Full international number, digits only — no "+", spaces or dashes. Leave empty to hide WhatsApp. */
    number: string;
    /** How the number is shown on the page, e.g. "+91 98765 43210". */
    display: string;
    /** Pre-filled message when someone taps a WhatsApp button. */
    message: string;
  };
  /** Optional line such as "Based in Pune · Working with clients remotely". */
  location?: string;
  /** Optional expectation-setting line, e.g. "I usually reply within one working day." */
  responseTime?: string;
};

export type SiteConfig = {
  /** Wordmark shown in the header and footer. */
  name: string;
  /** Short descriptor shown under the name in the footer. */
  tagline: string;
  /** Default <title> for the home page and fallback for other pages. */
  title: string;
  /** Default meta description. */
  description: string;
  /** Canonical production URL with no trailing slash. */
  url: string;
  /** Open Graph locale, e.g. "en_GB". */
  locale: string;
  /** The person behind the site — used in metadata and structured data. */
  author: string;
  /** Your full name, used in search-engine metadata. */
  fullName: string;
  /** Your role, e.g. "Web Designer & Developer". Used in structured data for search engines. */
  jobTitle: string;
  contact: ContactDetails;
  socials: SocialLink[];
  /** Main navigation. */
  nav: CtaLink[];
  /** Primary call to action shown in the header. */
  cta: CtaLink;
  /** Optional availability note shown in the hero. Set `show: false` to hide it. */
  availability: {
    show: boolean;
    label: string;
  };
  footer: {
    /** Short line under the wordmark. */
    blurb: string;
  };
};

/* ------------------------------------------------------------------ */
/* Home page                                                           */
/* ------------------------------------------------------------------ */

export type HeroContent = {
  eyebrow?: string;
  title: string;
  /** Part of the title to highlight in blue, e.g. "taken seriously.". Must match the title exactly. */
  titleHighlight?: string;
  description: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
};

export type Principle = {
  title: string;
  description: string;
  icon: IconName;
};

export type AboutContent = SectionIntro & {
  paragraphs: string[];
  /** Short list of focus areas shown as tags. */
  focusAreas: string[];
  /** Optional portrait. Leave undefined to show a neutral monogram card instead. */
  image?: {
    /** Path inside /public, e.g. "/images/about/portrait.jpg". */
    src: string;
    alt: string;
  };
  cta?: CtaLink;
};

/** The closing contact section: heading, short copy, the main button and your contact methods. */
export type ContactSectionContent = SectionIntro & {
  primaryCta: CtaLink;
  /** Small heading above the list of contact methods. */
  methodsLabel: string;
};

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export type ProcessStep = {
  title: string;
  description: string;
  /** What the client has at the end of the step, e.g. "A clear plan". */
  outcome?: string;
};

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  /** URL-friendly id, used for /services#slug and the contact form. */
  slug: string;
  name: string;
  /** What it is, in one or two sentences. */
  summary: string;
  icon: IconName;
  /** Who it's for, in one short line (home page). */
  bestFor: string;
  /** The business problem it solves, in one or two sentences. */
  problem: string;
  /** Short deliverable labels shown as chips, e.g. "Custom UI". */
  deliverables: string[];
  /** Longer introduction for the services page. Falls back to `summary`. */
  description?: string;
  /** Who this service is for (services page). */
  audience: string[];
  /** What's included. */
  includes: string[];
  /** Optional extras. Hidden when empty. */
  addOns?: string[];
  /** e.g. "Typically 3–5 weeks". Hidden when empty. */
  timeline?: string;
  /** Optional pricing. Hidden when undefined. */
  pricing?: {
    /** e.g. "From ₹25,000" or "From $900". */
    label: string;
    /** e.g. "Final quote depends on scope." */
    note?: string;
  };
  /** Optional CTA override. Defaults to the contact page with this service pre-selected. */
  cta?: CtaLink;
};

/* ------------------------------------------------------------------ */
/* Projects                                                            */
/* ------------------------------------------------------------------ */

/** A screenshot of a project. */
export type ProjectMedia = {
  /** Path inside /public, e.g. "/images/projects/arka-dental/home.webp". */
  src: string;
  /** Describe what the image shows — this is read aloud by screen readers. */
  alt: string;
  caption?: string;
  /**
   * Set to "mobile" for a portrait phone screenshot (about 1170px wide).
   * It's shown whole inside a phone outline instead of being cropped.
   */
  device?: "desktop" | "mobile";
};

export type ProjectFeature = {
  title: string;
  description: string;
};

export type Project = {
  /** URL-friendly id, used for /work/[slug]. */
  slug: string;
  title: string;
  /** e.g. "Dental clinic website". */
  category: string;
  /** One line: what it is and who it's for. Shown on cards. */
  summary: string;
  /** Technologies, shown as small labels where useful, e.g. ["Next.js", "Tailwind CSS"]. */
  technologies?: string[];
  /** Your role, e.g. ["Design", "Development"]. */
  role?: string[];
  year?: string;
  /** Screenshot for cards and the project page. Without one, a designed cover with the project's name is shown. */
  cover?: ProjectMedia;
  /** Brand colour for that designed cover, e.g. "#0e7490". Defaults to the site blue. */
  coverColor?: string;
  /** The live website — adds a "Visit live site" link. */
  liveUrl?: string;
  /** Optional external case study (e.g. a PDF, Notion or Behance page). */
  caseStudyUrl?: string;
  /** Show on the home page. */
  featured?: boolean;
  /** A full case study at /work/[slug]. Leave out and no project page is created. */
  caseStudy?: {
    overview: string;
    challenge: string;
    approach: string;
    features: ProjectFeature[];
    screenshots: ProjectMedia[];
  };
};

/* ------------------------------------------------------------------ */
/* FAQ                                                                 */
/* ------------------------------------------------------------------ */

export type FaqItem = {
  question: string;
  /** Plain text. Use a blank line ("\n\n") to start a new paragraph. */
  answer: string;
};

/* ------------------------------------------------------------------ */
/* Pages                                                               */
/* ------------------------------------------------------------------ */

/** Copy for the top of an inner page, plus its SEO description. */
export type PageIntro = {
  eyebrow?: string;
  title: string;
  description: string;
  /** Meta description for search results. Falls back to `description`. */
  metaDescription?: string;
};

export type ContactChannel = {
  title: string;
  description: string;
  /** Button label. */
  label: string;
};

export type ContactPageContent = PageIntro & {
  whatsapp: ContactChannel;
  email: ContactChannel;
  form: {
    /** Set to false to hide the form and keep only the WhatsApp / email options. */
    enabled: boolean;
    title: string;
    description: string;
    /** Extra option added after your services in "What do you need?". */
    otherOption: string;
    submitWhatsApp: string;
    submitEmail: string;
    /** Subject line used when the message is sent by email. */
    emailSubject: string;
  };
  nextSteps: {
    title: string;
    steps: string[];
  };
};
