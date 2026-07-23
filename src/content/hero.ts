export const heroContent = {
  badge: "Open source · Live demo",
  title: "A CRM small enough to actually use",
  description:
    "Mini-CRM keeps clients, deals and analytics on one screen. Drag a deal across the pipeline and the dashboard updates in realtime — no setup, no clutter.",
  note: "Free and open source. Running on Vercel and Supabase.",

  /**
   * Illustrative board shown in the hero. Stages mirror the real app's
   * pipeline: new, negotiation, won, lost.
   */
  preview: {
    label:
      "Mini-CRM deal board with New, Negotiation, Won and Lost pipeline columns",
    address: "mini-crm-supabase.vercel.app",
    nav: ["Dashboard", "Clients", "Deals"],
    activeNav: "Deals",
    stats: [
      { label: "Open deals", value: "18" },
      { label: "Pipeline", value: "$96,400" },
      { label: "Won this month", value: "$31,200" },
    ],
    columns: [
      {
        stage: "New",
        tone: "neutral",
        deals: [
          { title: "Website redesign", client: "Northwind", amount: "$12,400" },
          { title: "Onboarding flow", client: "Lumen Labs", amount: "$4,800" },
        ],
      },
      {
        stage: "Negotiation",
        tone: "brand",
        deals: [
          {
            title: "Analytics dashboard",
            client: "Acme Co",
            amount: "$22,000",
          },
          {
            title: "Mobile app audit",
            client: "Orient Bank",
            amount: "$7,600",
          },
        ],
      },
      {
        stage: "Won",
        tone: "positive",
        deals: [
          { title: "CRM migration", client: "Vela Group", amount: "$31,200" },
        ],
      },
      {
        stage: "Lost",
        tone: "muted",
        deals: [
          { title: "Legacy support", client: "Cobalt", amount: "$5,000" },
        ],
      },
    ],
  },
} as const;
