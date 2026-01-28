import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
import { AnalyticsProvider } from "@/components/AnalyticsProvider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

const catchitFont = localFont({
  src: [
    {
      path: "../public/fonts/Catchifont-regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Catchifont-bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-catchit",
});

export const metadata: Metadata = {
  title: "Mario Bennekers - Product Manager & Builder",
  description: "Product Manager combining strategic thinking with hands-on technical execution. 6+ years leading cross-functional teams and shipping impactful digital products.",
  keywords: ["Product Manager", "Product Management", "Technical PM", "React", "TypeScript", "AI"],
  authors: [{ name: "Mario Bennekers" }],
  icons: {
    icon: "/images/portfolio-favicon.png",
  },
  openGraph: {
    title: "Mario Bennekers - Product Manager & Builder",
    description: "Product Manager combining strategic thinking with hands-on technical execution.",
    type: "website",
    images: [
      {
        url: "/images/mario-profile.jpg",
        width: 1024,
        height: 768,
        alt: "Mario Bennekers",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Mario Bennekers - Product Manager & Builder",
    description: "Product Manager combining strategic thinking with hands-on technical execution.",
    images: ["/images/mario-profile.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${catchitFont.variable} bg-white dark:bg-gray-900`}>
        <AnalyticsProvider>{children}</AnalyticsProvider>
      </body>
    </html>
  );
}
