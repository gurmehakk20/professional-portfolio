import type { PageIntro, SectionIntro, Service } from "./types";

/*
 * Services — used for the "What I build" cards on the home page,
 * the /services page and the contact form's "What do you need?" options.
 *
 * ⚠️  PLACEHOLDER: these four services, their inclusions and timelines are
 * examples to shape the layout. Replace them with your real offering.
 * Add, remove or reorder freely — the pages adapt automatically.
 *
 * Available icons are listed in src/components/ui/icon.tsx
 * (e.g. "briefcase", "stethoscope", "layout", "refresh", "panels", "rocket").
 */

export const servicesPage: PageIntro = {
  eyebrow: "Services",
  title: "Websites built around what your business needs",
  description:
    "Every business is different, so every website is shaped around its goals. Here's what I can help with — if you need something that isn't listed, just ask.",
  metaDescription:
    "Business websites, clinic websites, landing pages and website redesigns — designed and developed to be fast, responsive and easy to use.",
};

/** Shown once on the services page, so it doesn't need repeating in every service. */
export const includedIntro: SectionIntro = {
  eyebrow: "The essentials",
  title: "Included in every project",
  description: "Whichever service you choose, these come as standard.",
};

export const includedInEveryProject: string[] = [
  "Mobile-first, responsive design",
  "Fast loading and optimised images",
  "Clear structure and navigation",
  "Basic on-page SEO setup",
  "Accessibility best practices",
  "Launch support",
];

export const services: Service[] = [
  {
    slug: "business-websites",
    name: "Business Websites",
    icon: "briefcase",
    summary:
      "Multi-page websites that explain what you do, build trust and make it easy for customers to get in touch.",
    description:
      "A complete website for your business: clear pages for what you offer, who you are and how to reach you — designed to feel professional and work smoothly on every device.",
    audience: [
      "Local businesses and service providers",
      "Consultants and independent professionals",
      "Businesses with an outdated website — or none at all",
    ],
    includes: [
      "Home, about, services and contact pages",
      "Custom design based on your brand",
      "Contact form, WhatsApp and click-to-call buttons",
      "Google Maps and business details",
    ],
    addOns: ["Copywriting support", "Blog or news section", "Analytics setup", "Ongoing maintenance"],
    timeline: "Typically 3–5 weeks",
    // pricing: { label: "From ₹XX,XXX", note: "Final quote depends on scope." },
  },
  {
    slug: "clinic-websites",
    name: "Clinic Websites",
    icon: "stethoscope",
    summary:
      "Calm, clear websites for clinics and practices, with treatments, timings and appointment enquiries easy to find.",
    description:
      "Patients want to know three things quickly: what you treat, where you are and how to book. A clinic website puts that information front and centre, with a calm design that builds confidence.",
    audience: [
      "Dental, skin, physiotherapy and medical clinics",
      "Specialists and individual practitioners",
      "Practices with more than one location",
    ],
    includes: [
      "Treatment and service pages",
      "Doctor and team profiles",
      "Timings, location and directions",
      "Appointment enquiries via WhatsApp, phone or form",
    ],
    addOns: ["Online booking integration", "Patient FAQs and resources", "Multi-location support"],
    timeline: "Typically 3–6 weeks",
  },
  {
    slug: "landing-pages",
    name: "Landing Pages",
    icon: "layout",
    summary:
      "Focused single pages for a service, campaign or launch, built around one clear action.",
    description:
      "A single, focused page that explains one offer and guides visitors towards one action — ideal for promoting a new service, a campaign or an event.",
    audience: [
      "Businesses promoting a single service or offer",
      "Campaigns, launches and events",
      "Ads that need a dedicated destination",
    ],
    includes: [
      "One focused, well-structured page",
      "Clear call to action and enquiry options",
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
      "A modern, faster and easier-to-use version of your existing website, without losing what already works.",
    description:
      "If your current website feels dated, is hard to update or doesn't work well on phones, a redesign gives it a clear structure, a modern look and a solid technical foundation.",
    audience: [
      "Businesses with an outdated or hard-to-use website",
      "Websites that don't work well on mobile",
      "Sites that are slow or difficult to update",
    ],
    includes: [
      "Review of your current website",
      "Improved structure and navigation",
      "Fresh, modern visual design",
      "Content migration and redirects for existing links",
    ],
    addOns: ["Copy refresh", "Photography direction", "Ongoing maintenance"],
    timeline: "Typically 3–6 weeks",
  },
];
