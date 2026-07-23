import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import { brandColors } from "@/config/brand";
import { siteConfig } from "@/config/site";
import { metaContent } from "@/content/meta";
import { structuredData } from "@/lib/structured-data";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { Providers } from "@/components/layout/providers";

import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  // Makes every relative URL below — canonical, OG image — absolute.
  metadataBase: new URL(siteConfig.url),
  title: {
    default: metaContent.title,
    template: metaContent.titleTemplate,
  },
  description: metaContent.description,
  applicationName: siteConfig.name,
  keywords: [...metaContent.keywords],
  authors: [{ name: siteConfig.author.name, url: siteConfig.author.url }],
  creator: siteConfig.author.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: metaContent.title,
    description: metaContent.description,
    locale: siteConfig.locale,
    // The image comes from app/opengraph-image.tsx by file convention.
  },
  twitter: {
    card: "summary_large_image",
    title: metaContent.title,
    description: metaContent.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: brandColors.canvasLight },
    { media: "(prefers-color-scheme: dark)", color: brandColors.canvasDark },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // next-themes writes the theme class on <html> before paint, which the
    // server cannot know about — hence suppressHydrationWarning.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${jetbrainsMono.variable}`}
    >
      <body className="flex min-h-dvh flex-col">
        {/*
          Scroll-reveal blocks are server-rendered at opacity 0 and only become
          visible once Motion runs. Without scripting they would stay invisible,
          so reveal them outright.
        */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <Providers>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>

        {/* Structured data: rendered last so it never delays the content. */}
        <script
          type="application/ld+json"
          // Serialised from a typed object we control — no user input reaches it.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
