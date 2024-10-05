import React from "react";
import { Metadata } from "next";
import SEO from "@/components/SEO"; // Import the SEO component we created earlier

export const metadata: Metadata = {
  title: "",
  description: "Default description for Your Site Name",
  openGraph: {
    title: "Your Site Name",
    description: "Default description for Your Site Name",
    url: "https://yoursite.com",
    siteName: "Your Site Name",
    images: [
      {
        url: "/images/default-og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    title: "Your Site Name",
    card: "summary_large_image",
  },
  icons: {
    shortcut: "/favicon.ico",
  },
};

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SEO
        title={metadata.title as string}
        description={metadata.description as string}
      />
      {children}
    </>
  );
}
