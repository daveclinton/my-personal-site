import type { Metadata } from "next";
import "./globals.css";
import SectionContainer from "@/components/SectionContainer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { getBaseUrl } from "@/utils/url";

const baseUrl = getBaseUrl();

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "David Clinton's Site",
    template: "%s | David Clinton",
  },
  description: "David Clinton's personal website and blog",
  openGraph: {
    title: {
      default: "David Clinton's Site",
      template: "%s | David Clinton",
    },
    description: "David Clinton's personal website and blog",
    siteName: "David Clinton's Site",
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
      default: "David Clinton's Site",
      template: "%s | David Clinton",
    },
    description: "David Clinton's personal website and blog",
    images: [`${baseUrl}/api/og?title=David Clinton's Site`],
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900 from-gray-700 via-gray-900 to-black text-black antialiased dark:bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] dark:text-white">
        <SectionContainer>
          <Header />
          <main className="mb-auto">{children}</main>
          <Footer />
        </SectionContainer>
      </body>
    </html>
  );
}
