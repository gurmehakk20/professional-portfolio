import type { PageIntro, SectionIntro, Service } from "./types";

/*
 * Services — used on the home page, the /services page and the contact
 * form's "What do you need?" options.
 *
 * Each service answers three questions for a client: what it is (`summary`),
 * who it's for (`bestFor` / `audience`) and what problem it solves (`problem`).
 * Add, remove or reorder freely — the pages adapt automatically.
 * The first FAQ in faq.ts repeats the timelines — update both together.
 *
 * Available icons are listed in src/components/ui/icon.tsx
 * (e.g. "briefcase", "layout", "refresh", "code", "layers", "rocket").
 */

export const servicesPage: PageIntro = {
  eyebrow: "Services",
  title: "Four ways I can help your business",
  description:
    "Each service shows who it's for, the problem it solves and what's included. Not sure which you need? Ask — I'll point you in the right direction.",
  metaDescription:
    "Business websites, landing pages, website redesigns and custom web experiences — designed and built with React and Next.js.",
};

/** Deliverables that come with every service, shown once rather than repeated per service. */
export const includedIntro: SectionIntro = {
  eyebrow: "Included as standard",
  title: "Every project includes",
  description: "Whichever service you choose, these are built in.",
};

export const standardDeliverables: string[] = [
  "Responsive design",
  "Mobile optimisation",
  "Performance basics",
  "SEO foundations",
  "Deployment",
];

export const services: Service[] = [
  {
    slug: "business-websites",
    name: "Business Websites",
    icon: "briefcase",
    summary:
      "A complete multi-page website that explains what you do, shows why people should trust you and makes it easy to get in touch.",
    bestFor: "Small businesses, clinics and professional services",
    problem:
      "Customers look you up before they call. A dated or confusing website quietly sends them elsewhere — a clear one earns their trust.",
    deliverables: ["Custom UI", "Contact & WhatsApp integration", "Post-launch support"],
    description:
      "Clear pages for what you offer, who you are and how to reach you — designed around your brand and built to work smoothly on every device.",
    audience: [
      "Small businesses and local services",
      "Clinics, consultancies and professional practices",
      "Businesses with an outdated website — or none at all",
    ],
    includes: [
      "Home, about, services and contact pages",
      "Design tailored to your brand",
      "Enquiry form, WhatsApp and click-to-call",
      "Google Maps and business details",
    ],
    addOns: ["Copywriting support", "Blog or news section", "Analytics setup"],
    timeline: "Typically 3–5 weeks",
    // pricing: { label: "From ₹XX,XXX", note: "Final quote depends on scope." },
  },
  {
    slug: "landing-pages",
    name: "Landing Pages",
    icon: "layout",
    summary: "A single, focused page built around one offer and one clear next step.",
    bestFor: "Launches, campaigns, startups and paid ads",
    problem:
      "Sending people to a busy homepage loses them. A focused page keeps them on one message and one action.",
    deliverables: ["Custom UI", "Contact & WhatsApp integration"],
    description:
      "One page that explains one offer and guides visitors towards one action — ideal for a new service, a product launch, a campaign or an event.",
    audience: [
      "Businesses promoting a single service or offer",
      "Startups launching a product",
      "Campaigns and ads that need a dedicated destination",
    ],
    includes: [
      "One focused, well-structured page",
      "One clear next step, with easy ways to enquire",
      "Sections for benefits, details and FAQs",
      "Fast loading on mobile networks",
    ],
    addOns: ["Analytics and conversion tracking", "Additional page variations"],
    timeline: "Typically 1–2 weeks",
  },
  {
    slug: "website-redesigns",
    name: "Website Redesigns",
    icon: "refresh",
    summary:
      "A modern, faster version of your existing website — keeping the content and links that already work.",
    bestFor: "Websites that look dated, load slowly or struggle on phones",
    problem:
      "An outdated site makes a good business look behind the times. A redesign brings your website up to the standard of your work.",
    deliverables: ["Custom UI", "Content migration", "Post-launch support"],
    description:
      "A fresh structure, a modern look and pages that load quickly on phones — without starting from zero or losing what already works.",
    audience: [
      "Businesses with an outdated or hard-to-use website",
      "Websites that don't work well on mobile",
      "Sites that are slow or difficult to update",
    ],
    includes: [
      "Review of your current website",
      "Improved structure and navigation",
      "Fresh, modern visual design",
      "Your existing content moved across, with old links still working",
    ],
    addOns: ["Copy refresh", "Photography direction"],
    timeline: "Typically 3–6 weeks",
  },
  {
    slug: "custom-web-experiences",
    name: "Custom Web Experiences",
    icon: "code",
    summary:
      "Interactive, product-style web builds in React and Next.js — from booking flows to bespoke marketing sites.",
    bestFor: "Startups, product teams and agencies",
    problem:
      "When a template can't do what you need, it has to be built properly: fast, reliable and easy to extend later.",
    deliverables: ["Custom UI", "React & Next.js", "Post-launch support"],
    description:
      "Custom functionality and interactive interfaces, built with React and Next.js. I can work from your designs or design it with you, and I'm happy to work white-label for agencies.",
    audience: [
      "Startups building a product or marketing site",
      "Agencies looking for a freelance or white-label developer",
      "Businesses that need features a template can't handle",
    ],
    includes: [
      "Front-end development in React and Next.js",
      "Integrations with the tools and services you use",
      "Clean, maintainable code that's easy to hand over",
      "Deployment and handover",
    ],
    addOns: ["White-label delivery for agencies", "Ongoing development support"],
  },
];
