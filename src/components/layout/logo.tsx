import Link from "next/link";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/** Brand mark: three kanban columns, echoing the CRM's deal board. */
function LogoMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden
      className={cn("size-5", className)}
    >
      <rect x="3" y="5" width="5" height="14" rx="1.5" fill="currentColor" />
      <rect
        x="10.5"
        y="5"
        width="5"
        height="9"
        rx="1.5"
        fill="currentColor"
        opacity="0.7"
      />
      <rect
        x="18"
        y="5"
        width="3"
        height="5"
        rx="1.5"
        fill="currentColor"
        opacity="0.45"
      />
    </svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <Link
      href="/"
      className={cn(
        "group inline-flex items-center gap-2.5 font-semibold tracking-tight",
        className,
      )}
    >
      <span className="flex size-8 items-center justify-center rounded-lg bg-brand text-brand-foreground">
        <LogoMark />
      </span>
      {siteConfig.name}
    </Link>
  );
}
