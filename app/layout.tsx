import type { Metadata } from "next";
import "./globals.css";
import { siteMetadata } from "@/data/siteMetadata";
import { Analytics, AnalyticsConfig } from "pliny/analytics";
import { SearchProvider, SearchConfig } from "pliny/search";
import SectionContainer from "@/components/SectionContainer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-900 from-gray-700 via-gray-900 to-black text-black antialiased dark:bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] dark:text-white">
        <Analytics
          analyticsConfig={siteMetadata.analytics as AnalyticsConfig}
        />
        <SectionContainer>
          {" "}
          <div className="flex h-screen flex-col justify-between font-sans">
            <SearchProvider searchConfig={siteMetadata.search as SearchConfig}>
              <Header />
              <main className="mb-auto">{children}</main>
            </SearchProvider>
            <Footer />
          </div>
        </SectionContainer>
      </body>
    </html>
  );
}
