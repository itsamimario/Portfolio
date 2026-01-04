import type { Metadata } from "next";
import { Inter } from "next/font/google";
import localFont from "next/font/local";
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
  title: "Mario Bennekers - Product Manager & Technical Builder",
  description: "Product Manager combining strategic thinking with hands-on technical execution. 6+ years leading cross-functional teams and shipping impactful digital products.",
  keywords: ["Product Manager", "Product Management", "Technical PM", "React", "TypeScript", "AI"],
  authors: [{ name: "Mario Bennekers" }],
  openGraph: {
    title: "Mario Bennekers - Product Manager & Technical Builder",
    description: "Product Manager combining strategic thinking with hands-on technical execution.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} ${catchitFont.variable}`}>{children}</body>
    </html>
  );
}
