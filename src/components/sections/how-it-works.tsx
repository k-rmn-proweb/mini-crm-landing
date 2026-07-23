import { sectionIds } from "@/config/site";
import { howItWorksContent } from "@/content/how-it-works";
import { cn } from "@/lib/utils";
import { Section, SectionHeader } from "@/components/ui/section";
import { HowItWorksVisual } from "@/components/sections/how-it-works-visual";

export function HowItWorks() {
  return (
    <Section id={sectionIds.howItWorks}>
      <SectionHeader
        eyebrow={howItWorksContent.eyebrow}
        title={howItWorksContent.title}
        description={howItWorksContent.description}
      />

      <div className="mt-16 flex flex-col gap-16 sm:gap-20">
        {howItWorksContent.steps.map((step, index) => (
          <div
            key={step.id}
            className="grid items-center gap-8 md:grid-cols-2 md:gap-14"
          >
            <div
              className={cn(
                "flex flex-col gap-4",
                // Zig-zag on desktop; source order stays step order on mobile.
                index % 2 === 1 && "md:order-2",
              )}
            >
              <span className="font-mono text-sm tracking-widest text-brand">
                {step.step}
              </span>
              <h3 className="text-2xl font-semibold tracking-tight text-balance">
                {step.title}
              </h3>
              <p className="leading-relaxed text-pretty text-ink-muted">
                {step.description}
              </p>
            </div>

            <HowItWorksVisual id={step.id} />
          </div>
        ))}
      </div>
    </Section>
  );
}
