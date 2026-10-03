import type {
  AboutContent,
  ContactSectionContent,
  HeroContent,
  Principle,
  SectionIntro,
} from "./types";

/*
 * Home page copy, in the order the sections appear:
 * hero → selected work → services → why work with me → process → about → FAQ → contact.
 * Projects, services, process steps and FAQs live in their own files.
 */

export const hero: HeroContent = {
  eyebrow: "Web design & development",
  title: "Modern websites for businesses that want to be taken seriously.",
  titleHighlight: "taken seriously.",
  description:
    "I design and build fast, responsive websites that make your business look credible — and make it easy for customers to take the next step.",
  primaryCta: { label: "Start a project", href: "/contact" },
  secondaryCta: { label: "View my work", href: "/#work" },
};

export const workIntro: SectionIntro = {
  eyebrow: "Selected work",
  title: "Websites and web apps I've designed and built",
  description:
    "Clinic and healthcare websites, a library management system and an online flower shop. Each one opens live in a new tab.",
};

export const servicesIntro: SectionIntro = {
  eyebrow: "Services",
  title: "What I can build for you",
  description:
    "Four ways I help — each one designed around a business problem, not a template.",
};

export const whyIntro: SectionIntro = {
  eyebrow: "Why work with me",
  title: "A practical way to get a website done well",
  description:
    "Working with an independent designer-developer means fewer hand-offs, clearer decisions and a website built for your business.",
};

/** The differentiators in "Why work with me". */
export const differentiators: Principle[] = [
  {
    title: "Direct communication",
    description:
      "You talk to the person designing and building your site. No account managers, no hand-offs.",
    icon: "message",
  },
  {
    title: "Custom-built, not templated",
    description:
      "Every site is designed and built for your business, so it fits your content, brand and goals.",
    icon: "pen",
  },
  {
    title: "Business-focused design",
    description:
      "Layouts, headings and calls to action are planned around what you need visitors to do.",
    icon: "target",
  },
  {
    title: "Responsive by default",
    description:
      "Designed for phones first and tested across screen sizes as standard — never an extra.",
    icon: "responsive",
  },
  {
    title: "Modern React & Next.js stack",
    description:
      "Fast, search-friendly sites on a modern foundation that's easy to extend as you grow.",
    icon: "code",
  },
  {
    title: "No agency bloat",
    description:
      "A lean process with clear steps and honest scoping. You pay for the work, not the overhead.",
    icon: "zap",
  },
];

export const about: AboutContent = {
  eyebrow: "About",
  title: "Hi, I'm Gurmehak.",
  paragraphs: [
    "I'm Gurmehak, an independent web designer and developer. I design and build modern, responsive websites with React and Next.js for businesses, startups and agencies.",
    "I care about good websites because they're often a customer's first impression. A clear, fast site helps a good business look as good online as it is in person.",
  ],
  focusAreas: ["UI/UX design", "React & Next.js", "Responsive design", "Performance", "SEO foundations"],
  // Add a portrait by placing it in /public/images/about/ and uncommenting:
  // image: { src: "/images/about/portrait.jpg", alt: "Portrait of Gurmehak" },
  cta: { label: "Get in touch", href: "/contact" },
};

/** The closing contact section, shown at the end of most pages. */
export const contactSection: ContactSectionContent = {
  eyebrow: "Contact",
  title: "Have a project in mind?",
  description:
    "Tell me a little about what you need. I'll reply with a few questions and clear next steps — no jargon, no pressure.",
  primaryCta: { label: "Start a project", href: "/contact" },
  methodsLabel: "Or reach me directly",
};
