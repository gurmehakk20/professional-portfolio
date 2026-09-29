# Mehak — Web Design & Development

Portfolio and sales website for an independent web design and development service.
Built with **Next.js 16** (App Router), **TypeScript** and **Tailwind CSS 4**. Every page is
statically generated, and client-side JavaScript is kept to the mobile menu and the contact form.

---

## Quick start

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev        # http://localhost:3000
```

| Command             | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `npm run dev`       | Start the development server                              |
| `npm run build`     | Production build (also type-checks)                       |
| `npm start`         | Serve the production build                                |
| `npm run lint`      | Run ESLint                                                |
| `npm run typecheck` | Generate route types and run the TypeScript checker       |

---

## Before you launch

Everything marked `PLACEHOLDER` in `src/content/` needs your real details.

- [ ] **Site URL** — set `NEXT_PUBLIC_SITE_URL` in your hosting environment (e.g. `https://mehak.dev`).
      It's used for canonical URLs, the sitemap and social previews.
- [ ] **Contact details** — email, WhatsApp number and location in `src/content/site.ts`.
- [ ] **Social links** — `socials` in `src/content/site.ts` (remove any you don't use).
- [ ] **Projects** — replace the placeholder projects in `src/content/projects.ts` and add screenshots.
- [ ] **Services** — review the services, inclusions and timelines in `src/content/services.ts`.
- [ ] **FAQ** — make sure every answer in `src/content/faq.ts` matches how you work.
- [ ] **Availability and reply time** — `availability` and `responseTime` in `src/content/site.ts`.
- [ ] **Portrait** (optional) — see [Adding a portrait](#adding-a-portrait).
- [ ] Check the social preview image at `/opengraph-image` after deploying.

---

## Editing content

All text, links and data live in **`src/content/`**. You shouldn't need to touch the
components to change what the site says.

| To change…                                                                 | Edit                        |
| -------------------------------------------------------------------------- | --------------------------- |
| Name, tagline, SEO description, contact details, social links, navigation  | `src/content/site.ts`       |
| Header button ("Let's Talk"), availability note                            | `src/content/site.ts`       |
| Home page: hero, value strip, section headings, principles, about, closing | `src/content/home.ts`       |
| Services (home cards, services page, contact form options)                 | `src/content/services.ts`   |
| Projects (home, work page, project pages)                                  | `src/content/projects.ts`   |
| The four-step process                                                      | `src/content/process.ts`    |
| Frequently asked questions                                                 | `src/content/faq.ts`        |
| Contact page text and form                                                 | `src/content/contact.ts`    |
| Colours, type scale, shadows                                               | `src/app/globals.css`       |
| Fonts                                                                      | `src/app/layout.tsx`        |

The shapes of all content are defined in `src/content/types.ts`. Your editor will
autocomplete fields and flag anything missing.

### Adding or updating a project

1. Add an entry to the `projects` array in `src/content/projects.ts` (copy an existing one).
2. Give it a unique `slug` — this becomes the page address, e.g. `/work/arka-dental`.
3. Fill in the card details (`title`, `category`, `summary`, `services`, `tags`) and the
   project page details under `detail`.
4. Set `featured: true` to show it on the home page. The order in the file is the order on the site.
5. Remove `placeholder: true` once the content is real. Placeholder projects are labelled on the site.

Only describe work and outcomes you can stand behind. Don't add invented metrics or testimonials.

### Adding screenshots

1. Save images in `public/images/projects/<slug>/`. WebP or AVIF, about 2000px wide, works best.
   Images are shown in a 16:10 frame, aligned to the top, so full-page captures crop neatly.
2. Point to them from the project, and describe what each one shows:

   ```ts
   cover: { src: "/images/projects/arka-dental/home.webp", alt: "Arka Dental home page on desktop" },
   ```

3. Any image without a `src` shows a neutral placeholder preview instead.

Next.js automatically resizes images and serves modern formats, so upload one good-quality file.

### Adding or changing a service

Edit the `services` array in `src/content/services.ts`. Each service feeds the home page card,
its section on `/services` and the "What do you need?" options in the contact form.
`addOns`, `timeline` and `pricing` are optional. Leave them out and they disappear from the page.

The "Discuss Your Project" button links to `/contact?service=<slug>`, which pre-selects that
service in the contact form.

### Adding prices

Pricing is hidden until you add it. Uncomment or add `pricing` on a service:

```ts
pricing: { label: "From ₹25,000", note: "Final quote depends on scope." },
```

### Adding a portrait

Put the photo in `public/images/about/`, then set `image` in the `about` section of
`src/content/home.ts`:

```ts
image: { src: "/images/about/portrait.jpg", alt: "Portrait of Mehak" },
```

### Changing the icons

Icons are referenced by name, e.g. `icon: "stethoscope"`. The available names are listed in
`src/components/ui/icon.tsx`, where you can also add new ones.

---

## How it works

**Pages:** `/` (home), `/work`, `/work/[slug]` (one page per project), `/services`, `/contact`,
plus a custom 404 page.

**Contact form:** there's no server or database. The form writes a message from the visitor's
details and opens WhatsApp, or their email app, with it ready to send. Nothing is stored.
To receive form submissions directly later, you could send them to a service such as Formspree
or Resend from a Next.js Server Action.

**SEO:** each page has its own title, description and canonical URL. Also generated:
`/sitemap.xml`, `/robots.txt`, a web manifest, favicons, structured data (JSON-LD), and
social preview images for the site and for each project.

**Accessibility:** semantic landmarks and headings, a skip link, visible keyboard focus, and a
native `<dialog>` mobile menu that traps focus and closes with Escape. The FAQ uses native
`<details>`, and all colour pairs meet WCAG AA contrast. Motion is subtle and switches off for
anyone who prefers reduced motion.

**Performance:** pages are prerendered, fonts are self-hosted through `next/font`, images go
through `next/image`, and scroll animations are pure CSS with no animation library.

### Project structure

```
src/
  app/                  Routes, layout, metadata files (sitemap, robots, OG images, icons)
  components/
    layout/             Header, mobile menu, footer
    sections/           Home page sections (hero, services, work, process, FAQ…)
    services/           Services page building blocks
    projects/           Project cards, images and project page sections
    contact/            Contact options and form
    ui/                 Small reusable pieces (buttons, sections, tags, icons…)
    seo/                Structured data
  content/              ← All editable text and data
  lib/                  Small helpers (links, projects, class names)
public/                 Static files (put project screenshots in public/images/)
```

---

## Deployment

**Vercel (simplest):** import the repository, add the `NEXT_PUBLIC_SITE_URL` environment
variable and deploy.

**Anywhere else with Node.js:** run `npm run build`, then `npm start`. The site runs on port
3000 by default.

The environment variable is read at build time, so rebuild after changing it.
