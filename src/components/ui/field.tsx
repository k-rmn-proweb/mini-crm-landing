import { cn } from "@/lib/utils";

const controlStyles =
  "w-full rounded-lg border border-edge bg-canvas px-3.5 py-2.5 text-sm text-ink placeholder:text-ink-faint transition-colors focus-visible:border-brand disabled:opacity-60 aria-invalid:border-red-500";

export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(controlStyles, className)} {...props} />;
}

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea className={cn(controlStyles, "resize-y", className)} {...props} />
  );
}

type FieldProps = {
  /** Matches the control's id and name so the label and error wire up. */
  name: string;
  label: string;
  error?: string;
  children: React.ReactNode;
};

/** Label, control and error message as one accessible unit. */
export function Field({ name, label, error, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={name} className="text-sm font-medium">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${name}-error`} className="text-sm text-red-500">
          {error}
        </p>
      ) : null}
    </div>
  );
}
