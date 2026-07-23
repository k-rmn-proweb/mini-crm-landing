"use client";

import { ThemeProvider as NextThemesProvider } from "next-themes";

/**
 * Thin client boundary around next-themes so the root layout can stay a
 * Server Component. Children passed through it are still server-rendered.
 */
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  );
}
