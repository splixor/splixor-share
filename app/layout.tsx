import type { Metadata } from "next";
import "./globals.css";
import { clashDisplay, generalSans } from "./fonts";

export const metadata: Metadata = {
  title: 'Splixor - Share Subscription Services',
  description: "We're cooking up a smarter way to split and share your favorite subscriptions.",
  keywords: ['subscription sharing', 'split costs', 'youtube premium sharing', 'apple music sharing', 'netflix sharing', 'spotify sharing', 'canva sharing', 'subscription management'],
  authors: [{ name: 'The Splixor Team' }],
  creator: 'Splixor',
  publisher: 'Splixor',

  openGraph: {
    type: 'website',
    locale: 'en_NG',
    url: 'https://www.splixor.com',
    title: 'Splixor - Share Subscription Services',
    description: "We're cooking up a smarter way to split and share your favorite subscriptions.",
    siteName: 'Splixor',
    images: [
      {
        url: '/og-image.png', // Use relative path, Next.js will handle the full URL
        width: 1200,
        height: 630,
        alt: 'Splixor - Smart Subscription Sharing Platform',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'Splixor - Smart Subscription Sharing',
    description: "We're cooking up a smarter way to split and share your favorite subscriptions.",
    site: '@splixor',
    creator: '@splixor',
    images: ['/og-image.png'],
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Additional properties for better social sharing
  metadataBase: new URL('https://www.splixor.com'),
  alternates: {
    canonical: 'https://www.splixor.com',
  },
}

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