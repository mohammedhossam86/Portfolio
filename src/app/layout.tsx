import type { Metadata } from "next";
import { siteMetadata } from "@/data";
import "./globals.css";

// ─── SEO Metadata ────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || siteMetadata.url || "http://localhost:3000"
  ),
  title: siteMetadata.title,
  description: siteMetadata.description,
  authors: [{ name: siteMetadata.author }],
  openGraph: {
    title: siteMetadata.title,
    description: siteMetadata.description,
    url: siteMetadata.url,
    siteName: siteMetadata.title,
    images: [siteMetadata.ogImage],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteMetadata.title,
    description: siteMetadata.description,
    images: [siteMetadata.ogImage],
  },
};

// ─── Root Layout ─────────────────────────────────────────────────────────────
// NOTE: Google Fonts (Inter, JetBrains Mono) will be loaded via next/font/google
// when running with network access. For now we use CSS fallbacks.
// In Phase 2 we'll add:
//   import { Inter, JetBrains_Mono } from "next/font/google";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
