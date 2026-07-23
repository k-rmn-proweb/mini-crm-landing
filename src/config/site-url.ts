/**
 * The absolute origin every canonical, Open Graph and sitemap URL is built
 * from. Getting it wrong is silent — the page still renders, it just points
 * search engines and social cards at the wrong host — so it is resolved rather
 * than hard-coded:
 *
 *  1. `SITE_URL` — set this once a custom domain exists.
 *  2. `VERCEL_PROJECT_PRODUCTION_URL` — the project's stable production
 *     domain, injected by Vercel. Preview deploys therefore still emit
 *     production canonicals instead of advertising their own throwaway host.
 *  3. localhost, for local builds.
 *
 * Every consumer is prerendered, so this is read at **build** time and baked
 * into the output. Setting the variable only at runtime has no effect.
 *
 * Kept out of `site.ts` on purpose: that module is imported by a Client
 * Component, and this one reads server-only environment variables.
 */
function resolveSiteUrl(): string {
  const explicit = process.env.SITE_URL;
  if (explicit) return explicit.replace(/\/$/, "");

  const vercel = process.env.VERCEL_PROJECT_PRODUCTION_URL;
  if (vercel) return `https://${vercel}`;

  return "http://localhost:3000";
}

export const siteUrl = resolveSiteUrl();

/** Host without protocol, for display. */
export const siteHost = new URL(siteUrl).host;
