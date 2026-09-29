import type { PageIntro, Project } from "./types";

/*
 * Projects — used on the home page ("Selected work"), the /work page and
 * each project's detail page at /work/[slug].
 *
 * ⚠️  PLACEHOLDER: the projects below are examples to shape the layout.
 * Replace them with real projects. Only describe work and results you can
 * stand behind — never add invented metrics or testimonials.
 *
 * Adding images:
 *   1. Put screenshots in /public/images/projects/<slug>/ (WebP or AVIF, ~2000px wide).
 *   2. Set `src` on `cover` and each screenshot, e.g. "/images/projects/arka-dental/home.webp".
 *   3. Write a short `alt` describing what the image shows.
 *   4. For a phone screenshot (portrait, ~1170px wide), add `device: "mobile"`:
 *      it's shown in a phone outline instead of being cropped to a wide box.
 * Leave `src` out and a neutral placeholder preview is shown instead.
 */

export const workPage: PageIntro = {
  eyebrow: "Work",
  title: "Selected work",
  description:
    "Websites I've designed and developed for clinics, local businesses and professionals.",
  metaDescription:
    "Selected website design and development projects for clinics, local businesses and professionals.",
};

export const projects: Project[] = [
  {
    // PLACEHOLDER — confirm the description, services and tags, then add
    // real screenshots and the live URL. Remove `placeholder: true` when done.
    slug: "arka-dental",
    title: "Arka Dental",
    category: "Clinic website",
    summary:
      "A clean, mobile-friendly website for a dental clinic, designed to make treatments, timings and appointment enquiries easy to find.",
    services: ["UX & UI design", "Web development"],
    tags: ["Healthcare", "Mobile-first", "Responsive"],
    cover: { alt: "Home page of the Arka Dental website" },
    // liveUrl: "https://www.arkadental.example",
    featured: true,
    placeholder: true,
    detail: {
      overview:
        "Use this space for a short introduction to the project: who the client is, who their patients are and what the website needed to achieve.",
      challenge:
        "Describe the problem the website had to solve — for example, patients struggling to find treatment information, timings or contact details on their phones.",
      approach:
        "Explain the key decisions you made in structure, design and development, and why they suited the clinic and its patients.",
      features: [
        { title: "Treatment pages", description: "Clear, scannable pages for each treatment." },
        {
          title: "Appointment enquiries",
          description: "WhatsApp, phone and form options, always within reach.",
        },
        { title: "Clinic information", description: "Timings, location and directions in one place." },
        { title: "Mobile-first layout", description: "Designed for patients browsing on their phones." },
      ],
      screenshots: [
        { alt: "Arka Dental home page on desktop" },
        { alt: "Arka Dental treatments page" },
        { alt: "Arka Dental website on a phone", device: "mobile" },
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    },
  },
  {
    // PLACEHOLDER — replace with a real project.
    slug: "local-business-website",
    title: "Local Business Website",
    category: "Business website",
    summary:
      "A multi-page website for a local service business, with clear service pages and quick ways to get in touch.",
    services: ["Design", "Development"],
    tags: ["Local business", "Multi-page"],
    cover: { alt: "Home page of a local business website" },
    featured: true,
    placeholder: true,
    detail: {
      overview:
        "Introduce the business, what it offers and who its customers are, in two or three sentences.",
      challenge:
        "What wasn't working before? Explain the problem in the client's terms rather than technical ones.",
      approach:
        "Walk through how you structured the content, shaped the design and built the site to solve that problem.",
      features: [
        { title: "Service pages", description: "Each service explained clearly on its own page." },
        { title: "Quick contact", description: "Call, WhatsApp and email options on every page." },
        { title: "Easy updates", description: "Structured so content can be changed without a rebuild." },
      ],
      screenshots: [{ alt: "Home page on desktop" }, { alt: "Services page" }],
      technologies: ["Next.js", "Tailwind CSS"],
    },
  },
  {
    // PLACEHOLDER — replace with a real project.
    slug: "service-landing-page",
    title: "Service Landing Page",
    category: "Landing page",
    summary:
      "A focused landing page for a single service, built around one clear call to action.",
    services: ["Design", "Development"],
    tags: ["Landing page", "Campaign"],
    cover: { alt: "A service landing page" },
    featured: true,
    placeholder: true,
    detail: {
      overview: "Summarise the offer the page was built to promote and who it was aimed at.",
      challenge: "Describe what the page needed to achieve and any constraints you worked within.",
      approach:
        "Explain how the page structure, copy hierarchy and design guide visitors towards a single action.",
      features: [
        { title: "Single clear action", description: "Every section leads towards one enquiry." },
        { title: "Scannable layout", description: "Key details readable at a glance." },
        { title: "Fast on mobile", description: "Lightweight, so it loads quickly on any connection." },
      ],
      screenshots: [
        { alt: "Landing page on desktop" },
        { alt: "Landing page on a phone", device: "mobile" },
      ],
      technologies: ["Next.js", "Tailwind CSS"],
    },
  },
];
