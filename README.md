# Mini-CRM — landing page

The marketing site for [Mini-CRM](https://github.com/k-rmn-proweb/mini-crm-supabase),
a small production-grade CRM. Built to be fast, accessible and search-friendly
rather than merely pretty.

**🔗 Live site: _to be filled in after the first deploy_**
· **Product demo: [mini-crm-supabase-silk.vercel.app](https://mini-crm-supabase-silk.vercel.app/)**

Lighthouse on the production build: **97 performance · 100 accessibility ·
100 best practices · 100 SEO**, with a cumulative layout shift of 0.

---

## What is interesting here

- **Fully static.** Every route — page, OG image, sitemap, robots — is
  prerendered at build time. The only server work happens when someone submits
  the contact form.
- **The product shot is markup, not a screenshot.** The deal board in the hero
  is built from real DOM, so it stays sharp at any pixel density, follows the
  active theme and costs no image bytes. Its pipeline stages mirror the real
  app: `new → negotiation → won/lost`.
- **Security lives in the database.** The contact form writes through a Server
  Action using Supabase's public anon key. The `leads` table grants that role
  `INSERT` and nothing else — no select, update or delete policy exists — so a
  leaked key cannot read anyone's messages.
- **Copy is data.** Every user-facing string lives in `src/content`, which
  keeps section components down to layout and makes rewording a one-file
  change.
- **Contrast is derived, not guessed.** The quiet text tones are set at
  lightness values computed to clear WCAG AA on every background they appear
  on.
- **Motion is optional.** Scroll reveals animate only opacity and transform,
  skip entirely under `prefers-reduced-motion`, and a `noscript` rule reveals
  everything when scripting is off.

## Stack

| Area       | Choice                                                       |
| ---------- | ------------------------------------------------------------ |
| Framework  | **Next.js 16** (App Router, React Server Components)         |
| Language   | **TypeScript**, strict                                       |
| Styling    | **Tailwind CSS v4** — design tokens in CSS, oklch throughout |
| Animation  | **Motion**, loaded through `LazyMotion` in strict mode       |
| Forms      | **Server Actions** + **Zod**                                 |
| Storage    | **Supabase** (Postgres + Row-Level Security)                 |
| Icons      | **lucide-react**                                             |
| Quality    | **ESLint** + **Prettier** with import sorting                |
| Deployment | **Vercel**                                                   |

## Getting started

```bash
npm install
cp .env.example .env.local   # fill in the Supabase values
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

The site renders without any environment variables — only the contact form
needs them. To make it work, run [`supabase/leads.sql`](./supabase/leads.sql)
in your Supabase project's SQL editor and fill in `.env.local`.

### Environment

| Variable            | Required | Purpose                                                      |
| ------------------- | -------- | ------------------------------------------------------------ |
| `SUPABASE_URL`      | for form | Supabase project URL                                         |
| `SUPABASE_ANON_KEY` | for form | Public anon key; the table's RLS policy limits it to inserts |
| `SITE_URL`          | no       | Canonical origin. Falls back to the Vercel production domain |

None are prefixed with `NEXT_PUBLIC_`, so none reach the browser.

## Scripts

| Command             | Purpose                                    |
| ------------------- | ------------------------------------------ |
| `npm run dev`       | Development server                         |
| `npm run build`     | Production build                           |
| `npm run start`     | Serve the production build                 |
| `npm run typecheck` | `tsc --noEmit`                             |
| `npm run lint`      | ESLint                                     |
| `npm run format`    | Prettier, including import order           |
| `npm run check`     | typecheck + lint + format check, in one go |

## Project structure

`src/app` is routing only; everything with markup lives in `src/components`,
split into design-system primitives, site chrome and page sections. Copy sits
in `src/content`, structural values in `src/config`, and server logic in
`src/lib`.

[ARCHITECTURE.md](./ARCHITECTURE.md) documents the folder map, the layer
boundaries and the conventions that keep them intact.

## Deployment

Deployed on Vercel as its own project, separate from the CRM app. Set
`SUPABASE_URL` and `SUPABASE_ANON_KEY` in the project's environment variables;
`SITE_URL` only becomes necessary once a custom domain replaces the
`.vercel.app` one.

Note that the site is prerendered, so `SITE_URL` is read while building and
baked into the canonical tag, the Open Graph tags and the sitemap. Changing it
requires a redeploy — setting it at runtime alone does nothing.

## Licence

MIT.
