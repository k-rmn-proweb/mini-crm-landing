import { GripVerticalIcon } from "lucide-react";

import { howItWorksContent } from "@/content/how-it-works";
import { cn } from "@/lib/utils";

const { visuals } = howItWorksContent;

/** Grey placeholder line — the illustrations suggest content, they don't fake it. */
function Line({ className }: { className?: string }) {
  return (
    <span
      className={cn("block h-1.5 rounded-full bg-edge-strong", className)}
    />
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-edge bg-canvas-subtle p-5 sm:p-6">
      {children}
    </div>
  );
}

function ClientsVisual() {
  return (
    <Frame>
      <div className="flex flex-col gap-2.5">
        {visuals.clientStatuses.map((status, index) => (
          <div
            key={index}
            className="flex items-center gap-3 rounded-lg border border-edge bg-surface p-3"
          >
            <span className="size-8 shrink-0 rounded-full bg-brand/15" />
            <span className="flex min-w-0 flex-1 flex-col gap-1.5">
              <Line className={index === 1 ? "w-2/5" : "w-1/2"} />
              <Line className="w-1/4 opacity-60" />
            </span>
            <span
              className={cn(
                "rounded-full px-2 py-0.5 text-[10px] font-medium",
                status === "Active"
                  ? "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400"
                  : "bg-brand/15 text-brand",
              )}
            >
              {status}
            </span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

function DealsVisual() {
  return (
    <Frame>
      <div className="grid grid-cols-2 gap-4">
        {visuals.dealStages.map((stage, columnIndex) => (
          <div key={stage} className="flex flex-col gap-2">
            <span className="text-[11px] font-medium text-ink-muted">
              {stage}
            </span>

            {/* The second column holds the card mid-drag. */}
            {columnIndex === 1 ? (
              <div className="flex rotate-2 items-center gap-2 rounded-lg bg-surface p-3 shadow-lg ring-2 ring-brand">
                <GripVerticalIcon
                  className="size-3.5 shrink-0 text-ink-faint"
                  aria-hidden
                />
                <span className="flex flex-1 flex-col gap-1.5">
                  <Line className="w-3/4" />
                  <Line className="w-1/2 opacity-60" />
                </span>
              </div>
            ) : null}

            {[0, 1].map((cardIndex) => (
              <div
                key={cardIndex}
                className="flex flex-col gap-1.5 rounded-lg border border-edge bg-surface p-3"
              >
                <Line className={cardIndex === 0 ? "w-3/4" : "w-2/3"} />
                <Line className="w-1/2 opacity-60" />
              </div>
            ))}

            {columnIndex === 1 ? (
              <div className="h-10 rounded-lg border border-dashed border-edge" />
            ) : null}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function AnalyticsVisual() {
  const bars = [40, 62, 48, 78, 56, 92, 70];

  return (
    <Frame>
      <div className="flex flex-col gap-5">
        <div className="flex items-baseline gap-3">
          <span className="text-[10px] tracking-wide text-ink-faint uppercase">
            {visuals.metricLabel}
          </span>
          <span className="font-mono text-lg font-semibold">
            {visuals.metricValue}
          </span>
        </div>

        <div className="flex h-28 items-end gap-2">
          {bars.map((height, index) => (
            <span
              key={index}
              style={{ height: `${height}%` }}
              className={cn(
                "flex-1 rounded-t-sm",
                index === bars.length - 2 ? "bg-brand" : "bg-brand/25",
              )}
            />
          ))}
        </div>
      </div>
    </Frame>
  );
}

/** Derived from the content, so every step is guaranteed an illustration. */
export type StepId = (typeof howItWorksContent.steps)[number]["id"];

const visualsById: Record<StepId, () => React.ReactElement> = {
  clients: ClientsVisual,
  deals: DealsVisual,
  analytics: AnalyticsVisual,
};

/** Decorative: the steps are already described in full by the text beside them. */
export function HowItWorksVisual({ id }: { id: StepId }) {
  const Visual = visualsById[id];
  return (
    <div aria-hidden>
      <Visual />
    </div>
  );
}
