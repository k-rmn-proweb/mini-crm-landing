import { siteConfig } from "@/config/site";
import { actionsContent, navContent } from "@/content/nav";
import { buttonVariants } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { ThemeToggle } from "@/components/layout/theme-toggle";

/** Sticky site header. Server-rendered; only the menu and toggle are client. */
export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-edge bg-canvas/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <Logo />

        <nav className="hidden items-center gap-1 md:flex">
          {navContent.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-hover hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a
            href={siteConfig.links.demo}
            target="_blank"
            rel="noreferrer"
            className={buttonVariants({
              size: "sm",
              className: "hidden md:inline-flex",
            })}
          >
            {actionsContent.demo}
          </a>
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
