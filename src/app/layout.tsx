import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/next"

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
          <Analytics />
          <a
            href="https://www.producthunt.com/products/cravit?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-cravit"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "fixed",
              bottom: "16px",
              right: "16px",
              zIndex: 50,
            }}
          >
            <img
              src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1046493&theme=light&t=1765013989304"
              alt="Cravit - Discover new places through food missions with friends | Product Hunt"
              style={{ width: "250px", height: "54px" }}
              width="250"
              height="54"
            />
          </a>
        </body>
      </html>
    </ClerkProvider>
  );
}
