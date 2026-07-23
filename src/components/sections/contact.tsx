import { sectionIds, siteConfig } from "@/config/site";
import { contactContent } from "@/content/contact";
import { actionsContent } from "@/content/nav";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GithubIcon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/reveal";
import { Section, SectionHeader } from "@/components/ui/section";
import { ContactForm } from "@/components/sections/contact-form";

export function Contact() {
  return (
    <Section id={sectionIds.contact}>
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <Reveal className="flex flex-col gap-6">
          <SectionHeader
            align="left"
            eyebrow={contactContent.eyebrow}
            title={contactContent.title}
            description={contactContent.description}
          />

          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "md" }),
              "self-start",
            )}
          >
            <GithubIcon />
            {actionsContent.github}
          </a>
        </Reveal>

        <Reveal delay={0.1}>
          <Card className="sm:p-8">
            <ContactForm />
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
