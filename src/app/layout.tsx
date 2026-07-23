import type { Metadata } from "next";

import { metaContent } from "@/content/meta";

import "./globals.css";

export const metadata: Metadata = {
  title: metaContent.title,
  description: metaContent.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
