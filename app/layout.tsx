import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "World Cuisine",
  description: "A place where you can find new and fun meals to cook from all around the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
