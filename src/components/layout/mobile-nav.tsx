"use client";

import { useState } from "react";
import { MenuIcon, XIcon } from "lucide-react";

import { siteConfig } from "@/config/site";
import { actionsContent, navContent } from "@/content/nav";
import { Button, buttonVariants } from "@/components/ui/button";

/** Header navigation below the `md` breakpoint. */
export function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? <XIcon aria-hidden /> : <MenuIcon aria-hidden />}
      </Button>

      {open ? (
        <div
          id="mobile-nav"
          className="absolute inset-x-0 top-full border-b border-edge bg-canvas p-6 shadow-lg"
        >
          <nav className="flex flex-col gap-1">
            {navContent.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-hover hover:text-ink"
              >
                {item.label}
              </a>
            ))}
            <a
              href={siteConfig.links.demo}
              target="_blank"
              rel="noreferrer"
              onClick={() => setOpen(false)}
              className={buttonVariants({ size: "md", className: "mt-3" })}
            >
              {actionsContent.demo}
            </a>
          </nav>
        </div>
      ) : null}
    </div>
  );
}
