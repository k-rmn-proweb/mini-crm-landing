import { sectionIds, siteConfig } from "@/config/site";

export const footerContent = {
  tagline: "A lightweight CRM for clients, deals and analytics.",
  builtWith: "Built with Next.js, Tailwind CSS and Supabase.",
  groups: [
    {
      title: "Product",
      links: [
        { label: "Features", href: `#${sectionIds.features}` },
        { label: "How it works", href: `#${sectionIds.howItWorks}` },
        { label: "Tech", href: `#${sectionIds.tech}` },
      ],
    },
    {
      title: "Links",
      links: [
        { label: "Live demo", href: siteConfig.links.demo, external: true },
        { label: "GitHub", href: siteConfig.links.github, external: true },
        { label: "Contact", href: `#${sectionIds.contact}` },
      ],
    },
  ],
  copyright: (year: number) =>
    `© ${year} ${siteConfig.name}. All rights reserved.`,
} as const;
