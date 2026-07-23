export const featuresContent = {
  eyebrow: "Features",
  title: "Everything a one-person sales pipeline needs",
  description:
    "Clients, deals, activities and analytics — the four things a CRM has to get right, and nothing else competing for attention.",

  /** `id` selects the icon in the section; the copy stays here. */
  items: [
    {
      id: "clients",
      title: "Clients that scale",
      description:
        "Full CRUD with search, status filtering and pagination running in Postgres — not in the browser, so the list stays fast past a handful of rows.",
    },
    {
      id: "pipeline",
      title: "Drag-and-drop pipeline",
      description:
        "A Kanban board across new, negotiation, won and lost. Dragging a deal updates the UI immediately and rolls back if the server disagrees.",
    },
    {
      id: "activities",
      title: "Activity timeline",
      description:
        "Calls, emails, meetings and notes land on a chronological timeline on the client's profile, next to their related deals.",
    },
    {
      id: "dashboard",
      title: "Analytics dashboard",
      description:
        "KPI cards and Recharts breakdowns: deals by stage, revenue over time and the new-clients trend.",
    },
    {
      id: "realtime",
      title: "Realtime by default",
      description:
        "Supabase Realtime keeps every session in sync. Open two tabs, change something in one, and the other updates without a refresh.",
    },
    {
      id: "security",
      title: "Row-Level Security",
      description:
        "Every table is RLS-protected, so a user can only ever read their own rows. The client ships the public anon key and nothing more.",
    },
  ],
} as const;
