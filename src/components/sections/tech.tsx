import { ArrowUpRightIcon } from "lucide-react";

import { sectionIds, siteConfig } from "@/config/site";
import { techContent } from "@/content/tech";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";

export function Tech() {
  return (
    <Section id={sectionIds.tech} tone="subtle">
      <Reveal>
        <SectionHeader
          eyebrow={techContent.eyebrow}
          title={techContent.title}
          description={techContent.description}
        />
      </Reveal>

      <div className="mt-14 grid gap-10 lg:grid-cols-5 lg:gap-14">
        <div className="flex flex-col gap-8 lg:col-span-3">
          {techContent.highlights.map((highlight, index) => (
            <Reveal key={highlight.id} delay={index * 0.08}>
              <div className="flex flex-col gap-2 border-l-2 border-edge pl-5 transition-colors duration-300 hover:border-brand">
                <h3 className="font-semibold">{highlight.title}</h3>
                <p className="text-sm leading-relaxed text-ink-muted">
                  {highlight.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal
          delay={0.1}
          className="flex flex-col gap-4 rounded-xl border border-edge bg-surface p-6 lg:col-span-2"
        >
          <dl className="divide-y divide-edge">
            {techContent.stack.map((row) => (
              <div
                key={row.area}
                className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0"
              >
                <dt className="font-mono text-[11px] tracking-wide text-ink-faint uppercase">
                  {row.area}
                </dt>
                <dd className="text-sm">{row.choice}</dd>
              </div>
            ))}
          </dl>

          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="group mt-auto inline-flex items-center gap-1.5 text-sm font-medium text-brand transition-colors hover:text-brand-hover"
          >
            {techContent.linkLabel}
            <ArrowUpRightIcon
              className="size-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              aria-hidden
            />
          </a>
        </Reveal>
      </div>
    </Section>
  );
}
