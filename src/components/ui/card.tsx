import { cn } from "@/lib/utils";

type CardProps = React.ComponentProps<"div"> & {
  /** Adds the lift-on-hover treatment. Off for cards that hold a form. */
  interactive?: boolean;
};

/** Bordered surface used for feature, step and highlight blocks. */
export function Card({ className, interactive, ...props }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-xl border border-edge bg-surface p-6",
        interactive &&
          "transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-edge-strong hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20",
        className,
      )}
      {...props}
    />
  );
}
