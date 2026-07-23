import type { ContactInput } from "@/lib/schemas/contact";

/**
 * The contact form's client-side contract, deliberately free of any Zod import.
 *
 * The form component needs these values at runtime, and anything it imports
 * ships to the browser. Keeping them out of the schema module is what stops
 * the whole validation library from riding along — the type import above is
 * erased at compile time, so it costs nothing.
 */

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
