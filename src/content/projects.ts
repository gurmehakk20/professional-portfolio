import type { PageIntro, Project } from "./types";

/*
 * Projects — used on the home page ("Selected work"), the /work page and,
 * for projects with a `caseStudy`, their own page at /work/[slug].
 * They're numbered 01, 02… in the order listed here.
 *
 * Only describe work you can stand behind — never add invented results,
 * metrics or testimonials.
 *
 * Images (in /public/images/projects/<slug>/):
 *   - `cover`: the desktop home page, 16:10 (e.g. a 1440×900 capture at 1.5× = 2160×1350), WebP.
 *   - `mobileCover`: the same page on a phone, portrait (e.g. 390×844 at 2× = 780×1688), WebP.
 * Without a cover, a designed cover with the project's name and category is shown.
 *
 * `embed: true` shows the live site in the preview on desktop — only for sites
 * that allow embedding (Libra doesn't: it sends X-Frame-Options: DENY).
 */

export const workPage: PageIntro = {
  eyebrow: "Work",
  title: "Selected work",
  description:
    "Websites and web apps I've designed and built — each one opens live in a new tab.",
  metaDescription:
    "Selected website design and development projects by Gurmehak: clinic and healthcare websites, a library management system and an online flower shop.",
};

export const projects: Project[] = [
  {
    slug: "arka-dental",
    title: "Arka Dental",
    category: "Dental clinic website",
    summary:
      "A conversion-focused dental clinic website designed to make treatments, doctors, fees, location and appointment enquiries easy to find.",
    tags: ["UI/UX", "Web design", "Development", "Next.js", "Responsive design"],
    liveUrl: "https://arkadental.vercel.app/",
    cover: {
      src: "/images/projects/arka-dental/desktop.webp",
      alt: "Arka Dental home page: “Careful dentistry, clearly explained.” with a Book an appointment button",
    },
    mobileCover: {
      src: "/images/projects/arka-dental/mobile.webp",
      alt: "Arka Dental home page on a phone, with call, WhatsApp and booking buttons along the bottom",
    },
    embed: true,
    featured: true,
  },
  {
    slug: "aarogya-care",
    title: "Aarogya Care",
    category: "Healthcare website",
    summary:
      "A modern healthcare website focused on clear service discovery, trust, accessibility and a simple patient-facing experience.",
    tags: ["UI/UX", "Healthcare", "Web design", "Responsive design"],
    liveUrl: "https://aarogya-care-gamma.vercel.app/",
    cover: {
      src: "/images/projects/aarogya-care/desktop.webp",
      alt: "Aarogya Care home page: “Quality healthcare, booked in seconds” with a search by speciality, location and date",
    },
    mobileCover: {
      src: "/images/projects/aarogya-care/mobile.webp",
      alt: "Aarogya Care home page on a phone, with the doctor search stacked in one column",
    },
    embed: true,
    featured: true,
  },
  {
    slug: "libra",
    title: "Libra",
    category: "Library management system",
    summary:
      "A library management platform with separate experiences for students and librarians, covering catalog discovery, reservations, loans and library administration.",
    tags: ["Product UI", "React", "Web app", "Dashboard", "UX"],
    liveUrl: "https://libra-virid.vercel.app/",
    cover: {
      src: "/images/projects/libra/desktop.webp",
      alt: "Libra start page: “The library, in one place.” with a student portal and a librarian console to choose from",
    },
    mobileCover: {
      src: "/images/projects/libra/mobile.webp",
      alt: "Libra start page on a phone, with the student and librarian options stacked",
    },
    featured: true,
  },
  {
    slug: "floralia",
    title: "Floralia",
    category: "E-commerce / business website",
    summary:
      "A flower shop website designed around product discovery, presentation and easy browsing.",
    tags: ["UI/UX", "Frontend", "E-commerce", "Responsive design"],
    liveUrl: "https://floralia.vercel.app/",
    cover: {
      src: "/images/projects/floralia/desktop-v2.webp",
      alt: "Floralia home page: “Flowers that say what words can’t.” beside a bouquet of pink tulips, with an Explore flowers button and occasions to shop by",
    },
    mobileCover: {
      src: "/images/projects/floralia/mobile-v2.webp",
      alt: "Floralia home page on a phone, with the headline and Explore flowers button above the tulip photo",
    },
    embed: true,
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
  //   tags: ["UI/UX", "Web design", "Next.js"],
  //   liveUrl: "https://…",
  //   cover: { src: "/images/projects/project-name/desktop.webp", alt: "Project Name home page" },
  //   mobileCover: { src: "/images/projects/project-name/mobile.webp", alt: "Project Name on a phone" },
  //   embed: true, // only if the site allows being embedded
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
