import { cn } from "@/lib/utils";

type BadgeProps = React.ComponentProps<"span">;

/** Small pill used for eyebrows and status labels. */
export function Badge({ className, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-edge bg-surface px-3 py-1 text-xs font-medium text-ink-muted",
        className,
      )}
      {...props}
    />
  );
}
