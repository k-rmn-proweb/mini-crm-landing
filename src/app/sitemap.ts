import type { MetadataRoute } from "next";

import { siteConfig } from "@/config/site";

/**
 * One route, so one entry. Section anchors are deliberately absent: they are
 * not separate documents, and listing them would compete with the page itself.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
