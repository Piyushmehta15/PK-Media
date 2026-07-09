import type { Metadata, Viewport } from "next";
import "./globals.css";
import CursorGlow from "@/components/CursorGlow";

// NOTE: Avoid next/font/google here because Turbopack is currently failing to resolve its internal font loader.
// Typography is still handled via Tailwind + global font-family fallback in globals.css.


export const viewport: Viewport = {
  themeColor: "#080808",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "PK Media | Premium Influencer Marketing Agency",
  description: "PK Media connects D2C, startups, and luxury brands with creators that drive real results. End-to-end influencer strategy, management, UGC, and ROI-driven campaigns.",
  metadataBase: new URL("https://pkmedia.agency"),
  keywords: ["influencer marketing", "marketing agency", "UGC campaigns", "creator strategy", "brand growth", "PK Media", "D2C marketing"],
  authors: [{ name: "PK Media Team" }],
  openGraph: {
    title: "PK Media | Premium Influencer Marketing Agency",
    description: "Connecting Brands with Creators That Drive Results. We build, manage, and scale influencer campaigns with high ROI.",
    url: "https://pkmedia.agency",
    siteName: "PK Media",
    images: [
      {
        url: "/media/pk-logo-circular.jpg",
        width: 1200,
        height: 630,
        alt: "PK Media Influencer Marketing Agency",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PK Media | Premium Influencer Marketing Agency",
    description: "Connecting Brands with Creators That Drive Results. Strategic partnerships and ROI performance marketing.",
    images: ["/media/pk-logo-circular.jpg"],
  },
  icons: {
    icon: "/media/pk-logo-circular.jpg",
    apple: "/media/pk-logo-circular.jpg",
  },
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="bg-background text-foreground min-h-full flex flex-col selection:bg-accent selection:text-primary relative custom-cursor-active">
        <CursorGlow />
        <main className="flex-grow w-full relative z-10">{children}</main>
      </body>
    </html>
  );
}
