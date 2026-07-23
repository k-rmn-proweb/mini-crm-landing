"use server";

import { z } from "zod";

import { contactContent } from "@/content/contact";
import {
  contactSchema,
  HONEYPOT_FIELD,
  type ContactFormState,
  type ContactValues,
} from "@/lib/schemas/contact";
import { createSupabaseClient } from "@/lib/supabase";

export async function submitContact(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // A filled honeypot means a bot. Report success so it stops retrying.
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

    // No `.select()`: the anon role may insert a lead but never read one back.
    const { error } = await supabase.from("leads").insert(parsed.data);

    if (error) throw error;
  } catch (error) {
    // The visitor gets a generic message; the detail stays in the server log.
    console.error("Failed to store lead:", error);
    return { status: "error", values, message: contactContent.failure };
  }

  return { status: "success" };
}
