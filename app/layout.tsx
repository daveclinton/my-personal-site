import type { Metadata } from "next";
import "./globals.css";
import SectionContainer from "@/components/SectionContainer";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "David Clinton",
  description: "My Digital Orbit",
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
