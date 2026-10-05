import type { Metadata } from "next";
import { Anton, Inter } from "next/font/google";
import "./globals.css";

const anton = Anton({
  variable: "--font-anton",
  weight: "400",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kraya AI — WhatsApp AI Sales Automation",
  description:
    "Kraya builds AI sales systems that convert your ads into leads — and makes sure none of them die. WhatsApp-first automation for teams that never want to lose a lead.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${anton.variable} ${inter.variable} antialiased`}>
      <body>{children}</body>
    </html>
  );
}
