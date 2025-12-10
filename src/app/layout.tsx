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
    "Discover, rate, and explore restaurants effortlessly with Cravit's curated food journaling app. Track your favorite spots, share reviews with friends, and never forget a great meal.",
  keywords: [
    "Cravit",
    "Cravy",
    "restaurant discovery",
    "food app",
    "food journaling",
    "restaurant ratings",
    "food recommendations",
    "restaurant tracker",
    "food diary",
    "restaurant reviews",
    "best restaurants near me",
    "food discovery app",
    "meal tracking",
    "foodie app",
  ],
  authors: [{ name: "Cravit Team" }],
  creator: "Cravit",
  publisher: "Cravit",
  applicationName: "Cravit",
  category: "Food & Drink",
  openGraph: {
    type: "website",
    title: "Cravit | Find your Next Craving",
    description:
      "Discover, rate, and explore restaurants effortlessly with Cravit's curated food journaling app. Track your favorite spots and share reviews with friends.",
    url: "/",
    siteName: "Cravit",
    locale: "en_US",
    images: [
      {
        url: "/icon.png",
        width: 512,
        height: 512,
        alt: "Cravit - Food Discovery App",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cravit | Find your Next Craving",
    description:
      "Discover, rate, and explore restaurants effortlessly with Cravit's curated food journaling app.",
    images: ["/icon.png"],
    creator: "@cravitapp",
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // bing: "your-bing-verification-code",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Cravit",
  },
  formatDetection: {
    telephone: false,
  },
  other: {
    "mobile-web-app-capable": "yes",
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
        </body>
      </html>
    </ClerkProvider>
  );
}
