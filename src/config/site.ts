/**
 * Identity, external links and section anchors for the whole site.
 * Structural values live here; user-facing copy lives in `@/content`.
 */
export const siteConfig = {
  name: "Mini-CRM",
  url: "https://mini-crm-landing.vercel.app",
  links: {
    demo: "https://mini-crm-supabase-silk.vercel.app/",
    github: "https://github.com/k-rmn-proweb/mini-crm-supabase",
  },
} as const;

/** Section ids, used both as anchor targets and as header nav hrefs. */
export const sectionIds = {
  features: "features",
  howItWorks: "how-it-works",
  tech: "tech",
  contact: "contact",
} as const;

export type SiteConfig = typeof siteConfig;
export type SectionId = (typeof sectionIds)[keyof typeof sectionIds];
