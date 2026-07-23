import { siteConfig } from "@/config/site";
import { siteUrl } from "@/config/site-url";
import { metaContent } from "@/content/meta";

/**
 * JSON-LD describing the site and the product it links to. Search engines use
 * it for rich results; `@graph` lets one script hold several linked entities.
 */
export const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteConfig.name,
      description: metaContent.description,
      inLanguage: "en",
      publisher: { "@id": `${siteUrl}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: siteConfig.author.name,
      url: siteConfig.author.url,
    },
    {
      "@type": "SoftwareApplication",
      name: siteConfig.name,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web",
      url: siteConfig.links.demo,
      description: metaContent.description,
      author: { "@id": `${siteUrl}/#person` },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
} as const;
