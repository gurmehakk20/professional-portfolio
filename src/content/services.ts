import { site } from "./site";
import type { PageIntro, SectionIntro, Service, StartingPrice } from "./types";

/*
 * Services — used on the home page, the /services page and the contact
 * form's "Type of website" options.
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
  title: "Web design and development services",
  description:
    "Business websites, WordPress websites, and custom-coded websites and landing pages — each with who it's for, what's included and a starting price. Not sure which you need? Ask and I'll recommend one.",
  metaDescription: `Website design and development from a freelance web developer in ${site.city}: business websites, WordPress websites, custom-coded websites and landing pages, with starting prices.`,
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

/**
 * A rough starting price, shown quietly under the services on the home page
 * ("Projects start from ₹7,000"). Delete it to hide the line.
 */
export const startingPrice: StartingPrice = {
  from: "₹7,000",
  note: "Final pricing depends on project scope, pages, functionality and integrations.",
};


/*
 * Starting prices are a guide, not a fixed rate card — edit them freely.
 * They appear on the services page; the home page shows only `startingPrice`.
 */
export const services: Service[] = [
  {
    slug: "business-websites",
    name: "Business Websites",
    icon: "briefcase",
    summary:
      "A professional multi-page website that explains what you do, shows why people can trust you and makes it easy to get in touch.",
    bestFor: "Local businesses, clinics and service providers",
    problem:
      "Customers look you up before they call. A dated or confusing website quietly sends them elsewhere — a clear one makes it easy to enquire.",
    deliverables: [
      "Responsive multi-page website",
      "Enquiry form, WhatsApp & click-to-call",
      "Basic SEO setup",
      "Handover walkthrough",
    ],
    description:
      "Service pages, an about page, contact details and clear calls to action — designed around your brand and built with whichever approach suits you: custom-coded, or on WordPress if you'd like to update it yourself.",
    audience: [
      "Local businesses and service providers",
      "Clinics, consultancies and professional practices",
      "Businesses with an outdated website — or none at all",
    ],
    includes: [
      "Home, about, services and contact pages",
      "Design tailored to your brand",
      "Enquiry form, WhatsApp and click-to-call",
      "Google Maps and business details",
      "A responsive redesign, if you already have a site",
    ],
    addOns: ["Copywriting support", "Blog or news section", "Analytics setup"],
    timeline: "Typically 3–5 weeks",
    pricing: {
      label: "From ₹10,000",
      note: "Depends on the number of pages, content and features.",
    },
    cta: { label: "Enquire about a business website", href: "/contact?service=business-websites" },
  },
  {
    slug: "wordpress-websites",
    name: "WordPress Websites",
    icon: "panels",
    summary:
      "A flexible website you can manage and update yourself, built on WordPress with a theme customised to your brand.",
    bestFor: "Businesses that want to edit their own content",
    problem:
      "Waiting on a developer for every small change slows you down. Set up properly, WordPress lets you update text, images and pages yourself.",
    deliverables: [
      "Customised theme",
      "Editable pages and content",
      "Basic SEO and performance setup",
      "Handover walkthrough",
    ],
    description:
      "Business and professional websites on WordPress: theme customisation, page layouts, responsive implementation and content management set up so you can keep the site up to date.",
    audience: [
      "Businesses that want to update their own website",
      "Content-driven sites — blogs, news and resources",
      "Existing WordPress sites that need a responsive redesign",
    ],
    includes: [
      "WordPress setup and theme customisation",
      "Page building and layouts",
      "Responsive implementation and testing",
      "Content editing and CMS configuration",
      "Basic SEO setup and performance optimisation",
    ],
    addOns: ["Maintenance and updates", "Content moved from your current site", "Blog setup"],
    pricing: {
      label: "Quoted on scope",
      note: "Depends on the pages, theme work, plugins and content involved.",
    },
    cta: { label: "Enquire about a WordPress website", href: "/contact?service=wordpress-websites" },
  },
  {
    slug: "custom-websites",
    name: "Custom Websites & Landing Pages",
    icon: "code",
    summary:
      "Custom-coded marketing websites, landing pages and interactive front ends, built to a specific brief.",
    bestFor: "Startups, campaigns, product teams and agencies",
    problem:
      "When a template can't do what you need — a distinctive design, a focused campaign page or custom functionality — it has to be built properly.",
    deliverables: ["Custom UI", "React & Next.js", "Fast, responsive build", "Clean, handover-ready code"],
    description:
      "Landing pages for a launch or campaign, custom marketing sites, interactive features and front ends built from your designs. I'm happy to work white-label for agencies, and to take on custom web applications when the scope fits.",
    audience: [
      "Startups launching a product or campaign",
      "Agencies looking for a freelance or white-label developer",
      "Businesses that need features a template can't handle",
    ],
    includes: [
      "Custom design, or a build from your designs (e.g. Figma)",
      "Frontend development in React and Next.js",
      "Landing pages focused on one clear action",
      "Integrations with the tools you use",
      "Deployment and handover",
    ],
    addOns: ["White-label delivery for agencies", "Analytics and conversion tracking", "Ongoing development support"],
    timeline: "Landing pages typically 1–2 weeks; custom builds depend on scope",
    pricing: {
      label: "Landing pages from ₹7,000 · Custom-coded sites from ₹18,000",
      note: "Depends on design complexity, functionality and integrations.",
    },
    cta: { label: "Enquire about a custom build", href: "/contact?service=custom-websites" },
  },
];
