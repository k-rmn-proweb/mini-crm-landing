# Architecture

How this project is organized and why. Every file has exactly one obvious home;
if a new file does not fit a folder below, the folder list is wrong — fix it
here first.

## Folder map

```
src/
├── app/                    # Routing only. Next.js file conventions live here.
│   ├── layout.tsx          # Root layout: html/body, providers, fonts
│   ├── page.tsx            # Home — composes sections, holds no markup of its own
│   ├── globals.css         # Design tokens (@theme) + base layer. Only CSS file.
│   ├── icon.svg            # Favicon (Next metadata convention)
│   ├── opengraph-image.tsx # Generated OG image
│   ├── robots.ts           # robots.txt
│   ├── sitemap.ts          # sitemap.xml
│   └── thanks/page.tsx     # Post-submit page
│
├── components/
│   ├── ui/                 # Design-system primitives. Know nothing about this site.
│   ├── layout/             # Site chrome: header, footer, theme toggle/provider
│   └── sections/           # One file per landing section, in page order
│
├── content/                # All user-facing copy, as typed const objects
├── config/                 # Identity, external links, section anchors, env
├── lib/                    # Framework-adjacent logic: utils, schemas, actions, clients
├── hooks/                  # Shared client hooks (created when a second consumer appears)
└── types/                  # Cross-cutting types (created only when actually shared)

public/
└── images/                 # Screenshots and static imagery
```

## The rules

**1. `app/` is routing, not UI.**
Route files stay thin. `page.tsx` imports sections and renders them in order —
reading it should read like the page outline. Anything with real markup lives in
`components/`.

**2. Copy is data, not markup.**
Every user-facing string lives in `src/content/<section>.ts` as a typed `const`.
Section components receive it by import and are pure layout. One question —
"where is this text?" — has exactly one answer, and rewording never touches JSX.

**3. `config/` vs `content/`.**
`config/` holds structural values (URLs, anchor ids, env). `content/` holds prose.
A link's `href` is config, its label is content.

**4. Three kinds of component, three folders.**

| Folder      | Knows about the product? | Example                                        |
| ----------- | ------------------------ | ---------------------------------------------- |
| `ui/`       | No — reusable anywhere   | `button.tsx`, `container.tsx`, `reveal.tsx`    |
| `layout/`   | Site chrome, all pages   | `header.tsx`, `footer.tsx`, `theme-toggle.tsx` |
| `sections/` | Yes — one landing block  | `hero.tsx`, `features.tsx`, `contact.tsx`      |

`ui/` is also where `shadcn/ui` drops its components, so the boundary stays
intact when we add one.

A section that grows a supporting part keeps it next to the section, named
after it — `sections/hero.tsx` + `sections/hero-visual.tsx`. The prefix keeps
the folder sorted by section rather than by component, so everything belonging
to one band of the page stays adjacent.

**5. Dependencies point one way.**

```
app  ->  components/sections  ->  components/ui
          |          |               ^
          v          v               |
       content     lib  ------------ config
```

`ui/` never imports from `sections/` or `content/`. `lib/` and `config/` never
import from `components/`. A cycle means something is in the wrong folder.

**6. Server by default.**
Components are Server Components unless they need state, effects, browser APIs
or animation. `"use client"` goes as deep in the tree as possible — on the
interactive leaf, never on a whole section. Server Actions are the only way the
client talks to the backend; no API routes for form handling.

**7. Server Actions and their schemas are separate files.**
A `"use server"` module may only export async functions, so Zod schemas cannot
live next to the action that uses them:

- `lib/schemas/contact.ts` — schema + inferred types (importable from client)
- `lib/actions/contact.ts` — `"use server"`, imports the schema

**8. Naming.**
Files and folders `kebab-case`. Components `PascalCase`. Hooks `useCamelCase`.
Named exports everywhere, except `app/` route files, which Next requires to be
default exports.

**9. No barrel files.**
No `index.ts` re-exports. Imports name the real file, so any symbol is one
click from its definition and nothing is pulled into a bundle by accident.

**10. One stylesheet.**
Tailwind v4 keeps its tokens in CSS. All of them — colors, fonts, spacing,
easing — are declared in `app/globals.css` under `@theme`. No component-level
`.css` files, no inline hex values in JSX: if a value is worth reusing, it is a
token.

## Import order

Enforced automatically by Prettier (`@ianvs/prettier-plugin-sort-imports`), in
the same direction as rule 5:

```
react / next  ->  third party  ->  config  ->  content  ->  lib  ->  hooks
              ->  components/ui  ->  components  ->  relative  ->  css
```

Run `npm run format`; never hand-sort imports.

## Quality gate

`npm run check` = `typecheck` + `lint` + `format:check`. It must pass, along
with `npm run build`, before every commit.
