import { sectionIds } from "@/config/site";

/** Header navigation. Labels are copy, hrefs come from the section anchors. */
export const navContent = [
  { label: "Features", href: `#${sectionIds.features}` },
  { label: "How it works", href: `#${sectionIds.howItWorks}` },
  { label: "Tech", href: `#${sectionIds.tech}` },
] as const;

/** Call-to-action labels, shared by the header, hero and CTA band. */
export const actionsContent = {
  demo: "Try demo",
  github: "View on GitHub",
} as const;
