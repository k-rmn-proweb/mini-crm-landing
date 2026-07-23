import {
  BriefcaseIcon,
  LayoutDashboardIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";

import { heroContent } from "@/content/hero";
import { cn } from "@/lib/utils";

const { preview } = heroContent;

const stageTone: Record<string, string> = {
  neutral: "bg-ink-faint",
  brand: "bg-brand",
  positive: "bg-emerald-500",
  muted: "bg-ink-faint/50",
};

/** Keyed by label rather than position, so reordering the nav can't desync it. */
const navIcons: Record<string, LucideIcon> = {
  Dashboard: LayoutDashboardIcon,
  Clients: UsersIcon,
  Deals: BriefcaseIcon,
};

/**
 * The product shot: the CRM's deal board rebuilt in markup rather than a
 * screenshot, so it stays sharp at any density, follows the active theme and
 * costs no image bytes. Stage names mirror the real pipeline.
 *
 * `role="img"` collapses the whole thing into one label for screen readers —
 * the fake deal amounts inside are decoration, not information.
 */
export function HeroVisual() {
  return (
    <div className="relative">
      {/* Bloom behind the window. */}
      <div
        aria-hidden
        className="absolute -inset-x-8 -top-10 bottom-10 rounded-[50%] bg-glow blur-3xl"
      />

      <div
        role="img"
        aria-label={preview.label}
        className="relative overflow-hidden rounded-xl border border-edge bg-surface shadow-2xl shadow-black/10 dark:shadow-black/40"
      >
        {/* Window chrome */}
        <div className="flex items-center gap-3 border-b border-edge bg-canvas-subtle px-4 py-3">
          <div className="flex gap-1.5">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="mx-auto hidden max-w-xs flex-1 rounded-md border border-edge bg-surface px-3 py-1 text-center font-mono text-[11px] text-ink-faint sm:block">
            {preview.address}
          </div>
        </div>

        <div className="flex">
          {/* App sidebar */}
          <div className="hidden w-40 shrink-0 flex-col gap-1 border-r border-edge p-3 sm:flex">
            {preview.nav.map((item) => {
              const Icon = navIcons[item];
              const active = item === preview.activeNav;
              return (
                <span
                  key={item}
                  className={cn(
                    "flex items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium",
                    active ? "bg-brand/10 text-brand" : "text-ink-faint",
                  )}
                >
                  <Icon className="size-3.5" />
                  {item}
                </span>
              );
            })}
          </div>

          {/* Board */}
          <div className="min-w-0 flex-1 p-4">
            <div className="mb-4 grid grid-cols-3 gap-3">
              {preview.stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-lg border border-edge bg-canvas-subtle p-2.5"
                >
                  <p className="text-[10px] tracking-wide text-ink-faint uppercase">
                    {stat.label}
                  </p>
                  <p className="mt-0.5 text-sm font-semibold">{stat.value}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              {preview.columns.map((column) => (
                <div key={column.stage} className="flex flex-col gap-2">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={cn(
                        "size-1.5 rounded-full",
                        stageTone[column.tone],
                      )}
                    />
                    <span className="text-[11px] font-medium text-ink-muted">
                      {column.stage}
                    </span>
                    <span className="text-[11px] text-ink-faint">
                      {column.deals.length}
                    </span>
                  </div>

                  {column.deals.map((deal) => (
                    <div
                      key={deal.title}
                      className="flex flex-col gap-1 rounded-lg border border-edge bg-canvas-subtle p-2.5"
                    >
                      <p className="truncate text-[11px] font-medium">
                        {deal.title}
                      </p>
                      <p className="truncate text-[10px] text-ink-faint">
                        {deal.client}
                      </p>
                      <p className="font-mono text-[11px] text-ink-muted">
                        {deal.amount}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Fade the board into the page instead of cutting it off. */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-surface to-transparent"
        />
      </div>
    </div>
  );
}
