/** Single source of truth for site-wide copy and external links. */
export const siteConfig = {
  name: "Mini-CRM",
  title: "Mini-CRM — a small CRM that feels fast",
  description:
    "Clients, deals and analytics in one lightweight CRM. Built with Next.js, React and Supabase.",
  url: "https://mini-crm-landing.vercel.app",
  links: {
    demo: "https://mini-crm-supabase-silk.vercel.app/",
    github: "https://github.com/k-rmn-proweb/mini-crm-supabase",
  },
} as const;

export type SiteConfig = typeof siteConfig;
