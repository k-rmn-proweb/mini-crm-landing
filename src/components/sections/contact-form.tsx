"use client";

import { useActionState, useState } from "react";
import { CheckIcon } from "lucide-react";

import { contactContent } from "@/content/contact";
import { submitContact } from "@/lib/actions/contact";
import {
  emptyContactValues,
  HONEYPOT_FIELD,
  initialContactFormState,
} from "@/lib/schemas/contact";
import { Button } from "@/components/ui/button";
import { Field, Input, Textarea } from "@/components/ui/field";

const { fields } = contactContent;

function Fields({ onSent }: { onSent: () => void }) {
  const [state, formAction, isPending] = useActionState(
    submitContact,
    initialContactFormState,
  );

  if (state.status === "success") {
    return (
      <div className="flex flex-col items-start gap-3">
        <span className="flex size-10 items-center justify-center rounded-full bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">
          <CheckIcon className="size-5" aria-hidden />
        </span>
        <h3 className="font-semibold">{contactContent.success.title}</h3>
        <p className="text-sm text-ink-muted">
          {contactContent.success.description}
        </p>
        <Button variant="outline" size="sm" onClick={onSent} className="mt-2">
          {contactContent.success.reset}
        </Button>
      </div>
    );
  }

  const values = state.status === "error" ? state.values : emptyContactValues;
  const fieldErrors = state.status === "error" ? state.fieldErrors : undefined;
  const formError = state.status === "error" ? state.message : undefined;

  return (
    <form action={formAction} className="flex flex-col gap-5" noValidate>
      <Field
        name="name"
        label={fields.name.label}
        error={fieldErrors?.name?.[0]}
      >
        <Input
          id="name"
          name="name"
          autoComplete="name"
          placeholder={fields.name.placeholder}
          defaultValue={values.name}
          aria-invalid={Boolean(fieldErrors?.name)}
          aria-describedby={fieldErrors?.name ? "name-error" : undefined}
        />
      </Field>

      <Field
        name="email"
        label={fields.email.label}
        error={fieldErrors?.email?.[0]}
      >
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={fields.email.placeholder}
          defaultValue={values.email}
          aria-invalid={Boolean(fieldErrors?.email)}
          aria-describedby={fieldErrors?.email ? "email-error" : undefined}
        />
      </Field>

      <Field
        name="message"
        label={fields.message.label}
        error={fieldErrors?.message?.[0]}
      >
        <Textarea
          id="message"
          name="message"
          rows={5}
          placeholder={fields.message.placeholder}
          defaultValue={values.message}
          aria-invalid={Boolean(fieldErrors?.message)}
          aria-describedby={fieldErrors?.message ? "message-error" : undefined}
        />
      </Field>

      {/* Honeypot: off-screen rather than display:none, which some bots skip. */}
      <div aria-hidden className="absolute left-[-9999px]">
        <label htmlFor={HONEYPOT_FIELD}>Company</label>
        <input
          id={HONEYPOT_FIELD}
          name={HONEYPOT_FIELD}
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      {formError ? (
        <p role="alert" className="text-sm text-red-500">
          {formError}
        </p>
      ) : null}

      <Button type="submit" disabled={isPending} className="self-start">
        {isPending ? contactContent.submitting : contactContent.submit}
      </Button>
    </form>
  );
}

/**
 * `useActionState` has no reset, so "send another" remounts the inner form.
 * Keeping the key here is the whole reason for the two-component split.
 */
export function ContactForm() {
  const [formKey, setFormKey] = useState(0);

  return (
    <Fields key={formKey} onSent={() => setFormKey((value) => value + 1)} />
  );
}
