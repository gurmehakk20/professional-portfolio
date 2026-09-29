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

export type SocialLink = {
  label: string;
  href: string;
  icon: IconName;
};

export type ContactDetails = {
  email: string;
  whatsapp: {
    /** Full international number, digits only — no "+", spaces or dashes. Used for wa.me links. */
    number: string;
    /** How the number is shown on the page. */
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
  description: string;
  primaryCta: CtaLink;
  secondaryCta?: CtaLink;
};

export type ValuePoint = {
  title: string;
  description?: string;
  icon: IconName;
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

export type FinalCtaContent = {
  title: string;
  description: string;
  primaryCta: CtaLink;
  /** When true, a WhatsApp button is shown next to the primary CTA. */
  showWhatsApp?: boolean;
};

/* ------------------------------------------------------------------ */
/* Process                                                             */
/* ------------------------------------------------------------------ */

export type ProcessStep = {
  title: string;
  description: string;
};

/* ------------------------------------------------------------------ */
/* Services                                                            */
/* ------------------------------------------------------------------ */

export type Service = {
  /** URL-friendly id, used for /services#slug and the contact form. */
  slug: string;
  name: string;
  /** One or two sentences, shown on service cards. */
  summary: string;
  icon: IconName;
  /** Longer introduction for the services page. Falls back to `summary`. */
  description?: string;
  /** Who this service is for. */
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

/** An image of a project. Leave `src` undefined to show a neutral placeholder preview. */
export type ProjectMedia = {
  /** Path inside /public, e.g. "/images/projects/arka-dental/home.webp". */
  src?: string;
  /** Describe what the image shows — this is read aloud by screen readers. */
  alt: string;
  caption?: string;
};

export type ProjectFeature = {
  title: string;
  description: string;
};

export type Project = {
  /** URL-friendly id, used for /work/[slug]. */
  slug: string;
  title: string;
  /** e.g. "Clinic website". */
  category: string;
  /** One or two sentences, shown on project cards. */
  summary: string;
  /** Your role or services, e.g. ["UX & UI design", "Development"]. */
  services: string[];
  /** Short labels shown on cards. */
  tags: string[];
  year?: string;
  /** Cover image used on cards and at the top of the project page. */
  cover: ProjectMedia;
  /** Live website. */
  liveUrl?: string;
  /** Optional external case study (e.g. a PDF, Notion or Behance page). */
  caseStudyUrl?: string;
  /** Show on the home page. */
  featured?: boolean;
  /**
   * Marks example content. Placeholder projects show a small "Placeholder"
   * label so they're never mistaken for real client work.
   * Remove this line once the project is real.
   */
  placeholder?: boolean;
  /** Content for the project detail page (/work/[slug]). */
  detail: {
    overview: string;
    challenge: string;
    approach: string;
    features: ProjectFeature[];
    screenshots: ProjectMedia[];
    technologies: string[];
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
