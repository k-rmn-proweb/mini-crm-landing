import { ArrowRightIcon } from "lucide-react";

import { siteConfig } from "@/config/site";
import { ctaContent } from "@/content/cta";
import { actionsContent } from "@/content/nav";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GithubIcon } from "@/components/ui/icons";

export function Cta() {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="relative overflow-hidden rounded-2xl border border-edge bg-canvas-subtle px-6 py-16 text-center sm:px-12">
          {/* Brand bloom, kept behind the content. */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 -top-32 h-64 rounded-[50%] bg-glow blur-3xl"
          />

          <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-6">
            <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
              {ctaContent.title}
            </h2>
            <p className="text-lg text-pretty text-ink-muted">
              {ctaContent.description}
            </p>

            <div className="flex flex-col gap-3 sm:flex-row">
              <a
                href={siteConfig.links.demo}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ size: "lg" })}
              >
                {actionsContent.demo}
                <ArrowRightIcon aria-hidden />
              </a>
              <a
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                <GithubIcon />
                {actionsContent.github}
              </a>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
