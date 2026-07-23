import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getEnv } from "@/config/env";

/**
 * Supabase client for the landing site. Deliberately the anon key, not the
 * service role key: the `leads` table grants anon INSERT and nothing else, so
 * this client can add a lead and can never read one back.
 */
export function createSupabaseClient() {
  const env = getEnv();

  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}
