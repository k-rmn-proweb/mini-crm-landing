import "server-only";

import { createHash } from "node:crypto";
import { headers } from "next/headers";

/**
 * A stable, non-reversible identifier for the sender, used only to group
 * submissions for rate limiting.
 *
 * The raw address never leaves this module: what reaches the database is a
 * salted SHA-256 hash. Without the salt an IPv4 hash is trivially reversible —
 * the whole address space fits in a few minutes of brute force — so
 * RATE_LIMIT_SALT should be set in any deployment that stores real traffic.
 */
export async function getClientIpHash(): Promise<string> {
  const headerList = await headers();

  // x-forwarded-for may carry a proxy chain; the first entry is the client.
  const forwarded = headerList.get("x-forwarded-for")?.split(",")[0]?.trim();
  const ip = forwarded || headerList.get("x-real-ip")?.trim();

  // Fail closed: an unidentifiable caller shares one bucket rather than
  // slipping past the limit entirely.
  const subject = ip || "unknown";
  const salt = process.env.RATE_LIMIT_SALT ?? "";

  return createHash("sha256").update(`${salt}:${subject}`).digest("hex");
}
