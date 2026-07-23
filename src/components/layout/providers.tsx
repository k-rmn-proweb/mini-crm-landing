"use client";

import { domAnimation, LazyMotion } from "motion/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * The single client boundary at the root. Children passed through it are still
 * server-rendered.
 *
 * `LazyMotion` with the `domAnimation` feature set loads roughly half of what
 * importing `motion.*` directly would; `strict` makes the full `motion.*`
 * components throw, so nothing can quietly pull the rest back in.
 */
export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <LazyMotion features={domAnimation} strict>
        {children}
      </LazyMotion>
    </NextThemesProvider>
  );
}
