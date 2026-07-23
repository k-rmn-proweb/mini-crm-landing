<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

# Project conventions

Read [ARCHITECTURE.md](./ARCHITECTURE.md) before creating any file — it defines
where things go, and it is binding.

The short version:

- `app/` is routing only; UI lives in `components/{ui,layout,sections}`.
- Every user-facing string lives in `content/`, never inline in JSX.
- Structural values (links, anchors, env) live in `config/`.
- Server Components by default; `"use client"` on the smallest possible leaf.
- Design tokens only in `app/globals.css` under `@theme` — no hex in JSX.
- `kebab-case` files, named exports, no barrel files.
- All copy, UI text and code comments in English.

`npm run check` and `npm run build` must pass before every commit.
