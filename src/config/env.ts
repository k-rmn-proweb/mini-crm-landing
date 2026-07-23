import "server-only";

import { z } from "zod";

/**
 * Server-side environment. Importing this module from a Client Component is a
 * build error (`server-only`), so the keys can never leak into the bundle.
 *
 * Parsed lazily rather than at module load: a missing variable should fail the
 * one request that needs it, not the whole prerender of a static page.
 */
const envSchema = z.object({
  SUPABASE_URL: z.url("SUPABASE_URL must be a valid URL"),
  SUPABASE_ANON_KEY: z.string().min(1, "SUPABASE_ANON_KEY is required"),
});

export type Env = z.infer<typeof envSchema>;

export function getEnv(): Env {
  const parsed = envSchema.safeParse({
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
  });

  if (!parsed.success) {
    const missing = Object.keys(z.flattenError(parsed.error).fieldErrors);
    throw new Error(`Invalid server environment: ${missing.join(", ")}`);
  }

  return parsed.data;
}
