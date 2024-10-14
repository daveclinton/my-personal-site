import { getBaseUrl } from "@/utils/url";
import "./globals.css";
import { Metadata } from "next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "David Clinton's personal website and blog",
    template: "%s | David Clinton",
  },
  description: "Get to know what I do, and how I do it!",
  openGraph: {
    title: {
      default: "David Clinton portfolio and blog",
      template: "%s | David Clinton",
    },
    description: "Get to know what I do, and how I do it!",
    siteName: "David Clinton's personal website and blog",
    locale: "en-US",
    type: "website",
    images: [
      {
        url: `${baseUrl}/api/og?title=David Clinton's Site`,
        width: 1200,
        height: 628,
        alt: "David Clinton's Site",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: {
      default: "David Clinton portfolio and blog",
      template: "%s | David Clinton",
    },
    description: "Get to know what I do, and how I do it!",
    images: [`${baseUrl}/api/og?title=David Clinton's Site`],
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col bg-gray-900 text-white">
        <Header />
        <main className="flex-grow max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
