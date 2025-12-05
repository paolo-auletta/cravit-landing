import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  variable: "--font-poppins",
});

const appBaseUrl =
  process.env.NEXT_PUBLIC_SITE_URL && process.env.NEXT_PUBLIC_SITE_URL.length > 0
    ? new URL(process.env.NEXT_PUBLIC_SITE_URL)
    : undefined;

export const metadata: Metadata = {
  metadataBase: appBaseUrl,
  title: {
    default: "Cravit | Find your Next Craving",
    template: "%s | Cravit",
  },
  description:
    "Discover, rate, and explore restaurants effortlessly with Cravit's curated food journaling app.",
  keywords: [
    "Cravit",
    "Cravy",
    "restaurant discovery",
    "food app",
    "food journaling",
    "restaurant ratings",
    "food recommendations",
  ],
  openGraph: {
    type: "website",
    title: "Cravit | Find your Next Craving",
    description:
      "Discover, rate, and explore restaurants effortlessly with Cravit's curated food journaling app.",
    url: "/",
    siteName: "Cravit",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cravit | Find your Next Craving",
    description:
      "Discover, rate, and explore restaurants effortlessly with Cravit's curated food journaling app.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.variable} antialiased`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
