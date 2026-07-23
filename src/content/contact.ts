export const contactContent = {
  eyebrow: "Contact",
  title: "Got a project in mind?",
  description:
    "Tell me what you are building. I read every message and usually reply within a day.",

  fields: {
    name: { label: "Name", placeholder: "Ada Lovelace" },
    email: { label: "Email", placeholder: "ada@example.com" },
    message: {
      label: "Message",
      placeholder: "A few lines about the project, timeline and budget.",
    },
  },

  submit: "Send message",
  submitting: "Sending…",

  success: {
    title: "Message sent",
    description: "Thanks — I'll get back to you at the address you gave.",
    reset: "Send another",
  },

  /** Shown when the write itself fails, so the visitor is not left guessing. */
  failure:
    "Something went wrong on our side. Please try again, or reach me through the GitHub link in this section.",

  /** Shown when the sender has already used up their hourly allowance. */
  rateLimited:
    "You have already sent a few messages. Please try again in an hour, or reach me through the GitHub link in this section.",

  /** Validation messages live here too — they are user-facing copy. */
  errors: {
    nameMin: "Please enter your name.",
    nameMax: "That name is too long.",
    email: "Please enter a valid email address.",
    messageMin: "Please write at least a sentence or two.",
    messageMax: "That message is too long — please trim it a little.",
  },
} as const;
