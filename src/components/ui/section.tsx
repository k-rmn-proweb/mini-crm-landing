import { cn } from "@/lib/utils";
import { Container } from "@/components/ui/container";

type SectionProps = React.ComponentProps<"section"> & {
  /** Anchor id; also what the header nav links to. */
  id?: string;
  /** Tints the band to separate neighbouring sections. */
  tone?: "canvas" | "subtle";
};

/** Vertical rhythm wrapper. Every landing section is one of these. */
export function Section({
  id,
  tone = "canvas",
  className,
  children,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 py-20 sm:py-28",
        tone === "subtle" && "bg-canvas-subtle",
        className,
      )}
      {...props}
    >
      <Container>{children}</Container>
    </section>
  );
}

type SectionHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

/** Eyebrow + heading + lead paragraph, identical across every section. */
export function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "mx-auto max-w-2xl text-center",
      )}
    >
      {eyebrow ? (
        <span className="font-mono text-sm tracking-widest text-brand uppercase">
          {eyebrow}
        </span>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-lg text-pretty text-ink-muted">{description}</p>
      ) : null}
    </div>
  );
}
