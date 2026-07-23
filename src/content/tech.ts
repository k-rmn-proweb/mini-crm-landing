export const techContent = {
  eyebrow: "Under the hood",
  title: "Built like a product, not a demo",
  description:
    "The interesting part of a small CRM is not the feature count — it is whether the architecture survives the second year.",

  highlights: [
    {
      id: "boundaries",
      title: "Architecture that cannot rot",
      description:
        "Feature-Sliced Design with layer boundaries enforced by eslint-plugin-boundaries: upward and cross-slice imports fail the build, not the review.",
    },
    {
      id: "server-data",
      title: "The database does the work",
      description:
        "Search, filtering, pagination and exact counts run in Postgres. The browser receives a page of rows, never the table.",
    },
    {
      id: "security",
      title: "Security in the database",
      description:
        "Row-Level Security on every table. The frontend holds only the public anon key; the service role key never reaches the client.",
    },
    {
      id: "optimistic",
      title: "Optimistic, with a way back",
      description:
        "Mutations apply instantly and roll back on failure, with a global MutationCache error toast that individual mutations can opt out of.",
    },
  ],

  stack: [
    { area: "Language", choice: "TypeScript, strict, no any" },
    { area: "UI", choice: "React 19 · Tailwind CSS v4 · shadcn/ui" },
    { area: "Routing", choice: "TanStack Router, type-safe auth guards" },
    { area: "Server state", choice: "TanStack Query, optimistic updates" },
    { area: "Client state", choice: "Zustand, UI concerns only" },
    { area: "Forms", choice: "React Hook Form + Zod" },
    { area: "Backend", choice: "Supabase — Postgres, Auth, RLS, Realtime" },
    { area: "Interaction", choice: "dnd-kit · Recharts · motion" },
  ],

  linkLabel: "Read the architecture on GitHub",
} as const;
