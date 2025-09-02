import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import Navbar from "./_components/Navigation/Navbar";
import Footer from "./_components/Navigation/Footer";

export const metadata: Metadata = {
  title: "Dishes Around the World",
  description:
    "Discover and explore a wide variety of dishes from around the world. Find recipes, ingredients, and cooking inspiration from every culture.",
  keywords: [
    "world recipes",
    "international cuisine",
    "global dishes",
    "cook recipes",
    "food inspiration",
    "dish ideas",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden">
        <Navbar />
        {children}
        <Footer />
      </body>
      <Analytics />
    </html>
  );
}
