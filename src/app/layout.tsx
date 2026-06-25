import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { getContent } from "@/lib/content";
import { ChunkLoadRecovery } from "@/components/ChunkLoadRecovery";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

export async function generateMetadata(): Promise<Metadata> {
  const { siteConfig } = await getContent();
  return {
    title: {
      default: `${siteConfig.name} — ${siteConfig.fullName}`,
      template: `%s | ${siteConfig.name}`,
    },
    description: siteConfig.description,
    keywords: [
      "IAC",
      "Incubation Center",
      "Ethiopia",
      "Startups",
      "MinT",
      "Innovation",
      "Ministry of Innovation and Technology",
    ],
    metadataBase: new URL(siteConfig.url),
    openGraph: {
      title: siteConfig.fullName,
      description: siteConfig.description,
      type: "website",
      locale: "en_US",
      siteName: siteConfig.name,
      url: siteConfig.url,
    },
    robots: {
      index: true,
      follow: true,
    },
    icons: {
      icon: "/logos/iac-logo.jpg",
      apple: "/logos/iac-logo.jpg",
    },
    manifest: "/manifest.webmanifest",
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={plusJakarta.variable}>
      <body className="min-h-screen antialiased">
        <ChunkLoadRecovery />
        {children}
      </body>
    </html>
  );
}
