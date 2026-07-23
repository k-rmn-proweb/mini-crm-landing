import { sectionIds, siteConfig } from "@/config/site";
import { contactContent } from "@/content/contact";
import { actionsContent } from "@/content/nav";
import { buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { GithubIcon } from "@/components/ui/icons";
import { Section, SectionHeader } from "@/components/ui/section";
import { ContactForm } from "@/components/sections/contact-form";

export function Contact() {
  return (
    <Section id={sectionIds.contact}>
      <div className="grid gap-10 md:grid-cols-2 md:gap-16">
        <div className="flex flex-col gap-6">
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
            className={buttonVariants({
              variant: "outline",
              size: "md",
              className: "self-start",
            })}
          >
            <GithubIcon />
            {actionsContent.github}
          </a>
        </div>

        <Card className="sm:p-8">
          <ContactForm />
        </Card>
      </div>
    </Section>
  );
}
