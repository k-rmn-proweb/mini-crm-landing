import { ArrowRightIcon } from "lucide-react";

import { siteConfig } from "@/config/site";
import { heroContent } from "@/content/hero";
import { actionsContent } from "@/content/nav";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { GithubIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { HeroVisual } from "@/components/sections/hero-visual";

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28">
      <Container className="flex flex-col items-center gap-10 text-center">
        <div className="flex max-w-3xl flex-col items-center gap-6">
          <Badge>{heroContent.badge}</Badge>

          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            {heroContent.title}
          </h1>

          <p className="max-w-2xl text-lg text-pretty text-ink-muted sm:text-xl">
            {heroContent.description}
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

          <p className="text-sm text-ink-faint">{heroContent.note}</p>
        </div>
      </Container>

      {/*
        The visual is the only part of the hero that animates. The heading and
        paragraph above it render immediately — the paragraph is the LCP
        element, and starting it transparent would delay the metric it sets.
      */}
      <Container className="mt-14 max-w-5xl">
        <Reveal>
          <HeroVisual />
        </Reveal>
      </Container>
    </section>
  );
}
