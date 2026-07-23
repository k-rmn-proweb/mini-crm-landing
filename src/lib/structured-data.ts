import { siteConfig } from "@/config/site";
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
      "@id": `${siteConfig.url}/#website`,
      url: siteConfig.url,
      name: siteConfig.name,
      description: metaContent.description,
      inLanguage: "en",
      publisher: { "@id": `${siteConfig.url}/#person` },
    },
    {
      "@type": "Person",
      "@id": `${siteConfig.url}/#person`,
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
      author: { "@id": `${siteConfig.url}/#person` },
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
      },
    },
  ],
} as const;
