import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

/**
 * Exported separately so anchors and Links can wear button styling without a
 * Slot wrapper: <a className={buttonVariants({ variant: "primary" })}>.
 */
export const buttonVariants = cva(
  // Press feedback is a CSS transform: it costs no JavaScript and is skipped
  // automatically under prefers-reduced-motion (see globals.css).
  "inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap transition-[colors,transform] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-brand text-brand-foreground hover:bg-brand-hover",
        outline:
          "border-edge-strong text-ink hover:bg-surface-hover border bg-transparent",
        ghost: "text-ink-muted hover:bg-surface-hover hover:text-ink",
      },
      size: {
        sm: "h-9 px-3 text-sm",
        md: "h-11 px-5 text-sm",
        lg: "h-12 px-6 text-base",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants>;

export function Button({ className, variant, size, ...props }: ButtonProps) {
  return (
    <button
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  );
}
