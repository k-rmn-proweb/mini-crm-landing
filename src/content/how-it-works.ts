export const howItWorksContent = {
  eyebrow: "How it works",
  title: "Three screens, one loop",
  description:
    "Add a client, move their deal along the pipeline, read the result on the dashboard. That is the whole product.",

  /** `id` selects the illustration in the section; the copy stays here. */
  steps: [
    {
      id: "clients",
      step: "01",
      title: "Add your clients",
      description:
        "Create a client, set their status, and find them again with server-side search and filters that keep working as the list grows.",
    },
    {
      id: "deals",
      step: "02",
      title: "Move deals through the pipeline",
      description:
        "Drag a deal from new to negotiation to won. Edits open in a side drawer and auto-save as you type — no Save button to remember.",
    },
    {
      id: "analytics",
      step: "03",
      title: "Read the numbers",
      description:
        "The dashboard recalculates as deals move: revenue, deals by stage and the new-clients trend, live across every open tab.",
    },
  ],

  /** The few readable labels inside the step illustrations. */
  visuals: {
    clientStatuses: ["Active", "Lead", "Active"],
    dealStages: ["New", "Negotiation"],
    metricLabel: "Revenue",
    metricValue: "$31,200",
  },
} as const;
