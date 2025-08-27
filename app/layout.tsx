import type { Metadata } from "next";
import "./globals.css";
import { clashDisplay, generalSans } from "./fonts";

export const metadata: Metadata = {
  title: "Splixor | Share Subscription Services",
  description: "Discover and Share Subscription Services",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${generalSans.variable} ${clashDisplay.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
