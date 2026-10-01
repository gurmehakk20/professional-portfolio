import type { PageIntro, Project } from "./types";

/*
 * Projects — used on the home page ("Selected work"), the /work page and,
 * for projects with a `caseStudy`, their own page at /work/[slug].
 *
 * Only describe work you can stand behind — never add invented results,
 * metrics or testimonials.
 *
 * Images:
 *   1. Put screenshots in /public/images/projects/<slug>/ (WebP or AVIF, ~2000px wide).
 *   2. Set `cover` (and any case-study screenshots), e.g.
 *      cover: { src: "/images/projects/arka-dental/home.webp", alt: "Arka Dental home page" }
 *   3. For a phone screenshot (portrait, ~1170px wide), add `device: "mobile"`.
 * Without a cover, a designed cover with the project's name and category is shown.
 */

export const workPage: PageIntro = {
  eyebrow: "Work",
  title: "Selected work",
  description:
    "Websites I've designed and built — and what each business needed them to do.",
  metaDescription:
    "Selected website design and development projects by Mehak, an independent web designer and developer.",
};

export const projects: Project[] = [
  {
    slug: "arka-dental",
    title: "Arka Dental",
    category: "Dental clinic website",
    // TODO: confirm this one-line description.
    summary:
      "A calm, mobile-friendly clinic website that puts treatments, timings and appointment enquiries one tap away.",
    role: ["Design", "Development"],
    // TODO: add the stack you used, e.g. technologies: ["Next.js", "Tailwind CSS"],
    // TODO: add the live site to show a "Visit live site" link:
    // liveUrl: "https://…",
    // TODO: add a screenshot to replace the designed cover:
    // cover: { src: "/images/projects/arka-dental/home.webp", alt: "Arka Dental home page" },
    featured: true,
  },

  // Template for the next project — copy it above this line and fill it in.
  // Add `caseStudy` to give a project its own page at /work/<slug>.
  //
  // {
  //   slug: "project-name",
  //   title: "Project Name",
  //   category: "Business website",
  //   summary: "One line on what it is and who it's for.",
  //   technologies: ["Next.js", "Tailwind CSS"],
  //   role: ["Design", "Development"],
  //   year: "2026",
  //   cover: { src: "/images/projects/project-name/home.webp", alt: "Project Name home page" },
  //   coverColor: "#1c4e9c",
  //   liveUrl: "https://…",
  //   featured: true,
  //   caseStudy: {
  //     overview: "Who the client is and what the website needed to do.",
  //     challenge: "The problem, in the client's terms.",
  //     approach: "The key decisions in structure, design and build.",
  //     features: [{ title: "Feature", description: "What it does for visitors." }],
  //     screenshots: [{ src: "/images/projects/project-name/page.webp", alt: "…" }],
  //   },
  // },
];
