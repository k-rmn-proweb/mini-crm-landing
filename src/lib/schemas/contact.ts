import { z } from "zod";

import { contactContent } from "@/content/contact";

const { errors } = contactContent;

/**
 * Server-side validation. Lives apart from the action because a `"use server"`
 * module may only export async functions, and apart from the form's state
 * contract (`lib/contact-form-state.ts`) so the browser never downloads Zod.
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, errors.nameMin).max(80, errors.nameMax),
  email: z.email(errors.email).max(160, errors.email),
  message: z
    .string()
    .trim()
    .min(20, errors.messageMin)
    .max(2000, errors.messageMax),
});

export type ContactInput = z.infer<typeof contactSchema>;
