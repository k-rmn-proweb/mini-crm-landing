import {
  ActivityIcon,
  ChartColumnIcon,
  Columns3Icon,
  ShieldCheckIcon,
  UsersIcon,
  ZapIcon,
  type LucideIcon,
} from "lucide-react";

import { sectionIds } from "@/config/site";
import { featuresContent } from "@/content/features";
import { Card } from "@/components/ui/card";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";

type FeatureId = (typeof featuresContent.items)[number]["id"];

/**
 * Icons are presentation, so they are keyed by id here rather than in content.
 * The id union comes from the content itself, so adding a feature without an
 * icon is a type error rather than a blank square.
 */
const icons: Record<FeatureId, LucideIcon> = {
  clients: UsersIcon,
  pipeline: Columns3Icon,
  activities: ActivityIcon,
  dashboard: ChartColumnIcon,
  realtime: ZapIcon,
  security: ShieldCheckIcon,
};

export function Features() {
  return (
    <Section id={sectionIds.features} tone="subtle">
      <Reveal>
        <SectionHeader
          eyebrow={featuresContent.eyebrow}
          title={featuresContent.title}
          description={featuresContent.description}
        />
      </Reveal>

      <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {featuresContent.items.map((item, index) => {
          const Icon = icons[item.id];
          return (
            <Reveal
              key={item.id}
              // Stagger by column so a row appears to land together.
              delay={(index % 3) * 0.08}
              className="h-full"
            >
              <Card interactive className="flex h-full flex-col gap-3">
                <span className="flex size-10 items-center justify-center rounded-lg bg-brand/10 text-brand">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-semibold">{item.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {item.description}
                </p>
              </Card>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
