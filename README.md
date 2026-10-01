# Mehak — Web Design & Development

Portfolio and sales website for an independent web design and development service.
Built with **Next.js 16** (App Router), **TypeScript** and **Tailwind CSS 4**. Every page is
statically generated. Client-side JavaScript is kept to the navigation (mobile menu and
current-page highlight), the contact form and a small helper that moves keyboard focus to
in-page links such as "About".

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

Fields marked `TODO` in `src/content/` need your real details. Contact details and profiles left
empty (`""`) are simply hidden, so the site never shows placeholder information.

- [ ] **Site URL** — set `NEXT_PUBLIC_SITE_URL` in your hosting environment (e.g. `https://mehak.dev`).
      It's used for canonical URLs, the sitemap and social previews. Until it's set, the build
      prints a warning and every page asks search engines not to index the site. Indexing
      switches on by itself once you set it and rebuild.
- [ ] **Contact details** — `email` and the `whatsapp` number in `src/content/site.ts`. Set at
      least one: the build warns until you do, and the contact form only appears once there's
      somewhere to send it. While developing, a dashed note marks where they'll appear.
- [ ] **Profiles** — `socials` in `src/content/site.ts` (LinkedIn is waiting for its link;
      GitHub is set).
- [ ] **Projects** — confirm Arka Dental's details and add your other projects and screenshots in
      `src/content/projects.ts` (see [Adding or updating a project](#adding-or-updating-a-project)).
- [ ] **Services** — review the services, inclusions and timelines in `src/content/services.ts`.
- [ ] **FAQ** — make sure every answer in `src/content/faq.ts` matches how you work
      (the first answer repeats the service timelines).
- [ ] **Availability and reply time** — `availability` and `responseTime` in `src/content/site.ts`.
- [ ] **Portrait** (optional) — see [Adding a portrait](#adding-a-portrait).
- [ ] Check the social preview image at `/opengraph-image` after deploying.

---

## Editing content

All page copy lives in **`src/content/`**. A few small interface texts (form labels and
messages, and the 404 and error pages) are written in their components.

| To change…                                                                 | Edit                        |
| -------------------------------------------------------------------------- | --------------------------- |
| Name, tagline, SEO description, contact details, social links, navigation  | `src/content/site.ts`       |
| Header button ("Let's talk"), availability note, footer line               | `src/content/site.ts`       |
| Home page: hero, section headings, "Why work with me", about               | `src/content/home.ts`       |
| Closing "Have a project in mind?" section (every page except Contact)      | `src/content/home.ts` (`contactSection`) |
| Services (home list, services page, contact form options)                  | `src/content/services.ts`   |
| Projects (home, work page, case studies)                                   | `src/content/projects.ts`   |
| The four-step process                                                      | `src/content/process.ts`    |
| Frequently asked questions                                                 | `src/content/faq.ts`        |
| Contact page text and form                                                 | `src/content/contact.ts`    |
| Colours, type scale, shadows (see the note below)                          | `src/app/globals.css`       |
| Fonts (see the note below)                                                 | `src/lib/fonts.ts`          |

The shapes of all content are defined in `src/content/types.ts`. Your editor will
autocomplete fields and flag anything missing.

**Changing the brand colours or fonts:** a few places can't read `globals.css`, so they keep
their own copy. Update colours in `src/app/globals.css`, `src/lib/brand.ts` (share images, app
icon, browser theme colour) and `src/app/icon.svg` (the site icon — replace `favicon.ico` beside
it too) together. Fonts are loaded in
`src/lib/fonts.ts`, with the font stacks in `globals.css`; the share images use their own font
files in `src/assets/fonts/`.

### Home page structure

The home page answers a visitor's questions in order: **hero** (what do you do?) → **01 Selected
work** (can you do it?) → **02 Services** (what can you build?) → **03 Why work with me** →
**04 Process** (how does it work?) → **05 About** (who are you?) → **06 FAQ** → **07 Contact**
(how do I start?). The order, background tones and numbers are set in `src/app/page.tsx`.

Primary buttons are kept for the main conversion points (hero and contact). Elsewhere, smaller
links lead to the same place, so the next step is always obvious without the page feeling pushy.

### Design system

- **Colours** (`src/app/globals.css`): `canvas` page background, `surface` cards, `subtle` alternate
  sections, `ink` headings, `accent` brand blue (buttons, links, focus), `cyan` decorative accent
  (never for text), `accent-soft` tinted pills and tiles, `night` dark sections. Roughly 80%
  neutrals, 15% blue/cyan, 5% decoration.
- **Type**: Plus Jakarta Sans for headings, Inter for text. Sizes are fluid tokens: `text-display`
  (hero), `text-h1`, `text-h2`, `text-h3`, `text-lead`, `text-eyebrow`.
- **Sections**: `<Section tone="default" | "subtle" | "dark">` sets the background, and
  `<SectionHeader number="01">` adds the numbered label. The home page's order, tones and numbers
  are set in `src/app/page.tsx`.
- **Decoration**: `<GridPattern>`, `<DotPattern>` and `<Glow>` in `src/components/ui/decor.tsx`
  (fine grid, dots and soft colour glows). Utilities: `bg-grid`, `bg-dots`, `text-gradient`,
  `theme-dark`. Use them sparingly.
- **Hero**: the phrase in `titleHighlight` (`src/content/home.ts`) is shown in the blue gradient.
  The showcase uses your first featured project and shows its cover once you add a screenshot.
- **Header**: transparent over the top of the page, then a solid bar once you scroll (pure CSS,
  `.site-header` in `globals.css`).

**Page titles** follow the pattern `Services | Mehak — Web Design & Development`: each page's
own title, then `title` from `src/content/site.ts`. The home page uses that `title` on its own.

### Switches

Small settings that show or hide parts of the site:

- `form.enabled` in `src/content/contact.ts` — set to `false` to hide the contact form and keep
  just the WhatsApp and email options.
- `availability.show` in `src/content/site.ts` — set to `false` to hide the "Available for new
  projects" note when you're fully booked.
- Contact details and profiles in `src/content/site.ts` — leave any empty (`""`) to hide it
  everywhere (header menu, contact section, contact page, footer).
- `pricing` on a service — prices stay hidden until you add them (see [Adding prices](#adding-prices)).

### Adding or updating a project

1. Add an entry to the `projects` array in `src/content/projects.ts`. There's a commented
   template at the bottom of the file to copy.
2. Give it a unique `slug` — this becomes the page address, e.g. `/work/arka-dental`.
3. Fill in the card details: `title`, `category` and a one-line `summary`. `technologies`,
   `role` and `year` are optional and appear when set.
4. `liveUrl` adds a "Visit live site" link (and shows the address in the browser frame).
5. `caseStudy` (overview, challenge, approach, features, screenshots) gives the project its own
   page at `/work/<slug>`, adds it to the sitemap and makes its card link there. Without it, the
   card links to the live site instead — or, with neither, is shown without a link.
6. Without a `cover` screenshot, a designed cover with the project's name and category is shown.
   Set `coverColor` (e.g. the client's brand colour) to tint it.
7. Projects are numbered 01, 02… in file order. Set `featured: true` to choose which appear on
   the home page (if none is featured, the first three appear). "View all work" appears on the
   home page once there are more projects than featured ones.

Only describe work and outcomes you can stand behind. Don't add invented metrics or testimonials.

### Adding screenshots

1. Save images in `public/images/projects/<slug>/`. WebP or AVIF, about 2000px wide, works best.
   Images are shown in a 16:10 frame, aligned to the top, so full-page captures crop neatly.
2. Point to them from the project, and describe what each one shows:

   ```ts
   cover: { src: "/images/projects/arka-dental/home.webp", alt: "Arka Dental home page on desktop" },
   caseStudy: {
     // …
     screenshots: [
       {
         src: "/images/projects/arka-dental/treatments.webp",
         alt: "Arka Dental treatments page",
         caption: "Each treatment has its own page.", // optional
       },
       {
         src: "/images/projects/arka-dental/phone.webp",
         alt: "Arka Dental website on a phone",
         device: "mobile",
       },
     ],
   },
   ```

3. Phone screenshots: add `device: "mobile"` (a portrait capture, about 1170px wide). They're shown
   whole inside a phone outline instead of being cropped.
4. Until a project has a `cover`, its designed cover is shown instead.

Next.js automatically resizes images and serves modern formats, so upload one good-quality file.

### Adding or changing a service

Edit the `services` array in `src/content/services.ts`. Each service feeds its row on the home
page, its section on `/services` and the "What do you need?" options in the contact form.
Each one answers three client questions: what it is (`summary`), who it's for (`bestFor`, and
the longer `audience` list) and what problem it solves (`problem`). `deliverables` are the short
chips (e.g. "Custom UI"); `standardDeliverables` lists the ones every project gets.
`addOns`, `timeline` and `pricing` are optional. Leave them out and they disappear from the page.
If you change a timeline, update the first answer in `src/content/faq.ts` too.

The "Discuss your project" button links to `/contact?service=<slug>`, which pre-selects that
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

### Adding a page

1. Create `src/app/<name>/page.tsx` (copying `src/app/work/page.tsx` is a good start) and give it
   a `title` and `description` in its `metadata`.
2. Add it to `nav` in `src/content/site.ts` if it should appear in the menu.
3. Add its path to the list in `src/app/sitemap.ts`.

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
social preview images for the site and for each project. While the site URL is still the
placeholder, every page asks search engines not to index it.

**Accessibility:** semantic landmarks and headings, a skip link, visible keyboard focus, and a
native `<dialog>` mobile menu that traps focus and closes with Escape. In-page links such as
"About" move keyboard focus to that section. The FAQ uses native `<details>`, and all colour
pairs meet WCAG AA contrast. Motion is subtle and switches off for anyone who prefers reduced
motion.

**Performance:** pages are prerendered, fonts are self-hosted through `next/font`, images go
through `next/image`, and scroll animations are pure CSS with no animation library.

### Project structure

```
src/
  app/                  Routes, layout, metadata files (sitemap, robots, OG images, icons)
  assets/fonts/         Fonts for the social preview images
  components/
    layout/             Header, mobile menu, footer, in-page link focus helper
    sections/           Home page sections (hero, services, work, process, FAQ…)
    services/           Services page building blocks
    projects/           Project cards, images and project page sections
    contact/            Contact options and form
    ui/                 Small reusable pieces (buttons, sections, tags, icons…)
    seo/                Structured data
  content/              ← All editable text and data
  lib/                  Small helpers (links, projects, text, fonts, brand colours, class names)
public/                 Static files (put project screenshots in public/images/)
```

---

## Deployment

**Vercel (simplest):** import the repository, add the `NEXT_PUBLIC_SITE_URL` environment
variable and deploy.

**Anywhere else with Node.js:** run `npm run build`, then `npm start`. The site runs on port
3000 by default.

The environment variable is read at build time, so rebuild after changing it.
