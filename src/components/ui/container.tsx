import { cn } from "@/lib/utils";

type ContainerProps = React.ComponentProps<"div">;

/** The single horizontal rhythm of the site. Nothing else sets page width. */
export function Container({ className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("mx-auto w-full max-w-6xl px-6 sm:px-8", className)}
      {...props}
    />
  );
}
