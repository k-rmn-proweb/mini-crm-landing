/** Copy used by the metadata API: browser tab, search results, social cards. */
export const metaContent = {
  title: "Mini-CRM — a small CRM that feels fast",
  titleTemplate: "%s — Mini-CRM",
  // Describes the product, which is a Vite/React app — Next.js is this site,
  // not the CRM. Getting that backwards is the first thing a reader would spot.
  description:
    "Clients, deals and analytics in one lightweight CRM. Built with React, TanStack Query and Supabase.",

  /** Search keywords, ordered from most to least specific. */
  keywords: [
    "Mini-CRM",
    "open source CRM",
    "sales pipeline",
    "kanban deal board",
    "React CRM",
    "Supabase",
    "Next.js",
  ],

  /** Rendered into the generated Open Graph card. */
  og: {
    eyebrow: "Open source CRM",
    headline: "Clients, deals and analytics on one screen",
    footer: "React · Supabase · Realtime",
    alt: "Mini-CRM — clients, deals and analytics on one screen",
  },
} as const;
