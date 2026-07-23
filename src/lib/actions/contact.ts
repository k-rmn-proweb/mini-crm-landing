"use server";

import { z } from "zod";

import { contactContent } from "@/content/contact";
import {
  HONEYPOT_FIELD,
  type ContactFormState,
  type ContactValues,
} from "@/lib/contact-form-state";
import { getClientIpHash } from "@/lib/request-identity";
import { contactSchema } from "@/lib/schemas/contact";
import { createSupabaseClient } from "@/lib/supabase";

/** Raised by the submit_lead function when the hourly allowance is used up. */
const RATE_LIMITED = "rate_limited";

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // A filled honeypot means a bot. Report success so it stops retrying — and
  // return before the rate limiter, so bots cannot burn a real visitor's quota.
  if (formData.get(HONEYPOT_FIELD)) {
    return { status: "success" };
  }

  // Echoed back on failure: React clears an uncontrolled form once the action
  // settles, so the values have to survive the round trip.
  const values: ContactValues = {
    name: String(formData.get("name") ?? ""),
    email: String(formData.get("email") ?? ""),
    message: String(formData.get("message") ?? ""),
  };

  const parsed = contactSchema.safeParse(values);

  if (!parsed.success) {
    return {
      status: "error",
      values,
      fieldErrors: z.flattenError(parsed.error).fieldErrors,
    };
  }

  try {
    const supabase = createSupabaseClient();

    // submit_lead counts recent submissions from this sender and inserts in one
    // statement. Doing it through the database rather than here is deliberate:
    // serverless invocations share no memory, so an in-process counter would
    // let concurrent requests straight through.
    const { error } = await supabase.rpc("submit_lead", {
      p_name: parsed.data.name,
      p_email: parsed.data.email,
      p_message: parsed.data.message,
      p_ip_hash: await getClientIpHash(),
    });

    if (error) {
      if (error.message.includes(RATE_LIMITED)) {
        return {
          status: "error",
          values,
          message: contactContent.rateLimited,
        };
      }
      throw error;
    }
  } catch (error) {
    // The visitor gets a generic message; the detail stays in the server log.
    console.error("Failed to store lead:", error);
    return { status: "error", values, message: contactContent.failure };
  }

  return { status: "success" };
}
