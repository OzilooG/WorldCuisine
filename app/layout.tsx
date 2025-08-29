import type { Metadata } from "next";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next"
import Navbar from "./components/Navigation/Navbar";
import Footer from "./components/Navigation/Footer";

export const metadata: Metadata = {
  title: "World Cuisine",
  description:
    "A place where you can find new and fun meals to cook from all around the world.",
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
    <Analytics/>
    </html>
  );
}
