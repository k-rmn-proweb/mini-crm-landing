import { z } from "zod";

import { contactContent } from "@/content/contact";

const { errors } = contactContent;

/**
 * Lives apart from the action because a `"use server"` module may only export
 * async functions — the client form imports this to type its own state.
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

/** Raw submitted strings, echoed back so a rejected form keeps its content. */
export type ContactValues = Record<keyof ContactInput, string>;

export const emptyContactValues: ContactValues = {
  name: "",
  email: "",
  message: "",
};

export type ContactFormState =
  | { status: "idle" }
  | { status: "success" }
  | {
      status: "error";
      values: ContactValues;
      /** Absent when the failure was not about the input itself. */
      fieldErrors?: Partial<Record<keyof ContactInput, string[]>>;
      message?: string;
    };

export const initialContactFormState: ContactFormState = { status: "idle" };

/** Hidden field real people never fill in. Bots do. */
export const HONEYPOT_FIELD = "company";
