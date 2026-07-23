import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<"div">;

/** Bordered surface used for feature, step and highlight blocks. */
export function Card({ className, ...props }: CardProps) {
  return (
    <div
      className={cn("rounded-xl border border-edge bg-surface p-6", className)}
      {...props}
    />
  );
}
