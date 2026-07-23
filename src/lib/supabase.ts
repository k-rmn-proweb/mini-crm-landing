import "server-only";

import { createClient } from "@supabase/supabase-js";

import { getEnv } from "@/config/env";

/**
 * Supabase client for the landing site. Deliberately the anon key, not the
 * service role key: the `leads` table grants the anon role no policy at all,
 * and its only capability is executing `submit_lead`. This client can append a
 * rate-limited lead and do nothing else — it cannot read one back.
 */
export function createSupabaseClient() {
  const env = getEnv();

  return createClient(env.SUPABASE_URL, env.SUPABASE_ANON_KEY, {
    auth: { persistSession: false },
  });
}
