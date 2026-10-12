import type {
  AboutContent,
  Capability,
  ContactSectionContent,
  HeroContent,
  SectionIntro,
  WordPressSpotlightContent,
} from "./types";

/*
 * Home page copy, in the order the sections appear:
 * hero → capabilities → selected work → services → WordPress → about →
 * process → FAQ → contact.
 * Projects, services, process steps and FAQs live in their own files.
 */

export const hero: HeroContent = {
  eyebrow: "Web developer & WordPress designer",
  title: "I build modern websites for businesses ready to grow.",
  titleHighlight: "ready to grow.",
  description:
    "From custom-coded builds to flexible WordPress sites, I help small businesses, clinics and startups turn their ideas into polished, responsive websites.",
  primaryCta: { label: "Discuss your project", href: "/contact" },
  secondaryCta: { label: "Explore my work", href: "/#work" },
};

export const capabilitiesIntro: SectionIntro = {
  title: "What I can help with",
  description: "Two ways to build — custom code or WordPress — and the skills around them.",
};

/** Keep to things you can show or explain in a call. */
export const capabilities: Capability[] = [
  {
    title: "Custom website development",
    description: "Hand-coded sites built around your content, brand and goals.",
    icon: "code",
  },
  {
    title: "WordPress development",
    description: "Business sites on WordPress, set up so you can update them yourself.",
    icon: "panels",
  },
  {
    title: "Responsive design",
    description: "Layouts planned for phones first and checked on every screen size.",
    icon: "responsive",
  },
  {
    title: "Frontend development",
    description: "Clean, accessible interfaces in HTML, CSS, JavaScript, React and Next.js.",
    icon: "layers",
  },
  {
    title: "Website redesigns",
    description: "Modern, faster versions of sites that look dated or struggle on phones.",
    icon: "refresh",
  },
  {
    title: "AI-assisted workflow",
    description: "AI tools speed up routine work; design, code review and testing stay with me.",
    icon: "sparkles",
  },
];

export const workIntro: SectionIntro = {
  eyebrow: "Selected work",
  title: "Websites and web apps I've designed and built",
  description:
    "Concept websites for a dental clinic, a healthcare provider and a flower shop, and a library management system I built as a personal project. Each one opens live in a new tab.",
};

export const servicesIntro: SectionIntro = {
  eyebrow: "Services",
  title: "What I can build for you",
  description:
    "Three ways I can help — custom-coded or on WordPress, whichever suits your project.",
};

export const wordpressSpotlight: WordPressSpotlightContent = {
  eyebrow: "WordPress",
  title: "Need a WordPress website? I build those too.",
  description:
    "Not every website needs custom code. For many business and content-driven sites, WordPress is the practical choice — and I can design, build and set it up for you.",
  benefits: [
    {
      title: "Update it yourself",
      description:
        "Edit text, images, pages and posts from the WordPress dashboard, wherever the site is set up for it.",
      icon: "square-pen",
    },
    {
      title: "A good fit for business sites",
      description:
        "Well suited to service businesses, blogs and content-driven websites that change often.",
      icon: "briefcase",
    },
    {
      title: "Themes and plugins, used well",
      description:
        "A customised theme and carefully chosen plugins add features like forms and galleries without building everything from scratch.",
      icon: "puzzle",
    },
  ],
  comparison: {
    title: "Which should you choose?",
    options: [
      {
        label: "WordPress suits you if…",
        points: [
          "You want to edit content yourself",
          "Your site is mostly pages, posts and forms",
          "Standard features cover what you need",
        ],
      },
      {
        label: "Custom code suits you if…",
        points: [
          "You want a distinctive design or interactions",
          "Speed and a lean codebase matter most",
          "You need features a theme or plugin can't handle well",
        ],
      },
    ],
    note: "Not sure? The best approach depends on the project — tell me what you need and I'll recommend one.",
  },
  cta: { label: "Ask about a WordPress website", href: "/contact?service=wordpress-websites" },
};

export const about: AboutContent = {
  eyebrow: "About",
  title: "Hi, I'm Gurmehak.",
  paragraphs: [
    "I'm Gurmehak Kaur, a Computer Science and Engineering graduate and freelance web developer. I build custom-coded websites with React and Next.js, and WordPress websites when that's the better fit.",
    "I've built frontend and full-stack projects — from clinic websites to a library management system — and I enjoy turning a brief into something practical and polished. You work with me directly, from the first conversation to launch.",
  ],
  focusAreas: ["Custom-coded websites", "WordPress", "React & Next.js", "Responsive design", "Full-stack projects"],
  // Add a portrait by placing it in /public/images/about/ and uncommenting:
  // image: { src: "/images/about/portrait.jpg", alt: "Portrait of Gurmehak Kaur" },
  cta: { label: "Get in touch", href: "/contact" },
};

/** The closing contact section, shown at the end of most pages. */
export const contactSection: ContactSectionContent = {
  eyebrow: "Contact",
  title: "Have a project in mind?",
  description:
    "Tell me a little about what you need — a new website, a WordPress site or a redesign. I'll reply with a few questions and clear next steps, no jargon and no pressure.",
  primaryCta: { label: "Start a project", href: "/contact" },
  methodsLabel: "Or reach me directly",
};
