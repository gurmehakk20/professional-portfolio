import type {
  AboutContent,
  FinalCtaContent,
  HeroContent,
  Principle,
  SectionIntro,
  ValuePoint,
} from "./types";

/*
 * Home page copy, in the order the sections appear.
 * Services, projects, process steps and FAQs live in their own files.
 */

export const hero: HeroContent = {
  eyebrow: "Web design & development",
  title: "Modern websites for businesses that want to be taken seriously.",
  description:
    "I design and develop fast, responsive websites with clear UX, strong visual hierarchy and business-focused functionality.",
  primaryCta: { label: "View Work", href: "/#work" },
  secondaryCta: { label: "Let's Talk", href: "/contact" },
};

/** The short strip of qualities under the hero. */
export const valuePoints: ValuePoint[] = [
  { title: "Mobile-first", description: "Designed for phones first", icon: "smartphone" },
  { title: "Fast-loading", description: "Lean code, optimised images", icon: "zap" },
  { title: "Responsive", description: "Right on every screen size", icon: "responsive" },
  { title: "Easy to navigate", description: "Clear paths to what matters", icon: "navigation" },
  { title: "Business-focused", description: "Built around your goals", icon: "target" },
];

export const servicesIntro: SectionIntro = {
  eyebrow: "What I build",
  title: "Websites shaped around how your business works",
  description:
    "From a focused landing page to a complete business website — every project starts with what your visitors need to find and do.",
};

export const workIntro: SectionIntro = {
  eyebrow: "Selected work",
  title: "Recent projects",
  description:
    "A selection of websites I've designed and built, each one shaped around what the business needed its website to do.",
};

export const principlesIntro: SectionIntro = {
  eyebrow: "Why work with me",
  title: "The principles behind every website",
  description:
    "A good website isn't decoration. It helps the right people find what they need — quickly, clearly and on any device.",
};

export const principles: Principle[] = [
  {
    title: "Thoughtful UX",
    description: "Visitors should be able to find what they need without thinking too hard.",
    icon: "compass",
  },
  {
    title: "Mobile-first",
    description: "Designed for the screens people actually use.",
    icon: "smartphone",
  },
  {
    title: "Performance",
    description: "Clean implementation and optimised assets keep websites fast.",
    icon: "gauge",
  },
  {
    title: "Business-focused",
    description: "Design decisions should support the goals of the business.",
    icon: "target",
  },
];

export const about: AboutContent = {
  eyebrow: "About",
  title: "Hi, I'm Mehak.",
  paragraphs: [
    "I'm a software developer who works across design and development. I design and build websites for clinics, local businesses and independent professionals — from the first conversation to launch day.",
    "My focus is simple: websites that look professional, load quickly, work properly on phones and make it easy for customers to take the next step. You work directly with me throughout, so nothing gets lost between a designer, a developer and an account manager.",
  ],
  focusAreas: [
    "UI/UX design",
    "Frontend development",
    "Responsive design",
    "Performance",
    "Business websites",
  ],
  // Add a portrait by placing it in /public/images/about/ and uncommenting:
  // image: { src: "/images/about/portrait.jpg", alt: "Portrait of Mehak" },
  cta: { label: "Let's Talk", href: "/contact" },
};

export const finalCta: FinalCtaContent = {
  title: "Have a website in mind?",
  description: "Let's build something that works beautifully for your business.",
  primaryCta: { label: "Let's Talk", href: "/contact" },
  showWhatsApp: true,
};
