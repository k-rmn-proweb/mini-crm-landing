import { footerContent } from "@/content/footer";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-edge bg-canvas-subtle">
      <Container className="py-14">
        <div className="flex flex-col gap-10 sm:flex-row sm:justify-between">
          <div className="flex max-w-xs flex-col gap-3">
            <Logo />
            <p className="text-sm text-ink-muted">{footerContent.tagline}</p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:gap-16">
            {footerContent.groups.map((group) => (
              <div key={group.title} className="flex flex-col gap-3">
                <h3 className="text-sm font-semibold">{group.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {group.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        {...("external" in link && link.external
                          ? { target: "_blank", rel: "noreferrer" }
                          : {})}
                        className="text-sm text-ink-muted transition-colors hover:text-ink"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-edge pt-6 text-sm text-ink-faint sm:flex-row sm:items-center sm:justify-between">
          <p>{footerContent.copyright(year)}</p>
          <p>{footerContent.builtWith}</p>
        </div>
      </Container>
    </footer>
  );
}
